import React, { useContext, useEffect, useState } from 'react'
import { TravelContext } from '../../context/TravelsContext'
import {Container, Grid, Typography} from '@mui/material'
import { TotalUsers } from './sections/TotalUsers'
import axios from 'axios'

export const Admin = () => {

  const [total, setTotal] = useState()
  const [totalEnabled, setTotalEnabled] = useState()
  const [disabledUsers, setDisabledUsers] = useState()

  const {user} = useContext(TravelContext)

  useEffect(() => {
    axios
      .get(`http://localhost:4000/admin/getAllusers`)
      .then((res)=>{
        setTotal(res.data.length);
        setTotalEnabled(res.data.filter(e=>e.is_deleted === 0).length);
        setDisabledUsers(res.data.filter(e=>e.is_deleted === 1).length);
      })
  }, [])
  

  return (
    <Container maxWidth="xl">
        <Typography variant='h4'>
              Bienvenido Administrador!!!
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
              <TotalUsers title={"Totales"}
              data={total}
              />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
              <TotalUsers title={"Activos"}
              data={totalEnabled}
              />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
              <TotalUsers title={"Bloqueados"}
              data={disabledUsers}
              />
          </Grid>
        </Grid>
    </Container>
  )
}
