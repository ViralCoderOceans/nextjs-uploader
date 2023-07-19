import { accessTokenContext } from '@/app/layout'
import useGetFBPageAccessToken from '@/hooks/useGetFBAccessToken'
import usePostFeedIntoFBPage from '@/hooks/usePostFeedIntoFBPage'
import React, { useContext, useEffect, useState } from 'react'
import { FacebookLoginButton } from 'react-social-login-buttons'
import { LoginSocialFacebook } from 'reactjs-social-login'

const page = () => {
  const [obj, setObj] = useState({})
  console.log('obj: ', obj);
  const [isLink, setIsLink] = useState(false)
  const [isPhoto, setIsPhoto] = useState(false)
  const { fbLoginData, setFbLoginData, isFBLogin, setIsFBLogin } = useContext(accessTokenContext)
  const { postFBPageFeed } = usePostFeedIntoFBPage()
  const { fbPageAccessToken, getFbPageAccessToken } = useGetFBPageAccessToken()
  useEffect(() => {
    if (isFBLogin === true) {
      getFbPageAccessToken(fbLoginData.accessToken)
    }
  }, [isFBLogin])
  const handleSubmit = () => {
    postFBPageFeed(fbPageAccessToken, obj)
  }
  return (
    <main className="flex min-h-screen flex-col">
      <div className='flex justify-center'>
        <div className='flex flex-col w-full'>
          {
            isFBLogin
              ? <>
                <div className='flex justify-between items-center'>
                  <h1 className='text-3xl font-medium'>You're logged-in :</h1>
                  <div className='flex items-center'>
                    <div className="avatar mx-3">
                      <div className="w-10 rounded-full border">
                        <img src={fbLoginData.picture?.data.url} />
                      </div>
                    </div>
                    <h1 className='text-lg font-medium'>{fbLoginData.name}</h1>
                  </div>
                </div>
                <hr className='my-4' />
                <h1 className='text-3xl font-medium'>Create post</h1>
                <hr className='my-4' />
                <div className='bg-base-300 p-4 rounded-2xl'>
                  <div className="form-control w-full pb-4">
                    <label className="label">
                      <span className="text-base font-medium">Write text message</span>
                    </label>
                    <textarea onChange={(e) => setObj({ ...obj, message: e.target.value })} className="textarea textarea-bordered textarea-primary" placeholder="Type text here" />
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="text-base font-medium">Do you want to attach link?</span>
                      <input onChange={() => setIsLink(isLink ? false : true)} type="checkbox" className="toggle toggle-primary" checked={isLink} />
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
                        placeholder="Type link here"
                        className="input input-bordered input-primary w-full"
                      />
                    </div>
                  }
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="text-base font-medium">Do you want to attach photo?</span>
                      <input onChange={() => setIsPhoto(isPhoto ? false : true)} type="checkbox" className="toggle toggle-primary" checked={isPhoto} />
                    </label>
                  </div>
                  {isPhoto &&
                    <div>
                      <label className="label">
                        <span className="label-text">{'Import files (.jpeg, .jpg, .png)'}</span>
                      </label>
                      <input onChange={(e) => setObj({ ...obj, url: URL.createObjectURL(e.target.files[0]) })} type="file" className="file-input file-input-bordered file-input-primary w-full" />
                    </div>
                  }
                </div>
                <hr className='my-4' />
                <div className='flex justify-between items-center'>
                  <button onClick={handleSubmit} className="btn btn-neutral text-white w-[200px]">Post</button>
                  <button onClick={() => window.open("https://www.facebook.com/viral.reactjs", "_blank")} className="btn btn-neutral text-white w-[200px]">Open FB-page</button>
                </div>
                <hr className='my-4' />
              </>
              : <>
                <h1 className='text-3xl font-medium'>Facebook-login required :</h1>
                <hr className='my-4' />
                <div className='w-fit'>
                  <LoginSocialFacebook
                    appId='211579308138783'
                    onResolve={(res) => {
                      console.log('FB-login-data:', res.data)
                      setFbLoginData(res.data)
                      setIsFBLogin(true)
                    }}
                    onReject={(err) => console.log(err)}
                  >
                    <FacebookLoginButton />
                  </LoginSocialFacebook>
                </div>
              </>
          }

        </div>
      </div>
    </main>
  )
}

export default page