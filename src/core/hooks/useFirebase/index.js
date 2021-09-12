import React from 'react'
import app from 'firebase'
import 'firebase/messaging'

const useFirebase = () => {
  const [isSupported, setSupported] = React.useState(false)

  const firebase = React.useMemo(() => {
    setSupported(app.messaging.isSupported())

    if (app.apps.length) return app.app()

    return app.initializeApp(process.env.FIREBASE_CONFIG)
  }, [])

  const messaging = React.useMemo(() => {
    if (isSupported) return firebase.messaging()
  }, [isSupported])

  return [messaging]
}

export default useFirebase
