import useGetFBAccessToken from '@/hooks/useGetFBAccessToken'
import usePostFeedIntoFBPage from '@/hooks/usePostFeedIntoFBPage'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [obj, setObj] = useState({})
  const { getFbAccessToken, fbAccessToken } = useGetFBAccessToken()
  const { postFBPageFeed } = usePostFeedIntoFBPage()
  useEffect(() => {
    getFbAccessToken()
  }, [])
  return (
    <main className="flex min-h-screen flex-col">
      <div className='flex justify-center'>
        <div className='flex flex-col justify-center h-[400px] w-full'>
          <h1 className='text-3xl font-medium'>Create feed</h1>
          <div className="form-control w-full py-4">
            <label className="label">
              <span className="label-text">Write text message</span>
            </label>
            <input onChange={(e) => setObj({ ...obj, message: e.target.value })} type="text" placeholder="Type here" className="input input-bordered w-full" />
          </div>
          <div className="form-control w-full py-4 pt-0">
            <label className="label">
              <span className="label-text">Attach link here</span>
            </label>
            <input
              onChange={(e) => {
                if (e.target.value !== '') {
                  setObj({ ...obj, link: e.target.value })
                }
              }}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </div>
          {/* <div>
            <label className="label">
              <span className="label-text">{'Import files (.jpeg, .jpg, .png)'}</span>
            </label>
            <input type="file" className="file-input file-input-bordered w-full" />
          </div> */}
          <button onClick={() => postFBPageFeed(fbAccessToken, obj)} className="btn w-[200px] my-4">Post</button>
        </div>
      </div>
      <hr />
      <button onClick={() => window.open("https://www.facebook.com/viral.reactjs", "_blank")} className="btn w-[200px] my-4">Open FB-page</button>
    </main>
  )
}

export default page