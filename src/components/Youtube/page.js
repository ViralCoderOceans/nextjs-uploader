import React, { useCallback, useState } from 'react'
import { YOUTUBE_API_KEY, YOUTUBE_CLIENT_ID } from '@/constants/constants'
import axios from 'axios'
import { GoogleLoginButton } from 'react-social-login-buttons'
import { LoginSocialGoogle } from 'reactjs-social-login'

const page = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [videoFile, setVideoFile] = useState(null)
  console.log('videoFile: ', videoFile)

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const handleVideoFileChange = (event) => {
    setVideoFile(event.target.files[0])
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const metadata = {
      snippet: {
        title: 'title',
        description: 'description',
      },
      status: {
        privacyStatus: 'private',
      },
    };

    const formData = new FormData()
    formData.append('metadata', JSON.stringify(metadata))
    formData.append('video', videoFile)

    try {
      const response = await axios.post(
        `https://www.googleapis.com/upload/youtube/v3/videos?part=snippet,status&key=${YOUTUBE_API_KEY}`,
        formData,
        {
          headers: {
            'Authorization': 'Bearer ya29.a0AfB_byCG91rMZpdZ7ciZPXJtWNHYYhmDw1ChjDU06AM…-_aCgYKAWYSARESFQHsvYlsH8q5yMcRjcO4E6_sjuy3-A0163',
            'Content-Type': 'multipart/form-data'
          },
        }
      )

      console.log('Video uploaded:', response.data)
    } catch (error) {
      console.error('Error uploading video:', error)
    }
  }

  const onLoginStart = useCallback(() => {
    alert('login start');
  }, []);

  return (
    <>
      <LoginSocialGoogle
        client_id={YOUTUBE_CLIENT_ID}
        onLoginStart={onLoginStart}
        // redirect_uri={REDIRECT_URI}
        scope="https://www.googleapis.com/auth/youtube.readonly"
        discoveryDocs="claims_supported"
        access_type="offline"
        onResolve={data => console.log(data.data)}
        onReject={err => {
          console.log(err)
        }}
      >
        <GoogleLoginButton />
      </LoginSocialGoogle>
      <hr />
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={handleTitleChange} placeholder="Title" />
        <input type="text" value={description} onChange={handleDescriptionChange} placeholder="Description" />
        <input
          type="file"
          onChange={handleVideoFileChange} className="file-input file-input-bordered file-input-md w-full"
        />
        {/* <input type="file" accept="video/*" onChange={handleVideoFileChange} /> */}
        <button type="submit">Upload</button>
      </form>
    </>
  )
}

export default page