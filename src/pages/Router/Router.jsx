import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import RouterCard from "./RouterCard";
import useError from "../../hooks/useErrors";
import { motion } from "framer-motion";
import { ANIMATION_VARIANTS } from "../../utils/constants";
import * as Yop from "yup";
import { useQuery } from "@apollo/client";
import { GET_ROUTERS } from "../../utils/apollo";
import Container from "reactstrap/lib/Container";

const Router = () => {
    const { loading, error, data } = useQuery(GET_ROUTERS);

    const [routers, setRouters] = useState([]);

    useEffect(() => {
        if (data?.getRouters) {
            setRouters([...data.getRouters]);
        }
    }, [data]);
    const errors = useError();
    if (loading) return <div>loading...</div>;
    if (error) return <div>{error.message}</div>;
    return (
        <Container fluid>
            {errors}

            <Row>
                {routers.map((r) => (
                    <Col xs="12" md="3" sm="12" key={r._id || r.id}>
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
