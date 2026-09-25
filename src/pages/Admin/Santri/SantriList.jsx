import { useState } from "react";
import { Search } from "lucide-react";

import SantriCard from "../../../components/SantriCard";
import data from "../../../data/data.json";

function SantriList() {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const classes = [...new Set(santries.map((santri) => santri.kelas))];
  const santries = data.santri;

  const filteredSantries = santries.filter((santri) => {
    const matchSearch = santri.nama
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchClass = classFilter === "all" || santri.kelas === classFilter;

    const matchStatus =
      statusFilter === "all" || santri.status === statusFilter;

    return matchSearch && matchClass && matchStatus;
  });
  return (
    <>
      {/* Header */}
      <header className="flex flex-col gap-1">
        <h1 className="text-md font-semibold">Daftar Santri</h1>

        <p className="text-[10px] text-muted-foreground">
          Cari santri berdasarkan nama.
        </p>
      </header>

      {/* Search */}
      <div className="relative mt-5">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <input
          type="text"
          placeholder="Cari nama santri..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10 w-full rounded-lg border bg-background pl-9 pr-4 text-sm outline-none transition focus:border-primary"
        />
      </div>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* FILTER KELAS */}
        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          className="h-10 rounded-lg border bg-background px-3 text-sm outline-none transition focus:border-primary"
        >
          <option value="all">Semua Kelas</option>

          {classes.map((kelas) => (
            <option key={kelas} value={kelas}>
              {kelas}
            </option>
          ))}
        </select>

        {/* FILTER STATUS */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 rounded-lg border bg-background px-3 text-sm outline-none transition focus:border-primary"
        >
          <option value="all">Semua Status</option>
          <option value="aktif">Aktif</option>
          <option value="alumni">Alumni</option>
        </select>
      </div>

      {/* Jumlah hasil */}
      <div className="mt-4">
        <p className="text-xs text-muted-foreground">
          Menampilkan {filteredSantries.length} dari {santries.length} santri
        </p>
      </div>

      {/* Grid */}
      {filteredSantries.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredSantries.map((santri) => (
            <SantriCard
              key={santri.id}
              id={santri.id}
              name={santri.nama}
              classroom={santri.kelas}
            />
          ))}
        </div>
      ) : (
        <div className="mt-10 text-center">
          <p className="text-sm font-medium">Santri tidak ditemukan</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Coba gunakan nama yang berbeda.
          </p>
        </div>
      )}
    </>
  );
}

export default SantriList;
