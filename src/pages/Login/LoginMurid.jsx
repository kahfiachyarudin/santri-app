import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { useAuthStore } from "./store/authStore";
import data from "../../data/users.json"

function LoginMurid() {
  const navigate = useNavigate();
  const loginMurid = useAuthStore((state) => state.loginMurid);
  const [nis, setNis] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    const success = loginMurid(nis, password, data.users);
    if (!success) {
      alert("NIS atau password salah!");
      return;
    }
    navigate("/siswa");
  };
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <GraduationCap className="h-6 w-6" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight">Login Siswa</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Masuk untuk melihat informasi akademik kamu
          </p>
        </div>

        {/* Form */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="nis" className="text-sm font-medium">
                NIS
              </label>

              <input
                id="nis"
                type="text"
                value={nis}
                onChange={(e) => setNis(e.target.value)}
                placeholder="Masukkan NIS"
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

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

            <button
              type="submit"
              className="h-10 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              Login sebagai Siswa
            </button>
          </form>

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

export default LoginMurid;
