import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MobileStepper from '@mui/material/MobileStepper'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import SwipeableViews from 'react-swipeable-views-react-18-fix'
import { autoPlay } from 'react-swipeable-views-utils'
import './NftItemStepper.css'
import defaultbg from './image/defaultbg.svg'
import { useNavigate } from 'react-router-dom'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const defaultImages = {
  Academic: [
    {
      label: 'San Francisco - Oakland Bay Bridge, United States',
      imgPath:
        'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60'
    }
  ],
  Professional: [
    {
      label: 'Bird',
      imgPath:
        'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60'
    }
  ],
  Collaboration: [
    {
      label: 'Bali, Indonesia',
      imgPath:
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250'
    }
  ],
  Creativity: [
    {
      label: 'Goč, Serbia',
      imgPath:
        'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
    }
  ]
}

function SwipeableTextMobileStepper({ category, nftsImg }) {
  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)
  const [images, setImages] = React.useState(nftsImg && nftsImg[category])
  const maxSteps = images && images.length
  const navigateTo = useNavigate()

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleStepChange = step => {
    setActiveStep(step)
  }
  React.useEffect(() => {
    // fetch('').then(res => {
    //   setImages(res.data)
    // })
    console.log(images)
  }, [images])
  return (
    <Box
      sx={{
        maxWidth: '100%',
        flexGrow: 1,
        maxHeight: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
      {/* <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: '#dbecf589'
        }}>
        <Typography>{images[activeStep].label}</Typography>
      </Paper> */}
      <Box sx={{ maxHeight: '60%', overflow: 'hidden' }}>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          autoplay={false}
          enableMouseEvents>
          {images && images.length > 0 ? (
            images.map(step => (
              <div key={step.label} className="StepperImg">
                {Math.abs(activeStep - 0) <= 2 ? (
                  <Box
                    component="img"
                    sx={{
                      height: '60%',
                      display: 'block',
                      maxWidth: '80%',
                      overflow: 'hidden',
                      width: '100%',
                      objectFit: 'cover',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    src={step.imgPath}
                    alt={step.label}
                    onClick={() => navigateTo(`/nftitem?nft_id=${step.nft_id}`)}
                  />
                ) : null}
              </div>
            ))
          ) : (
            <div className="StepperImg">
              <Box
                component="img"
                sx={{
                  height: '10rem',
                  display: 'block',
                  // maxWidth: '80%',
                  overflow: 'hidden',
                  width: '10rem',
                  objectFit: 'cover',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                src={defaultbg}
                alt="default"
              />
            </div>
          )}

          {/* {images &&
            images.map(step => (
              <div key={step.label} className="StepperImg">
                {Math.abs(activeStep - 0) <= 2 ? (
                  <Box
                    component="img"
                    sx={{
                      height: '60%',
                      display: 'block',
                      maxWidth: '80%',
                      overflow: 'hidden',
                      width: '100%',
                      objectFit: 'cover',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    src={step.imgPath}
                    alt={step.label}
                  />
                ) : null}
              </div>
            ))} */}
        </AutoPlaySwipeableViews>
      </Box>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{
          width: '90%',
          height: '5%',
          bgcolor: 'transparent',
          marginBottom: '2.5rem'
          // display: 'flex'
          // justifyContent: 'center'
        }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  )
}

export default SwipeableTextMobileStepper
