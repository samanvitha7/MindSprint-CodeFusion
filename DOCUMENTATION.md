# 🌍 Green Vision - Complete Project Documentation

## 📋 Project Overview

**Green Vision** is an AI-powered MERN stack web application focused on waste classification and environmental sustainability. The platform helps users identify different types of waste through image recognition and provides proper disposal instructions to promote eco-friendly practices.

---

## 🎯 Project Information

- **Project Name**: Green Vision (Smart Waste Classifier)
- **Version**: 1.0.0
- **Type**: Full-Stack Web Application
- **Architecture**: MERN Stack (MongoDB, Express.js, React, Node.js)
- **Primary Goal**: Environmental sustainability through AI-powered waste classification

---

## 👥 Team Members

- **Samanvitha Bolisetty** – AI & Backend Development
- **Shreya Ashar** – Frontend Development
- **Naina Jain** – Database & Deployment
- **Nishchay Mittal** – Research & Content
- **Arshad Khatib** – UI/UX & Gamification
- **Neel Mhaske Arun** – Testing & Optimization

---

## 🚀 Core Features

### 🔍 AI Waste Scanner
- **Image Upload**: Users can upload or capture images of waste items
- **AI Classification**: Machine learning model identifies waste type
- **Confidence Score**: AI provides confidence percentage for classification
- **Disposal Instructions**: Specific guidance on proper waste disposal
- **Eco Facts**: Educational information about environmental impact

### 🗺️ Interactive Facility Map
- **Global Coverage**: 50+ waste management facilities across all 7 continents
- **Real-time Data**: Live facility information and locations
- **Filter Options**: Filter by facility type (recycling, waste disposal, hazardous)
- **Search Functionality**: Search facilities by name, country, or type
- **Interactive Markers**: Detailed popup information for each facility

### 📚 Educational Resources (Know More)
- **Interactive Waste Wheel**: Visual guide to different waste types
- **Detailed Information**: Comprehensive data for each waste category
- **Modal System**: Expandable detailed views with disposal instructions
- **Environmental Impact**: Information on sustainability and recycling benefits

### 🎓 Eco Hacks & Tips
- **Category-based Tips**: Practical recycling tips for 6 waste categories
- **Video Tutorials**: YouTube integration with educational content
- **Interactive Cards**: Expandable content with tips and videos
- **Sustainability Guide**: Why recycling matters section

### 💬 Chatbot Integration
- **Botpress Integration**: AI-powered customer support
- **24/7 Availability**: Always available for user queries
- **FAQ Support**: Instant answers to common recycling questions

### 📞 Contact & Communication
- **Contact Forms**: User feedback and inquiry system
- **About Us**: Team information and project mission
- **Newsletter Signup**: Email collection for updates and suggestions

---

## 🛠️ Technology Stack

### Frontend Technologies
- **React 19.1.1**: Modern UI library with hooks and functional components
- **React Router DOM 7.8.2**: Client-side routing and navigation
- **Vite 7.1.2**: Fast build tool and development server
- **Tailwind CSS 3.3.3**: Utility-first CSS framework
- **Framer Motion 12.23.12**: Advanced animations and transitions
- **Leaflet 1.9.4 + React Leaflet 5.0.0**: Interactive map implementation
- **Axios 1.11.0**: HTTP client for API communications
- **React Toastify 11.0.5**: Toast notifications
- **React Icons 5.5.0**: Icon library

### Backend Technologies
- **Node.js**: JavaScript runtime environment
- **Express.js 4.19.2**: Web application framework
- **MongoDB**: NoSQL database for data storage
- **Mongoose 7.8.7**: MongoDB object modeling
- **Multer 2.0.2**: File upload middleware
- **Sharp 0.34.3**: Image processing library
- **CORS 2.8.5**: Cross-origin resource sharing
- **Dotenv 16.3.1**: Environment variable management
- **Nodemon 3.0.1**: Development server auto-restart

### Development Tools
- **ESLint**: Code linting and style enforcement
- **PostCSS**: CSS processing and optimization
- **Autoprefixer**: CSS vendor prefix automation

---

## 🎨 Design System

### Color Palette
```css
navy: #012437    /* Primary dark color for headings and emphasis */
forest: #2a6250  /* Secondary green for buttons and accents */
mint: #97cead    /* Light accent color for highlights */
soft: #e5f3dd    /* Background and subtle elements */
```

### Typography
- **Primary Font**: Poppins (Global)
- **Weights Available**: 100-900 (Thin to Black)
- **Implementation**: Google Fonts with local fallbacks
- **Usage**: Applied globally to all text elements

### UI Components
- **Glass Morphism**: `bg-white/95 backdrop-blur-md`
- **Gradient Buttons**: `bg-gradient-to-r from-forest/80 to-mint/80`
- **Rounded Corners**: `rounded-2xl` for cards, `rounded-lg` for buttons
- **Shadow Effects**: `shadow-lg` with hover enhancements
- **Smooth Animations**: Framer Motion for all transitions

---

## 📁 Project Structure

```
Green Vision/
├── frontend/                    # React frontend application
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Header.jsx       # Navigation header
│   │   │   ├── Footer.jsx       # Site footer
│   │   │   ├── Map.jsx          # Interactive map component
│   │   │   ├── AboutUsComp.jsx  # About section
│   │   │   ├── ContactUs.jsx    # Contact forms
│   │   │   ├── WasteWheel.jsx   # Interactive waste wheel
│   │   │   ├── WasteModal.jsx   # Modal for waste details
│   │   │   └── Section1-5.jsx   # Homepage sections
│   │   ├── pages/               # Page components
│   │   │   ├── HomePage.jsx     # Landing page
│   │   │   ├── ScanObjectPage.jsx # AI waste scanner
│   │   │   ├── MapPage.jsx      # Facility map page
│   │   │   ├── KnowMore.jsx     # Educational content
│   │   │   ├── ecohacks.jsx     # Tips and tutorials
│   │   │   ├── About.jsx        # About page
│   │   │   └── PrivacyPolicy.jsx # Privacy policy
│   │   ├── data/                # Static data files
│   │   │   └── wasteData.js     # Waste categories data
│   │   ├── services/            # API integration
│   │   │   └── api.js           # HTTP client setup
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # App entry point
│   │   └── index.css            # Global styles
│   ├── package.json             # Dependencies and scripts
│   ├── tailwind.config.js       # Tailwind configuration
│   ├── vite.config.js           # Vite configuration
│   └── index.html               # HTML template
│
├── backend/                     # Node.js backend server
│   ├── src/
│   │   ├── models/              # Database models
│   │   │   ├── facilityModel.js # Waste facility schema
│   │   │   └── Contact.js       # Contact form schema
│   │   ├── routes/              # API routes
│   │   │   ├── facilityRoutes.js # Facility endpoints
│   │   │   ├── modelRoutes.js   # AI model endpoints
│   │   │   ├── rulesRoutes.js   # Waste rules endpoints
│   │   │   └── contactRoutes.js # Contact endpoints
│   │   ├── controllers/         # Route handlers
│   │   │   ├── rulesController.js
│   │   │   └── simpleContactController.js
│   │   ├── data/                # Static data
│   │   │   ├── rulesData.js     # Waste disposal rules
│   │   │   └── seed.js          # Database seeding
│   │   ├── scripts/             # Utility scripts
│   │   │   └── populate-facilities.js
│   │   └── server.js            # Express server setup
│   ├── uploads/                 # File upload directory
│   ├── package.json             # Dependencies and scripts
│   ├── .env                     # Environment variables
│   └── server.js                # Alternative server entry
│
├── README.md                    # Project overview
├── DOCUMENTATION.md             # This file
└── startup-instructions.md      # Development setup guide
```

---

## 🔧 Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (Local installation or MongoDB Atlas)
- **Git** for version control
- **Modern Web Browser** (Chrome, Firefox, Safari, Edge)

### Environment Setup

#### 1. Clone Repository
```bash
git clone https://github.com/your-username/green-vision.git
cd green-vision
```

#### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5050
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/green-vision
NODE_ENV=development
```

#### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

#### 4. Start Development Servers
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Production Build
```bash
# Frontend production build
cd frontend
npm run build

# Start production server
cd ../backend
npm start
```

---

## 🌐 API Documentation

### Base URL
- **Development**: `http://localhost:5050/api`
- **Production**: `https://your-domain.com/api`

### Endpoints

#### Facilities API
```javascript
GET /api/facilities
// Returns: Array of waste management facilities
// Features: Global facility data with filtering options

POST /api/facilities/add
// Body: Array of facility objects
// Returns: Created facilities
// Purpose: Bulk facility data insertion
```

#### AI Model API
```javascript
POST /api/model/predict
// Body: FormData with image file
// Returns: { category, confidence, instruction, fact }
// Purpose: Waste classification from uploaded images

GET /api/model/health
// Returns: Model service status
// Purpose: Health check for AI service

GET /api/model/categories
// Returns: Available waste categories
// Purpose: List all supported waste types
```

#### Rules API
```javascript
GET /api/rules
// Returns: Waste disposal rules and guidelines
// Purpose: Educational content for proper waste disposal

GET /api/rules/:id
// Returns: Specific rule details
// Purpose: Individual rule information
```

#### Contact API
```javascript
POST /api/contact
// Body: { name, email, message }
// Returns: Success confirmation
// Purpose: User feedback and inquiries
```

---

## 🎮 User Experience Flow

### 1. Homepage Journey
1. **Landing**: Users arrive at homepage with hero section
2. **Navigation**: Clear menu options for all features
3. **Sections**: Informative sections about sustainability
4. **Call-to-Action**: Multiple entry points to main features

### 2. Waste Scanning Flow
1. **Access**: Click "Scan Object" button in header
2. **Upload**: Choose image from device or use camera
3. **Preview**: See selected image with option to change
4. **Analysis**: Click "Analyze Waste" button
5. **Results**: View classification with confidence score
6. **Instructions**: Get specific disposal guidance
7. **Education**: Learn eco-facts about the waste type

### 3. Educational Journey
1. **Know More**: Interactive waste wheel with categories
2. **Selection**: Click on waste type for detailed information
3. **Modal View**: Comprehensive disposal and impact information
4. **Eco Hacks**: Category-specific tips and video tutorials
5. **Resources**: Additional sustainability information

### 4. Map Exploration
1. **Global View**: See worldwide facility distribution
2. **Filtering**: Filter by facility type and location
3. **Search**: Find specific facilities or regions
4. **Details**: Click markers for comprehensive facility information
5. **Statistics**: View facility counts and distribution data

---

## 🔒 Security Features

### Frontend Security
- **Input Validation**: Client-side form validation
- **XSS Prevention**: Sanitized user inputs
- **CORS Configuration**: Restricted cross-origin requests
- **File Upload Limits**: Size and type restrictions

### Backend Security
- **Environment Variables**: Sensitive data protection
- **CORS Middleware**: Controlled API access
- **Input Sanitization**: Server-side validation
- **Error Handling**: Secure error responses
- **File Upload Security**: Multer configuration with restrictions

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Mobile Optimizations
- **Touch-Friendly**: Large tap targets and spacing
- **Mobile Menu**: Collapsible navigation
- **Image Optimization**: Responsive image sizing
- **Performance**: Optimized for mobile networks

### Cross-Browser Support
- **Chrome**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support
- **Mobile Browsers**: iOS Safari, Chrome Mobile

---

## 🚀 Performance Optimizations

### Frontend Performance
- **Code Splitting**: React lazy loading
- **Image Optimization**: Sharp.js processing
- **Bundle Optimization**: Vite tree-shaking
- **Font Loading**: Google Fonts with preconnect
- **Caching**: Browser caching strategies

### Backend Performance
- **Database Indexing**: MongoDB optimized queries
- **Caching**: In-memory caching for frequent requests
- **Compression**: Response compression
- **Rate Limiting**: API abuse prevention

---

## 🧪 Testing Strategy

### Frontend Testing
- **Component Testing**: Individual component validation
- **Integration Testing**: Page flow testing
- **User Experience Testing**: Cross-device validation
- **Performance Testing**: Load time optimization

### Backend Testing
- **API Testing**: Endpoint functionality validation
- **Database Testing**: Data integrity verification
- **File Upload Testing**: Image processing validation
- **Error Handling Testing**: Edge case management

---

## 📦 Deployment Guide

### Frontend Deployment (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder to hosting service
```

### Backend Deployment (Railway/Render/DigitalOcean)
```bash
# Set environment variables
# Deploy with production start script
npm start
```

### Database Deployment
- **MongoDB Atlas**: Cloud database setup
- **Environment Configuration**: Production connection strings
- **Data Migration**: Seed data for facilities

---

## 🔄 Maintenance & Updates

### Regular Maintenance
- **Dependency Updates**: Monthly security updates
- **Performance Monitoring**: Regular performance audits
- **Content Updates**: Facility data and educational content
- **Bug Fixes**: User-reported issue resolution

### Feature Roadmap
- **Enhanced AI Models**: Improved classification accuracy
- **Mobile App**: React Native implementation
- **Gamification**: User rewards and badge system
- **Social Features**: Community sharing capabilities
- **Multi-language Support**: Internationalization

---

## 📊 Analytics & Monitoring

### User Analytics
- **Page Views**: Track popular sections
- **Feature Usage**: Monitor scan frequency
- **User Journey**: Analyze navigation patterns
- **Performance Metrics**: Load times and errors

### System Monitoring
- **API Response Times**: Backend performance tracking
- **Database Performance**: Query optimization monitoring
- **Error Logging**: Comprehensive error tracking
- **Uptime Monitoring**: Service availability tracking

---

## 🤝 Contributing Guidelines

### Development Workflow
1. **Fork Repository**: Create personal fork
2. **Feature Branch**: Create feature-specific branch
3. **Development**: Implement feature with tests
4. **Pull Request**: Submit for code review
5. **Code Review**: Team review and approval
6. **Merge**: Integration into main branch

### Code Standards
- **ESLint**: JavaScript linting rules
- **Prettier**: Code formatting standards
- **Component Structure**: Consistent React patterns
- **API Design**: RESTful endpoint conventions
- **Documentation**: Inline code documentation

---

## 📞 Support & Contact

### Technical Support
- **GitHub Issues**: Bug reports and feature requests
- **Documentation**: Comprehensive guides and API docs
- **Community**: Developer community support

### Project Contact
- **Email**: team@greenvision.com
- **GitHub**: https://github.com/your-org/green-vision
- **Website**: https://greenvision.com

---

## 📜 License

This project is licensed under the **MIT License** – feel free to use, modify, and distribute.

---

## 🙏 Acknowledgments

- **Open Source Libraries**: Thanks to all library maintainers
- **Environmental Organizations**: Inspiration for sustainability focus
- **Development Community**: Support and feedback
- **Educational Resources**: Waste management research and data

---

*Built for Hackathons • ♻️ Towards a Greener Future*

**Last Updated**: January 2025  
**Documentation Version**: 1.0.0
