import { SHORT_TIME_FB_AT } from '@/constants/constants'
import axios from 'axios'
import { useCallback, useState } from 'react'

const useGetFBAccessToken = () => {
  const [fbAccessToken, setFbAccessToken] = useState()

  const getFbAccessToken = useCallback(async (api_url) => {
    const options = {
      method: 'GET',
      url: 'https://graph.facebook.com/oauth/access_token',
      params: {
        grant_type: 'fb_exchange_token',
        client_id: '211579308138783',
        client_secret: '87355bfc1bd922d927f750b40f5cf424',
        fb_exchange_token: SHORT_TIME_FB_AT
      }
    }
    await axios.request(options).then((response) => {
      if (response.status === 200) {
        setFbAccessToken(response.data.access_token)
      } else {
        console.error('Error--------', response)
      }
    })
  }, [])


  return { getFbAccessToken, fbAccessToken }
}

export default useGetFBAccessToken