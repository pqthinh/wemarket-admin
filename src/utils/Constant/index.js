const Constant = {
  privateRouter: [{ URL: '/', name: 'Dashboard' }],
  publicRouter: [
    { URL: '/', name: '' },
    { URL: '/login', name: 'Login' },
    { URL: '/register', name: 'register' },
    { URL: '/reset-password/:token', name: 'reset-password' },
    { URL: '/forgot-password', name: 'forgot-password' }
  ]
}

export default Constant
