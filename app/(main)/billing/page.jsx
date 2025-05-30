"use client"
import { useAuthContext } from "@/app/provider"
import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { useMutation } from "convex/react"
import { CircleDollarSign, CreditCard, Sparkles, AlertCircle } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

export const creditsPlans = [
  {
    credits: 10,
    cost: 1,
  },
  {
    credits: 50,
    cost: 5,
  },
  {
    credits: 100,
    cost: 9,
  },
  {
    credits: 200,
    cost: 15,
  },
  {
    credits: 500,
    cost: 30,
  },
]

function Billing() {
  const { user } = useAuthContext()
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPlanDetails, setSelectedPlanDetails] = useState(null)

  const handleBuyNowClick = (plan, index) => {
    setSelectedPlan(index)
    setSelectedPlanDetails(plan)
    setShowPaymentModal(true)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent mb-8">
        Manage Your Credits
      </h2>

      <div className="bg-slate-900/70 backdrop-blur-sm rounded-xl border border-slate-800 p-6 shadow-lg hover:shadow-teal-500/5 transition-all duration-300 max-w-3xl mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="font-bold text-xl text-white mb-1">Total Credits Available</h2>
            <p className="text-sm text-gray-400">1 Credit = 1 Video Generation</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-900/20">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h2 className="font-bold text-4xl bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
              {user?.credits || 0}
            </h2>
          </div>
        </div>
      </div>

      <p className="text-sm p-4 text-gray-400 max-w-3xl mb-8 bg-slate-800/30 rounded-lg border border-slate-700/50 backdrop-blur-sm">
        When your credit balance reaches 0, video generation will stop working. Make sure to keep your credit balance
        topped up to continue creating amazing videos.
      </p>

      <div className="mb-12">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent mb-6">
          Buy More Credits
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {creditsPlans.map((plan, index) => (
            <div
              key={index}
              className={`p-5 border rounded-xl bg-slate-900/70 backdrop-blur-sm transition-all duration-300 cursor-pointer
                                ${
                                  selectedPlan === index
                                    ? "border-teal-500 shadow-lg shadow-teal-500/10"
                                    : "border-slate-700 hover:border-teal-700/50"
                                }`}
              onClick={() => setSelectedPlan(index)}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-md">
                    <CircleDollarSign className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="font-bold text-xl text-white">{plan.credits} Credits</h2>
                </div>
                <div className="bg-slate-800 px-4 py-2 rounded-lg">
                  <span className="font-bold text-xl bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                    ${plan.cost}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <Button
                  className={`w-full py-5 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 shadow-md shadow-teal-500/10 transition-all duration-300 transform hover:scale-[1.02]
                                        ${selectedPlan !== index && "opacity-70"}`}
                  onClick={() => handleBuyNowClick(plan, index)}
                >
                  <div className="flex items-center">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Buy Now
                  </div>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900/70 backdrop-blur-sm rounded-xl border border-slate-800 p-6 shadow-lg max-w-3xl">
        <h3 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent mb-4">
          Payment History
        </h3>
        <div className="text-center py-8 text-gray-400">
          <p>Your payment history will appear here</p>
        </div>
      </div>

      {/* Payment Coming Soon Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="bg-slate-900 border border-slate-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <AlertCircle className="h-5 w-5 text-amber-400" />
              <span>Payment Gateway Coming Soon</span>
            </DialogTitle>
            <DialogDescription className="text-gray-400 pt-2">
              We're currently integrating our payment gateway. This feature will be available soon!
            </DialogDescription>
          </DialogHeader>

          {selectedPlanDetails && (
            <div className="my-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-teal-400" />
                  <span className="text-white">{selectedPlanDetails.credits} Credits</span>
                </div>
                <span className="font-bold text-teal-400">${selectedPlanDetails.cost}</span>
              </div>
            </div>
          )}

          <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-2">
            <Button
              variant="outline"
              onClick={() => setShowPaymentModal(false)}
              className="w-full border-slate-700 hover:bg-slate-800 hover:text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Billing