import React, { useEffect, useState } from 'react'
import { socket } from './sockets'

const App = () => {

  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true))
    socket.on('disconnect', () => setIsConnected(false))
    socket.on('server_message', (m) => {
      console.log('[server message]', m)
    })

    return () => {
      
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