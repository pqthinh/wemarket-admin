import { withEmpty, withObject } from 'exp-value'
import { useImage } from 'hooks'
import PropTypes from 'prop-types'
import React, { useCallback, useMemo, useState } from 'react'
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
import { productModel } from './validation'

const FormProduct = ({ product, type, ...others }) => {
  const [data, setData] = useState({
    name: withEmpty('name', product),
    keyword: withEmpty('keyword', product),
    short_description: withEmpty('short_description', product),
    slug: withEmpty('slug', product),
    thumb_url: withEmpty('thumb_url', product),
    id: withEmpty('id', product),
    category: withEmpty('category', product),
    file: null
  })
  const { resizeImage } = useImage()

  const [loading, setLoading] = useState(false)

  const contentForm = useMemo(() => {
    if (type == 'add') {
      return {
        title: 'Thêm mới sản phẩm',
        titleButton: 'Thêm mới'
      }
    }
    if (type == 'update') {
      return {
        title: 'Chỉnh sửa sản phẩm',
        titleButton: 'Cập nhật'
      }
    }
  }, [type])

  const _handleChangeProduct = useCallback(
    (field, value) => {
      setData(prev => ({
        ...prev,
        [field]: value
      }))
    },
    [data]
  )
  const _handleChangeImage = useCallback(
    async file => {
      const image = await resizeImage(withEmpty('blobFile', file))
      setData(prev => ({
        ...prev,
        file: image
      }))
    },
    [data]
  )

  const productRequest = useCallback(data => {
    console.log(data, 'product update')
  }, [])

  const onSubmit = useCallback(
    data => {
      setLoading(true)
      productRequest(data)
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
          model={productModel}
          onSubmit={() => onSubmit(data)}
          formValue={data}
        >
          <Title>{contentForm.title}</Title>
          <Drag
            draggable
            onChange={e => _handleChangeImage(e[e.length - 1])}
            autoUpload={false}
          >
            {data.thumb_url || data.file ? (
              <Image
                source={
                  (data.file &&
                    URL.createObjectURL(withObject('file', data))) ||
                  data.thumb_url
                }
              />
            ) : (
              <DragText>Tải ảnh lên ...</DragText>
            )}
          </Drag>

          <InputGroup
            value={withEmpty('name', data)}
            label={'Tên'}
            onChange={value => _handleChangeProduct('name', value)}
            placeholder={'Tên'}
            name={'name'}
            leftIcon={<Icon name={'feather-user'} />}
            require
          />
          <InputGroup
            value={withEmpty('keyword', data)}
            label={'Key Word'}
            onChange={value => _handleChangeProduct('keyword', value)}
            placeholder={'Key Word'}
            name={'keyword'}
            leftIcon={<Icon name={'feather-user'} />}
            require
          />
          <InputGroup
            value={withEmpty('short_description', data)}
            label={'Description'}
            onChange={value => _handleChangeProduct('short_description', value)}
            placeholder={'Desctiption'}
            name={'short_description'}
            leftIcon={<Icon name={'feather-phone'} />}
            require
          />

          <InputGroup
            value={withEmpty('slug', data)}
            label={'Slug'}
            onChange={value => _handleChangeProduct('slug', value)}
            placeholder={'Slug'}
            name={'slug'}
            leftIcon={<Icon name={'feather-link'} />}
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

FormProduct.propTypes = {
  product: PropTypes.object,
  type: PropTypes.string,
  setReload: PropTypes.func
}

export default React.memo(FormProduct)
