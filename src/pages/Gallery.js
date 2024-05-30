import React, { useEffect, useState } from 'react'
import './Gallery.css'
import avatar1 from './image/userphoto.svg'
import avatar2 from './image/user2.svg'
import cover1 from './image/cover1.svg'
import cover2 from './image/cover2.svg'
import backarrow from './image/backarrow.svg'
import createGallery from './image/Create-amico.svg'
import { useNavigate } from 'react-router-dom'
import defaultavatar from './image/defaultavatar.svg'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { Container } from '@mui/material'
import { getALLUserWithNFT } from '../apis/api'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))

const GalleryPage = () => {
  const navigateTo = useNavigate()
  const [portfolios, setPortfolios] = useState([])
  const goBack = () => {
    navigateTo(-1) // 回到上一页
  }
  useEffect(() => {
    getALLUserWithNFT().then(portfolios => {
      console.log(portfolios)
      setPortfolios(portfolios)
    })
  }, [])

  return (
    <>
      <div className="BackContainer">
        <img src={backarrow} alt="back" onClick={goBack} />
      </div>

      {portfolios.length !== 0 ? (
        <div className="GalleryContainer">
          {portfolios.map(portfolio => (
            <div
              key={portfolio.user_id}
              className="GalleryItem"
              //這邊要改成按了之後導到不同GalleryItem(不同人)
              onClick={() => {
                navigateTo(
                  `/galleryitem?person=${portfolio.user_name}&personId=${portfolio.user_id}`
                )
              }}>
              <span className="GalleryItemAvatar">
                <img
                  src={
                    portfolio.image
                      ? process.env.REACT_APP_GOOGLE_STORAGE_USER +
                        portfolio.image
                      : defaultavatar
                  }
                  alt={portfolio.user_name + '大頭'}
                />
              </span>
              <span className="GalleryItemCover">
                <img
                  src={
                    process.env.REACT_APP_GOOGLE_STORAGE_NFT + portfolio.cover
                  } //這邊抓user其中一個NFT的image顯示
                  alt={portfolio.user_name + '的NFT圖片'}
                />
              </span>
              <span className="GalleryItemUser">{portfolio.user_name}</span>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '2rem',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <span
            style={{
              fontFamily: 'Kanit',
              fontWeight: '500',
              fontSize: '40px',
              lineHeight: '70px',
              textAlign: 'center'
              // marginTop: '2rem'
            }}>
            No Profiles Yet.
          </span>
          <span
            style={{
              fontFamily: 'Kanit',
              fontWeight: '500',
              fontSize: '40px',
              lineHeight: '70px',
              textAlign: 'center'
              // marginTop: '2rem',
              // width: '60%'
            }}>
            Be the First to Showcase Your Work!
          </span>
          <span style={{ width: '70%' }}>
            <img src={createGallery} alt="defaultCreateGallery" />
          </span>
        </div>
      )}
    </>
  )
}

export default GalleryPage
