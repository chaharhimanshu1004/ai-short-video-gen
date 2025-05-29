"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Authentication from "./Authentication"
import { useAuthContext } from "../provider"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

function Header() {
  const { user } = useAuthContext()

  return (
    <div className="py-6 px-6 md:px-10 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl p-2 shadow-lg shadow-teal-900/20">
          <Image src={"/logo.svg"} alt="logo" width={30} height={30} className="relative z-10" />
          <div className="absolute inset-0 bg-black/20 rounded-xl blur-sm -z-0"></div>
        </div>
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-teal-100 to-amber-100">
          Video Gen
        </h2>
      </div>

      <div>
        {!user ? (
          <Authentication>
            <Button className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 border-0 rounded-xl shadow-lg shadow-teal-900/20 px-5">
              Get Started
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Authentication>
        ) : (
          <div className="flex items-center gap-4">
            <Link href={"/dashboard"}>
              <Button className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 border-0 rounded-xl shadow-lg shadow-teal-900/20">
                Dashboard
              </Button>
            </Link>
            {user?.pictureURL && (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full blur-sm opacity-70"></div>
                <Image
                  src={user.pictureURL || "/placeholder.svg"}
                  alt="userImage"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-gray-800 relative z-10"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
