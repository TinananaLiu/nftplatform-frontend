import React, { useEffect } from 'react'
import './MyPortfolio.css'
// import userphoto from './image/userphoto.svg'
import defaultavatar from './image/defaultavatar.svg'
import backarrow from './image/backarrow.svg'
import { useNavigate } from 'react-router-dom'
import SwipeableTextMobileStepper from './NftItemStepper'
import Button from '@mui/material/Button'
import { useState } from 'react'
import FormDialog from './MoodDialog'
import AvatarModal from './AvatarModal'
import AvatarDialog from './AvatarDialog'
import { useSignIn } from '../providers/SignIn'
import { getAllMyNfts, getUserBio, getUserInfo } from '../apis/api'

const MyPortfolioPage = () => {
  const [moodText, setMoodText] = useState('Type anything...')
  const [editing, setEditing] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [error, setError] = useState('')

  const [userBio, setUserBio] = useState('')
  const [userName, setUserName] = useState('')
  const [avatar, setAvatar] = useState(null)
  const [nftsImg, setNftsImg] = useState(null)

  const signInContext = useSignIn()
  // const editMood = () => {
  //   const newMoodText = prompt('Enter your mood:')
  //   if (newMoodText !== null) {
  //     setMoodText(newMoodText)
  //     setEditing(true)
  //   }
  // }

  useEffect(() => {
    if (!localStorage.getItem('jwt')) {
      window.location.href = '/'
    } else {
      // getUserBio().then(bio => {
      //   setUserBio(bio)
      // })
      getUserInfo().then(res => {
        console.log(res[0].bio)
        setUserBio(res[0].bio)
        setUserName(res[0].user_name)
        res[0].image &&
          setAvatar(process.env.REACT_APP_GOOGLE_STORAGE_USER + res[0].image)
      })

      getAllMyNfts().then(res => {
        console.log(res)
        const formattedImages = res.reduce((acc, item) => {
          const category = item.category
          acc[category] = acc[category] ? acc[category] : []
          acc[category].push({
            label: item.title,
            imgPath: process.env.REACT_APP_GOOGLE_STORAGE_NFT + item.image,
            nft_id: item.nft_id
          })
          return acc
        }, {})
        console.log(formattedImages)
        setNftsImg(formattedImages)
      })
    }
  }, [])

  const { info: my_info } = useSignIn()

  const navigateTo = useNavigate()

  const goBack = () => {
    navigateTo(-1) // 回到上一页
  }

  const handleAvatarUpload = () => {
    setModalVisible(true)
  }

  return (
    <>
      <div className="BackContainer">
        <img src={backarrow} alt="back" onClick={goBack} />
      </div>

      <div className="MyUserPart">
        <span className="MyPhoto">
          <img
            src={avatar ? avatar : defaultavatar}
            // src={my_info.image ? my_info.image : defaultavatar}
            alt="defaultavatar"
            onClick={handleAvatarUpload}
          />
        </span>
        <span className="MyInfo">
          <span className="MyInfoName">{userName && userName}</span>
          <span className="MyInfoItem">
            <FormDialog setUserBio={setUserBio} />
            <span className="MyInfoItemContent">
              <div className="MyInfoItemText">{userBio}</div>
            </span>
          </span>

          <span className="MyInfoItem">
            <AvatarDialog
              avatar={avatar}
              userName={userName}
              setUserName={setUserName}
              setAvatar={setAvatar}
            />
          </span>
        </span>
      </div>

      <div class="PortfolioContainer">
        <div class="PortfolioItem">
          <span class="PortfolioItemTitle">Academic</span>
          {nftsImg && (
            <SwipeableTextMobileStepper
              category={'Academic'}
              nftsImg={nftsImg}
            />
          )}
        </div>
        <div class="PortfolioItem">
          <span class="PortfolioItemTitle">Professional</span>
          {nftsImg && (
            <SwipeableTextMobileStepper
              category={'Professional'}
              nftsImg={nftsImg}
            />
          )}
        </div>
        <div class="PortfolioItem">
          <span class="PortfolioItemTitle">Collaboration</span>
          {nftsImg && (
            <SwipeableTextMobileStepper
              category={'Collaboration'}
              nftsImg={nftsImg}
            />
          )}
        </div>
        <div class="PortfolioItem">
          <span class="PortfolioItemTitle">Creativity</span>
          {nftsImg && (
            <SwipeableTextMobileStepper
              category={'Creativity'}
              nftsImg={nftsImg}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default MyPortfolioPage
