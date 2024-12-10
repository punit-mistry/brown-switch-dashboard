'use client'
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, ShoppingCart, Settings, LogIn, UserPlus } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("pb-12 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Dashboard</h2>
          <div className="space-y-1">
            <Button variant={pathname === "/" ? "secondary" : "ghost"} className="w-full justify-start" asChild>
              <Link href="/">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button variant={pathname === "/user" ? "secondary" : "ghost"} className="w-full justify-start" asChild>
              <Link href="/user">
                <Users className="mr-2 h-4 w-4" />
                Users
              </Link>
            </Button>
            <Button variant={pathname === "/order" ? "secondary" : "ghost"} className="w-full justify-start" asChild>
              <Link href="/order">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Orders
              </Link>
            </Button>
            <Button variant={pathname === "/setting" ? "secondary" : "ghost"} className="w-full justify-start" asChild>
              <Link href="/setting">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
            <Button variant={pathname === "/signin" ? "secondary" : "ghost"} className="w-full justify-start" asChild>
              <Link href="/signin">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Link>
            </Button>
            <Button variant={pathname === "/signup" ? "secondary" : "ghost"} className="w-full justify-start" asChild>
              <Link href="/signup">
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

