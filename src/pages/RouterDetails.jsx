import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import io from 'socket.io-client';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBBtn, MDBSpinner } from 'mdbreact';
import ListGroupPage from '../components/ConnexionList';

const RouterDetails = (props) => {
	const [connections, setConnections] = useState([])
	const [services, setServices] = useState([])
	const {id} = useParams()
	let socket = io("http://localhost:5000");
	useEffect(() => {
		socket.emit("id", {id:id, type:"mobile"})
		socket.on("assigned", ({room}) => {
			console.log("connected on room " + room)
		})
		socket.on("connection request", ({address}) => {
			let connection = {address, actions: <div className="align-right">
				<MDBBtn color="success" onClick={() => approveConnection(address, false)}>Approve</MDBBtn>
				<MDBBtn color="danger" onClick={() => approveConnection(address, true)}>Refuse</MDBBtn>
			</div>}
			setConnections(prevConnections => [...prevConnections, connection])
		})
	}, [id])
	const approveConnection = (address, banned) => {
		console.log("removing address " + address + " from " + connections)
		socket.emit("client allow", {address, banned})
		setConnections(oldConnections => oldConnections.filter(e => e.address !== address))
	}
	return (
		<MDBContainer fluid>
			<MDBRow className="mt-5 pt-5">
				<MDBCol size="6">
					<MDBCard>
						<MDBCardBody>
							<MDBCardHeader className="form-header deep-blue-gradient rounded">
								Incoming Connections
							</MDBCardHeader>
							{connections.length > 0 ? <ListGroupPage data={connections} /> : <div>
								<MDBRow center>
									<h4>No connections yet...</h4>
								</MDBRow>
								<MDBRow center>
									<MDBSpinner big />
								</MDBRow>
							</div>}
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
				<MDBCol size="6">
					<MDBCard>
						<MDBCardBody>
							<MDBCardHeader className="form-header deep-orange-gradient rounded">
								Incoming Services
							</MDBCardHeader>
							{services.length === 0 ? <div>
								<MDBRow center>
									<h4>No services tried connecting yet...</h4>
								</MDBRow>
								<MDBRow center>
									<MDBSpinner big green />
								</MDBRow>
							</div> : <div></div>}
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	)
}

export default RouterDetails