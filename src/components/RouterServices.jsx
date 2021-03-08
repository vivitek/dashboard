import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Spinner } from "reactstrap";
import Row from "reactstrap/lib/Row";
import { GET_SERVICES_FOR_ROUTER } from "../utils/apollo";
import GraphqlError from "./GraphqlError";
import TablePagination from "./TablePagination";

const RouterServices = ({ routerId }) => {
    const [services, setServices] = useState([]);
    const { error, loading, data } = useQuery(GET_SERVICES_FOR_ROUTER, {
        variables: {
            routerId,
        },
    });
    useEffect(() => {
        if (data?.getServicesForRouter) {
            setServices(data.getServicesForRouter);
        }
    }, [setServices, services, data]);
    if (error) return <GraphqlError error={error} />;
    if (loading)
        return (
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
        );
    return (
        <div>
            <TablePagination
                headers={[
                    {
                        name: "#",
                        key: "_id",
                        export: false,
                        class: "text-center",
                    },
                    {
                        name: "Name",
                        key: "name",
                        export: true,
                        class: "",
                    },
                    {
                        name: "Usage",
                        key: "usage",
                        export: true,
                        class: "",
                    },
                ]}
                data={services.map((e) => ({
                    name: { value: e.name, class: "" },
                    usage: { value: e.bandwidth, class: "" },
                    id: e._id,
                    _id: { value: e._id, class: "text-center" },
                }))}
                tableName={`vivi_${routerId}_services`}
            />
        </div>
    );
};

export default RouterServices;
