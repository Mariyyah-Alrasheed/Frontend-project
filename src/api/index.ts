import axios from 'axios'

const isDevelopment = import.meta.env.MODE === 'development'
// let baseURL = 'http://localhost:5125/api/v1'
let baseURL = 'https://e-commerce-website-backend-production-39d3.up.railway.app/api/v1'

// if (!isDevelopment) {
//   // Update this later when you have a working backend server
//   baseURL = 'https://e-commerce-website-backend-production-39d3.up.railway.app/api/v1'
// }

const api = axios.create({
  baseURL
})

// use this to handle errors gracefully
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 500) {
//       throw new Error(error.response.data)
//     }
//   }
// )

export default api
