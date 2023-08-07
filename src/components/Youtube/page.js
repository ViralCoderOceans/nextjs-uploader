import React from 'react'
import { google } from 'googleapis'
import { YOUTUBE_API_KEY } from '@/constants/constants'

const page = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [videoFile, setVideoFile] = useState(null)

  const youtube = google.youtube({
    version: 'v3',
    auth: YOUTUBE_API_KEY,
  })

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
    event.preventDefault()

    const requestBody = {
      snippet: {
        title: title,
        description: description,
      },
      status: {
        privacyStatus: 'private', // Privacy status of the uploaded video
      },
    }

    const requestParams = {
      part: 'snippet,status',
      requestBody: requestBody,
      media: {
        body: videoFile,
      },
    }

    try {
      const response = await youtube.videos.insert(requestParams)
      console.log('Video uploaded:', response.data)
      // Handle success or redirect to a success page
    } catch (error) {
      console.error('Error uploading video:', error)
      // Handle error or display error message
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