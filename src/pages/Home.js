import React from 'react'
import './Home.css'
import introduction from './image/introduction.svg'
import feature1 from './image/feature1.svg'
import feature2 from './image/feature2.svg'
import feature3 from './image/feature3.svg'

import { useLocation, useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigateTo = useNavigate()
  return (
    <>
      <div className="Introduction">
        <img
          src={introduction}
          alt="intro"
          onClick={() => {
            navigateTo('/upload')
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
    </>
  )
}

export default HomePage
