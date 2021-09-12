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

// const fakedata = {
//   data: {
//     v1AdminSignIn: {
//       data: {
//         token:
//           'TXV2RXdPdTNUbnk2T29uN1pFYTBRR3Z4ZlJkTnVIVFM3M1NvOUI3RmVQRlZqckJPajZXWFgySTlobzN4WHhTalQwR2FQU2wxVGsyNUhyMEFZZ0h3Y1E9PS0tTjNPaFRQd25oVG5EUE8wc1pCUVB0QT09--35d1d53e408dc617b3e1aa6203475f6dff595f9c',
//         user: {
//           id: 'QmFzZU5vZGUtMw==',
//           avatar_url:
//             'https://storage.googleapis.com/bidma-staging/uploads/user/avatar/3/003.jpg',
//           email: 'user-2@example.com',
//           first_name: 'Agustina',
//           last_name: "O'Hara",
//           full_name: "O'Hara Agustina",
//           phone: '294-437-9281',
//           role: 'admin',
//           user_type: 'normal',
//           address: 'hanoi',
//           last_sign_in_at: '2021-09-12 15:08:33 UTC',
//           __typename: 'User'
//         },
//         __typename: 'Authorized'
//       },
//       __typename: 'AdminSignInPayload'
//     }
//   },
//   errors: null,
//   message: 'Fetch Data Success!'
// }

const LoginPage = () => {
  const [data, setData] = useState({
    username: '',
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
    console.log(data)
    async function execute(data) {
      const result = await onPostExecute(EndPoint.LOGIN, data)
      console.log(result, 'login')
      if (result) {
        await saveToken(withEmpty('accessToken', result))
        saveUser(result)
        history.push('/')
      }
    }
    execute(data)
  }, [data])

  const onShowPassword = useCallback(
    () => setShowPassword(!showPassword),
    [showPassword]
  )
  const onGotoForgotPassword = useCallback(
    () => history.push(Routers.FORGOT_PASSWORD_PAGE),
    []
  )

  return (
    <LayoutWrapper>
      <Header title='BIDMA portal' subTitle='Đăng nhập' />
      <Form fluid model={userModel} onSubmit={onSubmit}>
        <InputGroup
          value={data.username}
          onChange={e => onChange('username', e)}
          placeholder={'Tên đăng nhập'}
          name={'username'}
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
