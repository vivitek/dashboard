import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Row from "reactstrap/lib/Row";
import Container from "reactstrap/lib/Container";
import { GET_ROUTER } from "../../utils/apollo";
import Col from "reactstrap/lib/Col";
import Card from "reactstrap/lib/Card";
import CardBody from "reactstrap/lib/CardBody";
import Button from "reactstrap/lib/Button";
import Axios from "axios";
import RouterConnections from "../../components/RouterConnections";
import RouterServices from "../../components/RouterServices";
import CardTitle from "reactstrap/lib/CardTitle";

const RouterDetails = () => {
    const { id } = useParams();
    const { loading, error, data: routerData } = useQuery(GET_ROUTER, {
        variables: { routerId: id },
    });
    const [isRouterOnline, setIsRouterOnline] = useState(false);

    useEffect(() => {
        if (routerData?.getRouter) {
            Axios.get(routerData.getRouter.url)
                .then((r) => {
                    if (r.status < 400) setIsRouterOnline(true);
                })
                .catch(() => {
                    console.log("something went wrong");
                });
        }
    }, [routerData]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    return (
        <Container fluid>
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <Row>
                                <Col md="6" sm="12">
                                    <h4>Info</h4>
                                    <h5>name: {routerData?.getRouter.name}</h5>
                                    <h5>url: {routerData?.getRouter.url}</h5>
                                </Col>
                                <Col md="6" sm="12" align="right">
                                    <h4>Status</h4>
                                    <h5>
                                        {isRouterOnline ? (
                                            <span style={{ color: "green" }}>
                                                Online
                                            </span>
                                        ) : (
                                            <span style={{ color: "red" }}>
                                                Offline
                                            </span>
                                        )}
                                    </h5>
                                    <Row>
                                        <Col md="6">
                                            <Button
                                                color="danger"
                                                disabled={!isRouterOnline}
                                            >
                                                Power Off
                                            </Button>
                                        </Col>
                                        <Col md="6">
                                            <Button
                                                color="secondary"
                                                disabled={!isRouterOnline}
                                            >
                                                Reboot
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <RouterConnections routerId={id} />
                    </Card>
                </Col>
            </Row>
            <Row className="">
                <Col>
                    <Card>
                        <CardBody>
                            <CardTitle>Detected Services</CardTitle>
                            <RouterServices routerId={id} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default RouterDetails;
