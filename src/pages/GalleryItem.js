import React, { useEffect, useMemo, useState } from 'react'
import './GalleryItem.css'
// import notebook from './image/notebook.svg'
// import userphoto from './image/userphoto.svg'
import backarrow from './image/backarrow.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { getPersonProfile } from '../apis/api'

const GalleryItemPage = () => {
  const location = useLocation()

  const [profile, setProfile] = useState(null)
  const [resolved, setResolved] = useState(false)
  const [person, setPerson] = useState('')
  const navigateTo = useNavigate()

  const goBack = () => {
    navigateTo(-1) // 回到上一页
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const person = searchParams.get('person')
    if (!person) {
      setResolved(true)
      return
    }
    setPerson(person)
    getPersonProfile(person).then(profile => {
      if (profile) {
        setProfile(profile)
      }
      setResolved(true)
    })
  }, [location])

  const RenderPage = () => {
    if (resolved) {
      if (!profile) {
        if (!person) {
          navigateTo('/gallery')
        }
        return (
          <div
            style={{
              fontFamily: 'Kanit',
              fontWeight: '400',
              fontSize: '40px',
              lineHeight: '70px',
              textAlign: 'start'
            }}>
            User specified is not found.
          </div>
        )
      } else {
        return (
          <>
            <div
              style={{
                fontFamily: 'Kanit',
                fontWeight: '500',
                fontSize: '40px',
                lineHeight: '70px',
                textAlign: 'start'
              }}>
              {person}'s profile
            </div>
            <div className="ProfileGrid">
              {profile.map((each, map) => {
                return (
                  <img
                    style={{
                      borderRadius: '1.25rem'
                    }}
                    src={each.cover}
                    alt={each.name}
                  />
                )
              })}
            </div>
          </>
        )
      }
    } else {
      return (
        <div
          style={{
            fontFamily: 'Kanit',
            fontWeight: '500',
            fontSize: '40px',
            lineHeight: '70px',
            textAlign: 'start'
          }}>
          loading...
        </div>
      )
    }
  }

  return (
    <>
      <div className="BackContainer">
        <img src={backarrow} alt="back" onClick={goBack} />
      </div>

      <div
        style={{
          width: '90%',
          // height: '100vh'
        }}>
        <RenderPage />
      </div>
    </>
  )
}

export default GalleryItemPage
