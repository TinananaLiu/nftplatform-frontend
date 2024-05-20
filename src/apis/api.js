import axios from 'axios'
import Avatar from '../pages/image/token.svg'

const api_endpoint = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 3000
})

const set_up_jwt = jwt => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`
}

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
  /*
    return {username, avatar, jwt}
  */
  return {
    jwt: 'abc',
    username: 'yugo',
    image: Avatar,
    pwd_change: true
  }
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
  set_up_jwt,
  uploadProfileToBackend,
  getNFTItemByHash,
  login,
  logout,
  updatePassword,
  getPersonProfile
}
