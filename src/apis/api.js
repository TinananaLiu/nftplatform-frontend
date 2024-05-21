import axios from 'axios'
import Avatar from '../pages/image/token.svg'

const api_endpoint = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 3000
})

let jwt = localStorage.getItem('jwt')
const set_up_jwt = JWT => {
  jwt = JWT
}

const uploadProfileToBackend = async () => {
  return 'tina-12345' // NFT 的 hash id
}

const getNFTItemByHash = async hash_id => {
  // return MockNFTItem[hash_id]
}

//<<User API>>-------------------------------------------------------
const getAllNfts = async userId => {
  const result = await api_endpoint.put('/user/allnfts', { userId })
  return result.data
}

//Signin 功能
/*
  expect回傳的東西:
    jwt(string): json web token;
    username(string);
    avatar(blob);

    */
const login = async payload => {
  /*
    return {username, avatar, jwt}
  */
  try {
    const result = await api_endpoint.post('/user/login', payload)

    return result.data
  } catch (e) {
    return null
  }
  // return {
  //   jwt: 'abc',
  //   username: 'yugo',
  //   image: Avatar,
  //   pwd_change: true
  // }
}

//Logout 功能 (後端忘記寫logout的api)
const logout = async ({ user }) => {
  return true
}

//getUserInfo 功能
const getUserInfo = async ({ userId }) => {
  const result = await api_endpoint.get('/user/:userId', { userId })
  return result.data
}
//updatePassword 功能
const updatePasswordAndUsername = async ({
  userId,
  oldPassword,
  newPassword,
  userName
}) => {
  const result = await api_endpoint.put(
    '/user/info',
    {
      userId,
      oldPassword,
      newPassword,
      userName
    },
    {
      headers: {
        Authorization: jwt ? `Bearer ${jwt}` : null
      }
    }
  )
  //return {username, avatar, jwt}

  return result.data
}

//updateBio 功能

const getUserBio = async () => {
  console.log(jwt)
  const result = await api_endpoint.get('/user/bio', {
    headers: {
      Authorization: `bearer ${jwt}`
    }
  })

  return result.data.bio
}

const updateUserBio = async ({ userBio }) => {
  const result = await api_endpoint.put(
    '/user/bio',
    { userBio },
    {
      headers: {
        Authorization: `bearer ${jwt}`
      }
    }
  )
  //return {userBio}嗎?
  return result.data
}

//getTotalLikes 功能 (更新在profile頁)
const getTotalLikes = async ({ userId }) => {
  const result = await api_endpoint.put('/user/likes', { userId })
  //return {total likes}
  return result.data
}

//<<NFT API>>-------------------------------------------------------
//getNftInfo 功能
const getNftInfo = async ({ nftId }) => {
  const result = await api_endpoint.put('/nft/:nftId', { nftId })
  return result.data
}
//uploadNft 功能
const uploadNft = async ({
  userId,
  title,
  category,
  institution,
  tag1,
  tag2,
  description,
  verification,
  image,
  file
}) => {
  const result = await api_endpoint.post('/nft/', {
    userId,
    title,
    category,
    institution,
    tag1,
    tag2,
    description,
    verification,
    image,
    file
  })
  //return nft 的資訊
  return result.data
}

//hiddenNft 功能
const hiddenNft = async ({ nftId }) => {
  const result = await api_endpoint.post('/nft/', { nftId })
  //return 有hidden了
  return result.data
}

//updateNftLikes 功能
const updateNftLikes = async ({ nftId, likes_num }) => {
  const result = await api_endpoint.put('/nft/likes', { nftId, likes_num })
  //return nft likes數量
  return result.data
}

const autoLogin = async jwt => {
  const result = await api_endpoint.get('/user/autologin', {
    headers: {
      Authorization: `bearer ${jwt}`
    }
  })
  return result.data
}

// const getPersonProfile = async person => {
//   // const profile = MockProfileItems[person]
//   // return profile
// }

export {
  set_up_jwt,
  uploadProfileToBackend,
  getNFTItemByHash,
  login,
  logout,
  getAllNfts,
  getUserInfo,
  updatePasswordAndUsername,
  updateUserBio,
  getTotalLikes,
  getNftInfo,
  updateNftLikes,
  uploadNft,
  hiddenNft,
  autoLogin,
  getUserBio
  // getPersonProfile
}
