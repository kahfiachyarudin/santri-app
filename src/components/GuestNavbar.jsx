import React from "react";
import { Link } from "react-router";
import { GraduationCap } from "lucide-react";

function GuestNavbar() {
  return (
    <nav className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/80 px-6 backdrop-blur-xl">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <GraduationCap className="h-5 w-5" />
        </div>

        <div>
          <h1 className="text-sm font-semibold">
            SantriApp
          </h1>

          <p className="text-[10px] text-muted-foreground">
            Sistem Informasi Santri
          </p>
        </div>
      </Link>

      {/* Pilihan Login */}
      <div className="flex items-center gap-2">

        <Link
          to="/login/murid"
          className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted"
        >
          Login sebagai Murid
        </Link>

        <Link
          to="/login/guru"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          Login sebagai Admin
        </Link>

      </div>

    </nav>
  );
}

export default GuestNavbar;