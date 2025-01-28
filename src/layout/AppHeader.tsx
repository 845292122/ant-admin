import { Down, Logout, MenuFoldOne, MenuUnfoldOne, PersonalPrivacy } from '@icon-park/react'
import { Avatar, Button, Dropdown, MenuProps, Typography } from 'antd'
import { createStyles } from 'antd-style'
import { useAtom } from 'jotai'
import React from 'react'
import { useNavigate } from 'react-router'
import { useRouteMeta } from '~/hooks/useRouteMeta'
import { appJotai } from '~/store'

const useStyles = createStyles(() => {
  return {
    headerContainer: {
      height: '56px',
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
      boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)'
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '10px'
    },
    actionBarContainer: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      paddingRight: '10px',
      marginRight: '10px',
      padding: '7px',
      borderRadius: '7px',
      ':hover': {
        backgroundColor: 'rgb(229 231 235 / 0.5)'
      }
    },
    actionTitle: {
      fontSize: '14px',
      fontWeight: '500'
    }
  }
})

const ActionBar: React.FC = () => {
  const { styles } = useStyles()
  const navigate = useNavigate()
  const toProfile = () => {
    navigate('/profile')
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: '个人信息',
      icon: <PersonalPrivacy theme="outline" size="16" fill="#381c1c" strokeLinecap="square" />,
      onClick: toProfile
    },
    {
      key: '4',
      icon: <Logout theme="outline" size="16" fill="#381c1c" strokeLinecap="square" />,
      label: '注销登录'
    }
  ]

  return (
    <Dropdown menu={{ items }} placement="top" trigger={['click']}>
      <div className={styles.actionBarContainer}>
        <Avatar shape="square" style={{ marginRight: '10px' }} />
        <span className={styles.actionTitle}>超级管理员</span>
        <Down theme="outline" size="16" fill="#333" strokeWidth={3} strokeLinecap="square" />
      </div>
    </Dropdown>
  )
}

const AppHeader: React.FC = () => {
  const { styles } = useStyles()
  const [collapseMenu, setCollapseMenu] = useAtom(appJotai.navCollapsedAtom)
  const routeMeta = useRouteMeta()

  const toggleCollapseMenu = () => {
    setCollapseMenu(!collapseMenu)
  }

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerLeft}>
        <Button
          type="text"
          icon={
            collapseMenu ? (
              <MenuUnfoldOne theme="outline" size="20" fill="#020202" strokeWidth={3} strokeLinecap="square" />
            ) : (
              <MenuFoldOne theme="outline" size="20" fill="#020202" strokeWidth={3} strokeLinecap="square" />
            )
          }
          onClick={toggleCollapseMenu}
        />
        <div
          style={{
            borderRadius: '0.5rem',
            height: '20px',
            width: '4px',
            marginRight: '5px',
            marginLeft: '10px',
            backgroundColor: '#1d1db7'
          }}
        />
        <Typography.Text>{routeMeta.title}</Typography.Text>
      </div>
      <div>
        <ActionBar />
      </div>
    </div>
  )
}

export default AppHeader
