"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { FileText, Headset, Home, Users } from "lucide-react";
//import { usePathname } from "next/navigation";
import Link from "next/link";

import { UserButton } from "@clerk/nextjs";

export const SIDEBAR_NAVLINK = [
  {
    title: "Painel",
    url: "/",
    icon: Home,
  },
  {
    title: "Clientes",
    url: "/customers",
    icon: Users,
  },
  {
    title: "Agentes",
    url: "/agents",
    icon: Headset,
  },
  {
    title: "Empréstimos",
    url: "/loans",
    icon: FileText,
  },
];

function AppSidebar() {
  //const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row py-4 px-2 justify-center items-center">
        <h2 className="text-2xl font-semibold">Loans</h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup />
        <SidebarGroupContent className="px-2">
          <SidebarMenu>
            {SIDEBAR_NAVLINK.map((item) => {
              // const isActive = pathname === item.url;
              // console.log(isActive);
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild size="lg">
                    <Link href={item.url}>
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>

      <SidebarFooter className="w-full py-4 px-2 flex flex-row items-center">
        <UserButton />
        <p className="text-base">Perfil</p>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;

//           <SidebarMenuButton
//             size="lg"
//             className={`transition-colors duration-200 ease-in-out ${
//               isActive
//                 ? "!bg-muted-foreground/10 !text-primary font-bold shadow-sm" // Mantiene el color activo
//                 : "text-muted-foreground hover:bg-primary/10"
//             }`}
//             asChild
//           >
//             <Link
//               href={item.url}
//               className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 ease-in-out
// ${isActive ? "!text-primary" : "hover:text-primary"}`}
//             >
//               <item.icon className="w-5 h-5" />
//               <span>{item.title}</span>
//             </Link>
//           </SidebarMenuButton>
