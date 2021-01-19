import React, { useEffect, useState } from "react";
import Table from "reactstrap/lib/Table";
import PropTypes from "prop-types";
import PaginationLink from "reactstrap/lib/PaginationLink";
import Pagination from "reactstrap/lib/Pagination";
import PaginationItem from "reactstrap/lib/PaginationItem";
import Button from "reactstrap/lib/Button";
import UncontrolledTooltip from "reactstrap/lib/UncontrolledTooltip";
import { CSVLink } from "react-csv";
import { useHistory } from "react-router-dom";

const TablePagination = ({ headers, data, itemsPerPage = 20, tableName }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastpage] = useState(1);
    const [paginations, setPaginations] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const history = useHistory();
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
    }, [data]);

    useEffect(() => {
        const temp = [];
        for (let i = 1; i <= lastPage; i++) {
            temp.push(
                <PaginationItem key={i} onClick={() => setCurrentPage(i)}>
                    <PaginationLink>{i}</PaginationLink>
                </PaginationItem>
            );
        }
        setPaginations([...temp]);
    }, [lastPage]);
    return (
        <>
            <Table>
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
                                    className="btn btn-icon btn-simple btn-success"
                                >
                                    <i className="fa fa-file-csv"></i>
                                </CSVLink>
                                <UncontrolledTooltip
                                    placement="top"
                                    target="csvDownload"
                                    delay={0}
                                >
                                    Export table to CSV
                                </UncontrolledTooltip>
                                <Button
                                    id="pdfDownload"
                                    size="md"
                                    color="danger"
                                    className="btn-icon btn-simple"
                                    onClick={() => {
                                        history.push("/pdf/table", {
                                            headers: JSON.stringify(headers),
                                            rows: JSON.stringify(
                                                data.map((e) => {
                                                    const res = {};
                                                    headers
                                                        .filter(
                                                            (p) =>
                                                                p.export ===
                                                                true
                                                        )
                                                        .forEach((h) => {
                                                            res[h.key] =
                                                                e[h.key][
                                                                    "value"
                                                                ];
                                                        });
                                                    return res;
                                                })
                                            ),
                                            title: `${tableName}`,
                                        });
                                    }}
                                >
                                    <i className="fa fa-file-pdf"></i>
                                </Button>
                                <UncontrolledTooltip
                                    placement="top"
                                    target="pdfDownload"
                                    delay={0}
                                >
                                    Export table to PDF
                                </UncontrolledTooltip>
                            </td>
                        </tr>
                    )}
                    <tr>
                        <td colSpan={headers.length}>
                            <p>
                                Page {currentPage} of {lastPage}
                            </p>
                            <Pagination>
                                <PaginationItem
                                    onClick={() => {
                                        setCurrentPage(1);
                                    }}
                                >
                                    <PaginationLink first />
                                </PaginationItem>
                                <PaginationItem
                                    onClick={() => {
                                        if (currentPage > 1) {
                                            setCurrentPage(currentPage - 1);
                                        }
                                    }}
                                >
                                    <PaginationLink previous />
                                </PaginationItem>
                                {paginations}
                                <PaginationItem
                                    onClick={() => {
                                        if (currentPage < lastPage)
                                            setCurrentPage(currentPage + 1);
                                    }}
                                >
                                    <PaginationLink next />
                                </PaginationItem>
                                <PaginationItem
                                    onClick={() => {
                                        setCurrentPage(lastPage);
                                    }}
                                >
                                    <PaginationLink last />
                                </PaginationItem>
                            </Pagination>
                        </td>
                    </tr>
                </tfoot>
            </Table>
        </>
    );
};

TablePagination.propTypes = {
    data: PropTypes.array,
    itemsPerPage: PropTypes.number,
    headers: PropTypes.array,
    tableName: PropTypes.string,
};

export default TablePagination;
