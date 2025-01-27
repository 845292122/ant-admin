export namespace AUTH {
  export type AccountInfo = {
    id?: number
    username: string
  }

  export type AuthState = {
    token: string | undefined
    accountInfo?: AccountInfo | undefined
    permissions?: Array<string>
    setToken: (token: string) => void
    setUserInfo: (info: UserInfo) => void
    setPermissions: (permissions: Array<string>) => void
  }

  export type LoginInfo = {
    username: string
    password: string
  }
}
