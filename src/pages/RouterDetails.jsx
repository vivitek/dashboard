import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import io from 'socket.io-client';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBBtn, MDBSpinner, MDBIcon } from 'mdbreact';
import ListGroupPage from '../components/ConnexionList';
import ServiceList from '../components/ServiceList';

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
		socket.on("service request", ({name}) => {
			let service = {name, actions: <div>
				<MDBBtn color="success" onClick={() => approvePacket(name, false)}>
					Approve
				</MDBBtn>
				<MDBBtn color="danger" onClick={() => approvePacket(name, true)}>
					Refuse
				</MDBBtn>
			</div>}
			setServices(prevServ => [...prevServ, service])
		})
	}, [id])
	const approvePacket = (name, banned) => {
		setServices(oldServices => oldServices.filter(e => e.name != name))
		socket.emit("packet allow", {name, banned});
	}
	const approveConnection = (address, banned) => {
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
							</div> : <ServiceList data={services} />}
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
			</MDBRow>
			<MDBRow bottom className="mt-5 pt-5">
				<MDBCol size="12">
					<MDBBtn size="lg" floating gradient="peach" className="float-right">
								<MDBIcon icon="cog" />
					</MDBBtn>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	)
}

export default RouterDetails