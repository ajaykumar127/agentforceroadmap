// Agentforce Roadmap Data
// V1 Source: https://docs.google.com/presentation/d/1cq4ZopwHC553L7A1CqfPvxYRnFvpPbWbrOIzkn_zBm4/
// V2 Source: https://docs.google.com/presentation/d/1GCa3jwpz-GCmBFWNO9_Mxu4LkiTxj8WbLmt18jvc8YI/

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

