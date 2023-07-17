"use client"

import { TABS } from '@/constants/constants'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'

const TopBar = () => {
  const { uploadByName } = useParams()
  return (
    <>
      <div className="tabs mb-5 flex justify-center">
        {
          TABS.map((elm) => (
            <Link href={`/upload/${elm.path}`} className={`tab tab-bordered text-lg font-medium ${uploadByName === elm.path ? 'tab-active' : ''}`}>{elm.name}</Link>
          ))
        }
      </div>
    </>
  )
}

export default TopBar