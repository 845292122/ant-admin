import { Navigate, useLocation } from 'react-router'
import { routes, RouteType } from '..'
import { useAtomValue } from 'jotai'
import { authJotai } from '~/store'

// * 根据路由地址查找路由
export function findRoute(pathname: string, routes: Array<RouteType> = []): RouteType {
  let result: RouteType = {}
  for (const route of routes) {
    if (route.path === pathname) return route
    if (route.children) {
      const res = findRoute(pathname, route.children)
      if (Object.keys(res).length) result = res
    }
  }
  return result
}

/**
 * * 路由守卫 (授权认证校验)
 */
const AuthRouter = ({ children }: { children: JSX.Element }) => {
  const token = useAtomValue(authJotai.tokenAtom)
  const permissions = useAtomValue(authJotai.permissionsAtom)

  // * 找到当前路由的 meta 信息
  const { pathname } = useLocation()
  const route = findRoute(pathname, routes)

  // * 不需要认证,直接放行
  if (!route.meta?.requireAuth) return children

  // * 需要认证才能访问
  if (!token) {
    return <Navigate to="/login" replace />
  }

  // * 需要有权限才能访问
  if (route.meta.permission && !permissions?.includes(route.meta.permission)) {
    return <Navigate to="/403" />
  }

  return children
}

export default AuthRouter
