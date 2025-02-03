import service from '.'

const baseURL = '/user'

const create = (data: ApiType.User.Info) => service.post(`${baseURL}/create`, data)
const modify = (data: ApiType.User.Info) => service.post(`${baseURL}/modify`, data)
const remove = (id: number) => service.post(`${baseURL}/remove/${id}`)
const page = (params: ApiType.Page.Param & ApiType.User.Search) =>
  service.get<ApiType.Page.Result<ApiType.User.Info>>(`${baseURL}/page`, { params })
const info = (id: number) => service.get<ApiType.User.Info>(`${baseURL}/info/${id}`)

export const userApi = {
  create,
  modify,
  remove,
  page,
  info
}
