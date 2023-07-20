"use client"

import Navbar from '@/components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import SideBar from '@/components/SideBar'
import { createContext, useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const accessTokenContext = createContext()

export default function RootLayout({ children }) {
  const [fbLoginData, setFbLoginData] = useState()
  const [isFBLogin, setIsFBLogin] = useState(false)
  const [isFBPosting, setIsFBPosting] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('isFBLogin')) {
      setIsFBLogin(localStorage.getItem('isFBLogin'))
    } else {
      localStorage.setItem('isFBLogin', isFBLogin)
    }
  }, [])

  return (
    <html lang="en">
      <head>
        <title>UPLOADER</title>
        {/* <link rel="icon" href="/favicon.ico" sizes="any" /> */}
      </head>
      <body className={`${inter.className} flex flex-col h-screen relative overflow-hidden`}>
        <Navbar />
        <div className='h-full bg-white flex text-black p-4' data-theme="light">
          <SideBar />
          <accessTokenContext.Provider
            value={{
              fbLoginData,
              setFbLoginData,
              isFBLogin,
              setIsFBLogin,
              isFBPosting,
              setIsFBPosting
            }}
          >
            <div className='w-full h-full bg-accent rounded-2xl p-5'>
              {children}
            </div>
          </accessTokenContext.Provider>
        </div>
      </body>
    </html>
  )
}
