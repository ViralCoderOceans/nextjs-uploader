import React, { useContext, useEffect, useRef, useState } from 'react'
import { accessTokenContext } from '@/app/layout'
import useGetFBPageAccessToken from '@/hooks/useGetFBAccessToken'
import usePostFeedIntoFBPage from '@/hooks/usePostFeedIntoFBPage'
import { FacebookLoginButton } from 'react-social-login-buttons'
import { LoginSocialFacebook } from 'reactjs-social-login'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SchedulePost from '../SchedulePost/page'
import usePostReelOnFB from '@/hooks/usePostReelOnFB'
// import ContentEditable from 'react-contenteditable'
// import placeHolderImg from '../../assets/placeholder.png'

const page = () => {
  const [linkObj, setLinkObj] = useState({})
  const [photoObj, setPhotoObj] = useState({})
  const [videoObj, setVideoObj] = useState({})
  const [reelObj, setReelObj] = useState({})
  console.log('reelObj: ', reelObj?.source?.size)
  const [previewImg, setPreviewImg] = useState()
  const [previewVideo, setPreviewVideo] = useState()
  const [uploadType, setUploadType] = useState({ isLink: true })
  const [isSchedule, setIsSchedule] = useState(false)
  const {
    fbLoginData,
    setFbLoginData,
    isFBPosting,
    setIsFBPosting,
    updateFBLocalStorage
  } = useContext(accessTokenContext)
  const { postFBPageFeed } = usePostFeedIntoFBPage()
  const { postFBPageReel } = usePostReelOnFB()
  const { fbPageAccessToken, setFbPageAccessToken, getFbPageAccessToken } = useGetFBPageAccessToken()

  useEffect(() => {
    setFbPageAccessToken(localStorage.getItem('fbPageAccessToken') ? JSON.parse(localStorage.getItem('fbPageAccessToken')) : null)
  }, [])

  useEffect(() => {
    if (fbLoginData) {
      if (!localStorage.getItem('fbPageAccessToken')) {
        console.log('Facebook-get-page-access-token-API-called.')
        getFbPageAccessToken(fbLoginData.accessToken)
      }
    }
  }, [fbLoginData, fbPageAccessToken])

  const handleSubmit = () => {
    setIsFBPosting(true)
    if (uploadType.isPhoto && photoObj.source) {
      postFBPageFeed(photoObj, 'photos', notify, notifyError, fbPageAccessToken)
    } else if (uploadType.isVideo && videoObj.source) {
      postFBPageFeed(videoObj, 'videos', notify, notifyError, fbPageAccessToken)
    } else if (uploadType.isReel && reelObj.source) {
      postFBPageReel('video_reels', fbPageAccessToken, reelObj, notify, notifyError)
    } else if (uploadType.isLink && linkObj) {
      postFBPageFeed(linkObj, 'feed', notify, notifyError, fbPageAccessToken)
    } else {
      setIsFBPosting(false)
      notifyError('Empty field on allowed.')
    }
  }

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
    })
    setPreviewImg()
    setPreviewVideo()
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
    setPreviewImg()
    setPreviewVideo()
    setIsFBPosting(false)
  }

  // const [text, setText] = useState('');

  // const handleInputChange = (event) => {
  //   const inputText = event.target.value
  //   const modifiedText = inputText.replace(/(#)([a-z\d-]+)/gi, '<span class="py-1 bg-base-200 rounded-2xl">$&</span>')
  //   setText(modifiedText)
  // };

  // const handleBlur = () => {
  //   const modifiedText = text.replace(/\B#(\w*[a-zA-Z]+\w*)/g, '<span class="px-2 py-1 bg-base-200">#$1</span>');
  //   console.log('modifiedText: ', modifiedText);
  //   textareaRef.current.innerHTML = modifiedText;
  // };

  return (
    <main className="flex flex-col">
      <div className='flex justify-center'>
        <div className='flex flex-col w-full'>
          {
            fbLoginData
              ? <div className='transition-all'>
                <div className='flex justify-between items-center'>
                  <h1 className='text-xl md:text-3xl font-medium'>You're logged-in :</h1>
                  <div className='flex items-center'>
                    <div className="avatar mx-3">
                      <div className="w-10 rounded-full border-2 border-neutral">
                        <img src={fbLoginData?.picture?.data.url} alt='DP' />
                      </div>
                    </div>
                    <h1 className='text-lg font-medium'>{fbLoginData?.name}</h1>
                  </div>
                </div>
                <hr className='my-2 md:my-4' />
                <h1 className='text-xl md:text-3xl font-medium mb-2 md:mb-4'>Create post</h1>
                <div className='bg-base-300 p-4 rounded-2xl'>
                  {
                    uploadType.isLink &&
                    <div className="form-control w-full">
                      <div className="form-control w-full mb-4">
                        <label className="label">
                          <span className="text-base font-medium">What's on your mind? *</span>
                        </label>
                        <textarea onChange={(e) => setLinkObj({ ...linkObj, message: e.target.value })} className="textarea textarea-bordered textarea-primary" value={linkObj.message || ''} placeholder="Type text here" />
                      </div>
                    </div>
                  }

                  {
                    uploadType.isPhoto &&
                    <div className="form-control w-full">
                      <div className="form-control w-full mb-4">
                        <label className="label">
                          <span className="text-base font-medium">Photo caption :</span>
                        </label>
                        <textarea onChange={(e) => setPhotoObj({ ...photoObj, message: e.target.value })} className="textarea textarea-bordered textarea-primary" value={photoObj.message || ''} placeholder="Type text here" />
                      </div>
                    </div>
                  }

                  {
                    uploadType.isVideo &&
                    <div className="form-control w-full">
                      <div className="form-control w-full mb-4">
                        <label className="label">
                          <span className="text-base font-medium">Video title :</span>
                        </label>
                        <textarea onChange={(e) => setVideoObj({ ...videoObj, title: e.target.value })} value={videoObj.title || ''} className="textarea textarea-bordered textarea-primary" placeholder="Type text here" />
                      </div>
                    </div>
                  }

                  {
                    uploadType.isReel &&
                    <div className="form-control w-full">
                      <div className="form-control w-full mb-4">
                        <label className="label">
                          <span className="text-base font-medium">Reel title :</span>
                        </label>
                        <textarea onChange={(e) => setReelObj({ ...reelObj, title: e.target.value })} value={reelObj.title || ''} className="textarea textarea-bordered textarea-primary" placeholder="Type text here" />
                      </div>
                    </div>
                  }

                  <div className='mb-4'>
                    <label className="label">
                      <span className="text-base font-medium">Select one option :</span>
                    </label>
                    <div className="flex justify-center gap-1 bg-base-200 p-1 rounded-lg">
                      <button onClick={() => setUploadType({ isLink: true })} className={`cursor-pointer basis-1/2 flex justify-center md:text-lg font-medium py-1 ${!uploadType.isLink ? 'hover:bg-neutral hover:text-white' : 'bg-neutral text-white'} rounded-lg transition-all`}>
                        Attach Link
                      </button>
                      <button onClick={() => setUploadType({ isPhoto: true })} className={`cursor-pointer basis-1/2 flex justify-center md:text-lg font-medium py-1 ${!uploadType.isPhoto ? 'hover:bg-neutral hover:text-white' : 'bg-neutral text-white'} hover:bg-neutral hover:text-white rounded-lg transition-all`}>
                        Upload Photo
                      </button>
                      <button onClick={() => setUploadType({ isVideo: true })} className={`cursor-pointer basis-1/2 flex justify-center md:text-lg font-medium py-1 ${!uploadType.isVideo ? 'hover:bg-neutral hover:text-white' : 'bg-neutral text-white'} hover:bg-neutral hover:text-white rounded-lg transition-all`}>
                        Upload Video
                      </button>
                      <button onClick={() => setUploadType({ isReel: true })} className={`cursor-pointer basis-1/2 flex justify-center md:text-lg font-medium py-1 ${!uploadType.isReel ? 'hover:bg-neutral hover:text-white' : 'bg-neutral text-white'} hover:bg-neutral hover:text-white rounded-lg transition-all`}>
                        Upload Reel
                      </button>
                    </div>
                  </div>

                  {
                    uploadType.isLink &&
                    <div className="form-control w-full">
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
                      <SchedulePost
                        isSchedule={isSchedule}
                        setIsSchedule={setIsSchedule}
                        setPublishNow={() => {
                          let refObj = linkObj
                          delete refObj.scheduled_publish_time
                          delete refObj.published
                          setLinkObj({ ...refObj })
                        }}
                        setSchedule={() => {
                          setLinkObj({ ...linkObj, published: false })
                        }}
                        setDateTime={(scheduledTimestamp) => {
                          setLinkObj({ ...linkObj, scheduled_publish_time: JSON.stringify(scheduledTimestamp), published: false })
                        }}
                      />
                    </div>
                  }

                  {
                    uploadType.isPhoto &&
                    <div className="form-control w-full">
                      {/* <ContentEditable
                        html={text}
                        onChange={handleInputChange}
                        className="textarea textarea-bordered textarea-primary"
                        tagName="div" // Specify a tagName to prevent nested spans
                      /> */}
                      <div className="form-control">
                        <label className="label">
                          <span className="text-base font-medium">{'Import photos (.jpeg, .jpg, .png) : *'}</span>
                        </label>
                        <input
                          type="file"
                          onChange={(event) => {
                            setPhotoObj({ ...photoObj, source: event.target.files[0] })
                            setPreviewImg(URL.createObjectURL(event.target.files[0]))
                          }} className="file-input file-input-bordered file-input-md w-full"
                        />
                      </div>
                      {previewImg && <button className="btn btn-neutral mt-4" onClick={() => window.preview_image.showModal()}>Preview-photo</button>}
                      <dialog id="preview_image" className="modal">
                        <form method="dialog" className="modal-box">
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                          <h3 className="font-bold text-lg">Selected photo</h3>
                          <img src={previewImg} alt='Preview image' className='max-h-full pt-4 object-contain' />
                        </form>
                        <form method="dialog" className="modal-backdrop">
                          <button>close</button>
                        </form>
                      </dialog>
                      <SchedulePost
                        isSchedule={isSchedule}
                        setIsSchedule={setIsSchedule}
                        setPublishNow={() => {
                          let refObj = photoObj
                          delete refObj.scheduled_publish_time
                          delete refObj.published
                          setPhotoObj({ ...refObj })
                        }}
                        setSchedule={() => {
                          setPhotoObj({ ...photoObj, published: false })
                        }}
                        setDateTime={(scheduledTimestamp) => {
                          setPhotoObj({ ...photoObj, scheduled_publish_time: JSON.stringify(scheduledTimestamp), published: false })
                        }}
                      />
                    </div>
                  }

                  {
                    uploadType.isVideo &&
                    <div className="form-control w-full">
                      <div className="form-control w-full mb-4">
                        <label className="label">
                          <span className="text-base font-medium">Video description :</span>
                        </label>
                        <textarea onChange={(e) => setVideoObj({ ...videoObj, description: e.target.value })} className="textarea textarea-bordered textarea-primary" value={videoObj.description || ''} placeholder="Type here" />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="text-base font-medium">{'Import video (.mp4, .mov, .avi) : *'}</span>
                        </label>
                        <input
                          type="file"
                          onChange={(event) => {
                            setVideoObj({ ...videoObj, source: event.target.files[0] })
                            setPreviewVideo(URL.createObjectURL(event.target.files[0]))
                          }} className="file-input file-input-bordered file-input-md w-full"
                        />
                      </div>
                      {previewVideo && <button className="btn btn-neutral mt-4" onClick={() => window.preview_video.showModal()}>Preview-video</button>}
                      <dialog id="preview_video" className="modal">
                        <form method="dialog" className="modal-box flex flex-col items-center">
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                          <h3 className="font-bold text-lg">Selected photo</h3>
                          <video src={previewVideo} controls className='max-h-full pt-4 object-contain'>
                            Your browser does not support the video tag.
                          </video>
                        </form>
                        <form method="dialog" className="modal-backdrop">
                          <button>close</button>
                        </form>
                      </dialog>
                      <SchedulePost
                        isSchedule={isSchedule}
                        setIsSchedule={setIsSchedule}
                        setPublishNow={() => {
                          let refObj = videoObj
                          delete refObj.scheduled_publish_time
                          delete refObj.published
                          setVideoObj({ ...refObj })
                        }}
                        setSchedule={() => {
                          setVideoObj({ ...videoObj, published: false })
                        }}
                        setDateTime={(scheduledTimestamp) => {
                          setVideoObj({ ...videoObj, scheduled_publish_time: JSON.stringify(scheduledTimestamp), published: false })
                        }}
                      />
                    </div>
                  }

                  {
                    uploadType.isReel &&
                    <div className="form-control w-full">
                      <div className="form-control w-full mb-4">
                        <label className="label">
                          <span className="text-base font-medium">Reel description :</span>
                        </label>
                        <textarea onChange={(e) => setReelObj({ ...reelObj, description: e.target.value })} className="textarea textarea-bordered textarea-primary" value={reelObj.description || ''} placeholder="Type here" />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="text-base font-medium">{'Import video (.mp4, .mov, .avi) : *'}</span>
                        </label>
                        <input
                          type="file"
                          onChange={(event) => {
                            setReelObj({ ...reelObj, source: event.target.files[0] })
                            setPreviewVideo(URL.createObjectURL(event.target.files[0]))
                          }} className="file-input file-input-bordered file-input-md w-full"
                        />
                      </div>
                      {previewVideo && <button className="btn btn-neutral mt-4" onClick={() => window.preview_video.showModal()}>Preview-video</button>}
                      <dialog id="preview_video" className="modal">
                        <form method="dialog" className="modal-box flex flex-col items-center">
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                          <h3 className="font-bold text-lg">Selected photo</h3>
                          <video src={previewVideo} controls className='max-h-full pt-4 object-contain'>
                            Your browser does not support the video tag.
                          </video>
                        </form>
                        <form method="dialog" className="modal-backdrop">
                          <button>close</button>
                        </form>
                      </dialog>
                      <SchedulePost
                        isSchedule={isSchedule}
                        setIsSchedule={setIsSchedule}
                        setPublishNow={() => {
                          let refObj = reelObj
                          delete refObj.scheduled_publish_time
                          delete refObj.published
                          setReelObj({ ...refObj })
                        }}
                        setSchedule={() => {
                          setReelObj({ ...reelObj, published: false })
                        }}
                        setDateTime={(scheduledTimestamp) => {
                          setReelObj({ ...reelObj, scheduled_publish_time: JSON.stringify(scheduledTimestamp), published: false })
                        }}
                      />
                    </div>
                  }

                </div>
                <div className='flex flex-col md:flex-row md:justify-between items-center my-4'>
                  <button onClick={handleSubmit} className="btn btn-neutral text-white w-full md:w-[200px]">Post</button>
                  <button onClick={() => window.open("https://www.facebook.com/viral.reactjs", "_blank")} className="btn btn-neutral text-white w-full mt-4 md:m-0 md:w-[200px]">Open FB-page</button>
                </div>
              </div>
              : <>
                <h1 className='text-3xl font-medium'>Facebook-login required :</h1>
                <hr className='my-2 md:my-4' />
                <div className='w-fit'>
                  <LoginSocialFacebook
                    appId='211579308138783'
                    onResolve={(res) => {
                      console.log('res: ', res)
                      setFbLoginData(res.data)
                      updateFBLocalStorage()
                      console.log('Facebook login API called.')
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