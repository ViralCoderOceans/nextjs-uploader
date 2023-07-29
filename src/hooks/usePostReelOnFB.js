import { BASE_URL, FB_PAGE_ID } from '@/constants/constants'
import axios from 'axios'
import { useCallback } from 'react'

const usePostReelOnFB = () => {

  // const postReel = (url, fbPageAccessToken, object, notify, notifyError) => {
  //   const formData = new FormData()
  //   // formData.append('title', object.title)
  //   // formData.append('description', object.description)
  //   formData.append('file', object.source)

  //   axios.post(
  //     url,
  //     {
  //       headers: {
  //         'Authorization': `OAuth ${fbPageAccessToken}`,
  //         'file_url': 'https://upcdn.io/kW15bXd/raw/uploads/2023/07/20/videoplayback-2gXE.mp4'
  //       },
  //     }
  //   )
  //     .then((response) => {
  //       console.log('response: ', response);
  //       notify('Posted successfully on facebook.')
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //       notifyError('An error occur.')
  //     })
  // }

  const postReel = () => {
    let config = {
      method: 'post',
      url: 'https://graph.facebook.com/v17.0/106338012535000/video_reels?access_token=EAADAbiWA4R8BO50ZBYQ0nzjuT9vRKFXohOJDQAWGehkqq5JboVsYUSc8k8lG0PEgLBFmBBzYZBXHR6gfJJo33YZBcsy0fN4kPWghUeSwG8ZBY5NABbUqspEl3XhU1BbbjrAKGInRONAhmpi890Aqh9LGpSWJsntdtpYFjLQntbkbktAlIbNDLtQZABmykzTBSN4EZA95gZD&upload_phase=start',
      headers: {
        'User-Agent': 'Thunder Client (https://www.thunderclient.com)'
      }
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data.video_id))
        let config2 = {
          method: 'post',
          url: `https://rupload.facebook.com/video-upload/v17.0/${response.data.video_id}`,
          headers: {
            'Authorization': 'OAuth EAADAbiWA4R8BO50ZBYQ0nzjuT9vRKFXohOJDQAWGehkqq5JboVsYUSc8k8lG0PEgLBFmBBzYZBXHR6gfJJo33YZBcsy0fN4kPWghUeSwG8ZBY5NABbUqspEl3XhU1BbbjrAKGInRONAhmpi890Aqh9LGpSWJsntdtpYFjLQntbkbktAlIbNDLtQZABmykzTBSN4EZA95gZD',
            'file_url': 'https://upcdn.io/kW15bXd/raw/uploads/2023/07/20/videoplayback-2gXE.mp4',
            'User-Agent': 'Thunder Client (https://www.thunderclient.com)'
          }
        };

        axios.request(config2)
          .then((response) => {
            console.log(JSON.stringify(response.data))
            let config3 = {
              method: 'get',
              maxBodyLength: Infinity,
              url: `https://graph.facebook.com/v17.0/${response.data.video_id}?fields=status&access_token=EAADAbiWA4R8BO50ZBYQ0nzjuT9vRKFXohOJDQAWGehkqq5JboVsYUSc8k8lG0PEgLBFmBBzYZBXHR6gfJJo33YZBcsy0fN4kPWghUeSwG8ZBY5NABbUqspEl3XhU1BbbjrAKGInRONAhmpi890Aqh9LGpSWJsntdtpYFjLQntbkbktAlIbNDLtQZABmykzTBSN4EZA95gZD`,
              headers: {}
            };

            axios.request(config3)
              .then((response) => {
                console.log(JSON.stringify(response.data));
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const postFBPageReel = useCallback(async (path, fbPageAccessToken, object, notify, notifyError) => {
    await axios.post(
      `${BASE_URL}/${FB_PAGE_ID}/${path}`,
      {
        'upload_phase': 'start',
        'access_token': fbPageAccessToken
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => {
        console.log('postFBPageReel', response.data.video_id)
        uploadVideo(response.data.video_id, fbPageAccessToken)
        notify()
      })
      .catch((error) => {
        console.error(error)
        notifyError()
      })
  }, [])

  const uploadVideo = useCallback(async (video_id, fbPageAccessToken) => {

    // await axios.post(
    //   `https://rupload.facebook.com/video-upload/v17.0/${video_id}`,
    //   {
    //     headers: {
    //       'Authorization': `OAuth ${fbPageAccessToken}`,
    //       'file_url': 'https://upcdn.io/kW15bXd/raw/uploads/2023/07/20/videoplayback-2gXE.mp4'
    //     },
    //   }
    // )
    //   .then((response) => {
    //     console.log('uploadVideo', response.data)
    //     getStatus(video_id, fbPageAccessToken)
    //   })
    //   .catch((error) => {
    //     console.log('error', error)
    //   })

    const testURL = `https://rupload.facebook.com/video-upload/v17.0/${video_id}`
    const myInit = {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Authorization': `OAuth ${fbPageAccessToken}`,
        'file_url': 'https://upcdn.io/kW15bXd/raw/uploads/2023/07/20/videoplayback-2gXE.mp4'
      },
      withCredentials: true,
      credentials: 'same-origin',
      crossdomain: true
    };

    fetch(testURL, myInit).then((res) => console.log('res: ', JSON.stringify(res))).catch((e) => console.log('e: ', e))
  }, [])

  const getStatus = useCallback(async (video_id, fbPageAccessToken) => {

    await axios.get(
      `https://graph.facebook.com/v17.0/${video_id}?fields=status&access_token=${fbPageAccessToken}`,
      {
        headers: {
          'User-Agent': 'Thunder Client (https://www.thunderclient.com)'
        },
      }
    )
      .then((response) => {
        console.log('getStatus', response.data)

      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const publish_reel = useCallback(async (video_id) => {

    await axios.get(
      `${BASE_URL}/${FB_PAGE_ID}/video_reels?access_token=${fbPageAccessToken}&video_id=${video_id}&upload_phase=finish&video_state=PUBLISHED&description=This is description&title=Reel Title`,
      {
        headers: {
          'User-Agent': 'Thunder Client (https://www.thunderclient.com)'
        },
      }
    )
      .then((response) => {
        console.log('publish_reel', response.data.upload_url)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return { postFBPageReel, postReel }
}

export default usePostReelOnFB