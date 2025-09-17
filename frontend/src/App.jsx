import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import UserProfile from "./pages/UserProfile";
import AllPosts from "./pages/AllPosts";
import Navbar from "./components/Navbar";
import Posts from "./components/posts"; 
import CreatePost from "./pages/CreatePost";

function PrivateRoute({ children }) {
  const token = useSelector((state) => state.auth.token) || localStorage.getItem("idToken");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Router>
      <Navbar /> {/* always visible for logged-in users */}
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Private routes */}
        <Route
          path="/posts"
          element={
            <PrivateRoute>
              <AllPosts />
            </PrivateRoute>
          }
        />
        <Route
  path="/posts"
  element={
    <PrivateRoute>
      <Posts />
    </PrivateRoute>
  }
/>
<Route
  path="/create"
  element={
    <PrivateRoute>
      <CreatePost />
    </PrivateRoute>
  }
/>
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />

        <Route
          path="/"
          element={<Navigate to="/posts" replace />} // redirect home to posts
        />
      </Routes>
    </Router>
  );
}
