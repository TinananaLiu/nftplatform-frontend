import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useSignIn } from '../providers/SignIn'
import { useNavigate } from 'react-router-dom'

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme()

export default function SignIn() {
  const handleSubmit = async event => {
    event.preventDefault()
    const username = document.querySelector('#username').value
    const oldpwd = document.querySelector('#oldpwd').value
    const newpwd = document.querySelector('#newpwd').value
    const checknewpwd = document.querySelector('#checknewpwd').value

    if (!username) {
      setError('Username is required')
      return
    }

    if (checknewpwd !== newpwd) {
      setError('Passwords do not match')
      return
    }

    const result = await signInContext.updatePassword({
      //username: signInContext.info.username,
      userName: username,
      oldPassword: oldpwd,
      newPassword: newpwd
    })

    console.log(result)

    if (result) {
      navigateTo('/')
    } else {
      setError('Wrong Password')
    }
    // const useremail = document.querySelector('#useremail').value
    // const userpassword = document.querySelector('#userpassword').value

    // const result = await signInContext.login({
    //   username: useremail,
    //   password: userpassword
    // })

    // if (result === 1) {
    //   navigateTo('/changepassword')
    // } else if (result === 2) {
    //   navigateTo('/')
    // } else {
    //   //秀錯誤的畫面
    //   setIsError(true)
    // }
  }

  const signInContext = useSignIn()

  const navigateTo = useNavigate()

  const [error, setError] = useState('')

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Enter Your Username
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              sx={{ marginBottom: 4 }}
              //   autoComplete="oldpwd"
              autoFocus
            />
            <Typography component="h1" variant="h5">
              Change Password
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="oldpwd"
              label="Old Password"
              type="password"
              name="oldpwd"
              //   autoComplete="oldpwd"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="newpwd"
              label="New Password"
              type="password"
              id="newpwd"
              //   autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="checknewpwd"
              label="Repeat New Password"
              type="password"
              id="checknewpwd"
              //   autoComplete="current-password"
            />
            <div
              style={{
                height: '1rem',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                margin: '1rem 0 1rem 0'
              }}>
              {error !== '' ? (
                <div
                  style={{
                    height: '1rem',
                    fontSize: '1rem'
                  }}>
                  {error}
                </div>
              ) : (
                <></>
              )}
            </div>

            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
