import { useState } from "react";
import { useNavigate } from "react-router";
import data from "@/data/users.json";
import { useAuthStore } from "@/store/authStore";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { ArrowLeft, KeyRound } from "lucide-react";

function GantiPassword() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const changePassword = useAuthStore(
    (state) => state.changePassword,
  );

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Cek password baru
    if (newPassword !== confirmPassword) {
      alert("Konfirmasi password tidak cocok!");
      return;
    }

    // Cek password baru tidak boleh kosong
    if (!newPassword) {
      alert("Password baru tidak boleh kosong!");
      return;
    }

    // Panggil action Zustand
    const result = changePassword(
      oldPassword,
      newPassword,
      data.users,
    );

    if (!result.success) {
      alert(result.message);
      return;
    }

    alert(result.message);

    // Kembali ke halaman sebelumnya
    navigate(-1);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <KeyRound className="h-5 w-5" />
          </div>

          <CardTitle>Ganti Password</CardTitle>

          <CardDescription>
            Ubah password akun {user?.nama}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* PASSWORD LAMA */}
            <div className="space-y-2">
              <Label htmlFor="oldPassword">
                Password Lama
              </Label>

              <Input
                id="oldPassword"
                type="password"
                value={oldPassword}
                onChange={(e) =>
                  setOldPassword(e.target.value)
                }
                placeholder="Masukkan password lama"
                required
              />
            </div>

            {/* PASSWORD BARU */}
            <div className="space-y-2">
              <Label htmlFor="newPassword">
                Password Baru
              </Label>

              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                placeholder="Masukkan password baru"
                required
              />
            </div>

            {/* KONFIRMASI */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                Konfirmasi Password
              </Label>

              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Masukkan ulang password baru"
                required
              />
            </div>

            {/* BUTTON */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Batal
              </Button>

              <Button
                type="submit"
                className="flex-1"
              >
                Simpan Password
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default GantiPassword;