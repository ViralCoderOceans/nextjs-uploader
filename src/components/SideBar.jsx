"use client"

import { accessTokenContext } from '@/app/layout'
import { TABS } from '@/constants/constants'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useContext } from 'react'

const SideBar = () => {
  const { uploadByName } = useParams()
  const { isSidebar } = useContext(accessTokenContext)
  return (
    <>
      <ul className={`fixed z-[99] h-full w-full md:w-fit menu menu-lg bg-base-300 ${isSidebar ? 'translate-x-0' : '-translate-x-full md:-translate-x-44'} transition-all`}>
        {
          TABS.map((elm) => (
            <li key={elm.id}>
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