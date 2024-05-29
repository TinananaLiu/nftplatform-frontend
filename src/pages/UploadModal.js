import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import closex from './image/closex.svg'
import plus from './image/plus.svg'
import './UploadModal.css'
import { colors } from '@mui/material'
import { uploadNft } from '../apis/api'
import { checkURL } from './cover'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '30%',
    height: '60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transform: 'translate(-50%, -50%)',
    fontFamily: 'Kanit, sans-serif',
    alignItems: 'center',
    backgroundColor: '#9FCAE3'
  }
}

const UploadModal = ({
  modalVisible,
  fileURL,
  setModalVisible,
  fileName,
  setStatus,
  setHashId
}) => {
  const [imageURL, setImage] = useState(null)
  const [verify1URL, setVerify1] = useState(null)
  const [verify2URL, setVerify2] = useState(null)
  const [verify3URL, setVerify3] = useState(null)
  const [fileNames, setFileNames] = useState({
    image: '',
    file: '',
    verify1: '',
    verify2: '',
    verfiy3: ''
  })
  const [error, setError] = useState('')
  const handleModalClose = () => {
    setError('')
    setModalVisible(false)
    setImage(null)
  }
  useEffect(() => {
    fileNames.file = fileName
  }, [fileName])
  const handleSave = async e => {
    // 把這些內容都取出來
    e.preventDefault()
    const title = document.querySelector('#nfttitle').value
    // const date = document.querySelector('#nftdate').value
    const category = document.querySelector('#nftcategory').value
    const institution = document.querySelector('#nftinstitution').value
    const tag1 = document.querySelector('#nfttag1').value
    const tag2 = document.querySelector('#nfttag2').value
    const description = document.querySelector('#nftdescription').value
    if (tag1.length > 5) {
      setError('Tooo much in tag1')
      return
    }
    if (tag2.length > 5) {
      setError('Tooo much in tag2')
      return
    }
    if (!imageURL) {
      setError('no image')
      return
    }
    if (!fileURL) {
      setError('no file')
      return
    }

    const payload = {
      title,
      category,
      institution,
      tag1: tag1,
      tag2: tag2,
      description,
      verify1URL: verify1URL,
      verify2URL: verify2URL,
      verify3URL: verify3URL,
      imageURL: imageURL,
      fileURL: fileURL,
      fileNames: fileNames
    }
    // 把 modal 關了
    setModalVisible(false)
    // 切到下一頁
    setStatus(1)
    // 把資料傳給後端處理
    console.log('上傳:', payload)
    const result = await uploadNft(payload)
    // 等到後端回傳回來, 就再下一頁, 把重要資訊記起來. 提供後續 render
    // ...
    console.log('回傳:', result)
    setStatus(2)
    setHashId(result.nft_id)
  }
  return (
    <Modal
      isOpen={modalVisible}
      onRequestClose={handleModalClose}
      style={customStyles}
      contentLabel="Example Modal">
      <div className="Close" onClick={handleModalClose}>
        <img src={closex} className="CloseX" alt="closex" />
      </div>
      <form
        onSubmit={handleSave}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <div className="UpperPart">
          <div className="UpperLeft">
            <span className="InputItem">
              <span className="InputTitle">Title</span>
              <span className="InputBox">
                <input
                  required
                  className="InputBoxElement"
                  type="text"
                  id="nfttitle"
                />
              </span>
            </span>
            <span className="InputItem">
              <span className="InputTitle">Category</span>
              <span className="InputBox">
                <select className="InputBoxElement" id="nftcategory" required>
                  <option value="Academic">Academic</option>
                  <option value="Professional">Professional</option>
                  <option value="Collaboration">Collaboration</option>
                  <option value="Creativity">Creativity</option>
                </select>
              </span>
            </span>
            <span className="InputItem">
              <span className="InputTitle">Institution</span>
              <span className="InputBox">
                <input
                  required
                  className="InputBoxElement"
                  type="text"
                  id="nftinstitution"
                />
              </span>
            </span>
            <span className="InputItem">
              <span className="InputTitle">Tag1</span>
              <span className="InputBox">
                <input
                  className="InputBoxElement"
                  type="text"
                  id="nfttag1"
                  required
                />
              </span>
            </span>
            <span className="InputItem">
              <span className="InputTitle">Tag2</span>
              <span className="InputBox">
                <input
                  className="InputBoxElement"
                  type="text"
                  id="nfttag2"
                  required
                />
              </span>
            </span>
          </div>

          <div className="UpperRight">
            <div className="PlusImage">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/png, image/jpeg"
                hidden
                onChange={event => {
                  console.log(event)
                  const file = event.target.files[0] //傳這個"file"到api.js再給後端(但可能太大跨不進去api.js)
                  /*以下是為了畫面的render 所以用FileReader()來監聽(瀏覽器內建的函式)
                    onload監聽打開後，看會不會收到一個e的事件發生，才會執行setAvatar
                    那收到的事件e就是下面轉成url的這個訊號
                    */
                  if (file && file.type.startsWith('image')) {
                    const reader = new FileReader()
                    reader.onload = e => {
                      setImage(e.target.result)
                    }

                    reader.readAsDataURL(file)
                    fileNames.image = file.name
                  }
                }}
                // ref={fileInputRef}
              />
              <label htmlFor="imageURL" className="avatar-label">
                {imageURL ? (
                  <img
                    src={imageURL}
                    className="Avatar"
                    id="nftimage"
                    alt="avatar"
                  />
                ) : (
                  <img
                    src={plus}
                    className="Plus"
                    alt="plus"
                    onClick={() => {
                      document.getElementById('image').click()
                    }}
                  />
                )}
              </label>
            </div>
            <div>Image</div>
          </div>
        </div>

        <div className="DescPart">
          <span className="DescElement">
            <span className="InputTitleForDesc">Description</span>
            <span className="InputBoxForDesc">
              <textarea
                required
                style={{ resize: 'none' }}
                className="InputBoxElementForDesc"
                id="nftdescription"
              />
            </span>
          </span>
          <span className="DescElement">
            <span className="InputTitleForDesc">Verification</span>
            <span className="InputBoxForVerify">
              {/* First Verification------------------------- */}
              <input
                type="file"
                id="verify1"
                name="verify1"
                hidden
                onChange={event => {
                  console.log(event)
                  const file1 = event.target.files[0]
                  if (file1) {
                    const reader1 = new FileReader()
                    reader1.onload = e => {
                      setVerify1(e.target.result)
                    }

                    reader1.readAsDataURL(file1)
                    fileNames.verify1 = file1.name
                  }
                }}
                // ref={fileInputRef}
              />
              <label htmlFor="verify1URL" className="verify-label">
                {verify1URL ? (
                  <img
                    src={checkURL(verify1URL)}
                    className="Verify"
                    id="verify1"
                    alt="verify1"
                  />
                ) : (
                  <img
                    src={plus}
                    className="VerifyPlusImg"
                    alt="plus"
                    onClick={() => {
                      document.getElementById('verify1').click()
                    }}
                  />
                )}
              </label>
              {/* Second Verification------------------------- */}
              <input
                type="file"
                id="verify2"
                name="verify2"
                hidden
                onChange={event => {
                  console.log(event)
                  const file2 = event.target.files[0]
                  if (file2) {
                    const reader2 = new FileReader()
                    reader2.onload = e => {
                      setVerify2(e.target.result)
                    }

                    reader2.readAsDataURL(file2)
                    fileNames.verify2 = file2.name
                  }
                }}
                // ref={fileInputRef}
              />
              <label htmlFor="verify2URL" className="verify-label">
                {verify2URL ? (
                  <img
                    src={checkURL(verify2URL)}
                    className="Verify"
                    id="verify2"
                    alt="verify2"
                  />
                ) : (
                  <img
                    src={plus}
                    className="VerifyPlusImg"
                    alt="plus"
                    onClick={() => {
                      document.getElementById('verify2').click()
                    }}
                  />
                )}
              </label>
              {/* Third Verification------------------------- */}
              <input
                type="file"
                id="verify3"
                name="verify3"
                hidden
                onChange={event => {
                  console.log(event)
                  const file3 = event.target.files[0]
                  if (file3) {
                    const reader3 = new FileReader()
                    reader3.onload = e => {
                      setVerify3(e.target.result)
                    }

                    reader3.readAsDataURL(file3)
                    fileNames.verify3 = file3.name
                  }
                }}
                // ref={fileInputRef}
              />
              <label htmlFor="verify3URL" className="verify-label">
                {verify3URL ? (
                  <img
                    src={checkURL(verify3URL)}
                    className="Verify"
                    id="verify3"
                    alt="verify3"
                  />
                ) : (
                  <img
                    src={plus}
                    className="VerifyPlusImg"
                    alt="plus"
                    onClick={() => {
                      document.getElementById('verify3').click()
                    }}
                  />
                )}
              </label>

              {/* <textarea
                style={{ resize: 'none' }}
                className="InputBoxElementForDesc"
                id="nftverify"
              /> */}
            </span>
          </span>
        </div>

        <div
          style={{
            height: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          {error !== '' ? (
            <div
              style={{
                height: '2rem',
                fontSize: '1rem'
              }}>
              {error}
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="TwoButton">
          <input className="SaveButton" type="submit" value="Save"></input>
          {/* <div className="EditButton">Edit</div> */}
        </div>
      </form>
    </Modal>
  )
}

export default UploadModal
