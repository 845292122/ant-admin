import AppLayout from '~/layout'
import Home from '~/pages/Home'
import { HomeTwo, SettingTwo } from '@icon-park/react'
import React from 'react'
import lazyLoad from './helper/lazyLoad'

const BizRoutes: RouteType.RouteInfo[] = [
  // * 通用路由
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
        meta: {
          title: '首页',
          key: '/',
          requireAuth: true,
          perm: 'home',
          icon: <HomeTwo theme="outline" size="18" strokeLinecap="square" />
        }
      },
      {
        path: '/profile',
        element: lazyLoad(React.lazy(() => import('~/pages/Profile'))),
        meta: {
          title: '个人中心',
          key: '/profile',
          requireAuth: true,
          perm: 'profile',
          icon: <HomeTwo theme="outline" size="18" strokeLinecap="square" />
        }
      }
    ]
  },

  // * 系统业务路由
  {
    element: <AppLayout />,
    meta: {
      key: '/system',
      title: '系统管理',
      requireAuth: true,
      perm: 'system',
      icon: <SettingTwo theme="outline" size="18" strokeLinecap="square" />
    },
    children: [
      {
        path: '/system/tenant',
        element: lazyLoad(React.lazy(() => import('~/pages/system/Tenant'))),
        meta: {
          title: '租户管理',
          key: '/system/tenant',
          requireAuth: true,
          perm: 'system:tenant'
        }
      },
      {
        path: '/system/user',
        element: lazyLoad(React.lazy(() => import('~/pages/system/User'))),
        meta: {
          title: '用户管理',
          key: '/system/user',
          requireAuth: true,
          perm: 'system:user'
        }
      },
      {
        path: '/system/perm',
        element: lazyLoad(React.lazy(() => import('~/pages/system/Perm'))),
        meta: {
          title: '权限管理',
          key: '/system/perm',
          requireAuth: true,
          perm: 'system:perm'
        }
      },
      {
        path: '/system/log',
        element: lazyLoad(React.lazy(() => import('~/pages/system/OperLog'))),
        meta: {
          title: '操作日志',
          key: '/system/log',
          requireAuth: true,
          perm: 'system:log'
        }
      }
    ]
  },

  // * 错误页面路由
  {
    element: <AppLayout />,
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

export default BizRoutes
