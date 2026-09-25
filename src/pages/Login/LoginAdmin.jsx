import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useAuthStore } from "./store/authStore";
import data from "../../data/users.json"

function LoginAdmin() {
  const navigate = useNavigate();
  const loginGuru = useAuthStore((state) => state.loginGuru);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    const success = loginGuru(username, password, data.users);
    if (!success) {
      alert("Username atau password salah!");
      return;
    }
    navigate("/admin");
  };
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <ShieldCheck className="h-6 w-6" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight">Login Admin</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Masuk untuk mengelola data SantriApp
          </p>
        </div>

        {/* Form */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username */}
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>

              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Login */}
            <button
              type="submit"
              className="h-10 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              Login sebagai Admin
            </button>
          </form>

          {/* Back */}
          <Link
            to="/"
            className="mt-5 flex items-center justify-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke halaman utama
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginAdmin;
