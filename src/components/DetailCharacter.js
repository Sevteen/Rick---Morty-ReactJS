import './DetailCharacter.css';
import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';

const DetailCharacter = () => {
    const {id} = useParams();
    let [results, setResults] = useState([]);
    let {name, status, species, gender, image, created, episode} = results;
    let dEpisodes;
    const getRef = useRef(null);
    const setRef = useRef(null);
    const [location, setLocation] = useState('');

    useEffect( () => {
        const getData = async () => {
          const request = await fetch('https://rickandmortyapi.com/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              query: 
              `{ 
                character(id: ${id}) {
                    name
                    status
                    species
                    gender
                    image
                    created
                    episode {
                        id
                        name
                    }
                }
              }`
            })
          });
          const response = await request.json();
          setResults(response.data.character);
        }
        getData();
    }, [id, results, location]);

    //function setter dan getter kedalam localstorage
    function setData() {
        const getter = getRef.current.value;
        localStorage.setItem(id, getter);

        setLocation(getter);
    }

    useEffect(() => {
        let data = localStorage.getItem(id);
        if(data){
            setRef.current.textContent = data;
        }else{
            return null;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location, results]);

    //rendering
    return (
        <div className="App">
            <NavBar/>
            <div className="container">
                <div className="row justify-content-center border rounded m-1 pb-5 bg-light">
                    <div className="col-xl-6 col-lg-7 col-md-9 col-sm-12">
                        <h1 className='text-center py-5 fw-bold'>Character Detail</h1>
                        {(() => {
                            if(status === "Alive"){
                                return <img className='img-thumbnail bg-success' src={image} alt={name} style={{width: '100%', height:'auto'}}/>
                            }else if(status === "Dead"){
                                return <img className='img-thumbnail bg-danger' src={image} alt={name} style={{width: '100%', height:'auto'}}/>
                            }else{
                                return <img className='img-thumbnail bg-secondary' src={image} alt={name} style={{width: '100%', height:'auto'}}/>                         
                            }
                        })()}
                        
                        <div className="row">
                            <div className="container">                            
                                <div className="col-12 border bg-light rounded pb-3 bg-transparent">
                                    <h1 className='fw-bold text-center mt-4'>{name}</h1>
                                    <hr />
                                    <h5 className='ms-4 my-4'>Details Character: </h5>
                                    <div className="row px-4 pb-1">
                                        <div className="col-3">Status </div>
                                        <div className="col-2">:</div>
                                        <div className="col-7">{status}</div>
                                    </div>
                                    <div className="row px-4 pb-1">
                                        <div className="col-3">Species </div>
                                        <div className="col-2">:</div>
                                        <div className="col-7">{species}</div>
                                    </div>
                                    <div className="row px-4 pb-1">
                                        <div className="col-3">Gender </div>
                                        <div className="col-2">:</div>
                                        <div className="col-7">{gender}</div>
                                    </div>
                                    <div className="row px-4 pb-1">
                                        <div className="col-3">Location </div>
                                        <div className="col-2">:</div>
                                        <div ref={setRef} className="col-xl-7 col-lg-7 col-md-7 col-sm-7 location-row">
                                            <input ref={getRef} className="input-location form-controll" type="text" placeholder='Add Location'/>
                                            <button className="btn btn-success btn-location" onClick={setData}>+</button>
                                        </div>
                                    </div>
                                    <div className="row px-4 pb-1">
                                        <div className="col-3">Created </div>
                                        <div className="col-2">:</div>
                                        <div className="col-7">{created}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailCharacter