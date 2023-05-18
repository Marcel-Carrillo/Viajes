import React, { useContext } from 'react'
import {Container, Nav, Navbar, Button, Row} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { TravelContext } from '../../context/TravelsContext'
import { deleteLocalStorageTravel } from '../../helpers/localStorage/localStorageTravels'
import './navbar.scss'


export const AppNavBar = () => {

    const navigate = useNavigate();
    const {user, setUser, setToken, setLogged} = useContext(TravelContext)

    const onLogOut = () => {
      deleteLocalStorageTravel();
      setToken();
      setLogged(false);
      setUser();
      navigate("/");
    }

  
 
  return (
    <Row><Navbar bg="light" expand="lg">
    <Container >
      <Navbar.Brand as={Link} to="/">Viajes</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          
          {user?.type !== 1 && <>
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/services">Services</Nav.Link>
          <Nav.Link as={Link} to="/about">About</Nav.Link>

         {user?.type === 0 && <Nav.Link as={Link} to="/allusers">Todos los usuarios</Nav.Link>}

          </>}

          {user?.type === 1 && <>
          
            <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
            <Nav.Link as={Link} to="/adminUsers">Admin Usuarios</Nav.Link>
            <Nav.Link as={Link} to="/adminPictures">Admin fotos</Nav.Link>
          </>}
        </Nav>
       {!user && <><Button className='me-2' onClick={()=>navigate('/login')}>Login</Button>
          <Button className='me-2' onClick={()=>navigate('/Register')}>Register</Button></>}
       {user && <Button className='me-2' onClick={()=>onLogOut()}>LogOut</Button>
          }
          
          {user &&
          <div>
            {user?.img ? <img className='imagenUsuario' alt='' onClick={()=>navigate('/user')} src={`/images/user/${user?.img}`}/> : <div className='avatarLetra'><p>{user?.name.charAt(0).toUpperCase()}</p></div>}
            </div>}
          {user &&<Button onClick={()=>navigate(`/user`)}>Perfil de {user?.email}</Button>}
      </Navbar.Collapse>
    </Container>
  </Navbar></Row>
  )
}
