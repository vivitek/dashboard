import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import {Container} from 'reactstrap'
import Header from './components/Header';
import Routes from './Routes';
function App() {
  return (
    <BrowserRouter>
      <Container fluid>
        <Header />
        <Container fluid>
          <Routes />
        </Container>
      </Container>
    </BrowserRouter>
  );
}

export default App;
