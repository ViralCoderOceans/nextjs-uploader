import { BASE_URL, INSTAGRAM_USER_ID, UPLOADER_API_KEY } from '@/constants/constants'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { InstagramLoginButton } from 'react-social-login-buttons'
import { UploadButton } from 'react-uploader'
import { LoginSocialFacebook } from 'reactjs-social-login'
import { Uploader } from "uploader";

const page = () => {
  const [instagramAccessToken, setInstagramAccessToken] = useState(null)
  const uploader = Uploader({ apiKey: UPLOADER_API_KEY })
  const [photoObj, setPhotoObj] = useState({
    share_to_feed: true,
    media_type: "IMAGE",
    image_url: "https://upcdn.io/12a1yVw/raw/uploads/2023/08/09/4mFNqRwD33-testImg.jpeg",
    caption: "Hello"
  })
  console.log('photoObj: ', photoObj)
  const [reelObj, setReelObj] = useState({})
  const [imageName, setImageName] = useState(null)
  const [reelName, setReelName] = useState(null)
  const [uploadType, setUploadType] = useState({ isPhoto: true })

  useEffect(() => {
    setInstagramAccessToken(localStorage.getItem('instagramAccessToken') ? localStorage.getItem('instagramAccessToken') : null)
  }, [])

  const uploadToIg = () => {
    const formData = new FormData()
    Object.keys(reelObj).forEach(key => formData.append(key, reelObj[key]))
    // formData.append('image_url', photoObj.image_url)
    // formData.append('caption', photoObj.caption)
    // formData.append('media_type', photoObj.media_type)

    axios.post(`${BASE_URL}${INSTAGRAM_USER_ID}/media?access_token=${instagramAccessToken}`, formData).then(
      async (res) => {
        console.log(res)
        console.log('started')
        await sleep(5000)
        console.log('ended')
        axios.post(`${BASE_URL}${INSTAGRAM_USER_ID}/media_publish?creation_id=${res.data.id}&access_token=${instagramAccessToken}`).then(
          (res) => {
            console.log('Posted successfully.', res)
          }
        ).catch(
          (error) => console.error(error)
        )
      }
    ).catch(
      (error) => console.error(error)
    )
  }

  function sleep(duration) {
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        resolve()
      }, duration)
    })
  }

  return (
    <>
      {
        !instagramAccessToken ? <>
          <h1 className='text-3xl font-medium'>Instagram-login required :</h1>
          <hr className='my-2 md:my-4' />
          <div className='w-fit'>
            <LoginSocialFacebook
              isOnlyGetToken
              client_id='1702971156797122'
              client_secret='b476bfa9a6e2b088dc90c3d0a71e89ce'
              redirect_uri='http://localhost:3000/upload/to-instagram'
              scope='instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_insights,pages_show_list,pages_read_engagement'
              onResolve={({ data }) => {
                setInstagramAccessToken(data.accessToken)
                localStorage.setItem('instagramAccessToken', data.accessToken)
              }}
              onReject={(err) => {
                console.log(err)
              }}
            >
              <InstagramLoginButton />
            </LoginSocialFacebook>
          </div>
        </>
          : <>
            <div className='transition-all'>
              <div className='flex justify-between items-center'>
                <h1 className='text-xl md:text-3xl font-medium'>You're logged-in :</h1>
                {/* <div className='flex items-center'>
                  <div className="avatar mx-3">
                    <div className="w-10 rounded-full border-2 border-neutral">
                      <img src={fbLoginData?.picture?.data.url} alt='DP' />
                    </div>
                  </div>
                  <h1 className='text-lg font-medium'>{fbLoginData?.name}</h1>
                </div> */}
              </div>
              <hr className='my-2 md:my-4' />
              <h1 className='text-xl md:text-3xl font-medium mb-2 md:mb-4'>Create post</h1>
              <div className='bg-base-300 p-4 rounded-2xl'>
                {
                  uploadType.isPhoto &&
                  <div className="form-control w-full">
                    <div className="form-control w-full mb-4">
                      <label className="label">
                        <span className="text-base font-medium">Photo caption :</span>
                      </label>
                      <textarea onChange={(e) => setPhotoObj({ ...photoObj, caption: e.target.value })} className="textarea textarea-bordered textarea-primary" value={photoObj.caption || ''} placeholder="Type text here" />
                    </div>
                  </div>
                }
                {
                  uploadType.isReel &&
                  <div className="form-control w-full">
                    <div className="form-control w-full mb-4">
                      <label className="label">
                        <span className="text-base font-medium">Reel caption :</span>
                      </label>
                      <textarea onChange={(e) => setReelObj({ ...reelObj, caption: e.target.value })} value={reelObj.caption || ''} className="textarea textarea-bordered textarea-primary" placeholder="Type text here" />
                    </div>
                  </div>
                }
                <div className='mb-4'>
                  <label className="label">
                    <span className="text-base font-medium">Select one option :</span>
                  </label>
                  <div className="flex justify-center gap-1 bg-base-200 p-1 rounded-lg">
                    <button onClick={() => setUploadType({ isPhoto: true })} className={`cursor-pointer basis-1/2 flex justify-center md:text-lg font-medium py-1 ${!uploadType.isPhoto ? 'hover:bg-neutral hover:text-white' : 'bg-neutral text-white'} hover:bg-neutral hover:text-white rounded-lg transition-all`}>
                      Upload Photo
                    </button>
                    <button onClick={() => setUploadType({ isReel: true })} className={`cursor-pointer basis-1/2 flex justify-center md:text-lg font-medium py-1 ${!uploadType.isReel ? 'hover:bg-neutral hover:text-white' : 'bg-neutral text-white'} hover:bg-neutral hover:text-white rounded-lg transition-all`}>
                      Upload Reel
                    </button>
                  </div>
                </div>
                {
                  uploadType.isPhoto &&
                  <div className="form-control w-full">
                    <div className="form-control">
                      <label className="label">
                        <span className="text-base font-medium">{'Import photo (.jpeg, .jpg, .png) : *'}</span>
                      </label>
                      <UploadButton
                        uploader={uploader}
                        onComplete={(files) => {
                          if (files) {
                            setImageName(files[0]?.originalFile.file.name)
                            setPhotoObj({ ...photoObj, media_type: "IMAGE", image_url: files.map(x => x.fileUrl).join("\n") })
                          }
                        }}
                      >
                        {({ onClick }) =>
                          <div className="rounded-lg text-white flex justify-start bg-neutral border border-neutral overflow-hidden items-center cursor-pointer" onClick={onClick}>
                            <h1 className='p-3 basis-1/4 text-lg font-medium text-center'>CHOOSE IMAGE</h1>
                            <div className='p-3 basis-3/4 text-lg bg-white text-neutral font-medium '>{imageName || 'No image chosen'}</div>
                          </div>
                        }
                      </UploadButton>
                    </div>
                    {photoObj.image_url && <button className="btn btn-neutral mt-4" onClick={() => window.preview_image.showModal()}>Preview-photo</button>}
                    <dialog id="preview_image" className="modal">
                      <form method="dialog" className="modal-box">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        <h3 className="font-bold text-lg">Selected Image</h3>
                        <img src={photoObj.image_url} alt='Preview image' className='max-h-full pt-4 object-contain' />
                      </form>
                      <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                      </form>
                    </dialog>
                  </div>
                }
                {
                  uploadType.isReel &&
                  <div className="form-control w-full">
                    <div className="form-control">
                      <label className="label">
                        <span className="text-base font-medium">{'Import video (.mp4, .mov) : *'}</span>
                      </label>
                      <UploadButton
                        uploader={uploader}
                        onComplete={(files) => {
                          if (files) {
                            setReelName(files[0]?.originalFile.file.name)
                            setReelObj({ ...reelObj, media_type: 'REELS', video_url: files.map(x => x.fileUrl).join("\n") })
                          }
                        }}
                      >
                        {({ onClick }) =>
                          <div className="rounded-lg text-white flex justify-start bg-neutral border border-neutral overflow-hidden items-center cursor-pointer" onClick={onClick}>
                            <h1 className='p-3 basis-1/4 text-lg font-medium text-center'>CHOOSE VIDEO</h1>
                            <div className='p-3 basis-3/4 text-lg bg-white text-neutral font-medium '>{reelName || 'No video chosen'}</div>
                          </div>
                        }
                      </UploadButton>
                    </div>
                    {reelObj.video_url && <button className="btn btn-neutral mt-4" onClick={() => window.preview_video.showModal()}>Preview-video</button>}
                    <dialog id="preview_video" className="modal">
                      <form method="dialog" className="modal-box flex flex-col items-center max-h-[95%] overflow-hidden">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        <h3 className="font-bold text-lg">Selected Video</h3>
                        <div className='max-h-[80%] pt-4 overflow-y-auto'>
                          <video src={reelObj.video_url} controls className='max-h-[750px]'>
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      </form>
                      <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                      </form>
                    </dialog>
                  </div>
                }
              </div>
              <div className='flex flex-col md:flex-row md:justify-between items-center my-4'>
                <button onClick={uploadToIg} className="btn btn-neutral text-white w-full md:w-[200px]">Post</button>
                <button onClick={() => window.open("https://www.instagram.com/natural.canvas_/", "_blank")} className="btn btn-neutral text-white w-full mt-4 md:m-0 md:w-fit">Open Instagram Profile</button>
              </div>
            </div>
          </>
      }
    </>
  )
}

export default page