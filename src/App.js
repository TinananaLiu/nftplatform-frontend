// import logo from './logo.svg';
import './App.css'
import UploadPage from './pages/Upload'
import HomePage from './pages/Home'
import NftItemPage from './pages/NftItem'
import ProfilePage from './pages/Profile'
import GalleryPage from './pages/Gallery'
import GalleryItemPage from './pages/GalleryItem'
import MyPortfolioPage from './pages/MyPortfolio'

// import SignUpPage from './pages/SignUp'
import SignInPage from './pages/SignIn'
import ChangePwdPage from './pages/ChangePwd'

import { Route, Routes } from 'react-router-dom'
import logo from './pages/image/logo.svg'
import userphoto from './pages/image/userphoto.svg'
import homeicon from './pages/image/homeicon.svg'
import portfolioicon from './pages/image/portfolioicon.svg'
import galleryicon from './pages/image/galleryicon.svg'
import uploadicon from './pages/image/uploadicon.svg'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button'
import { useSignIn } from './providers/SignIn'

const hoverColor = '#D9D9D9'

function App() {
  const location = useLocation().pathname
  const navigateTo = useNavigate()

  const { info: my_info } = useSignIn()

  const signInContext = useSignIn()

  return (
    <div className="App">
      {location !== '/signup' &&
        location !== '/signin' &&
        location !== '/changepassword' && (
          // <div id="sidebar" className="Sidebar">
          //   {/* Sidebar content */}
          // </div>
          <div id="sidebar" className="Sidebar">
            <span
              className="Logo"
              onClick={() => {
                navigateTo('/')
              }}>
              <img src={logo} alt="logo" />
            </span>
            <span className="Function">
              <span
                className="FunctionElement"
                style={{
                  backgroundColor: location === '/' ? hoverColor : null
                }}
                onClick={() => {
                  navigateTo('/')
                }}>
                <span className="FunctionImg">
                  <img src={homeicon} alt="home" />
                </span>
                <span className="FunctionTitle">Home</span>
              </span>
              <span
                className="FunctionElement"
                style={{
                  backgroundColor:
                    location === '/myportfolio' ? hoverColor : null
                }}
                onClick={() => {
                  navigateTo('/myportfolio')
                }}>
                <span className="FunctionImg">
                  <img src={portfolioicon} alt="portfolio" />
                </span>
                <span className="FunctionTitle">My Portfolio</span>
              </span>
              <span
                className="FunctionElement"
                style={{
                  backgroundColor: location === '/gallery' ? hoverColor : null
                }}
                onClick={() => {
                  navigateTo('/gallery')
                }}>
                <span className="FunctionImg">
                  <img src={galleryicon} alt="gallery" />
                </span>
                <span className="FunctionTitle">Gallery</span>
              </span>
              <span
                className="FunctionElement"
                style={{
                  backgroundColor: location === '/upload' ? hoverColor : null
                }}
                onClick={() => {
                  navigateTo('/upload')
                }}>
                <span className="FunctionImg">
                  <img src={uploadicon} alt="upload" />
                </span>
                <span className="FunctionTitle">Upload</span>
              </span>
            </span>
          </div>
        )}

      <div id="main-page" className="MainPage">
        {location !== '/signup' &&
          location !== '/signin' &&
          location !== '/changepassword' && (
            <div id="userbar" className="UserBar">
              <span className="UserBarElement">
                {signInContext.loggedIn ? (
                  <>
                    <Button
                      // type="submit"
                      variant="contained"
                      sx={{
                        height: '35px',
                        mt: 3,
                        mb: 2,
                        backgroundColor: '#9FCAE3',
                        color: 'black',
                        marginRight: '2%',
                        fontFamily: 'Kanit',
                        '&:hover': {
                          color: '#1B3973',
                          backgroundColor: 'white' // 自定义鼠标悬停时的背景颜色
                        }
                      }}
                      onClick={() => {
                        signInContext.logout()
                        window.location.reload()
                      }}>
                      Log out
                    </Button>
                    <div
                      style={{
                        height: '50px',
                        paddingTop: '8px'
                      }}>
                      <img
                        style={{
                          height: '100%'
                        }}
                        src={my_info.image ? my_info.image : userphoto}
                        alt="userphoto"
                        onClick={() => {
                          navigateTo('/profile')
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <Button
                    // type="submit"
                    variant="contained"
                    sx={{
                      height: '35px',
                      mt: 3,
                      mb: 2,
                      backgroundColor: '#9FCAE3',
                      color: 'black',
                      marginRight: '2%',
                      fontFamily: 'Kanit',
                      '&:hover': {
                        color: '#1B3973',
                        backgroundColor: 'white' // 自定义鼠标悬停时的背景颜色
                      }
                    }}
                    onClick={() => {
                      navigateTo('/signin')
                    }}>
                    Sign In
                  </Button>
                )}
              </span>
            </div>
          )}

        <div
          style={
            {
              // border: "2px solid red"
            }
          }
          className="PageContent">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/nftitem" element={<NftItemPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/galleryitem" element={<GalleryItemPage />} />
            <Route path="/myportfolio" element={<MyPortfolioPage />} />
            {/* <Route path="/signup" element={<SignUpPage />} /> */}
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/changepassword" element={<ChangePwdPage />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
