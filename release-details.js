// Release Notes Detailed Data
// This file contains comprehensive release information for each Salesforce release
// Organized by release with detailed feature breakdowns

const releaseNotesData = {
    'winter-26': {
        version: '258',
        name: 'Winter \'26',
        icon: '❄️',
        status: 'current',
        releaseDate: 'October 2025',
        mainUrl: 'https://help.salesforce.com/s/articleView?id=release-notes.rn_einstein.htm&release=258&type=5',
        summary: 'The Winter \'26 release brings significant enhancements to Einstein and Agentforce capabilities, including new AI features, improved automation, and enhanced analytics.',
        categories: [
            {
                id: 'agentforce',
                name: 'Agentforce',
                icon: '🤖',
                features: [
                    {
                        id: 'af-1',
                        title: 'Agentforce Service Agent Enhancements',
                        status: 'GA',
                        description: 'Enhanced capabilities for service agents including improved natural language understanding and multi-channel support.',
                        details: {
                            overview: 'Service Agent now includes advanced conversation handling, better context retention, and seamless handoff to human agents.',
                            capabilities: [
                                'Multi-turn conversation memory',
                                'Enhanced sentiment analysis',
                                'Automatic case creation and updates',
                                'Knowledge article integration',
                                'Real-time translation support',
                                'Custom escalation rules'
                            ],
                            useCases: [
                                'Customer support automation',
                                'First-line inquiry resolution',
                                'Order status tracking',
                                'Technical troubleshooting'
                            ],
                            availability: 'Available in Enterprise, Performance, and Unlimited editions',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_service_agent.htm'
                        }
                    },
                    {
                        id: 'af-2',
                        title: 'Agentforce SDR Agent Beta',
                        status: 'Beta',
                        description: 'AI-powered Sales Development Representative that qualifies leads and schedules meetings automatically.',
                        details: {
                            overview: 'The SDR Agent autonomously engages with leads, qualifies opportunities, and books meetings based on your criteria.',
                            capabilities: [
                                'Automated lead scoring',
                                'Personalized email outreach',
                                'Meeting scheduling with calendar integration',
                                'CRM data enrichment',
                                'Follow-up automation',
                                'Performance analytics'
                            ],
                            useCases: [
                                'Lead qualification at scale',
                                'Automated prospecting',
                                'Meeting booking automation',
                                'Lead nurturing campaigns'
                            ],
                            availability: 'Beta available in Sales Cloud Enterprise and Unlimited editions',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_sdr_agent.htm'
                        }
                    },
                    {
                        id: 'af-3',
                        title: 'Agent Builder Workflow Designer',
                        status: 'GA',
                        description: 'Visual workflow builder for creating complex agent behaviors without code.',
                        details: {
                            overview: 'New drag-and-drop interface for designing agent workflows with conditional logic, loops, and integrations.',
                            capabilities: [
                                'Visual workflow designer',
                                'Conditional branching',
                                'Loop and iteration support',
                                'External API integrations',
                                'Testing and debugging tools',
                                'Version control'
                            ],
                            useCases: [
                                'Complex customer journeys',
                                'Multi-step approval processes',
                                'Data enrichment workflows',
                                'Custom agent behaviors'
                            ],
                            availability: 'Available with Agentforce license',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.agent_builder_workflows.htm'
                        }
                    }
                ]
            },
            {
                id: 'einstein',
                name: 'Einstein AI',
                icon: '⚡',
                features: [
                    {
                        id: 'ein-1',
                        title: 'Einstein Copilot for Sales',
                        status: 'GA',
                        description: 'AI assistant that helps sales reps with deal management, email drafting, and meeting preparation.',
                        details: {
                            overview: 'Einstein Copilot acts as a digital assistant for sales teams, providing contextual recommendations and automating routine tasks.',
                            capabilities: [
                                'Automated email generation',
                                'Meeting summary creation',
                                'Deal insights and recommendations',
                                'Next best action suggestions',
                                'Opportunity scoring',
                                'Competitor analysis'
                            ],
                            useCases: [
                                'Email automation',
                                'Deal coaching',
                                'Meeting preparation',
                                'Pipeline management'
                            ],
                            availability: 'Available in Sales Cloud Enterprise and Unlimited editions',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.einstein_copilot_sales.htm'
                        }
                    },
                    {
                        id: 'ein-2',
                        title: 'Einstein Analytics Predictions',
                        status: 'GA',
                        description: 'Advanced predictive analytics for forecasting and trend analysis.',
                        details: {
                            overview: 'Use machine learning models to predict outcomes, identify trends, and make data-driven decisions.',
                            capabilities: [
                                'Custom prediction models',
                                'Automated data preparation',
                                'Feature importance analysis',
                                'Model performance monitoring',
                                'Real-time predictions',
                                'Integration with CRM Analytics'
                            ],
                            useCases: [
                                'Sales forecasting',
                                'Churn prediction',
                                'Lead scoring',
                                'Demand forecasting'
                            ],
                            availability: 'Available with CRM Analytics Plus license',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.einstein_analytics_predictions.htm'
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
                        id: 'dc-1',
                        title: 'Data Cloud for Agents',
                        status: 'GA',
                        description: 'Connect agents to unified customer data across all touchpoints.',
                        details: {
                            overview: 'Enable agents to access complete customer profiles with real-time data from multiple sources.',
                            capabilities: [
                                'Unified customer profiles',
                                'Real-time data streaming',
                                'Cross-cloud data access',
                                'Data action automation',
                                'Privacy and security controls',
                                'Custom data models'
                            ],
                            useCases: [
                                'Personalized agent responses',
                                'Cross-channel customer views',
                                'Real-time recommendations',
                                'Predictive engagement'
                            ],
                            availability: 'Requires Data Cloud license',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.data_cloud_agents.htm'
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
        status: 'previous',
        releaseDate: 'June 2025',
        mainUrl: 'https://help.salesforce.com/s/articleView?id=release-notes.rn_einstein.htm&release=256&type=5',
        summary: 'Summer \'25 introduces foundational Agentforce capabilities and enhanced Einstein features for improved automation and intelligence.',
        categories: [
            {
                id: 'agentforce',
                name: 'Agentforce',
                icon: '🤖',
                features: [
                    {
                        id: 'af-s1',
                        title: 'Agentforce Platform Launch',
                        status: 'GA',
                        description: 'Official launch of the Agentforce platform for building and deploying AI agents.',
                        details: {
                            overview: 'Agentforce provides a complete platform for creating, managing, and deploying autonomous AI agents.',
                            capabilities: [
                                'Agent Builder interface',
                                'Pre-built agent templates',
                                'Natural language processing',
                                'Multi-channel deployment',
                                'Analytics and monitoring',
                                'Security and governance'
                            ],
                            useCases: [
                                'Customer service automation',
                                'Sales assistance',
                                'Marketing campaigns',
                                'IT support'
                            ],
                            availability: 'Available as add-on license',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_platform.htm'
                        }
                    },
                    {
                        id: 'af-s2',
                        title: 'Agent Actions Framework',
                        status: 'GA',
                        description: 'Extensible framework for defining custom agent actions and integrations.',
                        details: {
                            overview: 'Create custom actions that agents can perform, including API calls, data updates, and workflow triggers.',
                            capabilities: [
                                'Custom action builder',
                                'API integration templates',
                                'Parameter mapping',
                                'Error handling',
                                'Action versioning',
                                'Testing framework'
                            ],
                            useCases: [
                                'External system integration',
                                'Custom business logic',
                                'Data enrichment',
                                'Workflow automation'
                            ],
                            availability: 'Available with Agentforce license',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.agent_actions.htm'
                        }
                    }
                ]
            },
            {
                id: 'einstein',
                name: 'Einstein AI',
                icon: '⚡',
                features: [
                    {
                        id: 'ein-s1',
                        title: 'Einstein Conversation Insights',
                        status: 'GA',
                        description: 'AI-powered analysis of customer conversations for insights and coaching.',
                        details: {
                            overview: 'Automatically analyze calls, emails, and chats to extract insights and identify coaching opportunities.',
                            capabilities: [
                                'Automatic transcription',
                                'Sentiment analysis',
                                'Key moment detection',
                                'Coaching recommendations',
                                'Competitor mentions tracking',
                                'Custom keyword alerts'
                            ],
                            useCases: [
                                'Sales coaching',
                                'Quality assurance',
                                'Compliance monitoring',
                                'Customer feedback analysis'
                            ],
                            availability: 'Available in Sales Cloud Enterprise and Unlimited',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.einstein_conversation_insights.htm'
                        }
                    }
                ]
            }
        ]
    },
    'spring-25': {
        version: '254',
        name: 'Spring \'25',
        icon: '🌸',
        status: 'archived',
        releaseDate: 'February 2025',
        mainUrl: 'https://help.salesforce.com/s/articleView?id=release-notes.rn_einstein.htm&release=254&type=5',
        summary: 'Spring \'25 brings enhancements to Einstein capabilities and prepares the foundation for Agentforce.',
        categories: [
            {
                id: 'einstein',
                name: 'Einstein AI',
                icon: '⚡',
                features: [
                    {
                        id: 'ein-sp1',
                        title: 'Einstein for Service Enhancements',
                        status: 'GA',
                        description: 'Improved AI recommendations for service agents.',
                        details: {
                            overview: 'Enhanced Einstein capabilities for service teams including better case classification and next best actions.',
                            capabilities: [
                                'Improved case classification',
                                'Enhanced article recommendations',
                                'Automated response suggestions',
                                'Priority scoring',
                                'Workload predictions',
                                'Agent productivity insights'
                            ],
                            useCases: [
                                'Case management',
                                'Knowledge recommendations',
                                'Agent assistance',
                                'Service optimization'
                            ],
                            availability: 'Available in Service Cloud Enterprise and Unlimited',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.einstein_service.htm'
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
        releaseDate: 'October 2024',
        mainUrl: 'https://help.salesforce.com/s/articleView?id=release-notes.rn_einstein.htm&release=252&type=5',
        summary: 'Winter \'25 focuses on Einstein AI improvements and preparations for next-generation AI capabilities.',
        categories: [
            {
                id: 'einstein',
                name: 'Einstein AI',
                icon: '⚡',
                features: [
                    {
                        id: 'ein-w1',
                        title: 'Einstein GPT Integration',
                        status: 'Pilot',
                        description: 'Integration of generative AI capabilities into Einstein.',
                        details: {
                            overview: 'Early access to generative AI features powered by large language models.',
                            capabilities: [
                                'Natural language generation',
                                'Content creation assistance',
                                'Email drafting',
                                'Summary generation',
                                'Custom prompts',
                                'Data grounding'
                            ],
                            useCases: [
                                'Email automation',
                                'Content creation',
                                'Report generation',
                                'Customer communications'
                            ],
                            availability: 'Pilot program only',
                            documentation: 'https://help.salesforce.com/s/articleView?id=sf.einstein_gpt.htm'
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

