import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Container } from "reactstrap";
import Header from "./components/Header";
import Routes from "./Routes";
import UserContext from "./contexts/UserContext";
import BeamsProvider from "./contexts/BeamsContext";
import { client } from "./utils/apollo";
import { ApolloProvider } from "@apollo/client";

function App() {
    const [user, setUser] = useState({});

    useEffect(() => {
        if (localStorage.getItem("vivi-user")) {
            setUser(JSON.parse(localStorage.getItem("vivi-user")));
        }
    }, []);
    return (
        <BrowserRouter>
            <main>
                <UserContext value={{ user, updateUser: setUser }}>
                    <Container fluid style={{ height: "100%" }}>
                        <BeamsProvider>
                            <Header />
                            <ApolloProvider client={client}>
                                <Routes />
                            </ApolloProvider>
                        </BeamsProvider>
                    </Container>
                </UserContext>
            </main>
        </BrowserRouter>
    );
}

export default App;
