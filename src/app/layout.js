"use client"

import Navbar from '@/components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import SideBar from '@/components/SideBar'
import { createContext, useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const accessTokenContext = createContext()

export default function RootLayout({ children }) {
  const [fbLoginData, setFbLoginData] = useState(null)
  const [isFBPosting, setIsFBPosting] = useState(false)

  useEffect(() => {
    setFbLoginData(localStorage.getItem('fbLoginData') ? JSON.parse(localStorage.getItem('fbLoginData')) : null)
  }, [])

  useEffect(() => {
    updateFBLocalStorage()
  }, [fbLoginData])

  const updateFBLocalStorage = () => {
    if (fbLoginData) {
      localStorage.setItem('fbLoginData', JSON.stringify(fbLoginData))
    }
  }

  return (
    <html lang="en">
      <head>
        <title>UPLOADER</title>
        {/* <link rel="icon" href="/favicon.ico" sizes="any" /> */}
      </head>
      <body className={`${inter.className} flex flex-col h-screen relative overflow-hidden`}>
        <Navbar />
        <div className='h-screen bg-white flex text-black p-4 overflow-y-auto' data-theme="light">
          <SideBar />
          <accessTokenContext.Provider
            value={{
              fbLoginData,
              setFbLoginData,
              isFBPosting,
              setIsFBPosting,
              updateFBLocalStorage
            }}
          >
            <div className='w-full bg-accent rounded-2xl p-5'>
              {children}
            </div>
          </accessTokenContext.Provider>
        </div>
      </body>
    </html>
  )
}
