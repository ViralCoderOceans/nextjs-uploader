import { YOUTUBE_API_KEY } from '@/constants/constants'
import axios from 'axios'
import React, { useState } from 'react'

const VideoUploadForm = () => {
  const [videoFile, setVideoFile] = useState(null)
  const [items, setItems] = useState([])

  const handleFileChange = (event) => {
    setVideoFile(event.target.files[0])
  }

  const handleUpload = async () => {
    const token = 'ya29.a0AfB_byBt1XySxTsV5dLq8QR1jw0O0URgBIqUKaxdRQd2KpH_aofkFSuEC2GS1G3DQ6YpwyTgBXLOLBqtWW8CgxhPvWXZxZfBttNmoX6fJRP28wo0NVnQ4MFfT6Gj_THT90pzpFfg0VetdKaoEuh3DohohQ2SUwaCgYKAeQSARESFQHsvYlsFeS2Gv6GUWVdq7dTeicK_w0165'
    const uploadUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatus&key=${YOUTUBE_API_KEY}`

    const metadata = {
      snippet: {
        title: 'My Uploaded Video',
        description: 'Description of my video',
      },
      status: {
        privacyStatus: 'private',
      },
    }

    const requestBody = {
      snippet: metadata.snippet,
      status: metadata.status,
    }

    const body = JSON.stringify(requestBody)

    try {
      const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=lUJyGDT4Nv0&key=${YOUTUBE_API_KEY}`,
        {
          headers: {
            'Authorization': 'Bearer ya29.a0AfB_byABwYzOREYyZhsZwKgvSZkWQseY01gscMl7P-tdFWxTCPx4ijDUTyFwiL-ZOM8tb_Bh0xz0ucI3JeW8PqnEibuPZ5PmNhMA3Az5-hSrtjSOKzuY-qN5hHcAUcfOfcWZwrKGAeepnqcyV4IVfoU2ttgBaCgYKAckSARESFQHsvYls8D5DB9XvpMv-3E3dLG_fkQ0163',
            'Accept': 'application/json'
          }
        }
      )
      console.table('response: ', response)
      setItems([...response.data.items])

      // const response = await axios.post(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatus&key=${YOUTUBE_API_KEY}`,
      //   body,
      //   {
      //     headers: {
      //       'Authorization': 'Bearer ya29.a0AfB_byD6D2bq0RKaJdV1tnFDi7JcImC9bqPs8shoP2_tHWBOLsYTR_LMFtOuiw-ZGxWOW_J9cPNdfPtHdEjV3bLHtGycd_JcPSz55PuJ8fnA-ua4qte_tkXq9CBe5aOG6ZYZf0R32T_ZnbV41xkW6GBh9D_jaCgYKASYSARESFQHsvYlsN-4QRWFNPFXY4x6_rA8Btg0163',
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json'
      //     }
      //   }
      // )

      // const { id: videoId } = await response.json()

      // const videoUploadUrl = `https://www.googleapis.com/upload/youtube/v3/videos?part=snippet,status&id=${videoId}&key=${YOUTUBE_API_KEY}`

      // const uploadResponse = await axios.put(videoUploadUrl,
      //   videoFile,
      //   {
      //     headers: {
      //       'Authorization': 'Bearer ya29.a0AfB_byBt1XySxTsV5dLq8QR1jw0O0URgBIqUKaxdRQd2KpH_aofkFSuEC2GS1G3DQ6YpwyTgBXLOLBqtWW8CgxhPvWXZxZfBttNmoX6fJRP28wo0NVnQ4MFfT6Gj_THT90pzpFfg0VetdKaoEuh3DohohQ2SUwaCgYKAeQSARESFQHsvYlsFeS2Gv6GUWVdq7dTeicK_w0165',
      //       'Content-Type': videoFile.type
      //     },
      //   }
      // )

      // console.log('Video uploaded:', uploadResponse)
    } catch (error) {
      console.error('Error uploading video:', error)
    }
  }

  return (
    <div>
      <button onClick={handleUpload}>Get Most Popular Videos</button>
      <hr />
      <br />
      <hr />
      {
        items &&
        <div>
          {
            items.map((elm) => (
              <a href={`https://www.youtube.com/watch?v=${elm.id}`} target='_blank'>
                <div>
                  <img
                    className='rounded-2xl'
                    height={elm.snippet.thumbnails.medium.height}
                    width={elm.snippet.thumbnails.medium.width}
                    src={elm.snippet.thumbnails.medium.url}
                  />
                  <h1 className='my-2 font-medium'>{elm.snippet.title}</h1>
                </div>
              </a>
            ))
          }
        </div>
      }
    </div>
  )
}

export default VideoUploadForm