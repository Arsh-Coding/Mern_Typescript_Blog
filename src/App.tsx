import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import CreatePostPage from "./pages/CreatePostPage.tsx";
import PrivateRoute from "./routes/PrivateRoute.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import PostDetailPage from "./pages/PostDetailPage.tsx";
import EditPostPage from "./pages/EditPostPage.tsx";
import "./App.css";
import Navbar from "./components/Navbar.tsx";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          {/* <Route path="/create" element={<CreatePostPage />} /> */}
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreatePostPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/posts/edit/:id"
            element={
              <PrivateRoute>
                <EditPostPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
