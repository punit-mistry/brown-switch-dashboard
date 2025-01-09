// 'use client'
// import React, { useState } from 'react'
// import Link from "next/link"
// import { usePathname } from 'next/navigation'
// import { LayoutDashboard, Users, ShoppingCart, Settings, LogIn, UserPlus, ChevronRight, ChevronLeft,BookCheck  } from 'lucide-react'

// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"

// export function Sidebar() {
//   const pathname = usePathname()
//   const [isCollapsed, setIsCollapsed] = useState(false)

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed)
//   }

//   const sidebarItems = [
//     { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
//     // { href: "/user", icon: Users, label: "Users" },
//     { href: "/order-form", icon: BookCheck , label: "Order Form" },
//     { href: "/order", icon: ShoppingCart, label: "Orders" },
//     { href: "/setting", icon: Settings, label: "Settings" },
//     // { href: "/signin", icon: LogIn, label: "Sign In" },
//     // { href: "/signup", icon: UserPlus, label: "Sign Up" }
//   ]

//   return (
//     <div
//       key={isCollapsed ? 'collapsed' : 'expanded'} // Force re-render
//       className={cn(
//         "pb-12 min-h-screen transition-all duration-300 ease-in-out ",
//         isCollapsed ? "w-16 max-w-16" : "w-64 max-w-64",
//       )}
//     >
//       <div className="space-y-4 py-4 relative h-full">
//         <div
//           className={cn("absolute -right-3 top-2 bg-black rounded-full hover:cursor-pointer flex items-center justify-center z-50",isCollapsed ?" right-[30%]":'-right-3' )}

//           onClick={toggleSidebar}
//         >
//           {isCollapsed ? (
//             <ChevronRight className="h-6 w-6 text-white dark:text-gray-400" />
//           ) : (
//             <ChevronLeft className="h-6 w-6 text-white dark:text-gray-400" />
//           )}
//         </div>

//         {!isCollapsed && (
//           <h2 className="mb-2 px-4 text-lg font-semibold">Dashboard</h2>
//         )}

//         <div className="space-y-1">
//           {sidebarItems.map((item) => (
//             <Button
//               key={item.href}
//               variant={pathname === item.href ? "secondary" : "ghost"}
//               className={cn(
//                 "w-full justify-start transition-all duration-300",
//                 isCollapsed ? "p-0 justify-center" : ""
//               )}
//               asChild
//             >
//               <Link href={item.href}>
//                 <item.icon className={cn(
//                   "h-4 w-4",
//                   isCollapsed ? "mr-0 my-4" : "mr-2"
//                 )} />
//                 {!isCollapsed && item.label}
//               </Link>
//             </Button>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

import {
  BookCheck,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  UserRoundPen ,
  Archive
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { OrganizationSwitcher } from "@clerk/nextjs";

// Menu items.
const sidebarItems = [
  { url: "/dashboard", icon: LayoutDashboard, title: "Dashboard" },
  { url: "/order-form", icon: BookCheck, title: "Order Form" },
  { url: "/order", icon: ShoppingCart, title: "Orders" },
  { url: "/inventory", icon: Archive, title: "Inventory" },
  { url: "/setting", icon: Settings, title: "Settings" },
  { url: "/profile", icon: UserRoundPen, title: "Profile" },
];

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <OrganizationSwitcher
              afterCreateOrganizationUrl={"/dashboard"}
              afterSelectOrganizationUrl="/dashboard"
              appearance={{
                elements: {
                  organizationPreviewAvatarBox: "size-6",
                },
              }}
            />

            {/* <SidebarTrigger /> */}
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-3">
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
