import React, { useEffect, useState } from 'react'
import Button from '@mui/joy/Button'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import DialogTitle from '@mui/joy/DialogTitle'
import DialogContent from '@mui/joy/DialogContent'
import Stack from '@mui/joy/Stack'
import Add from '@mui/icons-material/Add'
import { Form } from 'react-router-dom'
import defaultavatar from './image/defaultavatar.svg'
import './AvatarModal.css'
import { updateImgAndName } from '../apis/api'

export default function AvatarDialog({
  userName,
  avatar,
  setUserName,
  setAvatar
}) {
  const [open, setOpen] = React.useState(false)
  const [newAvatar, setNewAvatar] = React.useState(null)
  const [newName, setNewName] = React.useState(userName)
  const [newFileName, setNewFileName] = React.useState(null)

  useEffect(() => setNewName(userName), [userName])
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<Add />}
        sx={{ fontFamily: 'Kanit' }}
        onClick={() => setOpen(true)}>
        Edit Profile
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle sx={{ alignSelf: 'center' }}>
            Edit Your Profile
          </DialogTitle>
          {/* <DialogContent>Fill in the information of the project.</DialogContent> */}
          <form
            onSubmit={async event => {
              event.preventDefault()
              console.log(newName)
              console.log(newAvatar)
              await updateImgAndName(newName, newAvatar, newFileName).then(
                status => {
                  if (status === 200) {
                    setUserName(newName)
                    setAvatar(newAvatar)
                  }
                }
              )
              setOpen(false)
            }}>
            <Stack spacing={2}>
              <FormControl sx={{ display: 'flex', alignItems: 'center' }}>
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
                        //順便取filename(到時候傳入後端)
                        setNewFileName(file.name)
                        if (file && file.type.startsWith('image')) {
                          const reader = new FileReader()
                          reader.onload = e => {
                            setNewAvatar(e.target.result)
                          }

                          reader.readAsDataURL(file)
                        }
                      }}
                      // ref={fileInputRef}
                    />
                    <label htmlFor="avatar" className="avatar-label1">
                      {newAvatar ? (
                        <img
                          src={newAvatar}
                          className="newAvatar"
                          id="userimage"
                          alt="avatar"
                        />
                      ) : avatar ? (
                        <img
                          src={avatar}
                          className="newAvatar"
                          id="userimage"
                          alt="avatar"
                        />
                      ) : (
                        <img
                          src={defaultavatar}
                          className="Default"
                          alt="default"
                        />
                      )}
                    </label>
                  </div>
                </div>
                <FormLabel sx={{ alignSelf: 'center' }}>Photo</FormLabel>
                <FormLabel sx={{ alignSelf: 'center' }}>Username</FormLabel>
                <input
                  id="new_user_name"
                  autoFocus
                  required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                />
              </FormControl>
              {/* <FormControl>
                <FormLabel>Description</FormLabel>
                <Input required />
              </FormControl> */}
              <Button type="submit">Edit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  )
}
