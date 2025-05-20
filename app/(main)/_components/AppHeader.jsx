"use client"

import { useAuthContext } from "@/app/provider"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import { auth } from "@/configs/firebaseConfig"
import toast from "react-hot-toast"
import { LogOut, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

function AppHeader() {
  const { user, setUser } = useAuthContext()
  const router = useRouter()

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser(null)
        router.replace("/")
        toast.success("Signed out successfully")
      })
      .catch((error) => {
        toast.error("Error signing out, please try again")
      })
  }

  return (
    <header className="px-4 py-3 border-b flex justify-between items-center bg-background">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <h1 className="font-semibold text-lg hidden sm:block">Dashboard</h1>
      </div>

      {user && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="relative mr-4 h-8 w-8 rounded-full">
              <Avatar className="h-10 w-10 border">
                <AvatarImage src={user.pictureURL || ""} alt={user.name || "User"} />
                <AvatarFallback>
                  <User className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4 flex items-center gap-4">
              <Avatar className="h-12 w-12 border">
                <AvatarImage src={user.pictureURL || ""} alt={user.name || "User"} />
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">{user.name || "User"}</h4>
                <p className="text-xs text-muted-foreground truncate max-w-[200px]">{user.email || ""}</p>
              </div>
            </div>
            <Separator />
            <div className="p-2">
              <Button variant="ghost" className="w-full justify-start text-sm px-2 h-9" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </header>
  )
}

export default AppHeader
