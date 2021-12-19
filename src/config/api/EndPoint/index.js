const EndPoint = {
  LOGIN: 'admin/login',
  ADMIN_PROFILE: 'admins/profile',
  RESET_PASSWORD: 'auth/resetPassword',
  STAFFS: 'staffs',
  ACCOUNTS: 'accounts',
  IMAGE: 'image',
  CHANGE_PASSWORD: 'change-password',
  GET_LIST_PRODUCT: 'admin/product/filter',
  GET_LIST_USER: 'admin/user',
  GET_LIST_BANNER: 'admin/banner/list',
  GET_LIST_COMMENT: 'admin/comment/list',
  GET_LIST_CATEGORY: 'common/subcategory',
  UPDATE_BANNER: 'admin/update-banner',
  CREATE_BANNER: 'admin/banner-create',
  GET_LIST_NOTIFY: idAdmin => `/admin/get-notify/${idAdmin}`,
  READ_NOTIFY: '/admin/read-notify'
}

export default EndPoint
