import React, { useEffect, useState } from 'react'
import './GalleryItem.css'
// import notebook from './image/notebook.svg'
// import userphoto from './image/userphoto.svg'
import backarrow from './image/backarrow.svg'
import { useLocation, useNavigate } from 'react-router-dom'
// import { getNFTItemByHash } from '../apis/api'

const GalleryItemPage = () => {
  //   // 從網址抓參數 nft_id
  //   let location = useLocation()
  //   console.log(location) //search有東西代表有抓到網址參數

  //   const [nftId, setNftId] = useState(null)
  //   const [nftData, setNftData] = useState({
  //     username: '',
  //     title: '',
  //     date: '',
  //     category: '',
  //     institution: '',
  //     description: '',
  //     tags: ['']
  //   })

  //   //先從網址抓參數下來(一次性的)
  //   useEffect(() => {
  //     const searchParams = new URLSearchParams(location.search)
  //     const nft_id = searchParams.get('nft_id')
  //     setNftId(nft_id)
  //   }, [location])

  //   //抓下參數後就可以向後端拿資料，用use effect是為了防止一直發送後端請求，不然會一直重做這個步驟
  //   useEffect(() => {
  //     if (!nftId) return
  //     getNFTItemByHash(nftId).then(nft_data => {
  //       console.log(nft_data, nft_data.category)
  //       setNftData(nft_data)
  //     })
  //   }, [nftId])

  const navigateTo = useNavigate()

  const goBack = () => {
    navigateTo(-1) // 回到上一页
  }

  return (
    <>
      <div className="BackContainer">
        <img src={backarrow} alt="back" onClick={goBack} />
      </div>

      <div className="GalleryItemContainer"></div>
    </>
  )
}

export default GalleryItemPage
