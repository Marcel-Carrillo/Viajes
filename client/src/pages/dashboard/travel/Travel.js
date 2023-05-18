import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {Col, Row, Carousel} from 'react-bootstrap'

export const Travel = () => {

    const [travel, setTravel] = useState();
    const [photos, setPhotos] = useState();
    const [user, setUser] = useState();
    const { travel_id, user_id } = useParams();


    useEffect(() => {  
        axios
            .get(`http://localhost:4000/travels/getTravelPhotos/${travel_id}`)
            .then((res)=>{
                setPhotos(res.data.resultPhotos)
                setTravel(res.data.resultTravel[0])
            })
            .catch((err)=>console.log(err))
      }, [])


    useEffect(() => {  
        axios
            .get(`http://localhost:4000/users/oneUser/${user_id}`)
            .then((res)=>{
                setUser(res.data.resultUser[0])
            })
            .catch((err)=>console.log(err))
      }, [])
    

  return (
    <>
        {travel && 
    <Row>
        <Col>
            <h2>Ciudad: {travel.city}</h2>
            <h2>Pais: {travel.country}</h2>
            <h2>Descripción: {travel.description}</h2>
        </Col>
        <Col>
            <h3>Viajero: {user?.name}</h3>
            <img 
            className='d-block w-50'
            src={`/images/user/${user?.img}`}
            />
        </Col>
    </Row>}
    <Row>
        <Carousel>
            {photos && photos.map((fotos,index)=>{
                return(
                    <Carousel.Item key={index}>
                    <img
                      className="d-block w-50"
                      src={`/images/travel/${fotos.photo_name}`}
                      alt="First slide"
                    />
                 </Carousel.Item>
                )
            })}
    </Carousel>
    </Row>
    </>
  )
}
