import axios from "axios";
export const register = async (name, email, password) => {
  const { data } = await axios.post('https://jobs-api-06-1.onrender.com/api/v1/auth/register', {
    name: name,
    email: email,
    password: password
  })
  return data
}
export const login = async (email, password) => {
  const { data } = await axios.post('https://jobs-api-06-1.onrender.com/api/v1/auth/login', {
    email: email,
    password: password
  })
  return data
}

