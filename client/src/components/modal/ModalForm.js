import axios from 'axios'
import React, { useContext } from 'react'
import {Modal, Button} from 'react-bootstrap'
import { TravelContext } from '../../context/TravelsContext'

export const ModalForm = ({showEditTravel, setShowEditTravel, TravelAModificar, setTravelAModificar}) => {

  const {userTravels, setUserTravels} = useContext(TravelContext);

  const handleClose = () =>{
    setShowEditTravel(false)
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setTravelAModificar({...TravelAModificar, [name]:value})
  }

  const handleSubmit = () => {

    let arrayProv = [...userTravels]
    arrayProv.map((e)=>{
      if(e.travel_id === TravelAModificar.travel_id){
        e.city = TravelAModificar.city;
        e.country = TravelAModificar.country;
        e.description = TravelAModificar.description;
      }        
    })

    axios
    .put(`http://localhost:4000/travels/editTravel/${TravelAModificar.travel_id}`, TravelAModificar)
    .then((res)=>{
      setUserTravels(arrayProv)
      setShowEditTravel(false)
    })
    .catch((err)=>console.log(err))
  }


  return (
    <Modal show={showEditTravel} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar viaje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <input 
        value={TravelAModificar?.city}
        placeholder="city"
        onChange={handleChange}
        name="city"
        />
        <input 
        value={TravelAModificar?.country}
        placeholder="country"
        onChange={handleChange}
        name="country"
        />
        <input 
        value={TravelAModificar?.description}
        placeholder="description"
        onChange={handleChange}
        name="description"
        />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  )
}
