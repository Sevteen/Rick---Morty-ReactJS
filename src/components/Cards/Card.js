import React, { useEffect, useRef, useState } from 'react'
import {Link} from 'react-router-dom'
import '../Cards/Card.css'

const Card = ({ results, page }) => {
    let showData;

    if(results == null || results == '') {
        return null;
    }else if(results){
        showData = results.map((res) => {
            const {id, name, image, status} = res;
            return ( 
            <Link to={`${page}${id}`} key={id} className="text-decoration-none col-xl-3 col-lg-4 col-md-6 col-sm-12 position-relative p-2" >
                <div className="card d-flex flex-column justify-content-center border border-success rounded p-2">
                    <img src={image} alt={name} className="img-fluid rounded-circle border border-success"/>
                    <div className="text-center text-black fs-5 fw-bold py-3">{name}</div>
                    {(() => {
                        if(status === "Alive"){
                            return <div className='text-center'><span className='badge bg-success'>{status}</span></div>
                        }else if(status === "Dead"){
                            return <div className='text-center'><span className='badge bg-danger'>{status}</span></div>
                        }else{
                            return <div className='text-center'><span className='badge bg-secondary'>{status}</span></div>
                        }
                    })()}
                </div>

            </Link> 
            )
        })
    }

    return <> {showData}</>;

}

export default Card
