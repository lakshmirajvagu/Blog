// src/App.jsx (or wherever your routes are defined)
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import UserProfile from "./pages/userprofile";
import AllPosts from "./pages/AllPosts";
import Home from "./pages/Home";
import Login from "./pages/Login";
// ... other imports

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} /> {/* logged-in user */}
        <Route path="/profile/:id" element={<UserProfile />} /> {/* any user */}
        <Route path="/posts" element={<AllPosts />} />
        {/* other routes */}
      </Routes>
    </Router>
  );
}

export default App;
