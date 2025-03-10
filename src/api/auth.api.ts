import service from '.'

const baseURL = '/auth'

const login = (data: ApiType.Auth.Login) => service.post<string>(`${baseURL}/login`, data)
const getInfo = (id: number) => service.get(`${baseURL}/info/${id}`)

const authApi = {
  login,
  getInfo
}

export { authApi }
