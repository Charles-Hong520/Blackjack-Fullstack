import React, { useEffect, useState } from 'react'
import { Button, Grid, Typography } from '@mui/material'

import { nanoid } from 'nanoid'

import Emitter from './Component/Emitter'
import Listener from './Component/Listener'

import { socket } from './sockets'


const CustomGridItem = ({ children }) => {
  return (
    <Grid 
      item 
      xs={4} 
      sx={{ 
        maxHeight: '95vh',
        overflow: 'scroll',
        pl: '30px',
        pr: '30px'
      }}
    >
      {children}
    </Grid>
  )
}

const App = () => {

  // const moveLeftMsg = { title: 'Move Left', tag: 'game_move', data: 'left'}
  // const moveRightMsg = { title: 'Move Right', tag: 'game_move', data: 'right'}

  const [isConnected, setIsConnected] = useState(false)
  const [emitters, setEmitters] = useState([])
  const [listeners, setListeners] = useState([])

  const removeEmitter = (id) => {
    const newEmitters = emitters.filter((em) => em.id !== id)
    console.log('newEmitters=', newEmitters)
    setEmitters(newEmitters)
  }

  useEffect(() => {
    const onConnect = () => setIsConnected(true)
    const onDisconnect = () => setIsConnected(false)

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [])
  
  return (
    <>
      <Grid 
        container 
        spacing={2}
      >
        <CustomGridItem>
          <Button 
            variant='outlined'
            onClick={() => {
              const newEmitter = { 
                id: nanoid(),
                title: 'click to edit title', 
                tag: '', 
                data: '' 
              }
              setEmitters([...emitters, newEmitter])
            }}
          >
            Add Emitter
          </Button>

          {/* render all emitters */}
          {emitters.map(({title, tag, data, id}) => {
            return <Emitter id={id} initial={{title, tag, data}} removeSelf={() => removeEmitter(id)}/>
          })}

        </CustomGridItem>

        <CustomGridItem>
          <Button 
            variant='outlined'
            onClick={() => {
              const newListener = {
                id: nanoid(),
                title: 'click to edit title',
                tag: '',
                data: ''
              }
              setListeners([...listeners, newListener])
            }}
          >
            Add Listener
          </Button>

          {/* render all listners */}
          {listeners.map(({title, tag, data, id}) => {
            return <Listener id={id} initial={{title, tag, data}} removeSelf={() => removeEmitter(id)}/>
          })}

        </CustomGridItem>

        {/* <CustomGridItem>
          <Button variant='outlined'>Add </Button>
        </CustomGridItem> */}
      </Grid>
      <Typography>Socket Connection: {isConnected ? 'Connected' : 'Not Connected'}</Typography>
    </>

  );
}

export default App;