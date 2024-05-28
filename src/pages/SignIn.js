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

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      {'Copyright © Tinanana '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const defaultTheme = createTheme()

export default function SignIn() {
  const { updatePassword } = useSignIn()

  const handleSubmit = async event => {
    event.preventDefault()

    const useremail = document.querySelector('#useremail').value
    const userpassword = document.querySelector('#userpassword').value

    const result = await signInContext.login({
      email: useremail,
      password: userpassword
    })

    if (result === 1) {
      navigateTo('/changepassword')
    } else if (result === 2) {
      navigateTo('/')
    } else {
      //秀錯誤的畫面
      setError('Wrong email or password')
    }
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
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="useremail"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="userpassword"
              autoComplete="current-password"
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}>
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}
