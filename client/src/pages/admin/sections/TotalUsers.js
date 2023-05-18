import { Card, Typography } from '@mui/material'
import React from 'react'

export const TotalUsers = ({title, data}) => {
    console.log(data);
  return (
        <Card sx={{ py:5,
        boxShadow:0,
        textAlign: 'center',
        color: 'white',
        bgcolor: 'blue'
        }}>
            <Typography variant='h3'>
                {data}
            </Typography>
            <Typography variant='subtitle2' sx={{ opacity:0.70}}>
                Usuarios {title}
            </Typography>
      </Card>
  )
}
