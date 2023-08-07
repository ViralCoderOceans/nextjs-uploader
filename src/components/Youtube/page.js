import React, { useState } from 'react'
import { YOUTUBE_API_KEY } from '@/constants/constants'
import axios from 'axios'

const page = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [videoFile, setVideoFile] = useState(null)

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
        title: title,
        description: description,
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
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      console.log('Video uploaded:', response.data)
    } catch (error) {
      console.error('Error uploading video:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={handleTitleChange} placeholder="Title" />
      <input type="text" value={description} onChange={handleDescriptionChange} placeholder="Description" />
      <input type="file" accept="video/*" onChange={handleVideoFileChange} />
      <button type="submit">Upload</button>
    </form>
  )
}

export default page