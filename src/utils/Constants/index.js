const Constant = {
  privateRouter: [
    { URL: '/', name: 'Dashboard' },
    { URL: '/profile', name: 'Profile' },
    { URL: '/profile/update', name: 'Update profile' },
    { URL: '/change-password', name: 'Change password' },
    { URL: '/products', name: 'Product management' },
    { URL: '/users', name: 'User management' }
  ],
  publicRouter: [
    { URL: '/', name: '' },
    { URL: '/login', name: 'Login' },
    { URL: '/register', name: 'register' },
    { URL: '/reset-password/:token', name: 'reset-password' },
    { URL: '/forgot-password', name: 'forgot-password' }
  ],
  contentPage: [
    {},
    { title: 'Tổng quan', link: '/home' },
    { title: 'Quản lý người dùng', link: '/users' },
    { title: 'Quản lý sản phẩm', link: '/products' },
    { title: 'Quản lý đánh giá', link: '/reviews' },
    { title: 'Quản lý banner', link: '/banners' },
    { title: 'Quản lý comment', link: '/comments' },
    {
      title: 'Quản lý danh mục',
      link: '/categorys'    
    },
    { title: 'Thông tin cá nhân', link: '/profile' }
  ],
  navigators: [
    { key: '1', icon: 'feather-bar-chart-2', label: 'Tổng quan' },
    { key: '2', icon: 'feather-user', label: 'Quản lý người dùng' },
    { key: '3', icon: 'feather-airplay', label: 'Quản lý sản phẩm' },
    { key: '4', icon: 'feather-star', label: 'Quản lý đánh giá' },
    { key: '5', icon: 'feather-user', label: 'Quản lý banner' },
    { key: '6', icon: 'feather-user', label: 'Quản lý comment' },
    {
      key: '7',
      icon: 'feather-film',
      label: 'Quản lý danh mục'
    }
  ]
}

export default Constant
