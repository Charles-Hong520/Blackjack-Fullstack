import React, { useState } from 'react'
import { Card, CardContent, TextField, IconButton, Select, MenuItem, InputLabel, CardActions, Divider, CircularProgress, Typography, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { socket } from '../sockets'

import EditableTitle from './EditableTitle';

const Emitter = ( {id, initial, removeSelf} ) => {

  const [tag, setTag] = useState(initial?.tag)
  const [data, setData] = useState(initial?.data) 
  const [loading, setLoading] = useState(false)
  const [returned, setReturned] = useState('')

  // send socket message with current parameters.
  const sendMessage = () => {
    setLoading(true)
    setReturned('waiting for response...')
    socket.emit(tag, data, (ret) => {
      ret = JSON.stringify(ret)
      setLoading(false)
      setReturned(ret)
    })
  }

  return (
    <Card 
      variant='outlined'
      style={{ marginTop: '10px' }}
    >
      <CardContent>
        <Button onClick={removeSelf}>Delete</Button>
        {/* <Typography>{id}</Typography> */}
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
        <TextField 
          size='small' 
          label='Data'
          value={data}
          onChange={(e) => {
            setData(e.target.value)
          }}
        />

        {/* <InputLabel id='data-type-select-label'>Data Type</InputLabel>
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
          <code>{returned}</code>
          
        </Card>


      </CardContent>
      
      <Divider />
      
      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <IconButton 
          onClick={sendMessage}
          disabled={loading}
        >
          <SendIcon/>
        </IconButton>
        {loading && 
        <CircularProgress size='30px'/>
        }
      </CardActions>
    </Card>
  )
}

export default Emitter