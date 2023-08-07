import { BASE_URL, FB_PAGE_ID } from '@/constants/constants'
import axios from 'axios'
import { useCallback, useState } from 'react'

const usePostReelOnFB = () => {

  const postReel = (url, fbPageAccessToken, object, notify, notifyError) => {
    const formData = new FormData()
    // formData.append('title', object.title)
    // formData.append('description', object.description)
    formData.append('file', object.source)

    axios.post(
      url,
      formData,
      {
        headers: {
          'Authorization': `OAuth ${fbPageAccessToken}`,
          'offset': '0',
          'file_size': `${object.source.size}`,
        },
      }
    )
      .then((response) => {
        console.log('response: ', response);
        notify('Posted successfully on facebook.')
      })
      .catch((error) => {
        console.error(error)
        notifyError('An error occur.')
      })
  }

  const postFBPageReel = useCallback(async (path, fbPageAccessToken, object, notify, notifyError) => {

    await axios.post(
      `${BASE_URL}/${FB_PAGE_ID}/${path}`,
      {
        "upload_phase": "start",
        "access_token": fbPageAccessToken
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => {
        console.log('status: 200 ------------', response.data.upload_url)
        postReel(response.data.upload_url, fbPageAccessToken, object, notify, notifyError)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return { postFBPageReel }
}

export default usePostReelOnFB