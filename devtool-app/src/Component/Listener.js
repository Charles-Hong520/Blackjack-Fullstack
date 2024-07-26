import React, { useEffect, useState } from 'react'
import { Card, CardContent, TextField, IconButton, Select, MenuItem, InputLabel, CardActions, Divider, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { socket } from '../sockets'
import EditableTitle from './EditableTitle';

const Listener = ( {id, initial, removeSelf} ) => {

  const [tag, setTag] = useState(initial?.tag)
  const [receivedData, setReceivedData] = useState('')

  useEffect(() => {
    console.log('tag changed to', tag)
    socket.on(tag, (data) => {
      data = JSON.stringify(data)
      setReceivedData(data)
    })

    return () => {
      socket.off(tag)
    }
  }, [tag])

  return (
    <Card variant='outlined'
      style={{ marginTop: '10px' }}
    >
      <CardContent>
        <EditableTitle initialTitle={initial.title}/>
        <br/>
        <TextField 
          size='small' 
          label='Tag'
          value={tag}
          onChange={(e) => {
            setTag(e.target.value)
          }}
        />

        {/* 
        <InputLabel id='data-type-select-label'>Data Type</InputLabel>
        <Select size='small' labelId='data-type-select-label'>
          <MenuItem value={10}>json</MenuItem>
          <MenuItem value={20}>number</MenuItem>
          <MenuItem value={30}>string</MenuItem>
        </Select> */}

        <br />
        <br />
        
        <Card
          variant='outlined'
          sx={{ padding: '5px' }}
        >
          <code>{receivedData}</code>
          
        </Card>
      </CardContent>
    </Card>
  )
}

export default Listener