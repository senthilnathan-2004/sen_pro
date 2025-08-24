// AI Agent functionality for the portfolio
class AIAgent {
    constructor() {
        this.apiKey = CONFIG.API_KEY;
        this.isInitialized = false;
        this.conversationHistory = [];
        this.senthilData = this.initializeSenthilData();
        this.init();
    }

    // Initialize Senthil's data from the resume
    initializeSenthilData() {
        return {
            personalInfo: {
                name: "Senthilnathan R",
                email: "senthilragunathan2004@gmail.com",
                phone: "+91-6374160496",
                portfolio: "zeroday.fun",
                linkedin: "senthil-nathan-r-467980334",
                github: "github.com/senthilnathan-2004",
                location: "Chennai, India"
            },
            summary: "Ambitious Computer Science undergraduate seeking internship opportunities in Full Stack Development. Skilled in building and deploying interactive web applications using MERN stack and Python frameworks with a keen eye for problem solving and delivering high-quality user experiences.",
            skills: {
                languages: ["HTML5", "CSS3", "JavaScript (ES6+)", "Python", "Node.js", "SQL"],
                frameworks: ["React.js", "Express.js", "Bootstrap", "Redux"],
                databases: ["MongoDB", "MySQL"],
                tools: ["Git", "GitHub", "Postman", "VS Code"],
                softSkills: ["Analytical Thinking", "Team Collaboration", "Problem Solving", "Communication"]
            },
            education: [
                {
                    institution: "Anand Institute Of Higher Technology, Chennai",
                    degree: "Bachelor of Technology in Computer Science and Engineering",
                    duration: "2022–2026",
                    cgpa: "8.2/10"
                },
                {
                    institution: "Kuyilappalayam Higher Secondary School",
                    degree: "HSC",
                    duration: "2021–2022",
                    percentage: "82%"
                },
                {
                    institution: "Government Higher Secondary School",
                    degree: "SSLC",
                    duration: "2019–2020",
                    percentage: "70%"
                }
            ],
            projects: [
                {
                    name: "MERN Stack Meatshop Online Application",
                    duration: "Jul 2025 – Present",
                    github: "github.com/senthilnathan-2004/meatshop",
                    description: "Full-stack meat e-commerce website using MongoDB, Express.js, React.js, and Node.js (MERN stack)",
                    features: [
                        "User authentication, registration, and login using JSON Web Tokens (JWT) and hashed passwords",
                        "Dynamic product listing, filtering by categories (Mutton, Fish), and responsive search with real-time suggestions",
                        "Shopping cart with add/remove/update features, quantity management, and persistent cart via local storage",
                        "REST API architecture for all CRUD operations with secure backend validation"
                    ],
                    technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT"]
                },
                {
                    name: "MERN Stack Movie Review Application",
                    duration: "Mar 2024 – Jun 2024",
                    github: "github.com/senthilnathan-2004/movie2020",
                    description: "Full stack web app that displays detailed movie descriptions and user-submitted reviews",
                    features: [
                        "Built using REST API, Node.js, and Express.js",
                        "Interactive frontend using React for searching and viewing movie details and submitting reviews",
                        "Role-based moderation to manage abusive content and enhance review authenticity"
                    ],
                    technologies: ["React.js", "Node.js", "Express.js", "REST API", "MongoDB"]
                }
            ],
            certifications: [
                {
                    name: "Responsive Web Design Certification",
                    issuer: "freeCodeCamp"
                },
                {
                    name: "Machine Learning by Andrew Ng",
                    issuer: "Coursera"
                }
            ],
            careerGoals: "Seeking internship opportunities in Full Stack Development to apply my skills in real-world projects and contribute to innovative software solutions.",
            strengths: [
                "Strong foundation in MERN stack development",
                "Experience with both frontend and backend technologies",
                "Problem-solving mindset with analytical thinking",
                "Continuous learner with passion for new technologies",
                "Experience in building complete web applications from scratch"
            ]
        };
    }

    // Initialize the AI agent
    init() {
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.sendButton = document.getElementById('sendButton');
        this.chatStatus = document.getElementById('chatStatus');
        this.suggestionButtons = document.querySelectorAll('.suggestion-btn');

        this.bindEvents();
        this.updateStatus('Ready');
        this.isInitialized = true;
    }

    // Bind event listeners
    bindEvents() {
        // Send button click
        this.sendButton.addEventListener('click', () => this.sendMessage());
        
        // Enter key press
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Suggestion buttons
        this.suggestionButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const question = btn.getAttribute('data-question');
                this.chatInput.value = question;
                this.sendMessage();
            });
        });
    }

    // Send message to AI agent
    async sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;

        // Disable input while processing
        this.setInputState(false);
        this.updateStatus('Thinking...');

        // Add user message to chat
        this.addMessage(message, 'user');
        this.chatInput.value = '';

        try {
            // Get AI response
            const response = await this.getAIResponse(message);
            this.addMessage(response, 'bot');
        } catch (error) {
            console.error('AI Agent Error:', error);
            this.addMessage(
                "I apologize, but I'm having trouble connecting right now. However, I can still help you with information about Senthilnathan's background! You can also reach him directly at senthilragunathan2004@gmail.com or check out his portfolio at zeroday.fun.",
                'bot'
            );
        } finally {
            this.setInputState(true);
            this.updateStatus('Ready');
        }
    }

    // Get AI response using OpenAI API or fallback to local knowledge
    async getAIResponse(userMessage) {
        // Try to use OpenAI API first
        if (this.apiKey && this.apiKey !== 'your-openai-api-key') {
            try {
                return await this.getOpenAIResponse(userMessage);
            } catch (error) {
                console.log('OpenAI API error, falling back to local knowledge:', error);
            }
        }

        // Fallback to local knowledge base
        return this.getLocalResponse(userMessage);
    }

    // Get response from OpenAI API
    async getOpenAIResponse(userMessage) {
        const systemPrompt = this.createSystemPrompt();
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
                messages: [
                    { role: "system", content: systemPrompt },
                    ...this.conversationHistory.slice(-10), // Keep last 10 messages for context
                    { role: "user", content: userMessage }
                ],
                max_tokens: 500,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status}`);
        }

        const data = await response.json();
        const aiResponse = data.choices[0].message.content;

        // Add to conversation history
        this.conversationHistory.push(
            { role: "user", content: userMessage },
            { role: "assistant", content: aiResponse }
        );

        return aiResponse;
    }

    // Create system prompt for OpenAI
    createSystemPrompt() {
        return `You are Senthilnathan R's personal AI assistant on his portfolio website. You represent him professionally and help visitors learn about his skills, experience, and projects.

ABOUT SENTHILNATHAN:
${JSON.stringify(this.senthilData, null, 2)}

INSTRUCTIONS:
1. Respond as Senthilnathan's AI assistant, not as Senthilnathan himself
2. Be professional, friendly, and knowledgeable about his background
3. Provide specific details about his skills, projects, and experience when asked
4. If asked about full-stack development topics, provide helpful insights while relating them to Senthilnathan's expertise
5. Encourage visitors to contact Senthilnathan directly for opportunities: senthilragunathan2004@gmail.com
6. Keep responses concise but informative (under 400 words)
7. If you don't know something specific about Senthilnathan, say so and suggest contacting him directly
8. Highlight his strengths in MERN stack, Python, and problem-solving skills
9. Be enthusiastic about his projects and technical capabilities

Remember: You are representing a talented Computer Science student seeking internship opportunities in full-stack development.`;
    }

    // Local knowledge-based response (fallback)
    getLocalResponse(userMessage) {
        const message = userMessage.toLowerCase();
        const data = this.senthilData;

        // Skills-related questions
        if (message.includes('skill') || message.includes('technical') || message.includes('technology') || message.includes('tech')) {
            return `Senthilnathan has strong technical skills across the full stack! His expertise includes:

**Frontend:** ${data.skills.languages.filter(lang => ['HTML5', 'CSS3', 'JavaScript (ES6+)'].includes(lang)).join(', ')}, along with ${data.skills.frameworks.filter(fw => ['React.js', 'Bootstrap', 'Redux'].includes(fw)).join(', ')}

**Backend:** ${data.skills.languages.filter(lang => ['Node.js', 'Python'].includes(lang)).join(', ')} with ${data.skills.frameworks.filter(fw => ['Express.js'].includes(fw)).join(', ')}

**Databases:** ${data.skills.databases.join(', ')}

**Tools:** ${data.skills.tools.join(', ')}

He's particularly strong in the MERN stack and has hands-on experience building complete web applications. Would you like to know more about any specific technology or his projects?`;
        }

        // Project-related questions
        if (message.includes('project') || message.includes('work') || message.includes('build') || message.includes('develop')) {
            const projects = data.projects.map(project => 
                `**${project.name}** (${project.duration}): ${project.description}. Built with ${project.technologies.join(', ')}. Check it out at ${project.github}`
            ).join('\n\n');

            return `Senthilnathan has worked on some impressive full-stack projects:

${projects}

Both projects demonstrate his expertise in the MERN stack, REST APIs, user authentication, and creating complete user experiences. He's experienced in building everything from e-commerce platforms to content management systems!`;
        }

        // Education questions
        if (message.includes('education') || message.includes('study') || message.includes('university') || message.includes('college') || message.includes('degree')) {
            return `Senthilnathan is currently pursuing his **Bachelor of Technology in Computer Science and Engineering** at Anand Institute Of Higher Technology, Chennai (2022–2026) with an impressive CGPA of 8.2/10.

His educational background also includes:
- HSC from Kuyilappalayam Higher Secondary School (82%)
- SSLC from Government Higher Secondary School (70%)

He's also earned certifications in **Responsive Web Design** (freeCodeCamp) and completed **Andrew Ng's Machine Learning Course** (Coursera), showing his commitment to continuous learning!`;
        }

        // Contact questions
        if (message.includes('contact') || message.includes('reach') || message.includes('email') || message.includes('phone') || message.includes('hire')) {
            return `You can reach Senthilnathan through several channels:

📧 **Email:** ${data.personalInfo.email}
📱 **Phone:** ${data.personalInfo.phone}
🌐 **Portfolio:** ${data.personalInfo.portfolio}
💼 **LinkedIn:** linkedin.com/in/${data.personalInfo.linkedin}
🐙 **GitHub:** ${data.personalInfo.github}

He's actively seeking internship opportunities in full-stack development and would love to hear from you! Feel free to reach out to discuss potential opportunities or collaborations.`;
        }

        // MERN stack questions
        if (message.includes('mern') || message.includes('mongo') || message.includes('react') || message.includes('express') || message.includes('node')) {
            return `Senthilnathan is highly skilled in the MERN stack! He has hands-on experience with:

**MongoDB:** Database design and management for both projects
**Express.js:** Building robust REST APIs with secure authentication
**React.js:** Creating interactive, responsive user interfaces
**Node.js:** Server-side development and API integration

His MERN projects include a complete e-commerce application with user authentication, shopping cart functionality, and real-time search, plus a movie review platform with content moderation. He understands the full development lifecycle from database design to deployment!`;
        }

        // Full-stack development general questions
        if (message.includes('full') && message.includes('stack') || message.includes('fullstack') || message.includes('full-stack')) {
            return `Senthilnathan is passionate about full-stack development! He has experience across the entire web development spectrum:

**Frontend Development:** Creating responsive, interactive user interfaces with React.js, modern CSS, and JavaScript ES6+

**Backend Development:** Building scalable APIs with Node.js/Express.js and Python, implementing secure authentication with JWT

**Database Management:** Working with both SQL (MySQL) and NoSQL (MongoDB) databases

**DevOps & Tools:** Using Git/GitHub for version control, Postman for API testing, and various development tools

His strength lies in understanding how all pieces work together to create seamless user experiences. He's built complete applications from database design to user interface!`;
        }

        // Python questions
        if (message.includes('python')) {
            return `Senthilnathan has solid Python skills and has completed Andrew Ng's Machine Learning course on Coursera, which involved extensive Python programming. While his primary focus is on web development with the MERN stack, his Python knowledge gives him versatility in backend development and data analysis.

His Python experience complements his full-stack skills, making him adaptable to different technology stacks depending on project requirements!`;
        }

        // Experience/background questions
        if (message.includes('experience') || message.includes('background') || message.includes('about')) {
            return `Senthilnathan is an ambitious Computer Science undergraduate with strong practical experience in full-stack development. Here's what makes him stand out:

🎯 **Focus:** MERN stack development with 2+ years of hands-on experience
🏗️ **Project Experience:** Built complete web applications from scratch including e-commerce and content management systems
📚 **Academic Excellence:** 8.2/10 CGPA in Computer Science Engineering
🔧 **Technical Skills:** Proficient in modern web technologies, databases, and development tools
🧠 **Problem-Solving:** Strong analytical thinking and attention to delivering quality user experiences

He's actively seeking internship opportunities to apply his skills in real-world projects and contribute to innovative software solutions!`;
        }

        // Default response
        return `Hello! I'm Senthilnathan's AI assistant. I can help you learn about his technical skills, projects, education, and experience in full-stack development.

Some things you might want to ask about:
- His technical skills and expertise in MERN stack
- Details about his projects (e-commerce app, movie review platform)
- His educational background and certifications
- How to get in touch with him for opportunities
- His experience with full-stack development

What would you like to know about Senthilnathan? Feel free to ask me anything!`;
    }

    // Add message to chat interface
    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-${sender === 'user' ? 'user' : 'robot'}"></i>
            </div>
            <div class="message-content">
                <p>${this.formatMessage(content)}</p>
            </div>
        `;

        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    // Format message content (convert markdown-like formatting to HTML)
    formatMessage(content) {
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>')
            .replace(/📧|📱|🌐|💼|🐙|🎯|🏗️|📚|🔧|🧠/g, '<span class="emoji">$&</span>');
    }

    // Update chat status
    updateStatus(status) {
        const statusText = this.chatStatus.querySelector('.status-text');
        const statusIndicator = this.chatStatus.querySelector('.status-indicator');
        
        statusText.textContent = status;
        
        if (status === 'Thinking...') {
            statusIndicator.style.background = '#fd79a8';
        } else {
            statusIndicator.style.background = 'var(--primary-color)';
        }
    }

    // Set input state (enabled/disabled)
    setInputState(enabled) {
        this.chatInput.disabled = !enabled;
        this.sendButton.disabled = !enabled;
        
        if (enabled) {
            this.chatInput.focus();
        }
    }
}

// Initialize AI Agent when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure all elements are ready
    setTimeout(() => {
        const aiAgent = new AIAgent();
        
        // Make AI agent globally available for debugging
        window.aiAgent = aiAgent;
    }, 100);
});

// Handle API key from environment or user input
function initializeOpenAIKey() {
    const apiKey = localStorage.getItem('openai_api_key');
    if (apiKey) {
        return apiKey;
    }
    
    // If no API key is found, the AI agent will use local knowledge
    return null;
}

// Allow users to set their own API key (optional feature)
function setOpenAIKey(apiKey) {
    localStorage.setItem('openai_api_key', apiKey);
    if (window.aiAgent) {
        window.aiAgent.apiKey = apiKey;
    }
}

// Export functions for potential external use
window.setOpenAIKey = setOpenAIKey;
