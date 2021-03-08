import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";

const Landing = () => {
    const history = useHistory();

    return (
        <React.Fragment>
            <Row>
                <Col size="12">
                    <h2>Vivi</h2>
                </Col>
            </Row>
            <Row>
                <Col md="6" sm="12">
                    <Button
                        color="primary"
                        onClick={() => {
                            history.push("/login");
                        }}
                    >
                        Login
                    </Button>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Landing;
