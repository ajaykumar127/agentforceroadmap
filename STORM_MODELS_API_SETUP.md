# Storm Org → Models API: External Client App Setup

**Purpose:** Let the roadmap app (and the laptop sync) call the **storm** org's Einstein **Models API** for embeddings (Ada-002, 1536-dim) and chat (GPT-4o). This is the **one** prerequisite I cannot do for you — it's admin work inside the storm Salesforce org. Everything else (Postgres, schema, GUS sync, the /v2 dashboard, exact SQL Q&A) ships without it.

> **Org:** storm — `https://storm-5faf40d9fc3acb.my.salesforce.com` (NOT gus).
> **Why an app and not my CLI token:** I tested storm's CLI session token against the Models API embeddings and chat endpoints — both return **404**. A CLI/session token is not accepted by the LLM Gateway; the gateway requires an OAuth client (External Client App) with the `sfap_api` scope.

---

## Step 0 — Confirm entitlement first (don't build on sand)

In **storm**, confirm Einstein/Agentforce is licensed with **Einstein Requests** consumption:
- **Setup → Einstein → Einstein Generative AI / Einstein Setup** — confirm it's turned on.
- **Setup → Company Information / Usage** — look for an **Einstein Requests** allotment.
- Quick signal we already saw: storm's `/limits` REST response includes `CdpAiInferenceApiMonthlyLimit` (present, large) — a good sign AI inference is provisioned, but the Models API specifically needs the `sfap_api` scope below.

If storm is **not** entitled, stop here and tell me — we ship the no-LLM /v2 (fresh dashboard + exact SQL answers) and revisit the LLM layer when an entitled org is available.

---

## Step 1 — Create the External Client App (storm)

**Setup → App Manager → New External Client App** (modern path; if your org still uses classic, **New Connected App** works with the same fields).

- **External Client App Name:** `Agentforce Roadmap RAG`
- **API Name:** `Agentforce_Roadmap_RAG`
- **Contact Email:** your email
- **Distribution State:** Local

### Enable OAuth (API/Integration section)
- ✅ **Enable OAuth**
- **Callback URL:** `https://login.salesforce.com/services/oauth2/success` (required field; unused by client-credentials — any valid HTTPS URL is fine)
- **OAuth Scopes — add exactly these three:**
  - `Access the Salesforce API Platform (sfap_api)` ← **the critical one for Models API**
  - `Manage user data via APIs (api)`
  - `Perform requests at any time (refresh_token, offline_access)`
- ✅ **Enable Client Credentials Flow**
- ✅ **Issue JSON Web Token (JWT)-based access tokens** (a.k.a. token exchange / orgJWT)
- Leave "Require Proof Key for Code Exchange (PKCE)" unchecked (not used by client-credentials).

Save. (Connected-App propagation can take a few minutes.)

---

## Step 2 — Authorize the Client Credentials "run-as" user

Client-credentials flow runs as **one** named user. That user must be able to use Einstein.

- On the app: **Manage → Edit Policies → Client Credentials Flow → Run As:** pick a user (you, or a dedicated integration user) that has the **Einstein/Models API** permission set assigned.
- Assign that user a permission set granting Einstein generative AI access (e.g. an Einstein GPT / Agentforce permission set in storm).
- Under **OAuth Policies → Permitted Users:** "Admin approved users are pre-authorized" (then assign the app to a permission set / profile), or "All users may self-authorize" for a quick start.

---

## Step 3 — Get the credentials to me

From the app's **Settings → OAuth Settings → Consumer Key and Secret** (may be behind "Manage Consumer Details" + identity verification):

- **Consumer Key** (client_id)
- **Consumer Secret** (client_secret)

Hand these to me to set as **Heroku config vars** (never commit them):
```
heroku config:set -a agentforce-roadmap \
  SF_MODELS_CLIENT_ID='<consumer key>' \
  SF_MODELS_CLIENT_SECRET='<consumer secret>' \
  SF_MODELS_LOGIN_URL='https://storm-5faf40d9fc3acb.my.salesforce.com'
```
For the laptop sync, the same three go in your local `.env` (gitignored).

---

## Step 4 — I verify (once creds exist)

I'll mint a token and smoke-test both endpoints. The token mint:
```
POST https://storm-5faf40d9fc3acb.my.salesforce.com/services/oauth2/token
  grant_type=client_credentials
  client_id=<SF_MODELS_CLIENT_ID>
  client_secret=<SF_MODELS_CLIENT_SECRET>
→ { access_token (JWT), instance_url, ... }
```
Then, against `https://api.salesforce.com/einstein/platform/v1`:
- **Embeddings:** `POST /models/sfdc_ai__DefaultOpenAITextEmbeddingAda_002/embeddings`  body `{"input":["..."]}`
- **Chat:** `POST /models/sfdc_ai__DefaultGPT4Omni/chat-generations`  body `{"messages":[{"role":"user","content":"..."}]}`
- Required headers on every call: `Authorization: Bearer <jwt>`, `Content-Type: application/json`, `x-sfdc-app-context: EinsteinGPT`, `x-client-feature-id: ai-platform-models-connected-app`.

A 200 with a 1536-length embedding array = green light; I then wire `services/` to mint+cache the token and replace the dead OpenAI client.

---

## Notes / gotchas

- **Embeddings model is locked to Ada-002 (1536-dim)** via this gateway — `text-embedding-3-*` aren't offered. 1536 matches our schema, and since no vectors exist yet there's no migration. Never mix Ada-002 vectors with any other model's.
- **Billing:** calls meter as **Einstein Requests** (consumption), not OpenAI per-token. Bulk-embedding 478 epics is one-time + only re-embeds changed rows, so volume is tiny; runtime chat is the ongoing cost.
- **Token lifetime:** client-credentials JWTs are short-lived — the app mints on demand and caches until ~expiry. No static key to rotate manually.
- **Two hosts:** token is minted at the **storm** host; model calls go to the shared **api.salesforce.com** host.
- This app is the storm-org analog of a service account, but scoped to AI inference only — it does **not** touch GUS (GUS stays your interactive session per the separate constraint).
