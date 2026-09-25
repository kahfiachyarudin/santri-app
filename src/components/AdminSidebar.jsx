import { NavLink } from 'react-router';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';

import {
  GraduationCap,
  Home,
  Info,
  Users,
  ClipboardCheck,
  BookOpen,
  LayoutDashboard,
  CircleCheck,
} from 'lucide-react';

const menuGroups = [
  {
    label: 'Menu Utama',
    items: [
      {
        to: '/admin',
        label: 'Dashboard',
        icon: LayoutDashboard,
        end: true,
      },
    ],
  },
  {
    label: 'Manajemen Santri',
    items: [
      {
        to: '/admin/santri',
        label: 'Daftar Santri',
        icon: Users,
      },
      {
        to: '/admin/nilai',
        label: 'Nilai Santri',
        icon: BookOpen,
      },
      {
        to: '/admin/absensi',
        label: 'Absensi',
        icon: ClipboardCheck,
      },
    ],
  },
  {
    label: 'Lainnya',
    items: [
      {
        to: '/admin/about',
        label: 'Tentang Aplikasi',
        icon: Info,
      },
    ],
  },
];

function AdminSidebar() {
  return (
    <Sidebar>

      {/* HEADER */}
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-3 px-2 py-3">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary shadow-sm">
            <GraduationCap
              size={19}
              className="text-sidebar-primary-foreground"
            />
          </div>

          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-bold text-sidebar-foreground">
              SantriApp
            </span>

            <span className="truncate text-[11px] text-sidebar-foreground/50">
              Manajemen Santri
            </span>
          </div>

        </div>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent className="py-3">

        {menuGroups.map((group) => (
          <SidebarGroup key={group.label}>

            <SidebarGroupLabel className="px-3 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">
              {group.label}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>

                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <SidebarMenuItem key={item.to}>

                      <NavLink
                        to={item.to}
                        end={item.end}
                        className="block w-full"
                      >
                        {({ isActive }) => (
                          <SidebarMenuButton
                            isActive={isActive}
                            tooltip={item.label}
                            className="h-9 gap-3 px-3"
                          >
                            <Icon size={17} />

                            <span className="text-sm">
                              {item.label}
                            </span>
                          </SidebarMenuButton>
                        )}
                      </NavLink>

                    </SidebarMenuItem>
                  );
                })}

              </SidebarMenu>
            </SidebarGroupContent>

          </SidebarGroup>
        ))}

      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="border-t">

        <div className="rounded-lg bg-sidebar-accent/50 px-3 py-2.5">

          <div className="flex items-center gap-2">

            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500/10">
              <CircleCheck
                size={15}
                className="text-green-500"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-medium">
                Sistem Aktif
              </span>

              <span className="text-[10px] text-sidebar-foreground/50">
                Semua layanan berjalan normal
              </span>
            </div>

          </div>

        </div>

        <div className="px-2 pb-1 pt-1 text-center text-[10px] text-sidebar-foreground/40">
          © {new Date().getFullYear()} SantriApp
        </div>

      </SidebarFooter>

    </Sidebar>
  );
}

export default AdminSidebar;