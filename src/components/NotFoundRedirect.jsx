import { Navigate } from "react-router";
import { useAuthStore } from "../pages/Login/store/authStore";

function NotFoundRedirect() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role === "guru") {
    return <Navigate to="/admin" replace />;
  }

  if (user.role === "murid") {
    return <Navigate to="/siswa" replace />;
  }

  return <Navigate to="/" replace />;
}

export default NotFoundRedirect;