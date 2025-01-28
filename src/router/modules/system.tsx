import AppLayout from '~/layout'
import { RouteType } from '..'
import { SettingTwo } from '@icon-park/react'
import lazyLoad from '../helper/lazyLoad'
import React from 'react'

const SystemRoutes: RouteType[] = [
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
        path: '/system/account',
        element: lazyLoad(React.lazy(() => import('~/pages/system/Account'))),
        meta: {
          title: '账户管理',
          key: '/system/account',
          requireAuth: true,
          perm: 'system:account'
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
  }
]

export default SystemRoutes
