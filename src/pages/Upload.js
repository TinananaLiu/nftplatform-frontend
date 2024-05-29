import React, { useEffect, useState } from 'react'
import uploadfile from './image/uploadfile.svg'
import transferfile from './image/transferfile.svg'
import finishtransfer from './image/finishtransfer.svg'
import greencheck from './image/greencheck.svg'
import plus from './image/plus.svg'
import uploadicon from './image/upload.svg'
import backarrow from './image/backarrow.svg'
import UploadModal from './UploadModal'
import { uploadNft, uploadProfileToBackend } from '../apis/api'
import { useNavigate } from 'react-router-dom'
import { useSignIn } from '../providers/SignIn'

const UploadPage = () => {
  const [status, setStatus] = useState(0)
  const [modalVisible, setModalVisible] = useState(false)
  const [hashId, setHashId] = useState(null)
  const [fileURL, setFileURL] = useState(null)
  const [fileName, setFilename] = useState(null)
  const [isUpload, setIsUpload] = useState(false)

  const navigateTo = useNavigate()
  const signInContext = useSignIn()

  const goBack = () => {
    navigateTo(-1) // 回到上一页
  }

  const handleUpload = () => {
    setModalVisible(true)
  }
  useEffect(() => {
    if (!localStorage.getItem('jwt')) {
      window.location.href = '/'
    }
  }, [])

  const RenderComponent = () => {
    if (status === 0) {
      return (
        <>
          {!isUpload ? (
            <img src={uploadfile} className="UploadPic" alt="uploadfile" />
          ) : (
            <div>{fileName}</div>
          )}
          <div className="PlusContainer">
            <input
              type="file"
              id="file"
              name="file"
              style={{ display: 'none' }}
              onChange={event => {
                const file = event.target.files[0]
                if (file) {
                  const reader = new FileReader()
                  reader.onload = e => {
                    setFileURL(e.target.result)
                  }
                  reader.readAsDataURL(file)
                }
                setFilename(file.name)
                setIsUpload(true)
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
          </div>
          {/* <div className="UploadWord">or Drop files here.</div> */}
          <div className="ClickButton" onClick={handleUpload}>
            <div className="ClickButtonWord">Upload</div>
            <div className="ClickButtonIcon">
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
        setModalVisible={setModalVisible}
        fileURL={fileURL}
        fileName={fileName}
        setHashId={setHashId}
        setStatus={setStatus}
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
