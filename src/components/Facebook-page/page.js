import useGetFBAccessToken from '@/hooks/useGetFBAccessToken'
import usePostFeedIntoFBPage from '@/hooks/usePostFeedIntoFBPage'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [obj, setObj] = useState({})
  const [isLink, setIsLink] = useState(false)
  const [isPhoto, setIsPhoto] = useState(false)
  const { getFbAccessToken, fbAccessToken } = useGetFBAccessToken()
  const { postFBPageFeed } = usePostFeedIntoFBPage()
  useEffect(() => {
    getFbAccessToken()
  }, [])
  return (
    <main className="flex min-h-screen flex-col">
      <div className='flex justify-center mb-4'>
        <div className='flex flex-col w-full'>
          <h1 className='text-3xl font-medium mb-4'>Create feed</h1>
          <hr />
          <div className="form-control w-full py-4">
            <label className="label">
              <span className="text-base font-medium">Write text message</span>
            </label>
            <input onChange={(e) => setObj({ ...obj, message: e.target.value })} type="text" placeholder="Type here" className="input input-bordered w-full" />
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="text-base font-medium">Do you want to attach link?</span>
              <input onChange={() => setIsLink(isLink ? false : true)} type="checkbox" className="toggle" checked={isLink} />
            </label>
          </div>
          {isLink &&
            <div className="form-control w-full py-4 pt-0">
              <label className="label">
                <span className="text-base font-medium">Attach your link here</span>
              </label>
              <input
                onChange={(e) => {
                  if (isLink && (e.target.value !== '')) {
                    setObj({ ...obj, link: e.target.value })
                  }
                }}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </div>
          }
          {/* <div className="form-control">
            <label className="label cursor-pointer">
              <span className="text-base font-medium">Do you want to attach photo?</span>
              <input onChange={() => setIsPhoto(isPhoto ? false : true)} type="checkbox" className="toggle" checked={isPhoto} />
            </label>
          </div>
          {isPhoto &&
            <div>
              <label className="label">
                <span className="label-text">{'Import files (.jpeg, .jpg, .png)'}</span>
              </label>
              <input type="file" className="file-input file-input-bordered w-full" />
            </div>
          } */}
        </div>
      </div>
      <hr />
      <button onClick={() => postFBPageFeed(fbAccessToken, obj)} className="btn btn-neutral w-[200px] my-4">Post</button>
      <hr />
      <button onClick={() => window.open("https://www.facebook.com/viral.reactjs", "_blank")} className="btn btn-neutral w-[200px] my-4">Open FB-page</button>
    </main>
  )
}

export default page