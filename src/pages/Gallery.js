import React from 'react'
import './Gallery.css'
import avatar1 from './image/userphoto.svg'
import avatar2 from './image/user2.svg'
import cover1 from './image/cover1.svg'
import cover2 from './image/cover2.svg'
import backarrow from './image/backarrow.svg'
import { useNavigate } from 'react-router-dom'

const portfolios = [
  {
    userId: 1,
    username: 'tina',
    avatar: avatar1,
    cover: cover1,
    name: 'Tina Collection'
  },
  {
    userId: 2,
    username: 'user2',
    avatar: avatar2,
    cover: cover2,
    name: 'Cat Lover'
  },
  // 其他作品集数据...
  {
    userId: 3,
    username: 'user3',
    avatar: avatar2,
    cover: cover2,
    name: 'Hiiiiii'
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
      <div className="GalleryContainer">
        {portfolios.map(portfolio => (
          <div
            key={portfolio.userId}
            className="GalleryItem"
            //這邊要改成按了之後導到不同Item
            onClick={() => {
              navigateTo(`/galleryitem?person=${portfolio.username}`)
            }}>
            <img src={portfolio.avatar} alt={portfolio.username} />
            <img src={portfolio.cover} alt={portfolio.name} />
            <p>{portfolio.name}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default GalleryPage
