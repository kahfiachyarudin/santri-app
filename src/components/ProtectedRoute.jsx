import { Navigate, Outlet } from "react-router";

function ProtectedRoute({ role }) {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  // Belum login
  if (!currentUser) {
    return (
      <Navigate
        to={role === "guru" ? "/login/guru" : "/login/murid"}
        replace
      />
    );
  }

  // Role tidak sesuai
  if (currentUser.role !== role) {
    return (
      <Navigate
        to={currentUser.role === "guru" ? "/admin" : "/siswa"}
        replace
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;