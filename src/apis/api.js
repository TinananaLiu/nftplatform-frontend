import axios from 'axios'
import Avatar from '../pages/image/token.svg'
const baseURL = process.env.REACT_APP_BASE_URL
const api_endpoint = axios.create({
  baseURL: baseURL,
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
//拿到所有user的所有nft
const getALLUserWithNFT = async () => {
  const result = await api_endpoint.get('/user/allusernfts', {
    headers: {
      Authorization: `bearer ${jwt}`
    }
  })
  return result.data
}

//依據我登入的user本人拿到我自己的所有nft
const getAllMyNfts = async () => {
  const result = await api_endpoint.get('/user/allnfts', {
    headers: {
      Authorization: `bearer ${jwt}`
    }
  })
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
const getUserInfo = async () => {
  const result = await api_endpoint.get('/user/0', {
    headers: {
      Authorization: `bearer ${jwt}`
    }
  })
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

const updateImgAndName = async (userName, imageURL, fileName) => {
  //取url再轉成blob丟到後端
  
  const formData = new FormData()
  formData.append('userName', userName)
  // return 200
  if (imageURL) {
    const image = await fetch(imageURL).then(response => response.blob())
    formData.append('image', image, fileName) //第三個參數改filename 前面也要改傳入filename
    const result = await fetch(baseURL + '/user/imgname', {
      method: 'PUT',
      headers: { Authorization: `bearer ${jwt}` },
      body: formData
    })
    return result.status
  } else {
    const result = await fetch(baseURL + '/user/imgname', {
      method: 'PUT',
      headers: { Authorization: `bearer ${jwt}` },
      body: formData
    })
    return result.status
  }
}

//getTotalLikes 功能 (更新在profile頁)
const getTotalLikes = async () => {
  const result = await api_endpoint.get('/user/likes', {
    headers: {
      Authorization: `bearer ${jwt}`
    }
  })
  //return {total likes}
  return result.data
}

const getRank = async () => {
  const result = await api_endpoint.get('/user/rank', {
    headers: {
      Authorization: `bearer ${jwt}`
    }
  })
  //return {total likes}
  return result.data
}

//<<NFT API>>-------------------------------------------------------
//getNftInfo 功能
const getNftInfo = async nftId => {
  console.log(nftId)
  const result = await api_endpoint.get('/nft/' + nftId, {
    headers: {
      Authorization: `bearer ${jwt}`
    }
  })
  return result.data
}

const getAllNftsByUser = async person => {
  const result = await api_endpoint.get('/nft/allnfts/' + person, {
    headers: {
      Authorization: `bearer ${jwt}`
    }
  })
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
  verify1URL,
  verify2URL,
  verify3URL,
  imageURL,
  fileURL,
  fileNames
}) => {
  console.log(fileNames)
  const image = await fetch(imageURL).then(response => response.blob())
  const file = await fetch(fileURL).then(response => response.blob())
  const verify1 = verify1URL
    ? await fetch(verify1URL).then(response => response.blob())
    : new Blob()
  const verify2 = verify2URL
    ? await fetch(verify2URL).then(response => response.blob())
    : new Blob()
  const verify3 = verify3URL
    ? await fetch(verify3URL).then(response => response.blob())
    : new Blob()
  console.log(image)
  const formData = new FormData()
  formData.append('userId', userId)
  formData.append('title', title)
  formData.append('category', category)
  formData.append('institution', institution)
  formData.append('tag1', tag1)
  formData.append('tag2', tag2)
  formData.append('description', description)
  try {
    formData.append('image', image, fileNames.image)
    formData.append('verify1', verify1, fileNames.verify1)
    formData.append('verify2', verify2, fileNames.verify2)
    formData.append('verify3', verify3, fileNames.verify3)
    formData.append('file', file, fileNames.file)
    console.log(formData.values())
    const result = await fetch(baseURL + '/nft/', {
      method: 'POST',
      headers: { Authorization: `bearer ${jwt}` },
      body: formData
    }).then(res => {
      return res.json()
    })
    //return nft 的資訊
    console.log(result)
    return result
  } catch (error) {
    console.log(error)
  }
}

//hiddenNft 功能
const hiddenNft = async (nftId, hiddenState) => {
  console.log(nftId, hiddenState)
  const result = await api_endpoint.put(
    '/nft/',
    { nftId, hiddenState },
    {
      headers: {
        Authorization: `bearer ${jwt}`
      }
    }
  )
  return result.status
}

//updateNftLikes 功能
const updateNftLikes = async (nftId, like_status) => {
  const result = await api_endpoint.put(
    '/nft/likes',
    { nftId, like_status },
    {
      headers: {
        Authorization: `bearer ${jwt}`
      }
    }
  )
  //return nft likes數量
  return result.status
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
  getAllMyNfts,
  getALLUserWithNFT,
  getUserInfo,
  updatePasswordAndUsername,
  updateUserBio,
  updateImgAndName,
  getTotalLikes,
  getRank,
  getNftInfo,
  getAllNftsByUser,
  updateNftLikes,
  uploadNft,
  hiddenNft,
  autoLogin,
  getUserBio
  // getPersonProfile
}
