
"use client"

import * as React from "react"
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  History,
  Settings,
  Store,
  Languages
} from "lucide-react"
import { usePathname } from "next/navigation"
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

export function AppSidebar() {
  const pathname = usePathname()
  const { lang, toggleLanguage, t } = useLanguage()

  const navItems = [
    { name: t.dashboard, href: "/", icon: LayoutDashboard },
    { name: t.pos, href: "/pos", icon: ShoppingCart },
    { name: t.inventory, href: "/inventory", icon: Package },
    { name: t.history, href: "/history", icon: History },
  ]

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
      <SidebarFooter className="p-4 space-y-2">
        <SidebarMenu>
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
