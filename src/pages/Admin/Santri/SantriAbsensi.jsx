import { useMemo, useState } from "react";
import { CalendarCheck, CalendarX, Clock, Search, Users } from "lucide-react";

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

import data from "../../../data/data.json";

function SantriAbsensi() {
  const [search, setSearch] = useState("");
  const [kelasFilter, setKelasFilter] = useState("semua");

  /*
   * Membuat rekap absensi setiap santri
   */
  const absensi = useMemo(() => {
    return data.santri.map((santri) => {
      const records = data.absensi.filter(
        (item) => item.santriId === santri.id,
      );

      const hadir = records.filter((item) => item.status === "Hadir").length;

      const izin = records.filter((item) => item.status === "Izin").length;

      const sakit = records.filter((item) => item.status === "Sakit").length;

      const alpa = records.filter((item) => item.status === "Alpa").length;

      return {
        id: santri.id,
        nama: santri.nama,
        kelas: santri.kelas,
        hadir,
        izin,
        sakit,
        alpa,
      };
    });
  }, []);

  /*
   * Filter pencarian + kelas
   */
  const filteredAbsensi = absensi.filter((santri) => {
    const cocokNama = santri.nama.toLowerCase().includes(search.toLowerCase());

    const cocokKelas = kelasFilter === "semua" || santri.kelas === kelasFilter;

    return cocokNama && cocokKelas;
  });

  /*
   * Total keseluruhan
   */
  const totalHadir = absensi.reduce((total, santri) => total + santri.hadir, 0);

  const totalIzin = absensi.reduce((total, santri) => total + santri.izin, 0);

  const totalSakit = absensi.reduce((total, santri) => total + santri.sakit, 0);

  const totalAlpa = absensi.reduce((total, santri) => total + santri.alpa, 0);

  /*
   * Daftar kelas dari data.json
   */
  const daftarKelas = [...new Set(data.santri.map((santri) => santri.kelas))];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Absensi Santri</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Pantau kehadiran dan absensi seluruh santri.
        </p>
      </div>

      {/* STATISTICS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* HADIR */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Hadir</CardTitle>

            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">{totalHadir}</div>

            <p className="mt-1 text-xs text-muted-foreground">
              Total kehadiran
            </p>
          </CardContent>
        </Card>

        {/* IZIN */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Izin</CardTitle>

            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">{totalIzin}</div>

            <p className="mt-1 text-xs text-muted-foreground">Total izin</p>
          </CardContent>
        </Card>

        {/* SAKIT */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sakit</CardTitle>

            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">{totalSakit}</div>

            <p className="mt-1 text-xs text-muted-foreground">Total sakit</p>
          </CardContent>
        </Card>

        {/* ALPA */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Alpa</CardTitle>

            <CalendarX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">{totalAlpa}</div>

            <p className="mt-1 text-xs text-muted-foreground">
              Tanpa keterangan
            </p>
          </CardContent>
        </Card>
      </div>

      {/* TABLE */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Rekap Absensi</CardTitle>
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
          </div>

          {/* JUMLAH DATA */}
          <div className="mb-3">
            <p className="text-xs text-muted-foreground">
              Menampilkan {filteredAbsensi.length} dari {absensi.length} santri
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

                  <TableHead className="text-center">Hadir</TableHead>

                  <TableHead className="text-center">Izin</TableHead>

                  <TableHead className="text-center">Sakit</TableHead>

                  <TableHead className="text-center">Alpa</TableHead>

                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredAbsensi.length > 0 ? (
                  filteredAbsensi.map((santri, index) => {
                    const status =
                      santri.alpa > 0
                        ? "Perlu Perhatian"
                        : santri.sakit > 1
                          ? "Cukup Baik"
                          : "Baik";

                    return (
                      <TableRow key={santri.id}>
                        <TableCell>{index + 1}</TableCell>

                        <TableCell className="font-medium">
                          {santri.nama}
                        </TableCell>

                        <TableCell>
                          <Badge variant="secondary">{santri.kelas}</Badge>
                        </TableCell>

                        <TableCell className="text-center font-medium">
                          {santri.hadir}
                        </TableCell>

                        <TableCell className="text-center">
                          {santri.izin}
                        </TableCell>

                        <TableCell className="text-center">
                          {santri.sakit}
                        </TableCell>

                        <TableCell className="text-center">
                          {santri.alpa}
                        </TableCell>

                        <TableCell className="text-center">
                          <Badge
                            variant={
                              santri.alpa > 0 ? "destructive" : "secondary"
                            }
                          >
                            {status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      Santri tidak ditemukan.
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

export default SantriAbsensi;
