import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow bg-white">
      <Link to="/" className="text-xl font-bold">
        📝 BlogApp
      </Link>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span>👋 {user.username}</span>
            <Link to="/create" className="text-blue-600">
              New Post
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
            <Link to="/register" className="text-green-600">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
