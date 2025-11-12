# Agentforce Roadmap

A modern, interactive web application for visualizing the Agentforce product roadmap with multiple views, dark theme support, and comprehensive release notes.

![Agentforce Roadmap](https://img.shields.io/badge/Version-3.1.0-blue)
![Node](https://img.shields.io/badge/Node-%3E%3D18.x-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🌟 Features

### Multiple Roadmap Versions
- **V1 - Core Roadmap**: Essential features and capabilities (17 items)
- **V2 - Extended Roadmap**: Comprehensive roadmap with all V1 items plus 23 additional advanced features (40 items total)
- **Customer Facing - Release Notes**: Official Salesforce release notes for Winter '26, Summer '25, Spring '25, and Winter '25

### Interactive Views
- **Timeline View**: Chronological visualization of roadmap items
- **Grid View**: Card-based layout for easy scanning
- **List View**: Compact list format with key details
- **Release Detail Pages**: Deep-dive into each release with expandable feature details

### Professional Theme System
- **Light Theme**: Clean, modern interface with Salesforce-inspired colors
- **Dark Theme**: Professional dark mode with blue-tinted cards
- **Theme Toggle**: Smooth slider switch (☀️ ⟷ 🌙) with localStorage persistence
- **Responsive Design**: Optimized for desktop, tablet, and mobile

### Advanced Features
- **Search & Filters**: Real-time search with category and status filters
- **Product Owners**: V2 items include PM names and PRD links
- **Expandable Details**: Rich feature descriptions with capabilities and use cases
- **Export Functionality**: Export roadmap data
- **Banner Image**: Professional Agentforce 360 branding

## 🚀 Quick Start

### Local Development

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/agentforce-roadmap.git
cd agentforce-roadmap

# Install dependencies
npm install

# Start the development server
npm start

# Or use Python's simple server
python3 -m http.server 8000
```

Visit `http://localhost:3000` (or `http://localhost:8000` for Python server)

### Deploy to Heroku

```bash
# Login to Heroku
heroku login

# Create Heroku app
heroku create your-app-name

# Deploy
git push heroku main

# Open your app
heroku open
```

See [HEROKU_DEPLOYMENT.md](HEROKU_DEPLOYMENT.md) for detailed deployment instructions.

## 📦 Project Structure

```
agentforce-roadmap/
├── index.html              # Main HTML file
├── styles.css              # Complete styling with light/dark themes
├── app.js                  # Application logic and interactivity
├── data.js                 # Roadmap data (V1 & V2)
├── release-details.js      # Customer-facing release notes data
├── server.js               # Express server for production
├── package.json            # Node.js dependencies
├── Procfile                # Heroku configuration
├── .gitignore              # Git ignore rules
└── docs/                   # Documentation
    ├── README.md
    ├── THEME_GUIDE.md
    ├── DARK_THEME_GUIDE.md
    ├── HEROKU_DEPLOYMENT.md
    └── STATUS_UPDATE_SUMMARY.md
```

## 🎨 Theme System

### Light Theme (Default)
- Clean white backgrounds
- Professional Salesforce blue (#0070d2)
- Subtle shadows and borders
- High contrast for readability

### Dark Theme
- Dark navy/black backgrounds (#0f1419)
- Bright blue accents (#1b96ff)
- Blue-tinted cards for customer releases
- Enhanced shadows for depth

**Toggle**: Click the ☀️/🌙 slider in the top-right header

## 📊 Data Structure

### V1 Roadmap (17 items)
- Q4 2024: Foundation features (Agent Builder, Service Agent, SDR)
- Q1 2025: Expansion (Marketing Agent, Analytics, Slack)
- Q2 2025: Intelligence (Multi-Agent, Voice, Custom Models)
- Q3 2025: Scale (Security, Teams, Personalization)
- Q4 2025+: Future innovations

### V2 Roadmap (40 items)
- All V1 items included
- 23 additional advanced features
- Product owner names for each V2 feature
- PRD links for deeper documentation

### Customer Facing
- Winter '26 Release (Current)
- Summer '25 Release
- Spring '25 Release
- Winter '25 Release

## 🛠️ Technologies

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Styling**: CSS Custom Properties (CSS Variables)
- **Deployment**: Heroku-ready
- **Version Control**: Git

## 🎯 Key Features

### Search & Filter
- Real-time search across all roadmap items
- Filter by category (Features, Enhancements, Integrations)
- Filter by status (Completed, In-Progress, Planned, Future)
- Filter by quarter/period

### Status Tracking
- ✅ **Completed**: Delivered features (Q4 2024 - Q2 2025)
- 🔄 **In-Progress**: Current development (Q3 2025)
- 📅 **Planned**: Upcoming features (Q4 2025)
- 🔮 **Future**: Long-term vision (2026+)

### V2 Exclusive
- Product Manager/Owner information
- Direct links to PRD documents
- Extended feature descriptions
- Advanced capabilities

## 📱 Responsive Design

Optimized for:
- 💻 Desktop (1400px+)
- 📱 Tablet (768px - 1400px)
- 📱 Mobile (< 768px)

## 🔒 Security

- HTTPS enabled (on Heroku)
- No sensitive data in code
- Environment variables supported
- .gitignore configured

## 📖 Documentation

- **[THEME_GUIDE.md](THEME_GUIDE.md)**: Complete design system documentation
- **[DARK_THEME_GUIDE.md](DARK_THEME_GUIDE.md)**: Dark theme implementation details
- **[HEROKU_DEPLOYMENT.md](HEROKU_DEPLOYMENT.md)**: Step-by-step deployment guide
- **[STATUS_UPDATE_SUMMARY.md](STATUS_UPDATE_SUMMARY.md)**: Roadmap status tracking

## 🤝 Contributing

This is an internal Salesforce project. For updates or corrections:

1. Update the data in `data.js` or `release-details.js`
2. Test locally
3. Commit changes
4. Deploy to Heroku

## 📝 License

MIT License - See LICENSE file for details

## 🎉 Credits

- **Design**: Salesforce-inspired professional theme
- **Data Sources**: 
  - [V1 Roadmap Slides](https://docs.google.com/presentation/d/1cq4ZopwHC553L7A1CqfPvxYRnFvpPbWbrOIzkn_zBm4/)
  - [V2 Roadmap Slides](https://docs.google.com/presentation/d/1GCa3jwpz-GCmBFWNO9_Mxu4LkiTxj8WbLmt18jvc8YI/)
  - [Salesforce Release Notes](https://help.salesforce.com/s/articleView?id=release-notes.rn_einstein.htm)

## 📞 Support

For questions or issues:
- Check the documentation in the `/docs` folder
- Review the inline code comments
- Consult the Google Slides sources

---

**Built with ❤️ for Agentforce**

Last Updated: November 12, 2025 | Version 3.1.0
