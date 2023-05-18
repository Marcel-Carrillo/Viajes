import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { TravelContext } from '../../../context/TravelsContext';
import './alluser.scss'

export const Allusers = () => {

  // const [infoTravel, setInfoTravel] = useState()
  const navigate = useNavigate();
  const [allTravels, setAllTravels] = useState();
  const {token} = useContext(TravelContext)


  useEffect(() => { 

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    axios
      .get("http://localhost:4000/users/allUser")
      .then((res)=>{
        setAllTravels(res.data)
      })
      .catch((err)=>console.log(err))
   }, [token])

  return (
    <div>
      <h1>Viajes de la comunidad</h1>
      <div className='contAllUser'>
        {allTravels && allTravels.map((travel, index)=>{
          return(
            <Card style={{ width: '18rem' }} key={index}>
            <Card.Img variant="top" src={`/images/travel/${travel.photo_name}`} />
            <Card.Body>
            <Card.Title>{travel.city}</Card.Title>
            <Card.Text>
              {travel.description}
            </Card.Text>
           <Button variant="primary" onClick={()=>navigate(`/travel/${travel.travel_id}/${travel.user_id}`)}>Ver viaje</Button>
           </Card.Body>
           </Card>
          )
        })}
      </div>
    </div>
  )
}
