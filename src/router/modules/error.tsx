import React from 'react'
import Layout from '~/layout'
import lazyLoad from '../helper/lazyLoad'

const ErrorRoutes: Array<RouteType.RouteInfo> = [
  {
    element: <Layout />,
    children: [
      {
        path: '/403',
        element: lazyLoad(React.lazy(() => import('~/pages/error/Unauthorized'))),
        meta: {
          title: '未授权',
          key: '403',
          requireAuth: true
        }
      },
      {
        path: '/404',
        element: lazyLoad(React.lazy(() => import('~/pages/error/NotFound'))),
        meta: {
          title: '页面飞走了~',
          key: '404'
        }
      }
    ]
  }
]

export default ErrorRoutes
