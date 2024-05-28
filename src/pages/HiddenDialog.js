import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Checkbox from '@mui/material/Checkbox'
import { hiddenNft } from '../apis/api'

export default function HiddenDialog({ nftId, hidden }) {
  const [open, setOpen] = useState(false)
  const [checked, setChecked] = useState(hidden)
  const [dialogContent, setDialogContent] = useState('')

  const handleClickOpen = () => {
    if (checked) {
      setDialogContent('Are you sure you want to show this NFT item?')
    } else {
      setDialogContent('Are you sure you want to hide this NFT item?')
    }
    setOpen(true)
  }

  const handleClose = async () => {
    setOpen(false)
  }
  const handleClick = async () => {
    setOpen(false)
    const newHiddenStatus = !checked
    hiddenNft(nftId, newHiddenStatus).then(status => {
      if (status === 200) {
        setChecked(newHiddenStatus)
      }
    })
  }
  useEffect(() => {
    console.log(checked)
  }, [])
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  return (
    <React.Fragment>
      <Checkbox
        {...label}
        icon={<VisibilityIcon />}
        checkedIcon={<VisibilityOffIcon />}
        checked={checked}
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {checked ? 'Confirm Show' : 'Confirm Hide'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cancel</Button>
          <Button onClick={() => handleClick()} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
