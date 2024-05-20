import React from 'react'
import './Gallery.css'
import avatar1 from './image/userphoto.svg'
import avatar2 from './image/user2.svg'
import cover1 from './image/cover1.svg'
import cover2 from './image/cover2.svg'
import backarrow from './image/backarrow.svg'
import { useNavigate } from 'react-router-dom'

import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { Container } from '@mui/material'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))

const portfolios = [
  {
    userId: 1,
    username: 'tina',
    avatar: avatar1,
    cover: cover1
    // name: 'Tina'
  },
  {
    userId: 2,
    username: 'John',
    avatar: avatar2,
    cover: cover2
    // name: 'Cat Lover'
  },
  // 其他作品集数据...
  {
    userId: 3,
    username: 'Amy',
    avatar: avatar2,
    cover: cover2
    // name: 'Hiiiiii'
  },
  {
    userId: 4,
    username: 'Brian GT Wu',
    avatar: avatar2,
    cover: cover2
    // name: 'Hiiiiii'
  },
  {
    userId: 5,
    username: 'Billy Goat',
    avatar: avatar2,
    cover: cover2
    // name: 'Hiiiiii'
  },
  {
    userId: 5,
    username: 'Billy Goat',
    avatar: avatar2,
    cover: cover2
    // name: 'Hiiiiii'
  },
  {
    userId: 5,
    username: 'Billy Goat',
    avatar: avatar2,
    cover: cover2
    // name: 'Hiiiiii'
  },
  {
    userId: 5,
    username: 'Billy Goat',
    avatar: avatar2,
    cover: cover2
    // name: 'Hiiiiii'
  },
  {
    userId: 5,
    username: 'Billy Goat',
    avatar: avatar2,
    cover: cover2
    // name: 'Hiiiiii'
  },
  {
    userId: 5,
    username: 'Billy Goat',
    avatar: avatar2,
    cover: cover2
    // name: 'Hiiiiii'
  },
  {
    userId: 5,
    username: 'Billy Goat',
    avatar: avatar2,
    cover: cover2
    // name: 'Hiiiiii'
  },
  {
    userId: 5,
    username: 'Billy Goat',
    avatar: avatar2,
    cover: cover2
    // name: 'Hiiiiii'
  },{
    userId: 5,
    username: 'Billy Goat',
    avatar: avatar2,
    cover: cover2
    // name: 'Hiiiiii'
  },{
    userId: 5,
    username: 'Billy Goat',
    avatar: avatar2,
    cover: cover2
    // name: 'Hiiiiii'
  },{
    userId: 5,
    username: 'Billy Goat',
    avatar: avatar2,
    cover: cover2
    // name: 'Hiiiiii'
  },{
    userId: 5,
    username: 'Billy Goat',
    avatar: avatar2,
    cover: cover2
    // name: 'Hiiiiii'
  },{
    userId: 5,
    username: 'Billy Goat',
    avatar: avatar2,
    cover: cover2
    // name: 'Hiiiiii'
  },{
    userId: 5,
    username: 'Billy Goat',
    avatar: avatar2,
    cover: cover2
    // name: 'Hiiiiii'
  },{
    userId: 5,
    username: 'Billy Goat',
    avatar: avatar2,
    cover: cover2
    // name: 'Hiiiiii'
  },{
    userId: 5,
    username: 'Billy Goat',
    avatar: avatar2,
    cover: cover2
    // name: 'Hiiiiii'
  },{
    userId: 5,
    username: 'Billy Goat',
    avatar: avatar2,
    cover: cover2
    // name: 'Hiiiiii'
  },{
    userId: 5,
    username: 'Billy Goat',
    avatar: avatar2,
    cover: cover2
    // name: 'Hiiiiii'
  },{
    userId: 5,
    username: 'Billy Goat',
    avatar: avatar2,
    cover: cover2
    // name: 'Hiiiiii'
  },{
    userId: 5,
    username: 'Billy Goat',
    avatar: avatar2,
    cover: cover2
    // name: 'Hiiiiii'
  },{
    userId: 5,
    username: 'Billy Goat',
    avatar: avatar2,
    cover: cover2
    // name: 'Hiiiiii'
  },{
    userId: 5,
    username: 'Billy Goat',
    avatar: avatar2,
    cover: cover2
    // name: 'Hiiiiii'
  },{
    userId: 5,
    username: 'Billy Goat',
    avatar: avatar2,
    cover: cover2
    // name: 'Hiiiiii'
  }
]

const GalleryPage = () => {
  const navigateTo = useNavigate()

  const goBack = () => {
    navigateTo(-1) // 回到上一页
  }

  return (
    <>
      <div className="BackContainer">
        <img src={backarrow} alt="back" onClick={goBack} />
      </div>

      {/* <Box
        sx={{
          flexGrow: 1,
          width: '80%',
          border: 'black 1px dashed'
        }}>
        <Grid container spacing={3} sx={{ gap: '1rem' }}>
          {portfolios.map(portfolio => (
            <Grid
              sx={{
                backgroundColor: '#dbecf589',
                borderRadius: '10%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              item
              xs={4}
              key={portfolio.userId}
              //這邊要改成按了之後導到不同Item
              onClick={() => {
                navigateTo(`/galleryitem?person=${portfolio.username}`)
              }}>
              <Item
                sx={{
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  borderRadius: '0'
                }}>
                <Box sx={{ height: '40px' }}>
                  <img
                    style={{ height: '100%' }}
                    src={portfolio.avatar}
                    alt={portfolio.username}
                  />
                </Box>
              </Item>
              <Item
                sx={{
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  borderRadius: '0'
                }}>
                <img
                  style={{ width: '100%' }}
                  src={portfolio.cover}
                  alt={portfolio.name}
                />
              </Item>
              <Item
                sx={{
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  borderRadius: '0'
                }}>
                {portfolio.username}
              </Item>
            </Grid>
          ))}
        </Grid>
        </Box> */}

      <div className="GalleryContainer">
        {portfolios.map(portfolio => (
          <div
            key={portfolio.userId}
            className="GalleryItem"
            //這邊要改成按了之後導到不同Item
            onClick={() => {
              navigateTo(`/galleryitem?person=${portfolio.username}`)
            }}>
            <span className="GalleryItemAvatar">
              <img src={portfolio.avatar} alt={portfolio.username} />
            </span>
            <span className="GalleryItemCover">
              <img src={portfolio.cover} alt={portfolio.name} />
            </span>
            <span className="GalleryItemUser">{portfolio.username}</span>
          </div>
        ))}
      </div>
    </>
  )
}

export default GalleryPage
