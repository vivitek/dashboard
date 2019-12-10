import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import io from 'socket.io-client';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBBtn } from 'mdbreact';
import ListGroupPage from '../components/ConnexionList';

const RouterDetails = (props) => {
	const [connections, setConnections] = useState([])
	const {id} = useParams()
	let socket = io("http://localhost:5000");
	useEffect(() => {
		socket.emit("id", {id:id, type:"mobile"})
		socket.on("assigned", ({room}) => {
			console.log("connected on room " + room)
		})
		socket.on("connection request", ({address}) => {
			let lastConnection = connections
			lastConnection.push({address, actions: <MDBRow>
				<MDBBtn color="success" onClick={() => approveConnection(address, false)}>Approve</MDBBtn>
				<MDBBtn color="danger" onClick={() => approveConnection(address, true)}>Refuse</MDBBtn>
			</MDBRow>})
			setConnections([...lastConnection])
		})
	}, [id])
	const approveConnection = (address, banned) => {
		socket.emit("client allow", {address, banned})
		let oldConnections = connections.filter(a => a.address !== address)
		setConnections([...oldConnections])
	}
	return (
		<MDBContainer>
			<MDBRow className="mt-5 pt-5">
				<MDBCol size="6">
					<MDBCard>
						<MDBCardBody>
							<MDBCardHeader className="form-header deep-blue-gradient rounded">
								Incoming Connections
							</MDBCardHeader>
							{connections.length > 0 ? <ListGroupPage data={connections} /> : <h4>No connections yet...</h4>}
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
				<MDBCol size="6">
					<MDBCard>
						<MDBCardBody>
							<MDBCardHeader className="form-header deep-orange-gradient rounded">
								Incoming Services
							</MDBCardHeader>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	)
}

export default RouterDetails