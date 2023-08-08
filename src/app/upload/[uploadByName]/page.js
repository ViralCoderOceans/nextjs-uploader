"use client"

import React from 'react'
import { useParams } from 'next/navigation'
import FacebookPage from '../../../components/Facebook-page/page'
import FacebookAccount from '../../../components/Facebook-account/page'
import Instagram from '../../../components/Instagram/page'
import Youtube from '../../../components/Youtube/page'
import YoutubeTest from '../../../components/YoutubeTest/page'
import FacebookTesting from '../../../components/Facebook-testing/page'

const page = () => {
  const { uploadByName } = useParams()
  return (
    <>
      {uploadByName === 'to-facebook-page' && <FacebookPage />}
      {uploadByName === 'to-facebook-account' && <FacebookAccount />}
      {uploadByName === 'to-instagram' && <Instagram />}
      {uploadByName === 'to-youtube' && <Youtube />}
      {uploadByName === 'to-youtube-test' && <YoutubeTest />}
      {uploadByName === 'to-facebook-testing' && <FacebookTesting />}
    </>
  )
}

export default page