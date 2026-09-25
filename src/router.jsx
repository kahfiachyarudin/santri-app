import { createBrowserRouter } from "react-router";

import Home from "./pages/Home";
import About from "./pages/About";
import GuestHome from "./pages/GuestHome";
import SiswaHome from "./pages/SiswaHome";

import GuestLayout from "./layout/GuestLayout";
import AdminLayout from "./layout/AdminLayout";

import SantriList from "./pages/Admin/Santri/SantriList";
import SantriNilai from "./pages/Admin/Santri/SantriNilai";
import SantriAbsensi from "./pages/Admin/Santri/SantriAbsensi";
import SantriDetail from "./pages/Admin/Santri/SantriDetail";

import LoginMurid from "./pages/Login/LoginMurid";
import LoginAdmin from "./pages/Login/LoginAdmin";
import NotFoundRedirect from "./components/NotFoundRedirect";
import GantiPassword from "./components/NotFoundRedirect";
import SantriLayout from "./layout/SantriLayout";

export const router = createBrowserRouter([
  // =========================
  // GUEST
  // =========================
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        index: true,
        element: <GuestHome />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "login/murid",
        element: <LoginMurid />,
      },
      {
        path: "login/guru",
        element: <LoginAdmin />,
      },
    ],
  },

  // =========================
  // ADMIN
  // =========================
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "santri",
        children: [
          {
            index: true,
            element: <SantriList />,
          },
          {
            path: ":santri_id",
            element: <SantriDetail />,
          },
        ],
      },
      {
        path: "nilai",
        element: <SantriNilai />,
      },
      {
        path: "absensi",
        element: <SantriAbsensi />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "ganti-password",
        element: <GantiPassword />,
      }
    ],
  },
  // =========================
  // SISWA
  // =========================
      {
        path: "/siswa",
        element: <SantriLayout />,
        children: [
          {
            index: true,
            element: <SiswaHome />,
          },
          {
            path: "about",
            element: <About />,
          },
          {
            path: "ganti-password",
            element: <GantiPassword />,
          }
        ],
      },

  // =========================
  // 404
  // =========================
  {
    path: "*",
    element: <NotFoundRedirect />,
  },
]);
