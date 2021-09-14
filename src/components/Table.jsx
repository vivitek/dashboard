import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import CSV from "../images/CSV";
import PaginationLink from "./PaginationLink";

const TablePagination = ({ headers, data, itemsPerPage = 20, tableName }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastpage] = useState(1);
    const [paginations, setPaginations] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    useEffect(() => {
        const temp = [];
        data.forEach((e) => {
            const tds = [];
            headers.forEach((h) => {
                tds.push(
                    <td key={`${e.id}-${h.name}`} className={e[h.key]["class"]}>
                        {e[h.key]["value"]}
                    </td>
                );
            });
            temp.push(<tr key={e.id}>{tds}</tr>);
        });
        setLastpage(Math.max(Math.floor(data.length / itemsPerPage + 1), 1));
        setDisplayData(temp);
    }, [data, headers, itemsPerPage]);

    useEffect(() => {
        const temp = [];
        for (let i = 1; i <= lastPage; i++) {
            temp.push(
                <div key={i} onClick={() => setCurrentPage(i)}>
                    <span>{i}</span>
                </div>
            );
        }
        setPaginations([...temp]);
    }, [lastPage]);
    return (

        <table className="table-auto">
            <thead>
                <tr>
                    {headers.map((e) => (
                        <th key={e.key} className={e.class}>
                            {e.name}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {displayData.length === 0 ? (
                    <tr>
                        <td colSpan={headers.length}>
                            <h5 className="text-center">
                                There's no data to display...
                            </h5>
                        </td>
                    </tr>
                ) : (
                    displayData.slice(
                        itemsPerPage * (currentPage - 1),
                        itemsPerPage * currentPage
                    )
                )}
            </tbody>

            <tfoot>
                {headers.filter((e) => e?.export === true).length > 0 && (
                    <tr>
                        {headers
                            .slice(0, headers.length - 1)
                            .map((e, i) => (
                                <td key={i}></td>
                            ))}
                        <td className="text-center">
                            <CSVLink
                                filename={`${tableName}.csv`}
                                target="_blank"
                                headers={headers
                                    .filter((e) => e.export === true)
                                    .map((e) => ({
                                        label: e.name,
                                        key: e.key,
                                    }))}
                                data={data.map((e) => {
                                    const res = {};
                                    headers
                                        .filter((e) => e.export === true)
                                        .forEach((h) => {
                                            res[h.key] = e[h.key]["value"];
                                        });
                                    return res;
                                })}
                                id="csvDownload"
                                className=""
                            >
                                <CSV />
                            </CSVLink>
                        </td>
                    </tr>
                )}
                <tr>
                    <td colSpan={headers.length}>
                        <p>
                            Page {currentPage} of {lastPage}
                        </p>
                        <div className="flex items-center justify-evenly">
                            <div
                                onClick={() => {
                                    setCurrentPage(1);
                                }}
                            >
                                <PaginationLink first />
                            </div>
                            <div
                                onClick={() => {
                                    if (currentPage > 1) {
                                        setCurrentPage(currentPage - 1);
                                    }
                                }}
                            >
                                <PaginationLink previous />
                            </div>
                            {paginations}
                            <div
                                onClick={() => {
                                    if (currentPage < lastPage)
                                        setCurrentPage(currentPage + 1);
                                }}
                            >
                                <PaginationLink next />
                            </div>
                            <div
                                onClick={() => {
                                    setCurrentPage(lastPage);
                                }}
                            >
                                <PaginationLink last />
                            </div>
                        </div>
                    </td>
                </tr>
            </tfoot>
        </table>

    );
};

export default TablePagination;