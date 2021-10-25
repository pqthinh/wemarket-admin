import { Schema } from 'rsuite'
const { StringType } = Schema.Types

export const productModel = Schema.Model({
  name: StringType().isRequired('Chưa nhập trường tên'),
  keyword: StringType().isRequired('Chưa nhập trường keyword'),
  short_description: StringType().isRequired('Chưa nhập trường description'),
  slug: StringType().isRequired('Chưa nhập trường slug')
})
