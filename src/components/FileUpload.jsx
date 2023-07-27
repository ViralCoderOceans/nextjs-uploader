import React, { useState } from 'react'
import axios from 'axios'
import { FB_PAGE_ID } from '@/constants/constants'

const FileUpload = ({ YOUR_ACCESS_TOKEN }) => {
  const [file, setFile] = useState(null)

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

  const handleUpload = () => {
    const formData = new FormData()
    formData.append('source', file)
    formData.append('title', 'My Video')
    formData.append('description', 'This is a video upload example')

    axios.post(
      `https://graph.facebook.com/v17.0/${FB_PAGE_ID}/videos?access_token=${YOUR_ACCESS_TOKEN}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
      .then((response) => {
        console.log('response: ', response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Pick a file</span>
        </label>
        <input type="file" onChange={handleFileChange} className="file-input file-input-bordered w-full max-w-xs" />
      </div>
      <button onClick={handleUpload}>Upload</button>
    </div>
  )
}

export default FileUpload