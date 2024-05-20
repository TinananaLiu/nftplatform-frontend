import React from 'react'
import './MyPortfolio.css'
import userphoto from './image/userphoto.svg'
import backarrow from './image/backarrow.svg'
import { useNavigate } from 'react-router-dom'
import SwipeableTextMobileStepper from './NftItemStepper'
import Button from '@mui/material/Button'
import { useState } from 'react'
import FormDialog from './MoodDialog'
import AvatarModal from './AvatarModal'

const MyPortfolioPage = () => {
  const [moodText, setMoodText] = useState('Type anything...')
  const [editing, setEditing] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [error, setError] = useState('')

  // const editMood = () => {
  //   const newMoodText = prompt('Enter your mood:')
  //   if (newMoodText !== null) {
  //     setMoodText(newMoodText)
  //     setEditing(true)
  //   }
  // }

  const navigateTo = useNavigate()

  const goBack = () => {
    navigateTo(-1) // 回到上一页
  }

  const handleAvatarUpload = () => {
    setModalVisible(true)
  }

  return (
    <>
      <AvatarModal
        modalVisible={modalVisible}
        closeModal={() => {
          setError('')
          setModalVisible(false)
        }}
        // handleSave={handleSave}
        error={error}
      />

      <div className="BackContainer">
        <img src={backarrow} alt="back" onClick={goBack} />
      </div>

      <div className="MyUserPart">
        <span className="MyPhoto">
          <img src={userphoto} alt="userphoto" onClick={handleAvatarUpload} />
        </span>
        <span className="MyInfo">
          <span className="MyInfoName">Tinanana</span>
          <span className="MyInfoItem">
            <FormDialog />
            <span>
              test ...........test test hihi libuv libuvuvuvuvuvuv heapq
            </span>
            {/* <span
              id="mood-text"
              className={moodText === 'Type anything...' ? 'default-text' : ''}
              style={{ width: '50%' }}>
              {moodText}
              {/* 這邊到時候要從後端撈資料填入 
            </span> */}

            {/* <span className=''>..............</span>
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton> */}
          </span>
          {/* <span className="MyInfoItem">...</span>
          <span className="MyInfoItem">
            <Box sx={{ width: '100%' }}>
              <BorderLinearProgress variant="determinate" value={progress} />
            </Box>
          </span> */}
        </span>
      </div>

      <div class="PortfolioContainer">
        <div class="PortfolioItem">
          <span>Academic Achievements</span>
          <SwipeableTextMobileStepper category={'academic'} />
        </div>
        <div class="PortfolioItem">
          <span>Professional Skills</span>
          <SwipeableTextMobileStepper category={'professional'} />
        </div>
        <div class="PortfolioItem">
          <span>Leadership & Teamwork</span>
          <SwipeableTextMobileStepper category={'leadership'} />
        </div>
        <div class="PortfolioItem">
          <span>Creative & Personal Development</span>
          <SwipeableTextMobileStepper category={'creative'} />
        </div>
      </div>
    </>
  )
}

export default MyPortfolioPage
