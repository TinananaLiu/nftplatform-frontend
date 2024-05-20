import React, { createContext, useContext, useState } from 'react'
import { login as loginFunction } from '../apis/api'
import { updatePassword as updatePasswordFunction } from '../apis/api'
import { set_up_jwt } from '../apis/api'

const SignInContext = createContext({
  loggedIn: false,
  login: async payload => {},
  logout: async () => {},
  updatePassword: async payload => {},
  info: {
    username: null,
    image: null
  }
})

const SignInProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [info, setInfo] = useState({
    username: null,
    image: null
  })

  const login = async payload => {
    const result = await loginFunction(payload)
    if (result) {
      setLoggedIn(true)
      setInfo({
        username: result.username,
        image: result.image,
        jwt: result.jwt
      })

      localStorage.setItem('jwt', result.jwt)
      localStorage.setItem('image', result.image)

      set_up_jwt(result.jwt)

      if (!result.pwd_change) {
        return 1
      } else {
        return 2
      }
    } else {
      // ...
      return 0
    }
  }

  const logout = () => {
    localStorage.removeItem('jwt')
    setLoggedIn(false)
    setInfo({ username: '' })
  }

  const updatePassword = async payload => {
    const result = await updatePasswordFunction(payload)
    return result
  }

  return (
    <SignInContext.Provider
      value={{
        loggedIn,
        login,
        logout,
        updatePassword,
        info
      }}>
      {children}
    </SignInContext.Provider>
  )
}

const useSignIn = () => useContext(SignInContext)

export default SignInProvider
export { useSignIn }
