import React, { useState } from 'react'
import { Typography, TextField } from '@mui/material';

const EditableTitle = ({ initialTitle }) => {
  const [title, setTitle] = useState(initialTitle)

  const [isEditing, setIsEditing] = useState(false)
  
  return (
    <>
      {
        !isEditing ?
        <Typography
          onClick={() => {
            setIsEditing(true)
          }}
          variant='h5'
        >
          {title}
        </Typography>
        :
        <TextField
          size='small'
          value={title}
          sx={{ paddingBottom: 2 }}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => setIsEditing(false)}
        />
      }
    </>
  )
} 

export default EditableTitle