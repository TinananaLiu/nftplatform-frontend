import React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import { updateUserBio } from '../apis/api'

export default function FormDialog({ setUserBio }) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <React.Fragment>
      <IconButton aria-label="edit">
        <EditIcon onClick={handleClickOpen} />
      </IconButton>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: event => {
            event.preventDefault()
            const formData = new FormData(event.currentTarget)
            const formJson = Object.fromEntries(formData.entries())
            const email = formJson.email
            console.log(email)
            handleClose()
          }
        }}>
        <DialogTitle>Biography</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please introduce yourself or write anything you'd like to share!
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="new_custom_bio"
            name="mood"
            label="Type anything"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            onClick={event => {
              const value = document.getElementById('new_custom_bio').value
              updateUserBio({ userBio: value })
              setUserBio(value)
            }}>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
