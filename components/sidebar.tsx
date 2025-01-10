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
import Link from 'next/link'
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
            <div className="bg-white w-full rounded-md flex items-center justify-between">

            <OrganizationSwitcher
              afterCreateOrganizationUrl={"/dashboard"}
              afterSelectOrganizationUrl="/dashboard"
              appearance={{
                elements: {
                  organizationPreviewAvatarBox: "size-6",
                },
              }}
              />

              </div>
            {/* <SidebarTrigger /> */}
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-3">
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
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
