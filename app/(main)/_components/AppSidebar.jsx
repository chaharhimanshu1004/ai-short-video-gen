"use client"
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
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Gem, HomeIcon, LucideFileVideo, Search, WalletCards, Sparkles } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuthContext } from "@/app/provider"
import { cn } from "@/lib/utils"

const MenuItems = [
    {
        title: 'Home',
        url: '/dashboard',
        icon: HomeIcon
    },
    {
        title: 'Create New Video',
        url: '/create-new-video',
        icon: LucideFileVideo
    },
    {
        title: 'Explore',
        url: '/explore',
        icon: Search
    },
    {
        title: 'Billing',
        url: '/billing',
        icon: WalletCards
    }
]

function AppSidebar() {
  const path = usePathname()
  const { user } = useAuthContext()

  return (
    <Sidebar className="border-r border-gray-800 bg-gray-900/90 backdrop-blur-sm">
      <SidebarHeader className="pb-6">
        <div className="px-4 pt-6">
          <div className="flex items-center gap-3 w-full justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-white via-teal-100 to-cyan-100">
              Video Gen
            </h2>
          </div>
          <h2 className="text-sm text-gray-400 text-center mt-2">AI Short Video Generator</h2>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="mx-4 mt-4">
              <Link href={"/create-new-video"}>
                <Button className="w-full h-12 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white border-0 rounded-xl shadow-lg shadow-teal-900/20">
                  <LucideFileVideo className="mr-2 h-4 w-4" />
                  Create New Video
                </Button>
              </Link>
            </div>

            <SidebarMenu className="mt-6 px-2">
              {MenuItems.map((menu, index) => {
                const isActive = path === menu.url
                return (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                      isActive={isActive}
                      className={cn(
                        "my-1 rounded-xl transition-all duration-200",
                        isActive
                          ? "bg-gradient-to-r from-teal-500/20 to-cyan-600/20 border border-teal-500/30"
                          : "hover:bg-gray-800",
                      )}
                    >
                      <Link href={menu?.url} className="flex items-center gap-3 px-4 py-3">
                        <menu.icon className={cn("w-5 h-5", isActive ? "text-teal-400" : "text-gray-400")} />
                        <span className={cn("font-medium", isActive ? "text-white" : "text-gray-300")}>
                          {menu?.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-5 mx-4 mb-6 border border-gray-800 rounded-xl bg-gray-900/50 backdrop-blur-sm hover:border-gray-700 transition-all">
          <div className="flex items-center justify-between">
            <Gem className="text-teal-400 w-5 h-5" />
            <h2 className="text-gray-300 font-medium">{user?.credits || 0} Credits Left</h2>
          </div>
          <Link href={"/billing"} className="w-full">
            <Button className="w-full mt-3 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white border-0 rounded-xl shadow-lg shadow-teal-900/20">
              Buy More Credits
            </Button>
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar