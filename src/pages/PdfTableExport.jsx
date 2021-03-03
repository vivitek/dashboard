import {
    Document,
    Image,
    Page,
    PDFViewer,
    Text,
    View,
    StyleSheet,
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

const styles = StyleSheet.create({
    table: { 
        display: "table", 
        width: "auto", 
        borderStyle: "none", 
        borderWidth: 1, 
        borderRightWidth: 0,
        borderBottomWidth: 0 
    }, 
    tableRow: { 
        margin: "auto", 
        flexDirection: "row" 
    },

    tableCol: { 
        width: "25%", 
        borderStyle: "none", 
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0 }, 
        
    tableCell: { 
        margin: "auto", 
        marginTop: 5, 
        fontSize: 10 
    }
});

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
                <View style={styles.table}> 
                    
                    <View style={styles.tableRow}> 
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>Product</Text> 
                        </View> 
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>Type</Text> 
                        </View> 
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>Period</Text> 
                        </View> 
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>Price</Text> 
                        </View> 
                    </View> 
                    
                    <View style={styles.tableRow}> 
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>React-PDF</Text> 
                        </View> 
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>3 User </Text> 
                        </View> 
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>2019-02-20 - 2020-02-19</Text> 
                        </View> 
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>5€</Text> 
                        </View> 
                    </View> 
                </View>
            </Page>
            </Document>
        </PDFViewer>
        /*<PDFViewer style={{ height: "100%", width: "100%" }}>
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
        </PDFViewer>*/
    );
};

export default PdfTableExport;
