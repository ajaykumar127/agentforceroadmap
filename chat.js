// Chat functionality for Agentforce Roadmap RAG system

class ChatWidget {
    constructor() {
        this.sessionId = this.getOrCreateSessionId();
        this.messages = [];
        this.isOpen = false;
        this.init();
    }

    getOrCreateSessionId() {
        let sessionId = localStorage.getItem('chat_session_id');
        if (!sessionId) {
            sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem('chat_session_id', sessionId);
        }
        return sessionId;
    }

    init() {
        this.createChatWidget();
        this.attachEventListeners();
        this.loadChatHistory();
    }

    createChatWidget() {
        const chatHTML = `
            <div class="chat-widget" id="chatWidget">
                <button class="chat-toggle" id="chatToggle">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span class="chat-badge" id="chatBadge" style="display: none;">1</span>
                </button>
                
                <div class="chat-window" id="chatWindow">
                    <div class="chat-header">
                        <div class="chat-header-content">
                            <div class="chat-avatar">🤖</div>
                            <div class="chat-header-text">
                                <h3>Agentforce Assistant</h3>
                                <p>Ask me about the roadmap</p>
                            </div>
                        </div>
                        <button class="chat-close" id="chatClose">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    
                    <div class="chat-messages" id="chatMessages">
                        <div class="chat-welcome">
                            <div class="welcome-icon">👋</div>
                            <h4>Welcome to Agentforce Roadmap Chat!</h4>
                            <p>I can help you with:</p>
                            <ul>
                                <li>Finding features and their timelines</li>
                                <li>Understanding release notes</li>
                                <li>Locating product owners and PRDs</li>
                                <li>Checking feature status</li>
                            </ul>
                            <p class="welcome-prompt">Try asking: "What features are coming in Q1 2025?"</p>
                        </div>
                    </div>
                    
                    <div class="chat-input-container">
                        <div class="chat-suggestions" id="chatSuggestions">
                            <button class="suggestion-chip" data-question="What features are coming in Q1 2025?">
                                Q1 2025 features
                            </button>
                            <button class="suggestion-chip" data-question="Tell me about Slack integration">
                                Slack integration
                            </button>
                            <button class="suggestion-chip" data-question="What's new in Winter '26?">
                                Winter '26 updates
                            </button>
                        </div>
                        <div class="chat-input-wrapper">
                            <textarea 
                                class="chat-input" 
                                id="chatInput" 
                                placeholder="Ask about the roadmap..."
                                rows="1"
                            ></textarea>
                            <button class="chat-send" id="chatSend" disabled>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }

    attachEventListeners() {
        const chatToggle = document.getElementById('chatToggle');
        const chatClose = document.getElementById('chatClose');
        const chatInput = document.getElementById('chatInput');
        const chatSend = document.getElementById('chatSend');
        const chatSuggestions = document.getElementById('chatSuggestions');

        chatToggle.addEventListener('click', () => this.toggleChat());
        chatClose.addEventListener('click', () => this.toggleChat());
        
        chatInput.addEventListener('input', (e) => {
            chatSend.disabled = !e.target.value.trim();
            this.autoResizeTextarea(e.target);
        });
        
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (chatInput.value.trim()) {
                    this.sendMessage();
                }
            }
        });
        
        chatSend.addEventListener('click', () => this.sendMessage());
        
        // Suggestion chips
        chatSuggestions.addEventListener('click', (e) => {
            if (e.target.classList.contains('suggestion-chip')) {
                const question = e.target.dataset.question;
                chatInput.value = question;
                chatSend.disabled = false;
                this.sendMessage();
            }
        });
    }

    autoResizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const chatWindow = document.getElementById('chatWindow');
        const chatToggle = document.getElementById('chatToggle');
        const chatBadge = document.getElementById('chatBadge');
        
        if (this.isOpen) {
            chatWindow.classList.add('open');
            chatToggle.classList.add('open');
            chatBadge.style.display = 'none';
            document.getElementById('chatInput').focus();
        } else {
            chatWindow.classList.remove('open');
            chatToggle.classList.remove('open');
        }
    }

    async loadChatHistory() {
        try {
            const response = await fetch(`/api/chat/history/${this.sessionId}?limit=10`);
            const data = await response.json();
            
            if (data.history && data.history.length > 0) {
                data.history.forEach(msg => {
                    this.addMessage(msg.user_message, 'user', false);
                    this.addMessage(msg.assistant_message, 'assistant', false);
                });
            }
        } catch (error) {
            console.error('Error loading chat history:', error);
        }
    }

    async sendMessage() {
        const chatInput = document.getElementById('chatInput');
        const message = chatInput.value.trim();
        
        if (!message) return;
        
        // Clear input and hide suggestions
        chatInput.value = '';
        chatInput.style.height = 'auto';
        document.getElementById('chatSend').disabled = true;
        document.getElementById('chatSuggestions').style.display = 'none';
        
        // Add user message
        this.addMessage(message, 'user');
        
        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message,
                    sessionId: this.sessionId
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to get response');
            }
            
            const data = await response.json();
            
            // Remove typing indicator
            this.removeTypingIndicator();
            
            // Add assistant message
            this.addMessage(data.answer, 'assistant', true, data.context);
            
        } catch (error) {
            console.error('Error sending message:', error);
            this.removeTypingIndicator();
            this.addMessage('Sorry, I encountered an error. Please try again.', 'assistant', true);
        }
    }

    addMessage(text, sender, animate = true, context = null) {
        const messagesContainer = document.getElementById('chatMessages');
        
        // Remove welcome message if it exists
        const welcome = messagesContainer.querySelector('.chat-welcome');
        if (welcome) {
            welcome.remove();
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        if (animate) messageDiv.classList.add('fade-in');
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'user' ? '👤' : '🤖';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        // Convert markdown-style formatting to HTML
        let formattedText = text
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
        
        content.innerHTML = formattedText;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        // Add sources if available
        if (context && context.length > 0) {
            const sourcesDiv = document.createElement('div');
            sourcesDiv.className = 'message-sources';
            sourcesDiv.innerHTML = `
                <div class="sources-header">📚 Sources (${context.length}):</div>
                <div class="sources-list">
                    ${context.slice(0, 3).map((item, idx) => `
                        <div class="source-item">
                            <span class="source-number">${idx + 1}</span>
                            <span class="source-title">${item.title}</span>
                            <span class="source-similarity">${(item.similarity * 100).toFixed(0)}%</span>
                        </div>
                    `).join('')}
                </div>
            `;
            content.appendChild(sourcesDiv);
        }
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        this.messages.push({ text, sender, timestamp: new Date() });
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message assistant typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }
}

// Initialize chat widget when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if database is configured
    if (window.location.hostname !== 'localhost' || confirm('Chat requires database setup. Have you configured PostgreSQL and run npm run setup-db?')) {
        window.chatWidget = new ChatWidget();
    }
});

