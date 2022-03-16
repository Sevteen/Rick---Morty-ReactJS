import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route, Link, NavLink} from 'react-router-dom'
import {Container, Row, Col } from 'react-bootstrap';
import Card from './components/Cards/Card';
import Pagination from './components/Pagination/Pagination';
import CharacterLocation from './components/CharacterLocation';
import DetailCharacter from './components/DetailCharacter';
import NavBar from './components/NavBar';

function App( ) {
  return(
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/:id" element={<DetailCharacter />}/>
          <Route path="/CharacterLocation" element={<CharacterLocation/>}/>
          <Route path="/CharacterLocation/:id" element={<CharacterLocation/>}/>
        </Routes>
      </div>
    </Router>
  )
}

const Home = () => {
  let [pageNumber, setPageNumber] = useState(1);
  let [info, setInfo] = useState([]);
  let [results, setResults] = useState([]);

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
          `{ characters(page: ${pageNumber}) {
            info {
              count
              pages
              next
              prev
            }
            results {
              id
              name
              status
              species
              type
              gender
              image
              }
            } 
          }`
        })
      });
      const response = await request.json();
      setInfo(response.data.characters.info);
      setResults(response.data.characters.results);
    }
    getData();
  }, [pageNumber]);

  if(info.length===0) return null;

  return (
    <div className="App">
      <NavBar />
      <div className="container" >
        <div className="row m-1">
          <div className="position-relative col-12">
            <div className="row">
              <h1 className='text-center py-5 fw-bold'>Character List</h1>
              <Card page="/" results={results}/>
            </div>
          </div>
        </div>
      </div>

      <Pagination info={info} setPageNumber={setPageNumber} pageNumber={pageNumber}/>

      <footer className="mt-auto bg-light">
        <Container>
          <Row>
            <Col className="container-fluid text-center py-3">Copyright &copy; Ilham Hanif</Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default App;
