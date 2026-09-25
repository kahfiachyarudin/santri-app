import React from "react";
import { Link } from "react-router";
import {
  GraduationCap,
  ClipboardCheck,
  BookOpen,
  Users,
  ArrowRight,
} from "lucide-react";

function GuestHome() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero */}
      <section className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <GraduationCap className="h-7 w-7" />
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Selamat Datang di{" "}
            <span className="text-primary">SantriApp</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Sistem informasi santri untuk membantu pengelolaan data,
            nilai, dan absensi secara lebih mudah dan terorganisir.
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <Link
              to="/login/murid"
              className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              Mulai Sekarang
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/about"
              className="rounded-lg border px-5 py-2.5 text-sm font-medium transition hover:bg-muted"
            >
              Tentang Kami
            </Link>
          </div>
        </div>
      </section>

      {/* Fitur */}
      <section className="border-t bg-muted/30 px-6 py-12">
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-3">
          <div className="rounded-xl border bg-background p-5">
            <Users className="mb-3 h-5 w-5 text-primary" />
            <h3 className="font-semibold">Data Santri</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Pengelolaan data santri yang lebih terorganisir.
            </p>
          </div>

          <div className="rounded-xl border bg-background p-5">
            <BookOpen className="mb-3 h-5 w-5 text-primary" />
            <h3 className="font-semibold">Nilai</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Melihat informasi nilai akademik santri.
            </p>
          </div>

          <div className="rounded-xl border bg-background p-5">
            <ClipboardCheck className="mb-3 h-5 w-5 text-primary" />
            <h3 className="font-semibold">Absensi</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Informasi kehadiran santri dengan mudah.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GuestHome;