import React, { useEffect, useMemo, useState } from 'react'
import './NftItem.css'
import notebook from './image/notebook.svg'
import userphoto from './image/userphoto.svg'
import backarrow from './image/backarrow.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { getNFTItemByHash } from '../apis/api'

const NftItemPage = () => {
  // 從網址抓參數 nft_id
  let location = useLocation()
  console.log(location) //search有東西代表有抓到網址參數

  const [nftId, setNftId] = useState(null)
  const [nftData, setNftData] = useState({
    username: '',
    title: '',
    date: '',
    category: '',
    institution: '',
    description: '',
    verification: '',
    tags: ['']
  })

  //先從網址抓參數下來(一次性的)
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const nft_id = searchParams.get('nft_id')
    setNftId(nft_id)
  }, [location])

  //抓下參數後就可以向後端拿資料，用use effect是為了防止一直發送後端請求，不然會一直重做這個步驟
  useEffect(() => {
    if (!nftId) return
    getNFTItemByHash(nftId).then(nft_data => {
      console.log(nft_data, nft_data.category)
      setNftData(nft_data)
    })
  }, [nftId])

  const navigateTo = useNavigate()

  const goBack = () => {
    navigateTo(-1) // 回到上一页
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
            <img src={notebook} alt="notebook" />
          </span>
          <span className="Tags">
            {nftData.tags.map((each, index) => {
              return (
                <span className="TagsElement" id={'TagsElement-' + index}>
                  #{each}
                </span>
              )
            })}
          </span>
        </span>
        <span className="RightPart">
          <span className="UserInfo">
            <span className="UserPhoto">
              <img src={userphoto} alt="userphoto" />
            </span>
            <span>{nftData.username}</span>
          </span>
          <span className="ItemName">{nftData.title}</span>
          <span className="ItemInfo">
            <span className="InfoElement">
              <span className="InfoElementTitle">Date</span>
              <span className="InfoElementContent">{nftData.date}</span>
            </span>
            <span className="InfoElement">
              <span className="InfoElementTitle">Category</span>
              <span className="InfoElementContent">{nftData.category}</span>
            </span>
            <span className="InfoElement">
              <span className="InfoElementTitle">Institution</span>
              <span className="InfoElementContent">{nftData.institution}</span>
            </span>
            <span className="InfoElement">
              <span className="InfoElementTitle">Description</span>
              <span className="InfoElementContent">{nftData.description}</span>
            </span>
            <span className="InfoElement">
              <span className="InfoElementTitle">Verification</span>
              <span className="InfoElementContent">{nftData.verification}</span>
            </span>
          </span>
        </span>
      </div>
    </>
  )
}

export default NftItemPage
