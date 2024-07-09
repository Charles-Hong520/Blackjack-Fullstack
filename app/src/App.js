import React, { useEffect, useState } from 'react'
import { socket } from './sockets'

const App = () => {

  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const onConnect = () => setIsConnected(true)
    const onDisconnect = () => setIsConnected(false)
    const onServerMessage = (m) => {
      console.log('[server message]', m)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('server_message', onServerMessage)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('server_message', onServerMessage)
    }
  })

  return (
  <>
    <div>Connected: {isConnected ? "true" : "false"}</div>
    <button
      onClick={() => {
        console.log('button clicked')
        socket.emit('game_move', 'i move')
      }}
      >
      Send Message
    </button>
    <div>hello world</div>
  </>
  )
  
}

export default App