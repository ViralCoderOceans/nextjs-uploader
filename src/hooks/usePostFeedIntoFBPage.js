import { BASE_URL, PAGE_ID, SHORT_TIME_FB_AT } from '@/constants/constants'
import axios from 'axios'
import { useCallback, useState } from 'react'

const usePostFeedIntoFBPage = () => {

  const postFBPageFeed = useCallback(async (myToken, obj) => {
    const options = {
      method: 'POST',
      url: `${BASE_URL}/${PAGE_ID}/feed`,
      params: {
        access_token: myToken
      },
      data: obj
    }
    await axios.request(options).then((response) => {
      if (response.status === 200) {
        console.log(response)
      } else {
        console.error('Error--------', response)
      }
    })
  }, [])


  return { postFBPageFeed }
}

export default usePostFeedIntoFBPage