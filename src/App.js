import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import {Container} from 'reactstrap'
import Header from './components/Header';
import Routes from './Routes';
import UserContext from './contexts/UserContext';
import RouterProvider from './contexts/RouterContext';
import {Client} from "@pusher/push-notifications-web"
function App() {
  const [user, setUser] = useState({})

  useEffect(() => {
    const notificationClient = new Client({
      instanceId: '6427b78a-033d-4139-aa97-2b91448d0cad'
    })

    notificationClient.start()
    .then(() => {
      console.log("🤘 notifications are now enabled")
    })
    .catch((err) => {
      alert(err)
    })
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
          <RouterProvider>
            <Routes />
          </RouterProvider>
          </Container>
        </Container>
      </UserContext>
    </BrowserRouter>
  );
}

export default App;
