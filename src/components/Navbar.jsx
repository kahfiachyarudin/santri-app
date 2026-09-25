import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useAuthStore } from "../pages/Login/store/authStore";
import {
  Bell,
  ChevronDown,
  CircleCheck,
  LayoutDashboard,
  LogOut,
  Settings,
  SidebarIcon,
  User,
  KeyRound,
} from "lucide-react";

import { SidebarTrigger } from "./ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const getPageInfo = () => {
    if (location.pathname === "/") {
      return {
        title: "Dashboard",
        description: "Ringkasan sistem",
        icon: LayoutDashboard,
      };
    }

    if (location.pathname.startsWith("/santri/list")) {
      return {
        title: "Daftar Santri",
        description: "Manajemen data santri",
        icon: User,
      };
    }

    if (location.pathname === "/santri/nilai") {
      return {
        title: "Nilai Santri",
        description: "Monitoring akademik",
        icon: User,
      };
    }

    if (location.pathname === "/santri/absensi") {
      return {
        title: "Absensi",
        description: "Monitoring kehadiran",
        icon: User,
      };
    }

    if (location.pathname === "/about") {
      return {
        title: "Tentang Aplikasi",
        description: "Informasi aplikasi",
        icon: Settings,
      };
    }

    return {
      title: "SantriApp",
      description: "Sistem Informasi Santri",
      icon: LayoutDashboard,
    };
  };

  const page = getPageInfo();
  const PageIcon = page.icon;
  console.log("USER NAVBAR:", user);

  return (
    <nav className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-xl">
      {/* LEFT */}
      <div className="flex min-w-0 items-center gap-3">
        <SidebarTrigger className="h-9 w-9 rounded-lg border border-transparent transition hover:border-border hover:bg-muted" />

        <div className="hidden h-6 w-px bg-border sm:block" />

        {/* PAGE INFO */}
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="hidden h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary sm:flex">
            <PageIcon className="h-4 w-4" />
          </div>

          <div className="flex min-w-0 flex-col">
            <div className="flex items-center gap-2">
              <span className="truncate text-sm font-semibold tracking-tight">
                {page.title}
              </span>

              <div className="hidden items-center gap-1.5 rounded-full bg-green-500/10 px-2 py-0.5 md:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

                <span className="text-[10px] font-medium text-green-600 dark:text-green-400">
                  Online
                </span>
              </div>
            </div>

            <span className="hidden truncate text-[11px] text-muted-foreground sm:block">
              {page.description}
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT - ACCOUNT */}
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 outline-none transition hover:bg-muted">
              {/* AVATAR */}
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {user.nama
                    ?.split(" ")
                    .map((word) => word[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {/* NAME */}
              <div className="hidden text-left sm:block">
                <p className="text-sm font-medium leading-none">{user.nama}</p>

                <p className="mt-1 text-[11px] capitalize text-muted-foreground">
                  {user.role}
                </p>
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            {/* USER INFO */}
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">{user.nama}</span>

                <span className="text-xs font-normal text-muted-foreground">
                  {user.role === "murid"
                    ? `NIS: ${user.nis}`
                    : `Username: ${user.username}`}
                </span>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {/* PROFIL */}
            <DropdownMenuItem
              className="cursor-pointer gap-2"
              onClick={() =>
                navigate(
                  user.role === "murid" ? "/siswa/profil" : "/admin/profil",
                )
              }
            >
              <User className="h-4 w-4" />
              Profil
            </DropdownMenuItem>

            {/* GANTI PASSWORD */}
            <DropdownMenuItem
              className="cursor-pointer gap-2"
              onClick={() =>
                navigate(
                  user.role === "murid"
                    ? "/siswa/ganti-password"
                    : "/admin/ganti-password",
                )
              }
            >
              <KeyRound className="h-4 w-4" />
              Ganti Password
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* LOGOUT */}
            <DropdownMenuItem
              className="cursor-pointer gap-2 text-red-500 focus:text-red-500"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </nav>
  );
}

export default Navbar;
