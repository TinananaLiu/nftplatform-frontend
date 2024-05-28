import React, { useEffect, useMemo, useState } from 'react'
import './GalleryItem.css'
// import notebook from './image/notebook.svg'
// import userphoto from './image/userphoto.svg'
import backarrow from './image/backarrow.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAllNftsByUser } from '../apis/api'

const GalleryItemPage = () => {
  const location = useLocation()

  const [nftList, setNftList] = useState(null)
  const [resolved, setResolved] = useState(false)
  const [person, setPerson] = useState('')
  const navigateTo = useNavigate()

  const goBack = () => {
    navigateTo(-1) // 回到上一页
  }

  useEffect(() => {
    if (!localStorage.getItem('jwt')) {
      //從galleryitem跳轉到signin，galleryItem會存入歷史紀錄，如果接下來想上一頁，會一直回到galleryitem導致又被轉跳，所以更改歷史紀錄，把 galleryItem 改寫成 gallery
      window.history.replaceState(null, '', '/gallery')
      window.location.href = '/signin'
      return
    }
    const searchParams = new URLSearchParams(location.search)
    const person = searchParams.get('person')
    const personId = searchParams.get('personId')
    if (!person) {
      setResolved(true)
      return
    }
    setPerson(person)
    getAllNftsByUser(personId).then(data => {
      console.log(data)
      if (data.length !== 0) {
        setNftList(data)
      } else {
        setNftList(undefined)
      }
      setResolved(true)
    })
  }, [location])

  const RenderPage = () => {
    if (resolved) {
      if (!nftList) {
        if (!person) {
          navigateTo('/gallery')
        }
        return (
          <div
            style={{
              fontFamily: 'Kanit',
              fontWeight: '400',
              fontSize: '40px',
              lineHeight: '70px',
              textAlign: 'start'
            }}>
            User specified is not found.
          </div>
        )
      } else {
        return (
          <>
            <div
              style={{
                fontFamily: 'Kanit',
                fontWeight: '500',
                fontSize: '40px',
                lineHeight: '70px',
                textAlign: 'start'
              }}>
              {person}'s portfolio
            </div>
            <div className="GalleryItemContainer">
              {nftList.map(nft => {
                return (
                  <div
                    // key={portfolio.user_id}
                    className="NftList"
                    //這邊要改成按了之後導到不同NftItem
                    onClick={() => {
                      navigateTo(`/nftitem?nft_id=${nft.nft_id}`)
                    }}>
                    <span className="NftListImg">
                      <img
                        src={
                          process.env.REACT_APP_GOOGLE_STORAGE_NFT + nft.image
                        }
                        alt={nft.title + '的圖片'}
                      />
                    </span>
                    <span className="NftListTitle">{nft.title}</span>
                  </div>
                  // <img
                  //   style={{
                  //     borderRadius: '1.25rem'
                  //   }}
                  //   src={each.cover}
                  //   onClick={() => navigateTo('/nftitem?nft_id=' + each.nft_id)}
                  // />
                )
              })}
            </div>
          </>
        )
      }
    } else {
      return (
        <div
          style={{
            fontFamily: 'Kanit',
            fontWeight: '500',
            fontSize: '40px',
            lineHeight: '70px',
            textAlign: 'start'
          }}>
          loading...
        </div>
      )
    }
  }

  return (
    <>
      <div className="BackContainer">
        <img src={backarrow} alt="back" onClick={goBack} />
      </div>

      <div
        style={{
          width: '90%'
          // height: '100vh'
        }}>
        <RenderPage />
      </div>
    </>
  )
}

export default GalleryItemPage
