"use client"
import { useRouter } from "next/navigation"
import { useWalletStore } from "./Navbar/WalletStore"
import { UserCircleIcon } from "@heroicons/react/24/outline"

export function ProfileButton({entityType, userVerified}: {entityType: "user" | "company" | "none", userVerified: boolean}) {
  const router = useRouter()
  const { address } = useWalletStore()

  const handleProfileClick = async () => {
    if (!address) {
      alert("Please connect your wallet first")
      return
    }
    if(entityType === "none") {
      alert("This address is not registered as a user or company")
      return
    }
    router.push(`/profile?entityType=${entityType}&address=${address}`)
  }

  //TODO decide if somebody who is not in our register shuld be able to see his/her tutt* profile
  const isDisabled = !address || entityType === "none"
  
  console.log("Is disabled:", isDisabled)
  console.log("Entity type:", entityType)
  return (
    <button
      onClick={handleProfileClick}
      disabled={isDisabled}
      className={`inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white 
      ${isDisabled ? 'bg-orange-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 ${isDisabled ? 'focus:ring-orange-500' : 'focus:ring-blue-500'}`}
    >
      <UserCircleIcon className="h-5 w-5 mr-2" />
      Profile
    </button>
  )
}

