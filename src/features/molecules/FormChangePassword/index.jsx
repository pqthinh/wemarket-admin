import { withEmpty } from 'exp-value'
import PropTypes from 'prop-types'
import React, { useCallback, useMemo, useState } from 'react'
import InputGroup from '../InputGroup'
import {
  Button,
  Form,
  Icon,
  LayoutWrapper,
  Title,
  Wrapper,
  WrapperLoading
} from './styled'
import { customerModel } from './validation'

const FormChangePassword = ({ type, id, ...others }) => {
  const [data, setData] = useState({
    old_password: '',
    password: '',
    confirmed_password: '',
    id: id
  })
  const [loading, setLoading] = useState(false)

  const changePasswordUser = useCallback(
    data => {
      setLoading(true)
      console.log(data)
    },
    [data]
  )

  const contentForm = useMemo(() => {
    if (type == 'change-password-user') {
      return {
        title: 'Thay đổi mật khẩu cho khách hàng',
        titleButton: 'Xác nhận'
      }
    }
    if (type == 'change-password-admin') {
      return {
        title: 'Cập nhật mật khẩu',
        titleButton: 'Cập nhật'
      }
    }
  }, [type])

  const _handleChangeData = useCallback(
    (field, value) => {
      setData(prev => ({
        ...prev,
        [field]: value
      }))
    },
    [data]
  )

  const onSubmit = useCallback(
    data => {
      changePasswordUser(data)
    },
    [data]
  )

  const _renderLoading = useCallback(() => {
    return <WrapperLoading />
  }, [loading])

  const _renderForm = useCallback(() => {
    return (
      <LayoutWrapper>
        <Form
          fluid
          {...others}
          model={customerModel}
          onSubmit={() => onSubmit(data)}
          formValue={data}
        >
          <Title>{contentForm.title}</Title>

          <InputGroup
            value={withEmpty('password', data)}
            label={'Mật khẩu'}
            onChange={value => _handleChangeData('password', value)}
            placeholder={'Nhập mật khẩu'}
            name={'password'}
            leftIcon={<Icon name={'feather-key'} />}
            require
          />
          <InputGroup
            value={withEmpty('confirmed_password', data)}
            label={'Xác nhận mật khẩu'}
            onChange={value => _handleChangeData('confirmed_password', value)}
            placeholder={'Xác nhận mật khẩu'}
            name={'confirmed_password'}
            leftIcon={<Icon name={'feather-lock'} />}
            require
          />

          <Wrapper>
            <Button type={'submit'}>{contentForm.titleButton}</Button>
          </Wrapper>
        </Form>
      </LayoutWrapper>
    )
  }, [data])

  return loading ? _renderLoading() : _renderForm()
}

FormChangePassword.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string.isRequired
}

export default React.memo(FormChangePassword)
