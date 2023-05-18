import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { TravelContext } from '../../context/TravelsContext'
import './edituser.scss'

const initialValue = {
  name:"",
  lastname:"",
  address:"",
  phone:"",
  img:""
}
export const EditUser = () => {


  const [userEdit, setUserEdit] = useState(initialValue)
  const {user,setUser} = useContext(TravelContext)
  const [file, setFile] = useState()

  const navigate = useNavigate();

  useEffect(() => {
    if(user){
      setUserEdit(user)
    }
  }, [user])
  

  const handleSubmit = () =>{
    const newFormData = new FormData
    newFormData.append("file", file)
    newFormData.append("register", JSON.stringify(userEdit))

    axios
      .put(`http://localhost:4000/users/editUser/${user.user_id}`, newFormData)
      .then((res)=>{
        if(res.data.img === ""){
          setUser(userEdit);
        }else{
          setUser({...userEdit, img:res.data.img});
        }
        navigate('/user')
      })
      .catch((error)=>{
        console.log(error)
      })
  }

  const handleChange = (e)=> {
    const {name, value} = e.target;
    setUserEdit({...userEdit, [name]:value})
  }

  const handleChangeFile = (e) => {
    setFile(e.target.files[0])
  }


  return (
    <Row>
      <Col>
      <div className='editarusuario'>
      Nombre: <input placeholder='Nombre'
      type="text"
      name="name"
      value={userEdit.name}
      onChange={handleChange}
      />
      Apellido: <input placeholder='Apellido'
      type="text"
      name="lastname"
      value={userEdit.lastname}
      onChange={handleChange}
      />
      Dirección: <input placeholder='Dirección'
      type="text"
      name="address"
      value={userEdit.address}
      onChange={handleChange}
      />
      Telefono: <input placeholder='Telefono'
      type="text"
      name="phone"
      value={userEdit.phone}
      onChange={handleChange}
      />
      <input 
      type="file"
      onChange={handleChangeFile}
      />
      <Button onClick={handleSubmit}>Cambiar</Button>
      <hr/>
      <Button onClick={()=>navigate(-1)}>Cancelar</Button>
      </div>
      </Col>
    </Row>
  )
}
