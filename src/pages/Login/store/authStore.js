import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      error: null,

      // Menyimpan password yang sudah diubah
      passwords: {},

      // =========================
      // LOGIN MURID
      // =========================
      loginMurid: (nis, password, users) => {
        const { passwords } = get();

        const foundUser = users.find(
          (user) =>
            user.nis === nis &&
            (passwords[user.id] ?? user.password) === password &&
            user.role === "murid",
        );

        if (!foundUser) {
          set({
            error: "NIS atau password salah!",
          });

          return false;
        }

        set({
          user: {
            id: foundUser.id,
            nis: foundUser.nis,
            username: foundUser.username,
            nama: foundUser.nama,
            role: foundUser.role,
          },
          error: null,
        });

        return true;
      },

      // =========================
      // LOGIN GURU
      // =========================
      loginGuru: (username, password, users) => {
        const { passwords } = get();

        const foundUser = users.find(
          (user) =>
            user.username === username &&
            (passwords[user.id] ?? user.password) === password &&
            user.role === "guru",
        );

        if (!foundUser) {
          set({
            error: "Username atau password salah!",
          });

          return false;
        }

        set({
          user: {
            id: foundUser.id,
            username: foundUser.username,
            nama: foundUser.nama,
            role: foundUser.role,
          },
          error: null,
        });

        return true;
      },

      // =========================
      // GANTI PASSWORD
      // =========================
      changePassword: (oldPassword, newPassword, users) => {
        const { user, passwords } = get();

        if (!user) {
          return {
            success: false,
            message: "Kamu belum login!",
          };
        }

        const currentPassword =
          passwords[user.id] ??
          users.find((item) => item.id === user.id)?.password;

        if (currentPassword !== oldPassword) {
          return {
            success: false,
            message: "Password lama salah!",
          };
        }

        set({
          passwords: {
            ...passwords,
            [user.id]: newPassword,
          },
          error: null,
        });

        return {
          success: true,
          message: "Password berhasil diubah!",
        };
      },

      // =========================
      // LOGOUT
      // =========================
      logout: () => {
        set({
          user: null,
          error: null,
        });
      },
    }),
    {
      name: "auth-store",
    },
  ),
);
