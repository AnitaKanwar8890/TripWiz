TRIPWHIZ
Smart Travel Planning Web Application

Author: Anita

PROJECT OVERVIEW

TripWhiz is a full-stack travel planning web application designed to help users organize trips efficiently. The application allows users to create and manage travel plans, store destination locations using latitude and longitude, and visualize trips on an interactive map. The project focuses on real-world usability, clean backend architecture, and secure user authentication.

KEY FEATURES

• User authentication using JSON Web Tokens (JWT)
• Create, update, and delete travel plans (CRUD operations)
• Interactive map integration for storing trip locations
• Latitude and longitude handling using Leaflet and OpenStreetMap
• Fast and lightweight backend with Express.js
• Local database implementation using SQLite
• Secure environment variable management
• Modular and scalable backend structure

TECHNOLOGIES USED

Frontend Technologies
• React.js
• JavaScript (ES6)
• HTML5
• CSS3
• Leaflet
• OpenStreetMap

Backend Technologies
• Node.js (LTS version recommended)
• Express.js
• SQLite (better-sqlite3)
• JSON Web Tokens (JWT)
• Nodemon

PROJECT STRUCTURE

tripwhiz_project
│
├── frontend
│ └── React frontend code
│
├── backend
│ ├── server.js (Main server entry point)
│ ├── db.js (Database configuration)
│ ├── routes (API routes)
│ ├── .env.example (Environment variable template)
│ └── package.json
│
└── README / Documentation

SYSTEM REQUIREMENTS (IMPORTANT)

Node.js version compatibility is critical for this project.

Supported Versions
• Node.js 18 LTS
• Node.js 20 LTS

Not Supported
• Node.js 25 (Current version)

The project uses a native dependency (better-sqlite3) which requires an LTS version of Node.js.

STEPS TO RUN THE BACKEND

Step 1: Navigate to backend folder
Open terminal or PowerShell and move to the backend directory.

Step 2: Create environment file
Copy the environment example file and create a .env file.
Add the JWT secret key inside the .env file.

Example:
JWT_SECRET=your_secret_key

Step 3: Install dependencies
Run npm install to install all required packages.

Step 4: Start the server
Run npm run dev to start the backend server.

Once started successfully, the server will listen on the configured port.

COMMON ISSUE AND SOLUTION

Issue
The backend may crash with a NODE_MODULE_VERSION mismatch error.

Cause
Using a non-LTS Node.js version (such as Node 25).

Solution
• Install Node.js 18 or 20 LTS
• Delete node_modules and package-lock.json
• Reinstall dependencies
• Restart the server

This is an environment configuration issue and not a code error.

PROJECT HIGHLIGHTS

• Real-world full-stack project suitable for interviews
• Demonstrates backend development best practices
• Secure authentication workflow
• Map-based data visualization
• Clean and maintainable code structure

CONCLUSION

TripWhiz is a practical and scalable travel planning application built using modern web technologies. The project demonstrates strong fundamentals in full-stack development, API design, authentication, and environment management. When run on the recommended Node.js LTS version, the application works smoothly and reliably.

Run backend:
cd backend
npm install
cp .env.example .env # set JWT_SECRET
npm run dev

Run frontend:
cd frontend
npm install
npm run dev

Notes:

- Backend serves uploads at /uploads
- Frontend uses Leaflet for maps and Tailwind for styling
