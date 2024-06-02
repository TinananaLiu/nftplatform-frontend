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
import { checkURL } from './Cover'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import HelpIcon from '@mui/icons-material/Help'
import IconButton from '@mui/material/IconButton'

const UploadPage = () => {
  const [status, setStatus] = useState(0)
  const [modalVisible, setModalVisible] = useState(false)
  const [hashId, setHashId] = useState(null)
  const [fileURL, setFileURL] = useState(null)
  const [fileName, setFilename] = useState(null)

  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 400,
      fontSize: '15px',
      fontFamily: 'Kanit',
      fontWeight: 'normal',
      whiteSpace: 'pre-line'
    }
  })

  const longText = `Upload Hint:  
1. First, click the "plus" icon to upload your main file.
2. Then, click the "upload" button for further inputs.
`

  const navigateTo = useNavigate()
  const signInContext = useSignIn()

  const goBack = () => {
    navigateTo(-1) // 回到上一页
  }

  const handleUpload = () => {
    if (fileURL) {
      setModalVisible(true)
    } else {
      window.alert('Please upload main file first!')
    }
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
          <div style={{ alignSelf: 'end' }}>
            <CustomWidthTooltip title={longText}>
              <IconButton aria-label="hint">
                <HelpIcon />
              </IconButton>
              {/* <Button sx={{ fontFamily: 'Kanit' }}>?</Button> */}
            </CustomWidthTooltip>
          </div>
          {!fileURL ? (
            <img src={uploadfile} className="UploadPic" alt="uploadfile" />
          ) : (
            <div>
              <img
                src={checkURL(fileURL)}
                className="UploadPic"
                id="UploadFile"
                alt="UploadFile"
              />
              <div>{fileName}</div>
            </div>
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
                    console.log(e.target.result)
                    setFileURL(e.target.result)
                  }
                  reader.readAsDataURL(file)
                }
                setFilename(file.name)
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
