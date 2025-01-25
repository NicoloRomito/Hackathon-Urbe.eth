interface UserInfo{
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

export default UserInfo