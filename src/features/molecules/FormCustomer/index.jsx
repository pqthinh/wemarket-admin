import { withEmpty, withNull } from 'exp-value'
import { useImage } from 'hooks'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Constants } from 'utils'
import InputGroup from '../InputGroup'
import {
  Button,
  Form,
  Icon,
  IconAvatar,
  ImageAvatar,
  LayoutWrapper,
  Title,
  Uploader,
  Wrapper,
  WrapperAvatar,
  WrapperLoading
} from './styled'
import { customerModel } from './validation'

const FormCustomer = ({ customer, type, ...others }) => {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    ref: '',
    avatar: '',
    id: ''
  })
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const { resizeImage } = useImage()

  const contentForm = useMemo(() => {
    if (type == 'add') {
      return {
        title: 'Thêm mới khách hàng',
        titleButton: 'Thêm mới'
      }
    }
    if (type == 'update') {
      return {
        title: 'Chỉnh sửa thông tin',
        titleButton: 'Cập nhật'
      }
    }
  }, [type])

  const _handleChangeCustomer = useCallback(
    (field, value) => {
      setData(prev => ({
        ...prev,
        [field]: value
      }))
    },
    [data]
  )

  const customerRequest = useCallback((data, type) => {
    console.log(data, type, 'customer')
  }, [])

  const onSubmit = useCallback(
    data => {
      setLoading(true)
      customerRequest(data, type)
    },
    [data]
  )

  const getFileAvatar = useCallback(async e => {
    const image = await resizeImage(withEmpty('blobFile', e[e.length - 1]))
    setFile(image)
    setData(prev => ({
      ...prev,
      avatar: withEmpty('blobFile', image)
    }))
  }, [])

  const _renderAvatar = useCallback(() => {
    if (type == 'add' && !file) {
      return <ImageAvatar source={Constants.images[0].defaultAvatar} />
    }
    if (!file) return <ImageAvatar source={data.avatar} />
    return <ImageAvatar source={URL.createObjectURL(file)} />
  }, [file, data, type])

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
          <WrapperAvatar>
            {_renderAvatar()}
            <Uploader
              listType='picture'
              onChange={getFileAvatar}
              autoUpload={false}
              fileListVisible={false}
              multiple={false}
              draggable={true}
            >
              <IconAvatar name='feather-camera' size={14} />
            </Uploader>
          </WrapperAvatar>

          <InputGroup
            value={withEmpty('firstName', data)}
            label={'Tên'}
            onChange={value => _handleChangeCustomer('firstName', value)}
            placeholder={'Tên'}
            name={'firstName'}
            leftIcon={<Icon name={'feather-user'} />}
            require
          />
          <InputGroup
            value={withEmpty('lastName', data)}
            label={'Họ và tên đệm'}
            onChange={value => _handleChangeCustomer('lastName', value)}
            placeholder={'Họ và tên đệm'}
            name={'lastName'}
            leftIcon={<Icon name={'feather-user'} />}
            require
          />
          <InputGroup
            value={withEmpty('phone', data)}
            label={'Số điện thoại'}
            onChange={value => _handleChangeCustomer('phone', value)}
            placeholder={'Số điện thoại'}
            name={'phone'}
            leftIcon={<Icon name={'feather-phone'} />}
            require
          />

          <InputGroup
            value={withEmpty('email', data)}
            label={'Email'}
            onChange={value => _handleChangeCustomer('email', value)}
            placeholder={'Email'}
            name={'email'}
            leftIcon={<Icon name={'feather-mail'} />}
            require
          />

          <InputGroup
            value={withEmpty('ref', data)}
            label={'Người giới thiệu'}
            onChange={value => _handleChangeCustomer('ref', value)}
            placeholder={'Người giới thiệu'}
            name={'ref'}
            leftIcon={<Icon name={'feather-award'} />}
          />

          <Wrapper>
            <Button type={'submit'}>{contentForm.titleButton}</Button>
          </Wrapper>
        </Form>
      </LayoutWrapper>
    )
  }, [data])

  useEffect(() => {
    if (!customer) return
    const expData = {
      firstName: withNull('first_name', customer),
      lastName: withNull('last_name', customer),
      phone: withNull('phone', customer),
      email: withNull('email', customer),
      ref: withNull('ref_id', customer),
      avatar: withNull('avatar_url', customer),
      id: withNull('id', customer)
    }
    setData(expData)
  }, [customer])

  return loading ? _renderLoading() : _renderForm()
}

FormCustomer.propTypes = {
  customer: PropTypes.object,
  setCustomer: PropTypes.func,
  type: PropTypes.string,
  setReload: PropTypes.func
}

export default React.memo(FormCustomer)
