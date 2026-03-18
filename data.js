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

// Export for use in application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { roadmapDataV3 };
}