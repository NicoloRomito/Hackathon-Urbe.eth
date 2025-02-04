"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useWalletStore } from "./WalletStore"
import { UserIcon, BuildingOfficeIcon } from "@heroicons/react/24/outline"
import { SPIDLoginPopup } from "./SPIDLoginPopup"
import { setUserVerification } from "~~/utils/wagmi/setUserVerification"
import { setCompanyVerification } from "~~/utils/wagmi/setCompanyVerification"

interface UserInfo {
  address: string
  email: string
  name: string
  lastName: string
  codiceFiscale: string
  verified: boolean
  verifiedBy: string
}

interface CompanyInfo {
  address: string
  name: string
  verified: boolean
  pIva: string
}

type TabType = "user" | "enterprise"

export function Verify({ isVerified, onClose, onSuccess }: { isVerified: boolean; onClose: () => void; onSuccess: () => void }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("user");
  const { address } = useWalletStore();
  const [showSPIDPopup, setShowSPIDPopup] = useState(false);
  const [userForm, setUserForm] = useState<Partial<UserInfo>>({
    email: "",
    name: "",
    lastName: "",
    codiceFiscale: "",
    verified: false,
    verifiedBy: "",
  });
  const [enterpriseForm, setEnterpriseForm] = useState<Partial<CompanyInfo>>({
    address: "",
    name: "",
    verified: false,
    pIva: "",
  });

  const handleUserVerify = async () => {
    if (!address) return;
    const userVerification: UserInfo = {
      address: address!,
      email: userForm.email!,
      name: userForm.name!,
      lastName: userForm.lastName!,
      codiceFiscale: userForm.codiceFiscale!,
      verified: true,
      verifiedBy: userForm.verifiedBy!,
    };

    let result = await setUserVerification(userVerification);
    if (result) {
      onSuccess();
    } else {
      console.log("Failed to verify user");
      onClose();
    }
  };

  const handleEnterpriseVerify = async () => {
    if (!address) return;
    const companyVerification: CompanyInfo = {
      address: address!,
      name: enterpriseForm.name!,
      verified: true,
      pIva: enterpriseForm.pIva!,
    };

    let result = await setCompanyVerification(companyVerification);
    if (result) {
      onSuccess();
    } else {
      console.log("Failed to verify company");
      onClose();
    }
  };

  const handleSPIDLogin = () => {
    setShowSPIDPopup(true);
  };

  const handleSPIDLoginSuccess = async (username: string, password: string) => {
    setShowSPIDPopup(false);

    //TODO check the return data from SPID API against the data in the form

    setUserForm((prev) => ({ ...prev, verifiedBy: "SPID", verified: true }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-auto my-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-500">Verify Your Account</h2>

          <div className="flex mb-4">
            <button
              className={`flex-1 py-2 ${activeTab === "user" ? "bg-blue-600 text-white" : "bg-gray-200"} rounded-l-md transition-colors`}
              onClick={() => setActiveTab("user")}
            >
              <UserIcon className="h-5 w-5 inline-block mr-2" />
              User
            </button>
            <button
              className={`flex-1 py-2 ${activeTab === "enterprise" ? "bg-blue-600 text-white" : "bg-gray-200"} rounded-r-md transition-colors`}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={userForm.lastName}
                onChange={(e) => setUserForm((prev) => ({ ...prev, lastName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={userForm.email}
                onChange={(e) => setUserForm((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Codice Fiscale"
                value={userForm.codiceFiscale}
                onChange={(e) => setUserForm((prev) => ({ ...prev, codiceFiscale: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                onClick={handleSPIDLogin}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Login with SPID
              </button>
              {userForm.verifiedBy === "SPID" && <p className="text-green-600 font-semibold">✓ Verified by SPID</p>}
            </div>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Company Name"
                value={enterpriseForm.name}
                onChange={(e) => setEnterpriseForm((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Partita IVA"
                value={enterpriseForm.pIva}
                onChange={(e) => setEnterpriseForm((prev) => ({ ...prev, pIva: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}

          <div className="flex justify-between mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>

            <button
              onClick={activeTab === "user" ? handleUserVerify : handleEnterpriseVerify}
              disabled={isVerified}
              className={`px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 
                ${isVerified 
                  ? "bg-green-600 text-white cursor-not-allowed" 
                  : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"}`}
            >
              Verify
            </button>
          </div>
        </div>
      </div>

      {showSPIDPopup && <SPIDLoginPopup onClose={() => setShowSPIDPopup(false)} onSuccess={handleSPIDLoginSuccess} />}
    </div>
  );
}

export default Verify;
