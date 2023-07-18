"use client"

import { TABS } from '@/constants/constants'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'

const SideBar = () => {
  const { uploadByName } = useParams()
  return (
    <>
      <ul className="menu menu-lg bg-slate-200 border border-base-content border-e-0 rounded-2xl">
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