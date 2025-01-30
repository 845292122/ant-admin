import service from '~/api/index'

const baseURL = '/auth'

const login = (data: ApiType.Auth) => service.post(`${baseURL}/login`, data)
const getInfo = (id: number) => service.get(`${baseURL}/info/${id}`)

const authApi = {
  login,
  getInfo
}

export { authApi }
