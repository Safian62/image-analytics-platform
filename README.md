# Image Analytics Platform

A comprehensive full-stack web application for uploading, managing, and analyzing images. Built with the MERN stack (MongoDB, Express.js, React, Node.js), this platform provides secure user authentication, cloud-based image storage, and powerful analytics features to help users organize and gain insights from their image collections.

## 🚀 Features

### User Management
- **Secure Authentication**: JWT-based authentication with HTTP-only cookies for enhanced security
- **User Registration & Login**: Simple and secure user onboarding process
- **Protected Routes**: Client-side and server-side route protection

### Image Management
- **Cloud Storage**: Seamless image uploads to Cloudinary with automatic optimization
- **Labeling System**: Assign custom labels to images for better organization
- **Grid View**: Responsive image gallery with lazy loading for performance
- **Pagination**: Efficient browsing through large image collections

### Analytics & Insights
- **Dashboard Overview**: Real-time statistics including total image count
- **Label Analytics**: Visual breakdown of images by labels with interactive bar charts
- **Daily Upload Trends**: Line chart showing upload patterns over time
- **Date Filtering**: Filter images by custom date ranges
- **Grouping & Statistics**: Advanced aggregation for data analysis

### Technical Features
- **TypeScript**: Full type safety across frontend and backend
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Error Handling**: Comprehensive error management with user-friendly notifications
- **Loading States**: Skeleton loaders and progress indicators for better UX

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **TypeScript** - Type-safe JavaScript
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Cloudinary** - Cloud image storage and optimization
- **Multer** - File upload handling

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **React Hot Toast** - Notification system

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Git**

You'll also need accounts for:
- **Cloudinary** (for image storage)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd image-analytics-platform
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Environment Variables
Create a `.env` file in the backend directory with the following variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/image-analytics
JWT_SECRET=your-super-secret-jwt-key-here
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

#### Start the Backend Server
```bash
npm run dev
```

The backend server will start on `http://localhost:5000`

### 3. Frontend Setup

#### Install Dependencies
```bash
cd ../frontend
npm install
```

#### Environment Variables
Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

#### Start the Frontend Development Server
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 📖 Usage

### Getting Started
1. Open your browser and navigate to `http://localhost:5173`
2. Register a new account or login with existing credentials
3. Start uploading images with labels
4. Explore the dashboard for analytics and insights

### Key Workflows

#### Uploading Images
- Click the upload area or drag and drop images
- Add descriptive labels for better organization
- Images are automatically optimized and stored in the cloud

#### Viewing Analytics
- **Total Images**: See your complete collection count
- **Label Distribution**: Understand how your images are categorized
- **Daily Trends**: Track your upload activity over time
- **Date Filtering**: Focus on images from specific periods

#### Managing Images
- Browse images in a responsive grid layout
- Use pagination for large collections
- Lazy loading ensures smooth performance

## 🔌 API Endpoints

### Authentication
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - User login
- `POST /api/user/logout` - User logout
- `GET /api/user/me` - Get current user info

### Image Management
- `POST /api/image/upload` - Upload new image (authenticated)
- `GET /api/image/all` - Get paginated images (authenticated)
- `GET /api/image/total` - Get total image count (authenticated)

### Analytics
- `GET /api/image/group-by-label` - Get label distribution (authenticated)
- `GET /api/image/filter?startDate=&endDate=` - Filter images by date range (authenticated)

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm run test
```

## 📁 Project Structure

```
image-analytics-platform/
├── backend/
│   ├── config/          # Database and Cloudinary configuration
│   ├── controllers/     # Route handlers
│   ├── middleware/      # Authentication and error handling
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── index.ts         # Server entry point
│   └── package.json
├── frontend/
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── pages/       # Page components
│   │   ├── providers/   # Context providers
│   │   ├── types/       # TypeScript definitions
│   │   ├── utils/       # Helper functions
│   │   └── main.tsx     # App entry point
│   └── package.json
└── README.md
```

## 🔒 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Authentication**: Stateless authentication with HTTP-only cookies
- **Input Validation**: Server-side validation for all user inputs
- **CORS Protection**: Configured origins for API access
- **File Upload Security**: Type and size validation for image uploads

## 🚀 Deployment

### Backend Deployment
1. Build the TypeScript code: `npm run build`
2. Set production environment variables
3. Use a process manager like PM2: `pm2 start dist/index.js`

### Frontend Deployment
1. Build for production: `npm run build`
2. Serve the `dist` folder with any static server (nginx, Apache, Vercel, etc.)

### Environment Considerations
- Set `NODE_ENV=production`
- Use HTTPS in production
- Configure MongoDB Atlas for database
- Set `secure: true` for cookies in HTTPS environments

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [MongoDB](https://www.mongodb.com/) for the database
- [Cloudinary](https://cloudinary.com/) for image storage and optimization
- [React](https://reactjs.org/) for the frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for styling

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub or contact the development team.

---

Built with ❤️ using the MERN stack
