"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

function VideoInfo({ videoData }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Card className="max-w-md mx-auto border-0 shadow-sm">
        <CardContent className="p-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-medium">{videoData?.title}</h2>
              <Badge variant="outline" className="mt-2 text-md">
                {videoData?.videoStyle}
              </Badge>
            </div>

            <Separator />

            <div>
              <p className="text-sm text-muted-foreground">Script</p>
              <p className="mt-1 text-md">{videoData?.script}</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="px-6 pb-6 pt-0">
          <Button className="w-full" onClick={() => setShowModal(true)}>
            <Download className="mr-2 h-4 w-4" />
            Export & Download
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Coming Soon</DialogTitle>
            <DialogDescription>Hold on! We're getting you this functionality for download.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="rounded-full bg-primary/10 p-3 mb-4">
              <Download className="h-6 w-6 text-primary" />
            </div>
            <p className="text-center text-sm">
              We're working on implementing secure video downloads and will have this feature available for you very
              soon. Thank you for your patience!
            </p>
          </div>
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default VideoInfo
