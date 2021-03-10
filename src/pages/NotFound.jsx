import React from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import Col from "reactstrap/lib/Col";
import Row from "reactstrap/lib/Row";

const NotFound = () => {
    return (
        <Container
            fluid
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "60%",
                flexDirection: "column",
            }}
        >
            <Row style={{ justifyContent: "center", alignItems: "center" }}>
                <Col style={{ alignSelf: "center" }}>
                    <h1 align="center">404</h1>
                </Col>
            </Row>
            <Row>
                <p>The page you were looking for was not found...</p>
            </Row>
            <Row>
                <p>
                    Go back to <Link to="/">Home</Link>
                </p>
            </Row>
        </Container>
    );
};

export default NotFound;
