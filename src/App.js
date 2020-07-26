import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import {Container} from 'reactstrap'
import Header from './components/Header';
import Routes from './Routes';
import UserContext from './contexts/UserContext';
function App() {
  const [user, setUser] = useState({})

  useEffect(() => {
    if (localStorage.getItem("vivi-user")) {
      setUser(JSON.parse(localStorage.getItem("vivi-user")))
    }
  }, [])
  return (
    <BrowserRouter>
      <UserContext value={{user, updateUser: setUser}}>
        <Container fluid>
          <Header />
          <Container fluid>
            <Routes />
          </Container>
        </Container>
      </UserContext>
    </BrowserRouter>
  );
}

export default App;
