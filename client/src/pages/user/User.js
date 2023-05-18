import React, { useContext, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { TravelContext } from '../../context/TravelsContext'
import { FormularioViajes } from '../../components/travels/FormularioViajes'
import { ShowAllTravells } from '../../components/travels/ShowAllTravells'

export const User = () => {

  const navigate = useNavigate();
  const {user, userTravels} = useContext(TravelContext)
  const [showTravel, setShowTravel] = useState(false)
  return (
    <>
    <Row>
      <Col>
      <h1>Usuario</h1>
      <p>Email: {user?.email}</p>
      <p>Nombre: {user?.name}</p>
      <p>Apellido: {user?.lastname}</p>
      <p>Dirección: {user?.address}</p>
      <p>Telefono: {user?.phone}</p>
      <p>Tipo usuario: {user?.type}</p>
      <p>Id del usuario: {user?.user_id}</p>
      </Col>
      <Button onClick={()=>navigate(`/edituser/${user.user_id}`)}>Editar Usuario</Button>
    </Row>
    <Row>
      <Col>
      <h1>Viajes</h1>
      <Button onClick={()=>setShowTravel(!showTravel)}>Crear Viajes</Button>
      {showTravel &&<FormularioViajes setShowTravel={setShowTravel}/>}
      </Col>
    </Row>
    <Row>
      <Col>
      <ShowAllTravells/>
      </Col>
    </Row>
    </>
    
  )
}
