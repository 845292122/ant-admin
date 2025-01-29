import { Key, Phone, PhoneTwo, TencentQq, Wechat } from '@icon-park/react'
import { Button, Checkbox, Divider, Form, Input } from 'antd'
import { createStyles } from 'antd-style'
import React from 'react'
import { AmbientLightBg } from 'react-color4bg'
import loginIll from '~/assets/login/login-ill.svg'

const useStyles = createStyles(() => {
  return {
    loginContainer: {
      position: 'relative',
      width: '100vw',
      height: '100vh'
    },
    loginBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0
    },
    loginBox: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    loginCard: {
      minWidth: '900px',
      minHeight: '450px',
      margin: 'auto',
      background: 'white',
      display: 'flex',
      zIndex: '999',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'
    },
    loginIll: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flex: '1',
      background:
        'linear-gradient(39deg, rgba(0, 78, 167, 1) 0%, rgba(2, 119, 252, 1) 29%, rgba(178, 214, 255, 1) 100%)'
    },
    formContainer: {
      flex: '1',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    contactAuthor: {
      display: 'flex',
      justifyContent: 'space-around'
    }
  }
})

const LoginForm: React.FC = () => {
  const { styles } = useStyles()
  return (
    <div style={{ minWidth: '300px' }}>
      <h1>欢迎使用</h1>
      <Form name="login" autoComplete="off">
        <Form.Item name="phone" rules={[{ required: true, message: '请输入手机号' }]}>
          <Input placeholder="手机号" prefix={<Phone theme="outline" size="16" fill="#333" />} />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password
            placeholder="请输入密码"
            prefix={<Key theme="outline" size="16" fill="#333" />}
          />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked" style={{ marginBottom: '1px' }}>
          <Checkbox>保持登录</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            登录
          </Button>
        </Form.Item>
      </Form>
      <Divider plain>联系作者</Divider>
      <div className={styles.contactAuthor}>
        <Wechat theme="outline" size="24" fill="#333" />
        <TencentQq theme="outline" size="24" fill="#333" />
        <PhoneTwo theme="outline" size="24" fill="#333" />
      </div>
    </div>
  )
}

const Login: React.FC = () => {
  const { styles } = useStyles()
  return (
    <div className={styles.loginContainer}>
      <AmbientLightBg
        className={styles.loginBackground}
        colors={['#007FFE', '#3099FE', '#60B2FE', '#90CCFE', '#C0E5FE', '#F0FFFE']}
        loop
      />
      <div className={styles.loginBox}>
        <div className={styles.loginCard}>
          <div className={styles.loginIll}>
            <img src={loginIll} style={{ width: '280px' }} alt="login-ill" />
          </div>
          <div className={styles.formContainer}>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
