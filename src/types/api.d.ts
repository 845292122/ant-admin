declare namespace ApiType {
  type Page = {
    pageNo: number
    pageSize: number
  }

  type PageResult<T> = {
    records: T[]
    total: number
  }

  type Auth = {
    phone: string
    password: string
  }

  type Account = {
    id?: number
    contact?: string
    phone?: string
    password?: string
    licenseNumber?: string
    address?: string
    bizType?: number
    remark?: string
    isAdmin?: boolean
    trialStartDate?: Date
    trialEndDate?: Date
    startDate?: Date
    endDate?: Date
    status?: number
    createdAt?: Date
    updatedAt?: Date
  }

  type AccountSearch = {
    contact?: string
    company?: string
    status?: number
    bizType?: number
  }
}
