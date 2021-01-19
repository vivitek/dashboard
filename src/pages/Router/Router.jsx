import React, { useEffect, useState } from "react";
import {
    Button,
    Col,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
} from "reactstrap";
import RouterCard from "./RouterCard";
import useError from "../../hooks/useErrors";
import { motion } from "framer-motion";
import { ANIMATION_VARIANTS } from "../../utils/constants";
import { Formik } from "formik";
import * as Yop from "yup";
import FormGroupInput from "../../components/FormGroupInput";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_ROUTER, GET_ROUTERS } from "../../utils/apollo";
import Container from "reactstrap/lib/Container";
import Spinner from "reactstrap/lib/Spinner";

const RouterSchema = Yop.object().shape({
    name: Yop.string().required("Name is required"),
    url: Yop.string().required("Url is required").url("must be a valid url"),
});

const Router = () => {
    const { loading, error, data } = useQuery(GET_ROUTERS);
    const [createRouter, { loading: mutationLoading }] = useMutation(
        CREATE_ROUTER
    );
    const [routers, setRouters] = useState([]);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        if (data?.getRouters) {
            setRouters([...data.getRouters]);
        }
    }, [data]);
    const errors = useError();
    if (loading) return <div>loading...</div>;
    if (error) return <div>{error.message}</div>;
    return (
        <Container
            fluid
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
            {errors}
            <Modal
                toggle={() => {
                    setModal(!modal);
                }}
                isOpen={modal}
            >
                <ModalHeader
                    toggle={() => setModal(!modal)}
                    style={{ backgroundColor: "var(--dark)" }}
                >
                    Add Router
                </ModalHeader>
                {mutationLoading ? (
                    <div>
                        <Spinner size="lg" color="white" />
                    </div>
                ) : (
                    <Formik
                        initialValues={{
                            name: "",
                            url: "",
                        }}
                        onSubmit={async (values) => {
                            const res = await createRouter({
                                variables: {
                                    routerCreateData: { ...values },
                                },
                            });
                            setRouters((old) => [
                                { ...res.data.createRouter },
                                ...old,
                            ]);
                            setModal(!modal);
                        }}
                        validationSchema={RouterSchema}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                        }) => (
                            <React.Fragment>
                                <ModalBody
                                    style={{ backgroundColor: "var(--dark)" }}
                                >
                                    <FormGroupInput
                                        name="name"
                                        value={values.name}
                                        label="Router name"
                                        touched={touched.name}
                                        error={errors.name}
                                        handleChange={handleChange}
                                    />
                                    <FormGroupInput
                                        name="url"
                                        value={values.url}
                                        label="Router url"
                                        touched={touched.name}
                                        error={errors.url}
                                        handleChange={handleChange}
                                    />
                                </ModalBody>
                                <ModalFooter
                                    style={{ backgroundColor: "var(--dark)" }}
                                >
                                    <Button
                                        color="danger"
                                        onClick={() => {
                                            setModal(!modal);
                                        }}
                                    >
                                        Close
                                    </Button>
                                    <Button
                                        type="submit"
                                        onClick={handleSubmit}
                                        color="primary"
                                    >
                                        Create
                                    </Button>
                                </ModalFooter>
                            </React.Fragment>
                        )}
                    </Formik>
                )}
            </Modal>

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
            <div
                style={{
                    position: "absolute",
                    bottom: "2rem",
                    right: "3rem",
                    zIndex: "3",
                }}
            >
                <Button
                    className="btn-round animation-on-hover"
                    size="lg"
                    color="primary"
                    onClick={() => setModal(!modal)}
                >
                    <i className="fa fa-plus"></i>
                </Button>
            </div>
        </Container>
    );
};

export default Router;
