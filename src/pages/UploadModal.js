import React, { useState } from 'react'
import Modal from 'react-modal'
import closex from './image/closex.svg'
import plus from './image/plus.svg'
import './UploadModal.css'
import { colors } from '@mui/material'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '25%',
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transform: 'translate(-50%, -50%)',
    fontFamily: 'Kanit, sans-serif',
    alignItems: 'center',
    backgroundColor: '#9FCAE3'
  }
}

const UploadModal = ({ modalVisible, closeModal, handleSave, error }) => {
  const [avatar, setAvatar] = useState(null)

  const handleModalClose = () => {
    closeModal()
    setAvatar(null)
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
      <form onSubmit={handleSave} style={{width: '100%' , height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
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
              <select className="InputBoxElement" id="nftcategory">
                <option value="category1">Academic</option>
                <option value="category2">Professional</option>
                <option value="category3">Collaboration</option>
                <option value="category4">Creativity</option>
              </select>
              {/* <input className="InputBoxElement" type="text" id="nftcategory" /> */}
            </span>
          </span>
          <span className="InputItem">
            <span className="InputTitle">Institution</span>
            <span className="InputBox">
              <input
                className="InputBoxElement"
                type="text"
                id="nftinstitution"
              />
            </span>
          </span>
          <span className="InputItem">
            <span className="InputTitle">Tag1</span>
            <span className="InputBox">
              <input className="InputBoxElement" type="text" id="nfttag1" />
            </span>
          </span>
          <span className="InputItem">
            <span className="InputTitle">Tag2</span>
            <span className="InputBox">
              <input className="InputBoxElement" type="text" id="nfttag2" />
            </span>
          </span>
        </div>

        <div className="UpperRight">
          <div className="PlusImage">
            <div>
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/png, image/jpeg"
                hidden
                onChange={event => {
                  console.log(event)
                  const file = event.target.files[0]
                  if (file && file.type.startsWith('image')) {
                    const reader = new FileReader()
                    reader.onload = e => {
                      setAvatar(e.target.result)
                    }

                    reader.readAsDataURL(file)
                  }
                }}
                // ref={fileInputRef}
              />
              <label htmlFor="avatar" className="avatar-label">
                {avatar ? (
                  <img
                    src={avatar}
                    className="Avatar"
                    id="nftimage"
                    alt="avatar"
                  />
                ) : (
                  <img src={plus} className="Plus" alt="plus" />
                )}
              </label>
            </div>
          </div>
          <div>Image</div>
        </div>
      </div>

      <div className="DescPart">
        <span className="DescElement">
          <span className="InputTitleForDesc">Description</span>
          <span className="InputBoxForDesc">
            <textarea
              style={{ resize: 'none' }}
              className="InputBoxElementForDesc"
              id="nftdescription"
            />
          </span>
        </span>
        <span className="DescElement">
          <span className="InputTitleForDesc">Verification</span>
          <span className="InputBoxForDesc">
            <textarea
              style={{ resize: 'none' }}
              className="InputBoxElementForDesc"
              id="nftverify"
            />
          </span>
        </span>
      </div>

      <div
      // style={{
      //   height: '1rem',
      //   display: 'flex',
      //   justifyContent: 'center',
      //   alignContent: 'center',
      //   margin: '1rem 0 1rem 0'
      // }}
      >
        {error !== '' ? (
          <div
            style={{
              height: '1rem',
              fontSize: '1rem'
            }}>
            {error}
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="TwoButton">
        <input className="SaveButton" type='submit' >
          
        </input>
        {/* <div className="EditButton">Edit</div> */}
      </div>
      </form>
    </Modal>
  )
}

export default UploadModal
