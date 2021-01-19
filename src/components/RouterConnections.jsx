import { useMutation, useQuery, useSubscription } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Card from "reactstrap/lib/Card";
import CardBody from "reactstrap/lib/CardBody";
import CardTitle from "reactstrap/lib/CardTitle";
import Col from "reactstrap/lib/Col";
import Row from "reactstrap/lib/Row";
import Button from "reactstrap/lib/Button";
import {
    GET_BANS_FOR_ROUTER,
    ON_BAN_CREATED,
    UPDATE_BAN,
} from "../utils/apollo";
import TablePagination from "./TablePagination";
import Spinner from "reactstrap/lib/Spinner";
import { motion } from "framer-motion";
import { ANIMATION_VARIANTS } from "../utils/constants";
import Swal from "sweetalert2";

const RouterConnections = ({ routerId }) => {
    const { loading, data: historyConnections } = useQuery(
        GET_BANS_FOR_ROUTER,
        { variables: { routerId } }
    );
    const [updateBan] = useMutation(UPDATE_BAN);
    const {
        error: subError,
        loading: subLoading,
        data: subData,
    } = useSubscription(ON_BAN_CREATED, {
        variables: { routerId },
    });
    const [incoming, setIncoming] = useState([]);
    const [chronology, setChronology] = useState([]);
    useEffect(() => {
        if (subData?.banCreated) {
            const { address, _id } = subData.banCreated;
            const found = incoming.find(
                (e) => e.address === address || e._id === _id
            );
            if (!found) {
                setIncoming((old) => [...old, { address, _id }]);
            }
        }
    }, [subData]);
    useEffect(() => {
        if (historyConnections?.getBans) {
            setChronology([...historyConnections.getBans]);
        }
    }, [historyConnections]);
    const mutateBan = async (data) => {
        const res = await updateBan({
            variables: {
                banUpdate: { ...data },
            },
        });
        if (res?.errors?.length > 0) {
            Swal.fire("Mutation Failed", res.errors.join("\n"), "error");
        } else {
            Swal.fire("Success", "Mutation successful", "success");
        }
    };
    const addIncomingToHistory = (data) => {
        const { _id, address, banned } = data;
        setChronology((old) => [
            {
                _id,
                address,
                banned,
            },
            ...old,
        ]);
        setIncoming((old) => [...old.filter((e) => e._id !== _id)]);
    };

    if (loading) return <div>Loading...</div>;
    return (
        <Row>
            <Col md="6" sm="12">
                <Card>
                    <CardBody>
                        <CardTitle>Incoming Connections</CardTitle>
                        {subLoading ? (
                            <Row
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <div align="center">
                                    <Spinner
                                        size="lg"
                                        style={{
                                            width: "10rem",
                                            height: "10rem",
                                        }}
                                    />
                                </div>
                            </Row>
                        ) : (
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={ANIMATION_VARIANTS}
                            >
                                <TablePagination
                                    tableName={`vivi_router_${routerId}_realtime`}
                                    data={incoming.map((e) => ({
                                        id: e._id,
                                        address: {
                                            value: e.address,
                                            class: "",
                                        },
                                        actions: {
                                            value: (
                                                <>
                                                    {" "}
                                                    <Button
                                                        className="btn-icons"
                                                        size="sm"
                                                        color="success"
                                                        onClick={async () => {
                                                            const { _id } = e;
                                                            await mutateBan({
                                                                _id,
                                                                banned: false,
                                                            });
                                                            addIncomingToHistory(
                                                                {
                                                                    ...e,
                                                                    banned: false,
                                                                }
                                                            );
                                                        }}
                                                    >
                                                        <i className="fa fa-check"></i>
                                                    </Button>
                                                    <Button
                                                        className="btn-icons"
                                                        size="sm"
                                                        color="danger"
                                                        onClick={async () => {
                                                            const { _id } = e;
                                                            await mutateBan({
                                                                _id,
                                                                banned: true,
                                                            });
                                                            addIncomingToHistory(
                                                                {
                                                                    ...e,
                                                                    banned: true,
                                                                }
                                                            );
                                                        }}
                                                    >
                                                        <i className="fa fa-times"></i>
                                                    </Button>
                                                </>
                                            ),
                                            class: "text-right",
                                        },
                                    }))}
                                    itemsPerPage={10}
                                    headers={[
                                        {
                                            name: "Address",
                                            key: "address",
                                            class: "",
                                            export: true,
                                        },
                                        {
                                            name: "Actions",
                                            key: "actions",
                                            class: "text-right",
                                            export: false,
                                        },
                                    ]}
                                />
                            </motion.div>
                        )}
                    </CardBody>
                </Card>
            </Col>
            <Col md="6" sm="12">
                <Card>
                    <CardBody>
                        <CardTitle>Chronology</CardTitle>
                        {loading ? (
                            <Row
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <div align="center">
                                    <Spinner
                                        size="lg"
                                        style={{
                                            width: "10rem",
                                            height: "10rem",
                                        }}
                                    />
                                </div>
                            </Row>
                        ) : (
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={ANIMATION_VARIANTS}
                            >
                                <TablePagination
                                    tableName={`vivi_router_${routerId}_chronology`}
                                    data={chronology.map((e) => ({
                                        id: e._id,
                                        _id: { value: e._id, class: "" },
                                        address: {
                                            value: e.address,
                                            class: "",
                                        },
                                        banned: {
                                            value: e.banned ? "Y" : "N",
                                            class: "text-center",
                                        },
                                        actions: {
                                            value: (
                                                <>
                                                    <Button
                                                        onClick={() => {}}
                                                        className="btn-icon"
                                                        size="sm"
                                                        color="success"
                                                    >
                                                        <i className="fa fa-check"></i>
                                                    </Button>
                                                    <Button
                                                        className="btn-icon"
                                                        size="sm"
                                                        color="danger"
                                                    >
                                                        <i className="fa fa-times"></i>
                                                    </Button>
                                                </>
                                            ),
                                            class: "text-center",
                                        },
                                    }))}
                                    itemsPerPage={10}
                                    headers={[
                                        {
                                            name: "#",
                                            key: "_id",
                                            class: "",
                                            export: true,
                                        },
                                        {
                                            name: "Address",
                                            key: "address",
                                            class: "",
                                            export: true,
                                        },
                                        {
                                            name: "Banned",
                                            key: "banned",
                                            class: "text-center",
                                            export: true,
                                        },
                                        {
                                            name: "Actions",
                                            key: "actions",
                                            class: "text-center",
                                            export: false,
                                        },
                                    ]}
                                />
                            </motion.div>
                        )}
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default RouterConnections;
