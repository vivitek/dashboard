import React, {useState} from 'react'
import {MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBInput, MDBBtn} from 'mdbreact'
import axios from 'axios'
const RouterModal = ({open, setOpen, routers, setRouters}) => {
	const [name, setName] = useState("")
	return (
		<MDBModal isOpen={open} toggle={() => setOpen(!open)}>
			<MDBModalHeader toggle={() => setOpen(!open)}>
				Add Router
			</MDBModalHeader>
			<MDBModalBody>
				<MDBInput getValue={(value) => setName(value)} label="Identify your router" />
			</MDBModalBody>
			<MDBModalFooter>
				<MDBBtn color="primary" onClick={() => {
					axios.post("https://vivi.matteogassend.com/router", {name:name, url:" "}, {
						headers:{
							"Authorization":`Bearer ${localStorage.getItem("jwt")}`
						}
					}).then(res => {
						setRouters([...routers, res.data])
						setOpen(!open)
					})
				}}>Submit</MDBBtn>
				<MDBBtn color="danger" onClick={() => setOpen(!open)}>Close</MDBBtn>
			</MDBModalFooter>
		</MDBModal>
	)
}

export default RouterModal