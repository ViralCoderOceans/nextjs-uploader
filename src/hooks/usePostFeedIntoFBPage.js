import { BASE_URL, FB_PAGE_ID } from '@/constants/constants'
import axios from 'axios'
import { useCallback } from 'react'

const usePostFeedIntoFBPage = () => {

  const postFBPageFeed = useCallback(async (obj, path, notify, notifyError) => {
    const options = {
      method: 'POST',
      url: `${BASE_URL}/${FB_PAGE_ID}/${path}`,
      params: obj,
    }
    await axios.request(options).then((response) => {
      if (response.status === 200) {
        notify('Posted successfully on facebook.')
        console.log(response)
      }
    }).catch((error) => {
      notifyError('An error occur.')
      console.error('Error--------', error)
    })
  }, [])


  return { postFBPageFeed }
}

export default usePostFeedIntoFBPage