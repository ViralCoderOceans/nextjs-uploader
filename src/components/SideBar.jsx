"use client"

import { accessTokenContext } from '@/app/layout'
import { TABS } from '@/constants/constants'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect } from 'react'
import { isMobile } from 'react-device-detect';

const SideBar = () => {
  const { uploadByName } = useParams()
  const { isSidebar, setIsSidebar } = useContext(accessTokenContext)
  useEffect(() => {
    if (isMobile) {
      setIsSidebar(false)
    }
  }, [])
  return (
    <>
      <ul className={`fixed z-[99] py-10 ${isMobile ? '' : 'border-r-2 border-neutral'} h-full w-full md:w-fit menu menu-lg bg-base-300 ${isSidebar ? 'translate-x-0' : '-translate-x-full md:-translate-x-44'} transition-all`}>
        {
          TABS.map((elm) => (
            <li
              key={elm.id}
              onClick={() => {
                if (isMobile) {
                  setIsSidebar(false)
                }
              }}
            >
              <Link
                key={elm.id}
                href={`/upload/${elm.path}`}
                className={`${uploadByName === elm.path ? 'active' : ''}`}
              >
                {elm.name}
              </Link>
            </li>
          ))
        }
      </ul>
    </>
  )
}

export default SideBar