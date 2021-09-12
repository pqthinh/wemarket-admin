import React from 'react'
import { useFirebase } from 'hooks'

const NotificationManager = () => {
  const [messaging] = useFirebase()

  const onMessageHandler = React.useCallback(() => {
    if (messaging) {
      messaging.onMessage(payload => {
        console.log('onMessage', payload)
      })
      // messaging
      //   .getToken({
      //     vapidKey: process.env.FIREBASE_VAPID_KEY
      //   })
      //   .then(currentToken => {
      //     console.log(currentToken, 'current token')
      //   })
      //   .catch(err => {
      //     console.log('An error occurred while retrieving token. ', err)
      //   })
    }
  }, [messaging])

  React.useEffect(onMessageHandler, [messaging])

  return null
}

export default NotificationManager
