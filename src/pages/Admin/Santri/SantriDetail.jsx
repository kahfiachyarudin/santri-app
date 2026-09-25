import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  BookOpen,
  CalendarCheck,
  GraduationCap,
  UserRound,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";

import data from "@/data/data.json";

export default function SantriDetail() {
  const { santri_id } = useParams();

  const santri = data.santri.find((item) => item.id === santri_id);
  const absen = data.absensi.find((item) => item.santriId === santri_id);
  const nilai = data.nilai.find((item) => item.santriId === santri_id);
  const rataRataNilai = nilai
    ? (
        (nilai.tahfidz + nilai.fiqih + nilai.bahasaArab + nilai.akhlak) /
        4
      ).toFixed(2)
    : null;
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted">
            <UserRound className="h-5 w-5 text-muted-foreground" />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight">Detail Santri</h1>

            <p className="text-xs text-muted-foreground">
              Informasi lengkap santri
            </p>
          </div>
        </div>

        <Button variant="outline" size="sm" asChild>
          <Link to="/admin/santri">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Link>
        </Button>
      </div>

      {/* PROFILE */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Profil Santri</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <UserRound className="h-8 w-8 text-muted-foreground" />
            </div>

            <div>
              <h2 className="text-lg font-semibold">Nama : {santri?.nama}</h2>

              <Badge variant="secondary" className="mt-1">
                ID: {santri?.id}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* INFORMATION */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <GraduationCap className="h-4 w-4" />

                <span className="text-xs">Kelas</span>
              </div>

              <p className="mt-2 font-medium">{santri?.kelas || "N/A"}</p>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <BookOpen className="h-4 w-4" />

                <span className="text-xs">Status Akademik</span>
              </div>

              <p className="mt-2 font-medium">{santri?.status || "N/A"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* QUICK INFO */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <BookOpen className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Nilai</p>

                <p className="font-semibold">{rataRataNilai || "N/A"}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <CalendarCheck className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Absensi</p>

              <p className="font-semibold">{absen?.tanggal || "N/A"}</p>

              <p className="font-semibold">
                {absen?.status || "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
