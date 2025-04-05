import BizRoutes from '~/router/routes'

type PermissionNode = {
  key: string
  title: string
  icon?: string
  children?: PermissionNode[]
}

export function generatePermission(routes: RouteType.RouteInfo[]): PermissionNode[] {
  return routes.flatMap(route => {
    if (route.children) {
      const children = generatePermission(route.children)
      if (children.length > 0 && route.meta?.key) {
        return [
          {
            key: route.meta.key,
            title: route.meta.title,
            children
          }
        ]
      }
      return children
    }
    if (route.meta?.perm) {
      return [
        {
          key: route.meta.key,
          title: route.meta.title
        }
      ]
    }
    return []
  })
}

export function generatePermissionByBizRoutes(): PermissionNode[] {
  return generatePermission(BizRoutes)
}
