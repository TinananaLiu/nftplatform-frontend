import React, { useEffect, useMemo, useState } from 'react'
import './NftItem.css'
import notebook from './image/notebook.svg'
import pdficon from './image/pdficon.svg'
// import userphoto from './image/userphoto.svg'
import defaultavatar from './image/defaultavatar.svg'
import backarrow from './image/backarrow.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { getNFTItemByHash, getNftInfo, updateNftLikes } from '../apis/api'

import Button from '@mui/material/Button'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'

import Checkbox from '@mui/material/Checkbox'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'

import HiddenDialog from './HiddenDialog'
import { useSignIn } from '../providers/SignIn'
import { Height } from '@mui/icons-material'
import { Link } from '@mui/material'
import { checkFileName } from './cover'
// export default function IconCheckboxes() {
//   return (
//     <div>
//       <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
//       <Checkbox
//         {...label}
//         icon={<BookmarkBorderIcon />}
//         checkedIcon={<BookmarkIcon />}
//       />
//     </div>
//   );
//}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

const NftItemPage = () => {
  // 從網址抓參數 nft_id
  let location = useLocation()
  console.log(location) //search有東西代表有抓到網址參數

  const { info: my_info } = useSignIn()
  const [nftId, setNftId] = useState(undefined)
  const [like, setLike] = useState(false)
  const [show, setShow] = useState(false)
  // const [nftData, setNftData] = useState({
  //   username: '',
  //   title: '',
  //   date: '',
  //   category: '',
  //   institution: '',
  //   description: '',
  //   verification: '',
  //   tags: ['']
  // })
  const [nftData, setNftData] = useState(undefined)

  //先從網址抓參數下來(一次性的)
  //抓下參數後就可以向後端拿資料，用use effect是為了防止一直發送後端請求，不然會一直重做這個步驟
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const param = searchParams.get('nft_id')
    setNftId(param)
    if (param && my_info) {
      getNftInfo(param).then(nft_data => {
        console.log(nft_data[0])
        setNftData(nft_data[0])
        setLike(nft_data[0].like)
        if (nft_data[0].user_id === my_info.user_id) {
          setShow(true)
        }
      })
    }
  }, [location, my_info])

  const navigateTo = useNavigate()

  const goBack = () => {
    navigateTo(-1) // 回到上一页
  }

  //按like
  const handleClick = async () => {
    const newLike = !like
    updateNftLikes(nftId, newLike).then(status => {
      if (status === 200) {
        console.log(newLike)
        setLike(newLike)
      }
    })
  }

  return (
    <>
      {/* <div>NftItemTest</div>

      <div>Back</div>
      <div>NFT Item</div> */}
      <div className="BackContainer">
        <img src={backarrow} alt="back" onClick={goBack} />
      </div>

      <div className="NftContainer">
        <span className="LeftPart">
          <span className="Image">
            {/* 這裡要改nft image */}
            <img
              src={
                nftData && nftData.image
                  ? process.env.REACT_APP_GOOGLE_STORAGE_NFT + nftData.image
                  : notebook
              }
              alt="defaultnft"
            />
            {/* <img src={notebook} alt="notebook" /> */}
          </span>
          <span className="Tags">
            {nftData ? (
              <>
                <span className="TagsElement" id={'TagsElement-'}>
                  #{nftData.tag1}
                </span>
                <span className="TagsElement" id={'TagsElement-'}>
                  #{nftData.tag2}
                </span>
              </>
            ) : (
              ''
            )}
          </span>
          <span className="Delete">
            <span>
              <Checkbox
                {...label}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                checked={like}
                onClick={handleClick}
              />
            </span>
            {/* &&的意思是前面是true時才會往下執行，可以避免後面執行時呼叫nftData.OOO時出錯(要確保nftData不是undefined) */}
            <span>
              {show && nftData && (
                <HiddenDialog nftId={nftId} hidden={nftData.hidden} />
              )}
            </span>
          </span>
        </span>
        <span className="RightPart">
          <span className="UserInfo">
            <span className="UserPhoto">
              <img
                src={
                  nftData && nftData.user_image
                    ? process.env.REACT_APP_GOOGLE_STORAGE_USER +
                      nftData.user_image
                    : defaultavatar
                }
                alt="defaultavatar"
                style={{ Height: '50%' }}
              />
            </span>
            <span>{nftData && nftData.user_name}</span>
          </span>
          <span className="ItemName">{nftData && nftData.title}</span>
          <span className="ItemInfo">
            <span className="InfoElement">
              <span className="InfoElementTitle">Date</span>
              <span className="InfoElementContent">
                {nftData && nftData.date}
              </span>
            </span>
            <span className="InfoElement">
              <span className="InfoElementTitle">Category</span>
              <span className="InfoElementContent">
                {nftData && nftData.category}
              </span>
            </span>
            <span className="InfoElement">
              <span className="InfoElementTitle">Institution</span>
              <span className="InfoElementContent">
                {nftData && nftData.institution}
              </span>
            </span>
            <span className="InfoElement">
              <span className="InfoElementTitle">Description</span>
              <span className="InfoElementContent">
                {nftData && nftData.description}
              </span>
            </span>
            <span className="InfoElement">
              <span className="InfoElementTitle">Verification</span>
              <span className="InfoElementContent">
                <span className="Verify">
                  {nftData && nftData.verify1 && (
                    <span className="VerifyElement">
                      <span className="VerifyTitle">{'1)'}</span>
                      <span className="VerifyImg">
                        <img
                          src={checkFileName(nftData.verify1)}
                          alt={nftData.verify1.split('.')[1]}
                        />
                      </span>
                      <span className="VerifyFile">
                        {nftData.verify1 && (
                          <Link
                            component="button"
                            onClick={() => {
                              window.open(
                                process.env.REACT_APP_GOOGLE_STORAGE_NFT +
                                  nftData.verify1,
                                '_blank',
                                'rel=noopener noreferrer'
                              )
                            }}>
                            {nftData.verify1.split('.')[1]}
                          </Link>
                        )}
                      </span>
                    </span>
                  )}
                  {nftData && nftData.verify2 && (
                    <span className="VerifyElement">
                      <span className="VerifyTitle">{'2)'}</span>
                      <span className="VerifyImg">
                        <img
                          src={checkFileName(nftData.verify2)}
                          alt={nftData.verify2.split('.')[1]}
                        />
                      </span>
                      <span className="VerifyFile">
                        {nftData.verify2 && (
                          <Link
                            component="button"
                            onClick={() => {
                              window.open(
                                process.env.REACT_APP_GOOGLE_STORAGE_NFT +
                                  nftData.verify2,
                                '_blank',
                                'rel=noopener noreferrer'
                              )
                            }}>
                            {nftData.verify2.split('.')[1]}
                          </Link>
                        )}
                      </span>
                    </span>
                  )}
                  {nftData && nftData.verify3 && (
                    <span className="VerifyElement">
                      <span className="VerifyTitle">{'3)'}</span>
                      <span className="VerifyImg">
                        <img
                          src={checkFileName(nftData.verify3)}
                          alt={nftData.verify3.split('.')[1]}
                        />
                      </span>
                      <span className="VerifyFile">
                        {nftData.verify3 && (
                          <Link
                            component="button"
                            onClick={() => {
                              window.open(
                                process.env.REACT_APP_GOOGLE_STORAGE_NFT +
                                  nftData.verify3,
                                '_blank',
                                'rel=noopener noreferrer'
                              )
                            }}>
                            {nftData.verify3.split('.')[1]}
                          </Link>
                        )}
                      </span>
                    </span>
                  )}

                  {/* {nftData && <span>{'2) ' + nftData.verify2}</span>}
                  {nftData && <span>{'3) ' + nftData.verify3}</span>} */}
                </span>
                {/* <span></span>
                {nftData && nftData.verification} */}
              </span>
            </span>
          </span>
        </span>
      </div>
    </>
  )
}

export default NftItemPage
