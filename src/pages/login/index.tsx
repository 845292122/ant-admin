import { createStyles } from 'antd-style'
import React from 'react'
import { AmbientLightBg } from 'react-color4bg'
import loginIll from '~/assets/login/login-ill.svg'
import LoginForm from './LoginForm'

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
    }
  }
})

const Login: React.FC = () => {
  const { styles } = useStyles()
  return (
    <div className={styles.loginContainer}>
      <AmbientLightBg
        className={styles.loginBackground}
        colors={['#007FFE', '#3099FE', '#60B2FE', '#90CCFE', '#C0E5FE', '#F0FFFE']}
        loop
        speed={1}
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
