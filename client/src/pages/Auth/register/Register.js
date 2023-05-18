import React, { useState } from 'react'
import { Row, Form, Button, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


import './register.scss' 


const initialValue = {
  name:"",
  email:"",
  password:""
}

export const Register = () => {

  const [messageError1, setMessageError1] = useState("")
  const [register, setRegister] = useState(initialValue);
  const navigate = useNavigate();

  const handleChange = (e)=> {
    const {name, value} = e.target;
    setRegister({...register, [name]:value})
  }


  const handleSubmit = (e)=> {
      e.preventDefault();
      if(!register.name || !register.email || !register.password){
        setMessageError1("Debes rellenar TODOS los campos")
      }else{
        axios
        .post("http://localhost:4000/users/createUser", register)
        .then((res)=>{  
          navigate('/login');
          })
        .catch((err)=>{
          if(err.response.data.error.errno === 1062){
            setMessageError1("Email duplicado")
          }else{
            setMessageError1("Error en el registro")
          }
        })
      }
      setRegister(initialValue)
  }

  return (
    <Row className='contHome'>
      <Col>
      <Form className='register'>
    <Form.Group className="mb-3">
      <Form.Control 
      type="text" 
      placeholder="Nombre"
      autoComplete='off'
      required
      name="name"
      value={register.name}
      onChange={handleChange} 
      />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Control 
      type="email" 
      placeholder="Email" 
      autoComplete='off'
      name="email"
      required
      value={register.email}
      onChange={handleChange} 
      />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Control 
      type="password" 
      placeholder="Password" 
      autoComplete='off'
      name="password"
      required
      value={register.password}
      onChange={handleChange} 
      />
    </Form.Group>
    <Button 
      variant="primary" 
      type="submit"
      autoComplete='off'
      required
      onClick={handleSubmit} 
    >
      Registrar
    </Button>
    <p>{messageError1}</p>
    <hr/>
    <p>Ya estas registrado</p>
    <Button variant="primary" type="submit" onClick={()=>navigate("/login")}>
      Login
    </Button>
  </Form>
  </Col>
  </Row>
  )
}
