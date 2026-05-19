// Agentforce Roadmap Data
// V1 Source: https://docs.google.com/presentation/d/1cq4ZopwHC553L7A1CqfPvxYRnFvpPbWbrOIzkn_zBm4/
// V2 Source: https://docs.google.com/presentation/d/1GCa3jwpz-GCmBFWNO9_Mxu4LkiTxj8WbLmt18jvc8YI/

// Salesforce Release Build → Seasonal Name mapping
// GA dates sourced from GUS ADM_Release__c (R0 = General Availability to all production orgs)
// Preview dates = SB2 (Sandbox Preview available ~1 week before GA)
const SALESFORCE_BUILDS = {
    '252': { name: 'Summer \'24',  season: 'Summer',  year: 2024, gaDate: '2024-09-06', previewDate: '2024-08-31', codeLine: '2024-03-29' },
    '254': { name: 'Winter \'25',  season: 'Winter',  year: 2025, gaDate: '2025-01-11', previewDate: '2025-01-04', codeLine: '2024-07-19' },
    '256': { name: 'Spring \'25',  season: 'Spring',  year: 2025, gaDate: '2025-05-16', previewDate: '2025-05-10', codeLine: '2024-11-22' },
    '258': { name: 'Summer \'25',  season: 'Summer',  year: 2025, gaDate: '2025-09-20', previewDate: '2025-09-06', codeLine: '2025-03-28' },
    '260': { name: 'Winter \'26',  season: 'Winter',  year: 2026, gaDate: '2026-01-17', previewDate: '2026-01-10', codeLine: '2025-08-01' },
    '262': { name: 'Spring \'26',  season: 'Spring',  year: 2026, gaDate: '2026-05-16', previewDate: '2026-05-09', codeLine: '2025-11-21' },
    '264': { name: 'Summer \'26',  season: 'Summer',  year: 2026, gaDate: '2026-09-05', previewDate: '2026-08-29', codeLine: '2026-03-27' },
    '266': { name: 'Winter \'27',  season: 'Winter',  year: 2027, gaDate: '2027-01-15', previewDate: '2027-01-09', codeLine: '2026-07-24' },
    '268': { name: 'Spring \'27',  season: 'Spring',  year: 2027, gaDate: '2027-05-14', previewDate: '2027-05-08', codeLine: '2026-11-20' },
    '270': { name: 'Summer \'27',  season: 'Summer',  year: 2027, gaDate: '2027-09-17', previewDate: null,         codeLine: '2027-03-26' },
    '260.patch': { name: 'Winter \'26 Patch', season: 'Winter', year: 2026, gaDate: '2026-01-17', previewDate: null, codeLine: '2025-08-01' },
    '262.patch': { name: 'Spring \'26 Patch', season: 'Spring', year: 2026, gaDate: '2026-05-16', previewDate: null, codeLine: '2025-11-21' },
};

// Helper: get display label for a build number
function getBuildLabel(build) {
    if (!build || build === '-') return '';
    const b = String(build).trim();
    const meta = SALESFORCE_BUILDS[b];
    if (meta) return meta.name + ' (Build ' + b + ')';
    return 'Build ' + b;
}

const roadmapDataV1 = [
    // ===== SAMPLE DATA =====
    // Replace this with actual data from your Google Slides presentation
    // Each slide can become one or more roadmap items
    
    // Q4 2024 - Foundation
    {
        id: 1,
        title: "Agent Builder Launch",
        description: "Low-code platform for building custom AI agents with pre-built templates and drag-and-drop interface.",
        category: "feature",
        status: "completed",
        period: "Q4 2024",
        quarter: "Q4 2024",
        date: "October 2024",
        details: {
            overview: "Launch of the foundational Agent Builder platform enabling organizations to create custom AI agents without extensive coding knowledge.",
            keyFeatures: [
                "Drag-and-drop interface for agent creation",
                "Pre-built agent templates for common use cases",
                "Integration with Salesforce Data Cloud",
                "Natural language processing capabilities",
                "Testing and simulation environment"
            ],
            impact: "Enables rapid deployment of AI agents across sales, service, and marketing teams."
        }
    },
    {
        id: 2,
        title: "Service Agent for Customer Support",
        description: "AI-powered agent that handles customer inquiries across multiple channels with contextual understanding.",
        category: "feature",
        status: "completed",
        period: "Q4 2024",
        quarter: "Q4 2024",
        date: "November 2024",
        details: {
            overview: "Autonomous service agent capable of handling tier-1 customer support inquiries with human-like understanding and responses.",
            keyFeatures: [
                "Multi-channel support (chat, email, messaging)",
                "Knowledge base integration",
                "Case deflection and resolution",
                "Seamless handoff to human agents",
                "Real-time sentiment analysis"
            ],
            impact: "Reduces support ticket volume by 30-40% and improves response times."
        }
    },
    {
        id: 3,
        title: "Sales Development Representative (SDR) Agent",
        description: "Autonomous agent that qualifies leads, schedules meetings, and nurtures prospects through the sales pipeline.",
        category: "feature",
        status: "completed",
        period: "Q4 2024",
        quarter: "Q4 2024",
        date: "December 2024",
        details: {
            overview: "AI-powered SDR that automates lead qualification and outreach, working 24/7 to engage prospects.",
            keyFeatures: [
                "Automated lead scoring and qualification",
                "Personalized email outreach",
                "Meeting scheduling and calendar integration",
                "CRM data enrichment",
                "Performance analytics and insights"
            ],
            impact: "Increases qualified pipeline by 35% and reduces time-to-first-meeting."
        }
    },

    // Q1 2025 - Expansion
    {
        id: 4,
        title: "Marketing Campaign Agent",
        description: "AI agent that creates, optimizes, and manages marketing campaigns across multiple channels.",
        category: "feature",
        status: "in-progress",
        period: "Q1 2025",
        quarter: "Q1 2025",
        date: "January 2025",
        details: {
            overview: "Intelligent marketing agent that automates campaign creation, A/B testing, and optimization based on real-time performance data.",
            keyFeatures: [
                "Multi-channel campaign orchestration",
                "Automated content generation",
                "Dynamic audience segmentation",
                "Real-time performance optimization",
                "ROI tracking and attribution"
            ],
            impact: "Improves campaign ROI by 25% and reduces time-to-market for campaigns."
        }
    },
    {
        id: 5,
        title: "Advanced Analytics & Insights",
        description: "Enhanced analytics dashboard with predictive insights and agent performance metrics.",
        category: "enhancement",
        status: "in-progress",
        period: "Q1 2025",
        quarter: "Q1 2025",
        date: "February 2025",
        details: {
            overview: "Comprehensive analytics platform providing deep insights into agent performance, user interactions, and business outcomes.",
            keyFeatures: [
                "Real-time performance dashboards",
                "Predictive analytics and forecasting",
                "Conversation quality scoring",
                "Custom report builder",
                "Anomaly detection and alerts"
            ],
            impact: "Enables data-driven optimization of agent performance and business processes."
        }
    },
    {
        id: 6,
        title: "Slack Integration",
        description: "Native Slack integration allowing agents to operate within Slack channels and DMs.",
        category: "integration",
        status: "completed",
        period: "Q1 2025",
        quarter: "Q1 2025",
        date: "March 2025",
        details: {
            overview: "Seamless integration with Slack enabling agents to participate in conversations, answer questions, and automate workflows within the Slack environment.",
            keyFeatures: [
                "Channel and DM support",
                "Slash command integration",
                "Workflow automation",
                "File and document handling",
                "Thread-based conversations"
            ],
            impact: "Brings AI assistance directly into team collaboration spaces."
        }
    },

    // Q2 2025 - Intelligence
    {
        id: 7,
        title: "Multi-Agent Orchestration",
        description: "Framework for multiple agents to collaborate and hand off tasks seamlessly.",
        category: "feature",
        status: "completed",
        period: "Q2 2025",
        quarter: "Q2 2025",
        date: "April 2025",
        details: {
            overview: "Advanced orchestration layer enabling multiple specialized agents to work together on complex tasks with intelligent routing and handoffs.",
            keyFeatures: [
                "Agent-to-agent communication protocols",
                "Intelligent task routing",
                "Context preservation across handoffs",
                "Workflow orchestration",
                "Conflict resolution mechanisms"
            ],
            impact: "Enables handling of complex, multi-step processes requiring specialized expertise."
        }
    },
    {
        id: 8,
        title: "Voice & Telephony Integration",
        description: "Voice-enabled agents with telephony integration for phone-based interactions.",
        category: "integration",
        status: "completed",
        period: "Q2 2025",
        quarter: "Q2 2025",
        date: "May 2025",
        details: {
            overview: "Voice-first agent capabilities with natural speech recognition and generation, integrated with telephony systems.",
            keyFeatures: [
                "Natural language voice recognition",
                "Text-to-speech with multiple voices",
                "Call routing and IVR integration",
                "Real-time transcription",
                "Sentiment analysis from voice"
            ],
            impact: "Extends agent capabilities to voice channels, handling phone inquiries autonomously."
        }
    },
    {
        id: 9,
        title: "Custom Model Integration",
        description: "Support for bringing your own AI models and integrating with external LLMs.",
        category: "feature",
        status: "completed",
        period: "Q2 2025",
        quarter: "Q2 2025",
        date: "June 2025",
        details: {
            overview: "Flexible architecture allowing organizations to integrate custom-trained models and third-party LLMs into the Agentforce platform.",
            keyFeatures: [
                "BYOM (Bring Your Own Model) support",
                "Integration with major LLM providers",
                "Model version management",
                "A/B testing framework",
                "Performance benchmarking"
            ],
            impact: "Provides flexibility for organizations with specialized AI requirements."
        }
    },

    // Q3 2025 - Scale
    {
        id: 10,
        title: "Enterprise Security & Compliance",
        description: "Advanced security features including data residency, audit logs, and compliance certifications.",
        category: "infrastructure",
        status: "in-progress",
        period: "Q3 2025",
        quarter: "Q3 2025",
        date: "July 2025",
        details: {
            overview: "Enterprise-grade security and compliance features meeting the most stringent regulatory requirements.",
            keyFeatures: [
                "Data residency controls",
                "Advanced audit logging",
                "SOC 2, HIPAA, GDPR compliance",
                "Role-based access control (RBAC)",
                "Encryption at rest and in transit"
            ],
            impact: "Enables deployment in highly regulated industries like healthcare and finance."
        }
    },
    {
        id: 11,
        title: "Microsoft Teams Integration",
        description: "Native Microsoft Teams integration for seamless agent interactions within Teams.",
        category: "integration",
        status: "in-progress",
        period: "Q3 2025",
        quarter: "Q3 2025",
        date: "August 2025",
        details: {
            overview: "Deep integration with Microsoft Teams enabling agents to participate in team conversations and automate workflows.",
            keyFeatures: [
                "Teams channel integration",
                "Bot framework support",
                "Adaptive cards and rich messaging",
                "Calendar and meeting integration",
                "SharePoint connectivity"
            ],
            impact: "Extends agent capabilities to Microsoft 365 ecosystem."
        }
    },
    {
        id: 12,
        title: "Advanced Personalization Engine",
        description: "AI-driven personalization that adapts agent responses based on user preferences and behavior.",
        category: "enhancement",
        status: "in-progress",
        period: "Q3 2025",
        quarter: "Q3 2025",
        date: "September 2025",
        details: {
            overview: "Sophisticated personalization engine that learns from user interactions to provide increasingly tailored experiences.",
            keyFeatures: [
                "Behavioral learning algorithms",
                "Preference management",
                "Context-aware responses",
                "Tone and style adaptation",
                "Multi-language personalization"
            ],
            impact: "Improves user satisfaction and engagement through personalized interactions."
        }
    },

    // Q4 2025 - Innovation
    {
        id: 13,
        title: "Autonomous Workflow Automation",
        description: "Agents that can independently create and execute complex workflows based on business objectives.",
        category: "feature",
        status: "future",
        period: "Q4 2025",
        quarter: "Q4 2025",
        date: "October 2025",
        details: {
            overview: "Next-generation autonomous agents capable of designing and executing multi-step workflows without human intervention.",
            keyFeatures: [
                "Autonomous workflow generation",
                "Goal-based planning",
                "Self-optimization capabilities",
                "Exception handling",
                "Impact prediction and simulation"
            ],
            impact: "Transforms agents from reactive assistants to proactive business process owners."
        }
    },
    {
        id: 14,
        title: "Industry-Specific Agent Templates",
        description: "Pre-configured agent templates for healthcare, financial services, retail, and manufacturing.",
        category: "feature",
        status: "future",
        period: "Q4 2025",
        quarter: "Q4 2025",
        date: "November 2025",
        details: {
            overview: "Industry-specific agent templates with pre-built knowledge, workflows, and compliance features.",
            keyFeatures: [
                "Healthcare: Patient engagement, appointment scheduling",
                "Financial Services: Account inquiries, fraud detection",
                "Retail: Product recommendations, order tracking",
                "Manufacturing: Supply chain optimization, quality control",
                "Built-in industry compliance"
            ],
            impact: "Accelerates time-to-value with industry-tailored solutions."
        }
    },
    {
        id: 15,
        title: "Multimodal Agent Capabilities",
        description: "Agents that can process and generate images, videos, and documents in addition to text.",
        category: "feature",
        status: "future",
        period: "Q4 2025",
        quarter: "Q4 2025",
        date: "December 2025",
        details: {
            overview: "Advanced multimodal capabilities enabling agents to understand and create content across multiple formats.",
            keyFeatures: [
                "Image recognition and generation",
                "Video analysis and summarization",
                "Document parsing and creation",
                "Visual search capabilities",
                "Cross-modal reasoning"
            ],
            impact: "Expands agent capabilities beyond text to handle rich media content."
        }
    },

    // 2026 and Beyond
    {
        id: 16,
        title: "Cognitive Memory & Learning",
        description: "Long-term memory systems that allow agents to learn and improve from every interaction.",
        category: "feature",
        status: "future",
        period: "2026+",
        quarter: "2026+",
        date: "2026",
        details: {
            overview: "Advanced cognitive architecture with long-term memory enabling continuous learning and improvement.",
            keyFeatures: [
                "Persistent memory across sessions",
                "Continuous learning algorithms",
                "Knowledge graph construction",
                "Experience-based reasoning",
                "Adaptive behavior modification"
            ],
            impact: "Creates truly intelligent agents that improve over time without explicit retraining."
        }
    },
    {
        id: 17,
        title: "Agent Marketplace",
        description: "Ecosystem for sharing, discovering, and deploying community-built agents and components.",
        category: "feature",
        status: "future",
        period: "2026+",
        quarter: "2026+",
        date: "2026",
        details: {
            overview: "Thriving marketplace ecosystem where organizations can share and monetize agent templates, skills, and integrations.",
            keyFeatures: [
                "Agent template marketplace",
                "Skill and capability sharing",
                "Ratings and reviews",
                "Monetization options",
                "Quality assurance and certification"
            ],
            impact: "Accelerates innovation through community collaboration and knowledge sharing."
        }
    }
];

// V2 Extended Roadmap - Includes all V1 content plus additional features
const roadmapDataV2 = [
    // All V1 items
    ...roadmapDataV1,
    
    // ===== NEW V2 CONTENT =====
    // Additional features and capabilities from extended roadmap
    // V2 includes product owners and PRD links for deeper content access
    
    // Enhanced Agent Capabilities
    {
        id: 18,
        title: "Agent Analytics & Performance Monitoring",
        description: "Comprehensive analytics suite for tracking agent performance, user satisfaction, and business outcomes.",
        category: "enhancement",
        status: "in-progress",
        period: "Q1 2025",
        quarter: "Q1 2025",
        date: "March 2025",
        owner: "Sarah Chen",
        prdLink: "https://docs.google.com/document/d/example-prd-analytics",
        details: {
            overview: "Advanced analytics platform providing real-time insights into agent effectiveness, conversation quality, and ROI metrics.",
            keyFeatures: [
                "Real-time performance dashboards",
                "Conversation analytics and sentiment tracking",
                "Success rate and resolution metrics",
                "A/B testing framework for agent optimization",
                "Custom KPI tracking and reporting",
                "Predictive analytics for capacity planning"
            ],
            impact: "Enables data-driven decision making and continuous improvement of agent performance."
        }
    },
    {
        id: 19,
        title: "Agent Skills Library & Marketplace",
        description: "Extensible skills library allowing agents to be enhanced with pre-built and custom capabilities.",
        category: "feature",
        status: "completed",
        period: "Q2 2025",
        quarter: "Q2 2025",
        date: "April 2025",
        owner: "Marcus Rodriguez",
        prdLink: "https://docs.google.com/document/d/example-prd-skills-library",
        details: {
            overview: "Modular skills architecture enabling rapid enhancement of agent capabilities through reusable components.",
            keyFeatures: [
                "Pre-built skills for common tasks",
                "Custom skill development framework",
                "Skills marketplace for sharing and discovery",
                "Version control and dependency management",
                "Skills testing and validation tools",
                "One-click skill installation"
            ],
            impact: "Accelerates agent development and enables community-driven innovation."
        }
    },
    {
        id: 20,
        title: "Proactive Agent Engagement",
        description: "Agents that can proactively reach out to customers based on behavioral triggers and predictive insights.",
        category: "feature",
        status: "completed",
        period: "Q2 2025",
        quarter: "Q2 2025",
        date: "May 2025",
        owner: "Jennifer Park",
        prdLink: "https://docs.google.com/document/d/example-prd-proactive-engagement",
        details: {
            overview: "Intelligent proactive engagement system that identifies opportunities and initiates conversations at optimal times.",
            keyFeatures: [
                "Behavioral trigger detection",
                "Predictive engagement scoring",
                "Personalized outreach timing",
                "Multi-channel proactive messaging",
                "Intent prediction and opportunity detection",
                "Automated follow-up sequences"
            ],
            impact: "Increases customer engagement and identifies revenue opportunities before they're lost."
        }
    },
    {
        id: 21,
        title: "Agent Collaboration Hub",
        description: "Unified workspace for human-agent collaboration with shared context and seamless handoffs.",
        category: "feature",
        status: "completed",
        period: "Q2 2025",
        quarter: "Q2 2025",
        date: "June 2025",
        owner: "David Kim",
        prdLink: "https://docs.google.com/document/d/example-prd-collaboration-hub",
        details: {
            overview: "Collaborative environment enabling seamless teamwork between AI agents and human team members.",
            keyFeatures: [
                "Shared conversation history and context",
                "Intelligent routing and escalation",
                "Agent suggestions for human agents",
                "Real-time collaboration tools",
                "Knowledge sharing and learning",
                "Performance feedback loops"
            ],
            impact: "Enhances productivity by combining AI efficiency with human expertise."
        }
    },
    {
        id: 22,
        title: "Advanced Natural Language Understanding",
        description: "Enhanced NLU capabilities with better context awareness, multi-turn reasoning, and domain adaptation.",
        category: "enhancement",
        status: "in-progress",
        period: "Q3 2025",
        quarter: "Q3 2025",
        date: "July 2025",
        owner: "Dr. Aisha Patel",
        prdLink: "https://docs.google.com/document/d/example-prd-advanced-nlu",
        details: {
            overview: "Next-generation language understanding with improved accuracy, context retention, and domain-specific knowledge.",
            keyFeatures: [
                "Enhanced context window and memory",
                "Multi-turn conversation reasoning",
                "Domain-specific language models",
                "Improved entity recognition and extraction",
                "Multilingual understanding (100+ languages)",
                "Dialect and colloquialism support"
            ],
            impact: "Dramatically improves conversation quality and reduces misunderstandings."
        }
    },
    {
        id: 23,
        title: "Agent Testing & Simulation Environment",
        description: "Comprehensive testing framework for validating agent behavior before deployment.",
        category: "infrastructure",
        status: "in-progress",
        period: "Q3 2025",
        quarter: "Q3 2025",
        date: "August 2025",
        owner: "Alex Thompson",
        prdLink: "https://docs.google.com/document/d/example-prd-testing-environment",
        details: {
            overview: "Robust testing and simulation platform enabling thorough validation of agent capabilities and edge cases.",
            keyFeatures: [
                "Automated test scenario generation",
                "Conversation simulation and replay",
                "Load testing and performance benchmarking",
                "Edge case detection and handling",
                "Regression testing framework",
                "Staging and production parity"
            ],
            impact: "Ensures agent quality and reliability before customer-facing deployment."
        }
    },
    {
        id: 24,
        title: "Enterprise Agent Governance",
        description: "Comprehensive governance framework for managing agent lifecycle, compliance, and risk.",
        category: "infrastructure",
        status: "in-progress",
        period: "Q3 2025",
        quarter: "Q3 2025",
        date: "September 2025",
        owner: "Rachel Foster",
        prdLink: "https://docs.google.com/document/d/example-prd-governance",
        details: {
            overview: "Enterprise-grade governance tools ensuring agents operate within defined policies and regulatory requirements.",
            keyFeatures: [
                "Policy-based agent controls",
                "Approval workflows for agent changes",
                "Compliance monitoring and reporting",
                "Risk assessment and mitigation",
                "Audit trail and change tracking",
                "Role-based access control (RBAC)"
            ],
            impact: "Enables safe, compliant deployment of agents at enterprise scale."
        }
    },
    {
        id: 25,
        title: "Agent Memory & Context Management",
        description: "Advanced memory systems enabling agents to maintain context across conversations and sessions.",
        category: "feature",
        status: "planned",
        period: "Q4 2025",
        quarter: "Q4 2025",
        date: "October 2025",
        owner: "Dr. Michael Zhang",
        prdLink: "https://docs.google.com/document/d/example-prd-memory-management",
        details: {
            overview: "Sophisticated memory architecture allowing agents to remember past interactions and build long-term relationships.",
            keyFeatures: [
                "Long-term conversation memory",
                "User preference learning and retention",
                "Cross-session context preservation",
                "Relationship history tracking",
                "Intelligent memory prioritization",
                "Privacy-compliant data retention"
            ],
            impact: "Creates more personalized, context-aware experiences that improve over time."
        }
    },
    {
        id: 26,
        title: "Emotional Intelligence & Sentiment Adaptation",
        description: "Agents that can detect and respond appropriately to user emotions and sentiment.",
        category: "feature",
        status: "planned",
        period: "Q4 2025",
        quarter: "Q4 2025",
        date: "November 2025",
        owner: "Dr. Emily Watson",
        prdLink: "https://docs.google.com/document/d/example-prd-emotional-intelligence",
        details: {
            overview: "Emotional intelligence capabilities enabling agents to recognize and adapt to user emotional states.",
            keyFeatures: [
                "Real-time sentiment analysis",
                "Emotion detection from text and voice",
                "Adaptive tone and empathy",
                "De-escalation strategies",
                "Emotional journey mapping",
                "Satisfaction prediction"
            ],
            impact: "Improves customer satisfaction through emotionally intelligent interactions."
        }
    },
    {
        id: 27,
        title: "Agent Performance Optimization AI",
        description: "Meta-AI system that continuously optimizes agent performance through automated tuning and learning.",
        category: "feature",
        status: "future",
        period: "Q4 2025",
        quarter: "Q4 2025",
        date: "December 2025",
        owner: "Dr. James Liu",
        prdLink: "https://docs.google.com/document/d/example-prd-optimization-ai",
        details: {
            overview: "Self-optimizing system that uses AI to improve AI agent performance without manual intervention.",
            keyFeatures: [
                "Automated prompt optimization",
                "Response quality improvement",
                "Conversation flow optimization",
                "A/B testing automation",
                "Performance anomaly detection",
                "Self-healing capabilities"
            ],
            impact: "Enables continuous improvement with minimal human oversight."
        }
    },
    {
        id: 28,
        title: "Cross-Platform Agent Deployment",
        description: "Deploy agents seamlessly across web, mobile, messaging, and voice channels from a single platform.",
        category: "integration",
        status: "planned",
        period: "Q3 2025",
        quarter: "Q3 2025",
        date: "September 2025",
        owner: "Nina Sharma",
        prdLink: "https://docs.google.com/document/d/example-prd-cross-platform",
        details: {
            overview: "Unified deployment framework enabling agents to operate consistently across all customer touchpoints.",
            keyFeatures: [
                "Web widget and embedded chat",
                "Native mobile app integration",
                "WhatsApp, SMS, and messaging platforms",
                "Voice and phone integration",
                "Email automation",
                "Social media channels"
            ],
            impact: "Provides consistent customer experience across all channels."
        }
    },
    {
        id: 29,
        title: "Agent Workflow Automation Studio",
        description: "Visual workflow builder for creating complex multi-step agent processes without coding.",
        category: "feature",
        status: "in-progress",
        period: "Q1 2025",
        quarter: "Q1 2025",
        date: "February 2025",
        owner: "Carlos Mendez",
        prdLink: "https://docs.google.com/document/d/example-prd-workflow-studio",
        details: {
            overview: "Intuitive visual interface for designing sophisticated agent workflows with conditional logic and integrations.",
            keyFeatures: [
                "Drag-and-drop workflow designer",
                "Conditional branching and logic",
                "Integration with external systems",
                "Workflow templates library",
                "Testing and debugging tools",
                "Version control and rollback"
            ],
            impact: "Empowers business users to create sophisticated automations without technical expertise."
        }
    },
    {
        id: 30,
        title: "Real-Time Agent Training & Updates",
        description: "Continuous learning system that updates agent knowledge in real-time based on new information.",
        category: "feature",
        status: "planned",
        period: "Q4 2025",
        quarter: "Q4 2025",
        date: "November 2025",
        owner: "Dr. Priya Gupta",
        prdLink: "https://docs.google.com/document/d/example-prd-realtime-training",
        details: {
            overview: "Dynamic knowledge management system enabling agents to stay current with latest information and policies.",
            keyFeatures: [
                "Real-time knowledge base updates",
                "Automatic policy and procedure sync",
                "Incremental learning without retraining",
                "Knowledge gap detection",
                "Expert feedback integration",
                "Version-controlled knowledge management"
            ],
            impact: "Ensures agents always have access to the most current and accurate information."
        }
    },
    {
        id: 31,
        title: "Agent Security & Privacy Controls",
        description: "Advanced security features including data encryption, access controls, and privacy compliance.",
        category: "infrastructure",
        status: "in-progress",
        period: "Q1 2025",
        quarter: "Q1 2025",
        date: "March 2025",
        owner: "Robert Chen",
        prdLink: "https://docs.google.com/document/d/example-prd-security-privacy",
        details: {
            overview: "Comprehensive security framework protecting sensitive data and ensuring regulatory compliance.",
            keyFeatures: [
                "End-to-end encryption",
                "PII detection and redaction",
                "Data residency controls",
                "Access control and authentication",
                "Compliance certifications (SOC 2, HIPAA, GDPR)",
                "Security audit logging"
            ],
            impact: "Enables secure deployment in highly regulated industries."
        }
    },
    {
        id: 32,
        title: "Agent Handoff Intelligence",
        description: "Smart routing system that determines optimal handoff points between agents and human experts.",
        category: "feature",
        status: "planned",
        period: "Q2 2025",
        quarter: "Q2 2025",
        date: "June 2025",
        owner: "Lisa Anderson",
        prdLink: "https://docs.google.com/document/d/example-prd-handoff-intelligence",
        details: {
            overview: "Intelligent system that identifies when human intervention is needed and routes to the best-suited expert.",
            keyFeatures: [
                "Confidence scoring for responses",
                "Complexity detection and escalation",
                "Expert matching and routing",
                "Context preservation during handoff",
                "Seamless transition experience",
                "Handoff analytics and optimization"
            ],
            impact: "Optimizes resource utilization while ensuring customer satisfaction."
        }
    },
    {
        id: 33,
        title: "Industry Vertical Solutions",
        description: "Pre-configured agent solutions tailored for specific industries with built-in compliance and best practices.",
        category: "feature",
        status: "planned",
        period: "Q3 2025",
        quarter: "Q3 2025",
        date: "August 2025",
        owner: "Amanda Sullivan",
        prdLink: "https://docs.google.com/document/d/example-prd-industry-verticals",
        details: {
            overview: "Industry-specific agent packages with pre-built workflows, knowledge bases, and compliance features.",
            keyFeatures: [
                "Healthcare: HIPAA-compliant patient engagement",
                "Financial Services: Fraud detection and account management",
                "Retail: Product recommendations and order management",
                "Manufacturing: Supply chain and inventory management",
                "Education: Student support and enrollment",
                "Real Estate: Property search and client management"
            ],
            impact: "Accelerates time-to-value with industry-tailored solutions."
        }
    },
    {
        id: 34,
        title: "Agent Developer SDK & APIs",
        description: "Comprehensive developer toolkit for building custom agent extensions and integrations.",
        category: "infrastructure",
        status: "planned",
        period: "Q2 2025",
        quarter: "Q2 2025",
        date: "May 2025",
        owner: "Kevin O'Brien",
        prdLink: "https://docs.google.com/document/d/example-prd-developer-sdk",
        details: {
            overview: "Full-featured SDK and API suite enabling developers to extend and customize agent capabilities.",
            keyFeatures: [
                "RESTful and GraphQL APIs",
                "SDKs for major languages (Python, JavaScript, Java)",
                "Webhook support for real-time events",
                "Custom action and skill development",
                "Comprehensive API documentation",
                "Developer sandbox environment"
            ],
            impact: "Enables unlimited customization and integration possibilities."
        }
    },
    {
        id: 35,
        title: "Agent Localization & Internationalization",
        description: "Multi-language support with cultural adaptation and region-specific customization.",
        category: "enhancement",
        status: "planned",
        period: "Q3 2025",
        quarter: "Q3 2025",
        date: "September 2025",
        owner: "Yuki Tanaka",
        prdLink: "https://docs.google.com/document/d/example-prd-localization",
        details: {
            overview: "Comprehensive internationalization framework supporting global deployment with local relevance.",
            keyFeatures: [
                "100+ language support",
                "Automatic language detection",
                "Cultural adaptation and localization",
                "Region-specific knowledge bases",
                "Time zone and currency handling",
                "Local compliance and regulations"
            ],
            impact: "Enables global deployment while maintaining local relevance and compliance."
        }
    },
    {
        id: 36,
        title: "Conversational AI Benchmarking",
        description: "Industry-standard benchmarking tools for measuring and comparing agent performance.",
        category: "enhancement",
        status: "planned",
        period: "Q4 2025",
        quarter: "Q4 2025",
        date: "October 2025",
        owner: "Dr. Samuel Brooks",
        prdLink: "https://docs.google.com/document/d/example-prd-benchmarking",
        details: {
            overview: "Standardized metrics and benchmarking framework for objective agent performance evaluation.",
            keyFeatures: [
                "Industry-standard performance metrics",
                "Competitive benchmarking",
                "Quality scoring frameworks",
                "Response accuracy measurement",
                "User satisfaction tracking",
                "ROI calculation tools"
            ],
            impact: "Provides objective measures of agent effectiveness and ROI."
        }
    },
    {
        id: 37,
        title: "Agent Explainability & Transparency",
        description: "Tools for understanding and explaining agent decision-making and responses.",
        category: "feature",
        status: "future",
        period: "2026+",
        quarter: "2026+",
        date: "2026",
        owner: "Dr. Maria Santos",
        prdLink: "https://docs.google.com/document/d/example-prd-explainability",
        details: {
            overview: "Transparency framework providing insights into how agents arrive at decisions and responses.",
            keyFeatures: [
                "Response reasoning explanation",
                "Decision tree visualization",
                "Confidence score breakdown",
                "Source attribution for information",
                "Bias detection and mitigation",
                "Audit trail for all decisions"
            ],
            impact: "Builds trust through transparency and enables continuous improvement."
        }
    },
    {
        id: 38,
        title: "Zero-Shot Agent Learning",
        description: "Agents that can handle new tasks and domains without explicit training or examples.",
        category: "feature",
        status: "future",
        period: "2026+",
        quarter: "2026+",
        date: "2026",
        owner: "Dr. Thomas Wright",
        prdLink: "https://docs.google.com/document/d/example-prd-zero-shot-learning",
        details: {
            overview: "Advanced AI capabilities enabling agents to generalize to new situations without specific training.",
            keyFeatures: [
                "Transfer learning across domains",
                "Few-shot and zero-shot learning",
                "Dynamic skill acquisition",
                "Adaptive problem-solving",
                "Cross-domain knowledge transfer",
                "Self-supervised learning"
            ],
            impact: "Dramatically reduces setup time and enables rapid adaptation to new use cases."
        }
    },
    {
        id: 39,
        title: "Agent Ecosystem & Partner Network",
        description: "Thriving ecosystem of technology partners, integrations, and third-party extensions.",
        category: "integration",
        status: "future",
        period: "2026+",
        quarter: "2026+",
        date: "2026",
        owner: "Sophie Martin",
        prdLink: "https://docs.google.com/document/d/example-prd-ecosystem",
        details: {
            overview: "Comprehensive partner ecosystem enabling seamless integration with leading business applications.",
            keyFeatures: [
                "Pre-built integrations with major platforms",
                "Partner certification program",
                "Co-innovation opportunities",
                "Integration marketplace",
                "Partner support and enablement",
                "Revenue sharing models"
            ],
            impact: "Accelerates adoption through extensive integration ecosystem."
        }
    },
    {
        id: 40,
        title: "Autonomous Agent Swarms",
        description: "Coordinated groups of specialized agents working together to solve complex problems.",
        category: "feature",
        status: "future",
        period: "2026+",
        quarter: "2026+",
        date: "2027+",
        owner: "Dr. Hassan Al-Rashid",
        prdLink: "https://docs.google.com/document/d/example-prd-agent-swarms",
        details: {
            overview: "Advanced multi-agent systems where specialized agents collaborate autonomously on complex tasks.",
            keyFeatures: [
                "Distributed problem-solving",
                "Agent specialization and roles",
                "Autonomous coordination",
                "Emergent behavior optimization",
                "Swarm intelligence algorithms",
                "Self-organizing agent networks"
            ],
            impact: "Enables handling of highly complex, multi-faceted business challenges."
        }
    }
];

// Default to V1 for backward compatibility
const roadmapData = roadmapDataV1;

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { roadmapData, roadmapDataV1, roadmapDataV2 };
}

// Combined historical roadmap (V1 + V2 + V3 collapsed into one array)
// V1 items: ids 1-17, tagged version='v1'  (Q4 2024 – Q4 2025)
// V2 items: ids 18-40, tagged version='v2' (Q1 2025 – 2026+)
// V3 items: re-IDed 41-84, tagged version='v3' (Q1-Q2 2026, TBD)
const roadmapDataCombined = [
    // --- V1 + V2 items (V2 already spreads V1) ---
    ...roadmapDataV2.map(item => ({
        ...item,
        version: item.id <= 17 ? 'v1' : 'v2',
    })),
];
// V3 items are appended after roadmapDataV3 is defined (see bottom of file)



// Agentforce Roadmap Data - V3
// Updated: March 18, 2026
// Source: https://docs.google.com/presentation/d/11g5VdITfFogvlE83M43xRsS_Lnyn9KO_kGKoClSTtXI/
// Note: This data has been refined with improved titles, categories, and descriptions

const roadmapDataV3 = [
    // ===== Q1 2026 =====
    {
        id: 1,
        title: "Open Web Search as OOTB action",
        description: "Complete: Open Web Search as OOTB action In Progress: Open Web Search in Prompt Builder Details: Enable web search as part of Standard Knowledge Action for real-time answers Web Search Action: Open Web Search Combine web search results with files and internal knowledge for accurate responses Creatio",
        category: "knowledge",
        status: "completed",
        period: "Q1 2026",
        quarter: "Q1 2026",
        date: "Feb-Mar 2026 (safe harbor, target date only)",
        details: {
            overview: "Complete: Open Web Search as OOTB action In Progress: Open Web Search in Prompt Builder Details: Enable web search as part of Standard Knowledge Action for real-time answers Web Search Action: Open Web Search Combine web search results with files and internal knowledge for accurate responses Creatio",
            keyFeatures: [],
            impact: "Users can execute web-based, and knowledge-driven tasks Eliminate context-switching between internal and external research tools Allow end users to focus on analysis by automating data extraction from trusted websites (via Allowed domains in search the web Agent Action ) Multi-Vendor Web Search Supp"
        }
    },
    {
        id: 2,
        title: "Allow prompt templates to be used anywhere and everywhere. Two main aspects:",
        description: "Allow prompt templates to be used anywhere and everywhere. Two main aspects: Execute: a prompt template should be able to be invoked by any application [via existing or enhanced APIs] Author: users create prompt templates from other interfaces such as Grid, Test center, Slack, etc.",
        category: "testing",
        status: "planned",
        period: "Q1 2026",
        quarter: "Q1 2026",
        date: "Mar 2026 (safe harbor, target date)",
        details: {
            overview: "Allow prompt templates to be used anywhere and everywhere. Two main aspects: Execute: a prompt template should be able to be invoked by any application [via existing or enhanced APIs] Author: users create prompt templates from other interfaces such as Grid, Test center, Slack, etc.",
            keyFeatures: [],
            impact: "Easier way to create AI instructions flexibly, across any interface or application Embeddable Prompt Composer Build Today Roadmap Confidential"
        }
    },
    {
        id: 3,
        title: "Support multi-turn conversation simulation and testing for both text and voice agents.",
        description: "Support multi-turn conversation simulation and testing for both text and voice agents. Allow users to simulate realistic user interactions, identify logic/voice behavioral issues, and evaluate if the agent successfully resolved the user’s intent over the course of a full session Users can simulate t",
        category: "testing",
        status: "pilot",
        period: "Q1 2026",
        quarter: "Q1 2026",
        date: "Mar 2026 Pilot (safe harbor, target date only)",
        details: {
            overview: "Support multi-turn conversation simulation and testing for both text and voice agents. Allow users to simulate realistic user interactions, identify logic/voice behavioral issues, and evaluate if the agent successfully resolved the user’s intent over the course of a full session Users can simulate t",
            keyFeatures: [],
            impact: "Current testing capabilities are limited to single Q&A pairs (turn-level). Customers have expressed a need to test entire conversations across both text and voice modalities in order to handle complex scenarios: Multi-step conversation flows Branching logic and conditional paths Context and state re"
        }
    },
    {
        id: 4,
        title: "Switch to Google Gemini for Agentforce Reasoning Engine plus standard/custom actions",
        description: "Switch to Google Gemini for Agentforce Reasoning Engine plus standard/custom actions Initial launch will support NGA’s Daisy Planner only [Voice/Flash planner on horizon] Gemini 3 Flash support is the primary target model for Mar-Apr 2026 GA, with Gemini 3 Pro now available in LLM GW (as of Dec 2025",
        category: "feature",
        status: "in-progress",
        period: "Q1 2026",
        quarter: "Q1 2026",
        date: "Mar-Apr 2026  (safe harbor, target date only)",
        details: {
            overview: "Switch to Google Gemini for Agentforce Reasoning Engine plus standard/custom actions Initial launch will support NGA’s Daisy Planner only [Voice/Flash planner on horizon] Gemini 3 Flash support is the primary target model for Mar-Apr 2026 GA, with Gemini 3 Pro now available in LLM GW (as of Dec 2025",
            keyFeatures: [],
            impact: "Provide customers with preferred model choice Agentforce on Gemini Live in Pilot now LLM Model Support Confidential"
        }
    },
    {
        id: 5,
        title: "Transitioning to Salesforce hosted, fine-tuned version of GPT OSS",
        description: "Customer impact should be minimal as the following updates are related to backend updates to enhance performance and security Text evals, topic classification / hyper classifiers, citations, etc all currently use QWEN based models Transitioning to Salesforce hosted, fine-tuned version of GPT OSS",
        category: "knowledge",
        status: "planned",
        period: "Q1 2026",
        quarter: "Q1 2026",
        date: "Mar 2026  (safe harbor, target date only)",
        details: {
            overview: "Customer impact should be minimal as the following updates are related to backend updates to enhance performance and security Text evals, topic classification / hyper classifiers, citations, etc all currently use QWEN based models Transitioning to Salesforce hosted, fine-tuned version of GPT OSS",
            keyFeatures: [],
            impact: "Customers will benefit from performance and latency reduction of our instance of GPT OSS, while also meeting model compliance/security requirements Transition from QWEN based models to GPTOSS Model compliance/security/performance enhancements Source Image: AI Research: https://www.salesforceairesear"
        }
    },
    {
        id: 6,
        title: "In Progress: LLM Batch Processing in Gov Cloud",
        description: "In Progress: LLM Batch Processing in Gov Cloud Previously released: Dec 2025: LLM Batch Processing via system pipeline (prompt templates Batch API through provider Batch API) - APEX Feb 2026: LLM Batch Processing for Flow (prompt templates Batch API through provider Batch API) Flow + Anthropic suppo",
        category: "platform",
        status: "planned",
        period: "Q1 2026",
        quarter: "Q1 2026",
        date: "Mar-Apr 2026 (safe harbor)",
        details: {
            overview: "In Progress: LLM Batch Processing in Gov Cloud Previously released: Dec 2025: LLM Batch Processing via system pipeline (prompt templates Batch API through provider Batch API) - APEX Feb 2026: LLM Batch Processing for Flow (prompt templates Batch API through provider Batch API) Flow + Anthropic suppo",
            keyFeatures: [],
            impact: "The shift to Model Provider Batch APIs significantly enhances capacity and efficiency. Previously, Prompt Template batch processing relied on the single generation API, necessitating staggered, asynchronous LLM calls to prevent rate limiting, which capped capacity at 1,000 generations per 24 hours. "
        }
    },
    {
        id: 7,
        title: "Intelligent dynamic routing will be incorporated from scale tier to priority tier when necessary",
        description: "All sandbox org agents will have the same model performance profile, similar to production active orgs. In the backend, an increase of utilization to scale tiers will be adopted: revised routing will send non AF traffic to scale tiers during non-business hours of US time and have 24x7 high utilizati",
        category: "integration",
        status: "planned",
        period: "Q1 2026",
        quarter: "Q1 2026",
        date: "Mar 2026 (safe harbor, target date only)",
        details: {
            overview: "All sandbox org agents will have the same model performance profile, similar to production active orgs. In the backend, an increase of utilization to scale tiers will be adopted: revised routing will send non AF traffic to scale tiers during non-business hours of US time and have 24x7 high utilizati",
            keyFeatures: [],
            impact: "Customers expect predictable throughput and latency when customers use Sandbox orgs for Agentforce agents This feature enhancement is designed to improve performance within sandbox org environments as well as operational efficiencies that improve model/latency/limits AF Sandbox Orgs routing on premi"
        }
    },
    {
        id: 8,
        title: "Gov Cloud FedRamp High catch up",
        description: "Gov Cloud civilian instance has all GA features released Feb - July 2025 Features have completed GVAT review",
        category: "analytics",
        status: "in-progress",
        period: "Q1 2026",
        quarter: "Q1 2026",
        date: "Mar-Apr 2026 (safe harbor, target date only)",
        details: {
            overview: "Gov Cloud civilian instance has all GA features released Feb - July 2025 Features have completed GVAT review",
            keyFeatures: [],
            impact: "Gov Cloud requirements needed to unlock adoption across pub sector Details: Reliant on internal Qwen model transition In Progress: Testing Center & Evals, Citation & Instruction Adherence Pending: Optimization, Batch LLM, Planner Ready: Analytics Gov Cloud Confidential"
        }
    },
    {
        id: 9,
        title: "High demand for multi-agent interoperability for scalable outcomes across Agentic projects",
        description: "Enterprise-grade, interoperable orchestration layer that makes agent networks work in production securely, and at scale. Agents across different Salesforce orgs discovering, communicating, and collaborating through shared standards and trusted governance",
        category: "feature",
        status: "planned",
        period: "Q1 2026",
        quarter: "Q1 2026",
        date: "Dec - Mar 2026 (safe harbor, target date only)",
        details: {
            overview: "Enterprise-grade, interoperable orchestration layer that makes agent networks work in production securely, and at scale. Agents across different Salesforce orgs discovering, communicating, and collaborating through shared standards and trusted governance",
            keyFeatures: [],
            impact: "High demand for multi-agent interoperability for scalable outcomes across Agentic projects MOMA Pilot Closed customer pilot, December 2025 Interoperability Confidential"
        }
    },
    {
        id: 10,
        title: "A2A Inbound:",
        description: "March 2026 A2A Inbound: Allows external agents to connect to AF agents June 2026 A2A Outbound: Allow internal agents to connect to external 3P agents Agent Card: 3P agents advertise their capabilities, allowing customers to identify if the 3P agent is the right fit for the task Universal Handshake: ",
        category: "feature",
        status: "planned",
        period: "Q1 2026",
        quarter: "Q1 2026",
        date: "Mar",
        details: {
            overview: "March 2026 A2A Inbound: Allows external agents to connect to AF agents June 2026 A2A Outbound: Allow internal agents to connect to external 3P agents Agent Card: 3P agents advertise their capabilities, allowing customers to identify if the 3P agent is the right fit for the task Universal Handshake: ",
            keyFeatures: [],
            impact: "High demand for agent 2 agent interoperability for scalable outcomes across Agentic projects, not siloed within one vendor’s stack 3P Agents (A2A) Pilot Closed pilot Interoperability Confidential"
        }
    },
    {
        id: 11,
        title: "Simple way to connect an Agent to Slack",
        description: "Simple way to connect an Agent to Slack Eliminate reliance on generic API-based connection Reduce install and compatibility friction for customers using existing legacy Slack apps",
        category: "integration",
        status: "planned",
        period: "Q1 2026",
        quarter: "Q1 2026",
        date: "Mar 2026 (safe harbor, target date only)",
        details: {
            overview: "Simple way to connect an Agent to Slack Eliminate reliance on generic API-based connection Reduce install and compatibility friction for customers using existing legacy Slack apps",
            keyFeatures: [],
            impact: "Today, bringing an Agent into Slack requires configuring a generic API connection via Salesforce Connected App - the process is confusing for admins - it is unclear in the UI that this is the required step. This feature has been created to remove compatibility issues running between legacy Salesforc"
        }
    },
    {
        id: 12,
        title: "Conversational quality, interactions more natural and responsive",
        description: "Conversational quality, interactions more natural and responsive Multimodal: flip between text and voice within the same conversation Rich content & media: render images, tables, and markdowns Page navigation and website events such as clicks enable more tailored guidance SCV (Service Cloud Voice)/ ",
        category: "memory",
        status: "planned",
        period: "Q1 2026",
        quarter: "Q1 2026",
        date: "Mar 2026 + multiple phases (safe harbor, target dates)",
        details: {
            overview: "Conversational quality, interactions more natural and responsive Multimodal: flip between text and voice within the same conversation Rich content & media: render images, tables, and markdowns Page navigation and website events such as clicks enable more tailored guidance SCV (Service Cloud Voice)/ ",
            keyFeatures: [],
            impact: "Meet market demand as well as improve agentic experience for customers Agentforce Voice Enhanced Platform & Voice TAM Expansion Deploy Confidential"
        }
    },
    {
        id: 13,
        title: "A unified planner will combine both voice and chat agents together",
        description: "A unified planner will combine both voice and chat agents together",
        category: "feature",
        status: "in-progress",
        period: "Q1 2026",
        quarter: "Q1 2026",
        date: "Mar-Apr 2026 (safe harbor, target date only)",
        details: {
            overview: "A unified planner will combine both voice and chat agents together",
            keyFeatures: [],
            impact: "Currently voice and chat are using separate planners, causing inefficient end to end processes This will reduce the complexity of having to support multiple planners and bring determinism to voice agents (and more) Details: Voice planner (Flash) and NGA planner (Daisy) Flash and Daisy planners are a"
        }
    },
    {
        id: 14,
        title: "Org level consent management",
        description: "Org level consent management AI features migration to self-service consent management",
        category: "feature",
        status: "planned",
        period: "Q1 2026",
        quarter: "Q1 2026",
        date: "Feb 2026 (safe harbor, target date only)",
        details: {
            overview: "Org level consent management AI features migration to self-service consent management",
            keyFeatures: [],
            impact: "Allow customers to easily manage consent for data usage in global models, service improvement, and R&D activities. Consent Management for customer data usage Release notes Security & Privacy Confidential"
        }
    },
    {
        id: 15,
        title: "This capability is for SALESFORCE INTERNAL STAFF ONLY -",
        description: "This capability is for SALESFORCE INTERNAL STAFF ONLY - do not try to sell this Provide a framework for internal teams to build immutable/uneditable agents to the end-user, enabling automatic updates to agents without a migration script There will be no UI for file based agents",
        category: "feature",
        status: "planned",
        period: "Q1 2026",
        quarter: "Q1 2026",
        date: "Feb 2026 (safe harbor, target date only)",
        details: {
            overview: "This capability is for SALESFORCE INTERNAL STAFF ONLY - do not try to sell this Provide a framework for internal teams to build immutable/uneditable agents to the end-user, enabling automatic updates to agents without a migration script There will be no UI for file based agents",
            keyFeatures: [],
            impact: "As an internal cloud team building agents: I want to create agents that are in the background and created from the system I want to create an agent that is uneditable by my end customer and controlled only by my team I want to push automatic upgrades to my agent without requiring data migrations I w"
        }
    },

    // ===== Q2 2026 =====
    {
        id: 16,
        title: "Agent Conversation Memory",
        description: "Agent conversation memory as well as user profile memory This feature will track a logged-in user's role and personal memory ensuring a personalized and contextual experience. Agents will carry context across sessions, recall past interactions and deliver faster, smarter workflows Opt-in privacy, go",
        category: "memory",
        status: "pilot",
        period: "Q2 2026",
        quarter: "Q2 2026",
        date: "Closed Pilot Apr-May 2026  (safe harbor, target date only)",
        details: {
            overview: "Agent conversation memory as well as user profile memory This feature will track a logged-in user's role and personal memory ensuring a personalized and contextual experience. Agents will carry context across sessions, recall past interactions and deliver faster, smarter workflows Opt-in privacy, go",
            keyFeatures: [],
            impact: "A better user experience if agents can retain short and long term memory of previous sessions and preferences. AI Context Confidential"
        }
    },
    {
        id: 17,
        title: "ADL as a Retriever Action:",
        description: "ADL as a Retriever Action: Enable grounding on multiple data sources by allowing multiple ADL retriever actions within an agent. This will expose Retriever Actions as a native agent action (similar to Apex, Flow, etc.) and allow attaching multiple ADLs to a single agent in the builder. Future enhanc",
        category: "knowledge",
        status: "planned",
        period: "Q2 2026",
        quarter: "Q2 2026",
        date: "Apr-May 2026 (safe harbor, target dates)",
        details: {
            overview: "ADL as a Retriever Action: Enable grounding on multiple data sources by allowing multiple ADL retriever actions within an agent. This will expose Retriever Actions as a native agent action (similar to Apex, Flow, etc.) and allow attaching multiple ADLs to a single agent in the builder. Future enhanc",
            keyFeatures: [],
            impact: "Access Multiple Knowledge Sources: Previously, each agent was limited to one ADL (without workarounds). Retriever Actions/Expansion to an n-n model will enable customers to access multiple knowledge sources and answer complex queries. Expedite ADL Creation: Previously, Search Indexes were created as"
        }
    },
    {
        id: 18,
        title: "Connection Variables Support",
        description: "Introduction of an object that automatically represents the Surface context data of the Surface associated with the Agent Session during runtime. The object mimics how Salesforce Flow handles $Record, offering a simpler, declarative entry point to Surface context data Provides admin configurability ",
        category: "memory",
        status: "planned",
        period: "Q2 2026",
        quarter: "Q2 2026",
        date: "Apr-May  2026 (safe harbor, target date only)",
        details: {
            overview: "Introduction of an object that automatically represents the Surface context data of the Surface associated with the Agent Session during runtime. The object mimics how Salesforce Flow handles $Record, offering a simpler, declarative entry point to Surface context data Provides admin configurability ",
            keyFeatures: [],
            impact: "There is currently no OOTB way to reference a context variable scoped specific to a Surface (consistently), and this requires manual input variables or confusing naming conventions. Connection Variables Support Also named as “surface specific context variables support” AI Context Confidential"
        }
    },
    {
        id: 19,
        title: "Support for the following:",
        description: "Provide admin configurability to use custom connections, custom response actions, modify connection Instructions, add determinism to tailor the last mile experience for Agents. Support for the following: Custom Connections & Custom Response Actions Custom Messaging Components in Agents Customizing C",
        category: "memory",
        status: "planned",
        period: "Q2 2026",
        quarter: "Q2 2026",
        date: "May-June 2026 (safe harbor, target date only)",
        details: {
            overview: "Provide admin configurability to use custom connections, custom response actions, modify connection Instructions, add determinism to tailor the last mile experience for Agents. Support for the following: Custom Connections & Custom Response Actions Custom Messaging Components in Agents Customizing C",
            keyFeatures: [],
            impact: "Agents currently rely on LLM-driven planning to determine response actions, which may lead to inconsistent or unpredictable UI experiences. Admins lack fine-grained surface-aware configuration ability available to them today. Problems experienced: lack of control over when response actions aka outpu"
        }
    },
    {
        id: 20,
        title: "Renaming topics and actions to subagents and tools",
        description: "Renaming topics and actions to subagents and tools",
        category: "platform",
        status: "pilot",
        period: "Q2 2026",
        quarter: "Q2 2026",
        date: "April 2026 (Target Beta, safe harbor)",
        details: {
            overview: "Renaming topics and actions to subagents and tools",
            keyFeatures: [],
            impact: "Position Agentforce competitively and inline with market innovation Rename Topics and Actions Subagents and Tools AI Setup & Build Confidential Topics Actions Subagents Tools"
        }
    },
    {
        id: 21,
        title: "Quick start experience",
        description: "Quick start experience AI tooling for developers One click setup, enabling developers to build agents instantly using preferred tools like Claude Code One-click paths include: Builder → Complete Claude Code Experience",
        category: "platform",
        status: "pilot",
        period: "Q2 2026",
        quarter: "Q2 2026",
        date: "April 2026 (Target Beta, safe harbor)",
        details: {
            overview: "Quick start experience AI tooling for developers One click setup, enabling developers to build agents instantly using preferred tools like Claude Code One-click paths include: Builder → Complete Claude Code Experience",
            keyFeatures: [],
            impact: "Reduce technical friction and time to value Developer Easy Self Service Easy setup to build agents for developers AI Setup Confidential Image for roadmap visibility only, UI may be subject to change"
        }
    },
    {
        id: 22,
        title: "Grid supports querying data across CRM, DC, running Agents, Prompts and Invocable Actions.",
        description: "A spreadsheet-like interface that allows users to rapidly design, test, and operationalize AI workflows at scale. Combines Salesforce data, prompts, actions, and agents in a single surface, making it easy to build complex AI processes without writing code. Flexibly discover your data and do more wit",
        category: "testing",
        status: "in-progress",
        period: "Q2 2026",
        quarter: "Q2 2026",
        date: "April 2026 (Target GA, safe harbor)",
        details: {
            overview: "A spreadsheet-like interface that allows users to rapidly design, test, and operationalize AI workflows at scale. Combines Salesforce data, prompts, actions, and agents in a single surface, making it easy to build complex AI processes without writing code. Flexibly discover your data and do more wit",
            keyFeatures: [],
            impact: "Our customers were faced with 50+ hours trying to test AI workflows, pulling in data from multiple sources, manually processing data, and running custom script for AI models. Agentforce Grid simplifies these manual efforts by providing a single, intuitive interface where anyone can create and run wo"
        }
    },
    {
        id: 23,
        title: "Improved experience for analytics and enhanced experience with optimization to tie it to analytics",
        description: "Improved experience for analytics and enhanced experience with optimization to tie it to analytics Integrated data models for additional services such as feedback, RAG, DW, etc. Improvements include deflection and abandonment metrics, as well as revised ASA (Service Agent), and Employee Agent Analyt",
        category: "analytics",
        status: "planned",
        period: "Q2 2026",
        quarter: "Q2 2026",
        date: "Apr 2026  (safe harbor, target date only)",
        details: {
            overview: "Improved experience for analytics and enhanced experience with optimization to tie it to analytics Integrated data models for additional services such as feedback, RAG, DW, etc. Improvements include deflection and abandonment metrics, as well as revised ASA (Service Agent), and Employee Agent Analyt",
            keyFeatures: [],
            impact: "Based off customer feedback, additional granularity within Agent reporting is required for optimal usage. Agentforce Analytics | Revised Experience Observe Confidential"
        }
    },
    {
        id: 24,
        title: "Metadata support for pro-code users",
        description: "Metadata support for pro-code users Enhanced custom evaluations (evals) Create test cases from observability sessions Feature parity with Testing Center in setup",
        category: "testing",
        status: "in-progress",
        period: "Q2 2026",
        quarter: "Q2 2026",
        date: "April 2026  (safe harbor, target date only)",
        details: {
            overview: "Metadata support for pro-code users Enhanced custom evaluations (evals) Create test cases from observability sessions Feature parity with Testing Center in setup",
            keyFeatures: [],
            impact: "Testing Center advancements unified with the rest of the Next Gen Authoring Suite of features, creating better stability, recoverability, user experience within the UI, allowing for all the above feature capabilities to be created) Next Gen Testing GA Roadmap visual only, subject to change Test Conf"
        }
    },
    {
        id: 25,
        title: "Custom Scorers Beta",
        description: "Define and manage scorers (view, create prompt/expression-based, edit, test, activate, clone) in Studio Use Scorers in testing UI, API, CLI & Observability (abandonment, deflection, custom: CSAT, quality)",
        category: "analytics",
        status: "planned",
        period: "Q2 2026",
        quarter: "Q2 2026",
        date: "April 2026  (safe harbor, target date only)",
        details: {
            overview: "Define and manage scorers (view, create prompt/expression-based, edit, test, activate, clone) in Studio Use Scorers in testing UI, API, CLI & Observability (abandonment, deflection, custom: CSAT, quality)",
            keyFeatures: [],
            impact: "Enable the ability to test agents so they meet their intended function (e.g. product relevance, brand tone), and adherence by providing configurable evaluation metrics Custom Scorers Beta Roadmap visual only, subject to change Test Confidential"
        }
    },
    {
        id: 26,
        title: "Planner provides detailed error messages instead of, “something went wrong”.",
        description: "Comprehensive error handling architecture that transforms generic technical failures into transparent, actionable, user-centric events Planner provides detailed error messages instead of, “something went wrong”.",
        category: "feature",
        status: "planned",
        period: "Q2 2026",
        quarter: "Q2 2026",
        date: "Apr  2026 (safe harbor, target date only)",
        details: {
            overview: "Comprehensive error handling architecture that transforms generic technical failures into transparent, actionable, user-centric events Planner provides detailed error messages instead of, “something went wrong”.",
            keyFeatures: [],
            impact: "Reduce the need for ~40% customer investigations Agentforce Platform Error Architecture Backend architectural changes to improve speed and performance *intended for roadmap illustrative purposes only Cloud Performance Confidential"
        }
    },
    {
        id: 27,
        title: "Enhanced Customer Agent Security Options for SOQL Actions",
        description: "More flexible and granular security controls when building customer-facing service agents (ASAs) Phased by complexity: external Org Wide Defaults ( OWDs ), Contact ID Filtering, User Mode & Action-Based Perm Sets",
        category: "memory",
        status: "planned",
        period: "Q2 2026",
        quarter: "Q2 2026",
        date: "Apr 2026  (safe harbor, target date only)",
        details: {
            overview: "More flexible and granular security controls when building customer-facing service agents (ASAs) Phased by complexity: external Org Wide Defaults ( OWDs ), Contact ID Filtering, User Mode & Action-Based Perm Sets",
            keyFeatures: [],
            impact: "Improve default security posture while enabling flexible, least-privilege permission models for agents. Historically, the lack of consistent patterns for how agents authenticate and execute actions has created risk and complexity for customers. Security & Privacy Confidential"
        }
    },
    {
        id: 28,
        title: "May - June 2026",
        description: "An improved Agent API (v2) designed to eliminate high latency, multi-hop legacy architecture of Einstein Bots (v1.x) Roadmap includes integration with Daisy ++ engine, conversational endpoints streaming direct from start session / send message, parity with scrt (service cloud run time), voice, next ",
        category: "memory",
        status: "planned",
        period: "Q2 2026",
        quarter: "Q2 2026",
        date: "May - June 2026",
        details: {
            overview: "An improved Agent API (v2) designed to eliminate high latency, multi-hop legacy architecture of Einstein Bots (v1.x) Roadmap includes integration with Daisy ++ engine, conversational endpoints streaming direct from start session / send message, parity with scrt (service cloud run time), voice, next ",
            keyFeatures: [],
            impact: "Collapses service dependency chain down to a single core reasoning layer Reduces Time to First Message (TTFM) and Time to First Audio (TTFA) Agent API 2.0 Multiple rollouts and phased approach Interoperability Confidential"
        }
    },
    {
        id: 29,
        title: "Experience will include NGA, API Catalog, External Services, Platform Radio",
        description: "Ability to onboard Salesforce 1P MCP servers and deliver a usable, safe NGA integration experience for builders Experience will include NGA, API Catalog, External Services, Platform Radio",
        category: "platform",
        status: "in-progress",
        period: "Q2 2026",
        quarter: "Q2 2026",
        date: "April 2026",
        details: {
            overview: "Ability to onboard Salesforce 1P MCP servers and deliver a usable, safe NGA integration experience for builders Experience will include NGA, API Catalog, External Services, Platform Radio",
            keyFeatures: [],
            impact: "Enable 3P MCP Servers to be connected to AF Agents, allowing Agentforce to be more interoperable MCP Client & Gateway GA Multiple rollouts and phased approach Interoperability Confidential"
        }
    },
    {
        id: 30,
        title: "Currently in closed customer pilots, beta",
        description: "Single-Org Multi-Agent (SOMA) facilitates multiple Salesforce AI agents to collaborate within a single org Behind the scenes, a primary orchestrator agent intelligently coordinates and delegates tasks to specialized agents, ensuring each task is handled by the agent best equipped for it. SOMA preser",
        category: "memory",
        status: "pilot",
        period: "Q2 2026",
        quarter: "Q2 2026",
        date: "Beta Apr 2026 (safe harbor, target dates only)",
        details: {
            overview: "Single-Org Multi-Agent (SOMA) facilitates multiple Salesforce AI agents to collaborate within a single org Behind the scenes, a primary orchestrator agent intelligently coordinates and delegates tasks to specialized agents, ensuring each task is handled by the agent best equipped for it. SOMA preser",
            keyFeatures: [],
            impact: "End users can manage one unified conversational touchpoint, instead of trying to manage conversations with different agents individually. S OMA Beta Currently in closed customer pilots, beta Apr 2026 Interoperability Confidential"
        }
    },

    // ===== Q4 2026 =====
    {
        id: 31,
        title: "Beta Dec 2025;",
        description: "Agentforce Studio - home for all the following: Agentforce Assistant Canvas Interaction Summary Simulator for Agentforce Builder Agent Graph [editable via canvas or script] Connections File Explorer Script View Metadata APIs",
        category: "memory",
        status: "in-progress",
        period: "Q4 2026",
        quarter: "Q4 2026",
        date: "Beta Dec 2025;",
        details: {
            overview: "Agentforce Studio - home for all the following: Agentforce Assistant Canvas Interaction Summary Simulator for Agentforce Builder Agent Graph [editable via canvas or script] Connections File Explorer Script View Metadata APIs",
            keyFeatures: [],
            impact: "A new way to configure agents that showcases an industry leading interface, facilitating granular detail through script and session tracing views - as well as non technical capabilities such as a conversational agent, a natural language instruction canvas, as well as picklists to select logical/dete"
        }
    },

    // ===== TBD =====
    {
        id: 32,
        title: "Agentforce Data Library DC1 Support has been launching across 3 x key phases",
        description: "Agentforce Data Library DC1 Support has been launching across 3 x key phases Phase 1 [GA, June 2025]: Data Sources = Custom Retriever Default data space = Y; Non-default data space = Y Phase 2 [Mar 2026]: Data Sources = Salesforce Knowledge & Files Default data space = Y; Non-default data space = N ",
        category: "knowledge",
        status: "in-progress",
        period: "TBD",
        quarter: "TBD",
        date: "Various targets across phases  (safe harbor, target date only)",
        details: {
            overview: "Agentforce Data Library DC1 Support has been launching across 3 x key phases Phase 1 [GA, June 2025]: Data Sources = Custom Retriever Default data space = Y; Non-default data space = Y Phase 2 [Mar 2026]: Data Sources = Salesforce Knowledge & Files Default data space = Y; Non-default data space = N ",
            keyFeatures: [],
            impact: "Data Cloud One allows multiple Orgs to share a central Data Cloud instance. Enabling ADL to be DC1 compatible allows customers to create agents in companion orgs and access data from their respective data spaces ADL Data Cloud 1 (DC1) Compatibility Phase 2: Mar 2026; Phase 3: May-June AI Context Con"
        }
    },
    {
        id: 33,
        title: "Designed for AI Practitioners",
        description: "Agentforce Roadmap Designed for AI Practitioners Q2 Mar Apr May 2 026",
        category: "feature",
        status: "planned",
        period: "TBD",
        quarter: "TBD",
        date: "",
        details: {
            overview: "Agentforce Roadmap Designed for AI Practitioners Q2 Mar Apr May 2 026",
            keyFeatures: [],
            impact: ""
        }
    },
    {
        id: 34,
        title: "Mar 2026: Performance Metrics",
        description: "Integrate unit testing metrics directly into Prompt Builder UI Display performance metrics such as token size and latency, evaluation API metrics and allow custom evaluations. Provide an option to link directly to Testing Center for batch testing",
        category: "analytics",
        status: "planned",
        period: "TBD",
        quarter: "TBD",
        date: "",
        details: {
            overview: "Integrate unit testing metrics directly into Prompt Builder UI Display performance metrics such as token size and latency, evaluation API metrics and allow custom evaluations. Provide an option to link directly to Testing Center for batch testing",
            keyFeatures: [],
            impact: "Allow Prompt Builder UI users to test using consistent and standardized metrics/methods across Salesforce AI Prompt Builder Testing Test Confidential"
        }
    },
    {
        id: 35,
        title: "Orchestration",
        description: "Operate Orchestration Experiences Roadmap Highlights Control New New New New Next Next Next Next Voice Global Availability GA | Feb - WT Sydney Voice in Mobile SDK GA | March MCP Support Beta | Today Multi-Agent Orchestration Beta | April - TDX Agentforce Script GA | Feb 2 6 Agentforce Script for V",
        category: "testing",
        status: "in-progress",
        period: "TBD",
        quarter: "TBD",
        date: "",
        details: {
            overview: "Operate Orchestration Experiences Roadmap Highlights Control New New New New Next Next Next Next Voice Global Availability GA | Feb - WT Sydney Voice in Mobile SDK GA | March MCP Support Beta | Today Multi-Agent Orchestration Beta | April - TDX Agentforce Script GA | Feb 2 6 Agentforce Script for V",
            keyFeatures: [],
            impact: ""
        }
    },
    {
        id: 36,
        title: "Escalation: wait time + business hours",
        description: "safe harbor, target dates only: Jan 26 NGA setup Feb 26 Escalation: wait time + business hours Downloadable transcripts (text only) Mar 26 Post-chat Pre-chat Auth: verified external user 1 Mobile SDK for Agentforce with Voice April 26: Voice mode TBC: File upload/attachments",
        category: "platform",
        status: "in-progress",
        period: "TBD",
        quarter: "TBD",
        date: "",
        details: {
            overview: "safe harbor, target dates only: Jan 26 NGA setup Feb 26 Escalation: wait time + business hours Downloadable transcripts (text only) Mar 26 Post-chat Pre-chat Auth: verified external user 1 Mobile SDK for Agentforce with Voice April 26: Voice mode TBC: File upload/attachments",
            keyFeatures: [],
            impact: "Currently not at parity with ECV1 and the integration of voice mode is in high demand. Parity provides critical functionality for customers migrating from ECV1 (escalation, pre/post chat, transcripts, etc. Voice mode enables a new modality for crafting hands-off in web agentic experiences and improv"
        }
    },
    {
        id: 37,
        title: "Previously Released:",
        description: "Previously Released: Standard flex types, instruction only prompts, optional inputs Feb 2026 : Version level inputs, configurable resources, inline picker",
        category: "prompts",
        status: "planned",
        period: "TBD",
        quarter: "TBD",
        date: "",
        details: {
            overview: "Previously Released: Standard flex types, instruction only prompts, optional inputs Feb 2026 : Version level inputs, configurable resources, inline picker",
            keyFeatures: [],
            impact: "Provides flexibility to ensure that templates can adapt to unforeseen grounding information and varying input quantities within existing standard types & connected UI experiences, without requiring the creation of entirely new templates and deployment user experiences. Configurable inputs and resour"
        }
    },
    {
        id: 38,
        title: "Deeper Dive",
        description: "Deeper Dive ~30, 60, 90 Days Intended for internal purposes only",
        category: "feature",
        status: "planned",
        period: "TBD",
        quarter: "TBD",
        date: "",
        details: {
            overview: "Deeper Dive ~30, 60, 90 Days Intended for internal purposes only",
            keyFeatures: [],
            impact: ""
        }
    },
    {
        id: 39,
        title: "SSOT Agentforce Roadmap",
        description: "SSOT Agentforce Roadmap June 2025 and before Editions July 2025 Edition August 2025 Edition September 2025 Edition October 2025 [ Dreamforce SIC Content ] November 2025 December 2025 January February 2026 March 2026 [this edition] Technical Release Readiness (TRR) July 2025 ( webinar ) August",
        category: "feature",
        status: "planned",
        period: "TBD",
        quarter: "TBD",
        date: "",
        details: {
            overview: "SSOT Agentforce Roadmap June 2025 and before Editions July 2025 Edition August 2025 Edition September 2025 Edition October 2025 [ Dreamforce SIC Content ] November 2025 December 2025 January February 2026 March 2026 [this edition] Technical Release Readiness (TRR) July 2025 ( webinar ) August",
            keyFeatures: [],
            impact: ""
        }
    },
    {
        id: 40,
        title: "Salesforce AI Cross Cloud Roadmap Easy Finder",
        description: "Salesforce AI Cross Cloud Roadmap Easy Finder Data 360 [requires POP certification] [Ryan Raso, POP Data 360 ] Tableau [Lara Niemala PMM, Amy Lin Loiacono PMM Deep-dive] Slack [Max Brenssell, PM] Sales Cloud [Krithika Viswanathan PMM, Victor Weilin Liu, PM ] Service Cloud [Mala Ravi PMM, Hari",
        category: "feature",
        status: "planned",
        period: "TBD",
        quarter: "TBD",
        date: "",
        details: {
            overview: "Salesforce AI Cross Cloud Roadmap Easy Finder Data 360 [requires POP certification] [Ryan Raso, POP Data 360 ] Tableau [Lara Niemala PMM, Amy Lin Loiacono PMM Deep-dive] Slack [Max Brenssell, PM] Sales Cloud [Krithika Viswanathan PMM, Victor Weilin Liu, PM ] Service Cloud [Mala Ravi PMM, Hari",
            keyFeatures: [],
            impact: ""
        }
    },
    {
        id: 41,
        title: "​Customers      Trailblazers      Partners      Employees  Communities      Veterans      Nonprofits",
        description: "​Customers Trailblazers Partners Employees Communities Veterans Nonprofits",
        category: "feature",
        status: "planned",
        period: "TBD",
        quarter: "TBD",
        date: "",
        details: {
            overview: "​Customers Trailblazers Partners Employees Communities Veterans Nonprofits",
            keyFeatures: [],
            impact: ""
        }
    },
    {
        id: 42,
        title: "Roadmap Disclaimer",
        description: "Roadmap Disclaimer Nomenclature referenced is intended for INTERNAL use only All product feature names referenced from this slide onward are intended for internal use only For example, you may see features with “v2 Phase 3” or “Phase 1”, and other similar internal naming conventions included We have",
        category: "knowledge",
        status: "planned",
        period: "TBD",
        quarter: "TBD",
        date: "",
        details: {
            overview: "Roadmap Disclaimer Nomenclature referenced is intended for INTERNAL use only All product feature names referenced from this slide onward are intended for internal use only For example, you may see features with “v2 Phase 3” or “Phase 1”, and other similar internal naming conventions included We have",
            keyFeatures: [],
            impact: ""
        }
    },
    {
        id: 43,
        title: "Product Roadmap Index | Q1 Feb",
        description: "Product Roadmap Index | Q1 Feb Product Area Delivered Jan 2026 About to Release Feb 2026 On Track to Release Mar 2026 In Active Build Apr 2026 Context Metadata, Retrievers, File Formats ADL DC1 Compatibility (Phase 3) Multi-vendor web search support Agentforce Data Library - Enhancements Response C",
        category: "analytics",
        status: "in-progress",
        period: "TBD",
        quarter: "TBD",
        date: "",
        details: {
            overview: "Product Roadmap Index | Q1 Feb Product Area Delivered Jan 2026 About to Release Feb 2026 On Track to Release Mar 2026 In Active Build Apr 2026 Context Metadata, Retrievers, File Formats ADL DC1 Compatibility (Phase 3) Multi-vendor web search support Agentforce Data Library - Enhancements Response C",
            keyFeatures: [],
            impact: ""
        }
    },
    {
        id: 44,
        title: "Product Roadmap Index | Q2 Mar",
        description: "Product Roadmap Index | Q2 Mar Product Area Delivered Feb 2026 About to Release Mar 2026 On Track to Release Apr 2026 In Active Build May 2026+ Context Metadata, Retrievers, File Formats ADL DC1 Compatibility (Phase 3) Multi-vendor web search support Agentforce Data Library - Enhancements Agent Co",
        category: "analytics",
        status: "in-progress",
        period: "TBD",
        quarter: "TBD",
        date: "",
        details: {
            overview: "Product Roadmap Index | Q2 Mar Product Area Delivered Feb 2026 About to Release Mar 2026 On Track to Release Apr 2026 In Active Build May 2026+ Context Metadata, Retrievers, File Formats ADL DC1 Compatibility (Phase 3) Multi-vendor web search support Agentforce Data Library - Enhancements Agent Co",
            keyFeatures: [],
            impact: ""
        }
    }

];

// Finish building the combined historical array now that roadmapDataV3 is defined
roadmapDataV3.forEach((item, idx) => {
    roadmapDataCombined.push({
        ...item,
        id: 40 + idx + 1,   // re-ID starting at 41
        version: 'v3',
    });
});

// Export for use in application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { roadmapDataV3, roadmapDataCombined };
}

// Agentforce GUS Roadmap Data - Build 262
// Auto-generated from GUS [262] reports on 2026-05-19
// Sources: SFAi Quality Lead, By Program, Monthly Release, SCG PMM, EAC/ECI/RAO, SC&G
// Statuses updated from historical GUS completion data (builds 258, 260, 262)
// Periods enriched with Salesforce seasonal release names from GUS ADM_Release__c

const roadmapDataGUS = [
    {
        id: 1,
        title: "262 Trust: AP Sriracha",
        description: "Placeholder Epic to account for all trust items for the team in 262.",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Cole Bennett",
        prdLink: "",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "Manu Mehrotra",
        designLead: "-",
        qualityLead: "William Hackett",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "Placeholder Epic to account for all trust items for the team in 262.",
            keyFeatures: [],
            impact: "1/6 - supporting customer queries in eci support channels. Work on trust work items (ref. related work items) not started as team is wrapping up testing og GenECI feature currently and is running on 50% capacity due to planned PTOs"
        }
    },
    {
        id: 2,
        title: "262 Trust: ECI Experience",
        description: "Placeholder Epic to account for all trust items for the team in 262. -Telemetry -A11y -Skip Processing video transcription if FVT is enabled( IsLegacyProcessingSkipped )",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Cole Bennett",
        prdLink: "",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "Manu Mehrotra",
        designLead: "-",
        qualityLead: "William Hackett",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "Placeholder Epic to account for all trust items for the team in 262. -Telemetry -A11y -Skip Processing video transcription if FVT is enabled( IsLegacyProcessingSkipped )",
            keyFeatures: [],
            impact: "1/6 - starting to look into accessibility bugs that came in before vacations. Made good progress on P1's."
        }
    },
    {
        id: 3,
        title: "262 Trust: ECI Foundation",
        description: "Placeholder Epic to account for all trust items for the team in 262.",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Cole Bennett",
        prdLink: "",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "Neeraj Agicha",
        designLead: "-",
        qualityLead: "William Hackett",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "Placeholder Epic to account for all trust items for the team in 262.",
            keyFeatures: [],
            impact: "4/7 Update:\nChanges for MS Teams Pagination QA’d and closed. Will ship with JDK ms teams connector changes.\n\nMS Teams Logging changes are in QA. Due by EOW. Prod push after JDK 17 prod push\n4/1 Update\nMS Teams Pagination QA was blocked due to JDK 17..."
        }
    },
    {
        id: 4,
        title: "Account Management GA",
        description: "Research customers and prep for meetings conversationally -New OOTB \"skill\" for the Sales Agent, used in Sales Workspace, Agentforce chat panel, mobile and Slack",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Karen Otuteye",
        prdLink: "",
        team: "AccountsAndContacts",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Alicia Ong",
        designLead: "Huong Le",
        qualityLead: "Harsha Medikonda",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "Research customers and prep for meetings conversationally -New OOTB \"skill\" for the Sales Agent, used in Sales Workspace, Agentforce chat panel, mobile and Slack",
            keyFeatures: ["Open gate for all instances"],
            impact: "2/23/26: Gates open on all instances\n1/28/26\n- Feature gate to be lifted by Monday, 2/2."
        }
    },
    {
        id: 5,
        title: "Activities: Safe deletion strategy of Dangling rows",
        description: "Epic for Morgan Stanley work in collaboration with Platform teams for safe deletion strategy of Dangling rows. More details here: https://docs.google.com/document/d/1SwwRnMBk3IeChS3UDMqGNKWOh9uZpDMf6z1dOx2xUfk/edit?tab=t.0 Background",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Namita Sehgal",
        prdLink: "https://docs.google.com/document/d/1SwwRnMBk3IeChS3UDMqGNKWOh9uZpDMf6z1dOx2xUfk/edit?tab=t.0#heading=h.ox5ehfmh7ah6",
        team: "Activities",
        scheduledBuild: "262",
        health: "",
        devLead: "-",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "Epic for Morgan Stanley work in collaboration with Platform teams for safe deletion strategy of Dangling rows. More details here: https://docs.google.com/document/d/1SwwRnMBk3IeChS3UDMqGNKWOh9uZpDMf6z1dOx2xUfk/edit?tab=t.0 Background",
            keyFeatures: ["Q3: Completed", "Q4: NA", "Rollout: with 262"],
            impact: "- 4/14:\n- No development left, we will rollout to few customer when 262 goes to customer env. \n\n3/27:\n- Q3 testing is completed and we got the sign-off. \n- Created a tracking WI for 264, to enable required permission in customer env when 262 deploye..."
        }
    },
    {
        id: 6,
        title: "Add soft-cutoff for EAC and Inbox customers",
        description: "MSFT is retiring EWS APIs in Oct '26 impacting over 85k customers across 5 different products (EAC, Inbox, SDR, Lightning Sync and Starter/Pro). Come october '26 without G",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Namita Sehgal",
        prdLink: "",
        team: "S2X Scrum Team",
        scheduledBuild: "262",
        health: "",
        devLead: "Manish Sombansh",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "MSFT is retiring EWS APIs in Oct '26 impacting over 85k customers across 5 different products (EAC, Inbox, SDR, Lightning Sync and Starter/Pro). Come october '26 without G",
            keyFeatures: ["Dev Handoff: ✅ 03/16", "Q3 Handover:  ✅ 04/01", "Q3 Sign off: ✅ Signed off(Nishkam)", "Q4 Sign off: N/A UI work only.", "CX Sign off: Complete"],
            impact: "04/10: Epic complete\n04/03: Q3 sign off complete. CX Signoff pending.\n3/31: Q3 hand off meeting scheduled for April 01\n03/25: Q3 handoff scheduled.\n03/16: Dev work for 262 is complete.\n02/19: Dev Complete. Majority work complete. 262 is up to date w..."
        }
    },
    {
        id: 7,
        title: "Agentic Pipeline Inspection & Forecasting",
        description: "Problem statement: Customers view forecasting as a critical part of the selling journey. It is a process that is very much integrated in the flow of their work. Forecasting is very manual and time taking",
        category: "feature",
        status: "planned",
        period: "Summer '26 (264)",
        quarter: "Summer '26 (264)",
        date: "264",
        owner: "Goutham Kotha",
        prdLink: "",
        team: "Sales Cloud Perseus",
        scheduledBuild: "264",
        health: "",
        devLead: "Anurag Mudgal",
        designLead: "",
        qualityLead: "",
        v2momMethod: "",
        version: "gus",
        details: {
            overview: "Problem statement: Customers view forecasting as a critical part of the selling journey. It is a process that is very much integrated in the flow of their work. Forecasting is very manual and time taking",
            keyFeatures: ["Dev Done: 07/23 (264 FF)", "Q3 HandOff: 07/25", "Q3 Sign-Off:", "Q4 Hand-Off: 07/25", "Q4 Sign-Off:"],
            impact: "5/19/26\n- On track, entity finalisation in progress. \n- Slack integration spike in progress.\n\n5/12/26\n- On track\n- HLD and entity finalisation in progress. \n\n5/5/26\n- On track, initial spikes underway.\n- Spikes are in progress and working on interim/mont..."
        }
    },
    {
        id: 8,
        title: "Bring new opportunity columns to the Forecasting list",
        description: "We need to update the synthetic columns list of forecasting to bring parity with PI Contact insights Activity heatmap Deal risk alerts Sales methodologies",
        category: "feature",
        status: "planned",
        period: "Summer '26 (264)",
        quarter: "Summer '26 (264)",
        date: "264",
        owner: "Goutham Kotha",
        prdLink: "",
        team: "Sales Cloud Centaurus",
        scheduledBuild: "264",
        health: "",
        devLead: "Manish Singh (Sales Cloud)",
        designLead: "",
        qualityLead: "",
        v2momMethod: "",
        version: "gus",
        details: {
            overview: "We need to update the synthetic columns list of forecasting to bring parity with PI Contact insights Activity heatmap Deal risk alerts Sales methodologies",
            keyFeatures: ["Dev Done: 07/09 (GTM 262.13)", "Q3 HandOff: 07/11", "Q3 Sign-Off:", "Q4 Hand-Off: 07/11", "Q4 Sign-Off:"],
            impact: "5/19/26\n- On track\n- Metadata layer changes complete.\n- Column pref persistence spike in progress.\n\n5/12/26\n- On track\n\n5/5/26\n- On track, dev work in progress.\n- Spikes are in progress and working on interim/monthly milestones. ETA by 5/8\n\n4/28/26\n- Pla..."
        }
    },
    {
        id: 9,
        title: "Capacity: Add add airflow to FBOT",
        description: "Capacity: Add Airflow to FBOT introduces a scalable orchestration layer to manage complex, long-running workflows reliably. It improves operational resilience, enables automation at scale, and reduces manual intervention and fa",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Heng Zhang",
        prdLink: "https://docs.google.com/document/d/1VVYTHi-zNm-SFF6T1VAMR_OxUDEZ16hMGaN-zFF8Ae8/edit?tab=t.0#heading=h.z0a2cx7wklkx",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "Shan-cheng Ho",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "Capacity: Add Airflow to FBOT introduces a scalable orchestration layer to manage complex, long-running workflows reliably. It improves operational resilience, enables automation at scale, and reduces manual intervention and fa",
            keyFeatures: [],
            impact: "This was eventually marked below the line for 262 but it would appear as though migration will now be above the line for 264. It's not clear to me exactly when the effort will start but we will be in touch with migration team to be sure this is not a blo..."
        }
    },
    {
        id: 10,
        title: "Capacity: Cell Level Migration Readiness",
        description: "Cell-Level Migration Readiness ensures each cell has the capacity, isolation, and operational readiness to migrate workloads safely at scale. It reduces migration risk, prevents customer impact during transitions, and enables faster,",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Namita Sehgal",
        prdLink: "https://docs.google.com/document/d/1VVYTHi-zNm-SFF6T1VAMR_OxUDEZ16hMGaN-zFF8Ae8/edit?tab=t.0#heading=h.z0a2cx7wklkx",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "Shan-cheng Ho",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "Cell-Level Migration Readiness ensures each cell has the capacity, isolation, and operational readiness to migrate workloads safely at scale. It reduces migration risk, prevents customer impact during transitions, and enables faster,",
            keyFeatures: [],
            impact: "-"
        }
    },
    {
        id: 11,
        title: "Capacity: Prod5 - New Cell Readiness  - Deploy Services (SRE)",
        description: "Phase 1: “The POC and Spiking phase is finished” Test deployment in dev fi new cell for 1 service of each type Phase 2: “Finish individual epics + Start Integration testing” Test deployment in dev fi new ce",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Lynn Little",
        prdLink: "",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "-",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "Phase 1: “The POC and Spiking phase is finished” Test deployment in dev fi new cell for 1 service of each type Phase 2: “Finish individual epics + Start Integration testing” Test deployment in dev fi new ce",
            keyFeatures: [],
            impact: "4/3: Decision made to launch a few customers without waiting for events-to-core. We will start that process today\n3/27: Final Q3 signoff done. The Events-to-Core incident/rollback has altered the rollout plan though. Tentatively the rollout gates will n..."
        }
    },
    {
        id: 12,
        title: "Capacity: Prod5 - New Cell Readiness to onboard traffic [A360 Nexus]",
        description: "After the GA in 260 (Feb '26), ensure the new cell is ready to directly onboard the new EAC customers \n Epics for all 3 teams:",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Birva Joshi",
        prdLink: "https://docs.google.com/document/d/1VVYTHi-zNm-SFF6T1VAMR_OxUDEZ16hMGaN-zFF8Ae8/edit?tab=t.0#heading=h.z0a2cx7wklkx",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "Shan-cheng Ho",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "After the GA in 260 (Feb '26), ensure the new cell is ready to directly onboard the new EAC customers \n Epics for all 3 teams:",
            keyFeatures: [],
            impact: "3/27 - Complete.\n3/20 - Will finish configuring alerts for new cell today. Going live next week.\n3/13 - Nexus continuing to provide testing support in production. No known issues in Nexus charter.\n3/6 - Nexus providing Q3 support in production. Verify..."
        }
    },
    {
        id: 13,
        title: "Capacity: Prod5 - New Cell Readiness to onboard traffic [A360 Stargate]",
        description: "After the GA in 260 (Feb '26), ensure the new cell is ready to directly onboard the new EAC customers \n Epics for all 3 teams:",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Birva Joshi",
        prdLink: "https://docs.google.com/document/d/1VVYTHi-zNm-SFF6T1VAMR_OxUDEZ16hMGaN-zFF8Ae8/edit?tab=t.0#heading=h.z0a2cx7wklkx",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "Shan-cheng Ho",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "After the GA in 260 (Feb '26), ensure the new cell is ready to directly onboard the new EAC customers \n Epics for all 3 teams:",
            keyFeatures: [],
            impact: "4/10 - Started onboarding customers to new cell with no known issue for Stargate services so far\n4/2 - Q3 signed off, waiting for customer onboarding\n3/27 - Q3 signed off for EAC services, ready for onboarding customers\n3/20 - Finished setting up aler..."
        }
    },
    {
        id: 14,
        title: "Capacity: Prod5 - New Cell Readiness to onboard traffic [EAC Foundation]",
        description: "After the GA in 260 (Feb '26), ensure the new cell is ready to directly onboard the new EAC customers \n Epics for all 3 teams:",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Namita Sehgal",
        prdLink: "https://docs.google.com/document/d/1VVYTHi-zNm-SFF6T1VAMR_OxUDEZ16hMGaN-zFF8Ae8/edit?tab=t.0#heading=h.z0a2cx7wklkx",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "Shan-cheng Ho",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "After the GA in 260 (Feb '26), ensure the new cell is ready to directly onboard the new EAC customers \n Epics for all 3 teams:",
            keyFeatures: [],
            impact: "2/6 - A few small bugs/blockers remain, after which we can deploy our new cell to prod, eta 2/10. We decided to postpone the new cell deployment to stage, pending resolution with Vault access.\n1/20 - Some of the production promotion tasks are taking lon..."
        }
    },
    {
        id: 15,
        title: "Deal Risk Alerts from conversations and C360",
        description: "Overview Synthesizes signals from interactions (calls, emails, meetings) and opportunity changes to generate explainable business judgments. Categorizes insights into Peril (Friction & Risk), Process (Velocity), and People (En",
        category: "feature",
        status: "planned",
        period: "Summer '26 (264)",
        quarter: "Summer '26 (264)",
        date: "264",
        owner: "Goutham Kotha",
        prdLink: "",
        team: "Sales Cloud Centaurus",
        scheduledBuild: "264",
        health: "",
        devLead: "Himanshu Kapoor",
        designLead: "",
        qualityLead: "",
        v2momMethod: "",
        version: "gus",
        details: {
            overview: "Overview Synthesizes signals from interactions (calls, emails, meetings) and opportunity changes to generate explainable business judgments. Categorizes insights into Peril (Friction & Risk), Process (Velocity), and People (En",
            keyFeatures: ["Dev Done: 07/23 (264 FF)", "Q3 HandOff: 07/25", "Q3 Sign-Off:", "Q4 Hand-Off: 07/25", "Q4 Sign-Off:"],
            impact: "5/19/26\n- On track , DM finalization in progress.\n- RC framework integration spike is completed.\n- Interlock plan finalized with Nova team, 1 incoming TD for persistence.\n- Discussions underway on T1 insights delivery timelines and TD commitment.\n\n5/12/2..."
        }
    },
    {
        id: 16,
        title: "E2C Migration Support",
        description: "Unlock Agents for existing EAC base by bringing their Emails to core and opening them up for Agent context and Data cloud analytics and more. Support Email to Core Mi",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Nikhil Jain",
        prdLink: "http://n/a (support customer issues as we rollout)",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "Yogesh Patel",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "Unlock Agents for existing EAC base by bringing their Emails to core and opening them up for Agent context and Data cloud analytics and more. Support Email to Core Mi",
            keyFeatures: [],
            impact: "-"
        }
    },
    {
        id: 17,
        title: "EAC: Config-driven capture for all",
        description: "Legacy cleanup: to ensure all Email and Event data can be safely moved to Core, further unlocking Agentic and Data cloud use cases for customers. \n AP to enf",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Namita Sehgal",
        prdLink: "https://docs.google.com/document/d/1KjO-l1XqQBiQrXxxfB2dWnK5ORLZ2p42gXs3iIrIv4I/edit?tab=t.0#heading=h.h22o9t7fold",
        team: "AP Galaxy",
        scheduledBuild: "262",
        health: "",
        devLead: "Johannes Kienzle",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "Legacy cleanup: to ensure all Email and Event data can be safely moved to Core, further unlocking Agentic and Data cloud use cases for customers. \n AP to enf",
            keyFeatures: ["260 DoR No Feature", "CX Handoff to Dev: ✅ 3/25 (CA)", "M1 DS Dev Done: 4/14 ✅", "Q3/Q4 Handover: 4/14 ✅", "Q3 Sign off: Sourav 04/08 ✅"],
            impact: "5/11:\nOn track. Staggered rollout is in progress.\n* Configless orgs rollout has reached 100% of production orgs (extra small), and auto-configuration has been successfully created for 88% of total configless orgs.\n* Hybrid orgs rollout has reached 80% of..."
        }
    },
    {
        id: 18,
        title: "EAC: Performance Monitoring of Contact Sync",
        description: "Help monitor and evaluate Contact sync health on a ongoing basis. Currently this prod feature has no monitoring established and often customers like IBM express interest enabling",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Namita Sehgal",
        prdLink: "http://n/a",
        team: "S2X Scrum Team",
        scheduledBuild: "262",
        health: "",
        devLead: "Danyal Ahmad",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "Help monitor and evaluate Contact sync health on a ongoing basis. Currently this prod feature has no monitoring established and often customers like IBM express interest enabling",
            keyFeatures: ["CX Handoff to Dev: ✅  3/25 (CA)", "Dev Done: ✅ 3/27 (in 262)", "Q3 Sign off: N/A", "Q4 Sign off: TBD (Mike)", "PRD: SLA Definitions to monitor?"],
            impact: "04/14 - Q4 has received dashboard and incorporated sync into theirs. Pending SLA definition (if applicable).\n3/31 - Dashboard complete, code in 262 and will not be back ported\n03/24 - Data will be released as part of 262 deliverable. Q4 hand off this w..."
        }
    },
    {
        id: 19,
        title: "ECI In (Starter & Pro) - Phase 1",
        description: "TLDR Phase 1 – Feb '26 | Transcriptions (GA) Enable  ECI Transcriptions for existing voice/video providers",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Asal Elleuch",
        prdLink: "https://docs.google.com/document/d/1-stAmnA0cNqijxE9fhPIcijOXqL18TTIRfXjCXB4I98/edit?tab=t.0",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "Anthony Desportes",
        designLead: "-",
        qualityLead: "Deepmala Mehta",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "TLDR Phase 1 – Feb '26 | Transcriptions (GA) Enable  ECI Transcriptions for existing voice/video providers",
            keyFeatures: ["Dev Handoff: 1/20 (delayed by 2 days)", "Q3 hoff: 1/22 (complete)", "Q3 Sign Off: 2/5 (10 days)", "Q4 S-Off: 2/5 (Ongoing)", "Target Patch: 260.7 (customer release 2/11)"],
            impact: "2/10:\nOne bug to patch in 260.8 : W-21229786 (completed)\nPhase 2: we are going to create a new developers patch branch for the continuation of Easy ECI in Phase 2 (LLM based features)\n\n2/9:\nOff-core prod push done, FVT gate on\n\n2/3: \n(update) eci..."
        }
    },
    {
        id: 20,
        title: "ECI In (Starter & Pro) - Phase 2",
        description: "PRD https://docs.google.com/document/d/1-stAmnA0cNqijxE9fhPIcijOXqL18TTIRfXjCXB4I98/edit?tab=t.0#heading=h.i4np6zxvfga7 \n Phase 2 is the support of some ECI LLM features Starter editions: Ca",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Anthony Desportes",
        prdLink: "https://docs.google.com/document/d/1-stAmnA0cNqijxE9fhPIcijOXqL18TTIRfXjCXB4I98/edit?tab=t.0",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "Anthony Desportes",
        designLead: "-",
        qualityLead: "Deepmala Mehta",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "PRD https://docs.google.com/document/d/1-stAmnA0cNqijxE9fhPIcijOXqL18TTIRfXjCXB4I98/edit?tab=t.0#heading=h.i4np6zxvfga7 \n Phase 2 is the support of some ECI LLM features Starter editions: Ca",
            keyFeatures: ["Phase2 - LLM", "feature set frozen: 2/24", "stories created with test plan 2/27", "Dev Done: 4/10", "Q3/4 Handoff - 4/23"],
            impact: "4/28: synced up with Q3 to present the list of features to test. This might end up being tested once the Suites Connect implements the auto-enablement and auto-assignment in the 262 development branch, and the code is ported to 262/patch.\nFeature is cur..."
        }
    },
    {
        id: 21,
        title: "ECI In Core - OOTB Reporting/Analytics documentation",
        description: "In 262, existing ECI customers will move to Core. Current ECI customers have OOB Reporting and Analytics, which no longer will work with CRMA and AP sunsetting. These existing reports/analytics will freeze in time on migration to Core. We",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Asal Elleuch",
        prdLink: "https://docs.google.com/document/d/1zWNyKpkvdbZGZqT8v8oL5VFCYngS1F8AUtBCz92hgEY/edit?tab=t.0",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "Narun Shridhar Mohan",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "In 262, existing ECI customers will move to Core. Current ECI customers have OOB Reporting and Analytics, which no longer will work with CRMA and AP sunsetting. These existing reports/analytics will freeze in time on migration to Core. We",
            keyFeatures: [],
            impact: "04/28\n- I'm currently working with Michael Hoban (writer for ECI) on the Data Residency document. This document will have information related to ECI to Core and new entities introduced for the migration. I'd want to keep our documentation epic open unti..."
        }
    },
    {
        id: 22,
        title: "ECI Ingestion Recrawl",
        description: "262 Milestones: MS Recrawl \n Manual Recrawl for Google and MS Teams. Zoom already exists. MS teams SDK 6 upgrade Verifier for all 3 vendors :",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Cole Bennett",
        prdLink: "https://salesforce.quip.com/zLRHAqLJePUq",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "Mugdha Choudhari",
        designLead: "-",
        qualityLead: "Deepmala Mehta",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "262 Milestones: MS Recrawl \n Manual Recrawl for Google and MS Teams. Zoom already exists. MS teams SDK 6 upgrade Verifier for all 3 vendors :",
            keyFeatures: ["Dev Handoff: Complete", "Q3 Sign Off: 2/4 -BLOCKED", "Q4 Sign Off:  N/A - Manually triggered tool", "Target Patch: N/A, Off-Core - ETA: 2/5 (Blocked)", "260 DoR No Feature"],
            impact: "3/12: \nDecision: No go due to CTS concerns and architecture alignment required for Momentum integration \n3/3: \nStill no decision on this.\n\n2/25: \nStill waiting on decision.\n\n2/17:\nMeeting scheduled for Wed Feb 18 with jong to make a decision on ..."
        }
    },
    {
        id: 23,
        title: "ECI to Core - Migrate Existing Customers (Full GA)",
        description: "TLDR: In 260, we will have new ECI customers on Core. In 262, existing ECI customers will move to Core.",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Asal Elleuch",
        prdLink: "https://docs.google.com/document/d/1zWNyKpkvdbZGZqT8v8oL5VFCYngS1F8AUtBCz92hgEY/edit?tab=t.0",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "R Siddarth",
        designLead: "-",
        qualityLead: "Sumit Pahwa",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "TLDR: In 260, we will have new ECI customers on Core. In 262, existing ECI customers will move to Core.",
            keyFeatures: ["Milestone 1", "Q3/4 Handoff - 3/2 (done)", "Milestone 2  - Voice call migration, DC sync and post migration enablement or READ(Core) / reporting etc", "Q3/4 Handoff - 3/24", "Q3 Sign off - 5/15 Q4 Sign off - 5/15 (S,M Orgs)"],
            impact: "5/13\nDev - 1 open bug on Gen Insights for Voice Call - ETA 5/14\nBOM hydration is complete for all services. Deployment for the new services is facing issue - working with HDPS and SIP US team to sort it out. Expected ETA - 5/18\n\n5/6\n- Marked the epi..."
        }
    },
    {
        id: 24,
        title: "ECI to Core - Migrate Existing Customers (Full GA) - OffCore development",
        description: "TLDR: In 260, we will have new ECI customers on Core. In 262, existing ECI customers will move to Core. This epic will cover all the work done by Auriga team towards the Migration tool",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Bharathi Venkatasubramanian",
        prdLink: "https://docs.google.com/document/d/1zWNyKpkvdbZGZqT8v8oL5VFCYngS1F8AUtBCz92hgEY/edit?tab=t.0",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "Fanish Chhibber",
        designLead: "-",
        qualityLead: "Sumit Pahwa",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "TLDR: In 260, we will have new ECI customers on Core. In 262, existing ECI customers will move to Core. This epic will cover all the work done by Auriga team towards the Migration tool",
            keyFeatures: ["Milestone 1 Basic E2E migration steel thread for Video Calls(Q3/Q4) - Complete on 2nd March", "Milestone 2 - Voice call migration, DC sync and post migration enablement or READ(Core) / reporting etc", "Q3 Handoff - 3/24", "Q4 Handoff - 3/24"],
            impact: "3/24 - Complete\n3/18 - On track. All planned work is complete, preparing orgs for internal blitz testing\n3/11 - On track\n3/4 - On track, Disabling setup entity via tooling API, analytics page disablement, dual write for recordings, email notification ..."
        }
    },
    {
        id: 25,
        title: "ECI to Core Migration Communication Plan",
        description: "Creating this epic to track the progress on communication to customers. \n Communication and Migration Plans Milestones: 3/15/2026: Create a draft communication plan, review and align with stakeholders",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Bharathi Venkatasubramanian",
        prdLink: "",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "Asal Elleuch",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "Creating this epic to track the progress on communication to customers. \n Communication and Migration Plans Milestones: 3/15/2026: Create a draft communication plan, review and align with stakeholders",
            keyFeatures: [],
            impact: "4/22 - Initial email is out, KA already published\n4/1 - Email 1 to now go out on 4/16 due to time required for translations by the tcr team. Email 2 to be tied to the migration rollout. KA already out.\n3/25 - KA published, Asal to create a workflow tic..."
        }
    },
    {
        id: 26,
        title: "Email to Core Migrations:  Tool Support",
        description: "Unlock Agents for existing EAC base by bringing their Emails to core and opening them up for Agent context and Data cloud analytics and more. Supporting migration t",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Namita Sehgal",
        prdLink: "http://n/a (support customer issues as we rollout)",
        team: "AP Galaxy",
        scheduledBuild: "262",
        health: "",
        devLead: "Yogesh Patel",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "Unlock Agents for existing EAC base by bringing their Emails to core and opening them up for Agent context and Data cloud analytics and more. Supporting migration t",
            keyFeatures: ["Continuous support"],
            impact: "4/14:\n- Adoption Almost reached 8.1K\n- Successfully migrated 11 XL and 15 L orgs\n\n3/27:\n- Adoption almost reached to 7.3K orgs. \n- Successfully migrated 7 XL and 11 L orgs\n\n3/20:\n- Migration tool is Gaed Completely and few L, XL orgs successfull..."
        }
    },
    {
        id: 27,
        title: "Email to Core Migrations: Low Risk Orgs",
        description: "Unlock Agents and Data cloud for existing base by bringing their Emails to core, unlock various use cases and context. After email to core migration tool GA in Nov. L",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Namita Sehgal",
        prdLink: "https://docs.google.com/document/d/1nWEeW_49Lu5r5YclR_nuxmg1MMUqVrAxErhUmu3UPOU/edit?tab=t.0",
        team: "AP Galaxy",
        scheduledBuild: "262",
        health: "",
        devLead: "Yogesh Patel",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "Unlock Agents and Data cloud for existing base by bringing their Emails to core, unlock various use cases and context. After email to core migration tool GA in Nov. L",
            keyFeatures: ["CX Handoff to Dev: NA (no UI text)", "Dev Done: ✅ 3/31", "Q3/Q4 Handover: ✅ 3/31", "Q3 Sign off: ✅ 3/31 (Sourav)", "Q4 Sign off: N/A"],
            impact: "5/11:\n- Staggered rollout is in progress. Rolled out to 5% of production pods.  Till now 7.6k(demo/free/trial) org and 1 Active org is enabled to E2C. \n\n4/28:\n- Staggered rollout started with sandbox pods, its been rolled-out to 40% of sandbox orgs. ..."
        }
    },
    {
        id: 28,
        title: "Email to Core Migrations: Orgs NOT using EOL features",
        description: "Unlock Agents and Data cloud for existing base by bringing their Emails to core, unlock various use cases and context. After email to core migration tool GA in Nov. L",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Namita Sehgal",
        prdLink: "https://docs.google.com/document/d/1nWEeW_49Lu5r5YclR_nuxmg1MMUqVrAxErhUmu3UPOU/edit?tab=t.0",
        team: "AP Galaxy",
        scheduledBuild: "262",
        health: "",
        devLead: "Yogesh Patel",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "Unlock Agents and Data cloud for existing base by bringing their Emails to core, unlock various use cases and context. After email to core migration tool GA in Nov. L",
            keyFeatures: ["CX Handoff to Dev: Na (no UI text)Dev Done: 4/28Q3/Q4 Handover: 4/28Q3 Sign off: Sourav/RonakQ4 Sign off: Amarendu/AshvinTentative roll out start: May endTentative roll out end: July end"],
            impact: "5/11:\n- Handover to Q3 for testing, based on the testing result we will start initial test rollout next week. \n\n4/28:\n- Q2 testing is completed and scheduled call with Q3 for handover \n\n4/21:\n- Q2 testing started for auto migration orgs which has ..."
        }
    },
    {
        id: 29,
        title: "Email to Core Migrations: Orgs using EOL features",
        description: "Unlock Agents and Data cloud for existing base by bringing their Emails to core, unlock various use cases and context. After email to core migration tool GA in Nov. L",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Namita Sehgal",
        prdLink: "https://docs.google.com/document/d/1nWEeW_49Lu5r5YclR_nuxmg1MMUqVrAxErhUmu3UPOU/edit?tab=t.0",
        team: "AP Galaxy",
        scheduledBuild: "262",
        health: "",
        devLead: "Yogesh Patel",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "Unlock Agents and Data cloud for existing base by bringing their Emails to core, unlock various use cases and context. After email to core migration tool GA in Nov. L",
            keyFeatures: ["CX Handoff to Dev: ✅ 3/25(CA)", "Dev Done: 4/28 ✅", "Q3/Q4 Handover: 4/28 ✅", "Q3 Sign off: Sourav/Ronak", "Q4 Sign off: Amarendu/Ashvin"],
            impact: "5/11 - Handover to Q3 for testing\n\n4/28:\n- Q2 testing is in progress.  Hopefully we will complete the testing this week and schedule a handover to Q3 next week. \n\n4/21:\n- Tooling work is in also completed and we are for now excluding orgs which has..."
        }
    },
    {
        id: 30,
        title: "Embedded AI Fast Follow- March",
        description: "2/18\ndev complete for 260.10\n[Q3] test plan WIP\n2/3\n- Upgrade from Free to higher edition: Leadership alignment needed on whether Agentforce can be set up automatically during the upgrade.\n- Otherwise, on track for GTM #2 (260.10).\n\n1/20\n  On tra...",
        category: "feature",
        status: "planned",
        period: "TBD",
        quarter: "TBD",
        date: "-",
        owner: "Allison Burnett",
        prdLink: "",
        team: "",
        scheduledBuild: "-",
        health: "",
        devLead: "-",
        designLead: "Nicole McGovern",
        qualityLead: "",
        v2momMethod: "",
        version: "gus",
        details: {
            overview: "2/18\ndev complete for 260.10\n[Q3] test plan WIP\n2/3\n- Upgrade from Free to higher edition: Leadership alignment needed on whether Agentforce can be set up automatically during the upgrade.\n- Otherwise, on track for GTM #2 (260.10).\n\n1/20\n  On tra...",
            keyFeatures: [],
            impact: "2/18\ndev complete for 260.10\n[Q3] test plan WIP\n2/3\n- Upgrade from Free to higher edition: Leadership alignment needed on whether Agentforce can be set up automatically during the upgrade.\n- Otherwise, on track for GTM #2 (260.10).\n\n1/20\n  On tra..."
        }
    },
    {
        id: 31,
        title: "Embedded AI in Free - Simplified Agent Setup, record summarization & email draft",
        description: "Deliver easy setup of embedded ai functionality in Free Suite Includes:",
        category: "feature",
        status: "planned",
        period: "Winter '26 (260)",
        quarter: "Winter '26 (260)",
        date: "260.10",
        owner: "Allison Burnett",
        prdLink: "https://docs.google.com/document/d/1ZuLkcKI5I0Xs1XGMurHOM9vLNgelI2fIg_9Jm7P1ISM/edit?tab=t.0#heading=h.c7lv2tt0ly0",
        team: "",
        scheduledBuild: "260.10",
        health: "",
        devLead: "-",
        designLead: "Nicole McGovern",
        qualityLead: "",
        v2momMethod: "",
        version: "gus",
        details: {
            overview: "Deliver easy setup of embedded ai functionality in Free Suite Includes:",
            keyFeatures: ["Users save time and boost productivity, and with AI-powered summaries and drafting personalized, in-context emails in the flow of work. Democratizing Agentforce capabilities for SMBs strengthens the Suites' value proposition, accelerating NL acquisition."],
            impact: "2/18\ndev complete for 260.10\n[Q3] test plan WIP\n2/3\n- Upgrade from Free to higher edition: Leadership alignment needed on whether Agentforce can be set up automatically during the upgrade.\n- Otherwise, on track for GTM #2 (260.10).\n\n1/20\n  On tra..."
        }
    },
    {
        id: 32,
        title: "Embedded AI in Starter & Pro -SMB",
        description: "Support Embedded AI/record summarization component OOTB for Starter & Pro \n Figma - https://www.figma.com/design/SZHl25nuoyFB4s4cYHLh3Y/Agentforce-for-Do",
        category: "feature",
        status: "planned",
        period: "Winter '26 (260)",
        quarter: "Winter '26 (260)",
        date: "260.7",
        owner: "Allison Burnett",
        prdLink: "https://docs.google.com/document/d/13e5SlBAMzrX44gH5VKYZi3CpJywYR_AuQdB_lxQVRfE/edit?tab=t.0#heading=h.c7lv2tt0ly0",
        team: "",
        scheduledBuild: "260.7",
        health: "",
        devLead: "-",
        designLead: "Nicole McGovern",
        qualityLead: "",
        v2momMethod: "",
        version: "gus",
        details: {
            overview: "Support Embedded AI/record summarization component OOTB for Starter & Pro \n Figma - https://www.figma.com/design/SZHl25nuoyFB4s4cYHLh3Y/Agentforce-for-Do",
            keyFeatures: ["Users save time and boost productivity, and with AI-powered summaries and drafting personalized, in-context emails in the flow of work. Democratizing Agentforce capabilities for SMBs strengthens the Suites' value proposition, accelerating NL acquisition."],
            impact: "2/3:\n- Increased page render time with the file-based Flexipage change was reported by Q4. Investigating with Q4 and flexipage framework team. \n[Q3] E2E testing complete. Automation in progress\n1/20\n  On track for GTM #1 260.7. Ready to test in sdb12..."
        }
    },
    {
        id: 33,
        title: "Enable Notes List View for UI API",
        description: "Unblock ability to work with notes in Slack",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Lizzy Perruzzi",
        prdLink: "",
        team: "LeadsAndNotes",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Wenying Yang",
        designLead: "-",
        qualityLead: "Orville Pinto",
        v2momMethod: "Slack for All Editions",
        version: "gus",
        details: {
            overview: "Unblock ability to work with notes in Slack",
            keyFeatures: ["Dev Done: 1/30", "Q3 HandOff: 3/5", "Q3 Sign-Off: 3/15", "Q4 Hand-Off: N/A", "Q4 Sign-Off: N/A"],
            impact: "3/11: Blitz done, no issues found\n3/3: Blitz is scheduled for 3a sprint\n2/10: Dev done and closed user story in 1a sprint. Blitz for E2E/Regression testing will happen in the 3a sprint"
        }
    },
    {
        id: 34,
        title: "Enhance & Improve Graph API",
        description: "MSFT is retiring EWS APIs in Oct '26 impacting over 85k customers across 5 different products (EAC, Inbox, SDR, Lightning Sync and Starter/Pro). Come october '26 without G",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Namita Sehgal",
        prdLink: "",
        team: "S2X Scrum Team",
        scheduledBuild: "262",
        health: "",
        devLead: "Johannes Kienzle",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "MSFT is retiring EWS APIs in Oct '26 impacting over 85k customers across 5 different products (EAC, Inbox, SDR, Lightning Sync and Starter/Pro). Come october '26 without G",
            keyFeatures: ["Continuous support"],
            impact: "- Moved to S2X Trust\n- Ongoing support epic"
        }
    },
    {
        id: 35,
        title: "Events to Core for all",
        description: "Security feature unlocking Agents via new and existing EAC customer, by d iscontinue Event storage on offcore to address security concerns from prospecting Finservs customers like",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Namita Sehgal",
        prdLink: "https://docs.google.com/document/d/1zAo5iqLeCaFhtOxCOxR4PwQ-tBzLe_t9HR0LjWjVVWk/edit?tab=t.0#heading=h.rrkg89m9gna8",
        team: "A360 Nexus",
        scheduledBuild: "262",
        health: "",
        devLead: "Johannes Kienzle",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "Security feature unlocking Agents via new and existing EAC customer, by d iscontinue Event storage on offcore to address security concerns from prospecting Finservs customers like",
            keyFeatures: ["Custom Rollout Strategy: ✅ 04/06", "Rollout Initiated: 04/06", "End Rollout: 5/15 (previously 04/30)", "Proceeding towards gradual re-enablement starting 04/06"],
            impact: "05/12 - Stage 8 of 11 Rollout. On-Target for 05/15 completion.\n05/11 - Stage 7 of 11 Rollout. On-Target for 05/15 completion.\n05/08 - Stage 6 of 11 Rollout. On-Target for 05/15 completion.\n\n04/28 - Duplicate Invite Email issue fixed in Main and slott..."
        }
    },
    {
        id: 36,
        title: "GA Graph API for Starter/Pro",
        description: "MSFT is retiring EWS APIs in Oct '26 impacting over 85k customers across 5 different products (EAC, Inbox, SDR, Lightning Sync and Starter/Pro). Come october '26 without G",
        category: "feature",
        status: "planned",
        period: "Winter '26 Patch (260.patch)",
        quarter: "Winter '26 Patch (260.patch)",
        date: "260.patch",
        owner: "Namita Sehgal",
        prdLink: "",
        team: "Sales Cloud CX",
        scheduledBuild: "260.patch",
        health: "",
        devLead: "Johannes Kienzle",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "MSFT is retiring EWS APIs in Oct '26 impacting over 85k customers across 5 different products (EAC, Inbox, SDR, Lightning Sync and Starter/Pro). Come october '26 without G",
            keyFeatures: ["CX Only"],
            impact: "3/24 - No dev work required from SIP, inner sourced by Starter/pro teams. Converting this to a non engineering epic to track CX effort"
        }
    },
    {
        id: 37,
        title: "GA: Recommended Connections",
        description: "Feature parity: to ensure all Email and Event data can be safely moved to Core without missing any core functionalities that provided co",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Namita Sehgal",
        prdLink: "https://docs.google.com/document/d/1C4GQQTd6tveh3Xpr_v3pAH610E64UWv1Kd_ovqGJBBk/edit?tab=t.0#heading=h.7posinch7t7q",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "-",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "Feature parity: to ensure all Email and Event data can be safely moved to Core without missing any core functionalities that provided co",
            keyFeatures: [],
            impact: "3/16\n- Decision to pause the epic due to low adoption and effort required to GA\n\n3/10\n1. Following up for index creation on Email message Relation table.\n2. VAT is completed on 4th March. \n3. Basic Draft PR is ready \n\n3/03:\n1. Query perf review ..."
        }
    },
    {
        id: 38,
        title: "Gen ECI - Enhanced Gen AI Intelligence (DS)",
        description: "HLD: https://docs.google.com/document/d/1oLuQXrZSzbNT3y08rJGiQb230BrXPmnykZNrFg_NdmA/edit?usp=sharing \n Enhance intelligence with generative AI pipeline for ECI, instead of bifurcated experience today. Admin setup",
        category: "feature",
        status: "planned",
        period: "Winter '26 Patch (260.patch)",
        quarter: "Winter '26 Patch (260.patch)",
        date: "260.patch",
        owner: "Dustin Parker",
        prdLink: "https://salesforce.quip.com/5urWA8OHv2vo",
        team: "",
        scheduledBuild: "260.patch",
        health: "",
        devLead: "Parin Kenia",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "HLD: https://docs.google.com/document/d/1oLuQXrZSzbNT3y08rJGiQb230BrXPmnykZNrFg_NdmA/edit?usp=sharing \n Enhance intelligence with generative AI pipeline for ECI, instead of bifurcated experience today. Admin setup",
            keyFeatures: ["Dev Handoff: Completed on 1/12", "Q3 Project branch : DONE 02/02", "Q3 on Patch GTM Releas: 02/04- 2/10", "Q3 on Patch : 02/16, Monday Week", "Release to prod. Week of 3/9, as the scheduled patch is 260.10"],
            impact: "3/25/2026:\n8 customers did not get the feature, Dustin reaching out to each of these customers/AEs to turn it on instead of the team running the releasable action again.\n3/17/2026:\n260.10 production release in progress. There have been two rollbacks d..."
        }
    },
    {
        id: 39,
        title: "Gong Transcript Backfill",
        description: "The primary goal of the Transcript Backfill feature is to allow customers to leverage the existing Gong Managed Package to quickly popul",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Cole Bennett",
        prdLink: "https://docs.google.com/document/d/1EnmCWB643Vrg8s9YRjd5pPMF5iZuYWMdclRKL6F13FU/edit?tab=t.0#heading=h.1n3qnijwes3",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "Alicia Ong",
        designLead: "Mauricio Dumet",
        qualityLead: "Deepmala Mehta",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "The primary goal of the Transcript Backfill feature is to allow customers to leverage the existing Gong Managed Package to quickly popul",
            keyFeatures: ["Dev Handoff: ETA 1/26", "Q3 Sign Off: ETA 2/7 (10 days)", "Q4 Sign Off: 2/7", "Target Patch: 260.7 (w/ conditional Q4 sign off - no L orgs); 260.8 (w/ Q4 sign off)", "Production Release:  260.8 (gates still off)"],
            impact: "4/29:\n@Preethi Mali Mahalingam To gate the implementation for Legacy ECI orgs (Non eci to core orgs) asynchronously generate insight when the transcripts for Gong calls are uploaded. This will be done in 262.patch\n@Gil Cardenas is looking into why RegE..."
        }
    },
    {
        id: 40,
        title: "In-Person Meeting Ingestion",
        description: "In-person meetings supported as a channel of ingestion Setup UI updates to setup in-person meetings as a channel and settings Integration with SF mobile app for how they create these and pass in data Ingest in-person meeting",
        category: "feature",
        status: "planned",
        period: "Winter '26 Patch (260.patch)",
        quarter: "Winter '26 Patch (260.patch)",
        date: "260.patch",
        owner: "Cole Bennett",
        prdLink: "https://docs.google.com/document/d/1c4nTcDoKHKKkwcEif4gqXirEpUapBu9w1sB7k1ntaOg/edit?tab=t.0",
        team: "",
        scheduledBuild: "260.patch",
        health: "",
        devLead: "Alex Mous",
        designLead: "-",
        qualityLead: "Mohammad Suhaib Tariq",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "In-person meetings supported as a channel of ingestion Setup UI updates to setup in-person meetings as a channel and settings Integration with SF mobile app for how they create these and pass in data Ingest in-person meeting",
            keyFeatures: ["ECI API Dev Hand off: Complete", "E2E Dev Handoff: Complete. 2/20 (handoff moved to 2/20 from 2/6 )", "Q3 Sign Off: Owned by Mobile team, Cole to review E2E UX, Deepmala to ensure sanity test", "Q4 Sign Off: Complete", "GA Date: March 23rd"],
            impact: "3/21:\n- GA completed - gate is open and customers are able to enable the feature!\n- Next steps for ECI: none\n- Next steps for Mobile team: deploy app to iOS and Android\n\n3/18:\n- VAT completed\n\n3/17:\n- Bugs discussed with product, and none are GA..."
        }
    },
    {
        id: 41,
        title: "Increasing Seats for ECI in EE+",
        description: "As part of ECI P&P update, Increase the ECI seat limit from 10 to a higher number to enable broader ECI usage across EE+",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Asal Elleuch",
        prdLink: "http://Details in W-20029754",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "-",
        designLead: "-",
        qualityLead: "Deepmala Mehta",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "As part of ECI P&P update, Increase the ECI seat limit from 10 to a higher number to enable broader ECI usage across EE+",
            keyFeatures: ["Dev Done: 2/22", "Q3 Sign Off: not required", "Q4 Sign Off: Completed on 1/16", "Target Patch: 260.5 (completed)"],
            impact: "01/27: \nChanges rolled out to production with 260.5 patch in the week of Jan 26\n\n1/20 W-20029754 (seat increase) - patch approval doc. sent for 1/22. W-20405190 (IsLegacyProcessingSkipped field in video call) - in QA\n\n1/14\nQ3 may not needed as no E..."
        }
    },
    {
        id: 42,
        title: "Lightning Sync Migration tool to include Graph API options",
        description: "Once EOL is announced, we need to upgrade the LS to EAC migration tool to reflect Graph API changes else >60% of LS base will not be able to use LS.",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Namita Sehgal",
        prdLink: "https://docs.google.com/document/d/1ks4hBlmzelou0_1dqynWEeLganIxfyRmaejyHyvvdh4/edit?tab=t.0#heading=h.ubkwo8g5umma",
        team: "S2X Scrum Team",
        scheduledBuild: "262",
        health: "",
        devLead: "Dhaval Gada",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "Once EOL is announced, we need to upgrade the LS to EAC migration tool to reflect Graph API changes else >60% of LS base will not be able to use LS.",
            keyFeatures: ["CX Handoff to Dev: ✅ 3/25 (CA)", "Dev Done: ✅ 262 FF", "Q3/Q4 Handover: ✅ 4/6", "Q3 Sign off: ✅ 05/14", "Q4 Sign off: N/A (no perf impact)"],
            impact: "05/12 - Fix in Main. Verified. Pivoted to new Epic.\n\n4/28 - Dependency solution found, under testing. \nPivoting to Monthly delivery for this Epic. End May.\n\n4/21 - Had to roll back graph on Lighting sync due to unrelated dependency, working on a new..."
        }
    },
    {
        id: 43,
        title: "Lightning Sync: Retirement, parity and automigration to EAC",
        description: "If no EOL, additional expense to maintain a legacy product used across FinServ and PubSec customers with 6k MAO and 500k MAU",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Namita Sehgal",
        prdLink: "https://docs.google.com/document/d/1ks4hBlmzelou0_1dqynWEeLganIxfyRmaejyHyvvdh4/edit?tab=t.0#heading=h.ubkwo8g5umma",
        team: "S2X Scrum Team",
        scheduledBuild: "262",
        health: "",
        devLead: "Dhaval Gada",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "If no EOL, additional expense to maintain a legacy product used across FinServ and PubSec customers with 6k MAO and 500k MAU",
            keyFeatures: ["CX Handoff to Dev: ✅ 3/25 (CA)", "Dev Done:  ✅", "Q3/Q4 Handover:  ✅ 4/6", "Q3 Sign off: Signed off(Rounak)", "Q4 Sign off: TBD (Mike)"],
            impact: "5 /17 : PRs out for new UI asks, gate check-ins will go in this week to block new banners and notifications from orgs that cannot migrate to EAC.\n4/28 - Pr out for the blocker q3 identified\nDependency solution found, under testing. \n4/21 - 260 Live - ..."
        }
    },
    {
        id: 44,
        title: "Momentum",
        description: "Integrate with Momentum \n https://docs.google.com/spreadsheets/d/1sfngYDGp8Kip2ktMdBwcikRXnfEKnpZZJldbuiTiCpg/edit?gid=0#gid=0 \n https://docs.google.com/spreadsheets/d/1L8FB6YgG4LrlyF-yT8a2fe5Y0vq1fmFtQMXo0eby_JE/edit?gid",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Alicia Ong",
        prdLink: "https://docs.google.com/document/d/1EnmCWB643Vrg8s9YRjd5pPMF5iZuYWMdclRKL6F13FU/edit?tab=t.0#heading=h.1n3qnijwes3",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "Alicia Ong",
        designLead: "Mauricio Dumet",
        qualityLead: "Deepmala Mehta",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "Integrate with Momentum \n https://docs.google.com/spreadsheets/d/1sfngYDGp8Kip2ktMdBwcikRXnfEKnpZZJldbuiTiCpg/edit?gid=0#gid=0 \n https://docs.google.com/spreadsheets/d/1L8FB6YgG4LrlyF-yT8a2fe5Y0vq1fmFtQMXo0eby_JE/edit?gid",
            keyFeatures: [],
            impact: "4/21: Phase One sync up with Deepmala and PJ.  Phase Two cron needs numbers from PJ."
        }
    },
    {
        id: 45,
        title: "PI Contact Intelligence: See engaged contacts in oppty list",
        description: "See number of engaged contacts as a column in the opportunity list",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Goutham Kotha",
        prdLink: "https://docs.google.com/document/d/1XIoYBHkzcymeOQ_eCsYt_H7SRAWSIdkzvH5MpEIrPVo/edit?tab=t.ecfis54hfqi8",
        team: "Sales Cloud Perseus",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Anurag Mudgal",
        designLead: "Huong Le",
        qualityLead: "Aniruddhsinh Solanki",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "See number of engaged contacts as a column in the opportunity list",
            keyFeatures: ["Dev Done: 4/09", "Q3 HandOff: 4/10", "Q3 Sign-Off: 4/27", "Q4 Hand-Off: 4/10", "Q4 Sign-Off: 4/24"],
            impact: "4/28/16\n- Complete, all sign off in place. \n\n4/14/26\n- QA in progress, an internal blitz was done today during IST hours.\n\n4/07/26\n- Dev complete, changes merged to hush-base and will be subsequently merged to GTM release by 04/09.\n\n3/31/26\n- D..."
        }
    },
    {
        id: 46,
        title: "PI Contact Intelligence: See engaged contacts in side panel",
        description: "See which contacts have had recent activities, their role in the deal and level of engagement. (In the Pipeline Inspection and Forecasting side panels)",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Goutham Kotha",
        prdLink: "https://docs.google.com/document/d/1XIoYBHkzcymeOQ_eCsYt_H7SRAWSIdkzvH5MpEIrPVo/edit?tab=t.ecfis54hfqi8",
        team: "Sales Cloud Perseus",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Anurag Mudgal",
        designLead: "Huong Le",
        qualityLead: "Aniruddhsinh Solanki",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "See which contacts have had recent activities, their role in the deal and level of engagement. (In the Pipeline Inspection and Forecasting side panels)",
            keyFeatures: ["Dev Done: 4/09", "Q3 HandOff: 4/10", "Q3 Sign-Off: 4/28", "Q4 Hand-Off: 4/10", "Q4 Sign-Off: 4/24"],
            impact: "4/28/16\n- Complete, all sign off in place. Gate rollout process underway.\n\n4/14/26\n- QA in progress, an internal blitz was done today during IST hours.\n\n4/07/26\n- Dev complete, changes merged to hush-base and will be subsequently merged to GTM rel..."
        }
    },
    {
        id: 47,
        title: "Pipeline Inspection Column: Activity Heatmap",
        description: "Activity Heatmap column in the Pipeline Inspection list view",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Namita Sehgal",
        prdLink: "https://docs.google.com/document/d/1DpJoP6MCw_UiIp4esvhi94YSZ1gbV1HIL3K2zwcmTzI/edit?tab=t.0#heading=h.vmgvokhkkazu",
        team: "AccountsAndContacts",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Christopher Bernt",
        designLead: "Dave Fernandez",
        qualityLead: "Harsha Medikonda",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "Activity Heatmap column in the Pipeline Inspection list view",
            keyFeatures: ["Dev Done: 3/12", "Q3 HandOff: 3/13", "Q3 Sign-Off: 04/14", "Q4 Hand-Off: 3/13", "Q4 Sign-Off: 4/13"],
            impact: "5/5: Gate rollout completed 100%\n\nBug report: https://gus.lightning.force.com/lightning/r/Report/00OEE000002tBOH2A2/view?queryScope=userFolders\n\n4/28:\nGate rollout pending instance upgrade to .13 (ETA for .13 deployment is 4/28. Start gate rollout E..."
        }
    },
    {
        id: 48,
        title: "Pipeline Inspection: AI Summarization - Side Panel UI",
        description: "This feature directly competes with Gong’s \"Ask Anything\" feature by allowing sellers to ask specific questions about deal activities",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Isabella Arredondo Rolfe",
        prdLink: "https://docs.google.com/document/d/1zlN_u1DIobBiA55j6eZm63QbsHdCvKGDAt2gt0Liv48/edit?tab=t.0#heading=h.lhw4q6c650i2",
        team: "Sales Cloud Perseus",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Anurag Mudgal",
        designLead: "Matthew O'Rourke",
        qualityLead: "Aniruddhsinh Solanki",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "This feature directly competes with Gong’s \"Ask Anything\" feature by allowing sellers to ask specific questions about deal activities",
            keyFeatures: ["Dev Done: 3/12", "Q3 HandOff: Old : 3/13, New : 3/16", "Q3 Sign-Off: 04/02", "Q4 Hand-Off: Old : 3/13, New : 3/16", "Q4 Sign-Off:"],
            impact: "4/14/26\n- Complete, changes promoted from GTM release to patch ; gates will be enabled in 262.13\n\n4/07/26\n- Complete, changes promoted from GTM release to patch\n\n3/31/26\n- Changes merged to 260.12 patch over the weekend.\n\n3/24/26\n- QA in progress, couple..."
        }
    },
    {
        id: 49,
        title: "Pipeline Inspection: AI Summarization - Topics and Actions",
        description: "This feature directly competes with Gong’s \"Ask Anything\" feature by allowing sellers to ask specific questions about deal activities",
        category: "feature",
        status: "in-progress",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Isabella Arredondo Rolfe",
        prdLink: "https://docs.google.com/document/d/1zlN_u1DIobBiA55j6eZm63QbsHdCvKGDAt2gt0Liv48/edit?tab=t.0#heading=h.lhw4q6c650i2",
        team: "Katmai",
        scheduledBuild: "262",
        health: "On Track",
        devLead: "Jason Mar",
        designLead: "Matthew O'Rourke",
        qualityLead: "Meharjot Kals",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "This feature directly competes with Gong’s \"Ask Anything\" feature by allowing sellers to ask specific questions about deal activities",
            keyFeatures: ["Dev Done: 3/12", "Q3 HandOff: 3/13", "Q3 Sign-Off: 3/27", "Q4 Hand-Off: 3/13", "Q4 Sign-Off:"],
            impact: "5/11: Gates rolling out\n5/5: Blocking bug fixed in .14. All Stakeholders signed off. Gate rollout May 11-15.\n\n4/14/26:\n- Final instruction updates ready (includes 2 bug fixes). \n- Q4 team to do few more runs to evaluate consistency and then work on a con..."
        }
    },
    {
        id: 50,
        title: "Pipeline Inspection: Allow users to add/remove/reorder synthetic columns",
        description: "Allow users to add/remove/reorder synthetic columns, so they can add them to their custom lists views",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Michael Kuszczak",
        prdLink: "https://docs.google.com/document/d/1ZcVymWDOYbVVdUHr0gEftDDY2iKMqEMR0V9pCKhJCOw/edit?tab=t.0",
        team: "AccountsAndContacts",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Christopher Bernt",
        designLead: "-",
        qualityLead: "Harsha Medikonda",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "Allow users to add/remove/reorder synthetic columns, so they can add them to their custom lists views",
            keyFeatures: ["Dev Done: 3/12", "Q3 HandOff: 3/13", "Q3 Sign-Off:", "Q4 Hand-Off: 3/13", "Q4 Sign-Off:"],
            impact: "5/5: Gate rollout completed 100%\n4/28:\nGate rollout pending instance upgrade to .13 (ETA for .13 deployment is 4/28. Start gate rollout EOD)\n4/7/26 \n- As Heatmap GA is deferred till EOM, include gate rollout for this epic along with Sales methodology..."
        }
    },
    {
        id: 51,
        title: "Pipeline Inspection: Data loading to allow lazy loaded synthetic columns",
        description: "5/5: Gate rollout completed 100%\n\n3/3/26: QA complete\n2/23/26: Dev complete.\n2/17/26: Main concern brought up was code from Framework and Activities branch being needed for work in Contacts branch.  Teams are connecting.\n2/9/26:\nQA complete.",
        category: "feature",
        status: "completed",
        period: "Winter '26 Patch (260.patch)",
        quarter: "Winter '26 Patch (260.patch)",
        date: "260.patch",
        owner: "Michael Kuszczak",
        prdLink: "https://docs.google.com/document/d/1ZcVymWDOYbVVdUHr0gEftDDY2iKMqEMR0V9pCKhJCOw/edit?tab=t.0",
        team: "AccountsAndContacts",
        scheduledBuild: "260.patch",
        health: "Completed",
        devLead: "Christopher Bernt",
        designLead: "Dave Fernandez",
        qualityLead: "Harsha Medikonda",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "5/5: Gate rollout completed 100%\n\n3/3/26: QA complete\n2/23/26: Dev complete.\n2/17/26: Main concern brought up was code from Framework and Activities branch being needed for work in Contacts branch.  Teams are connecting.\n2/9/26:\nQA complete.",
            keyFeatures: ["Dev Done: 3/12", "Q3 HandOff: N/A", "Q3 Sign-Off: N/A", "Q4 Hand-Off: 3/13", "Q4 Sign-Off:"],
            impact: "5/5: Gate rollout completed 100%\n\n3/3/26: QA complete\n2/23/26: Dev complete.\n2/17/26: Main concern brought up was code from Framework and Activities branch being needed for work in Contacts branch.  Teams are connecting.\n2/9/26:\nQA complete."
        }
    },
    {
        id: 52,
        title: "Pipeline Inspection: Support synthetic column default column widths",
        description: "syntheticCols-defaultWidths.png",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Michael Kuszczak",
        prdLink: "https://docs.google.com/document/d/1ZcVymWDOYbVVdUHr0gEftDDY2iKMqEMR0V9pCKhJCOw/edit?tab=t.0",
        team: "AccountsAndContacts",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Sarah Li",
        designLead: "Dave Fernandez",
        qualityLead: "Harsha Medikonda",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "syntheticCols-defaultWidths.png",
            keyFeatures: ["Dev Done: 3/12", "Q3 HandOff: 3/13", "Q3 Sign-Off:", "Q4 Hand-Off: 3/13", "Q4 Sign-Off:"],
            impact: "5/5: Gate rollout completed 100%\n\n4/28:\nGate rollout pending instance upgrade to .13 (ETA for .13 deployment is 4/28. Start gate rollout EOD)\n\n3/24\nQ3 - Testing complete. \n\n3/11: QA complete.\n3/11/26 (Harsha): Q3 Test plan complete. Review with ..."
        }
    },
    {
        id: 53,
        title: "Pipeline Management: Adoption - Setup Flow & Prompt Improvements",
        description: "Address the top usability blockers on our GA scope:  Figma Add a section in our Go",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Jonah May",
        prdLink: "http://P1 items",
        team: "Pipeline Experience",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "-",
        designLead: "Kyle Mirro",
        qualityLead: "Soumya Mittapalli",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "Address the top usability blockers on our GA scope:  Figma Add a section in our Go",
            keyFeatures: ["Dev Done: 2/12", "Q3 HandOff: 2/13", "Q3 Sign-Off: 2/17", "Q4 Hand-Off: 2/13", "Q4 Sign-Off: N/A"],
            impact: "3/10: Complete and reviewed by UX/CX/CDX\n3/3: Double checking on UX/CX/CDX review\n2/23: Q3 complete\n2/17: Q3 sign-off still needed.\n2/10: Scrum team work complete and ready for 260.10 / Release 2.  Q3 Sign-off still needed."
        }
    },
    {
        id: 54,
        title: "Pipeline Management: Allow field-level control over autonomous mode",
        description: "Today, autonomous mode for pipeline management is all or nothing. We believe our customers will be able to get into autonomous mode much faster if we allow for field level control.",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Jonah May",
        prdLink: "https://docs.google.com/document/d/1Z8TVSohuK25trI7kIKjj4_y5Mm8cDfpzm9PDUwCRhdI/edit?tab=t.0#heading=h.jsni90ncgtwc",
        team: "Pipeline Experience",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "-",
        designLead: "-",
        qualityLead: "Soumya Mittapalli",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "Today, autonomous mode for pipeline management is all or nothing. We believe our customers will be able to get into autonomous mode much faster if we allow for field level control.",
            keyFeatures: ["Dev Done: 3/12", "Q3 HandOff: 3/13", "Q3 Sign-Off:", "Q4 Hand-Off: 3/13", "Q4 Sign-Off:"],
            impact: "3/16: Q3 testing in progress\n3/10: Promotion to release branch for extensive Q3 testing 3/12.\n3/2: Completed with testing.  Q3 will do more extensive test pass starting 3/12 when promoted to GTM release env.\n2/23: On track.  Need to fix bug around cus..."
        }
    },
    {
        id: 55,
        title: "Pipeline Management: Improve PI EPT Phase 1 - Date range",
        description: "Improve EPT Phase 1  [Cron Job] Creation of Sales deal agent Cron Job to delete the Expire",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Jeff O'Donnell",
        prdLink: "http://P1 items",
        team: "Pipeline Experience",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "-",
        designLead: "-",
        qualityLead: "Soumya Mittapalli",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "Improve EPT Phase 1  [Cron Job] Creation of Sales deal agent Cron Job to delete the Expire",
            keyFeatures: ["Dev Done: 2/12", "Q3 HandOff: 2/13", "Q3 Sign-Off: 2/27", "Q4 Hand-Off: 2/13", "Q4 Sign-Off: 3/2"],
            impact: "3/10: Changing scope of this Epic to include just Date Range.  Working on re-implementing Deletion Cron Job as async.  Moving that work into the main EPT Epic.\n3/2: Date range changes are Q3/Q4 complete.  However AIGenActionItem Deletion Cron Job is del..."
        }
    },
    {
        id: 56,
        title: "Platform: AP Split to Harness Migration",
        description: "Platform: AP Split to Harness Migration modernizes the deployment pipeline by moving to a scalable, standardized delivery platform. It reduces release risk, improves deployment velocity, and establishes a consistent foundation",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Namita Sehgal",
        prdLink: "",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "-",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "Platform: AP Split to Harness Migration modernizes the deployment pipeline by moving to a scalable, standardized delivery platform. It reduces release risk, improves deployment velocity, and establishes a consistent foundation",
            keyFeatures: [],
            impact: "Completed with no issues"
        }
    },
    {
        id: 57,
        title: "Q1 2026 CX Sales EAC | EAC Doc Refactor",
        description: "Work relating to the EAC doc refactor project. Targeting ToC restructure, Intro and Security sections rewrite during the 260 release timeframe (due mid-Feb 2026) \n Harini's progres tracker: https://docs.google.com/presentation",
        category: "feature",
        status: "planned",
        period: "Winter '26 Patch (260.patch)",
        quarter: "Winter '26 Patch (260.patch)",
        date: "260.patch",
        owner: "Catherine Adams",
        prdLink: "",
        team: "Sales Cloud CX",
        scheduledBuild: "260.patch",
        health: "",
        devLead: "-",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "Work relating to the EAC doc refactor project. Targeting ToC restructure, Intro and Security sections rewrite during the 260 release timeframe (due mid-Feb 2026) \n Harini's progres tracker: https://docs.google.com/presentation",
            keyFeatures: [],
            impact: "-"
        }
    },
    {
        id: 58,
        title: "RIQ releases + Build and Release get well",
        description: "Trust: RIQ Releases + Build and Release Get-Well stabilizes and hardens the release pipeline to reduce defects and deployment risk. It improves release predictability, shortens recovery time, and strengthens overall platform re",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Matt Geis",
        prdLink: "",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "-",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "Trust: RIQ Releases + Build and Release Get-Well stabilizes and hardens the release pipeline to reduce defects and deployment risk. It improves release predictability, shortens recovery time, and strengthens overall platform re",
            keyFeatures: [],
            impact: "4/3: Riq, exchange, google have all been completed in some form in the previous weeks. RIQ is underway now with a both a normal change set and also an offline effort to redeploy any services which have not been deployed in a long time. Current main focus..."
        }
    },
    {
        id: 59,
        title: "Recall.ai Calendar Integration POC + spiking + approval + prod launch",
        description: "This is partly a placeholder and will have more detail later. Recall efforts are underway in December, so roughly \n spiking done January pre-prod Feb prod March \n More detail to come",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Casey Cook",
        prdLink: "",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "-",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "This is partly a placeholder and will have more detail later. Recall efforts are underway in December, so roughly \n spiking done January pre-prod Feb prod March \n More detail to come",
            keyFeatures: ["POC: 2/4", "Security approval: Ongoing, Rachna to update on 2/4", "Q3 Sign Off: TBD", "Q4 Sign Off: TBD", "Target Patch: TBD"],
            impact: "02/10 Update :\nWe finished creating the Parent ECA and on track to complete work to create associated (child) ECA to authenticate with Recall. Validation and E2E Testing for ECA on track to start next week. Outbound Bot APIs for bot scheduling in review..."
        }
    },
    {
        id: 60,
        title: "Record Matching Flow",
        description: "TLDR Transition our (related record) matching service from toggle to be re-built in flow Admins can customize Possibly to include how participants are matched Bonus - aligning with EAC matching as we",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Cole Bennett",
        prdLink: "https://salesforce.quip.com/xqKxAKhRfJXg",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "Kris Fox",
        designLead: "-",
        qualityLead: "Deepmala Mehta",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "TLDR Transition our (related record) matching service from toggle to be re-built in flow Admins can customize Possibly to include how participants are matched Bonus - aligning with EAC matching as we",
            keyFeatures: ["Dev Handoff: 3/12", "Q3 Sign Off: 3/20 (delayed on blocker bug) (Sign off done for validating regression as we are not going GA with this epic)", "Q4 Sign Off: 3/20", "Target Patch:  260.12 (week of 4/6/2026)"],
            impact: "4/1\n- Feature put behind a gate and will not made available to customers, will be revisited post architecture alignment w/ Momentum\n- Team to fast follow a patch change to hide flows that would still be visible\n3/25 - Q3 blocker and Kris reported bein..."
        }
    },
    {
        id: 61,
        title: "SCV Transcript Ingestion",
        description: "TLDR For orgs using SCV, admins can add this in setup, and it shows up whenever set up, regardless of which vendor they're using for SCV ECI should calls for (ECI users) + (any SCV calls), regardless of vendor.",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Cole Bennett",
        prdLink: "https://salesforce.quip.com/w96QARHDQ86W",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "Parin Kenia",
        designLead: "-",
        qualityLead: "Mohammad Suhaib Tariq",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "TLDR For orgs using SCV, admins can add this in setup, and it shows up whenever set up, regardless of which vendor they're using for SCV ECI should calls for (ECI users) + (any SCV calls), regardless of vendor.",
            keyFeatures: ["M1 April - E2E Steel thread in UI", "M2 May - Data Cloud DataKit", "M3 June - Conversation Search, Sales Signals", "Dev Handoff: 7/23 FF", "Q3 Sign Off: TBD"],
            impact: "04/29 - \nQA to start on W-20893340 - Ensure Call Structure and Transcript fetch can resolve ConversationParticipant -> CRM Ids \nand W-22201283 - Revert releasable task and pref check in setup - RFR. Needs to be resolved as it will expose the regression..."
        }
    },
    {
        id: 62,
        title: "SRE Run The Business including support and security requests",
        description: "Description including Target Customer and Benefit or Goal (The “Who, What and Why”) Run the business requests include infra releases onboarding offboarding troubleshooting access",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Casey Cook",
        prdLink: "",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "-",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "Description including Target Customer and Benefit or Goal (The “Who, What and Why”) Run the business requests include infra releases onboarding offboarding troubleshooting access",
            keyFeatures: [],
            impact: "4/3: In addition to previously managed efforts around AL2023 bash code coverage, this week vault updates have been front and center. Terramon changes are done\n3/20: So many things have been added here: AL2023 updates, terramon, bash code coverage. We wi..."
        }
    },
    {
        id: 63,
        title: "Sales Agent in Slack",
        description: "Enable sellers to work with their Sales Agent in Slack",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Karen Otuteye",
        prdLink: "",
        team: "Katmai",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Alicia Ong",
        designLead: "Huong Le",
        qualityLead: "Meharjot Kals",
        v2momMethod: "Slack for All Editions",
        version: "gus",
        details: {
            overview: "Enable sellers to work with their Sales Agent in Slack",
            keyFeatures: ["Open gate for all instances"],
            impact: "2/23/26: Gates open on all instances\n2/17/26: Gates rolling out through last weekend.  Should be complete by Wednesday.\n2/9/26:\nERR to fix blocker completed today. Gate rollout to start on 2/11.\n\n1/28/26\n- New intermittent bug in prod that was not ..."
        }
    },
    {
        id: 64,
        title: "Sales Agent in Slack metering for notifications",
        description: "Add user-level metering of 15 Pipeline Management notifications per day so that we don't overwhelm users with too many notifications, and control cost to serve.",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Karen Otuteye",
        prdLink: "",
        team: "Katmai",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Sai Lakshminaraayana",
        designLead: "Huong Le",
        qualityLead: "Meharjot Kals",
        v2momMethod: "Slack for All Editions",
        version: "gus",
        details: {
            overview: "Add user-level metering of 15 Pipeline Management notifications per day so that we don't overwhelm users with too many notifications, and control cost to serve.",
            keyFeatures: ["Dev Done: 3/23", "Q3 HandOff: 4/1", "Q3 Sign-Off:", "Q4 Hand-Off: 4/1", "Q4 Sign-Off: 4/15"],
            impact: "5/12: Done and in production\n4/28: Validate on 260.Patch and sign off.\n3/31: Backport to GTM release 4 develop branch\n3/24: QA complete\n3/16: Dev complete. QA in progress\n3/11: Out for review. On track\n3/3: Implementation to start this sprint, on track\n2..."
        }
    },
    {
        id: 65,
        title: "Sales Key Metrics Customization Support",
        description: "Allow KPI Center to draw off of extended or modified SDMs. GUI for admins to configure custom recommended actions association to KPIs. Decouple KPI Center from Magic Feed in terms of setup pre-reqs.",
        category: "feature",
        status: "planned",
        period: "Winter '27 (266)",
        quarter: "Winter '27 (266)",
        date: "266",
        owner: "Lizzy Perruzzi",
        prdLink: "https://docs.google.com/document/d/1ndQtWN386xtZBzDXivieWwtP48AP5ReIQ1DEHUECgbo/edit?tab=t.ebnqt88n8qkt",
        team: "",
        scheduledBuild: "266",
        health: "",
        devLead: "Prateek Sharma (Sales Cloud)",
        designLead: "Nirjhar Ray",
        qualityLead: "",
        v2momMethod: "",
        version: "gus",
        details: {
            overview: "Allow KPI Center to draw off of extended or modified SDMs. GUI for admins to configure custom recommended actions association to KPIs. Decouple KPI Center from Magic Feed in terms of setup pre-reqs.",
            keyFeatures: [],
            impact: "-"
        }
    },
    {
        id: 66,
        title: "Sales Key Metrics DC1 (preparedness)",
        description: "Meet DC1 compliance requirements for the metrics provided by Sales Workspace in Lightning and Slack.",
        category: "feature",
        status: "planned",
        period: "Winter '27 (266)",
        quarter: "Winter '27 (266)",
        date: "266",
        owner: "Lizzy Perruzzi",
        prdLink: "https://docs.google.com/document/d/1ndQtWN386xtZBzDXivieWwtP48AP5ReIQ1DEHUECgbo/edit?tab=t.ebnqt88n8qkt",
        team: "",
        scheduledBuild: "266",
        health: "",
        devLead: "Prateek Sharma (Sales Cloud)",
        designLead: "Nirjhar Ray",
        qualityLead: "",
        v2momMethod: "",
        version: "gus",
        details: {
            overview: "Meet DC1 compliance requirements for the metrics provided by Sales Workspace in Lightning and Slack.",
            keyFeatures: [],
            impact: "-"
        }
    },
    {
        id: 67,
        title: "Sales Methodologies: Add New Insights to Forecasting Side Panel",
        description: "Uplift the Pipeline Forecasting side panel to match PI side panel.",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Goutham Kotha",
        prdLink: "http://P1 items",
        team: "Sales Cloud Centaurus",
        scheduledBuild: "262",
        health: "Not Started",
        devLead: "Anurag Mudgal",
        designLead: "Huong Le",
        qualityLead: "Aniruddhsinh Solanki",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "Uplift the Pipeline Forecasting side panel to match PI side panel.",
            keyFeatures: [],
            impact: "-"
        }
    },
    {
        id: 68,
        title: "Sales Methodologies: Configurable methodologies",
        description: "Phase 3: Customizable Methodologies",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Jonah May",
        prdLink: "https://docs.google.com/document/d/1XjufQJ1iF0yXwMfcwfMHRVuQsj7iuNS2Ygambm2fPU8/edit?usp=sharing",
        team: "Sales Cloud Centaurus",
        scheduledBuild: "262",
        health: "Not Started",
        devLead: "Manish Singh (Sales Cloud)",
        designLead: "Kyle Mirro",
        qualityLead: "Aniruddhsinh Solanki",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "Phase 3: Customizable Methodologies",
            keyFeatures: ["Dev Done: 4/09", "Q3 HandOff: 4/10", "Q3 Sign-Off:", "Q4 Hand-Off: 4/10", "Q4 Sign-Off:"],
            impact: "-"
        }
    },
    {
        id: 69,
        title: "Sales Methodologies: OOTB methodologies",
        description: "Phase 1: Out-of-the-Box (OOTB) MEDDIC Methodology Implementation Pipeline Inspection List View UI updates Pipeline Inspection Detail View UI updates Admin selector to select from standard set of methodologie",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Jonah May",
        prdLink: "https://docs.google.com/document/d/1XjufQJ1iF0yXwMfcwfMHRVuQsj7iuNS2Ygambm2fPU8/edit?usp=sharing",
        team: "Sales Cloud Centaurus",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Manish Singh (Sales Cloud)",
        designLead: "Kyle Mirro",
        qualityLead: "Aniruddhsinh Solanki",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "Phase 1: Out-of-the-Box (OOTB) MEDDIC Methodology Implementation Pipeline Inspection List View UI updates Pipeline Inspection Detail View UI updates Admin selector to select from standard set of methodologie",
            keyFeatures: ["Dev Done: 03/12", "GTM Release Branch Merge: 3/17", "Q3 HandOff: Old : 4/10, New : 3/17", "Q3 Sign-Off: 04/02", "Q4 Hand-Off: Old : 4/10, New : 3/17"],
            impact: "4/28/26\n- Gate enablement planned this week.\n\n4/14/26\n- Complete, changes promoted to patch.\n- Gates will be enabled post 16th April because of ongoing moratorium from gater team.\n\n04/07/26\n- Complete, changes promoted from GTM release to patch\n..."
        }
    },
    {
        id: 70,
        title: "Sales Methodologies: Pipeline Management Agent - Autonomous",
        description: "Phase 3: Sales Methodologies: Pipeline Management Agent - Autonomous",
        category: "feature",
        status: "planned",
        period: "Summer '26 (264)",
        quarter: "Summer '26 (264)",
        date: "264",
        owner: "Jonah May",
        prdLink: "",
        team: "Sales Cloud Centaurus",
        scheduledBuild: "264",
        health: "",
        devLead: "Manish Singh (Sales Cloud)",
        designLead: "",
        qualityLead: "",
        v2momMethod: "",
        version: "gus",
        details: {
            overview: "Phase 3: Sales Methodologies: Pipeline Management Agent - Autonomous",
            keyFeatures: ["Dev Done: Old: 5/15, New: 5/8Q3 HandOff: Old : 5/18, New: 5/19Q3 Sign-Off:Q4 Hand-Off: Old : 5/18, New: 5/13Q4 Sign-Off:UX/CX Hand-Off: Old : 5/18, New: 5/13UX/CX Sign-Off"],
            impact: "5/19/26\n- Handed over for testing.\n\n5/12/26\n- Final PR merge from feature brach to GTM release is in progress, will be handed over to Q3/Q4 by 05/13.\n\n5/5/26\n- On track for 05/07 Dev deadline for GTM 262.8 release.\n\n4/28/26\n- On track for Dev completion ..."
        }
    },
    {
        id: 71,
        title: "Sales Methodologies: Pipeline Management Agent - On Demand",
        description: "Phase 2: Pipeline Management Agent with OOTB MEDDIC Methodology Pre-populated OOTB PROMPTS/FLOWS for MEDDIC within the Pipeline Agent Potential updates to the AIGenActionItem UI to align with playbook changes",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Jonah May",
        prdLink: "https://docs.google.com/document/d/1XjufQJ1iF0yXwMfcwfMHRVuQsj7iuNS2Ygambm2fPU8/edit?usp=sharing",
        team: "Sales Cloud Centaurus",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Manish Singh (Sales Cloud)",
        designLead: "Dave Fernandez",
        qualityLead: "Aniruddhsinh Solanki",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "Phase 2: Pipeline Management Agent with OOTB MEDDIC Methodology Pre-populated OOTB PROMPTS/FLOWS for MEDDIC within the Pipeline Agent Potential updates to the AIGenActionItem UI to align with playbook changes",
            keyFeatures: ["Dev Done: Old: 5/15, New: 4/9", "Q3 HandOff: 5/18, New: 4/9", "Q3 Sign-Off: 4/30", "Q4 Hand-Off: 5/18, New: 4/9", "Q4 Sign-Off:"],
            impact: "4/28/26\n- Team fixed fewP2 bugs and working on patch approval doc and approvals from all stakeholders.\n\n4/14/26\n- QA in progress, blitz scheduled for 04/15.\n\n04/07/26\n- Final mocks not yet delivered, team is moving ahead with POC UI that was done ..."
        }
    },
    {
        id: 72,
        title: "Sales Workspace - Relax hard requirement on ECI and EAC in end user onboarding",
        description: "Relax hard requirement on ECI and EAC (in end user onboarding)",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Shahid Khan",
        prdLink: "https://docs.google.com/document/d/1ndQtWN386xtZBzDXivieWwtP48AP5ReIQ1DEHUECgbo/edit?tab=t.5rfz8zf2dscg",
        team: "LeadsAndNotes",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Wenying Yang",
        designLead: "Nima Motamedi",
        qualityLead: "Orville Pinto",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "Relax hard requirement on ECI and EAC (in end user onboarding)",
            keyFeatures: ["Dev Done: 2/16", "Q3 HandOff: 2/17", "Q3 Sign-Off: 2/27", "Q4 Hand-Off: N/A", "Q4 Sign-Off: N/A"],
            impact: "3/3: All Done\n2/24: Q3 Testing in Patch GTM Release branch  completed\n2/27: Q3 Testing in 260/Patch branch  completed\n2/17: Dev Done, Q3 Testing in progress\n2/10: On track, no blockers"
        }
    },
    {
        id: 73,
        title: "Sales Workspace AI-Driven Feed Priority",
        description: "Prioritize feed items based on AI scoring, surfacing them based on a combination of urgency and priority",
        category: "feature",
        status: "planned",
        period: "Winter '27 (266)",
        quarter: "Winter '27 (266)",
        date: "266",
        owner: "Lizzy Perruzzi",
        prdLink: "",
        team: "",
        scheduledBuild: "266",
        health: "",
        devLead: "James Yuan",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "",
        version: "gus",
        details: {
            overview: "Prioritize feed items based on AI scoring, surfacing them based on a combination of urgency and priority",
            keyFeatures: [],
            impact: "-"
        }
    },
    {
        id: 74,
        title: "Sales Workspace GA",
        description: "Single pane of glass for sellers to collaborate with agents",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Karen Otuteye",
        prdLink: "",
        team: "LeadsAndNotes",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Alicia Ong",
        designLead: "Nima Motamedi",
        qualityLead: "Orville Pinto",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "Single pane of glass for sellers to collaborate with agents",
            keyFeatures: ["Open gate in all instances"],
            impact: "2/10: Gate rollout will finish today\n1/28/26\n- Feature gate delayed due to two new blocking bugs found in prod (one issue with KPIs not loading, the other with data streams not refreshing). Team is determining root cause."
        }
    },
    {
        id: 75,
        title: "Sales Workspace Insights: Ignored email nudge",
        description: "New insight: Nudge to reply to ignored email",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Lizzy Perruzzi",
        prdLink: "https://docs.google.com/document/d/1ndQtWN386xtZBzDXivieWwtP48AP5ReIQ1DEHUECgbo/edit?tab=t.5rfz8zf2dscg",
        team: "LeadsAndNotes",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Alicia Ong",
        designLead: "Nima Motamedi",
        qualityLead: "Orville Pinto",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "New insight: Nudge to reply to ignored email",
            keyFeatures: ["Dev Done: 4/9", "Q3 HandOff: 4/10", "Q3 Sign-Off: 4/24", "Q4 Hand-Off: 4/10", "Q4 Sign-Off: 4/24"],
            impact: "4/28: Q4,UX,CX and PM signed off. Q3 testing in progress\n4/14: Q3 testing is in progress on the Patch GTM Release branch\n4/7: Handed off to Q3. Team is working on adding automation to meet the code coverage target of 80%\n3/31: Will fix all bugs this w..."
        }
    },
    {
        id: 76,
        title: "Sales Workspace Insights: Update oppty next steps",
        description: "New insight: Update oppty next steps",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Lizzy Perruzzi",
        prdLink: "https://docs.google.com/document/d/1ndQtWN386xtZBzDXivieWwtP48AP5ReIQ1DEHUECgbo/edit?tab=t.5rfz8zf2dscg#heading=h.qz6vkohrrutl",
        team: "Forecasting Content",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Darrel Liu",
        designLead: "Nima Motamedi",
        qualityLead: "Orville Pinto",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "New insight: Update oppty next steps",
            keyFeatures: ["Dev Done: 3/31", "Q3 HandOff: 4/1", "Q3 Sign-Off: 4/17", "Q4 Hand-Off: 4/1", "Q4 Sign-Off: 4/15"],
            impact: "4/28: Q4,UX,CX and PM signed off. Q3 testing in progress\n4/14: Q3 testing is in progress on the Patch GTM Release branch\n4/7: Handed off to Q3. Q3 testing in progress\n3/31: Last user story is QA in progress, and then we will hand off to Q3\n3/24: On t..."
        }
    },
    {
        id: 77,
        title: "Sales Workspace KPI Trust (Data Governance Tech Debt & Caching for EPT)",
        description: "KPI Trust (Data Governance Tech Debt & Caching for EPT) \n Active workstreams that will get covered as part of this epic are as follows - \n Data Governance onboar",
        category: "feature",
        status: "in-progress",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Lizzy Perruzzi",
        prdLink: "https://docs.google.com/document/d/1Xci5-hicDztqTdje4R6GmYc6NVEWKbgXXRc-h6wy6eI/edit?tab=t.0#heading=h.imwul2t4s0ew",
        team: "Sales Cloud Taurus",
        scheduledBuild: "262",
        health: "On Track",
        devLead: "Prateek Sharma (Sales Cloud)",
        designLead: "Huong Le",
        qualityLead: "William Hackett",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "KPI Trust (Data Governance Tech Debt & Caching for EPT) \n Active workstreams that will get covered as part of this epic are as follows - \n Data Governance onboar",
            keyFeatures: ["Dev Done: Old : 4/9, New : 5/7", "Q3 HandOff: Old : 4/10, New : 5/13", "Q3 Sign-Off:", "Q4 Hand-Off: Old : 4/10, New : 5/13", "Q4 Sign-Off:"],
            impact: "5/19/26\n- Handed over to Q3 for testing, blocked by P1 (W-22559233) from Revintel team\n\n5/12/26\n- Changes merged to GTM release and ready for Q3/Q4 handover.\n\n5/5/26\n- On track for 05/07 Dev deadline for GTM 262.8 release.\n\n4/28/16\n- On track for 262.8 G..."
        }
    },
    {
        id: 78,
        title: "Sales Workspace KPIs: Post-GA Enhancements",
        description: "Continue to work with DC/Semantic Layer teams to reduce cost and EPT. \n Active workstreams that will get covered as part of this epic are as follows - \n Number forma",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Lizzy Perruzzi",
        prdLink: "https://docs.google.com/document/d/1Xci5-hicDztqTdje4R6GmYc6NVEWKbgXXRc-h6wy6eI/edit?tab=t.0#heading=h.imwul2t4s0ew",
        team: "Sales Cloud Taurus",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Prateek Sharma (Sales Cloud)",
        designLead: "Nima Motamedi",
        qualityLead: "Trisha Kapadia",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "Continue to work with DC/Semantic Layer teams to reduce cost and EPT. \n Active workstreams that will get covered as part of this epic are as follows - \n Number forma",
            keyFeatures: ["Dev Done: 3/12", "Q3 HandOff: Old :3/13 , New : 3/17", "Q3 Sign-Off:", "Q4 Hand-Off: Old :3/13 , New : 3/17", "Q4 Sign-Off: 3/27"],
            impact: "4/14/26\n- Branching work to ensure backward compatibility is complete, testing complete\n\n4/07/26\n- Active account : No Q3/Q4 issues; branching work in progress to ensure backward compatibility.\n\n3/31/26\n- Active account revised definition : No Q3/..."
        }
    },
    {
        id: 79,
        title: "Sales Workspace New KPIs (incl. X-Cloud)",
        description: "Add new KPIs to KPI Center and allow sales reps to configure which KPIs display by default. \n Scope limited to 260 KPIs listed in",
        category: "feature",
        status: "planned",
        period: "Winter '27 (266)",
        quarter: "Winter '27 (266)",
        date: "266",
        owner: "Lizzy Perruzzi",
        prdLink: "",
        team: "",
        scheduledBuild: "266",
        health: "",
        devLead: "Prateek Sharma (Sales Cloud)",
        designLead: "Nirjhar Ray",
        qualityLead: "",
        v2momMethod: "",
        version: "gus",
        details: {
            overview: "Add new KPIs to KPI Center and allow sales reps to configure which KPIs display by default. \n Scope limited to 260 KPIs listed in",
            keyFeatures: [],
            impact: "-"
        }
    },
    {
        id: 80,
        title: "Sales Workspace Simplified Setup",
        description: "Reduce the complexity and number of steps in the Go Sales Workspace feature page to simplify the setup experience for customers \n Milestones: M1: Merge Intelligence view in one step	 - March (Internal demo) M2: Orchestrate",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Lizzy Perruzzi",
        prdLink: "https://docs.google.com/document/d/1ndQtWN386xtZBzDXivieWwtP48AP5ReIQ1DEHUECgbo/edit?tab=t.dhqr1fccr3",
        team: "Sales Cloud Taurus",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Prateek Sharma (Sales Cloud)",
        designLead: "Nima Motamedi",
        qualityLead: "Trisha Kapadia",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "Reduce the complexity and number of steps in the Go Sales Workspace feature page to simplify the setup experience for customers \n Milestones: M1: Merge Intelligence view in one step	 - March (Internal demo) M2: Orchestrate",
            keyFeatures: ["Dev Done: 4/09", "Q3 HandOff: 4/10", "Q3 Sign-Off: 4/30", "Q4 Hand-Off: 4/10", "Q4 Sign-Off:"],
            impact: "5/5/26\n- Complete, sign received from all stakeholders.\n\n4/28/26\n- QA in progress, Q3 faced a blocker with C360 SDM deployment delaying sign-off.\n- Fix is pushed by Revintel team in .14; waiting for SDB to pick up the change for Q3  \n   to continue..."
        }
    },
    {
        id: 81,
        title: "Spike: Email privacy options on Core",
        description: "Frequent enterprise security ask to adoption EAC Email sync. Lacking this we are losing deal that could potentially lead to Agentforce customers like Amazon etc.",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Namita Sehgal",
        prdLink: "https://docs.google.com/document/d/1WrZ7pXLKBqXEPFW8Q8oF7derUTjgAGXnyx3AOWWHipk/edit?tab=t.0#heading=h.7posinch7t7q",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "Yogesh Patel",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "Frequent enterprise security ask to adoption EAC Email sync. Lacking this we are losing deal that could potentially lead to Agentforce customers like Amazon etc.",
            keyFeatures: [],
            impact: "1/20:\nEpic Nevered by the product\n1/13: \nNot started. Stretch item.\n1/7:\nNot started. Stretch item."
        }
    },
    {
        id: 82,
        title: "Storm Right Sizing plus Graviton",
        description: "This is a structural cost lever that lowers infra run-rate, protects margins at scale, and future-proofs our platform without impacting reliability or velocity. Storm Right Sizing + Graviton together optimize both how much co",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Sri Darapuneni",
        prdLink: "http://n/a",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "-",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "This is a structural cost lever that lowers infra run-rate, protects margins at scale, and future-proofs our platform without impacting reliability or velocity. Storm Right Sizing + Graviton together optimize both how much co",
            keyFeatures: [],
            impact: "3/27: The graviton portion will be finished with the jdk17 upgrades. The memory portion will only happen after the jdk17 upgrades (approx the end of the 262 release)\n2/13: This has been co-mingled with the turnkey/new cell efforts. Right now this config..."
        }
    },
    {
        id: 83,
        title: "Test Epic",
        description: "This is a test placeholder epic",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Bani Kalra",
        prdLink: "https://docs.google.com/document/d/1-stAmnA0cNqijxE9fhPIcijOXqL18TTIRfXjCXB4I98/edit?tab=t.0",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "Bani Kalra",
        designLead: "-",
        qualityLead: "Bani Kalra",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "This is a test placeholder epic",
            keyFeatures: ["Dev Handoff: 1/20 (delayed by 2 days)", "Q3 hoff: 1/22 (complete)", "Q3 Sign Off: 2/5 (10 days)", "Q4 S-Off: 2/5 (Ongoing)", "Target Patch: 260.7 (customer release 2/11)"],
            impact: "2/10:\nOne bug to patch in 260.8 : W-21229786 (completed)\nPhase 2: we are going to create a new developers patch branch for the continuation of Easy ECI in Phase 2 (LLM based features)\n\n2/9:\nOff-core prod push done, FVT gate on\n\n2/3: \n(update) eci..."
        }
    },
    {
        id: 84,
        title: "Unified Agent Action Feed with Prioritization (Slack/Lightning)",
        description: "As a sales rep, I can accept or reject prioritized Agent recommendations easily across Lightning, Slack and mobile",
        category: "feature",
        status: "planned",
        period: "Winter '27 (266)",
        quarter: "Winter '27 (266)",
        date: "266",
        owner: "Lizzy Perruzzi",
        prdLink: "",
        team: "",
        scheduledBuild: "266",
        health: "",
        devLead: "Lu Ping Chen ☢",
        designLead: "Chris Sellinger",
        qualityLead: "",
        v2momMethod: "",
        version: "gus",
        details: {
            overview: "As a sales rep, I can accept or reject prioritized Agent recommendations easily across Lightning, Slack and mobile",
            keyFeatures: [],
            impact: "5/1: Started this sprint"
        }
    },
    {
        id: 85,
        title: "Unified Agent Action Feed: Escalated case",
        description: "New insight: Escalated case related to opportunity/account",
        category: "feature",
        status: "planned",
        period: "Summer '26 (264)",
        quarter: "Summer '26 (264)",
        date: "264",
        owner: "Lizzy Perruzzi",
        prdLink: "https://docs.google.com/document/d/1ndQtWN386xtZBzDXivieWwtP48AP5ReIQ1DEHUECgbo/edit?tab=t.5rfz8zf2dscg",
        team: "",
        scheduledBuild: "264",
        health: "",
        devLead: "Jason Lu",
        designLead: "Nirjhar Ray",
        qualityLead: "",
        v2momMethod: "",
        version: "gus",
        details: {
            overview: "New insight: Escalated case related to opportunity/account",
            keyFeatures: [],
            impact: "5/19: Intern started this week, he will start on it from next week"
        }
    },
    {
        id: 86,
        title: "Unified Agent Action Feed: Filtering",
        description: "Sales reps can filter the agent feed by categories",
        category: "feature",
        status: "planned",
        period: "Summer '26 (264)",
        quarter: "Summer '26 (264)",
        date: "264",
        owner: "Lizzy Perruzzi",
        prdLink: "https://docs.google.com/document/d/1Yt-urLpIk5_KIh0PliQ-O6whB9-M0II9UM4amN1JYyk/edit?tab=t.exa750a18a6w",
        team: "",
        scheduledBuild: "264",
        health: "",
        devLead: "-",
        designLead: "Nirjhar Ray",
        qualityLead: "",
        v2momMethod: "",
        version: "gus",
        details: {
            overview: "Sales reps can filter the agent feed by categories",
            keyFeatures: [],
            impact: "5/19: Spike will be started this week"
        }
    },
    {
        id: 87,
        title: "Unified Agent Action Feed: Meeting Settings",
        description: "From their Agent Action feed, Sales Reps can update meeting settings such as recording and privacy for upcoming meetings",
        category: "feature",
        status: "planned",
        period: "Summer '26 (264)",
        quarter: "Summer '26 (264)",
        date: "264",
        owner: "Lizzy Perruzzi",
        prdLink: "https://docs.google.com/document/d/1Yt-urLpIk5_KIh0PliQ-O6whB9-M0II9UM4amN1JYyk/edit?tab=t.exa750a18a6w",
        team: "",
        scheduledBuild: "264",
        health: "",
        devLead: "-",
        designLead: "Nirjhar Ray",
        qualityLead: "",
        v2momMethod: "",
        version: "gus",
        details: {
            overview: "From their Agent Action feed, Sales Reps can update meeting settings such as recording and privacy for upcoming meetings",
            keyFeatures: [],
            impact: "-"
        }
    },
    {
        id: 88,
        title: "Unified Agent Action Feed: Monitoring",
        description: "As an admin, I can report on how recommendations were handled by sales reps- how many had no interation, were dismissed, or where the action button was clicked.",
        category: "feature",
        status: "planned",
        period: "TBD",
        quarter: "TBD",
        date: "-",
        owner: "Lizzy Perruzzi",
        prdLink: "",
        team: "",
        scheduledBuild: "-",
        health: "",
        devLead: "Akhilesh Sharma",
        designLead: "Nirjhar Ray",
        qualityLead: "",
        v2momMethod: "",
        version: "gus",
        details: {
            overview: "As an admin, I can report on how recommendations were handled by sales reps- how many had no interation, were dismissed, or where the action button was clicked.",
            keyFeatures: [],
            impact: "-"
        }
    },
    {
        id: 89,
        title: "Unified Agent Action Feed: Onboard More Agents",
        description: "Onboard new internal teams so their features are available in Magic Feed",
        category: "feature",
        status: "planned",
        period: "Summer '26 (264)",
        quarter: "Summer '26 (264)",
        date: "264",
        owner: "Lizzy Perruzzi",
        prdLink: "",
        team: "",
        scheduledBuild: "264",
        health: "",
        devLead: "Wenying Yang",
        designLead: "Nirjhar Ray",
        qualityLead: "",
        v2momMethod: "",
        version: "gus",
        details: {
            overview: "Onboard new internal teams so their features are available in Magic Feed",
            keyFeatures: ["Dev Done: 5/7", "Q3 HandOff: 5/13", "Q3 Sign-Off:", "Q4 Hand-Off: N/A", "Q4 Sign-Off: N/A"],
            impact: "5/19: Q3 testing is in progress\n5/12: Promoted to Patch GTM. Q3 handoff this week\n5/5: Will merge to Release1 of PatchGTM this week\n4/28: Started this sprint"
        }
    },
    {
        id: 90,
        title: "Upgrade Cassandra major version",
        description: "Feature Overview (The “What”) Upgrading Cassandra to version 4+ across our services to enhance performance, reliability, and scalability while aligning with long-term tech enablement goals. This epic includes the necessary ste",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Jeffrey Morski",
        prdLink: "",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "-",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "Feature Overview (The “What”) Upgrading Cassandra to version 4+ across our services to enhance performance, reliability, and scalability while aligning with long-term tech enablement goals. This epic includes the necessary ste",
            keyFeatures: [],
            impact: "5/1: Stage will start on Monday. Full schedule presented to Nikhil\n4/3: after feedback we have decided we must do this rollout 1-AZ at a time. We have finished a new MO to do that (tested in pre-prod). Other feedback was to test the process first on a r..."
        }
    },
    {
        id: 91,
        title: "Upgrade Java on ES to jdk17",
        description: "must be done by April to be compliant with central team requests Else, Out of Compliance; Deprecation Notice of JDK 8 and JDK 11 at Salesforce by 04/01; Required to update",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Casey Cook",
        prdLink: "",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "-",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "must be done by April to be compliant with central team requests Else, Out of Compliance; Deprecation Notice of JDK 8 and JDK 11 at Salesforce by 04/01; Required to update",
            keyFeatures: [],
            impact: "3/6: This is all done\n2/13: Errors have been overcome in pre-prod and change has been deployed to 1 prod cluster....assuming no issues will likely be deployed to the rest next week\n2/6: Initial attempt on pre-prod has led to some unexplained errors. Th..."
        }
    },
    {
        id: 92,
        title: "Upgrade Postgresql to 14.X",
        description: "Background We are preparing for an upcoming Amazon RDS PostgreSQL upgrade from Postgres 13 → Postgres 14 . As part of this effort, we need to ensure our platform JDBC driver is aligned with the supported and recommended",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Xing Du",
        prdLink: "",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "-",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "Background We are preparing for an upcoming Amazon RDS PostgreSQL upgrade from Postgres 13 → Postgres 14 . As part of this effort, we need to ensure our platform JDBC driver is aligned with the supported and recommended",
            keyFeatures: [],
            impact: "4/3: Christina has taken this over from Xing. We now have a TD to do it by 4/30. We have not strictly committed to this date but we will attempt to hit it. The change has been in pre-prod for a while and Christina is attempting to get all stakeholders on..."
        }
    },
    {
        id: 93,
        title: "Upgrade zookeeper",
        description: "Trust: Upgrade ZooKeeper (v3.7) modernizes core infrastructure to supported, secure versions. It reduces security and stability risk, ensures vendor supportability, and protects platform reliability at scale.",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Sri Darapuneni",
        prdLink: "",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "-",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "Trust: Upgrade ZooKeeper (v3.7) modernizes core infrastructure to supported, secure versions. It reduces security and stability risk, ensures vendor supportability, and protects platform reliability at scale.",
            keyFeatures: [],
            impact: "1/30: This is complete and working in prod"
        }
    },
    {
        id: 94,
        title: "[258.Patch] New Simple Email Builder Experience in Starter & Pro Suite",
        description: "Add the perm and access to the Abridged Email Builder to Starter and Pro Suite orgs, both new and existing. \n Link to PRD:",
        category: "feature",
        status: "planned",
        period: "Summer '25 Patch (258.patch)",
        quarter: "Summer '25 Patch (258.patch)",
        date: "258.patch",
        owner: "Rob Everetts",
        prdLink: "http://Email Solution in Free Edition",
        team: "",
        scheduledBuild: "258.patch",
        health: "",
        devLead: "Snowvee Gonsalves",
        designLead: "Antonio Flamenco",
        qualityLead: "",
        v2momMethod: "",
        version: "gus",
        details: {
            overview: "Add the perm and access to the Abridged Email Builder to Starter and Pro Suite orgs, both new and existing. \n Link to PRD:",
            keyFeatures: ["Streamlined builder makes it easier for users to create emails with more template designs and a simplified experience. The better time-to-value enhances the onboarding and adoption, leading to more engagement and retention for marketing-focused users."],
            impact: "-"
        }
    },
    {
        id: 95,
        title: "[260] AI for SMB - Agentforce platform in Starter/Pro",
        description: "Deliver cloud-managed Agent to support MVP agentic use cases in SlackCRM and LEX. Enable Agentforce Platform in Starter/Pro with constraints to control CTS.",
        category: "feature",
        status: "planned",
        period: "Winter '26 (260)",
        quarter: "Winter '26 (260)",
        date: "260.10",
        owner: "Allison Burnett",
        prdLink: "https://docs.google.com/document/d/1vBCLScy5hP-k-VAGFJ4DqORhPwG-TF7ohBTGNLhfWLM/edit?tab=t.0#heading=h.nwqbr7wo5qyc",
        team: "",
        scheduledBuild: "260.10",
        health: "",
        devLead: "Juilee Patankar",
        designLead: "Nicole McGovern",
        qualityLead: "",
        v2momMethod: "",
        version: "gus",
        details: {
            overview: "Deliver cloud-managed Agent to support MVP agentic use cases in SlackCRM and LEX. Enable Agentforce Platform in Starter/Pro with constraints to control CTS.",
            keyFeatures: ["Built-in, employee-facing agent that acts as a personalized assistant & saves time for users via conversational inputs and secure AI. Democratizing Agentforce capabilities for SMBs strengthens the Suites' value proposition, accelerating NL acquisition."],
            impact: "03/17-\nComplete- Agentforce in SMB is GA on 03/17\n02/18\n[Q3] Retesting agent for  instructions update. We are also working on automating the actions tests for file and database based agents to compare behavioral differences, with a mid week ETA. 22 bu..."
        }
    },
    {
        id: 96,
        title: "[260][Demand] Restricted UMA in Free Edition",
        description: "260] UMA Rest",
        category: "feature",
        status: "planned",
        period: "Winter '26 (260)",
        quarter: "Winter '26 (260)",
        date: "260",
        owner: "Rob Everetts",
        prdLink: "https://docs.google.com/document/d/1oRc-mT-TqsJKe_rbpYShgLzYDrPDBLYHJ8g6uyuragw/edit?usp=sharing",
        team: "",
        scheduledBuild: "260",
        health: "",
        devLead: "-",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "",
        version: "gus",
        details: {
            overview: "260] UMA Rest",
            keyFeatures: ["Users build, manage, and send single-email campaigns via limited marketing automation, rounding out a full suite of OOTB sales, service, and marketing tools. A more robust experience accelerates our New Logo acquisition."],
            impact: "11/4: On track for 260 Soft Feature freeze. However, we have \"API enabled\" blocker which have  a path forward for 260 release and have ongling discussion with SA team\n10/28: On track for 260 Soft Feature freeze 11/7.However, we have \"API enabled\" blocke..."
        }
    },
    {
        id: 97,
        title: "[262 Spillover] Enable Tasks for UI API",
        description: "Spillover work from 260. This allows teams to build custom UI on top of the Task entity, including surfacing tasks in Slack.",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Karen Otuteye",
        prdLink: "",
        team: "Katmai",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "-",
        designLead: "Huong Le",
        qualityLead: "Meharjot Kals",
        v2momMethod: "Slack for All Editions",
        version: "gus",
        details: {
            overview: "Spillover work from 260. This allows teams to build custom UI on top of the Task entity, including surfacing tasks in Slack.",
            keyFeatures: ["Open gate for all Sandbox instances: 2/10", "Open gate for all prod instances: 4/6"],
            impact: "4/28/26:\nRollout steps 3/6 completed. Gates enabled for 15+ orgs reached out for early enablement.\n\n4/14/26:\n- Prod rollout started this week. 1 week buffer between steps. Target end date is 5/8.\n\n4/7/26:\n- Bug fix rolled out with 260.12\n- begin ..."
        }
    },
    {
        id: 98,
        title: "[262] - General Trust S2X",
        description: "General trust to maintain, EAC on Core, and other legacy products on Core like Lightning Sync, SFO, CAlendar and Mail Merge. Addressing on-call, support investigations and customer issues.",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Sameer Singhvi",
        prdLink: "",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "Dhaval Gada",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "General trust to maintain, EAC on Core, and other legacy products on Core like Lightning Sync, SFO, CAlendar and Mail Merge. Addressing on-call, support investigations and customer issues.",
            keyFeatures: ["256 DoR No"],
            impact: "1/7: TDs for Jan Delivery.\n- TD: Supporting AP New Cell Prod5\n- TD: AP2.0 Stop Crawling"
        }
    },
    {
        id: 99,
        title: "[262] - General Trust Tabasco",
        description: "Justification:",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Sameer Singhvi",
        prdLink: "",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "-",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "Justification:",
            keyFeatures: ["256 DoR No"],
            impact: "-"
        }
    },
    {
        id: 100,
        title: "[262] Consistent Recurring Event Edit experience (API and UI)",
        description: "Red Account, enhancement/fix promise: Wolter Kluvers agreed to renew w/ us based on this fix. Gap in behavior between UX and API for Event CRUD. \n There is a",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Namita Sehgal",
        prdLink: "https://salesforce.quip.com/XkPxAQlVxgTB",
        team: "Tabasco",
        scheduledBuild: "262",
        health: "",
        devLead: "-",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "Red Account, enhancement/fix promise: Wolter Kluvers agreed to renew w/ us based on this fix. Gap in behavior between UX and API for Event CRUD. \n There is a",
            keyFeatures: ["CX Handoff to Dev: NA (no UI text)", "Dev Done: ✅ 1/25", "Q3/Q4 Handover: ✅ 3/16", "Q3 Sign off: ✅ Complete 3/31 (Rounak)", "Q4 Sign off: ✅ Complete 3/31 (Jasmin)"],
            impact: "04/13 - Q3/Q4 signoff received. Pending release in 262. Epic Complete.\n\n3/31 - Handed over to Q3, no Q4 impact\n- 2026.01a sprint - Implement the fix (W-20618316, W-20618303) to make IsRecurrence2Exception editable in API and add a runtime versioning c..."
        }
    },
    {
        id: 101,
        title: "[262] Create OOTB Account Plans permset and update setup",
        description: "We plan to create an OOTB permission set for Account Plans. Currently in setup, we ask admins to create a custom permission set to give users access to the Account Plan, Account Plan Objective, and Account Plan Objective Measure objects. We will now c",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Isabella Arredondo Rolfe",
        prdLink: "",
        team: "AccountsAndContacts",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Lingyi Wang",
        designLead: "Huong Le",
        qualityLead: "Harsha Medikonda",
        v2momMethod: "Platform",
        version: "gus",
        details: {
            overview: "We plan to create an OOTB permission set for Account Plans. Currently in setup, we ask admins to create a custom permission set to give users access to the Account Plan, Account Plan Objective, and Account Plan Objective Measure objects. We will now c",
            keyFeatures: [],
            impact: "3/10: QA Complete\n3/3: On track. QA in progress\nSome of the work has been picked up for 262, remaining will move out to 264 based on available capacity.\n\nPicked up Context Translation feature, changes done from our end but gated for testing until con..."
        }
    },
    {
        id: 102,
        title: "[262] Data Compliance: Stop Crawling when AP Features are Off",
        description: "Freeing up capacity blocked with the EAC users who have turned off EAC but we still continue to capture their data. This will help us free up capacity before the new cell is up and running in 262.",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Namita Sehgal",
        prdLink: "https://docs.google.com/document/d/1VVYTHi-zNm-SFF6T1VAMR_OxUDEZ16hMGaN-zFF8Ae8/edit?tab=t.0#heading=h.z0a2cx7wklkx",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "Siddartha Thota",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "Freeing up capacity blocked with the EAC users who have turned off EAC but we still continue to capture their data. This will help us free up capacity before the new cell is up and running in 262.",
            keyFeatures: [],
            impact: "4/24: Running into few issues here and there in the testFi for Spark Job. But hand-off for Q3/Q4 is done and we are working closely with our partnering teams for the sign-offs\n4/10: Wrapped-up everything, Waiting for spark job to be deployed and tested...."
        }
    },
    {
        id: 103,
        title: "[262] General Trust - Accounts & Contacts",
        description: "Trust hero rotation / one-off non Kondo / non A11y (unless smaller bugs here and there) / non GO",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Mahalaxmi Sanathkumar",
        prdLink: "",
        team: "AccountsAndContacts",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Peter Wang (Sales Cloud)",
        designLead: "Huong Le",
        qualityLead: "-",
        v2momMethod: "Platform",
        version: "gus",
        details: {
            overview: "Trust hero rotation / one-off non Kondo / non A11y (unless smaller bugs here and there) / non GO",
            keyFeatures: [],
            impact: "-"
        }
    },
    {
        id: 104,
        title: "[262] General Trust - Centaurus",
        description: "[262] General Trust - Centaurus",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Soumitra Sen Gupta",
        prdLink: "",
        team: "Sales Cloud Centaurus",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Soumitra Sen Gupta",
        designLead: "Herve Mischler",
        qualityLead: "-",
        v2momMethod: "Platform",
        version: "gus",
        details: {
            overview: "[262] General Trust - Centaurus",
            keyFeatures: [],
            impact: "4/14/26\n- On track, no blockers\n\n4/07/26\n- On track, no blockers\n\n04/07/26\n- On track ,no blockers\n\n3/31/26\n- On track ,no blockers\n\n3/24/26\n- On track,no blockers\n\n3/16/26\n- On track, no blockers\n3/11/26\n- On track, no blockers\n3/2/26\nOn t..."
        }
    },
    {
        id: 105,
        title: "[262] General Trust - Forecasting Content",
        description: "Trust Rotation + Misc General Reactive Trust Items (includes TDs and other small requests that don’t fit into any other epics) MDAPI to add setup Pref, MDAPI Supp",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Lizzy Perruzzi",
        prdLink: "http://Trust Rotation + Misc General Reactive Trust Items",
        team: "Forecasting Content",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Shahid Khan",
        designLead: "-",
        qualityLead: "-",
        v2momMethod: "Platform",
        version: "gus",
        details: {
            overview: "Trust Rotation + Misc General Reactive Trust Items (includes TDs and other small requests that don’t fit into any other epics) MDAPI to add setup Pref, MDAPI Supp",
            keyFeatures: [],
            impact: "-"
        }
    },
    {
        id: 106,
        title: "[262] General Trust - Katmai",
        description: "Trust hero rotation / one-off non Kondo / non A11y (unless smaller bugs here and there) / non GO",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Mahalaxmi Sanathkumar",
        prdLink: "http://trust + bug bash",
        team: "Katmai",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Sai Lakshminaraayana",
        designLead: "Min Chang",
        qualityLead: "-",
        v2momMethod: "Platform",
        version: "gus",
        details: {
            overview: "Trust hero rotation / one-off non Kondo / non A11y (unless smaller bugs here and there) / non GO",
            keyFeatures: [],
            impact: "-"
        }
    },
    {
        id: 107,
        title: "[262] General Trust - LeadsAndNotes",
        description: "Trust Rotation + Misc General Reactive Trust Items (includes TDs and other small requests that don’t fit into any other epics)",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Lizzy Perruzzi",
        prdLink: "http://Trust Rotation + Misc General Reactive Trust Items",
        team: "LeadsAndNotes",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Shahid Khan",
        designLead: "-",
        qualityLead: "-",
        v2momMethod: "Platform",
        version: "gus",
        details: {
            overview: "Trust Rotation + Misc General Reactive Trust Items (includes TDs and other small requests that don’t fit into any other epics)",
            keyFeatures: [],
            impact: "-"
        }
    },
    {
        id: 108,
        title: "[262] General Trust - Perseus",
        description: "[262] General Trust - Perseus",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Hariharan Jagadeesan",
        prdLink: "",
        team: "Sales Cloud Perseus",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Anurag Mudgal",
        designLead: "-",
        qualityLead: "-",
        v2momMethod: "Platform",
        version: "gus",
        details: {
            overview: "[262] General Trust - Perseus",
            keyFeatures: [],
            impact: "4/14/26\n- On track, no blockers\n\n4/07/26\n- On track, no blockers\n\n3/31/26\n- On track, no blockers\n\n3/24/26\n- On track,no blockers\n\n3/16/26\n- On track, no blockers\n3/11/26\n- On track, no blockers\n3/2/26\nOn track, no blockers\n2/24/26\nOn track, no bl..."
        }
    },
    {
        id: 109,
        title: "[262] General Trust - Pipeline Experience",
        description: "Trust hero rotation / one-off non Kondo / non A11y (unless smaller bugs here and there) / non GO",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Jeff O'Donnell",
        prdLink: "http://Includes general trust + dedicated bug reduction",
        team: "Pipeline Experience",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Darrel Liu",
        designLead: "Min Chang",
        qualityLead: "-",
        v2momMethod: "Platform",
        version: "gus",
        details: {
            overview: "Trust hero rotation / one-off non Kondo / non A11y (unless smaller bugs here and there) / non GO",
            keyFeatures: [],
            impact: "-"
        }
    },
    {
        id: 110,
        title: "[262] General Trust - Taurus",
        description: "[262] General Trust - Taurus",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Soumitra Sen Gupta",
        prdLink: "",
        team: "Sales Cloud Taurus",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Soumitra Sen Gupta",
        designLead: "Herve Mischler",
        qualityLead: "-",
        v2momMethod: "Platform",
        version: "gus",
        details: {
            overview: "[262] General Trust - Taurus",
            keyFeatures: [],
            impact: "4/14/26\n- On track, no blockers\n\n4/07/26\n- On track, no blockers\n\n4/01/26\n- on track\n\n3/31/26\n- On track,no blockers\n\n3/24/26\n- On track,no blockers\n\n3/16/26 - On track, no blockers\n3/11/26 - On track, no blockers\n3/2/26 - On track, no bloc..."
        }
    },
    {
        id: 111,
        title: "[262] General Trust A360 Nexus",
        description: "Customer Escalations, Oncall Support, Deployment, Sync Latency; Maintain services for for EAC, SDR, Starter and Inbox involving &g",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Birva Joshi",
        prdLink: "",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "-",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "Customer Escalations, Oncall Support, Deployment, Sync Latency; Maintain services for for EAC, SDR, Starter and Inbox involving &g",
            keyFeatures: [],
            impact: "-"
        }
    },
    {
        id: 112,
        title: "[262] General Trust A360 Stargate",
        description: "Customer Escalations, Oncall Support, Deployment, Sync Latency; Maintain services for for EAC, SDR, Starter and Inbox involving &g",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Birva Joshi",
        prdLink: "",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "-",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "Customer Escalations, Oncall Support, Deployment, Sync Latency; Maintain services for for EAC, SDR, Starter and Inbox involving &g",
            keyFeatures: [],
            impact: "-"
        }
    },
    {
        id: 113,
        title: "[262] PFT Telemetry - Accounts & Contacts",
        description: "Instrumentation TDs Phase 1 and Phase 2",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Jeff O'Donnell",
        prdLink: "http://Includes general trust + dedicated bug reduction",
        team: "AccountsAndContacts",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Peter Wang (Sales Cloud)",
        designLead: "Min Chang",
        qualityLead: "-",
        v2momMethod: "Platform",
        version: "gus",
        details: {
            overview: "Instrumentation TDs Phase 1 and Phase 2",
            keyFeatures: [],
            impact: "3/3: Work completed from eng side. PMs need to clean up old features \n2/24: On track\n2/17: Meeting with eng/PMs Tuesday to discuss next steps/plan for Phase 2.\n2/10: Phase 1 Deploying with 260.7.  Phase 2 plan needs discussion with PMs.  On track for ..."
        }
    },
    {
        id: 114,
        title: "[262] PFT Telemetry - Forecasting Content",
        description: "Handle all the TDs logged for Product Feature Taxonomy (PFT) Telemetry",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Shahid Khan",
        prdLink: "http://N/A",
        team: "Forecasting Content",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Shahid Khan",
        designLead: "-",
        qualityLead: "-",
        v2momMethod: "Platform",
        version: "gus",
        details: {
            overview: "Handle all the TDs logged for Product Feature Taxonomy (PFT) Telemetry",
            keyFeatures: [],
            impact: "2/10: Phase 1 done, started Phase 2"
        }
    },
    {
        id: 115,
        title: "[262] PFT Telemetry - Katmai",
        description: "Instrumentation TDs Phase 1 and Phase 2",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Jeff O'Donnell",
        prdLink: "http://Includes general trust + dedicated bug reduction",
        team: "Katmai",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Sai Lakshminaraayana",
        designLead: "Min Chang",
        qualityLead: "-",
        v2momMethod: "Platform",
        version: "gus",
        details: {
            overview: "Instrumentation TDs Phase 1 and Phase 2",
            keyFeatures: [],
            impact: "-"
        }
    },
    {
        id: 116,
        title: "[262] PFT Telemetry - Pipeline Experience",
        description: "Instrumentation TDs Phase 1 and Phase 2",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Jeff O'Donnell",
        prdLink: "http://Includes general trust + dedicated bug reduction",
        team: "Pipeline Experience",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Vivek Dodeja",
        designLead: "Min Chang",
        qualityLead: "-",
        v2momMethod: "Platform",
        version: "gus",
        details: {
            overview: "Instrumentation TDs Phase 1 and Phase 2",
            keyFeatures: [],
            impact: "3/3: On track for FF\n2/17: Meeting with eng/PMs Tuesday to discuss next steps/plan for Phase 2.\n2/10: Phase 1 Deploying with 260.7.  Phase 2 plan needs discussion with PMs.  On track for 262 FF."
        }
    },
    {
        id: 117,
        title: "[262] PFT Telemetry Trust - LeadsAndNotes",
        description: "Handle all the TDs logged for Product Feature Taxonomy (PFT) Telemetry",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Shahid Khan",
        prdLink: "http://N/A",
        team: "LeadsAndNotes",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Shahid Khan",
        designLead: "-",
        qualityLead: "-",
        v2momMethod: "Platform",
        version: "gus",
        details: {
            overview: "Handle all the TDs logged for Product Feature Taxonomy (PFT) Telemetry",
            keyFeatures: [],
            impact: "3/16: Last User Story is closed \n3/11: Last User Story is fixed, will be closed by EOW\n3/3: Just Lead CRUD left, slotted for 3a sprint\n2/10: Phase 1 done, started Phase 2"
        }
    },
    {
        id: 118,
        title: "[262] Pipeline Forecasting KT",
        description: "Plan and start Knowledge Transfer of Pipeline Forecasting to new owners",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Shahid Khan",
        prdLink: "http://N/A",
        team: "Forecasting Content",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Sagar Kamat",
        designLead: "-",
        qualityLead: "-",
        v2momMethod: "Platform",
        version: "gus",
        details: {
            overview: "Plan and start Knowledge Transfer of Pipeline Forecasting to new owners",
            keyFeatures: [],
            impact: "4/14: Last session happened today\n4/7: Last session is scheduled for today\n3/31: Left with 3 KT sessions\n3/24: Left with 4 KT sessions\n3/16: UI related sessions will be starting from this week\n3/11: Left with UI related KT sessions that will be star..."
        }
    },
    {
        id: 119,
        title: "[262] Pipeline Forecasting Onboarding",
        description: "[262] Pipeline Forecasting Onboarding",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Soumitra Sen Gupta",
        prdLink: "",
        team: "Sales Cloud Perseus",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Anurag Mudgal",
        designLead: "Herve Mischler",
        qualityLead: "-",
        v2momMethod: "Platform",
        version: "gus",
        details: {
            overview: "[262] Pipeline Forecasting Onboarding",
            keyFeatures: [],
            impact: "4/14/26\n- On track, KTs underway from pipeline forecasting team\n\n4/07/26\n- On track, KTs underway from pipeline forecasting team\n\n3/31/26\n- On track, KTs underway from pipeline forecasting team\n\n3/24/26\n- On track, KTs underway from pipeline forecasting ..."
        }
    },
    {
        id: 120,
        title: "[262] Retroactive Matching: Oppty and Contacts/Leads via apex and Lex",
        description: "Feature parity: to ensure all Email and Event data can be safely moved to Core without missing any core functionalities that provided context even with historic activities (emails",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Namita Sehgal",
        prdLink: "https://docs.google.com/document/d/11UzDmHyc2vyD4ivf4baN3VXkN-i67grjg15rrgc-4yA/edit?tab=t.0",
        team: "Tabasco",
        scheduledBuild: "262",
        health: "",
        devLead: "Akanksha Chandre",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "Feature parity: to ensure all Email and Event data can be safely moved to Core without missing any core functionalities that provided context even with historic activities (emails",
            keyFeatures: ["CX Handoff to Dev:  ✅ NA (no UI text)", "Dev Done: ✅ 3/26", "Q3/Q4 Handover: ✅ 3/26", "Q3 : Signoff Complete  ✅ 4/13", "Q4 Sign off: 5/8 (Renuka/Amarendu)"],
            impact: "04/14 - Awaiting Q4 sign off, on track for sign off for 5/8.\n\n04/06 - In Q4 resource queue for allocation on 5/15 \n\n03/31 - Waiting for Q34 Sign off. \n\n03/24 - Dev Complete. Q3 handoff scheduled this week (@Rounak S). Q4 to begin testing shortly (@..."
        }
    },
    {
        id: 121,
        title: "[262] Sales Workspace KPI KT",
        description: "KPI -> FC Team (for chase the sun coverage and support)",
        category: "feature",
        status: "completed",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Karen Otuteye",
        prdLink: "http://N/A",
        team: "Forecasting Content",
        scheduledBuild: "262",
        health: "Completed",
        devLead: "Sagar Kamat",
        designLead: "-",
        qualityLead: "-",
        v2momMethod: "Platform",
        version: "gus",
        details: {
            overview: "KPI -> FC Team (for chase the sun coverage and support)",
            keyFeatures: [],
            impact: "3/24: All KT sessions delivered\n3/16: KT sessions progress, 2/4 sessions delivered\n3/11: KT sessions progress, 1/4 sessions delivered"
        }
    },
    {
        id: 122,
        title: "[262] Trust: Exchange Crawler Stabilization",
        description: "3/6: On Track",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Jeff Wang",
        prdLink: "",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "Jeff Wang",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "3/6: On Track",
            keyFeatures: [],
            impact: "3/6: On Track"
        }
    },
    {
        id: 123,
        title: "[262] Trust: MongoDb Stabilization",
        description: "DataSource is the most write-intensive collection. In the past, excessive MongoDB write volume has resulted in multi-second write latencies, causing significant backlogs in the ingestion pipeline. MongoDB serves as a metadata store for the ingestion p",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Jeff Wang",
        prdLink: "https://salesforce.quip.com/VUQkAwYgaQH3",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "Jeff Wang",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "DataSource is the most write-intensive collection. In the past, excessive MongoDB write volume has resulted in multi-second write latencies, causing significant backlogs in the ingestion pipeline. MongoDB serves as a metadata store for the ingestion p",
            keyFeatures: [],
            impact: "-"
        }
    },
    {
        id: 124,
        title: "[262] [Internal Epic for PI handoff/Not customer facing ] Activity Heatmap",
        description: "Show Activity Heatmap for last 30 days ac",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Namita Sehgal",
        prdLink: "http://P1 items",
        team: "Tabasco",
        scheduledBuild: "262",
        health: "",
        devLead: "Shreyans Jain",
        designLead: "Dave Fernandez",
        qualityLead: "",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "Show Activity Heatmap for last 30 days ac",
            keyFeatures: ["Dev Handoff: ✅ 03/12", "Dev Complete: ✅ 03/25", "Q3 Signoff on Patch :  ✅ 04/14 a3QEE0000020HcP2AU", "Q4 Signoff: ✅ 04/13", "Release to prod. Week of 04/20, as the scheduled patch is 260.13. Pending PI enablement"],
            impact: "04/20\n- Epic is complete.\n\n04/13\n- Received Q4 signoff on 04/13\n- Final Blitz complete on 04/13. Expecting Q3 signoff soon (no open P1/P2/P3)\n- Awaiting rollout with 260.13 (Week of 04/20)\n- Completed feature request for maintaining max-width when..."
        }
    },
    {
        id: 125,
        title: "[264] General Trust - Centaurus",
        description: "[264] General Trust - Centaurus",
        category: "feature",
        status: "planned",
        period: "Summer '26 (264)",
        quarter: "Summer '26 (264)",
        date: "264",
        owner: "Hariharan Jagadeesan",
        prdLink: "",
        team: "Sales Cloud Centaurus",
        scheduledBuild: "264",
        health: "",
        devLead: "Himanshu Kapoor",
        designLead: "",
        qualityLead: "",
        v2momMethod: "",
        version: "gus",
        details: {
            overview: "[264] General Trust - Centaurus",
            keyFeatures: [],
            impact: "5/19/26\n- On track, no blockers\n\n5/12/26\n- On track, no blockers\n\n5/5/26\n- On track, no blockers"
        }
    },
    {
        id: 126,
        title: "[264] General Trust - Perseus",
        description: "[264] General Trust - Perseus",
        category: "feature",
        status: "planned",
        period: "Summer '26 (264)",
        quarter: "Summer '26 (264)",
        date: "264",
        owner: "Hariharan Jagadeesan",
        prdLink: "",
        team: "Sales Cloud Perseus",
        scheduledBuild: "264",
        health: "",
        devLead: "Anurag Mudgal",
        designLead: "",
        qualityLead: "",
        v2momMethod: "",
        version: "gus",
        details: {
            overview: "[264] General Trust - Perseus",
            keyFeatures: [],
            impact: "5/19/26\n- On track, no blockers\n\n5/12/26\n- On track, no blockers\n\n5/5/26\n- On track, no blockers"
        }
    },
    {
        id: 127,
        title: "[264] General Trust - Taurus",
        description: "[264] General Trust - Taurus",
        category: "feature",
        status: "planned",
        period: "Summer '26 (264)",
        quarter: "Summer '26 (264)",
        date: "264",
        owner: "Hariharan Jagadeesan",
        prdLink: "",
        team: "Sales Cloud Taurus",
        scheduledBuild: "264",
        health: "",
        devLead: "Prateek Sharma (Sales Cloud)",
        designLead: "",
        qualityLead: "",
        v2momMethod: "",
        version: "gus",
        details: {
            overview: "[264] General Trust - Taurus",
            keyFeatures: [],
            impact: "5/19/26\n- On track, no blockers\n\n5/12/26\n- On track, no blockers\n\n5/5/26\n- On track, no blockers"
        }
    },
    {
        id: 128,
        title: "[264] Pipeline Forecasting Onboarding",
        description: "[264] Pipeline Forecasting Onboarding",
        category: "feature",
        status: "planned",
        period: "Summer '26 (264)",
        quarter: "Summer '26 (264)",
        date: "264",
        owner: "Hariharan Jagadeesan",
        prdLink: "",
        team: "Sales Cloud Perseus",
        scheduledBuild: "264",
        health: "",
        devLead: "Anurag Mudgal",
        designLead: "",
        qualityLead: "",
        v2momMethod: "",
        version: "gus",
        details: {
            overview: "[264] Pipeline Forecasting Onboarding",
            keyFeatures: [],
            impact: "5/19/26\n- On track, KTs underway\n\n5/12/26\n- On track, KTs planned for coming weeks.\n\n5/5/26\n- On track, KTs planned for coming weeks."
        }
    },
    {
        id: 129,
        title: "[A360 Nexus] Graph API GA Migration Support (data capture, performance and SLA)",
        description: "MSFT is retiring EWS APIs in Oct '26 impacting over 85k customers across 5 different products (EAC, Inbox, SDR, Lightning Sync and Starter/Pro). Come october '26 without G",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Birva Joshi",
        prdLink: "",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "Johannes Kienzle",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "MSFT is retiring EWS APIs in Oct '26 impacting over 85k customers across 5 different products (EAC, Inbox, SDR, Lightning Sync and Starter/Pro). Come october '26 without G",
            keyFeatures: [],
            impact: "4/10 - Supporting as needed. No work pending.\n3/27 - Supporting as needed. No work pending.\n3/20 - Supporting as needed. No work pending.\n3/13 - Supporting as needed. No work pending.\n3/6 - No changes. Supporting as needed.\n2/6 - Budget requests sub..."
        }
    },
    {
        id: 130,
        title: "[A360 Nexus] JDK Upgrade",
        description: "Out of Compliance; Deprecation Notice of JDK 8 and JDK 11 at Salesforce by 04/01; Required to update the AP stack clients like Kafka, storm etc without which AP will be",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Namita Sehgal",
        prdLink: "http://n/a",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "Shan-cheng Ho",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "Out of Compliance; Deprecation Notice of JDK 8 and JDK 11 at Salesforce by 04/01; Required to update the AP stack clients like Kafka, storm etc without which AP will be",
            keyFeatures: [],
            impact: "4/10 - Production deployments halted due to snappy compression bug on graviton hardware. RCA in progress. Will resume deployments following bug fix and verification.\n3/27 - Production deployments in progress, including new cell. Vault-Mesh TD-0300769 is..."
        }
    },
    {
        id: 131,
        title: "[A360 Stargate] Graph API GA Migration Support (data capture, perf and SLA)",
        description: "MSFT is retiring EWS APIs in Oct '26 impacting over 85k customers across 5 different products (EAC, Inbox, SDR, Lightning Sync and Starter/Pro). Come october '26 without G",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Birva Joshi",
        prdLink: "",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "Johannes Kienzle",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "MSFT is retiring EWS APIs in Oct '26 impacting over 85k customers across 5 different products (EAC, Inbox, SDR, Lightning Sync and Starter/Pro). Come october '26 without G",
            keyFeatures: [],
            impact: "3/6: Onoging support on track"
        }
    },
    {
        id: 132,
        title: "[A360 Stargate] JDK Upgrade",
        description: "Out of Compliance, Deprecation Notice of JDK 8 and JDK 11 at Salesforce by 04/01; Required to update the AP stack clients like Kafka, storm etc",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Birva Joshi",
        prdLink: "http://n/a",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "Shan-cheng Ho",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "Out of Compliance, Deprecation Notice of JDK 8 and JDK 11 at Salesforce by 04/01; Required to update the AP stack clients like Kafka, storm etc",
            keyFeatures: [],
            impact: "5/1: all services should finish prodpush today.\n4/10: resolved SNAPPY issue, resuming prod push.\n3/27: Prod push are being processed.\n3/20: Prod push are being processed.\n3/13: Prod push are being prepared.\n3/6: All services are deployed in test FI...."
        }
    },
    {
        id: 133,
        title: "[Deprioritized for 260] SCV Transcript Ingestion",
        description: "SCV alignment Leverage SCV transcripts directly - SCV gets transcripts directly from Vendors \n UX Admin setup for how we showcase SCV as a provider, link to their",
        category: "feature",
        status: "planned",
        period: "Winter '26 (260)",
        quarter: "Winter '26 (260)",
        date: "260.btl",
        owner: "Cole Bennett",
        prdLink: "https://salesforce.quip.com/w96QARHDQ86W",
        team: "",
        scheduledBuild: "260.btl",
        health: "",
        devLead: "Anthony Desportes",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "",
        version: "gus",
        details: {
            overview: "SCV alignment Leverage SCV transcripts directly - SCV gets transcripts directly from Vendors \n UX Admin setup for how we showcase SCV as a provider, link to their",
            keyFeatures: ["260 DoR No Feature"],
            impact: "-"
        }
    },
    {
        id: 134,
        title: "[EAC Foundation] JDK Upgrade",
        description: "Out of Compliance; Deprecation Notice of JDK 8 and JDK 11 at Salesforce by 04/01; Required to update the AP stack clients like Kafka, storm etc without which AP will be",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Alex Oscherov",
        prdLink: "",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "Alex Oscherov",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "Out of Compliance; Deprecation Notice of JDK 8 and JDK 11 at Salesforce by 04/01; Required to update the AP stack clients like Kafka, storm etc without which AP will be",
            keyFeatures: ["260 DoR No Feature"],
            impact: "--- no further updates on this epic, see below ---\n2/6 - Engineers are finishing the upgrades for EAC Foundation services in pre-prod environments. Will still need to deploy to prod in future  sprint. Future updates will come in A360 Nexus and A360 Star..."
        }
    },
    {
        id: 135,
        title: "[GTM Rel 2] Allow admin to hide \"my pipeline\" list view",
        description: "Update pipeline inspection setup to allow admin to disable \"My Pipeline\" list view. When \"My Pipeline\" is disabled, users accessing \"My Pipeline\" are redirected to the first public list view in alphabetical order.",
        category: "feature",
        status: "planned",
        period: "Summer '26 (264)",
        quarter: "Summer '26 (264)",
        date: "264",
        owner: "Michael Kuszczak",
        prdLink: "https://docs.google.com/document/d/1ZcVymWDOYbVVdUHr0gEftDDY2iKMqEMR0V9pCKhJCOw/edit?tab=t.0",
        team: "",
        scheduledBuild: "264",
        health: "",
        devLead: "-",
        designLead: "Huong Le",
        qualityLead: "",
        v2momMethod: "",
        version: "gus",
        details: {
            overview: "Update pipeline inspection setup to allow admin to disable \"My Pipeline\" list view. When \"My Pipeline\" is disabled, users accessing \"My Pipeline\" are redirected to the first public list view in alphabetical order.",
            keyFeatures: ["Dev Done:", "Q3 HandOff: N/A", "Q3 Sign-Off: N/A", "Q4 Hand-Off:", "Q4 Sign-Off:"],
            impact: "5/11: On track for now, but risk of slipping due to bandwidth concerns and work to release Deal Alerts"
        }
    },
    {
        id: 136,
        title: "[GTM Rel 2] Columns in OOTB list experience",
        description: "Allow sales ops to set the default layout for all sellers, and add new calculated columns to custom lists Make synthetic columns default added on specific list views This is when all new columns are complete and added to the p",
        category: "feature",
        status: "planned",
        period: "Summer '26 (264)",
        quarter: "Summer '26 (264)",
        date: "264",
        owner: "Michael Kuszczak",
        prdLink: "https://docs.google.com/document/d/1ZcVymWDOYbVVdUHr0gEftDDY2iKMqEMR0V9pCKhJCOw/edit?tab=t.0",
        team: "",
        scheduledBuild: "264",
        health: "",
        devLead: "-",
        designLead: "Huong Le",
        qualityLead: "",
        v2momMethod: "",
        version: "gus",
        details: {
            overview: "Allow sales ops to set the default layout for all sellers, and add new calculated columns to custom lists Make synthetic columns default added on specific list views This is when all new columns are complete and added to the p",
            keyFeatures: ["Dev Done:", "Q3 HandOff: N/A", "Q3 Sign-Off: N/A", "Q4 Hand-Off:", "Q4 Sign-Off:"],
            impact: "5/11: 5/11: On track for now, but risk of slipping due to bandwidth concerns and work to release Deal Alerts\n5/5: On track"
        }
    },
    {
        id: 137,
        title: "[Insights] Core to DC sync - CSI onboarding",
        description: "Ability to sync insights onto CSI - engagement DMOs in data Cloud \n Design : https://docs.google.com/document/d/1qKDjkgfoSccJHbRcgfLyrkXD30ylrPOzLkC1uobD1HI/edit?tab=t.0#heading=h.tgf4u4f2u64g",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Priyesh Jaiswal",
        prdLink: "https://docs.google.com/document/d/1zWNyKpkvdbZGZqT8v8oL5VFCYngS1F8AUtBCz92hgEY/edit?tab=t.0#heading=h.i4np6zxvfga7",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "Divyanshu Bajpai",
        designLead: "-",
        qualityLead: "Sumit Pahwa",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "Ability to sync insights onto CSI - engagement DMOs in data Cloud \n Design : https://docs.google.com/document/d/1qKDjkgfoSccJHbRcgfLyrkXD30ylrPOzLkC1uobD1HI/edit?tab=t.0#heading=h.tgf4u4f2u64g",
            keyFeatures: ["Handover to Q3 in 262 - 03/16", "Q3 Completion in 262 - 3/27", "Target Patch - 262"],
            impact: "4/21 - All complete. Approval doc circulated with Jong & Parul to start the Gater rollout for Sales Signal\n4/07\n- CSI Onboarding testing completed and bugs verified.\nThere are few bugs open on Sales Signals which are not related to CSI(W-21759218 and ..."
        }
    },
    {
        id: 138,
        title: "[M1] [AP Galaxy] 262 - Planned/Unplanned Trust",
        description: "A360 FY25 V2MOM : https://docs.google.com/document/d/1Og-mQCcJfa0gG8wwxAxkKDgD9VLb6UTUzsvVWPE06V4/edit",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Neeharika Mokshagundam",
        prdLink: "",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "-",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "A360 FY25 V2MOM : https://docs.google.com/document/d/1Og-mQCcJfa0gG8wwxAxkKDgD9VLb6UTUzsvVWPE06V4/edit",
            keyFeatures: ["262 DoR No Trust"],
            impact: "4/14:\nOn track\n3/27:\nOn track\n3/20:\nOn track\n3/16: \nOn track\n3/10:\nOn track\n3/03:\nOn track\n2/24:\nOn track\n2/17:\nOn track\n2/10:\nOn track\n2/03: \nOn track\n1/27:\nOn track\n1/13:\nOn track\n1/7:\nOn track"
        }
    },
    {
        id: 139,
        title: "[M1] [Activities] 262 - Planned/Unplanned Trust",
        description: "A360 FY25 V2MOM : https://docs.google.com/document/d/1Og-mQCcJfa0gG8wwxAxkKDgD9VLb6UTUzsvVWPE06V4/edit",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Neeharika Mokshagundam",
        prdLink: "",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "-",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "Trust",
        version: "gus",
        details: {
            overview: "A360 FY25 V2MOM : https://docs.google.com/document/d/1Og-mQCcJfa0gG8wwxAxkKDgD9VLb6UTUzsvVWPE06V4/edit",
            keyFeatures: ["262 DoR No Trust"],
            impact: "4/14:\nOn track\n3/27:\nOn track\n3/20:\nOn track\n3/16: \nOn track\n3/10:\nOn track\n3/03:\nOn track\n2/24:\nOn track\n2/17:\nOn track\n2/10:\nOn track\n2/03:\nOn track\n1/27:\nOn track\n1/13: \nEpic is on track\n1/7:\nEpic is on track"
        }
    },
    {
        id: 140,
        title: "[Not customer facing release] Recall (Teams, Meet, Zoom)",
        description: "TLDR Recall used to allow user authentication to calendar/provider Bot should auto-join call OR user can manually add/remove Captures meeting details, participant details, calendar details, transcript/record",
        category: "feature",
        status: "planned",
        period: "Spring '26 (262)",
        quarter: "Spring '26 (262)",
        date: "262",
        owner: "Cole Bennett",
        prdLink: "https://docs.google.com/document/d/131DphjUONhcn1UMhksKByzHdmr9i1A1RLNBGwDZbM1U/edit?usp=sharing",
        team: "",
        scheduledBuild: "262",
        health: "",
        devLead: "Aleksey Kolesnik",
        designLead: "-",
        qualityLead: "Deepmala Mehta",
        v2momMethod: "Gong",
        version: "gus",
        details: {
            overview: "TLDR Recall used to allow user authentication to calendar/provider Bot should auto-join call OR user can manually add/remove Captures meeting details, participant details, calendar details, transcript/record",
            keyFeatures: ["Dev Handoff: Milestone 2 due 3/13", "Q3 Sign Off: n/a (to be picked up with integration work in 264)", "Q4 Sign Off: n/a (to be picked up with integration work in 264)", "Target Patch: n/a"],
            impact: "3/25 Update:\nEpic Milestone 2 complete, closing epic as Recall is not moving forward currently. Anything continuing this work will require a new epic\n\n3/17 Update\nTeam has wrapped up work and testing. Some dangling stories to be cleaned up 3/18 EOD a..."
        }
    },
    {
        id: 141,
        title: "[SlackCRM] Web to Lead Notification - March",
        description: "work to support leads for SlackCRM org recycle - changing the number of days record ownership change",
        category: "feature",
        status: "planned",
        period: "Winter '26 (260)",
        quarter: "Winter '26 (260)",
        date: "260.10",
        owner: "Alana Cutler",
        prdLink: "",
        team: "",
        scheduledBuild: "260.10",
        health: "",
        devLead: "-",
        designLead: "-",
        qualityLead: "",
        v2momMethod: "",
        version: "gus",
        details: {
            overview: "work to support leads for SlackCRM org recycle - changing the number of days record ownership change",
            keyFeatures: ["Native, conversational, and agentic CRM can be quickly set up & used inside Slack, bringing Salesforce’s trusted foundation directly into Slack's flow of work. This is a new entry point for Slack users & NLs to join the ecosystem and grow with Salesforce."],
            impact: "2/18\nDev complete for 260.10\n2/3\n - Spike done and had readout with Slack team. \n - Implementation kicked off. \n - Tight timeline to meet the Feb 12 dev-complete deadline."
        }
    },
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { roadmapDataGUS };
}