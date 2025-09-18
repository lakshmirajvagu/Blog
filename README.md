📝 Blog Platform

A full-stack Blog Publishing Platform that allows users to sign up, log in, create, read, update, and delete blog posts.
The project focuses on web interface and backend API integration, with Firebase authentication for secure user access.

🚀 Features
✅ Core

Authentication

Sign up / Login using Firebase Authentication (Email/Password & Google OAuth)

Secure session handling with Firebase

Blog CRUD

Create, edit, delete own posts

View all posts (feed/home)

View individual blog post details

Author Profile

Basic profile page with user info

List of user’s own blog posts


🏗️ Tech Stack

Frontend (Web): React, Redux Toolkit, SCSS

Backend: Node.js, Express

Database: MongoDB (via Mongoose)

Authentication: Firebase Authentication (Email/Password + Google OAuth)

⚙️ Setup Instructions
1. Clone Repository
git clone https://github.com/lakshmirajvagu/Blog.git
cd blog-platform

2. Backend Setup
cd backend
npm install


Create .env file:

PORT=5000
MONGO_URI=your_mongo_connection_string


Run backend:

npm run dev

3. Web Frontend Setup
cd web
npm install
npm start


Configure Firebase:
Create a firebaseConfig.js file inside src/ with your Firebase project details:

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "your_api_key",
  authDomain: "your_project.firebaseapp.com",
  projectId: "your_project_id",
  storageBucket: "your_project.appspot.com",
  messagingSenderId: "your_sender_id",
  appId: "your_app_id",
};

export const app = initializeApp(firebaseConfig);

📖 API Endpoints (Sample)
Method	Endpoint	Description
GET	/posts	Fetch all posts
POST	/posts	Create a post
PUT	/posts/:id	Update own post
DELETE	/posts/:id	Delete own post
🎯 AI Usage

AI tools were leveraged mainly for boosting productivity:

Code Snippets & Boilerplate

Used ChatGPT to generate starter code for auth integration, Redux setup, and Express routes.

Debugging

Asked AI to help resolve React-Firebase authentication bugs and API error handling.

Styling Support

Used AI for SCSS suggestions and responsive layout fixes.

Prompting Techniques

Step-by-step: “Generate a React login form integrated with Firebase Auth.”

Debugging: “Fix my Express JWT middleware error without changing logic.”

Styling: “Write SCSS for a modal popup with smooth transitions.”

⚡ Challenges Faced

Firebase Auth Integration – Handling sign-in with Google & Email properly in React.

State Management – Keeping authentication state synced with Redux Toolkit.

Backend Coordination – Aligning Firebase-authenticated users with backend routes and database records.


✅ Deliverables Checklist

 Backend (Node.js + Express + MongoDB)

 Web Frontend (React + Redux Toolkit + SCSS)

 Firebase Authentication (Google + Email/Password)

 Blog CRUD + Profile

 README with AI usage + setup instructions

👩‍💻 Author
Sai Lakshmi Raj vagu
