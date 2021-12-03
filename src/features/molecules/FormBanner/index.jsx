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
import { BannerModel } from './validation'

const FormBanner = ({ banner, type, ...others }) => {
  const [data, setData] = useState({
    url : '',
    status: ''
  })
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const { resizeImage } = useImage()

  const contentForm = useMemo(() => {
    if (type == 'add') {
      return {
        title: 'Thêm mới thành viên',
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
          model= {bannerModel}
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

          
        </Form>
      </LayoutWrapper>
    )
  }, [data])

  useEffect(() => {
    if (!banner) return
    const expData = {
      url: withNull('url', banner),
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
