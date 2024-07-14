import React, { useEffect, useState } from 'react'
import { Button, Grid, Typography } from '@mui/material';
import Emitter from './Component/Emitter';

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
              console.log(emitters)
              const newEmitter = { title: 'click to edit title', tag: '', data: '' }
              setEmitters([...emitters, newEmitter])
            }}
          >
            Add Emitter
          </Button>
          {emitters.map(({title, tag, data}) => {
            return <Emitter title={title} initial={{tag, data}}/>
          })}
        </CustomGridItem>

        <CustomGridItem>
          <Button variant='outlined'>Add Listeners</Button>
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