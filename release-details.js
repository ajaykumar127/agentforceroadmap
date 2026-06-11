// Release Notes Detailed Data
// Official Salesforce release feature data sourced from salesforce.com/news/stories/

const releaseNotesData = {
    'summer-26': {
        version: '264',
        name: 'Summer \'26',
        icon: '☀️',
        status: 'upcoming',
        releaseDate: 'September 5, 2026',
        gaDate: '2026-09-05',
        previewDate: '2026-08-29',
        mainUrl: 'https://help.salesforce.com/s/articleView?id=release-notes.salesforce_release_notes.htm&release=264&type=5',
        summary: 'Summer \'26 (Build 264) is the next Salesforce major release. Detailed feature list will be linked from the official release notes — see the GUS Live views for the in-flight epic-level breakdown.',
        categories: [
            {
                id: 'pending',
                name: 'Release notes pending',
                icon: '📝',
                features: [
                    {
                        id: 'su26-stub',
                        title: 'Official release notes',
                        status: 'Upcoming',
                        description: 'Summer \'26 GA is scheduled for September 5, 2026. The polished customer-facing release notes will populate here when published. For the in-flight epic list, switch to the GUS Live views.',
                        details: {
                            overview: 'This view will be replaced with the curated Summer \'26 release-note features once Salesforce publishes them at help.salesforce.com.',
                            capabilities: [],
                            link: 'https://help.salesforce.com/s/articleView?id=release-notes.salesforce_release_notes.htm&release=264&type=5'
                        }
                    }
                ]
            }
        ]
    },
    'spring-26': {
        version: '262',
        name: 'Spring \'26',
        icon: '🌱',
        status: 'current',
        releaseDate: 'May 16, 2026',
        gaDate: '2026-05-16',
        previewDate: '2026-05-09',
        mainUrl: 'https://help.salesforce.com/s/articleView?id=release-notes.rn_einstein.htm&release=262&type=5',
        summary: 'Spring \'26 delivers the next generation of Agentforce with a rebuilt Agent Builder workspace, autonomous Sales and Service agents, Agentforce Grid, and deep Financial Services voice AI — all generally available.',
        categories: [
            {
                id: 'agentforce',
                name: 'Agentforce Platform',
                icon: '🤖',
                features: [
                    {
                        id: 'af-sp26-1',
                        title: 'Agentforce Builder (Redesigned)',
                        status: 'GA',
                        description: 'Build, test, and refine agents in a single conversational workspace using natural language, pro-code, or guided flows.',
                        details: {
                            overview: 'The redesigned Agentforce Builder unifies all agent-creation workflows into one intelligent workspace with real-time simulation and conversational design.',
                            capabilities: [
                                'Conversational agent design',
                                'Real-time simulation and testing',
                                'Natural language and pro-code modes',
                                'Guided best-practice suggestions',
                                'Version control and rollback',
                                'Inline debugging'
                            ],
                            useCases: [
                                'Rapid agent prototyping',
                                'Enterprise agent governance',
                                'Developer-led agent customization',
                                'Low-code admin configuration'
                            ],
                            availability: 'Available with Agentforce license',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_builder.htm'
                        }
                    },
                    {
                        id: 'af-sp26-2',
                        title: 'Agentforce Observability',
                        status: 'GA',
                        description: 'Unified mission control for monitoring and optimizing autonomous agents enterprise-wide with ROI tracking.',
                        details: {
                            overview: 'Agentforce Observability gives ops teams a live dashboard to monitor agent performance, containment rates, escalations, and business outcomes.',
                            capabilities: [
                                'Real-time agent performance metrics',
                                'ROI and containment rate tracking',
                                'Escalation analysis',
                                'Topic distribution insights',
                                'Alert configuration',
                                'Cross-agent benchmarking'
                            ],
                            useCases: [
                                'Agent health monitoring',
                                'Business value measurement',
                                'Compliance and audit trails',
                                'Continuous improvement'
                            ],
                            availability: 'Available with Agentforce license',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_observability.htm'
                        }
                    },
                    {
                        id: 'af-sp26-3',
                        title: 'MCP Server Registration',
                        status: 'Beta',
                        description: 'Securely register external services and tools via Model Context Protocol, extending agent capabilities beyond the Salesforce ecosystem.',
                        details: {
                            overview: 'MCP (Model Context Protocol) integration lets agents connect to any registered external service securely without custom connectors.',
                            capabilities: [
                                'Standard MCP registration UI',
                                'Secure token-based auth',
                                'Schema discovery',
                                'Action mapping',
                                'Usage auditing',
                                'Sandbox testing'
                            ],
                            useCases: [
                                'Third-party API integration',
                                'Internal tool access',
                                'Cross-platform agent actions',
                                'Custom data retrieval'
                            ],
                            availability: 'Beta — Agentforce Enterprise',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_mcp.htm'
                        }
                    }
                ]
            },
            {
                id: 'sales',
                name: 'Agentforce for Sales',
                icon: '💼',
                features: [
                    {
                        id: 'af-sp26-sales-1',
                        title: 'Sales Workspace',
                        status: 'GA',
                        description: 'Intelligent hub that brings together agents, analytics, and predictive insights for sellers in a single experience.',
                        details: {
                            overview: 'Sales Workspace is a unified seller command center surfacing the right AI actions, insights, and agent interactions at every stage of the sales cycle.',
                            capabilities: [
                                'Agentforce account summaries',
                                'Predictive deal insights',
                                'Pipeline health indicators',
                                'Automated next-step suggestions',
                                'Integrated meeting prep',
                                'Real-time activity feed'
                            ],
                            useCases: [
                                'Pipeline management',
                                'Deal acceleration',
                                'Meeting preparation',
                                'Account planning'
                            ],
                            availability: 'Sales Cloud Enterprise and Unlimited',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.sales_workspace.htm'
                        }
                    },
                    {
                        id: 'af-sp26-sales-2',
                        title: 'Agentforce Account Management',
                        status: 'GA',
                        description: 'Automated research and synthesized summaries help sellers understand accounts faster and take action.',
                        details: {
                            overview: 'The Account Management agent autonomously researches accounts, synthesizes news and CRM signals, and surfaces recommended actions.',
                            capabilities: [
                                'Automated account research',
                                'News and signal monitoring',
                                'Relationship map generation',
                                'Executive summary drafting',
                                'Risk and opportunity flagging',
                                'CRM data enrichment'
                            ],
                            useCases: [
                                'Executive briefings',
                                'QBR preparation',
                                'Account expansion planning',
                                'Competitive intelligence'
                            ],
                            availability: 'Sales Cloud Enterprise and Unlimited',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_account_management.htm'
                        }
                    },
                    {
                        id: 'af-sp26-sales-3',
                        title: 'Agentforce Prospecting',
                        status: 'GA',
                        description: '24/7 autonomous lead generation with real-time signals and AI-prioritized prospect lists.',
                        details: {
                            overview: 'Prospecting agent continuously monitors signals, identifies high-fit prospects, and initiates personalized outreach — all without rep intervention.',
                            capabilities: [
                                'Real-time buying signal detection',
                                'AI-scored prospect prioritization',
                                'Automated personalized outreach',
                                'Meeting booking',
                                'CRM auto-logging',
                                'Multi-channel sequencing'
                            ],
                            useCases: [
                                'Inbound lead qualification',
                                'Outbound pipeline generation',
                                'Account-based prospecting',
                                'Partner channel enablement'
                            ],
                            availability: 'Sales Cloud Enterprise and Unlimited',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_prospecting.htm'
                        }
                    }
                ]
            },
            {
                id: 'service',
                name: 'Agentforce for Service',
                icon: '🎧',
                features: [
                    {
                        id: 'af-sp26-svc-1',
                        title: 'Proactive Service',
                        status: 'GA',
                        description: 'Detects customer issues early and scales self-service resolution guidance before customers reach out.',
                        details: {
                            overview: 'Proactive Service monitors customer signals across channels and autonomously triggers resolutions — reducing inbound volume before issues escalate.',
                            capabilities: [
                                'Proactive issue detection',
                                'Automated outreach and resolution',
                                'Self-service guidance generation',
                                'Escalation prevention',
                                'Customer health scoring',
                                'Case deflection analytics'
                            ],
                            useCases: [
                                'Subscription renewals',
                                'Proactive outage notifications',
                                'Order exception handling',
                                'Churn prevention'
                            ],
                            availability: 'Service Cloud Enterprise and Unlimited',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_proactive_service.htm'
                        }
                    },
                    {
                        id: 'af-sp26-svc-2',
                        title: 'Customer Signals in Command Center',
                        status: 'GA',
                        description: 'Real-time monitoring of customer and operational signals in the service operations dashboard.',
                        details: {
                            overview: 'Command Center now surfaces AI-analyzed customer signals alongside agent metrics — giving supervisors a complete picture of service health.',
                            capabilities: [
                                'Customer sentiment trending',
                                'Topic spike detection',
                                'SLA risk indicators',
                                'Agent utilization overlay',
                                'Predictive queue forecasting',
                                'Drill-down investigation'
                            ],
                            useCases: [
                                'Supervisor real-time oversight',
                                'Capacity planning',
                                'Escalation triage',
                                'Quality management'
                            ],
                            availability: 'Service Cloud Enterprise and Unlimited',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.service_command_center.htm'
                        }
                    }
                ]
            },
            {
                id: 'financial-services',
                name: 'Financial Services',
                icon: '🏦',
                features: [
                    {
                        id: 'af-sp26-fs-1',
                        title: 'Agentforce Voice for Financial Services',
                        status: 'GA',
                        description: 'Ultra-low-latency voice AI that resolves banking and collections inquiries at scale without human intervention.',
                        details: {
                            overview: 'Voice-enabled agents handle account inquiries, payment arrangements, and dispute intake across phone channels with sub-second response times.',
                            capabilities: [
                                'Natural voice conversation',
                                'Account balance and transaction lookup',
                                'Payment arrangement setup',
                                'Dispute intake and routing',
                                'Compliance-safe call recording',
                                'Seamless human handoff'
                            ],
                            useCases: [
                                'Banking customer service',
                                'Debt collections automation',
                                'Fraud dispute handling',
                                'Loan status inquiries'
                            ],
                            availability: 'Financial Services Cloud Enterprise and Unlimited',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_voice_fsc.htm'
                        }
                    }
                ]
            },
            {
                id: 'marketing',
                name: 'Marketing',
                icon: '📣',
                features: [
                    {
                        id: 'af-sp26-mkt-1',
                        title: 'Conversational Email (Agentforce)',
                        status: 'GA',
                        description: 'AI agents autonomously answer questions and provide personalized recommendations via two-way email conversations.',
                        details: {
                            overview: 'Formerly Two-Way Email, Conversational Email enables agents to sustain meaningful back-and-forth email dialogue with customers — handling inquiries, suggesting products, and routing complex issues.',
                            capabilities: [
                                'Two-way email conversation management',
                                'Personalized product recommendations',
                                'FAQ and knowledge base integration',
                                'Sentiment-driven tone adjustment',
                                'Automatic escalation routing',
                                'Email thread context retention'
                            ],
                            useCases: [
                                'Post-purchase support',
                                'Promotional campaign responses',
                                'Lead nurturing via email',
                                'Customer re-engagement'
                            ],
                            availability: 'Marketing Cloud Growth and Advanced editions',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_conversational_email.htm'
                        }
                    }
                ]
            }
        ]
    },

    'winter-26': {
        version: '260',
        name: 'Winter \'26',
        icon: '❄️',
        status: 'previous',
        releaseDate: 'October 13, 2025',
        gaDate: '2025-10-13',
        previewDate: '2025-10-06',
        mainUrl: 'https://help.salesforce.com/s/articleView?id=release-notes.rn_einstein.htm&release=260&type=5',
        summary: 'Winter \'26 expands Agentforce across every cloud with IT service management, guided commerce shopping, data clean rooms, Agentforce Grid for bulk operations, and comprehensive observability.',
        categories: [
            {
                id: 'agentforce',
                name: 'Agentforce Platform',
                icon: '🤖',
                features: [
                    {
                        id: 'af-w26-1',
                        title: 'Agentforce Grid',
                        status: 'GA',
                        description: 'Spreadsheet-like interface that chains CRM data, AI prompts, actions, and agents for bulk updates and automation.',
                        details: {
                            overview: 'Agentforce Grid brings the familiarity of a spreadsheet to AI-powered batch operations — letting users run agents across hundreds of records simultaneously.',
                            capabilities: [
                                'Bulk record processing with agents',
                                'Chained action sequences',
                                'Inline AI prompt execution',
                                'Data enrichment at scale',
                                'Column-based agent triggers',
                                'Export and audit logging'
                            ],
                            useCases: [
                                'Mass account enrichment',
                                'Bulk lead qualification',
                                'Pipeline health sweeps',
                                'Data cleanup campaigns'
                            ],
                            availability: 'Available with Agentforce license',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_grid.htm'
                        }
                    },
                    {
                        id: 'af-w26-2',
                        title: 'New Agentforce Builder',
                        status: 'Beta',
                        description: 'Unified workspace for natural language, pro-code, or conversational agent design with real-time simulation.',
                        details: {
                            overview: 'The next-generation Builder (Beta) gives developers and admins a single canvas to design, simulate, and deploy agents with any level of technical depth.',
                            capabilities: [
                                'Natural language agent authoring',
                                'Pro-code mode with Apex',
                                'Real-time conversation simulation',
                                'Side-by-side testing',
                                'Template library',
                                'Change history'
                            ],
                            useCases: [
                                'Agent rapid prototyping',
                                'Complex workflow design',
                                'Multi-team collaboration',
                                'CI/CD integration'
                            ],
                            availability: 'Beta — limited availability',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_builder_beta.htm'
                        }
                    },
                    {
                        id: 'af-w26-3',
                        title: 'Agentforce Observability',
                        status: 'GA',
                        description: 'Mission control for monitoring autonomous agents enterprise-wide with ROI tracking, containment metrics, and escalation analytics.',
                        details: {
                            overview: 'Agentforce Observability delivers a single pane of glass for agent health, performance trends, and business impact measurement.',
                            capabilities: [
                                'Live agent performance dashboard',
                                'Containment rate tracking',
                                'ROI measurement',
                                'Escalation pattern analysis',
                                'Cross-agent comparison',
                                'Configurable alerts'
                            ],
                            useCases: [
                                'Operations monitoring',
                                'Business value reporting',
                                'Continuous improvement',
                                'Executive stakeholder reporting'
                            ],
                            availability: 'Available with Agentforce license',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_observability.htm'
                        }
                    },
                    {
                        id: 'af-w26-4',
                        title: 'Agentforce Vibes (AI-Powered IDE)',
                        status: 'GA',
                        description: 'AI developer assistant that proactively suggests best practices, builds unit tests, and generates code using natural language.',
                        details: {
                            overview: 'Agentforce Vibes embeds AI assistance directly in the development environment — catching issues early, writing tests, and accelerating feature delivery.',
                            capabilities: [
                                'Natural language code generation',
                                'Automated unit test creation',
                                'Best-practice enforcement',
                                'ApexGuru integration',
                                'LWC component generation',
                                'Inline code review'
                            ],
                            useCases: [
                                'Faster Apex development',
                                'LWC component creation',
                                'Test coverage improvement',
                                'Code quality automation'
                            ],
                            availability: 'Available with Developer Edition and Salesforce DX',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_vibes.htm'
                        }
                    }
                ]
            },
            {
                id: 'sales',
                name: 'Agentforce for Sales',
                icon: '💼',
                features: [
                    {
                        id: 'af-w26-sales-1',
                        title: 'Agentforce Lead Generation',
                        status: 'GA',
                        description: 'Engages website visitors, qualifies leads, and books meetings autonomously — 24/7.',
                        details: {
                            overview: 'The Lead Generation agent handles the full top-of-funnel process: greeting web visitors, asking qualification questions, answering FAQs, and scheduling meetings with the right rep.',
                            capabilities: [
                                'Real-time website visitor engagement',
                                'Multi-question qualification flows',
                                'Calendar-integrated meeting booking',
                                'Lead routing by territory',
                                'CRM record creation',
                                'Handoff with full conversation context'
                            ],
                            useCases: [
                                'Inbound demand capture',
                                'Event follow-up automation',
                                'Partner portal lead qualification',
                                '24/7 global coverage'
                            ],
                            availability: 'Sales Cloud Enterprise and Unlimited',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_lead_gen.htm'
                        }
                    },
                    {
                        id: 'af-w26-sales-2',
                        title: 'Pipeline Management Enhancements',
                        status: 'GA',
                        description: 'Agentforce drafts follow-ups, schedules meetings, and triggers tasks automatically after customer interactions.',
                        details: {
                            overview: 'Post-meeting automation handles all the follow-up work — creating tasks, drafting emails, updating opportunity stages, and alerting the rep on what matters most.',
                            capabilities: [
                                'Automated meeting follow-up drafts',
                                'Opportunity field auto-update',
                                'Task and reminder creation',
                                'Next-step recommendations',
                                'Deal risk alerts',
                                'Rep productivity insights'
                            ],
                            useCases: [
                                'Post-call automation',
                                'Deal velocity improvement',
                                'Forecast accuracy',
                                'Rep time savings'
                            ],
                            availability: 'Sales Cloud Enterprise and Unlimited',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_pipeline.htm'
                        }
                    }
                ]
            },
            {
                id: 'service',
                name: 'Agentforce for Service',
                icon: '🎧',
                features: [
                    {
                        id: 'af-w26-svc-1',
                        title: 'Agentforce for IT Service',
                        status: 'GA',
                        description: 'Agentic console for internal IT issue management with Slack integration, incident detection, and root-cause analysis.',
                        details: {
                            overview: 'IT Service brings Agentforce to internal help desks — handling employee IT requests, detecting incidents, performing triage, and escalating complex issues to L2/L3 teams.',
                            capabilities: [
                                'Employee IT request handling',
                                'Incident detection and alerting',
                                'Root-cause analysis',
                                'Slack-native ticket creation',
                                'Knowledge base integration',
                                'SLA tracking and escalation'
                            ],
                            useCases: [
                                'Employee IT self-service',
                                'Incident management automation',
                                'Change request processing',
                                'Asset and access requests'
                            ],
                            availability: 'Service Cloud Enterprise and Unlimited',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_it_service.htm'
                        }
                    },
                    {
                        id: 'af-w26-svc-2',
                        title: 'Agentic Portal',
                        status: 'GA',
                        description: 'Personalized self-service with dynamic content and interactive guidance tailored to each customer.',
                        details: {
                            overview: 'Agentic Portal transforms static self-service sites into dynamic, agent-powered experiences that adapt to the customer\'s history, context, and current intent.',
                            capabilities: [
                                'Personalized content surfacing',
                                'Context-aware guidance flows',
                                'Integrated case and order management',
                                'Agent escalation with context',
                                'Authenticated and anonymous modes',
                                'Custom branding'
                            ],
                            useCases: [
                                'Customer self-service portals',
                                'Partner community sites',
                                'Employee service portals',
                                'Product support hubs'
                            ],
                            availability: 'Service Cloud Enterprise and Unlimited + Experience Cloud',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_portal.htm'
                        }
                    }
                ]
            },
            {
                id: 'data-cloud',
                name: 'Data Cloud',
                icon: '☁️',
                features: [
                    {
                        id: 'af-w26-dc-1',
                        title: 'Clean Rooms in Data Cloud',
                        status: 'GA',
                        description: 'Privacy-safe data collaboration using zero-copy technology for multi-party insights without data movement.',
                        details: {
                            overview: 'Clean Rooms enable secure data collaboration between brands, partners, and media networks — generating shared insights without either party exposing raw data.',
                            capabilities: [
                                'Zero-copy data collaboration',
                                'Differential privacy controls',
                                'Multi-party query execution',
                                'Audience overlap analysis',
                                'Attribution measurement',
                                'Compliance audit trails'
                            ],
                            useCases: [
                                'Media and advertising measurement',
                                'Partner co-marketing analytics',
                                'Retail media networks',
                                'Financial risk sharing'
                            ],
                            availability: 'Requires Data Cloud license',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.data_cloud_clean_rooms.htm'
                        }
                    }
                ]
            },
            {
                id: 'commerce',
                name: 'Commerce Cloud',
                icon: '🛍️',
                features: [
                    {
                        id: 'af-w26-com-1',
                        title: 'Agentic Commerce: Guided Shopping',
                        status: 'GA',
                        description: 'Conversational AI for personalized product discovery, recommendations, and checkout guidance.',
                        details: {
                            overview: 'Guided Shopping agents engage shoppers in natural conversation — helping them find the right product, comparing options, handling questions, and walking through checkout.',
                            capabilities: [
                                'Conversational product discovery',
                                'Personalized recommendations',
                                'Comparison assistance',
                                'Cart and checkout guidance',
                                'Order status and returns',
                                'Upsell and cross-sell'
                            ],
                            useCases: [
                                'B2C e-commerce support',
                                'High-consideration purchase guidance',
                                'Mobile shopping assistance',
                                'Seasonal campaign support'
                            ],
                            availability: 'Commerce Cloud Growth and Plus editions',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_guided_shopping.htm'
                        }
                    }
                ]
            },
            {
                id: 'security',
                name: 'Security & Compliance',
                icon: '🔒',
                features: [
                    {
                        id: 'af-w26-sec-1',
                        title: 'Agentforce in Security Center',
                        status: 'GA',
                        description: 'Investigates threats, analyzes user activity patterns, and provides actionable remediation recommendations.',
                        details: {
                            overview: 'Security Center now includes an Agentforce agent that proactively investigates anomalies, correlates threat signals, and suggests remediation steps.',
                            capabilities: [
                                'Automated threat investigation',
                                'User behavior anomaly detection',
                                'Remediation recommendation',
                                'Policy violation alerts',
                                'Cross-org security analytics',
                                'Compliance posture scoring'
                            ],
                            useCases: [
                                'Security operations automation',
                                'Compliance monitoring',
                                'Insider threat detection',
                                'Audit preparation'
                            ],
                            availability: 'Requires Security Center license',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_security_center.htm'
                        }
                    }
                ]
            },
            {
                id: 'analytics',
                name: 'Analytics & Tableau',
                icon: '📊',
                features: [
                    {
                        id: 'af-w26-an-1',
                        title: 'Tableau Next Concierge in Slack',
                        status: 'GA',
                        description: 'Natural language analytics queries delivered directly in Slack with actionable insights and drill-down.',
                        details: {
                            overview: 'Ask data questions in plain English from any Slack channel — Tableau Next Concierge returns charts, summaries, and recommended actions without leaving Slack.',
                            capabilities: [
                                'Natural language data queries',
                                'Chart and summary generation',
                                'Slack-native delivery',
                                'Drill-down from Slack',
                                'Scheduled data digests',
                                'Anomaly alerting'
                            ],
                            useCases: [
                                'Executive data briefings',
                                'Sales standup automation',
                                'Operational metrics sharing',
                                'Ad hoc analysis'
                            ],
                            availability: 'Tableau + Slack license required',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.tableau_concierge_slack.htm'
                        }
                    }
                ]
            }
        ]
    },

    'summer-25': {
        version: '256',
        name: 'Summer \'25',
        icon: '☀️',
        status: 'archived',
        releaseDate: 'May 16, 2025',
        gaDate: '2025-05-16',
        previewDate: '2025-05-09',
        mainUrl: 'https://help.salesforce.com/s/articleView?id=release-notes.rn_einstein.htm&release=256&type=5',
        summary: 'Summer \'25 introduces multimodal agents, web search capabilities, RAG 2.0, Agentforce for every employee, and instruction adherence governance — a major leap in agent intelligence and reach.',
        categories: [
            {
                id: 'agentforce',
                name: 'Agentforce Platform',
                icon: '🤖',
                features: [
                    {
                        id: 'af-su25-1',
                        title: 'Agentforce for Every Employee',
                        status: 'GA',
                        description: 'Provides guidance, executes workflows, and surfaces knowledge for any employee across Lightning, Mobile, and Slack.',
                        details: {
                            overview: 'Agentforce is no longer just customer-facing — employees can now use agents for internal workflows, HR questions, IT requests, and knowledge retrieval from any Salesforce surface.',
                            capabilities: [
                                'Cross-app employee agent access',
                                'HR and IT workflow automation',
                                'Knowledge retrieval and summarization',
                                'Internal approval handling',
                                'Slack integration',
                                'Mobile-first experience'
                            ],
                            useCases: [
                                'Employee self-service',
                                'Onboarding assistance',
                                'Internal knowledge base',
                                'Policy Q&A'
                            ],
                            availability: 'Available with Agentforce license',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_employees.htm'
                        }
                    },
                    {
                        id: 'af-su25-2',
                        title: 'Multimodal Support',
                        status: 'GA',
                        description: 'Users can share images, documents, and files as context in agent conversations for richer, more accurate responses.',
                        details: {
                            overview: 'Agents now understand and reason over images and file attachments — enabling use cases like photo-based troubleshooting, document review, and receipt processing.',
                            capabilities: [
                                'Image understanding',
                                'Document and PDF analysis',
                                'Receipt and invoice processing',
                                'Screenshot-based troubleshooting',
                                'Multi-file context handling',
                                'Inline image rendering in responses'
                            ],
                            useCases: [
                                'Visual product troubleshooting',
                                'Document-driven workflows',
                                'Insurance claim image review',
                                'Field service photo analysis'
                            ],
                            availability: 'Available with Agentforce license',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_multimodal.htm'
                        }
                    },
                    {
                        id: 'af-su25-3',
                        title: 'Agent Surfaces',
                        status: 'GA',
                        description: 'Enables agents to respond with visuals and interactive media tailored to the context and channel.',
                        details: {
                            overview: 'Agent Surfaces gives agents the ability to return structured cards, carousels, forms, and media — not just text — creating richer experiences across every channel.',
                            capabilities: [
                                'Rich card responses',
                                'Product carousels',
                                'Interactive form rendering',
                                'Channel-adaptive layouts',
                                'Button and quick-reply support',
                                'Embedded media'
                            ],
                            useCases: [
                                'Product recommendation carousels',
                                'Interactive troubleshooting guides',
                                'Appointment booking forms',
                                'Survey and feedback collection'
                            ],
                            availability: 'Available with Agentforce license',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_surfaces.htm'
                        }
                    },
                    {
                        id: 'af-su25-4',
                        title: 'Web Search in Data Library',
                        status: 'GA',
                        description: 'Agents can access real-time public web information to expand their knowledge beyond internal data.',
                        details: {
                            overview: 'Web Search augments the agent\'s Data Library with live public web results — grounding responses in current events, pricing, and external knowledge.',
                            capabilities: [
                                'Real-time web search grounding',
                                'Result filtering and ranking',
                                'Source citation in responses',
                                'Configurable domain allowlists',
                                'Trust Layer compliance',
                                'Search usage analytics'
                            ],
                            useCases: [
                                'Current event awareness',
                                'Competitor research',
                                'Industry news summarization',
                                'External product information'
                            ],
                            availability: 'Available with Agentforce license',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_web_search.htm'
                        }
                    },
                    {
                        id: 'af-su25-5',
                        title: 'Instruction Adherence',
                        status: 'GA',
                        description: 'AI-generated scoring that detects whether agents are following their intended topic and operational guidelines.',
                        details: {
                            overview: 'Instruction Adherence automatically evaluates agent responses against their configured instructions — surfacing drift, off-topic replies, and compliance gaps.',
                            capabilities: [
                                'Automated adherence scoring',
                                'Off-topic detection',
                                'Instruction drift alerting',
                                'Per-conversation reports',
                                'Batch evaluation',
                                'Remediation suggestions'
                            ],
                            useCases: [
                                'Agent governance and compliance',
                                'Quality assurance',
                                'Regulatory adherence monitoring',
                                'Brand voice consistency'
                            ],
                            availability: 'Available with Agentforce license',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_instruction_adherence.htm'
                        }
                    }
                ]
            },
            {
                id: 'sales',
                name: 'Agentforce for Sales',
                icon: '💼',
                features: [
                    {
                        id: 'af-su25-sales-1',
                        title: 'Pipeline Management (Sales)',
                        status: 'GA',
                        description: 'Automatically suggests or applies opportunity field updates based on conversation data and activity signals.',
                        details: {
                            overview: 'The Pipeline Management agent analyzes calls, emails, and meetings to recommend and apply CRM updates — keeping Salesforce data accurate without rep effort.',
                            capabilities: [
                                'Conversation-based field suggestions',
                                'Opportunity stage auto-update',
                                'Close date forecasting',
                                'Contact role identification',
                                'Rep approval workflows',
                                'Forecast accuracy reports'
                            ],
                            useCases: [
                                'CRM data hygiene',
                                'Forecast accuracy improvement',
                                'Manager pipeline reviews',
                                'Automated activity capture'
                            ],
                            availability: 'Sales Cloud Enterprise and Unlimited',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_pipeline_mgmt.htm'
                        }
                    },
                    {
                        id: 'af-su25-sales-2',
                        title: 'Sales Coaching Enhancements',
                        status: 'GA',
                        description: 'On-demand AI coaching across contacts, accounts, and custom objects — now in six additional languages.',
                        details: {
                            overview: 'Sales Coaching delivers real-time, context-aware guidance to reps during and after customer interactions — expanded with multi-language support for global teams.',
                            capabilities: [
                                'Real-time coaching overlays',
                                'Account and contact-level coaching',
                                'Custom object coaching',
                                'Multi-language support (6 new)',
                                'Manager coaching dashboards',
                                'Coaching program analytics'
                            ],
                            useCases: [
                                'Global sales team enablement',
                                'New rep ramp acceleration',
                                'Deal strategy coaching',
                                'Competitive positioning'
                            ],
                            availability: 'Sales Cloud Enterprise and Unlimited',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_sales_coaching.htm'
                        }
                    }
                ]
            },
            {
                id: 'data-cloud',
                name: 'Data Cloud',
                icon: '☁️',
                features: [
                    {
                        id: 'af-su25-dc-1',
                        title: 'RAG 2.0',
                        status: 'GA',
                        description: 'Enhanced retrieval-augmented generation with metadata indexing, prompt refinement, and inline citation tracking for more accurate agent responses.',
                        details: {
                            overview: 'RAG 2.0 dramatically improves the accuracy and transparency of agent answers by indexing structured metadata alongside content and surfacing inline citations.',
                            capabilities: [
                                'Metadata-aware indexing',
                                'Prompt auto-refinement',
                                'Inline citation in responses',
                                'Relevance scoring dashboard',
                                'Hybrid retrieval (vector + keyword)',
                                'Freshness-aware retrieval'
                            ],
                            useCases: [
                                'Knowledge base Q&A',
                                'Compliance-sensitive responses',
                                'Technical documentation agents',
                                'Research synthesis'
                            ],
                            availability: 'Requires Data Cloud license',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.data_cloud_rag2.htm'
                        }
                    },
                    {
                        id: 'af-su25-dc-2',
                        title: 'Policy-Based Governance',
                        status: 'GA',
                        description: 'Create and enforce data access policies with dynamic masking for sensitive information across Data Cloud.',
                        details: {
                            overview: 'Policy-Based Governance gives data teams fine-grained control over who can access what data — with dynamic masking for PII and sensitive fields applied at query time.',
                            capabilities: [
                                'Role-based data access policies',
                                'Dynamic field masking',
                                'Policy inheritance and hierarchy',
                                'Audit log integration',
                                'Data Contract enforcement',
                                'Cross-cloud policy application'
                            ],
                            useCases: [
                                'PII protection',
                                'GDPR/CCPA compliance',
                                'Partner data access control',
                                'Healthcare data governance'
                            ],
                            availability: 'Requires Data Cloud license',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.data_cloud_governance.htm'
                        }
                    },
                    {
                        id: 'af-su25-dc-3',
                        title: 'Zero Copy Framework',
                        status: 'GA',
                        description: 'APIs and SDKs for secure, instant data access across systems without data replication.',
                        details: {
                            overview: 'The Zero Copy Framework enables agents and applications to query data where it lives — eliminating expensive ETL pipelines and reducing data duplication.',
                            capabilities: [
                                'Direct data source queries',
                                'Cross-cloud zero-copy access',
                                'Streaming data support',
                                'SDK for custom connectors',
                                'Permission-preserving queries',
                                'Performance SLA guarantees'
                            ],
                            useCases: [
                                'Data lakehouse integration',
                                'Real-time analytics',
                                'Multi-cloud architectures',
                                'Data mesh implementations'
                            ],
                            availability: 'Requires Data Cloud license',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.data_cloud_zero_copy.htm'
                        }
                    }
                ]
            }
        ]
    },

    'winter-25': {
        version: '252',
        name: 'Winter \'25',
        icon: '❄️',
        status: 'archived',
        releaseDate: 'October 14, 2024',
        gaDate: '2024-10-14',
        previewDate: '2024-10-07',
        mainUrl: 'https://help.salesforce.com/s/articleView?id=release-notes.rn_einstein.htm&release=252&type=5',
        summary: 'Winter \'25 is the landmark launch of the Agentforce platform — introducing the Service Agent, SDR Agent, 200+ Data Cloud connectors, and the sub-second real-time data layer.',
        categories: [
            {
                id: 'agentforce',
                name: 'Agentforce Platform',
                icon: '🤖',
                features: [
                    {
                        id: 'af-w25-1',
                        title: 'Agentforce Service Agent',
                        status: 'GA',
                        description: 'The first generally available Agentforce agent — a trusted AI team member deployable across all service channels with pre-built templates and low-code customization.',
                        details: {
                            overview: 'Agentforce Service Agent handles customer service interactions autonomously across chat, email, voice, and messaging — with no scripting required.',
                            capabilities: [
                                'Cross-channel deployment (chat, email, voice, messaging)',
                                'Pre-built service templates',
                                'Low-code customization in Agent Builder',
                                'Knowledge base grounding',
                                'Case creation and updates',
                                'Intelligent human handoff'
                            ],
                            useCases: [
                                'Customer support automation',
                                'First-line issue resolution',
                                'Order and billing inquiries',
                                'Technical troubleshooting'
                            ],
                            availability: 'Available with Agentforce license',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_service_agent.htm'
                        }
                    },
                    {
                        id: 'af-w25-2',
                        title: 'Agentforce SDR Agent',
                        status: 'GA',
                        description: 'Autonomous AI Sales Development Representative that engages inbound leads, qualifies prospects, handles objections, and schedules meetings 24/7.',
                        details: {
                            overview: 'The SDR Agent never sleeps — it responds to every inbound inquiry within seconds, qualifies leads using your criteria, and books meetings directly on rep calendars.',
                            capabilities: [
                                '24/7 inbound lead engagement',
                                'Dynamic qualification questions',
                                'Objection handling',
                                'Multi-touch email sequences',
                                'Calendar-integrated meeting booking',
                                'CRM lead record creation'
                            ],
                            useCases: [
                                'Inbound lead qualification at scale',
                                'After-hours coverage',
                                'Event and webinar follow-up',
                                'Trial signup nurturing'
                            ],
                            availability: 'Sales Cloud Enterprise and Unlimited',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_sdr_agent.htm'
                        }
                    }
                ]
            },
            {
                id: 'data-cloud',
                name: 'Data Cloud',
                icon: '☁️',
                features: [
                    {
                        id: 'af-w25-dc-1',
                        title: '200+ Out-of-Box Connectors',
                        status: 'GA',
                        description: 'Over 200 pre-built connectors to integrate external application data directly into Data Cloud without custom ETL.',
                        details: {
                            overview: 'Data Cloud ships with 200+ pre-built connectors spanning CRM, ERP, marketing, commerce, and data warehouse platforms — accelerating time to unified data.',
                            capabilities: [
                                '200+ pre-built connectors',
                                'No-code connector configuration',
                                'Incremental and full-load modes',
                                'Schema auto-mapping',
                                'Data health monitoring',
                                'Error handling and retry'
                            ],
                            useCases: [
                                'Unified customer profile creation',
                                'ERP and order data integration',
                                'Marketing data consolidation',
                                'Data warehouse connectivity'
                            ],
                            availability: 'Requires Data Cloud license',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.data_cloud_connectors.htm'
                        }
                    },
                    {
                        id: 'af-w25-dc-2',
                        title: 'Sub-Second Real-Time Data Layer',
                        status: 'GA',
                        description: 'Harmonizes and activates data within milliseconds — enabling true real-time customer experiences across all Salesforce clouds.',
                        details: {
                            overview: 'The real-time data layer processes streaming events and activates them across Salesforce in under a second — powering time-sensitive agent decisions and personalization.',
                            capabilities: [
                                'Sub-second event processing',
                                'Cross-cloud real-time activation',
                                'Streaming data ingestion',
                                'Real-time segment membership',
                                'Event-triggered agent actions',
                                'Latency SLA monitoring'
                            ],
                            useCases: [
                                'Real-time personalization',
                                'Fraud detection',
                                'Live event audience updates',
                                'In-session offer triggering'
                            ],
                            availability: 'Requires Data Cloud license',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.data_cloud_realtime.htm'
                        }
                    }
                ]
            },
            {
                id: 'sales',
                name: 'Sales Cloud',
                icon: '💼',
                features: [
                    {
                        id: 'af-w25-sales-1',
                        title: 'Quota Planning',
                        status: 'GA',
                        description: 'Territory-based quota plan builder with running totals, adjustments, and approval workflows at plan or account level.',
                        details: {
                            overview: 'Quota Planning brings structured, collaborative quota management into Sales Cloud — replacing spreadsheets with a governed, trackable process.',
                            capabilities: [
                                'Territory-based quota assignment',
                                'Running total calculations',
                                'Plan-level and account-level adjustments',
                                'Approval workflow integration',
                                'Historical performance overlays',
                                'Manager review dashboards'
                            ],
                            useCases: [
                                'Annual quota setting',
                                'Mid-year territory adjustments',
                                'Performance vs. quota tracking',
                                'Sales compensation planning'
                            ],
                            availability: 'Sales Cloud Enterprise and Unlimited',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.quota_planning.htm'
                        }
                    }
                ]
            },
            {
                id: 'employee',
                name: 'Employee Experience',
                icon: '👥',
                features: [
                    {
                        id: 'af-w25-emp-1',
                        title: 'Employee Service',
                        status: 'GA',
                        description: 'AI-powered solution helping employees find answers and take action through a unified system with departmental integrations.',
                        details: {
                            overview: 'Employee Service is a pre-built Agentforce solution for HR, IT, and facilities teams — giving employees a single place to get help across all internal departments.',
                            capabilities: [
                                'Cross-department case routing',
                                'AI-powered knowledge Q&A',
                                'HR policy and benefits answers',
                                'IT ticket creation and tracking',
                                'Facilities request handling',
                                'Employee portal integration'
                            ],
                            useCases: [
                                'HR self-service',
                                'New employee onboarding',
                                'IT helpdesk automation',
                                'Facilities management'
                            ],
                            availability: 'Requires Employee Service license',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.employee_service.htm'
                        }
                    }
                ]
            }
        ]
    }
};

// Export for use in app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = releaseNotesData;
}
