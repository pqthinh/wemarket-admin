import { Schema } from 'rsuite'
const { StringType } = Schema.Types

export const customerModel = Schema.Model({
  username: StringType().isRequired('Chưa nhập trường họ tên'),
  phone: StringType().isRequired('Chưa nhập SĐT'),
  email: StringType()
    .isRequired('Chưa nhập email')
    .isEmail('Sai định dạng email'),
  ref: StringType()
})
