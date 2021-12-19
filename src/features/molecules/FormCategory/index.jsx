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
import { categoryModel } from './validation'

const FormCategory = ({ customer, type, ...others }) => {
  const [data, setData] = useState({
    avatar: '',
    username: '',
    phone: '',
    email: '',
    birthday: '',
    address: '',
    uid: ''
  })
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const { resizeImage } = useImage()

  const contentForm = useMemo(() => {
    if (type == 'add') {
      return {
        title: 'Thêm mới',
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
          model={categoryModel}
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
            value={withEmpty('username', data)}
            label={'Tên thành viên'}
            onChange={value => _handleChangeCustomer('username', value)}
            placeholder={'Tên thành viên'}
            name={'username'}
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
            value={withEmpty('address', data)}
            label={'Địa chỉ'}
            onChange={value => _handleChangeCustomer('address', value)}
            placeholder={'Địa chỉ'}
            name={'address'}
            leftIcon={<Icon name={'feather-mail'} />}
            require
          />

          <InputGroup
            value={withEmpty('birthday', data)}
            label={'Sinh nhật'}
            onChange={value => _handleChangeCustomer('birthday', value)}
            placeholder={'Sinh nhật'}
            name={'birthday'}
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
      avatar: withNull('avatar', customer),
      username: withNull('username', customer),
      phone: withNull('phone', customer),
      email: withNull('email', customer),
      birthday: withNull('birthday', customer),
      address: withNull('address', customer),
      uid: withNull('uid', customer)
    }
    setData(expData)
  }, [customer])

  return loading ? _renderLoading() : _renderForm()
}

FormCategory.propTypes = {
  customer: PropTypes.object,
  setCustomer: PropTypes.func,
  type: PropTypes.string,
  setReload: PropTypes.func
}

export default React.memo(FormCategory)
