import { EndPoint } from 'config/api'
import { withEmpty, withNull } from 'exp-value'
import { useRequestManager } from 'hooks'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
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
  PickerInput,
  Title,
  Wrapper,
  WrapperLoading
} from './styled'
import { bannerModel } from './validation'
import { uploadImage } from 'utils/Helpers'

const FormBanner = ({ banner, type, setReload, ...others }) => {
  const [data, setData] = useState({
    url: '',
    status: '',
    file: null
  })
  const [loading, setLoading] = useState(false)
  const { onPostExecute } = useRequestManager()

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
    async function execute(data) {
      let endPoint =
        type == 'add' ? EndPoint.CREATE_BANNER : EndPoint.UPDATE_BANNER

      const result = await onPostExecute(endPoint, data)
      if (result) {
        setReload(true)
        setLoading(false)
      }
    }
    execute(data, type)
  }, [])

  const onSubmit = useCallback(
    async data => {
      setLoading(true)
      const downloadURL = await uploadImage(
        `images/banner/${Date.now()}.jpg`,
        data.file
      )
      setData(prev => ({ ...prev, url: downloadURL }))
      await bannerRequest(
        { ...data, url: downloadURL, idBanner: withEmpty('id', banner) },
        type
      )
    },
    [type, banner]
  )

  const _handleChangeImage = useCallback(e => {
    const uri = URL.createObjectURL(withEmpty('blobFile', e))
    setData(prev => ({
      ...prev,
      url: uri,
      file: withEmpty('blobFile', e)
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
            {data.url ? (
              <Image source={data.url} />
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
            accepter={PickerInput}
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
      url: withNull('url', banner),
      type: withEmpty('type', banner),
      description: withEmpty('description', banner),
      status: withEmpty('status', banner)
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
