module.exports = Object.freeze({
  // APPLICATION URLS
  APPLICATION_SERVER_API_BASE_URL: process.env.REACT_APP_APPLICATION_SERVER_URL,

  // INTERNAL ROUTES
  INITIAL_PAGE_PATH: '/',
  DASHBOARD_PAGE_PATH: '/dashboard',
  REGISTER_USER_PATH: '/register',
  HISTORY_PAGE_PATH: '/history',
  LOGOUT_PAGE_PATH: '/logout',
  // BACKEND API
  TOKEN_STATUS_URL:  '/auth/status',
  LOGIN_URL: '/auth/login',
  REGISTER_URL: '/auth/register',
  LOGOUT_URL: '/auth/logout'
})
