import service from '..'

const baseURL = '/account'

const create = (data: ApiType.Account) => service.post(`${baseURL}/create`, data)
const page = (params: ApiType.Page & ApiType.AccountSearch) =>
  service.get<ApiType.PageResult<ApiType.Account>>(`${baseURL}/page`, { params })

const accountApi = {
  create,
  page
}
export { accountApi }
