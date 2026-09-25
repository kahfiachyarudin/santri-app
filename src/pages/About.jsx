import React from "react";
import { GraduationCap, Code2, ShieldCheck } from "lucide-react";

function About() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Tentang Aplikasi
        </h1>

        <p className="text-sm text-muted-foreground">
          Informasi mengenai Santri App.
        </p>
      </div>

      {/* Main Card */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-start gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center
            rounded-xl bg-primary/10 text-primary"
          >
            <GraduationCap className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Santri App
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Santri App adalah aplikasi yang digunakan untuk membantu
              mengelola dan menampilkan informasi data santri secara
              lebih terstruktur dan mudah digunakan.
            </p>
          </div>

        </div>
      </div>

      {/* Features */}
      <div className="grid gap-4 md:grid-cols-2">

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center
            rounded-lg bg-primary/10 text-primary"
          >
            <ShieldCheck className="h-5 w-5" />
          </div>

          <h3 className="mt-4 font-semibold">
            Data Terorganisir
          </h3>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Data santri dapat dikelola dengan lebih rapi sehingga
            memudahkan proses pencarian dan pengelolaan informasi.
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center
            rounded-lg bg-primary/10 text-primary"
          >
            <Code2 className="h-5 w-5" />
          </div>

          <h3 className="mt-4 font-semibold">
            Teknologi Modern
          </h3>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Dibangun menggunakan React dan Tailwind CSS dengan
            antarmuka yang responsif dan modern.
          </p>
        </div>

      </div>

      {/* Version */}
      <div className="rounded-xl border bg-muted/30 p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Versi Aplikasi
          </span>

          <span className="rounded-md bg-primary/10 px-2.5 py-1
            text-xs font-medium text-primary"
          >
            v1.0.0
          </span>
        </div>
      </div>

    </div>
  );
}

export default About;