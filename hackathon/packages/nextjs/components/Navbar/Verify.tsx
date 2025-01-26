"use client"

import { useState } from "react"
import { useWalletStore } from "./WalletStore"
import { UserIcon, BuildingOfficeIcon } from "@heroicons/react/24/outline"
import { SPIDLoginPopup } from "./SPIDLoginPopup"

interface UserInfo {
  address: string
  email: string
  name: string
  lastName: string
  codiceFiscale: string
  verified: boolean
  verifiedBy: string
  createdAt: Date
  updatedAt: Date
}

interface CompanyInfo {
  address: string
  name: string
  verified: boolean
  pIva: string
  createdAt: Date
  updatedAt: Date
}

type TabType = "user" | "enterprise"

export function Verify() {
  const [showPopup, setShowPopup] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>("user")
  const { address } = useWalletStore()
  const [showSPIDPopup, setShowSPIDPopup] = useState(false)

  // User form state
  const [userForm, setUserForm] = useState<Partial<UserInfo>>({
    email: "",
    name: "",
    lastName: "",
    codiceFiscale: "",
    verified: false,
    verifiedBy: "",
  })

  // Enterprise form state
  const [enterpriseForm, setEnterpriseForm] = useState<Partial<CompanyInfo>>({
    address: "",
    name: "",
    verified: false,
    pIva: "",
  })

  const handleUserVerify = async () => {
    if (!address) return

    const userVerification: UserInfo = {
      address,
      email: userForm.email || "",
      name: userForm.name || "",
      lastName: userForm.lastName || "",
      codiceFiscale: userForm.codiceFiscale || "",
      verified: true,
      verifiedBy: userForm.verifiedBy || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    try {
      const response = await fetch("http://localhost:3002/register/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userVerification),
      })

      if (response.ok) {
        alert("User registered successfully")
        setShowPopup(false)
      } else {
        alert("User registration failed")
      }
    } catch (error) {
      console.error("Error registering user:", error)
      alert("An error occurred while registering the user")
    }
  }

  const handleEnterpriseVerify = async () => {
    if (!address) return

    const enterpriseVerification: CompanyInfo = {
      address,
      name: enterpriseForm.name || "",
      verified: true,
      pIva: enterpriseForm.pIva || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    try {
      const response = await fetch("http://localhost:3002/register/company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enterpriseVerification),
      })

      if (response.ok) {
        alert("Company registered successfully")
        setShowPopup(false)
      } else {
        alert("Company registration failed")
      }
    } catch (error) {
      console.error("Error registering company:", error)
      alert("An error occurred while registering the company")
    }
  }

  const handleSPIDLogin = () => {
    setShowSPIDPopup(true)
  }

  const handleSPIDLoginSuccess = () => {
    setShowSPIDPopup(false)
    setUserForm((prev) => ({ ...prev, verifiedBy: "SPID" }))
  }

  return (
    <>
      <button
        onClick={() => setShowPopup(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Verify
      </button>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Verify Your Account</h2>

              <div className="flex mb-4">
                <button
                  className={`flex-1 py-2 ${activeTab === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                  onClick={() => setActiveTab("user")}
                >
                  <UserIcon className="h-5 w-5 inline-block mr-2" />
                  User
                </button>
                <button
                  className={`flex-1 py-2 ${activeTab === "enterprise" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                  onClick={() => setActiveTab("enterprise")}
                >
                  <BuildingOfficeIcon className="h-5 w-5 inline-block mr-2" />
                  Enterprise
                </button>
              </div>

              {activeTab === "user" ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={userForm.name}
                    onChange={(e) => setUserForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={userForm.lastName}
                    onChange={(e) => setUserForm((prev) => ({ ...prev, lastName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={userForm.email}
                    onChange={(e) => setUserForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Codice Fiscale"
                    value={userForm.codiceFiscale}
                    onChange={(e) => setUserForm((prev) => ({ ...prev, codiceFiscale: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <button
                    onClick={handleSPIDLogin}
                    className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    Login with SPID
                  </button>
                  {userForm.verifiedBy === "SPID" && <p className="text-green-500">Verified by SPID</p>}
                </div>
              ) : (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={enterpriseForm.name}
                    onChange={(e) => setEnterpriseForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Partita IVA"
                    value={enterpriseForm.pIva}
                    onChange={(e) => setEnterpriseForm((prev) => ({ ...prev, pIva: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              )}

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={activeTab === "user" ? handleUserVerify : handleEnterpriseVerify}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Verify
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSPIDPopup && <SPIDLoginPopup onClose={() => setShowSPIDPopup(false)} onSuccess={handleSPIDLoginSuccess} />}
    </>
  )
}