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
  const [obj, setObj] = useState({})
  console.log('obj: ', obj);
  const [isLink, setIsLink] = useState(false)
  const [imageName, setImageName] = useState()
  const [isPhoto, setIsPhoto] = useState(true)
  const { fbLoginData, setFbLoginData, isFBLogin, setIsFBLogin, isFBPosting, setIsFBPosting } = useContext(accessTokenContext)
  const { postFBPageFeed } = usePostFeedIntoFBPage()
  const { fbPageAccessToken, getFbPageAccessToken } = useGetFBPageAccessToken()
  useEffect(() => {
    if (isFBLogin === true) {
      getFbPageAccessToken(fbLoginData.accessToken)
      setObj({
        ...obj,
        access_token: fbPageAccessToken
      })
    }
  }, [isFBLogin])
  useEffect(() => {
    setObj({
      ...obj,
      access_token: fbPageAccessToken
    })
  }, [fbPageAccessToken])
  useEffect(() => {
    if (isPhoto) {
      setObj({
        message: obj.message || '',
        access_token: fbPageAccessToken
      })
    } else {
      setObj({
        message: obj.message || '',
        access_token: fbPageAccessToken
      })
    }
  }, [isPhoto])
  const handleFileOnChange = (path) => {
    setObj({ ...obj, url: path })
  }
  const handleSubmit = () => {
    setIsFBPosting(true)
    if (isPhoto && obj.url) {
      postFBPageFeed(obj, 'photos', notify, notifyError)
    } else if (!isPhoto && (obj.link || obj.message)) {
      postFBPageFeed(obj, 'feed', notify, notifyError)
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
    setObj({ access_token: obj.access_token })
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
    setObj({ access_token: obj.access_token })
    setImageName('')
    setIsFBPosting(false)
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
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="text-base font-medium">Write text message</span>
                    </label>
                    <textarea onChange={(e) => setObj({ ...obj, message: e.target.value })} className="textarea textarea-bordered textarea-primary" value={obj.message || ''} placeholder="Type text here" />
                  </div>
                  <div className="flex justify-center gap-1 bg-base-200 my-4 p-1 rounded-lg">
                    <button onClick={() => setIsPhoto(false)} className={`cursor-pointer basis-1/2 flex justify-center text-lg font-medium py-1 ${isPhoto ? 'hover:bg-neutral hover:text-white' : 'bg-neutral text-white'} rounded-lg transition-all`}>
                      Attach Link
                    </button>
                    <button onClick={() => setIsPhoto(true)} className={`cursor-pointer basis-1/2 flex justify-center text-lg font-medium py-1 ${!isPhoto ? 'hover:bg-neutral hover:text-white' : 'bg-neutral text-white'} hover:bg-neutral hover:text-white rounded-lg transition-all`}>
                      Upload local File
                    </button>
                  </div>
                  {!isPhoto && <div className="form-control w-full">
                    <label className="label">
                      <span className="text-base font-medium">Attach your link here</span>
                    </label>
                    <input
                      onChange={(e) => { setObj({ ...obj, link: e.target.value }) }}
                      value={obj.link || ''}
                      type="text"
                      placeholder="Type link here"
                      className="input input-bordered input-primary w-full"
                    />
                  </div>}
                  {isPhoto && <div className="form-control w-full">
                    <label className="label">
                      <span className="text-base font-medium">{'Import photos (.jpeg, .jpg, .png)'}</span>
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
                  </div>}
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