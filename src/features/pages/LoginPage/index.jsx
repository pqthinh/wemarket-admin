import { InputGroup } from 'molecules'
import React, { useCallback, useState } from 'react'
import { useRequestManager, useToken, useUser } from 'hooks'
import { EndPoint } from 'config/api'
import { useHistory } from 'react-router-dom'
import { Routers } from 'utils'
import {
  Button,
  ButtonToolbar,
  ForgotButton,
  Form,
  Header,
  Icon,
  LayoutWrapper
} from './styled'
import { userModel } from './validation'
import { withEmpty } from 'exp-value'

const LoginPage = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const [showPassword, setShowPassword] = useState(false)

  const history = useHistory()
  const { onPostExecute } = useRequestManager()
  const { saveToken } = useToken()
  const { saveUser } = useUser()

  const onChange = useCallback(
    (name, value) => setData(prev => ({ ...prev, [name]: value })),
    [data]
  )

  const onSubmit = useCallback(() => {
    async function execute(data) {
      const result = await onPostExecute(EndPoint.LOGIN, data, false)
      if (result) {
        await saveToken(withEmpty('data.token', result))
        saveUser(result)
        history.push('/')
      }
    }
    execute(data)
  })

  const onShowPassword = useCallback(
    () => setShowPassword(!showPassword),
    [showPassword]
  )
  const onGotoForgotPassword = useCallback(
    () => history.push(Routers.FORGOT_PASSWORD),
    []
  )

  return (
    <LayoutWrapper>
      <Header subTitle='Đăng nhập' />
      <Form fluid model={userModel} onSubmit={onSubmit}>
        <InputGroup
          value={data.email}
          onChange={e => onChange('email', e)}
          placeholder={'Email'}
          name={'email'}
          leftIcon={<Icon name={'feather-user'} />}
        />
        <InputGroup
          value={data.password}
          onChange={e => onChange('password', e)}
          placeholder={'Mật khẩu'}
          name={'password'}
          type={showPassword ? 'text' : 'password'}
          leftIcon={<Icon name={'feather-lock'} />}
          rightIcon={
            <Icon
              name={showPassword ? 'feather-eye-off' : 'feather-eye'}
              background='true'
              onClick={onShowPassword}
            />
          }
        />
        <ButtonToolbar>
          <ForgotButton appearance='link' onClick={onGotoForgotPassword}>
            Quên mật khẩu?
          </ForgotButton>
          <Button type={'submit'}>ĐĂNG NHẬP</Button>
        </ButtonToolbar>
      </Form>
    </LayoutWrapper>
  )
}

export default React.memo(LoginPage)
