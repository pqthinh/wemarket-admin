const Constant = {
  privateRouter: [{ URL: '/', name: 'Dashboard' }],
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
    { title: 'Quản lý khách hàng', link: '/schedule' },
    { title: 'Quản lý sản phẩm', link: '/customer' },
    { title: 'Quản lý đánh giá', link: '/review' },
    {
      title: 'Quản lý bài viết',
      link: '/post',
      child: [
        { title: 'Tin tức', link: '/post/news' },
        { title: 'Video', link: '/post/video' }
      ]
    }
  ],
  navigators: [
    { key: '1', icon: 'feather-bar-chart-2', label: 'Tổng quan' },
    { key: '2', icon: 'feather-user', label: 'Quản lý khách hàng' },
    { key: '13', icon: 'feather-airplay', label: 'Quản lý sản phẩm' },
    { key: '14', icon: 'feather-star', label: 'Quản lý đánh giá' },
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
