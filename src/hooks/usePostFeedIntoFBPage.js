import { BASE_URL, FB_PAGE_ID } from '@/constants/constants'
import axios from 'axios'
import { useCallback } from 'react'

const usePostFeedIntoFBPage = () => {

  const postFBPageFeed = useCallback(async (object, path, notify, notifyError, fbPageAccessToken) => {
    const formData = new FormData()
    Object.keys(object).forEach(key => formData.append(key, object[key]))

    await axios.post(
      `${BASE_URL}/${FB_PAGE_ID}/${path}?access_token=${fbPageAccessToken}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
      .then((response) => {
        console.log('response: ', response.data)
        notify('Posted successfully on facebook.')
      })
      .catch((error) => {
        console.error(error)
        notifyError('An error occur.')
      })
  }, [])

  // const handleUpload = (object, notify, notifyError, fbPageAccessToken) => {
  //   const formData = new FormData()
  //   Object.keys(object).forEach(key => formData.append(key, object[key]))

  //   axios.post(
  //     `https://graph.facebook.com/v17.0/${FB_PAGE_ID}/photos?access_token=${fbPageAccessToken}`,
  //     formData,
  //     {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     }
  //   )
  //     .then((response) => {
  //       console.log('response: ', response.data)
  //       notify('Posted successfully on facebook.')
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //       notifyError('An error occur.')
  //     })
  // }


  return { postFBPageFeed }
}

export default usePostFeedIntoFBPage