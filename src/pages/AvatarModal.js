import React, { useState } from 'react'
import Modal from 'react-modal'
import closex from './image/closex.svg'
import plus from './image/plus.svg'
import defaultavatar from './image/defaultavatar.svg'
import './AvatarModal.css'

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

const AvatarModal = ({ modalVisible, closeModal, handleSave, error }) => {
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
      <div className="Close1" onClick={handleModalClose}>
        <img src={closex} className="CloseX1" alt="closex" />
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
        <div className="AvatarPart">
          <div className="PlusImage1">
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
            <label htmlFor="avatar" className="avatar-label1">
              {avatar ? (
                <img
                  src={avatar}
                  className="newAvatar"
                  id="userimage"
                  alt="avatar"
                />
              ) : (
                <img src={defaultavatar} className="Default" alt="default" />
              )}
            </label>
          </div>
          <div>Profile photo</div>
        </div>

        <div className="DescPart1">
          <span className="InputTitleUsername">Username</span>
          <span className="InputBoxUsername">
            <textarea
              style={{ resize: 'none' }}
              className="InputBoxElementUsername"
              id="username"
            />
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

        <div className="TwoButton1">
          <input className="SaveButton1" type="submit" value="Edit"></input>
          {/* <div className="EditButton">Edit</div> */}
        </div>
      </form>
    </Modal>
  )
}

export default AvatarModal
