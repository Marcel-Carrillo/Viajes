import React, { createContext, useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios';

export const TravelContext = createContext();


export const TravelsProvider = (props) => {

    const [user, setUser] = useState();
    const [token, setToken] = useState();
    const [logged, setLogged] = useState(false)
    const [userTravels, setUserTravels] = useState()

    
    useEffect(() => {
        const tokenStore = window.localStorage.getItem("token", token)
        // setToken(tokenStore)

        if(tokenStore){
            let id = (jwtDecode(tokenStore).user.id)
            setLogged(true)
            axios
            .get(`http://localhost:4000/users/oneUser/${id}`)
            .then((res)=>{
            setUser(res.data.resultUser[0])
            setUserTravels(res.data.resultTravel)})
            .catch((error)=>console.log(error))
        }
        }
    , [token])
    
        useEffect(() => {
            setToken(window.localStorage.getItem("token"))
        }, [])
        

  return (
    <TravelContext.Provider value={{
        user,
        setUser,
        token,
        logged,
        setToken,
        userTravels,
        setLogged,
        setUserTravels
    }}>
        {props.children}
    </TravelContext.Provider>
  )
}
