# Suomi Life 🇫🇮

**An Interactive Financial Education Game for Finnish Teens**

*Built for Junction 2025 Hackathon*

---

## 📖 Overview

**Suomi Life** is an edutainment finance teaching game designed for Finnish teens aged 12-18. The game combines BitLife's choice-based gameplay with SimCity's visual interactivity, following a character named "Helka" as she navigates financial decisions from age 18 to 23.

Players explore an interactive 2D city map with 6 unique locations, clicking buildings to access real-world financial scenarios that teach practical finance concepts using euros and Finnish economy resources like **vero.fi** and **Kela**.

### 🎯 Purpose

Address decreased youth financial literacy in Finland by making financial education:
- **Interactive** - Learn by making choices and seeing consequences
- **Relevant** - Uses Finnish economy, euros, and local resources
- **Accessible** - Text-to-speech support for all content
- **Engaging** - Game-based learning with visual feedback

---

## ✨ Key Features

### 🗺️ Interactive City Map
- **6 Unique Locations**: Bank, School, Shopping Mall, Apartment, Office, and Entertainment Center
- **Click-to-Explore**: Select buildings to access financial scenarios
- **Visual Feedback**: Animated character movement and location highlighting

### 📊 Character Stats System
- **9 Tracked Statistics**: Cash, Happiness, Entertainment, Anxiety, Safety, Job, Salary, Debt, and Savings
- **Real-Time Updates**: See stat changes after each decision
- **Visual Indicators**: Progress bars and trend arrows (↑↓)
- **Historical Tracking**: Graph showing financial progression over time

### 🎓 Educational Scenarios (6 Complete Storylines)
1. **Banking & Savings** - Opening your first bank account
2. **Credit & Debt** - Understanding credit cards and responsible borrowing
3. **Taxes** - Learning about Finnish tax system (vero.fi)
4. **Investing** - Introduction to stocks and investment basics
5. **Student Benefits** - Navigating Kela and student support
6. **Budgeting** - Creating and managing a monthly budget

### 📚 Multi-Page Learning Flow
Each scenario includes:
- **Course Bubble** - Scenario title and topic introduction
- **Story Intro** - Contextual narrative setup
- **Lesson** - Micro and macro examples with real-world context
- **Importance** - Why this topic matters for teens
- **Task** - Interactive choice-based decision making
- **Results** - Immediate feedback with stat changes and learning resources

### ♿ Accessibility Features
- **Text-to-Speech** - Read-aloud functionality for all choices and results
- **Audio Controls** - Play/pause/stop for every text element
- **Visual Clarity** - High contrast UI with clear typography
- **Simple Navigation** - Intuitive button-based interactions

### 🎮 Gameplay Mechanics
- **Age Progression** - Start at age 18, progress to age 23
- **Financial Consequences** - Choices affect cash, debt, savings, and well-being
- **Character Customization** - Create your own avatar with name, gender, and appearance
- **Pre-Quiz Assessment** - Test initial financial knowledge
- **End Game Summary** - Review your financial journey with charts and insights

### 📱 Responsive Design
- **Mobile-Friendly** - Works on phones, tablets, and desktops
- **Touch Support** - Optimized for touch and click interactions
- **Flexible Layout** - Adapts to different screen sizes

---

## 🎥 Demo

**Live Demo**: [Your Custom Domain Here] or `your-project.vercel.app`

**Game Flow**:
1. Start Menu → Character Creation → Financial Knowledge Quiz
2. City Map Exploration → Select Location
3. Scenario Learning Flow (6 pages per scenario)
4. Results & Stat Updates
5. Continue Exploring or End Game
6. Final Summary with Historical Data

---

## 🛠️ Technology Stack

### Core Technologies
- **React** (v18+) - UI framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Build tool and dev server

### UI Components
- **shadcn/ui** - Accessible component library
- **Radix UI** - Headless UI primitives
- **Lucide React** - Icon library
- **Motion (Framer Motion)** - Animations

### Additional Libraries
- **Recharts** - Data visualization for stat charts
- **React Hook Form** - Form handling
- **React DnD** - Drag-and-drop interactions (shopping scenario)
- **Sonner** - Toast notifications
- **Web Speech API** - Text-to-speech functionality

### Development Tools
- **Figma Make AI** - AI-powered prototyping tool
- **Unsplash** - Stock imagery

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/junction-edu-hub.git
   cd junction-edu-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

---

## 🌐 Deployment

### Vercel (Recommended - FREE)

**Quick Deploy**:
1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Click "Deploy"

**Custom Domain Setup**:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. SSL certificate auto-provisioned (free)

**Cost**: $0/month on Vercel Free Tier

### Alternative Hosting (All Free)
- **Netlify** - [netlify.com](https://netlify.com)
- **GitHub Pages** - [pages.github.com](https://pages.github.com)
- **Cloudflare Pages** - [pages.cloudflare.com](https://pages.cloudflare.com)

See `DEPLOYMENT_VERIFICATION.md` for detailed deployment guide.

---

## 📁 Project Structure

```
junction-edu-hub/
├── App.tsx                          # Main application component
├── components/
│   ├── GameMap.tsx                  # Interactive city map
│   ├── CharacterStats.tsx           # Stats display panel
│   ├── InteractionModal.tsx         # 6-page scenario flow
│   ├── ResultModal.tsx              # Results with media player
│   ├── MediaPlayer.tsx              # Video/podcast educational content
│   ├── StartMenu.tsx                # Main menu
│   ├── PersonalInfoPage.tsx         # Character creation
│   ├── CharacterDesignPage.tsx      # Avatar customization
│   ├── QuizPage.tsx                 # Financial knowledge quiz
│   ├── GameOver.tsx                 # End game screen
│   ├── EndGame.tsx                  # Final summary
│   ├── EventModal.tsx               # Random events
│   ├── MenuModal.tsx                # In-game menu
│   ├── DragDropShopping.tsx         # Shopping scenario
│   ├── CreditsModal.tsx             # Credits and licenses
│   └── ui/                          # shadcn/ui components
├── data/
│   ├── scenarios.ts                 # 6 complete financial scenarios
│   └── testQuestions.ts             # Financial literacy quiz questions
├── styles/
│   └── globals.css                  # Global styles and Tailwind config
├── utils/
│   └── textToSpeech.ts              # Text-to-speech utility
├── guidelines/
│   └── Guidelines.md                # Development guidelines
├── LICENSE_SUMMARY.md               # Third-party licenses
├── DEPLOYMENT_VERIFICATION.md       # Deployment guide
└── README.md                        # This file
```

---

## 🎓 Educational Content

### Scenarios Covered

| Location | Topic | Learning Objectives |
|----------|-------|---------------------|
| 🏦 **Bank** | Savings Accounts | Understanding interest, savings strategies, emergency funds |
| 💳 **Bank** | Credit & Debt | Credit scores, responsible borrowing, debt management |
| 🏢 **Office** | Taxes | Finnish tax system, vero.fi portal, tax deductions |
| 📈 **Office** | Investing | Stocks, risk/reward, long-term investing |
| 🎓 **School** | Student Benefits | Kela support, student allowances, financial aid |
| 🛍️ **Mall** | Budgeting | Income tracking, expense categories, savings goals |

### Finnish Resources Referenced
- **vero.fi** - Finnish Tax Administration (tax information)
- **Kela** - Social Insurance Institution of Finland (student benefits)
- **Euro (€)** - All currency values in euros
- **Finnish Context** - Scenarios relevant to Finnish teens

---

## ♿ Accessibility

### Compliance
- **WCAG 2.1** - Aiming for AA compliance
- **Keyboard Navigation** - Full keyboard support
- **Screen Reader** - Compatible with screen readers
- **Text-to-Speech** - Built-in audio narration

### Features
- High contrast UI
- Readable font sizes (no custom font-size overrides)
- Clear button labels
- Audio controls for all text
- Visual and audio feedback

---

## 📜 License & Credits

### Project License
**MIT License** - Free to use, modify, and distribute

Copyright © 2025 Suomi Life Team

See `LICENSE` file for full text.

### Third-Party Licenses

All third-party libraries and assets are used under their respective open-source licenses:

| Component | License | Link |
|-----------|---------|------|
| React | MIT | [react.dev](https://react.dev) |
| TypeScript | Apache 2.0 | [typescriptlang.org](https://www.typescriptlang.org) |
| Tailwind CSS | MIT | [tailwindcss.com](https://tailwindcss.com) |
| shadcn/ui | MIT | [ui.shadcn.com](https://ui.shadcn.com) |
| Radix UI | MIT | [radix-ui.com](https://radix-ui.com) |
| Motion (Framer Motion) | MIT | [motion.dev](https://motion.dev) |
| Lucide React | ISC | [lucide.dev](https://lucide.dev) |
| Recharts | MIT | [recharts.org](https://recharts.org) |
| Sonner | MIT | [sonner.emilkowal.ski](https://sonner.emilkowal.ski) |
| React Hook Form | MIT | [react-hook-form.com](https://react-hook-form.com) |
| React DnD | MIT | [react-dnd.github.io](https://react-dnd.github.io/react-dnd) |
| Unsplash | Unsplash License | [unsplash.com/license](https://unsplash.com/license) |

**Full license details**: See `LICENSE_SUMMARY.md` and in-app Credits page

### Development Tools
- **Figma Make AI** - AI-powered prototyping tool by Figma

### Data Sources
- **vero.fi** - Public tax information
- **Kela** - Public social insurance information

---

## 🏆 Junction 2025 Hackathon

### Event Information
- **Hackathon**: Junction 2025
- **Location**: Helsinki, Finland
- **Date**: November 2025
- **Track**: Education / Fintech / Social Impact

### Challenge Addressed
**Youth Financial Literacy in Finland**

Recent studies show decreased financial literacy among Finnish youth. This game addresses this by:
- Making financial education engaging and interactive
- Using familiar game mechanics (BitLife, SimCity)
- Incorporating real Finnish resources and context
- Providing accessible learning for all literacy levels

### Innovation
- **Gamified Learning** - Complex finance concepts through simple choices
- **Localized Content** - Finnish-specific resources and currency
- **Accessibility-First** - Text-to-speech for decreased literacy support
- **No Backend** - Fully client-side for easy deployment and privacy

### Technical Highlights
- **100% Frontend** - Pure React/TypeScript application
- **Zero Cost** - Deployed free on Vercel
- **Rapid Development** - Built with Figma Make AI assistance
- **Production Ready** - Complete with 6 scenarios and full game flow

### Team (Update with your team info)
- **Developer**: [Your Name]
- **Designer**: [Team Member Name] (if applicable)
- **Content**: [Team Member Name] (if applicable)

---

## 🎯 Future Enhancements

### Potential Improvements
- [ ] Add more scenarios (housing, insurance, retirement)
- [ ] Multiplayer comparison mode
- [ ] Save progress with localStorage or Supabase
- [ ] Finnish language version (currently English UI)
- [ ] Teacher dashboard for classroom use
- [ ] Achievement/badge system
- [ ] Social sharing of results
- [ ] Mobile app version (React Native)

### Community Contributions
We welcome contributions! See `CONTRIBUTING.md` for guidelines. (Coming soon)

---

## 📞 Contact & Support

### Repository
**GitHub**: [https://github.com/YOUR_USERNAME/junction-edu-hub](https://github.com/YOUR_USERNAME/junction-edu-hub)

### Issues
Report bugs or request features: [GitHub Issues](https://github.com/YOUR_USERNAME/junction-edu-hub/issues)

### Hackathon Contact
- **Email**: [your.email@example.com]
- **LinkedIn**: [Your LinkedIn Profile]
- **Twitter/X**: [@yourhandle]

---

## 🙏 Acknowledgments

### Special Thanks
- **Junction 2025** - For hosting an incredible hackathon
- **Figma** - For the amazing Figma Make AI tool
- **Open Source Community** - For all the fantastic libraries
- **vero.fi & Kela** - For public educational resources
- **Finnish Educators** - Inspiration for financial literacy focus

### Inspiration
- **BitLife** - Choice-based life simulation gameplay
- **SimCity** - Visual city interaction mechanics
- **Finnish Education System** - World-class approach to learning

---

## 📊 Project Stats

- **Lines of Code**: ~5,000+
- **Components**: 20+ React components
- **Scenarios**: 6 complete financial storylines
- **Educational Pages**: 36 pages of content (6 pages × 6 scenarios)
- **Development Time**: Built during Junction 2025 hackathon
- **Team Size**: [Update with your team size]

---

## 🎮 Quick Start Guide

**For Judges/Reviewers**:

1. Visit the live demo at: [YOUR DOMAIN or VERCEL URL]
2. Click "Play Game" on start menu
3. Create your character (name, gender, appearance)
4. Complete the financial knowledge quiz
5. Explore the city map - click any building
6. Experience a 6-page learning scenario
7. See your stats update in real-time
8. Click "Credits" button to view all licenses
9. Complete all 6 scenarios to see end summary

**Average playtime**: 15-20 minutes for full experience

---

## 🔒 Privacy & Data

### No Data Collection
This application:
- ✅ Does NOT collect personal information
- ✅ Does NOT store user data on servers
- ✅ Does NOT use cookies or tracking
- ✅ Does NOT require authentication
- ✅ Does NOT send data to third parties

### Client-Side Only
- All game state stored in browser memory (React state)
- No backend database or API
- Game resets on page refresh
- Perfect for educational/demo purposes

**Safe for minors - No PII collected** 🔒

---

## 📸 Screenshots

*(Add screenshots after deployment)*

### Main Menu
![Start Menu](screenshots/start-menu.png)

### Character Creation
![Character Creator](screenshots/character-creation.png)

### City Map
![Game Map](screenshots/city-map.png)

### Scenario Flow
![Scenario Learning](screenshots/scenario.png)

### Stats Dashboard
![Character Stats](screenshots/stats.png)

---

## 🌟 Star This Repo!

If you found this project helpful or interesting, please give it a ⭐ on GitHub!

---

**Made with ❤️ in Finland for Junction 2025**

*Empowering Finnish teens with financial literacy through gamified learning*

---

**Last Updated**: November 2025  
**Version**: 1.0.0  
**Status**: ✅ Hackathon Ready
