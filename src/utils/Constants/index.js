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
    { title: 'Quản lý khách hàng', link: '/users' },
    { title: 'Quản lý sản phẩm', link: '/products' },
    { title: 'Quản lý đánh giá', link: '/reviews' },
    {
      title: 'Quản lý bài viết',
      link: '/post',
      child: [
        { title: 'Tin tức', link: '/post/news' },
        { title: 'Video', link: '/post/video' }
      ]
    },
    { title: 'Thông tin cá nhân', link: '/profile' }
  ],
  navigators: [
    { key: '1', icon: 'feather-bar-chart-2', label: 'Tổng quan' },
    { key: '2', icon: 'feather-user', label: 'Quản lý khách hàng' },
    { key: '3', icon: 'feather-airplay', label: 'Quản lý sản phẩm' },
    { key: '4', icon: 'feather-star', label: 'Quản lý đánh giá' },
    {
      key: '5',
      icon: 'feather-film',
      label: 'Quản lý bài viết',
      child: [
        { key: '6', label: 'Tin tức' },
        { key: '7', label: 'Video' }
      ]
    }
  ]
}

export default Constant
