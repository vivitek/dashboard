import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import RouterCard from "./RouterCard";
import { motion } from "framer-motion";
import { ANIMATION_VARIANTS } from "../../utils/constants";
import { useQuery } from "@apollo/client";
import { GET_ROUTERS } from "../../utils/apollo";
import Container from "reactstrap/lib/Container";
import GraphqlError from "../../components/GraphqlError";

const Router = () => {
    const { loading, error, data } = useQuery(GET_ROUTERS);

    const [routers, setRouters] = useState([]);

    useEffect(() => {
        if (data?.getRouters) {
            setRouters([...data.getRouters]);
        }
    }, [data]);
    if (loading) return <div>loading...</div>;
    if (error) {
        return <GraphqlError error={error}></GraphqlError>;
    }
    return (
        <Container fluid>
            <Row>
                {routers.map((r) => (
                    <Col xs="12" md="4" sm="12" key={r._id || r.id}>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={ANIMATION_VARIANTS}
                            whileHover={{ scale: 1.1 }}
                        >
                            <RouterCard router={r} />
                        </motion.div>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Router;
