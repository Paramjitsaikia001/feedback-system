# Feedback System for Learning via Augmented Reality and Gamified Learning

A full-stack MERN application that enables students to provide feedback on teachers while accessing AR and gamified learning modules.

## Features

### Authentication
- JWT-based authentication
- Role-based access (Student/Teacher)
- Secure password hashing with bcrypt

### Student Features
- Access to AR/Gamified learning modules
- Submit feedback for teachers (Behavior, Delivery, Engagement + Comments)
- Interactive dashboard with progress tracking
- Gamification elements (badges, achievements, progress bars)

### Teacher Features
- View average feedback ratings
- Read individual feedback comments
- Dashboard with analytics and statistics
- Real-time feedback updates

### Technical Features
- RESTful API design
- MongoDB database with Mongoose ODM
- Responsive design with Tailwind CSS
- Protected routes and middleware
- Error handling and validation

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - Frontend framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Context API** - State management

## Project Structure

\`\`\`
feedback-system-mern/
├── server/                 # Backend application
│   ├── models/            # MongoDB models
│   │   ├── User.js        # User model (students/teachers)
│   │   └── Feedback.js    # Feedback model
│   ├── routes/            # API routes
│   │   ├── auth.js        # Authentication routes
│   │   └── feedback.js    # Feedback routes
│   ├── middleware/        # Custom middleware
│   │   └── auth.js        # JWT authentication middleware
│   ├── .env               # Environment variables
│   ├── server.js          # Main server file
│   └── package.json       # Backend dependencies
├── client/                # Frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── StudentDashboard.js
│   │   │   ├── TeacherDashboard.js
│   │   │   ├── FeedbackForm.js
│   │   │   └── ARModule.js
│   │   ├── context/       # React Context
│   │   │   └── AuthContext.js
│   │   └── App.js         # Main App component
│   ├── public/
│   │   └── index.html
│   └── package.json       # Frontend dependencies
└── package.json           # Root package.json for scripts
\`\`\`

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### 1. Clone the Repository
\`\`\`bash
git clone <repository-url>
cd feedback-system-mern
\`\`\`

### 2. Install Dependencies
\`\`\`bash
# Install root dependencies
npm install

# Install server dependencies
npm run install-server

# Install client dependencies
npm run install-client
\`\`\`

### 3. Environment Setup
Create a \`.env\` file in the \`server\` directory:

\`\`\`env
MONGODB_URI=mongodb://localhost:27017/feedback-system
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
\`\`\`

### 4. Database Setup
Make sure MongoDB is running on your system:

**For local MongoDB:**
\`\`\`bash
# Start MongoDB service
mongod
\`\`\`

**For MongoDB Atlas:**
- Create a cluster on MongoDB Atlas
- Get your connection string
- Replace the MONGODB_URI in .env file

### 5. Run the Application

**Development Mode (runs both server and client):**
\`\`\`bash
npm run dev
\`\`\`

**Run Server Only:**
\`\`\`bash
npm run server
\`\`\`

**Run Client Only:**
\`\`\`bash
npm run client
\`\`\`

### 6. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health Check: http://localhost:5000/api/health

## API Endpoints

### Authentication
- \`POST /api/auth/register\` - Register new user
- \`POST /api/auth/login\` - User login
- \`GET /api/auth/me\` - Get current user (protected)

### Feedback
- \`POST /api/feedback/submit\` - Submit feedback (students only)
- \`GET /api/feedback/teacher/:teacherId\` - Get teacher feedback (teachers only)
- \`GET /api/feedback/teachers\` - Get all teachers list

## Database Schema

### User Model
\`\`\`javascript
{
  username: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['student', 'teacher']),
  timestamps: true
}
\`\`\`

### Feedback Model
\`\`\`javascript
{
  studentId: ObjectId (ref: User),
  teacherId: ObjectId (ref: User),
  behavior: Number (1-5),
  delivery: Number (1-5),
  engagement: Number (1-5),
  comment: String (optional, max 500 chars),
  timestamps: true
}
\`\`\`

## Usage Guide

### For Students
1. Register with role "student"
2. Login to access student dashboard
3. Access AR/Gamified learning modules
4. Submit feedback for teachers using the feedback form
5. Track learning progress and achievements

### For Teachers
1. Register with role "teacher"
2. Login to access teacher dashboard
3. View average ratings for behavior, delivery, and engagement
4. Read individual feedback comments
5. Monitor feedback trends over time

## Features in Detail

### AR/Gamified Learning
- Interactive AR content placeholders
- Progress tracking with XP system
- Achievement badges and rewards
- Multiple learning modules (Physics, Chemistry, Biology)
- Quiz integration for knowledge assessment

### Feedback System
- 5-point rating scale for three categories
- Optional comment section
- Real-time feedback aggregation
- Anonymous feedback submission
- Teacher-specific feedback viewing

### Security Features
- JWT token-based authentication
- Password hashing with bcrypt
- Protected API routes
- Role-based access control
- Input validation and sanitization

## Customization

### Adding New Learning Modules
Edit \`client/src/components/ARModule.js\` and add new modules to the \`modules\` object:

\`\`\`javascript
const modules = {
  // existing modules...
  newModule: {
    title: 'New Module Title',
    description: 'Module description',
    videoUrl: 'video-url',
    topics: ['Topic 1', 'Topic 2']
  }
};
\`\`\`

### Modifying Feedback Categories
Update the feedback form and model to include additional rating categories by modifying:
- \`server/models/Feedback.js\`
- \`client/src/components/FeedbackForm.js\`
- \`client/src/components/TeacherDashboard.js\`

## Troubleshooting

### Common Issues

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check the MONGODB_URI in .env file
- Verify network connectivity for MongoDB Atlas

**Port Already in Use:**
- Change the PORT in server/.env file
- Kill existing processes using the port

**CORS Issues:**
- Verify the proxy setting in client/package.json
- Check CORS configuration in server.js

**Authentication Issues:**
- Clear browser localStorage
- Check JWT_SECRET in .env file
- Verify token expiration settings

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please create an issue in the repository or contact the development team.
