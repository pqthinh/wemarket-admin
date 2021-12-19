import { Schema } from 'rsuite'
const { StringType } = Schema.Types

export const bannerModel = Schema.Model({
  type: StringType().isRequired('Chưa nhập trường mô tả'),
  description: StringType().isRequired('Chưa nhập mô tả'),
  url: StringType().isRequired('Chưa chon ảnh')
})
