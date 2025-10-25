# Assignment Management System - Frontend

A modern React-based frontend application for managing assignments between teachers and students. Built with React, Vite, Material-UI, and Tailwind CSS.

## Features

- **Teacher Dashboard**: Create, view, and manage assignments
- **Student Dashboard**: View assignments and submit solutions
- **Authentication System**: Secure login for teachers and students
- **Real-time Updates**: Context API for state management
- **Modern UI**: Material-UI components with Tailwind CSS styling
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **React 19.1.1** - Frontend framework
- **Vite 7.1.7** - Build tool and development server
- **Material-UI 7.3.4** - UI component library
- **Tailwind CSS 4.1.16** - Utility-first CSS framework
- **Context API** - State management
- **ESLint** - Code linting

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 16.0 or higher)
- **npm** or **yarn** package manager
- **Git** (for version control)

## Steps to Set Up and Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/rohit95037-cmyk/frontend-repo.git
cd frontend-repo
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The application will start on `http://localhost:5173` (or the next available port).

### 4. Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### 5. Preview Production Build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Dashboard.jsx    # Main dashboard component
│   ├── Login.jsx        # Authentication component
│   ├── student/         # Student-specific components
│   │   ├── StudentDashboard.jsx
│   │   ├── SubmissionForm.jsx
│   │   └── ViewSubmission.jsx
│   └── teacher/         # Teacher-specific components
│       ├── AssignmentForm.jsx
│       ├── AssignmentList.jsx
│       ├── SubmissionsViewer.jsx
│       └── TeacherDashboard.jsx
├── context/             # React Context for state management
│   ├── AssignmentContext.jsx
│   └── AuthContext.jsx
├── App.jsx              # Main application component
├── App.css              # Global styles
├── index.css            # Base styles
└── main.jsx             # Application entry point
```

## Key Components

### Authentication Context (`AuthContext.jsx`)
- Manages user authentication state
- Handles login/logout functionality
- Provides user role (teacher/student) information

### Assignment Context (`AssignmentContext.jsx`)
- Manages assignment data across components
- Handles CRUD operations for assignments
- Provides submission management

### Teacher Components
- **AssignmentForm**: Create and edit assignments
- **AssignmentList**: View all created assignments
- **SubmissionsViewer**: Review student submissions
- **TeacherDashboard**: Main teacher interface

### Student Components
- **StudentDashboard**: Main student interface
- **SubmissionForm**: Submit assignment solutions
- **ViewSubmission**: View submitted assignments

## Additional Notes and Assumptions

### Backend Integration
- This frontend expects a backend API running on `http://localhost:3000`
- API endpoints should follow RESTful conventions
- Authentication should use JWT tokens
- CORS should be enabled for frontend-backend communication

### User Roles
- **Teachers**: Can create assignments, view submissions, and manage content
- **Students**: Can view assignments, submit solutions, and track their progress

### Data Flow
- User authentication is handled through context
- Assignment data is managed centrally through AssignmentContext
- Real-time updates are simulated through context state changes

### Styling Approach
- Material-UI provides the component library
- Tailwind CSS handles utility styling and responsive design
- Custom CSS is used for specific component styling

### Development Assumptions
- Modern browsers with ES6+ support
- Local development environment
- Backend API is available and properly configured
- Environment variables for API endpoints (if needed)

## Environment Variables

Create a `.env` file in the root directory if you need to configure:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=Assignment Management System
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is part of an assignment management system. Please refer to your institution's guidelines for usage and distribution.

## Contact

For questions or support, please contact the development team or create an issue in the repository.

---

**Note**: This frontend application is designed to work with a corresponding backend API. Make sure the backend is running and properly configured before using the full functionality of this application.