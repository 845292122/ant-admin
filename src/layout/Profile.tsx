import { Drawer } from 'antd'
import React, { useContext } from 'react'
import ProfileContext from '~/context/ProfileContext'

type ProfileProps = {}

const Profile: React.FC<ProfileProps> = () => {
  const profileContext = useContext(ProfileContext)
  if (!profileContext) throw new Error('profile context is undefined')

  const { visible, closeProfile } = profileContext

  return (
    <Drawer title="个人信息" onClose={closeProfile} open={visible}>
      个人信息
    </Drawer>
  )
}

export default Profile
