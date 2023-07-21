import { FB_PAGE_ID } from '@/constants/constants'
import axios from 'axios'
import { useCallback, useState } from 'react'

const useGetFBPageAccessToken = () => {
  const [fbPageAccessToken, setFbPageAccessToken] = useState(null)

  const getFbPageAccessToken = useCallback(async (token) => {
    const options = {
      method: 'GET',
      url: `https://graph.facebook.com/${FB_PAGE_ID}`,
      params: {
        fields: 'access_token',
        access_token: token
      }
    }
    await axios.request(options).then((response) => {
      if (response.status === 200) {
        setFbPageAccessToken(response.data.access_token)
        localStorage.setItem('fbPageAccessToken', JSON.stringify(response.data.access_token))
      } else {
        console.error('Error--------', response)
      }
    })
  }, [])


  return { fbPageAccessToken, setFbPageAccessToken, getFbPageAccessToken }
}

export default useGetFBPageAccessToken