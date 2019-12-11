import React from "react";
import {
  MDBListGroup,
  MDBListGroupItem,
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBDataTable,
  MDBTable,
  MDBTableHead,
  MDBTableBody
} from "mdbreact";

const ListGroupPage = ({data}) => {
  const columns = [
    {
      label:"MAC Address",
      field:"address",
      sort:"asc"
    },
    {
      label:"Actions",
      field:"actions",
      align:"right",
      sort:"asc"
    }
  ]
  const rows = data
  return (
    <MDBTable>
      <MDBTableHead>
        <th>Address</th>
        <th>Actions</th>
      </MDBTableHead>
      <MDBTableBody>
        {data.map((e) => (
          <tr key={e.address}>
            <td>{e.address}</td>
            <td align="right">{e.actions}</td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
    // <MDBDataTable
    //   striped
    //   borderless
    //   exportToCSV

    //   data={{columns, rows}} />
  )
  // return (
  //   <MDBContainer>
  //     <MDBRow center>
  //       <MDBListGroup>
  //         {data.map(e => (
  //           <MDBListGroupItem className="d-flex justify-content-between align-items-center">
  //             <span className="mr-auto p-2 col-example">{e}</span>
  //             <MDBBtn className="p-2 col-example" size="lg" color="success">
  //               Accept
  //             </MDBBtn>
  //             <MDBBtn className="p-2 col-example" size="lg" color="danger">
  //               Deny
  //             </MDBBtn>
  //           </MDBListGroupItem>
  //         ))}
  //       </MDBListGroup>
  //     </MDBRow>
  //   </MDBContainer>
  // );
};

export default ListGroupPage;
