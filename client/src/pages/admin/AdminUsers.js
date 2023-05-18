import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Button } from '@mui/material';



export const AdminUsers = () => {

  const [users, setUsers] = useState()

  useEffect(() => {
    axios
      .get(`http://localhost:4000/admin/getAllusers`)
      .then((res)=>{
        setUsers(res.data)
        console.log("soyres.data",res.data);
      })
  }, [])

  const handleClick = (id, isDeleted) => {
    console.log("SOYID",id);
    let url = `http://localhost:4000/admin/disableUser/${id}`

    if(isDeleted === 1){
      url = `http://localhost:4000/admin/enableUser/${id}`
    }
     axios
        .put(url)
        .then((res)=>{
          setUsers(res.data)
        })
        .catch((err)=>console.log(err))
  }


  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Nombre del usuario</TableCell>
          <TableCell align="right">Apellido</TableCell>
          <TableCell align="right">Dirección</TableCell>
          <TableCell align="right">Teléfono</TableCell>
          <TableCell align="right">Email</TableCell>
          <TableCell align="right">Is_deleted</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
          {users?.map((elem)=>{
            return(
          <TableRow
           key={users.user_id}
           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
         >
           <TableCell component="th" scope="row">
             {elem.name}
           </TableCell>
           <TableCell align="right">{elem.lastname}</TableCell>
           <TableCell align="right">{elem.address}</TableCell>
           <TableCell align="right">{elem.phone}</TableCell>
           <TableCell align="right">{elem.email}</TableCell>
           <TableCell align="right">{elem.is_deleted}</TableCell>
           <Button onClick={()=>handleClick(elem.user_id, elem.is_deleted)}>{elem.is_deleted === 0 ? "Disabled" : "Enabled"}</Button>
         </TableRow>
            )
          })}
          
        
      </TableBody>
    </Table>
  </TableContainer>
  )
}
