import React, { useState } from 'react'
import './Profile.css'
import userphoto from './image/userphoto.svg'
import levelbar from './image/levelbar.svg'
import atoken from './image/atoken.svg'
import ptoken from './image/ptoken.svg'
import coltoken from './image/coltoken.svg'
import cretoken from './image/cretoken.svg'
// import token from './image/token.svg'
import { styled } from '@mui/material/styles'
import LinearProgress, {
  linearProgressClasses
} from '@mui/material/LinearProgress'

import Box from '@mui/material/Box'
import backarrow from './image/backarrow.svg'
import likeicon from './image/likes.svg'
import tagicon from './image/tags.svg'
import { useNavigate } from 'react-router-dom'

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  borderRadius: 10,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 10,
    backgroundColor: theme.palette.mode === 'light' ? '#EC6264' : '#308fe8'
  }
}))

const ProfilePage = () => {
  const [progress, setProgress] = useState(50)
  const navigateTo = useNavigate()

  const goBack = () => {
    navigateTo(-1) // 回到上一页
  }

  return (
    <>
      {/* <div>ProfileTest2</div> */}
      <div className="BackContainer">
        <img src={backarrow} alt="back" onClick={goBack} />
      </div>

      <div className="UserPart">
        <span className="Photo">
          <img src={userphoto} alt="userphoto" />
        </span>
        <span className="Info">
          <span className="InfoItem">Tinanana</span>
          <span className="InfoItem">
            <span className="InfoIcon">
              <img src={likeicon} alt="likes" />
            </span>
            <Box sx={{ width: '100%' }}>
              <BorderLinearProgress variant="determinate" value={progress} />
            </Box>
          </span>
          {/* <span className="InfoItem">level</span>
          <span className="InfoItem">some user information</span> */}
          <span className="InfoItem">
            <span className="InfoIcon">
              <img src={tagicon} alt="tags" />
            </span>
            <Box sx={{ width: '100%' }}>
              <BorderLinearProgress variant="determinate" value={progress} />
            </Box>
          </span>
        </span>
      </div>

      <div className="Award">
        <span className="AwardElement">
          <span className="TokenType">Academic</span>
          <span className="TokenImg">
            <img src={atoken} alt="token" />
          </span>
          <span className="TokenNum">#. T1</span>
        </span>
        <span className="AwardElement">
          <span className="TokenType">Professional</span>
          <span className="TokenImg">
            <img src={ptoken} alt="token" />
          </span>
          <span className="TokenNum">#. T2</span>
        </span>
        <span className="AwardElement">
          <span className="TokenType">Collaboration</span>
          <span className="TokenImg">
            <img src={coltoken} alt="token" />
          </span>
          <span className="TokenNum">#. T3</span>
        </span>
        <span className="AwardElement">
          <span className="TokenType">Creativity</span>
          <span className="TokenImg">
            <img src={cretoken} alt="token" />
          </span>
          <span className="TokenNum">#. T4</span>
        </span>
      </div>
    </>
  )
}

export default ProfilePage