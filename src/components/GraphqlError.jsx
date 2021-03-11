import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
const GraphqlError = ({ error }) => {
    return (
        <Row
            style={{
                height: "80%",
                justifyContent: "center",
                alignitems: "center",
            }}
        >
            <Col md="4">
                <Card>
                    <CardBody
                        style={{
                            textAlign: "center",
                        }}
                    >
                        <h3>Oops, something went wrong</h3>
                        {error.name && (
                            <h4>
                                {error.name}: {error.message}
                            </h4>
                        )}
                        <ul>
                            {error.graphQLErrors?.forEach((e) => (
                                <li key={e.name}>
                                    {e.name}: {e.message}
                                </li>
                            ))}
                            {error.networkError && (
                                <li>
                                    {error.networkError.name}:{" "}
                                    {error.networkError.message}{" "}
                                    {error.networkError.statusCode}
                                </li>
                            )}
                        </ul>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default GraphqlError;
