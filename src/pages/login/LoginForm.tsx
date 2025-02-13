import { Key, Phone, PhoneTwo, TencentQq, Wechat } from '@icon-park/react'
import { Button, Checkbox, Divider, Form, Input } from 'antd'
import { createStyles } from 'antd-style'
import React from 'react'

const useStyles = createStyles(() => {
  return {
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

export default LoginForm
