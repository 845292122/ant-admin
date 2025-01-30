declare namespace ApiType {
  type Auth = {
    phone: string
    password: string
  }

  type Account = {
    id: number
    contact: string
    phone: string
    password: string
    licenseNumber: string
    address: string
    bizType: number
    remark: string
    isAdmin: boolean
    trialStartDate: Date
    trialEndDate: Date
    startDate: Date
    endDate: Date
    status: number
    createdAt: Date
    updatedAt: Date
  }
}
