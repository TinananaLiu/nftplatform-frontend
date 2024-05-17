const delay = time => {
  return new Promise(resolve => setTimeout(resolve, time))
}

const uploadProfileToBackend = async () => {
  await delay(2000) // 模擬後端執行時間而已
  return 'tina-12345' // NFT 的 hash id
}

const getNFTItemByHash = async hash_id => {
  await delay(500)
  return MockNFTItem[hash_id]
}

const login = async payload => {
  const { username, password } = payload // 解構賦值

  await delay(500)
  const user = UserDatabase[username]
  console.log(user)
  if (user && user.password === password) {
    return user
  } else {
    return null
  }
}

const logout = async ({ username }) => {
  await delay(500)
  return true
}

const updatePassword = async payload => {
  const { username, old_password, new_password, jwt } = payload // 解構賦值
  await delay(500)
  // check on jwt...
  const user = UserDatabase[username]
  if (!user) {
    return false
  }
  if (old_password !== user.password) {
    return false
  }
  user.password = new_password
  user.firstTime = false
  return true
}

const UserDatabase = {
  tina: {
    username: 'tina',
    password: '12345',
    email: 'tina@gmail.com',
    firstTime: true
  }
}

const MockNFTItem = {
  'tina-12345': {
    username: 'Tinananana test',
    title: 'Class notes test',
    date: '2023/05/01 test',
    category: 'Education test',
    institution: 'NTU test',
    description: 'notes for E&I class test/blablabla/......../........',
    verification: '1.Upload photo include me 2.Blablabla 3........ 4........',
    tags: ['note1', 'E&I1']
  }
}

export {
  uploadProfileToBackend,
  getNFTItemByHash,
  login,
  logout,
  updatePassword
}
