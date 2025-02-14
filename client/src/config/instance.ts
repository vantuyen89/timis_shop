import axios from 'axios'

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.SERVER_URL,
  timeout: 1000
})

const refreshToken = async () => {
  const response = await axios.post(
    `${process.env.SERVER_URL}/auth/refreshToken`,
    {},
    {
      withCredentials: true
    }
  )
  return response.data.accessToken
}

instance.interceptors.request.use(
  async function (config) {
    config.withCredentials = true
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    // If error is 401 and it's not a retry, attempt to refresh the token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const newToken = await refreshToken()
        instance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`
        return instance(originalRequest)
      } catch (refreshError) {
        // Handle refresh token failure, possibly logging out the user
        console.error('Refresh token failed', refreshError)
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)
export default instance
