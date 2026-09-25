import {
  Users,
  UserCheck,
  UserX,
  BookOpen,
  ClipboardCheck,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  Trophy,
  Clock,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import data from "@/data/data.json";

function Home() {
  const { dashboard, santri, absensi, nilai } = data;

  // ============================================
  // STATISTIK UTAMA
  // ============================================

  const totalSantri = dashboard.totalSantri;
  const santriAktif = dashboard.santriAktif;
  const santriNonaktif = dashboard.santriNonaktif;
  const totalKelas = dashboard.totalKelas;

  const { hadir, izin, sakit, alpa } =
    dashboard.absensiHariIni;

  const totalAbsensi = hadir + izin + sakit + alpa;

  const persentaseHadir =
    totalAbsensi > 0
      ? Math.round((hadir / totalAbsensi) * 100)
      : 0;

  // ============================================
  // DATA GRAFIK ABSENSI
  // ============================================

  const absensiChart = [
    {
      name: "Hadir",
      value: hadir,
    },
    {
      name: "Izin",
      value: izin,
    },
    {
      name: "Sakit",
      value: sakit,
    },
    {
      name: "Alpa",
      value: alpa,
    },
  ];

  // ============================================
  // DATA GRAFIK NILAI
  // ============================================

  const getRataRata = (item) => {
    const total =
      item.tahfidz +
      item.fiqih +
      item.bahasaArab +
      item.akhlak;

    return total / 4;
  };

  const rataRataMapel = [
    {
      name: "Tahfidz",
      nilai:
        nilai.reduce(
          (total, item) => total + item.tahfidz,
          0
        ) / nilai.length,
    },
    {
      name: "Fiqih",
      nilai:
        nilai.reduce(
          (total, item) => total + item.fiqih,
          0
        ) / nilai.length,
    },
    {
      name: "Bahasa Arab",
      nilai:
        nilai.reduce(
          (total, item) => total + item.bahasaArab,
          0
        ) / nilai.length,
    },
    {
      name: "Akhlak",
      nilai:
        nilai.reduce(
          (total, item) => total + item.akhlak,
          0
        ) / nilai.length,
    },
  ];

  // ============================================
  // TOP 5 SANTRI
  // ============================================

  const topSantri = nilai
    .map((item) => {
      const santriData = santri.find(
        (s) => s.id === item.santriId
      );

      return {
        id: item.santriId,
        nama: santriData?.nama || "Tidak diketahui",
        kelas: santriData?.kelas || "-",
        rataRata: getRataRata(item),
      };
    })
    .sort((a, b) => b.rataRata - a.rataRata)
    .slice(0, 5);

  // ============================================
  // AKTIVITAS TERBARU
  // ============================================

  const aktivitasTerbaru = absensi
    .slice()
    .reverse()
    .slice(0, 6)
    .map((item) => {
      const santriData = santri.find(
        (s) => s.id === item.santriId
      );

      return {
        ...item,
        nama: santriData?.nama || "Tidak diketahui",
      };
    });

  // ============================================
  // STATISTICS CARD
  // ============================================

  const stats = [
    {
      title: "Total Santri",
      value: totalSantri,
      description: "Santri terdaftar",
      icon: Users,
    },
    {
      title: "Santri Aktif",
      value: santriAktif,
      description: "Sedang belajar",
      icon: UserCheck,
    },
    {
      title: "Nonaktif",
      value: santriNonaktif,
      description: "Tidak aktif",
      icon: UserX,
    },
    {
      title: "Total Kelas",
      value: totalKelas,
      description: "Rombel terdaftar",
      icon: BookOpen,
    },
  ];

  return (
    <div className="space-y-6">

      {/* ========================================= */}
      {/* HEADER */}
      {/* ========================================= */}

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Dashboard
          </h1>

          <p className="text-sm text-muted-foreground">
            Pantau kondisi santri, akademik, dan
            kehadiran secara keseluruhan.
          </p>
        </div>

        <Badge
          variant="outline"
          className="w-fit gap-2 px-3 py-1.5"
        >
          <span className="h-2 w-2 rounded-full bg-green-500" />
          Sistem Aktif
        </Badge>

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

                    <h2 className="mt-2 text-2xl font-bold">
                      {item.value}
                    </h2>

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
      {/* QUICK OVERVIEW */}
      {/* ========================================= */}

      <div className="grid gap-4 md:grid-cols-3">

        {/* Kehadiran */}

        <Card>
          <CardHeader className="pb-3">

            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">
                Kehadiran Hari Ini
              </CardTitle>

              <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
            </div>

          </CardHeader>

          <CardContent>

            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">
                {persentaseHadir}%
              </span>

              <span className="mb-1 text-xs text-muted-foreground">
                tingkat kehadiran
              </span>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">

              <div
                className="h-full rounded-full bg-green-500 transition-all"
                style={{
                  width: `${persentaseHadir}%`,
                }}
              />

            </div>

            <div className="mt-3 flex justify-between text-[11px] text-muted-foreground">
              <span>{hadir} Hadir</span>
              <span>{izin} Izin</span>
              <span>{sakit} Sakit</span>
              <span>{alpa} Alpa</span>
            </div>

          </CardContent>
        </Card>

        {/* Nilai */}

        <Card>
          <CardHeader className="pb-3">

            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">
                Rata-rata Nilai
              </CardTitle>

              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>

          </CardHeader>

          <CardContent>

            <div className="flex items-end gap-2">

              <span className="text-3xl font-bold">
                {dashboard.rataRataNilai}
              </span>

              <span className="mb-1 text-xs text-muted-foreground">
                rata-rata santri
              </span>

            </div>

            <div className="mt-4 flex items-center gap-2">

              <Badge variant="secondary">
                Tertinggi {dashboard.nilaiTertinggi}
              </Badge>

              <span className="text-[11px] text-muted-foreground">
                {dashboard.santriBerprestasi} santri berprestasi
              </span>

            </div>

          </CardContent>
        </Card>

        {/* Tahun Ajaran */}

        <Card>
          <CardHeader className="pb-3">

            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">
                Tahun Ajaran
              </CardTitle>

              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </div>

          </CardHeader>

          <CardContent>

            <p className="text-3xl font-bold">
              2026/27
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Semester 1
            </p>

            <div className="mt-4">
              <Badge variant="outline">
                Tahun aktif
              </Badge>
            </div>

          </CardContent>
        </Card>

      </div>

      {/* ========================================= */}
      {/* CHARTS */}
      {/* ========================================= */}

      <div className="grid gap-4 lg:grid-cols-2">

        {/* Grafik Nilai */}

        <Card>

          <CardHeader>
            <CardTitle className="text-base">
              Rata-rata Nilai per Mata Pelajaran
            </CardTitle>

            <CardDescription>
              Perbandingan nilai rata-rata seluruh santri
            </CardDescription>
          </CardHeader>

          <CardContent>

            <div className="h-[280px] w-full">

              <ResponsiveContainer width="100%" height="100%">

                <BarChart
                  data={rataRataMapel}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -20,
                    bottom: 0,
                  }}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="name"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />

                  <YAxis
                    domain={[0, 100]}
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />

                  <Tooltip
                    cursor={{ opacity: 0.1 }}
                    formatter={(value) => [
                      `${Number(value).toFixed(1)}`,
                      "Nilai",
                    ]}
                  />

                  <Bar
                    dataKey="nilai"
                    radius={[6, 6, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </CardContent>

        </Card>

        {/* Grafik Absensi */}

        <Card>

          <CardHeader>
            <CardTitle className="text-base">
              Absensi Hari Ini
            </CardTitle>

            <CardDescription>
              Distribusi status kehadiran santri
            </CardDescription>
          </CardHeader>

          <CardContent>

            <div className="flex h-[280px] items-center justify-center">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={absensiChart}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={3}
                  >

                    {absensiChart.map(
                      (entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                        />
                      )
                    )}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-bold">
                  {totalAbsensi}
                </span>

                <span className="text-[10px] text-muted-foreground">
                  Santri
                </span>
              </div>

            </div>

            {/* Legend */}

            <div className="grid grid-cols-2 gap-3">

              {absensiChart.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2"
                >

                  <div className="flex items-center gap-2">

                    <span className="h-2 w-2 rounded-full bg-primary" />

                    <span className="text-xs">
                      {item.name}
                    </span>

                  </div>

                  <span className="text-xs font-semibold">
                    {item.value}
                  </span>

                </div>
              ))}

            </div>

          </CardContent>

        </Card>

      </div>

      {/* ========================================= */}
      {/* BOTTOM SECTION */}
      {/* ========================================= */}

      <div className="grid gap-4 lg:grid-cols-2">

        {/* Top Santri */}

        <Card>

          <CardHeader>

            <div className="flex items-center justify-between">

              <div>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Trophy className="h-4 w-4" />
                  Santri Berprestasi
                </CardTitle>

                <CardDescription>
                  5 santri dengan rata-rata nilai tertinggi
                </CardDescription>
              </div>

              <Button
                variant="ghost"
                size="sm"
                asChild
              >
                <a href="/santri/nilai">
                  Lihat semua
                  <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                </a>
              </Button>

            </div>

          </CardHeader>

          <CardContent>

            <div className="space-y-3">

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
                      <p className="text-sm font-medium">
                        {item.nama}
                      </p>

                      <p className="text-[11px] text-muted-foreground">
                        {item.kelas}
                      </p>
                    </div>

                  </div>

                  <Badge variant="secondary">
                    {item.rataRata.toFixed(1)}
                  </Badge>

                </div>
              ))}

            </div>

          </CardContent>

        </Card>

        {/* Aktivitas */}

        <Card>

          <CardHeader>

            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="h-4 w-4" />
              Aktivitas Terbaru
            </CardTitle>

            <CardDescription>
              Data absensi terbaru
            </CardDescription>

          </CardHeader>

          <CardContent>

            <div className="space-y-3">

              {aktivitasTerbaru.map((item) => {

                const statusVariant =
                  item.status === "Hadir"
                    ? "default"
                    : "secondary";

                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                  >

                    <div className="flex items-center gap-3">

                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </div>

                      <div>

                        <p className="text-xs font-medium">
                          {item.nama}
                        </p>

                        <p className="text-[10px] text-muted-foreground">
                          {item.tanggal}
                          {item.jam
                            ? ` • ${item.jam}`
                            : ""}
                        </p>

                      </div>

                    </div>

                    <Badge
                      variant={statusVariant}
                      className="text-[10px]"
                    >
                      {item.status}
                    </Badge>

                  </div>
                );
              })}

            </div>

          </CardContent>

        </Card>

      </div>

      {/* ========================================= */}
      {/* WELCOME / QUICK ACTION */}
      {/* ========================================= */}

      <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background">

        <CardHeader>

          <div className="flex items-center gap-2">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>

            <div>
              <CardTitle className="text-base">
                Selamat Datang di SantriApp
              </CardTitle>

              <CardDescription>
                Kelola data santri dengan lebih mudah.
              </CardDescription>
            </div>

          </div>

        </CardHeader>

        <CardContent>

          <div className="flex flex-wrap gap-2">

            <Button
              size="sm"
              asChild
              className="gap-2"
            >
              <a href="/admin/list">
                <Users className="h-4 w-4" />
                Lihat Santri
              </a>
            </Button>

            <Button
              size="sm"
              variant="outline"
              asChild
              className="gap-2"
            >
              <a href="/admin/nilai">
                <BookOpen className="h-4 w-4" />
                Lihat Nilai
              </a>
            </Button>

            <Button
              size="sm"
              variant="outline"
              asChild
              className="gap-2"
            >
              <a href="/admin/absensi">
                <ClipboardCheck className="h-4 w-4" />
                Lihat Absensi
              </a>
            </Button>

          </div>

        </CardContent>

      </Card>

    </div>
  );
}

export default Home;