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
  const [isSidebar, setIsSidebar] = useState(true)

  const handleSidebar = () => {
    setIsSidebar(isSidebar ? false : true)
  }

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
        <accessTokenContext.Provider
          value={{
            fbLoginData,
            setFbLoginData,
            isFBPosting,
            setIsFBPosting,
            updateFBLocalStorage,
            isSidebar,
            handleSidebar
          }}
        >
          <Navbar />
          <div className='h-full mt-20 bg-accent flex text-black overflow-hidden' data-theme="light">
            <SideBar />
            <div className={`w-full h-full ${isSidebar ? 'md:ml-[149px]' : 'ml-0'} transition-all overflow-y-auto p-10`}>
              {children}
            </div>
          </div>
        </accessTokenContext.Provider>
      </body>
    </html>
  )
}
