import React from 'react'
import './Home.css'
import introduction from './image/introduction.svg'
import feature1 from './image/feature1.svg'
import feature2 from './image/feature2.svg'
import feature3 from './image/feature3.svg'
import function1 from './image/uploadFunction.svg'
import function2 from './image/galleryFunction.svg'
import function3 from './image/profileFunction.svg'

import { useLocation, useNavigate } from 'react-router-dom'
import { useSignIn } from '../providers/SignIn'

const HomePage = () => {
  const navigateTo = useNavigate()
  const signInContext = useSignIn()

  return (
    <>
      <div className="Introduction">
        <img
          src={introduction}
          alt="intro"
          onClick={() => {
            signInContext.loggedIn
              ? navigateTo('/upload')
              : navigateTo('/signin')
          }}
        />
        {/* <span
          className="StartToUpload"
          ></span> */}
      </div>

      <div className="Feature">
        <span className="FeatureTitle">What can we do?</span>
        <span className="FeaturePart">
          <span className="FeatureElement">
            <span className="FeatureImg">
              <img src={feature1} alt="f1" />
            </span>
            <span className="FeatureText">Lifetime Learning Ledger</span>
          </span>
          <span className="FeatureElement">
            <span className="FeatureImg">
              <img src={feature2} alt="f2" />
            </span>
            <span className="FeatureText">NFT-Enabled Vertification</span>
          </span>
          <span className="FeatureElement">
            <span className="FeatureImg">
              <img src={feature3} alt="f3" />
            </span>
            <span className="FeatureText">Trust-Driven Reward System</span>
          </span>
        </span>
      </div>

      <div className="Feature">
        <span className="FeatureTitle">Function Overview</span>
        <span className="FeaturePart">
          <span className="FeatureElement">
            <span className="FeatureImg">
              <img src={function1} alt="function1" />
            </span>
            <span className="FeatureText">NFT Portfolio Upload</span>
            <span className="FeatureTextDetail">
              Upload and convert your portfolio into NFTs.
            </span>
          </span>
          <span className="FeatureElement">
            <span className="FeatureImg">
              <img src={function2} alt="function2" />
            </span>
            <span className="FeatureText">Gallery</span>
            <span className="FeatureTextDetail">
              Explore portfolios from other creators.
            </span>
          </span>
          <span className="FeatureElement">
            <span className="FeatureImg">
              <img src={function3} alt="function3" />
            </span>
            <span className="FeatureText">Profile & Rewards</span>
            <span className="FeatureTextDetail">
              Track your rewards and likes.
            </span>
          </span>
        </span>
      </div>
    </>
  )
}

export default HomePage
