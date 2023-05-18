import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './adminPics.scss'

export const AdminPictures = () => {

  const [pics, setPics] = useState();


  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/getAllpics")
      .then((res)=>{
        setPics(res.data)
      })
      .catch((err)=>console.log(err));

  }, [])

  const handleClick = (id, is_deleted ) => {
    let url = `http://localhost:4000/admin/disablePic/${id}`

    if(is_deleted === 1){
      url = `http://localhost:4000/admin/enablePic/${id}`
    }
    axios
      .put(url)
      .then((res)=>{
        setPics(res.data)
      })
      .catch((err)=>console.log(err))
  }
  

  return (
    <div>
      <h1>Fotos de todos</h1>
      <div className='contFotos'>
        {pics?.map((pics)=>{
          return(
            <div key={pics.photo_id} className="pic">
              {pics.is_deleted === 0 ? <img src={`/images/travel/${pics.photo_name}`}/>: <img src={`/images/deleted.png`}/>}
              <button onClick={()=> handleClick(pics.photo_id, pics.is_deleted)}>
                {pics.is_deleted === 0 ? "disable" : "enabled"}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
