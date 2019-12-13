import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import {useParams} from 'react-router-dom'
import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody, MDBInput, MDBCard, MDBCardBody, MDBCardHeader, MDBSpinner, MDBBtn, MDBIcon } from 'mdbreact'
import axios from "axios"

const RouterHistory = () => {
	const {id} = useParams()
	const [connections, setConnections] = useState([])

	const handleStatusChange = (address, banned) => {
		console.log("received history update")
		socket.emit("client allow", {address, banned})
		axios.get("https://vivi.matteogassend.com/ban/1", {
			headers:{
				Authorization:`Bearer ${localStorage.getItem("jwt")}`
			}
		}).then(res => setConnections(res.data))
	}
	const handleRemove = (id) => {
		axios.delete(`https://vivi.matteogassend.com/ban/${id}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("jwt")}`
			}
		}).then(() => {
			axios.get("https://vivi.matteogassend.com/ban/1", {
				headers:{
					Authorization:`Bearer ${localStorage.getItem("jwt")}`
				}
			}).then(res => setConnections(res.data))
		})
	}
	let socket = io("https://vivi.matteogassend.com").emit("id", {type:"mobile", id:"1"})
	useEffect(() => {
		axios.get("https://vivi.matteogassend.com/ban/1", {
			headers:{
				Authorization:`Bearer ${localStorage.getItem("jwt")}`
			}
		}).then(res => setConnections(res.data))
		socket.on("connection added", (data) => {
			setConnections(oldConnections => [...oldConnections, {address:data.address, banned:data.banned}])
		})
	}, [id])
	return (
		<MDBContainer fluid>
			<MDBRow className="mt-5 pt-5">
				<MDBCol md="12">
					<MDBCard>
						<MDBCardBody>
							<MDBCardHeader className="form-header rounded deep-blue-gradient">
								History for router {id}
							</MDBCardHeader>
							
							{connections.length === 0 ? <div>
								<MDBRow center className="mb-2">
									This router has no history that we know of...
								</MDBRow>
								<MDBRow center>
									<MDBSpinner big />
								</MDBRow>
							</div> : <MDBTable>
								<MDBTableHead>
									<td>Address</td>
									<td align="right">Status</td>
								</MDBTableHead>
								<MDBTableBody>
									{
										connections.map((e) => (
											<tr key={e._id}>
												<td>{e.address}</td>
												<td align="right">
													<MDBRow>
														<MDBCol md="8">
															<MDBInput  label={e.banned ? "Banned" : "Allowed"} id={`Allow ${e._id}`} checked={e.banned} type="checkbox" onChange={() => {
																handleStatusChange(e.address, !e.banned) 
															}} />
														</MDBCol>
														<MDBCol md="4">
															<MDBBtn  size="lg" color="danger" floating onClick={() => {
																handleRemove(e._id)
															}}>
																<MDBIcon icon="trash" />
															</MDBBtn>
														</MDBCol>
													</MDBRow>
												</td>
											</tr>
										))
									}
								</MDBTableBody>
							</MDBTable>}
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	)
}

export default RouterHistory