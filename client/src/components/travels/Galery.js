import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import './viajes.scss'

export const Galery = ({elem}) => {

    const [images, setImages] = useState([]);
    const [showAddImg, setShowAddImg] = useState(false);
    const [inputImg, setInputImg] = useState([]);

    useEffect(() => {
            axios
            .get(`http://localhost:4000/travels/getImgs/${elem.travel_id}`)
            .then((res)=> {
                setImages(res.data)
            }) 
            .catch((err)=>console.log(err))
    }, []);


    const delImg = (id) => {
        axios
        .put(`http://localhost:4000/travels/delPhoto/${id}`)
        .then((res)=>{
        const imgsProv = images.filter((elem)=>elem.photo_id !== id)
        setImages(imgsProv);
        })
        .catch((err)=>console.log(err))
    };

    const handleFile = (e) => {
        setInputImg(e.target.files)
    }

    const handleSubmit = () => {
        const newFormData = new FormData();

        if(inputImg){
            for(const elem of inputImg){
                newFormData.append("file", elem);
            }
        }

        axios
            .put(`http://localhost:4000/travels/addImgs/${elem.travel_id}`, newFormData)
            .then((res)=>{
            setImages(res.data);
            setShowAddImg(false)
            setInputImg();
            })
            .catch((err)=>console.log(err));
    }
 

  return (
    <Row>
        <h2>Gallery</h2>
        <Col>
            {images && <>
            {images.map((img,index)=>{
                return(
                    <div className='contimg'><img alt='' className='fotos' key={index} src={`/images/travel/${img.photo_name}`}/>
                    <Button 
                    onClick={()=>delImg(img.photo_id)}
                    variant='danger'
                    className='delete'
                    ><img alt='' src='/images/delete.svg' /></Button>
                    </div>
                )
            })}
            </>}
            <Button onClick={()=>setShowAddImg(!showAddImg)}>{showAddImg ? "Cancelar" : "Add Images"}</Button>
                        {showAddImg && <div><input 
                        type="file"
                        multiple
                        onChange={handleFile}
                        />
                        <Button onClick={()=>handleSubmit()}>Añadir</Button></div>}
        </Col>
    </Row>
  )
}
