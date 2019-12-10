import React from "react";
import {
  MDBListGroup,
  MDBListGroupItem,
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBDataTable
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
      sort:"asc"
    }
  ]
  const rows = data
  return (
    <MDBDataTable
      striped
      bordered
      data={{columns, rows}} />
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
