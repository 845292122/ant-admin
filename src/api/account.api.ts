import service from '.'

const baseURL = '/account'

const create = (data: ApiType.Account) => service.post(`${baseURL}/create`, data)
const modify = (data: ApiType.Account) => service.post(`${baseURL}/modify`, data)
const remove = (id: number) => service.post(`${baseURL}/remove/${id}`)
const page = (params: ApiType.Page & ApiType.AccountSearch) =>
  service.get<ApiType.PageResult<ApiType.Account>>(`${baseURL}/page`, { params })
const info = (id: number) => service.get<ApiType.Account>(`${baseURL}/info/${id}`)

const accountApi = {
  create,
  modify,
  remove,
  page,
  info
}
export { accountApi }
