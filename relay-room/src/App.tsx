import { useEffect, useState } from 'react'
import { ChatApp } from './components/ChatApp'
import { hasCometChatCredentials } from './cometchat/constants'
import { setupCometChat } from './cometchat/setupCometChat'
import './App.css'

function App() {
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!hasCometChatCredentials()) {
      return
    }

    setupCometChat()
      .then(() => setIsReady(true))
      .catch((err: unknown) => {
        const message =
          err instanceof Error ? err.message : 'Failed to connect to CometChat'
        setError(message)
      })
  }, [])

  if (!hasCometChatCredentials()) {
    return (
      <div className="setup-screen">
        <h1>Relay Room</h1>
        <p>Add your CometChat credentials to start chatting.</p>
        <ol>
          <li>
            Create a free app at{' '}
            <a href="https://app.cometchat.com/" target="_blank" rel="noopener noreferrer">
              app.cometchat.com
            </a>
          </li>
          <li>
            Copy <code>.env.example</code> to <code>.env</code>
          </li>
          <li>
            Set <code>VITE_COMETCHAT_APP_ID</code>,{' '}
            <code>VITE_COMETCHAT_REGION</code>, and{' '}
            <code>VITE_COMETCHAT_AUTH_KEY</code>
          </li>
          <li>Restart the dev server</li>
        </ol>
        <p className="setup-note">
          For local testing, use UID <code>cometchat-uid-1</code> through{' '}
          <code>cometchat-uid-5</code>.
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="setup-screen">
        <h1>Connection failed</h1>
        <p>{error}</p>
        <p>Check your CometChat credentials in <code>.env</code> and try again.</p>
      </div>
    )
  }

  if (!isReady) {
    return (
      <div className="setup-screen">
        <p>Connecting to CometChat...</p>
      </div>
    )
  }

  return <ChatApp />
}

export default App
