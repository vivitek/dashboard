import {
    Document,
    Image,
    Page,
    PDFViewer,
    Text,
    View,
} from "@react-pdf/renderer";

import {
    DataTableCell,
    Table,
    TableBody,
    TableCell,
    TableHeader,
} from "@david.kucsai/react-pdf-table";
import React from "react";
import { useLocation } from "react-router-dom";

const PdfTableExport = () => {
    const location = useLocation();
    const headers = JSON.parse(location.state.headers);
    const rows = JSON.parse(location.state.rows);
    const title = location.state.title;
    console.log(rows);
    return (
        <PDFViewer style={{ height: "100%", width: "100%" }}>
            <Document
                title={title}
                author="ViVi"
                creator="ViVi"
                producer="ViVi"
                subject={title}
            >
                <Page size="A4">
                    <View
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            margin: "20px",
                        }}
                    >
                        <Image
                            src="/vivi_no-text.png"
                            style={{ width: "30%" }}
                        />
                        <Text>{new Date().toLocaleDateString()}</Text>
                    </View>
                    <View style={{ textAlign: "left", marginLeft: "20px" }}>
                        <Text>{title}</Text>
                    </View>
                    <View style={{ margin: "20px" }}>
                        <Table data={rows}>
                            <TableHeader textAlign={"center"} Color={"blue"}>
                                {headers
                                    .filter((e) => e.export)
                                    .map((e) => (
                                        <TableCell weighting={0.3}>
                                            <Text style={{ marginLeft: "5px" }}>
                                                {e.name}
                                            </Text>
                                        </TableCell>
                                    ))}
                            </TableHeader>
                            <TableBody>
                                {headers
                                    .filter((e) => e.export)
                                    .map((p, i) => (
                                        <DataTableCell
                                            weighting={0.3}
                                            key={`${p}-${i}`}
                                            getContent={(r) => (
                                                <Text
                                                    style={{
                                                        marginLeft: "3px",
                                                    }}
                                                >
                                                    {r[p.key]}
                                                </Text>
                                            )}
                                        />
                                    ))}
                            </TableBody>
                        </Table>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
};

export default PdfTableExport;
