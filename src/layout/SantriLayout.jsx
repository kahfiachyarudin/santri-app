import { Navigate, NavLink, Outlet, useNavigate } from 'react-router';
import Navbar from '../components/Navbar';
import { useAuthStore } from '@/pages/Login/store/authStore';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/AdminSidebar';

function SantriLayout() {
    const user = useAuthStore((state) => state.user);
    
      //? Jika belum login, lempar ke Halaman Login
      if (!user) {
        return <Navigate to="/login/murid" replace />;
      }
    
      //? Jika login tapi BUKAN admin, lempar ke Halaman User
      if (user.role !== 'murid') {
        return <Navigate to="/admin" replace />;
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

export default SantriLayout;