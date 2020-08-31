import React, { useState, useEffect, useContext } from 'react'
import { RouterContext } from '../contexts/RouterContext'
import { useHistory } from 'react-router-dom'
import { Col, Button, Table, Card, CardBody, CardTitle, Row } from 'reactstrap'
import { getOldConnections, listenToConnections } from '../utils/api'

const Connections = () => {
	const [oldConnections, setOldConnections] = useState([])
	const [newConnections, setNewConnections] = useState([])
	const router = useContext(RouterContext)
	const history = useHistory()

	const removeConnection = (id) => {
		const c = newConnections.map((d) => d.id !== id)
		setNewConnections(c)
	}
	const removeOldConnection = (id) => {
		const c = oldConnections.map((d) => d.id !== id)
		setOldConnections(c)
	}

	const getOldData = async() => {
		const oldConnections = await getOldConnections(router.router.id)
		const oldConnectionsWithButtons = oldConnections.data.map((a) => (
			{...a, actions: [
				<Button className="btn-round" size="sm" color="success" onClick={() => {
					removeOldConnection(a.id)
				}}>OK</Button>,
				<Button className="btn-round" size="sm" color="danger" onClick={() => {
					removeOldConnection(a.id)
				}}>Nope</Button>
			]}
		))
		setOldConnections(oldConnectionsWithButtons)
	}


	useEffect(() => {
		if (router.router["id"] === undefined) {
			history.push("/routers?error=router")
			return () => {}
		} else {
			getOldData()
			const ev = new EventSource(listenToConnections(router.router.id))
			ev.onmessage = (msg) => {
				
				console.log("received msg", msg.data)
				let data = JSON.parse(msg.data)
				setNewConnections(old => [...old, {...data, actions: [
					<Button className="btn-round" size="sm" color="success" onClick={() => {removeConnection(data.id)}}>OK</Button>,
					<Button className="btn-round" size="sm" color="danger" onClick={() => {removeConnection(data.id)}}>Nope</Button>
				]}])
			}
			return () => {
				ev.close()
			}
		}
	}, [])
	return (
			<div>
				<Row>
					<Col md="6" sm="12">
						<Card>
							<CardBody>
								<CardTitle>Untreated Connections</CardTitle>
								<Table>
									<thead>
										<tr>
											<th className="text-center">#</th>
											<th>Address</th>
											<th>Received At</th>
											<th className="text-right">Actions</th>
										</tr>
									</thead>
									<tbody>
										{oldConnections.map((o) => (
											<tr key={o.id}>
												<td className="text-center">{o.id}</td>
												<td>{o.address}</td>
												<td>{o.createdAt}</td>
												<td className="text-right">
													{o.actions}
												</td>
											</tr>
										))}
									</tbody>
								</Table>
							</CardBody>
						</Card>
					</Col>
					<Col md="6" sm="12">
					<Card>
							<CardBody>
								<CardTitle>Incoming Connections</CardTitle>
								<Table>
									<thead>
										<tr>
											<th className="text-center">#</th>
											<th>Address</th>
											<th>Received At</th>
											<th className="text-right">Actions</th>
										</tr>
									</thead>
									<tbody>
										{newConnections.map((o) => (
											<tr key={o.id}>
												<td className="text-center">{o.id}</td>
												<td>{o.address}</td>
												<td>{o.createdAt}</td>
												<td className="text-right">
													{o.actions}
												</td>
											</tr>
										))}
									</tbody>
								</Table>
							</CardBody>
						</Card>					
					</Col>
				</Row>
			</div>
	)
}

export default Connections