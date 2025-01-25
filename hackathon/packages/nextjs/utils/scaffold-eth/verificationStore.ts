import { create } from 'zustand'

interface VerificationState {
  verifications: {
    [address: string]: {
      isVerified: boolean
      isEnterprise: boolean
      details: UserInfo | CompanyInfo
    }
  }
  updateVerification: (address: string, verification: {
    isVerified: boolean
    isEnterprise: boolean
    details: UserInfo | CompanyInfo
  }) => void
}

export const useVerificationStore = create<VerificationState>((set) => ({
  verifications: {},
  updateVerification: (address, verification) => set(state => ({
    verifications: {
      ...state.verifications,
      [address]: verification
    }
  }))
}))