import { Navigate, useRoutes } from 'react-router'
import Login from '~/pages/Login'

// * 导入路由
const metaRoutes = import.meta.glob('./modules/*.tsx', { eager: true })

// * 读取路由到bizRoutes
export const bizRoutes: Array<RouteType.RouteInfo> = []
Object.keys(metaRoutes).forEach(item => {
  const routes = metaRoutes[item] as Record<string, unknown>
  if (typeof routes === 'object' && routes !== null) {
    Object.keys(routes).forEach((key: string) => {
      if (Array.isArray(routes[key])) {
        bizRoutes.push(...(routes[key] as RouteType.RouteInfo[]))
      }
    })
  }
})

export const routes: RouteType.RouteInfo[] = [
  {
    path: '/login',
    element: <Login />,
    meta: {
      title: '登录',
      key: 'login'
    }
  },
  ...bizRoutes,
  {
    path: '*',
    element: <Navigate to="/404" />
  }
]

const Router = () => useRoutes(routes)

export default Router
