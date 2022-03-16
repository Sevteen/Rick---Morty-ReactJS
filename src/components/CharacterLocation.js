import React, {useEffect, useState, useRef} from 'react'
import Card from './Cards/Card';
import './CharacterLocation.css'
import NavBar from './NavBar';

const CharacterLocation = () => {
  const resultsLocation = [];
  const [datas, setDatas] = useState(0);
  const [results, setResults] = useState([]);
  const getRef = useRef(null);
  const FirstRun = useRef(true);

  const getDataArr = () => {
    const result = JSON.parse(JSON.stringify(localStorage));
    const obj = Object.values(result);
    const getUnique = (array) => (
      [...new Set(array)]
    );
    return getUnique(obj);
  }

  const arrLocation = getDataArr().sort().map(res => {
    return (
      <option value={res} key={res} >{res}</option>
    )
  });
  
  const display = () => {
    const value = getRef.current.value;
    setDatas(value);
  }
  
  for(let value of Object.entries(localStorage)){
    if(value[1]===datas){
      resultsLocation.push(value[0]);
    }
  }

  useEffect(() => {
    if(FirstRun.current) {
      FirstRun.current = false;
      return;
    }
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
            charactersByIds(ids: [${resultsLocation}]) {
              id
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
          }
          `
        })
      });
      const response = await request.json();
      setResults(response.data.charactersByIds);
    }
    getData();
  }, [datas]);
  
  return (
    <div className="App">
      <NavBar/>
      <div className="container" >
        <div className="row m-1">
          <div className="position-relative col-12">
            <div className="row">
              <h1 className='text-center py-5 fw-bold'>Character Location</h1>
              <h4 className='px-0'>Pick Location</h4>
              <select ref={getRef} className="form-select my-4" onChange={display}>
                <option>Choose...</option>
                <>{arrLocation}</>
              </select>
              <Card className="m-5" page="/" results={results}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterLocation