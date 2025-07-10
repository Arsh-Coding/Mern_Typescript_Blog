import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-10">🔄 Checking session...</div>; // or a spinner
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
