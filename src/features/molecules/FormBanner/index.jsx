import { withEmpty, withNull, withObject } from 'exp-value'
import { useImage } from 'hooks'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { InputPicker } from 'rsuite'
import { Constants } from 'utils'
import InputGroup from '../InputGroup'
import {
  Button,
  Drag,
  DragText,
  Form,
  Icon,
  Image,
  LayoutWrapper,
  Title,
  Wrapper,
  WrapperLoading
} from './styled'
import { bannerModel } from './validation'

const FormBanner = ({ banner, type, ...others }) => {
  const [data, setData] = useState({
    url: '',
    status: '',
    file: null
  })
  const [loading, setLoading] = useState(false)
  const { resizeImage } = useImage()

  const contentForm = useMemo(() => {
    if (type == 'add') {
      return {
        title: 'Thêm ảnh banner',
        titleButton: 'Thêm mới'
      }
    }
    if (type == 'update') {
      return {
        title: 'Chỉnh sửa',
        titleButton: 'Cập nhật'
      }
    }
  }, [type])

  const _handleChangeBanner = useCallback(
    (field, value) => {
      setData(prev => ({
        ...prev,
        [field]: value
      }))
    },
    [data]
  )

  const bannerRequest = useCallback((data, type) => {
    console.log(data, type, 'banner')
  }, [])

  const onSubmit = useCallback(
    data => {
      setLoading(true)
      bannerRequest(data, type)
    },
    [data]
  )

  const _handleChangeImage = useCallback(async e => {
    const image = await resizeImage(withEmpty('blobFile', e[e.length - 1]))
    setData(prev => ({
      ...prev,
      url: withEmpty('blobFile', image),
      file: withEmpty('blobFile', image)
    }))
  }, [])

  const _renderLoading = useCallback(() => {
    return <WrapperLoading />
  }, [loading])

  const _renderForm = useCallback(() => {
    return (
      <LayoutWrapper>
        <Form
          fluid
          {...others}
          model={bannerModel}
          onSubmit={() => onSubmit(data)}
          formValue={data}
        >
          <Title>{contentForm.title}</Title>
          <Drag
            draggable
            onChange={e => _handleChangeImage(e[e.length - 1])}
            autoUpload={false}
          >
            {data.image || data.file ? (
              <Image
                source={
                  (data.file &&
                    URL.createObjectURL(withObject('file', data))) ||
                  data.url
                }
              />
            ) : (
              <DragText>Tải ảnh lên ...</DragText>
            )}
          </Drag>
          <InputGroup
            value={withEmpty('type', data)}
            label={'Chọn kiểu banner'}
            onChange={value => _handleChangeBanner('type', value)}
            placeholder={'Chọn kiểu banner'}
            name={'type'}
            leftIcon={<Icon name={'feather-type'} />}
            accepter={InputPicker}
            data={Constants.dataBanner}
            fluid
            require
          />
          <InputGroup
            value={withEmpty('description', data)}
            label={'Mô tả'}
            onChange={value => _handleChangeBanner('description', value)}
            placeholder={'Mô tả'}
            name={'description'}
            leftIcon={<Icon name={'feather-figma'} />}
            require
          />
          <Wrapper>
            <Button type={'submit'}>{contentForm.titleButton}</Button>
          </Wrapper>
        </Form>
      </LayoutWrapper>
    )
  }, [data])

  useEffect(() => {
    if (!banner) return
    const expData = {
      url: withNull('url', banner)
    }
    setData(expData)
  }, [banner])

  return loading ? _renderLoading() : _renderForm()
}

FormBanner.propTypes = {
  banner: PropTypes.object,
  setBanner: PropTypes.func,
  type: PropTypes.string,
  setReload: PropTypes.func
}

export default React.memo(FormBanner)
