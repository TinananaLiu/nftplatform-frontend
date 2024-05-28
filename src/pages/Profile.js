import React, { useState, useEffect } from 'react'
import './Profile.css'
// import userphoto from './image/userphoto.svg'
import defaultavatar from './image/defaultavatar.svg'
import atoken from './image/atoken.svg'
import ptoken from './image/ptoken.svg'
import coltoken from './image/coltoken.svg'
import cretoken from './image/cretoken.svg'
import backarrow from './image/backarrow.svg'
import likeicon from './image/likes.svg'
import rankicon from './image/crown.svg'
import { useNavigate } from 'react-router-dom'
import { useSignIn } from '../providers/SignIn'
import { getRank, getTotalLikes, getUserInfo } from '../apis/api'

// const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
//   height: 20,
//   borderRadius: 10,
//   [`&.${linearProgressClasses.colorPrimary}`]: {
//     backgroundColor:
//       theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
//   },
//   [`& .${linearProgressClasses.bar}`]: {
//     borderRadius: 10,
//     backgroundColor: theme.palette.mode === 'light' ? '#EC6264' : '#308fe8'
//   }
// }))

const ProfilePage = () => {
  const [progress, setProgress] = useState(50)
  const [tokenAca, setTokenAca] = useState(0)
  const [tokenCol, setTokenCol] = useState(0)
  const [tokenCre, setTokenCre] = useState(0)
  const [tokenPro, setTokenPro] = useState(0)
  const [totalLike, setTotalLike] = useState(0)
  const [rank, setRank] = useState(0)
  const navigateTo = useNavigate()
  const { info: my_info } = useSignIn()
  const signInContext = useSignIn()

  const goBack = () => {
    navigateTo(-1) // 回到上一页
  }
  useEffect(() => {
    if (!localStorage.getItem('jwt')) {
      window.location.href = '/'
    } else {
      getUserInfo().then(res => {
        if (res[0]) {
          const {
            token_academic,
            token_collaboration,
            token_creativity,
            token_professional
          } = res[0]
          setTokenAca(token_academic)
          setTokenPro(token_professional)
          setTokenCol(token_collaboration)
          setTokenCre(token_creativity)
        }
      })
      getTotalLikes().then(res => {
        if (res[0]) {
          const { total_likes } = res[0]
          setTotalLike(total_likes)
        }
      })
      getRank().then(res => {
        console.log(res)
        if (res) {
          const { rank } = res
          setRank(rank)
        }
      })
    }
  }, [])
  return (
    <>
      {/* <div>ProfileTest2</div> */}
      <div className="BackContainer">
        <img src={backarrow} alt="back" onClick={goBack} />
      </div>

      <div className="UserPart">
        <span className="Photo">
          <img
            src={
              my_info.image
                ? process.env.REACT_APP_GOOGLE_STORAGE_USER + my_info.image
                : defaultavatar
            }
            style={{
              height: '100%'
            }}
            alt="defaultavatar"
          />
        </span>
        <span className="Info">
          <span className="InfoItem">
            {my_info.user_name ? my_info.user_name : 'Username'}
          </span>
          <span className="InfoItem">
            <span className="InfoIcon">
              <img src={likeicon} alt="likes" />
            </span>
            <span className="InfoNum">{totalLike}</span>
          </span>
          {/* <span className="InfoItem">level</span>
          <span className="InfoItem">some user information</span> */}
          <span className="InfoItem">
            <span className="InfoIcon">
              <img src={rankicon} alt="ranking" />
            </span>
            <span className="InfoNum">ranking {rank}</span>
            {/* <Box sx={{ width: '100%' }}>
              <BorderLinearProgress variant="determinate" value={progress} />
            </Box> */}
          </span>
        </span>
      </div>

      <div className="Award">
        <span className="AwardElement">
          <span className="TokenType">Academic</span>
          <span className="TokenImgContainer">
            <img className="TokenImg" src={atoken} alt="token" />
          </span>
          <span className="TokenNum">{tokenAca}</span>
        </span>
        <span className="AwardElement">
          <span className="TokenType">Professional</span>
          <span className="TokenImgContainer">
            <img className="TokenImg" src={ptoken} alt="token" />
          </span>
          <span className="TokenNum">{tokenPro}</span>
        </span>
        <span className="AwardElement">
          <span className="TokenType">Collaboration</span>
          <span className="TokenImgContainer">
            <img className="TokenImg" src={coltoken} alt="token" />
          </span>
          <span className="TokenNum">{tokenCol}</span>
        </span>
        <span className="AwardElement">
          <span className="TokenType">Creativity</span>
          <span className="TokenImgContainer">
            <img className="TokenImg" src={cretoken} alt="token" />
          </span>
          <span className="TokenNum">{tokenCre}</span>
        </span>
      </div>
    </>
  )
}

export default ProfilePage
