import React from 'react'
import './MyPortfolio.css'
import userphoto from './image/userphoto.svg'
import backarrow from './image/backarrow.svg'
import { useNavigate } from 'react-router-dom'
import SwipeableTextMobileStepper from './NftItemStepper'

const MyPortfolioPage = () => {
  const navigateTo = useNavigate()

  const goBack = () => {
    navigateTo(-1) // 回到上一页
  }

  return (
    <>
      {/* <div>MyPortfolioTest</div> */}

      <div className="BackContainer">
        <img src={backarrow} alt="back" onClick={goBack} />
      </div>

      <div className="MyUserPart">
        <span className="MyPhoto">
          <img src={userphoto} alt="userphoto" />
        </span>
        <span className="MyInfo">
          <span className="MyInfoItem">Tinanana</span>
          <span className="MyInfoItem">...</span>
          <span className="MyInfoItem">...</span>
          <span className="MyInfoItem">
            {/* <Box sx={{ width: '100%' }}>
              <BorderLinearProgress variant="determinate" value={progress} />
            </Box> */}
          </span>
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
