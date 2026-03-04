
"use client"

import * as React from "react"
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  History,
  Settings,
  Store,
  Languages,
  Users,
  ChevronRight,
  LogOut,
  User as UserIcon,
  BookOpen,
  CircleCheck,
  Clock
} from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { useLanguage } from "@/lib/store"
import { useAuth, useUser } from "@/firebase"
import { signOut } from "firebase/auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { lang, toggleLanguage, t } = useLanguage()
  const auth = useAuth()
  const { user } = useUser()

  // ใช้เวลาปัจจุบันรวมวินาทีเพื่อระบุเวอร์ชันให้ชัดเจน
  const buildTime = new Date().toLocaleTimeString('th-TH', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  })

  const navItems = [
    { name: t.dashboard, href: "/", icon: LayoutDashboard },
    { name: t.pos, href: "/pos", icon: ShoppingCart },
    { name: t.inventory, href: "/inventory", icon: Package },
    { name: t.history, href: "/history", icon: History },
    { name: t.staff, href: "/staff", icon: Users },
    { name: "คู่มือการใช้งาน", href: "/manual", icon: BookOpen },
  ]

  const handleLogout = async () => {
    await signOut(auth)
    router.push("/login")
  }

  if (pathname === "/login") return null

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="h-16 flex items-center px-6">
        <div className="flex items-center gap-2">
          <div className="bg-accent p-1.5 rounded-lg">
            <Store className="w-5 h-5 text-accent-foreground" />
          </div>
          <span className="font-headline font-bold text-xl group-data-[collapsible=icon]:hidden">SaleFlow</span>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarMenu className="px-2 py-4">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton 
                asChild 
                isActive={pathname === item.href}
                tooltip={item.name}
              >
                <Link href={item.href}>
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 space-y-4">
        <SidebarMenu>
          <SidebarMenuItem>
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="w-full">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user?.email?.charAt(0).toUpperCase() || <UserIcon />}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-semibold">{user?.displayName || user?.email?.split('@')[0]}</span>
                    <span className="truncate text-xs text-muted-foreground">Staff Member</span>
                  </div>
                  <ChevronRight className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side="bottom" align="end" sideOffset={4}>
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                     <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user?.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user?.displayName || user?.email?.split('@')[0]}</span>
                      <span className="truncate text-xs text-muted-foreground">{user?.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 size-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
          
          <SidebarMenuItem className="group-data-[collapsible=icon]:hidden">
            <div className="px-3 py-2 bg-orange-100 rounded-lg border border-orange-300 flex items-center justify-between animate-pulse">
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3 text-orange-600" />
                <span className="text-[10px] text-orange-700 font-bold">Build: {buildTime}</span>
              </div>
            </div>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton tooltip={lang === 'en' ? 'สลับเป็นภาษาไทย' : 'Switch to English'} onClick={toggleLanguage}>
              <Languages className="w-5 h-5" />
              <span>{lang === 'en' ? 'English' : 'ไทย'}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
             <SidebarMenuButton tooltip={t.settings}>
              <Settings className="w-5 h-5" />
              <span>{t.settings}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
