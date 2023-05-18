import React, { useContext, useState } from 'react'
import { Row, Form, Button, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './login.scss'
import { saveLocalStorageTravel } from '../../../helpers/localStorage/localStorageTravels'
import { TravelContext } from '../../../context/TravelsContext'

const initialValue = {
  email:"",
  password:""
}

export const Login = () => {

  const [mensaje, setMensaje] = useState()
  const [login, setLogin] = useState(initialValue)
  const navigate = useNavigate();
  const {setUser,setToken} = useContext(TravelContext);

  
  const handleChange = (e)=> {
    const {name, value} = e.target;
    setLogin({...login, [name]:value})
  }
    const handleSubmit= (e)=> {
      e.preventDefault();
      if(!login.email || !login.password){
        setMensaje("Debes rellenar todos los datos")
      }else{
        axios
        .post('http://localhost:4000/users/login', login)
        .then((res)=>{
          const token = res.data.token
          saveLocalStorageTravel(res.data.token)
          setUser(res.data.user)
          setToken(res.data.token)
          const type = res.data.user.type;
          type === 0 ? 
          navigate('/allusers'):
            type === 1 ? 
              navigate('/admin'):
                navigate('/') 
        })
        .catch((err)=>{
          console.log(err)
        })
      }
    }


  return (
    <Row className='contHome'>
      <Col>
      <Form className='login'>
      <Form.Group 
      className="mb-3" 
      controlId="formBasicEmail"
      >
        <Form.Control 
        type="email" 
        placeholder="Enter email"
        autoComplete='off'
        name="email"
        required
        value={login.email}
        onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control 
        type="password" 
        placeholder="Password" 
        autoComplete='off'
        name="password"
        required
        value={login.password}
        onChange={handleChange}
        />
      </Form.Group>
      <Button 
      variant="primary" 
      type="submit"
      onClick={handleSubmit}>
        Login
      </Button>
      <p>{mensaje}</p>
      <p>Usuario o contraseña incorrecto</p>
      <hr/>
      <p>No estas registrado???</p>
      <Button variant="primary" type="submit" onClick={()=>navigate("/register")}> 
        Registrate
      </Button>
    </Form>
    </Col>
    </Row>
  )
}
