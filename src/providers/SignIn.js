import React, { createContext, useContext, useEffect, useState } from 'react'
import { autoLogin, login as loginFunction, set_up_jwt } from '../apis/api'
import { updatePasswordAndUsername } from '../apis/api'

const SignInContext = createContext({
  loggedIn: false,
  login: async payload => {},
  logout: async () => {},
  updatePassword: async payload => {},
  info: {
    user_name: null,
    user_id: null,
    image: null
  }
})

const SignInProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [info, setInfo] = useState({
    user_name: null,
    user_id: null,
    image: null
  })
  const [jwt, setJwt] = useState(null)

  const login = async payload => {
    const result = await loginFunction(payload)
    if (result) {
      setLoggedIn(true)
      setInfo({
        user_name: result.user_name,
        user_id: result.user_id,
        image: result.image
      })
      setJwt(result.jwt)

      localStorage.setItem('jwt', result.jwt)
      // localStorage.setItem('image')
      set_up_jwt(result.jwt)

      if (!result.pwd_change) {
        return 1
      } else {
        return 2
      }
    } else {
      return 0
    }
  }

  const logout = () => {
    setLoggedIn(false)
    setInfo({ user_name: '' })
    localStorage.removeItem('jwt')
  }

  const updatePassword = async payload => {
    try {
      const result = await updatePasswordAndUsername(payload)
      setInfo({
        user_name: result.user_name,
        user_id: result.user_id,
        image: result.image
      })
      return result
    } catch (e) {
      return null
    }
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt')
    setJwt(jwt)
  }, [])

  useEffect(() => {
    if (!jwt) return
    autoLogin(jwt).then(result => {
      setLoggedIn(true)
      setInfo({
        user_name: result.user_name,
        user_id: result.user_id,
        image: result.image
      })
    })
  }, [jwt])

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
