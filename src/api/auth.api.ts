import service from '.'

const baseURL = '/auth'

const login = (data: ApiType.Auth.Login) => service.post<string>(`${baseURL}/login`, data)
const getInfo = () => service.get<ApiType.Auth.Info>(`${baseURL}/info`)

const authApi = {
  login,
  getInfo
}

export { authApi }
