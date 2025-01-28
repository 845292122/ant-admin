import Home from '~/pages/Home'
import { RouteType } from '..'
import AppLayout from '~/layout'
import { HomeTwo } from '@icon-park/react'
import lazyLoad from '../helper/lazyLoad'
import React from 'react'

const CommonRoutes: RouteType[] = [
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
  }
]

export default CommonRoutes
