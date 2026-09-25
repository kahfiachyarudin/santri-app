import { Navigate, Outlet } from "react-router";
import AdminSidebar from "@/components/AdminSidebar";
import Navbar from "@/components/Navbar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/pages/Login/store/authStore";

function AdminLayout() {
  const user = useAuthStore((state) => state.user);

  //? Jika belum login, lempar ke Halaman Login
  if (!user) {
    return <Navigate to="/login/murid" replace />;
  }

  //? Jika login tapi BUKAN admin, lempar ke Halaman User
  if (user.role !== 'admin') {
    return <Navigate to="/siswa" replace />;
  }

  return (
    <SidebarProvider>
      <AdminSidebar />

      <SidebarInset>
        <Navbar />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AdminLayout;