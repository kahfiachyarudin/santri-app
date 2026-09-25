import React from "react";
import { Outlet } from "react-router";
import GuestNavbar from "../components/GuestNavbar";

function GuestLayout() {
  return (
    <div className="min-h-screen bg-background">
      <GuestNavbar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default GuestLayout;