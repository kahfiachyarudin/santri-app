import React from "react";

import { Users, UserCheck, GraduationCap, Trophy } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import data from "@/data/data.json";

function HomeSiswa() {
  const dashboard = data.dashboard;

  // =========================================
  // MURID BERPRESTASI
  // =========================================

  // =========================================
  // STATISTICS
  // =========================================

  const stats = [
    {
      title: "Total Santri",
      value: dashboard.totalSantri,
      description: "Jumlah seluruh santri",
      icon: Users,
    },
    {
      title: "Santri Aktif",
      value: dashboard.santriAktif,
      description: "Santri yang masih aktif",
      icon: UserCheck,
    },
    {
      title: "Total Kelas",
      value: dashboard.totalKelas,
      description: "Kelas yang tersedia",
      icon: GraduationCap,
    },
    {
      title: "Murid Berprestasi",
      value: dashboard.santriBerprestasi,
      description: "Santri dengan prestasi terbaik",
      icon: Trophy,
    },
  ];

  return (
    <div className="space-y-6">
      {/* ========================================= */}
      {/* HEADER */}
      {/* ========================================= */}

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>

        <p className="text-sm text-muted-foreground">
          Selamat datang di Dashboard SantriApp.
        </p>
      </div>

      {/* ========================================= */}
      {/* STATISTICS */}
      {/* ========================================= */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.title}
              className="transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      {item.title}
                    </p>

                    <h2 className="mt-2 text-2xl font-bold">{item.value}</h2>

                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ========================================= */}
      {/* MURID BERPRESTASI */}
      {/* ========================================= */}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-base">
                <Trophy className="h-4 w-4" />
                Murid Berprestasi
              </CardTitle>

              <CardDescription>
                5 murid dengan rata-rata nilai tertinggi
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* <div className="space-y-3">
            {topSantri.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border p-3 transition hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {index + 1}
                  </div>

                  <div>
                    <p className="text-sm font-medium">{item.nama}</p>

                    <p className="text-[11px] text-muted-foreground">
                      {item.kelas}
                    </p>
                  </div>
                </div>

                <Badge variant="secondary">{item.rataRata.toFixed(1)}</Badge>
              </div>
            ))}
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}

export default HomeSiswa;
