declare namespace ApiType {
  namespace Page {
    type Param = {
      page: number
      pageSize: number
    }

    type Result<T> = {
      records: T[]
      total: number
    }
  }

  namespace Auth {
    type Login = {
      phone: string
      password: string
    }

    type Info = User.Info & {}
  }

  // * 租户
  namespace Tenant {
    type Info = {
      id?: number
      contactName?: string
      contactPhone?: string
      companyName?: string
      licenseNumber?: string
      address?: string
      domain?: string
      remark?: string
      userCount?: number
      trialStartDate?: Date
      trialEndDate?: Date
      startDate?: Date
      endDate?: Date
      status?: number
      isPremium?: number
      createdAt?: Date
      updatedAt?: Date
    }

    type Search = {
      contact?: string
      company?: string
      status?: number
      type?: number
    }
  }

  // * 用户
  namespace User {
    type Info = {
      id?: number
      tenantID?: number
      username?: string
      password?: string
      contact?: string
      position?: string
      phone?: string
      isTenantAdmin?: number
      status?: number
      remark?: string
      wxId?: string
      createdAt?: Date
      updatedAt?: Date
    }
    type Search = {
      username?: string
      contact?: string
      status?: number
    }
  }

  // * 权限
  namespace Perm {
    type Info = {
      id?: number
      pId?: number
      key?: string
      name?: string
      status?: number
    }

    type Search = {
      name?: string
      status?: number
    }
  }
}
