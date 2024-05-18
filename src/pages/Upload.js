import React, { useState } from 'react'
import uploadfile from './image/uploadfile.svg'
import transferfile from './image/transferfile.svg'
import finishtransfer from './image/finishtransfer.svg'
import greencheck from './image/greencheck.svg'
import plus from './image/plus.svg'
import uploadicon from './image/upload.svg'
import backarrow from './image/backarrow.svg'
import UploadModal from './UploadModal'
import { uploadProfileToBackend } from '../apis/api'
import { useLocation, useNavigate } from 'react-router-dom'

const UploadPage = () => {
  const [status, setStatus] = useState(0)
  const [modalVisible, setModalVisible] = useState(false)
  const [hashId, setHashId] = useState(null)
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')

  const navigateTo = useNavigate()

  const goBack = () => {
    navigateTo(-1) // 回到上一页
  }

  const handleUpload = () => {
    setModalVisible(true)
  }

  const handleSave = async (e) => {
    // 把這些內容都取出來
    e.preventDefault()
    const title = document.querySelector('#nfttitle').value
    const date = document.querySelector('#nftdate').value
    const category = document.querySelector('#nftcategory').value
    const institution = document.querySelector('#nftinstitution').value
    const tags = document.querySelector('#nfttags').value
    const description = document.querySelector('#nftdescription').value
    const verification = document.querySelector('#nftverify').value
    const image = document.querySelector('#nftimage')
    console.log(image)
    if (!image) {
      setError('no image')
      return
    }
    if (!file) {
      setError('no file')
      return
    }
    
    const payload = {
      title,
      date,
      category,
      institution,
      tags,
      description,
      verification,
      image: image.src,
      file: file
    }
    console.log('上傳:', payload)
    // 把 modal 關了
    setModalVisible(false)
    // 切到下一頁
    setStatus(1)
    // 把資料傳給後端處理
    const result = await uploadProfileToBackend(payload)
    // 等到後端回傳回來, 就再下一頁, 把重要資訊記起來. 提供後續 render
    // ...
    console.log('回傳:', result)
    setStatus(2)
    setHashId(result)
  }

  const RenderComponent = () => {
    if (status === 0) {
      return (
        <>
          <img src={uploadfile} className="UploadPic" alt="uploadfile" />
          <div>
            <input
              type="file"
              id="file"
              name="file"
              //   accept="image/png, image/jpeg"
              style={{ display: 'none' }}
              onChange={event => {
                const file = event.target.files[0]
                if (file) {
                  const reader = new FileReader()
                  reader.onload = e => {
                    setFile(e.target.result)
                  }
                  reader.readAsDataURL(file)
                }
              }}
            />
            <img
              src={plus}
              id="nftfile"
              className="Plus"
              alt="plus"
              onClick={() => {
                document.getElementById('file').click()
              }}
            />

            {/* <img src={plus} className="Plus" alt="plus" /> */}
          </div>
          <div className="UploadWord">or Drop files here.</div>
          <div className="ClickButton" onClick={handleUpload}>
            <div>Upload</div>
            <div>
              <img src={uploadicon} className="GreenCheck" alt="uploadicon" />
            </div>
          </div>
        </>
      )
    } else if (status === 1) {
      return (
        <>
          <img src={transferfile} className="UploadPic" alt="transferfile" />
          <div className="UploadWord">Transfer to NFT ...</div>
          <div className="ClickButton">Please wait ...</div>
        </>
      )
    }
    return (
      <>
        <img src={finishtransfer} className="UploadPic" alt="finishtransfer}" />
        <div className="UploadWord">
          <div className="Done">Done </div>
          <img src={greencheck} className="GreenCheck" alt="greencheck" />
        </div>
        <div
          className="ClickButton"
          onClick={() => {
            navigateTo(`/nftitem?nft_id=${hashId}`)
          }}>
          Go check!
        </div>
      </>
    )
  }

  return (
    <>
      <UploadModal
        modalVisible={modalVisible}
        closeModal={() => {
          setError('')
          setModalVisible(false)
        }}
        handleSave={handleSave}
        error={error}
      />
      <div className="BackContainer">
        <img src={backarrow} alt="back" onClick={goBack} />
      </div>
      <div className="UploadContainer">
        <RenderComponent />
      </div>
    </>
  )
}

export default UploadPage
