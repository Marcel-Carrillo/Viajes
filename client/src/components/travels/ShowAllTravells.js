import axios from 'axios'
import React, { useContext, useState} from 'react'
import { Button } from 'react-bootstrap'
import { TravelContext } from '../../context/TravelsContext'
import { ModalForm } from '../modal/ModalForm'
import { Galery } from './Galery'
import './viajes.scss'

export const ShowAllTravells = () => {

    const [showEditTravel, setShowEditTravel] = useState(false)
    const {userTravels, setUserTravels} = useContext(TravelContext) 
    const [TravelAModificar, setTravelAModificar] = useState()
    

    const delTravel = (id) => {

        const viajesMProv = userTravels.filter((elem)=> elem.travel_id !== id)

        axios
        .put(`http://localhost:4000/travels/delTravel/${id}`)
        .then((res)=>{
        setUserTravels(viajesMProv);
        })
        .catch((err)=>console.log(err))
    }

    const openModal = (elem) => {
        setShowEditTravel(true)
        setTravelAModificar(elem)
    }

  return (
    <div>
        <div className='viajes2'>
            <h1>Viajes</h1>
                {userTravels?.map((elem, index)=>{
                    return(
                        <div key={elem.travel_id} className="viajes">
                            <div>
                            <p>{elem.city}</p>
                            <p>{elem.country}</p>
                            <p>{elem.description}</p>
                        </div> 
                        <div><Button className='me-3' onClick={()=>{openModal(elem)}}>Editar</Button>
                        <Button onClick={()=>delTravel(elem.travel_id)}>Eliminar</Button></div>
                        <div>
                        <Galery elem={elem}
                        />
                        </div>
                        </div>
                    )
                })}
                <ModalForm 
                showEditTravel={showEditTravel}
                setShowEditTravel={setShowEditTravel}
                TravelAModificar={TravelAModificar}
                setTravelAModificar={setTravelAModificar}/>
        </div>
    </div>
  )
}
