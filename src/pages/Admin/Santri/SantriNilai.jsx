import { useMemo, useState } from "react";
import { Award, BookOpen, Search, TrendingUp, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

import data from "../../../data/data.json";

function SantriNilai() {
  const [search, setSearch] = useState("");
  const [kelasFilter, setKelasFilter] = useState("semua");
  const [semesterFilter, setSemesterFilter] = useState("semester-1");

  /*
   * ========================================
   * DATA NILAI
   * ========================================
   */

  const nilai = data.nilai;

  /*
   * ========================================
   * DAFTAR KELAS
   * ========================================
   */

  const daftarKelas = useMemo(() => {
    return [...new Set(data.santri.map((santri) => santri.kelas))];
  }, []);

  /*
   * ========================================
   * MENGGABUNGKAN DATA SANTRI + NILAI
   * ========================================
   *
   * Nilai menggunakan santriId.
   * Jadi kita cari data santri berdasarkan ID.
   */

  const dataNilai = useMemo(() => {
    return nilai.map((item) => {
      const santri = data.santri.find((santri) => santri.id === item.santriId);

      return {
        ...item,
        nama: santri?.nama || "Tidak diketahui",
        kelas: santri?.kelas || "-",
      };
    });
  }, [nilai]);

  /*
   * ========================================
   * FILTER
   * ========================================
   */

  const filteredNilai = useMemo(() => {
    return dataNilai.filter((santri) => {
      const cocokNama = santri.nama
        .toLowerCase()
        .includes(search.toLowerCase());

      const cocokKelas =
        kelasFilter === "semua" || santri.kelas === kelasFilter;

      return cocokNama && cocokKelas;
    });
  }, [dataNilai, search, kelasFilter, semesterFilter]);

  /*
   * ========================================
   * MATA PELAJARAN
   * ========================================
   *
   * Sesuaikan dengan field di data.json
   */

  const mataPelajaran = [
    {
      key: "tahfidz",
      label: "Tahfidz",
    },
    {
      key: "bahasaArab",
      label: "Bahasa Arab",
    },
    {
      key: "fiqih",
      label: "Fiqih",
    },
    {
      key: "akhlak",
      label: "Aqidah",
    },
  ];

  /*
   * ========================================
   * HITUNG RATA-RATA SANTRI
   * ========================================
   */

  const getRataRata = (santri) => {
    const total = mataPelajaran.reduce(
      (sum, mapel) => sum + Number(santri[mapel.key] || 0),
      0,
    );

    return Math.round(total / mataPelajaran.length);
  };

  /*
   * ========================================
   * STATISTIK
   * ========================================
   */

  const rataRataSemua = filteredNilai.length
    ? Math.round(
        filteredNilai.reduce(
          (total, santri) => total + getRataRata(santri),
          0,
        ) / filteredNilai.length,
      )
    : 0;

  const nilaiTertinggi = filteredNilai.length
    ? Math.max(...filteredNilai.map((santri) => getRataRata(santri)))
    : 0;

  /*
   * ========================================
   * DATA GRAFIK MAPEL
   * ========================================
   */

  const grafikMapel = useMemo(() => {
    return mataPelajaran.map((mapel) => {
      const total = filteredNilai.reduce(
        (sum, santri) => sum + Number(santri[mapel.key] || 0),
        0,
      );

      const rataRata = filteredNilai.length
        ? Math.round(total / filteredNilai.length)
        : 0;

      return {
        mapel: mapel.label,
        nilai: rataRata,
      };
    });
  }, [filteredNilai]);

  /*
   * ========================================
   * DATA DISTRIBUSI NILAI
   * ========================================
   */

  const distribusiNilai = useMemo(() => {
    const distribusi = {
      "90-100": 0,
      "80-89": 0,
      "70-79": 0,
      "< 70": 0,
    };

    filteredNilai.forEach((santri) => {
      const rataRata = getRataRata(santri);

      if (rataRata >= 90) {
        distribusi["90-100"]++;
      } else if (rataRata >= 80) {
        distribusi["80-89"]++;
      } else if (rataRata >= 70) {
        distribusi["70-79"]++;
      } else {
        distribusi["< 70"]++;
      }
    });

    return Object.entries(distribusi).map(([range, jumlah]) => ({
      range,
      jumlah,
    }));
  }, [filteredNilai]);

  /*
   * ========================================
   * TOP SANTRI
   * ========================================
   */

  const rankingSantri = useMemo(() => {
    return [...filteredNilai]
      .sort((a, b) => getRataRata(b) - getRataRata(a))
      .slice(0, 5);
  }, [filteredNilai]);

  return (
    <div className="space-y-6">
      {/* ========================================
          HEADER
      ======================================== */}

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Nilai Santri</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Pantau perkembangan akademik seluruh santri.
        </p>
      </div>

      {/* ========================================
          STATISTICS
      ======================================== */}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* TOTAL SANTRI */}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Santri</CardTitle>

            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">{filteredNilai.length}</div>

            <p className="mt-1 text-xs text-muted-foreground">
              Santri memiliki data nilai
            </p>
          </CardContent>
        </Card>

        {/* RATA-RATA */}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata</CardTitle>

            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">{rataRataSemua}</div>

            <p className="mt-1 text-xs text-muted-foreground">
              Rata-rata nilai santri
            </p>
          </CardContent>
        </Card>

        {/* TERTINGGI */}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Nilai Tertinggi
            </CardTitle>

            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">{nilaiTertinggi}</div>

            <p className="mt-1 text-xs text-muted-foreground">
              Rata-rata terbaik
            </p>
          </CardContent>
        </Card>

        {/* MAPEL */}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Mata Pelajaran
            </CardTitle>

            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">{mataPelajaran.length}</div>

            <p className="mt-1 text-xs text-muted-foreground">
              Mata pelajaran dinilai
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ========================================
          GRAFIK
      ======================================== */}

      <div className="grid gap-4 lg:grid-cols-2">
        {/* GRAFIK RATA-RATA MAPEL */}

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Rata-rata Mata Pelajaran
            </CardTitle>

            <p className="text-xs text-muted-foreground">
              Perbandingan rata-rata nilai setiap mata pelajaran.
            </p>
          </CardHeader>

          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={grafikMapel}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -20,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />

                  <XAxis dataKey="mapel" tick={{ fontSize: 11 }} />

                  <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />

                  <Tooltip />

                  <Bar dataKey="nilai" name="Rata-rata" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* DISTRIBUSI */}

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Distribusi Nilai</CardTitle>

            <p className="text-xs text-muted-foreground">
              Jumlah santri berdasarkan rentang rata-rata nilai.
            </p>
          </CardHeader>

          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={distribusiNilai}
                  layout="vertical"
                  margin={{
                    top: 10,
                    right: 20,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />

                  <XAxis
                    type="number"
                    allowDecimals={false}
                    tick={{ fontSize: 11 }}
                  />

                  <YAxis
                    dataKey="range"
                    type="category"
                    tick={{ fontSize: 11 }}
                    width={60}
                  />

                  <Tooltip />

                  <Bar dataKey="jumlah" name="Santri" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ========================================
          TOP 5
      ======================================== */}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Santri dengan Nilai Terbaik
          </CardTitle>

          <p className="text-xs text-muted-foreground">
            5 santri dengan rata-rata nilai tertinggi.
          </p>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {rankingSantri.map((santri, index) => (
              <div
                key={santri.santriId}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-bold">
                    {index + 1}
                  </div>

                  <div>
                    <p className="text-sm font-medium">{santri.nama}</p>

                    <Badge variant="secondary" className="mt-1">
                      Kelas {santri.kelas}
                    </Badge>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold">{getRataRata(santri)}</p>

                  <p className="text-[10px] text-muted-foreground">Rata-rata</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ========================================
          TABEL
      ======================================== */}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Daftar Nilai</CardTitle>

          <p className="text-xs text-muted-foreground">
            Lihat detail nilai setiap santri.
          </p>
        </CardHeader>

        <CardContent>
          {/* FILTER */}

          <div className="mb-5 flex flex-col gap-3 md:flex-row">
            {/* SEARCH */}

            <div className="relative md:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Cari nama santri..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* KELAS */}

            <Select value={kelasFilter} onValueChange={setKelasFilter}>
              <SelectTrigger className="md:w-[180px]">
                <SelectValue placeholder="Pilih kelas" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="semua">Semua Kelas</SelectItem>

                {daftarKelas.map((kelas) => (
                  <SelectItem key={kelas} value={kelas}>
                    Kelas {kelas}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* SEMESTER */}

            <Select value={semesterFilter} onValueChange={setSemesterFilter}>
              <SelectTrigger className="md:w-[180px]">
                <SelectValue placeholder="Semester" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="semester-1">Semester 1</SelectItem>

                <SelectItem value="semester-2">Semester 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* JUMLAH */}

          <div className="mb-3">
            <p className="text-xs text-muted-foreground">
              Menampilkan {filteredNilai.length} dari {dataNilai.length} santri
            </p>
          </div>

          {/* TABLE */}

          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px]">No</TableHead>

                  <TableHead>Nama Santri</TableHead>

                  <TableHead>Kelas</TableHead>

                  {mataPelajaran.map((mapel) => (
                    <TableHead key={mapel.key} className="text-center">
                      {mapel.label}
                    </TableHead>
                  ))}

                  <TableHead className="text-center">Rata-rata</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredNilai.length > 0 ? (
                  filteredNilai.map((santri, index) => {
                    const rataRata = getRataRata(santri);

                    return (
                      <TableRow key={santri.santriId}>
                        <TableCell>{index + 1}</TableCell>

                        <TableCell className="font-medium">
                          {santri.nama}
                        </TableCell>

                        <TableCell>
                          <Badge variant="secondary">{santri.kelas}</Badge>
                        </TableCell>

                        {mataPelajaran.map((mapel) => (
                          <TableCell key={mapel.key} className="text-center">
                            {santri[mapel.key]}
                          </TableCell>
                        ))}

                        <TableCell className="text-center">
                          <Badge
                            variant={
                              rataRata >= 90
                                ? "default"
                                : rataRata >= 75
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {rataRata}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <Search className="h-5 w-5 text-muted-foreground" />

                        <p className="text-sm font-medium">
                          Santri tidak ditemukan
                        </p>

                        <p className="text-xs text-muted-foreground">
                          Coba ubah kata pencarian atau filter kelas.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SantriNilai;
