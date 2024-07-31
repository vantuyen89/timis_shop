import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  timeout: 1000,
	headers: { "X-Custom-Header": "foobar"},
})


const refreshToken = async () => {
  const response = await axios.post(
    `http://localhost:8000/api/v1/auth/refreshToken`,
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
    console.log(config);
    
    return config
  },
  function (error) {
    console.log('error', error)

    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    console.log(response);
    
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
