import React, { useEffect, useRef, useState } from 'react'
import { Card, CardContent, Typography, TextField, IconButton, Select, MenuItem, InputLabel, CardActions, Divider, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { socket } from '../sockets'

const EditableTitle = ({ initialTitle }) => {
  const [title, setTitle] = useState(initialTitle)

  const textFieldRef = useRef(null)
  const [isEditing, setIsEditing] = useState(false)
  
  return (
    <>
      {
        !isEditing ?
        <Typography
          onClick={() => {
            console.log(textFieldRef)
            setIsEditing(true)
          }}
          variant='h5'
        >
          {title}
        </Typography>
        :
        <TextField
          inputRef={textFieldRef}
          size='small'
          value={title}
          sx={{ paddingBottom: 2 }}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => setIsEditing(false)}
          hidden={ !isEditing }
        >
          hi
        </TextField>
      }

      
        
      
    </>
  )
} 

const Emitter = ( {title, initial} ) => {

  const [tag, setTag] = useState(initial?.tag)
  const [data, setData] = useState(initial?.data) 
  const [loading, setLoading] = useState(false)
  const [returned, setReturned] = useState('')

  // send socket message with current parameters.
  const sendMessage = () => {
    console.log({tag, data})
    setLoading(true)
    setReturned('waiting for response...')
    socket.emit(tag, data, (ret) => {
      setLoading(false)
      setReturned(ret)
      console.log('resolved')
    })
  }

  return (
    <Card variant='outlined'
      style={{ marginTop: '10px' }}
    >
      <CardContent>
        <EditableTitle initialTitle={title}/>
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

        <InputLabel id='data-type-select-label'>Data Type</InputLabel>
        <Select size='small' labelId='data-type-select-label'>
          <MenuItem value={10}>json</MenuItem>
          <MenuItem value={20}>number</MenuItem>
          <MenuItem value={30}>string</MenuItem>
        </Select>

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