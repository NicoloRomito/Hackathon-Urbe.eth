"use client"

import { useState } from "react"
import { Tabs, Tab } from "@heroui/react"
import { CheckIcon } from "@heroicons/react/24/solid"
import { useWalletStore } from './WalletStore'
import { useVerificationStore } from "../../utils/scaffold-eth/verificationStore"
import "../../styles/Verify.css"

interface UserInfo {
    address: string, 
    email: string,
    name: string,
    lastName: string,
    codiceFiscale: string
    verified: boolean,
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
    const { verifications, updateVerification } = useVerificationStore()

    // User form state
    const [userForm, setUserForm] = useState<Partial<UserInfo>>({
        email: '',
        name: '',
        lastName: '',
        codiceFiscale: '',
		verified: false,
		verifiedBy: ''		
    })

    // Enterprise form state
    const [enterpriseForm, setEnterpriseForm] = useState<Partial<CompanyInfo>>({
		address: '',
		name: '',
		verified: false,
		pIva: ''

    })

    const handleUserVerify = async () => {
        if (!address) return

        const userVerification: UserInfo = {
            address,
            email: userForm.email || '',
            name: userForm.name || '',
            lastName: userForm.lastName || '',
            codiceFiscale: userForm.codiceFiscale || '',
            verified: true,
            verifiedBy: 'SPID',
            createdAt: new Date(),
            updatedAt: new Date()
        }

        updateVerification(address, {
            isVerified: true,
            isEnterprise: false,
            details: userVerification
        })
		console.log("no json", userVerification)

		console.log(JSON.stringify(userVerification));

		let res = await fetch('http://localhost:3002/register/user', {
			method: 'POST',
			headers: {
				
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userVerification)
		})

		if(res.ok) 
			{
				alert("Company registered successfully")
				setShowPopup(false)
			}
			else
			{
				alert("Company registration failed")
			}
    }

    const handleEnterpriseVerify = async () => {
        if (!address) return

        const enterpriseVerification: CompanyInfo = {
            address,
            name: enterpriseForm.name || '',
            verified: true,
            pIva: enterpriseForm.pIva || '',
            createdAt: new Date(),
            updatedAt: new Date()
        }

        updateVerification(address, {
            isVerified: true,
            isEnterprise: true,
            details: enterpriseVerification
        })


	
		let res = await  fetch('http://localhost:3002/register/company', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(enterpriseVerification)
		})

		if(res.ok) 
		{
			alert("Company registered successfully")
        	setShowPopup(false)
		}
		else
		{
			alert("Company registration failed")
		}
    }

    return (
        <>
            <button
                onClick={() => setShowPopup(true)}
                className={`verify-button ${
                    verifications[address || '']?.isVerified 
                    ? "verify-button-verified" 
                    : "verify-button-unverified"
                }`}
                disabled={verifications[address || '']?.isVerified}
            >
                {verifications[address || '']?.isVerified 
                    ? <CheckIcon className="h-5 w-5" aria-hidden="true" /> 
                    : "Verify"}
            </button>

            {showPopup && (
                <div className="verification-popup">
                    <div className="verification-modal">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Verify Your Account</h2>

                        <Tabs 
                            variant="bordered" 
                            selectedKey={activeTab} 
                            onSelectionChange={(key) => setActiveTab(key as TabType)}
                            className="verification-tabs"
                        >
                            <Tab key="user" title="User">
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        value={userForm.name}
                                        onChange={(e) => setUserForm(prev => ({...prev, name: e.target.value}))}
                                        className="verification-input"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        value={userForm.lastName}
                                        onChange={(e) => setUserForm(prev => ({...prev, lastName: e.target.value}))}
                                        className="verification-input"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={userForm.email}
                                        onChange={(e) => setUserForm(prev => ({...prev, email: e.target.value}))}
                                        className="verification-input"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Codice Fiscale"
                                        value={userForm.codiceFiscale}
                                        onChange={(e) => setUserForm(prev => ({...prev, codiceFiscale: e.target.value}))}
                                        className="verification-input"
                                    />
                                    <input
                                        type="address"
                                        placeholder={address || "Wallet Address"}
                                        value={address || ''}
                                        readOnly
                                        className="verification-input"
                                    />
                                </div>
                            </Tab>
                            <Tab key="enterprise" title="Enterprise">
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Company Name"
                                        value={enterpriseForm.name}
                                        onChange={(e) => setEnterpriseForm(prev => ({...prev, name: e.target.value}))}
                                        className="verification-input"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Partita IVA"
                                        value={enterpriseForm.pIva}
                                        onChange={(e) => setEnterpriseForm(prev => ({...prev, pIva: e.target.value}))}
                                        className="verification-input"
                                    />
                                    <input
                                        type="address"
                                        placeholder={address || "Wallet Address"}
                                        value={address || ''}
                                        readOnly
                                        className="verification-input"
                                    />
                                </div>
                            </Tab>
                        </Tabs>

                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => setShowPopup(false)}
                                className="verification-cancel-button"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={activeTab === 'user' ? handleUserVerify : handleEnterpriseVerify}
                                className="verification-send-button"
                            >
                                Verify
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}