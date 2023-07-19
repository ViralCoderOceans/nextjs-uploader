import { accessTokenContext } from '@/app/layout'
import useGetFBPageAccessToken from '@/hooks/useGetFBAccessToken'
import usePostFeedIntoFBPage from '@/hooks/usePostFeedIntoFBPage'
import React, { useContext, useEffect, useState } from 'react'
import { FacebookLoginButton } from 'react-social-login-buttons'
import { UploadButton } from 'react-uploader'
import { Uploader } from "uploader";
import { LoginSocialFacebook } from 'reactjs-social-login'

const page = () => {
  const [obj, setObj] = useState({})
  console.log('obj: ', obj);
  const [isLink, setIsLink] = useState(false)
  const [imageName, setImageName] = useState()
  const [isPhoto, setIsPhoto] = useState(true)
  const { fbLoginData, setFbLoginData, isFBLogin, setIsFBLogin } = useContext(accessTokenContext)
  const { postFBPageFeed } = usePostFeedIntoFBPage()
  const { fbPageAccessToken, getFbPageAccessToken } = useGetFBPageAccessToken()
  useEffect(() => {
    if (isFBLogin === true) {
      getFbPageAccessToken(fbLoginData.accessToken)
    }
  }, [isFBLogin])
  const handleFileOnChange = (path) => {
    setObj({ ...obj, url: path })
  }
  const handleSubmit = () => {
    if (isPhoto && obj.url) {
      postFBPageFeed(fbPageAccessToken, obj, 'photos')
    } else if (obj.link) {
      postFBPageFeed(fbPageAccessToken, obj, 'feed')
    } else {
      alert('Empty field on allowed')
    }
  }

  const uploader = Uploader({ apiKey: "public_kW15bXd4isLTNcPdgjNbAT98EkwJ" })

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
                        <img src={fbLoginData?.picture?.data.url} />
                      </div>
                    </div>
                    <h1 className='text-lg font-medium'>{fbLoginData?.name}</h1>
                  </div>
                </div>
                <hr className='my-4' />
                <h1 className='text-3xl font-medium'>Create post</h1>
                <hr className='my-4' />
                <div className='bg-base-300 p-4 rounded-2xl'>
                  <div className="flex justify-center bg-base-200 p-1 rounded-lg">
                    <button onClick={() => setIsPhoto(false)} className={`cursor-pointer basis-1/2 flex justify-center text-lg font-medium py-1 ${isPhoto ? 'hover:bg-neutral hover:text-white' : 'bg-neutral text-white'} rounded-lg transition-all`}>
                      Attach Link
                    </button>
                    <button onClick={() => setIsPhoto(true)} className={`cursor-pointer basis-1/2 flex justify-center text-lg font-medium py-1 ${!isPhoto ? 'hover:bg-neutral hover:text-white' : 'bg-neutral text-white'} hover:bg-neutral hover:text-white rounded-lg transition-all`}>
                      Upload local File
                    </button>
                  </div>
                  {isPhoto
                    ? <div>
                      <label className="label">
                        <span className="label-text">{'Import files (.jpeg, .jpg, .png)'}</span>
                      </label>
                      <UploadButton
                        uploader={uploader}
                        onComplete={(files) => {
                          if (files) {
                            setImageName(files[0]?.originalFile.file.name)
                            handleFileOnChange(files.map(x => x.fileUrl).join("\n"))
                          }
                        }}
                      >
                        {({ onClick }) =>
                          <div className="rounded-lg text-white flex justify-start bg-neutral border border-neutral overflow-hidden items-center cursor-pointer" onClick={onClick}>
                            <h1 className='p-3 basis-1/4 text-lg font-medium text-center'>CHOOSE FILE</h1>
                            <div className='p-3 basis-3/4 text-lg bg-white text-neutral font-medium '>{imageName || 'No file chosen'}</div>
                          </div>
                        }
                      </UploadButton>
                    </div>
                    : <>
                      <div className="form-control w-full pb-4">
                        <label className="label">
                          <span className="text-base font-medium">Write text message</span>
                        </label>
                        <textarea onChange={(e) => setObj({ ...obj, message: e.target.value })} className="textarea textarea-bordered textarea-primary" placeholder="Type text here" />
                      </div>
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="text-base font-medium">Attach your link here</span>
                        </label>
                        <input
                          onChange={(e) => {
                            if ((e.target.value !== '')) {
                              setObj({ ...obj, link: e.target.value })
                            }
                          }}
                          type="text"
                          placeholder="Type link here"
                          className="input input-bordered input-primary w-full"
                        />
                      </div>
                    </>
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