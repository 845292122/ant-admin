import { useLocation } from 'react-router'
import { bizRoutes } from '~/router'
import { findRoute } from '~/router/helper/authRouter'

export const useRouteMeta = (): RouteType.RouteMeta => {
  const { pathname } = useLocation()
  const route = findRoute(pathname, bizRoutes)
  const defaultMeta: RouteType.RouteMeta = {
    title: '',
    key: ''
  }
  return route?.meta || defaultMeta
}
