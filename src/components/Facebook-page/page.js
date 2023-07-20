import { accessTokenContext } from '@/app/layout'
import useGetFBPageAccessToken from '@/hooks/useGetFBAccessToken'
import usePostFeedIntoFBPage from '@/hooks/usePostFeedIntoFBPage'
import React, { useContext, useEffect, useState } from 'react'
import { FacebookLoginButton } from 'react-social-login-buttons'
import { UploadButton } from 'react-uploader'
import { Uploader } from "uploader";
import { LoginSocialFacebook } from 'reactjs-social-login'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
  const [linkObj, setLinkObj] = useState({})
  const [photoObj, setPhotoObj] = useState({})
  const [videoObj, setVideoObj] = useState({})
  console.log('videoObj: ', videoObj)
  // console.log('linkObj: ', setLinkObj)
  const [imageName, setImageName] = useState()
  const [uploadType, setUploadType] = useState({ isLink: true })
  const { fbLoginData, setFbLoginData, isFBLogin, setIsFBLogin, isFBPosting, setIsFBPosting } = useContext(accessTokenContext)
  const { postFBPageFeed } = usePostFeedIntoFBPage()
  const { fbPageAccessToken, getFbPageAccessToken } = useGetFBPageAccessToken()

  useEffect(() => {
    localStorage.setItem('fbLoginData', fbLoginData)
  }, [fbLoginData])

  useEffect(() => {
    if (isFBLogin === true) {
      // getFbPageAccessToken(fbLoginData.accessToken)
      setLinkObj({
        ...linkObj,
        access_token: fbPageAccessToken
      })
      setPhotoObj({
        ...photoObj,
        access_token: fbPageAccessToken
      })
      setVideoObj({
        ...videoObj,
        access_token: fbPageAccessToken
      })
    }
  }, [isFBLogin])

  useEffect(() => {
    setLinkObj({
      ...linkObj,
      access_token: fbPageAccessToken
    })
  }, [fbPageAccessToken])

  useEffect(() => {
    if (uploadType.isPhoto) {
      setLinkObj({
        message: linkObj.message || '',
        access_token: fbPageAccessToken
      })
    } else {
      setLinkObj({
        message: linkObj.message || '',
        access_token: fbPageAccessToken
      })
    }
  }, [uploadType.isPhoto])

  const handleSubmit = () => {
    setIsFBPosting(true)
    if (uploadType.isPhoto && linkObj.url) {
      postFBPageFeed(linkObj, 'photos', notify, notifyError)
    } else if (uploadType.isVideo && videoObj.file_url) {
      postFBPageFeed(videoObj, 'videos', notify, notifyError)
    } else if (uploadType.isLink && (linkObj.link || linkObj.message)) {
      postFBPageFeed(linkObj, 'feed', notify, notifyError)
    } else {
      setIsFBPosting(false)
      notifyError('Empty field on allowed.')
    }
  }

  const uploader = Uploader({ apiKey: "public_kW15bXd4isLTNcPdgjNbAT98EkwJ" })

  const notify = (msg) => {
    toast.success(msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setLinkObj({ access_token: linkObj.access_token })
    setImageName('')
    setIsFBPosting(false)
  }
  const notifyError = (msg) => {
    toast.error(msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
    setLinkObj({ access_token: linkObj.access_token })
    setImageName('')
    setIsFBPosting(false)
  }

  return (
    <main className="flex flex-col">
      <div className='flex justify-center'>
        <div className='flex flex-col w-full'>
          {
            isFBLogin
              ? <>
                <div className='flex justify-between items-center'>
                  <h1 className='text-3xl font-medium'>You're logged-in :</h1>
                  <div className='flex items-center'>
                    <div className="avatar mx-3">
                      <div className="w-10 rounded-full border-2 border-neutral">
                        <img src={fbLoginData?.picture?.data.url} alt='DP' />
                      </div>
                    </div>
                    <h1 className='text-lg font-medium'>{fbLoginData?.name}</h1>
                  </div>
                </div>
                <hr className='my-4' />
                <h1 className='text-3xl font-medium'>Create post</h1>
                <hr className='my-4' />
                <div className='bg-base-300 p-4 rounded-2xl'>
                  <div className='mb-4'>
                    <label className="label">
                      <span className="text-base font-medium">Select one option :</span>
                    </label>
                    <div className="flex justify-center gap-1 bg-base-200 p-1 rounded-lg">
                      <button onClick={() => setUploadType({ isLink: true })} className={`cursor-pointer basis-1/2 flex justify-center text-lg font-medium py-1 ${!uploadType.isLink ? 'hover:bg-neutral hover:text-white' : 'bg-neutral text-white'} rounded-lg transition-all`}>
                        Attach Link
                      </button>
                      <button onClick={() => setUploadType({ isPhoto: true })} className={`cursor-pointer basis-1/2 flex justify-center text-lg font-medium py-1 ${!uploadType.isPhoto ? 'hover:bg-neutral hover:text-white' : 'bg-neutral text-white'} hover:bg-neutral hover:text-white rounded-lg transition-all`}>
                        Upload photo
                      </button>
                      <button onClick={() => setUploadType({ isVideo: true })} className={`cursor-pointer basis-1/2 flex justify-center text-lg font-medium py-1 ${!uploadType.isVideo ? 'hover:bg-neutral hover:text-white' : 'bg-neutral text-white'} hover:bg-neutral hover:text-white rounded-lg transition-all`}>
                        Upload video
                      </button>
                    </div>
                  </div>

                  {
                    uploadType.isLink &&
                    <div className="form-control w-full">
                      <div className="form-control w-full mb-4">
                        <label className="label">
                          <span className="text-base font-medium">Write text :</span>
                        </label>
                        <textarea onChange={(e) => setLinkObj({ ...linkObj, message: e.target.value })} className="textarea textarea-bordered textarea-primary" value={linkObj.message || ''} placeholder="Type text here" />
                      </div>
                      <label className="label">
                        <span className="text-base font-medium">Attach your link here :</span>
                      </label>
                      <input
                        onChange={(e) => { setLinkObj({ ...linkObj, link: e.target.value }) }}
                        value={linkObj.link || ''}
                        type="text"
                        placeholder="Type link here"
                        className="input input-bordered input-primary w-full"
                      />
                    </div>
                  }

                  {
                    uploadType.isPhoto &&
                    <div className="form-control w-full">
                      <div className="form-control w-full mb-4">
                        <label className="label">
                          <span className="text-base font-medium">Photo caption :</span>
                        </label>
                        <textarea onChange={(e) => setLinkObj({ ...linkObj, message: e.target.value })} className="textarea textarea-bordered textarea-primary" value={linkObj.message || ''} placeholder="Type text here" />
                      </div>
                      <label className="label">
                        <span className="text-base font-medium">{'Import photos (.jpeg, .jpg, .png) :'}</span>
                      </label>
                      <UploadButton
                        uploader={uploader}
                        onComplete={(files) => {
                          if (files) {
                            setImageName(files[0]?.originalFile.file.name)
                            setLinkObj({ ...linkObj, url: files.map(x => x.fileUrl).join("\n") })
                          }
                        }}
                      >
                        {({ onClick }) =>
                          <div className="rounded-lg text-white flex justify-start bg-neutral border border-neutral overflow-hidden items-center cursor-pointer" onClick={onClick}>
                            <h1 className='p-3 basis-1/4 text-lg font-medium text-center'>CHOOSE PHOTO</h1>
                            <div className='p-3 basis-3/4 text-lg bg-white text-neutral font-medium '>{imageName || 'No photo chosen'}</div>
                          </div>
                        }
                      </UploadButton>
                      {/* <div>
                      <img src='https://upcdn.io/kW15bXd/raw/uploads/2023/07/19/Benefits-of-ReactJS-2FWH.jpg' alt='Image' />
                    </div> */}
                    </div>
                  }

                  {
                    uploadType.isVideo &&
                    <div className="form-control w-full">
                      <div className="form-control w-full mb-4">
                        <label className="label">
                          <span className="text-base font-medium">Video title :</span>
                        </label>
                        <input onChange={(e) => setVideoObj({ ...videoObj, title: e.target.value })} value={videoObj.title || ''} type="text" placeholder="Type here" className="input input-bordered input-primary" />
                      </div>
                      <div className="form-control w-full mb-4">
                        <label className="label">
                          <span className="text-base font-medium">Video description :</span>
                        </label>
                        <textarea onChange={(e) => setVideoObj({ ...videoObj, description: e.target.value })} className="textarea textarea-bordered textarea-primary" value={videoObj.description || ''} placeholder="Type here" />
                      </div>
                      <label className="label">
                        <span className="text-base font-medium">{'Import video (.mp4, .mov, .avi) :'}</span>
                      </label>
                      <UploadButton
                        uploader={uploader}
                        onComplete={(files) => {
                          if (files) {
                            setImageName(files[0]?.originalFile.file.name)
                            setVideoObj({ ...videoObj, file_url: files.map(x => x.fileUrl).join("\n"), file_size: files[0]?.originalFile.file.name })
                          }
                        }}
                      >
                        {({ onClick }) =>
                          <div className="rounded-lg text-white flex justify-start bg-neutral border border-neutral overflow-hidden items-center cursor-pointer" onClick={onClick}>
                            <h1 className='p-3 basis-1/4 text-lg font-medium text-center'>CHOOSE VIDEO</h1>
                            <div className='p-3 basis-3/4 text-lg bg-white text-neutral font-medium '>{imageName || 'No video chosen'}</div>
                          </div>
                        }
                      </UploadButton>
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
                      setFbLoginData(res.data)
                      setIsFBLogin(true)
                      notify('Facebook logged-in successfully.')
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
      <ToastContainer />
      {isFBPosting && <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center bg-white w-fit px-10 py-6 rounded-2xl shadow-lg opacity-80'>
        <span className="loading loading-spinner loading-lg" />
        <span className='text-lg font-medium ml-2'>Posting...</span>
      </div>}
    </main>
  )
}

export default page