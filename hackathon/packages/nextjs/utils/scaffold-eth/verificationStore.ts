import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface VerificationState {
  verifications: {
    [address: string]: {
      isVerified: boolean
      isEnterprise: boolean
      details?: UserInfo | CompanyInfo
    }
  }
  updateVerification: (address: string, verification: {
    isVerified: boolean
    isEnterprise: boolean
    details?: UserInfo | CompanyInfo
  }) => void
}

export const useVerificationStore = create<VerificationState>()(
  persist(
    (set) => ({
      verifications: {},
      updateVerification: (address, verification) => set(state => ({
        verifications: {
          ...state.verifications,
          [address]: verification
        }
      }))
    }),
    {
      name: 'verification-storage', // unique name for localStorage key
      // Optional: specify which parts of the state to persist
      partialize: (state) => ({ verifications: state.verifications })
    }
  )
)