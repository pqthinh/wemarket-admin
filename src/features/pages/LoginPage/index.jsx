import { InputGroup } from 'molecules'
import React, { useCallback, useState } from 'react'
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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })

  const history = useHistory()

  const onChangeUsername = useCallback(v => setUsername(v), [username])
  const onChangePassword = useCallback(v => setPassword(v), [password])

  const onSubmit = useCallback(() => {
    console.log(username, password)
  }, [username, password])

  const onShowPassword = useCallback(
    () => setValues({ ...values, showPassword: !values.showPassword }),
    [values]
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
          value={username}
          onChange={onChangeUsername}
          placeholder={'Tên đăng nhập'}
          name={'username'}
          leftIcon={<Icon name={'feather-user'} />}
        />
        <InputGroup
          value={password}
          onChange={onChangePassword}
          placeholder={'Mật khẩu'}
          name={'password'}
          type={values.showPassword ? 'text' : 'password'}
          leftIcon={<Icon name={'feather-lock'} />}
          rightIcon={
            <Icon
              name={values.showPassword ? 'feather-eye-off' : 'feather-eye'}
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
