import React, { useContext, useState } from 'react'
import axios from 'axios';
import { TravelContext } from '../../context/TravelsContext';

const initialValue = {
    city:"",
    country:"",
    description:""
};

export const FormularioViajes = ({setShowTravel}) => {

    const {user, setUserTravels} = useContext(TravelContext)
    const [travelFiles, setTravelFiles] = useState([])
    const [travel, setTravel] = useState(initialValue);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setTravel({...travel, [name]:value});
    };
    
    const handleFile = (e) => {
      setTravelFiles(e.target.files);
    };

    const handleSubmit= ()=> {
      const newFormData = new FormData();
      newFormData.append("regTravel", JSON.stringify(travel));

        if(travelFiles){
          for (const elem of travelFiles){
            newFormData.append("file", elem);
          };
        };

          axios
          .post(`http://localhost:4000/travels/createTravel/${user.user_id}`, newFormData)
          .then((res)=>{
            setUserTravels(res.data);
            setShowTravel(false);
          })
          .catch((err)=>{
            console.log(err)
          })
        }

      
  return (
    <div>
        <div>
        <h3>Crear nuevo viaje</h3>
        <p>Ciudad</p>
        <input 
        placeholder='Ciudad'
        onChange={handleChange}
        type="text"
        name="city"
        value={travel.city}/>
        <br/>
        <br/>
        <p>Pais</p>
        <input 
        placeholder='Pais'
        type="text"
        onChange={handleChange}
        name="country"
        value={travel.country}/>
        <br/>
        <br/>
        <p>Descripcion</p>
        <textarea 
        placeholder='Descripcion'
        name="description"
        onChange={handleChange}
        value={travel.description}/>
        <br/>
        <br/>
        <p>imagenes</p>
        <input 
        type="file"
        onChange={handleFile}
        multiple/>
        <br/>
        <br/>
        <button className='me-3' onClick={handleSubmit}>Aceptar</button>
        <button onClick={()=>setShowTravel(false)}>Cancelar</button>
      </div>
    </div>
  )
}
