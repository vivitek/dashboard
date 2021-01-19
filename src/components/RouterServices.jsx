import React, { useState } from "react";
import TablePagination from "./TablePagination";

const RouterServices = ({ routerId }) => {
    const [services, setServices] = useState([
        {
            id: 1,
            logo: {
                value: (
                    <img
                        style={{ height: "30px", width: "auto" }}
                        src="https://favicon.splitbee.io/?url=https://twitter.com"
                    />
                ),
                class: "text-center",
            },
            name: {
                value: "twitter.com",
            },
            category: {
                value: "social network",
            },
            usage: {
                value: "1GB",
            },
        },
        {
            id: 2,
            logo: {
                value: (
                    <img
                        style={{ height: "30px", width: "auto" }}
                        src="https://favicon.splitbee.io/?url=https://vincipit.com"
                    />
                ),
                class: "text-center",
            },
            name: {
                value: "vincipit.com",
            },
            category: {
                value: "working tool",
            },
            usage: {
                value: "It doesn't matter",
            },
        },
    ]);

    return (
        <div>
            <TablePagination
                headers={[
                    {
                        name: "#",
                        key: "logo",
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
                        name: "Category",
                        key: "category",
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
                data={services}
                tableName={`vivi_${routerId}_services`}
            />
        </div>
    );
};

export default RouterServices;
