import service from '~/api/index'
import { AUTH } from '~/types/auth'

const baseURL = '/auth'

const login = (data: AUTH.LoginInfo) => service.post(`${baseURL}/login`, data)
const getInfo = (data: AUTH.LoginInfo) => service.post(`${baseURL}/login`, data)

const authApi = {
  login,
  getInfo
}

export { authApi }
