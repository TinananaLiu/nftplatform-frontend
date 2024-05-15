import React, { useState } from 'react'
import './Profile.css'
import userphoto from './image/userphoto.svg'
import levelbar from './image/levelbar.svg'
import token from './image/token.svg'
import { styled } from '@mui/material/styles'
import LinearProgress, {
  linearProgressClasses
} from '@mui/material/LinearProgress'

import Box from '@mui/material/Box'
import backarrow from './image/backarrow.svg'
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
          <span className="InfoItem">User Name</span>
          <span className="InfoItem">level</span>
          <span className="InfoItem">some user information</span>
          <span className="InfoItem">
            <Box sx={{ width: '100%' }}>
              <BorderLinearProgress variant="determinate" value={progress} />
            </Box>
          </span>
        </span>
      </div>

      <div className="Award">
        <span className="AwardElement">
          <span className="TokenType">Token 1</span>
          <span className="TokenImg">
            <img src={token} alt="token" />
          </span>
          <span className="TokenNum">#. T1</span>
        </span>
        <span className="AwardElement">
          <span className="TokenType">Token 2</span>
          <span className="TokenImg">
            <img src={token} alt="token" />
          </span>
          <span className="TokenNum">#. T2</span>
        </span>
        <span className="AwardElement">
          <span className="TokenType">Token 3</span>
          <span className="TokenImg">
            <img src={token} alt="token" />
          </span>
          <span className="TokenNum">#. T3</span>
        </span>
        <span className="AwardElement">
          <span className="TokenType">Token 4</span>
          <span className="TokenImg">
            <img src={token} alt="token" />
          </span>
          <span className="TokenNum">#. T4</span>
        </span>
      </div>
    </>
  )
}

export default ProfilePage
