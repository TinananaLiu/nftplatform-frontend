import axios from 'axios'

const api_endpoint = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 3000
})

const uploadProfileToBackend = async () => {
  return 'tina-12345' // NFT 的 hash id
}

const getNFTItemByHash = async hash_id => {
  // return MockNFTItem[hash_id]
}

/*
  expect:
    jwt(string): json web token;
    username(string);
    avatar(blob);
*/
const login = async payload => {
  const result = await api_endpoint.post('/user/login', payload)
  /*
    return {username, avatar, jwt}
  */
  return result.data
}

const logout = async ({ username }) => {
  return true
}

const updatePassword = async payload => {}

const getPersonProfile = async person => {
  // const profile = MockProfileItems[person]
  // return profile
}

export {
  uploadProfileToBackend,
  getNFTItemByHash,
  login,
  logout,
  updatePassword,
  getPersonProfile
}
