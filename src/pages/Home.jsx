import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MDBTable, MDBTableHead, MDBTableBody, MDBContainer, MDBRow, MDBCol, MDBSpinner, MDBBtn, MDBCard, MDBCardBody, MDBCardHeader } from 'mdbreact'
import RouterModal from '../components/RouterModal'
import {useHistory} from 'react-router-dom'

const Home = () => {
	const [routers, setRouters] = useState([])
	const [loading, setLoading] = useState(false)
	const [modal, setModal] = useState(false)
	const history = useHistory()

	useEffect(() => {
		setLoading(true)
		axios.get("https://vivi.matteogassend.com/router", {
			headers: {
				"Authorization": `Bearer ${localStorage.getItem("jwt")}`
			}
		}).then(res => {
			setRouters(res.data)
			setLoading(false)
		})
	}, [])
	return (
		<MDBContainer>
			<RouterModal open={modal} setOpen={setModal} routers={routers} setRouters={setRouters} />
			<MDBRow className="mt-5 pt-5">
				<MDBCol md="5" className="float-right">
					<MDBBtn color="blue-grey" onClick={() => setModal(!modal)}>
						Add Router
					</MDBBtn>
				</MDBCol>
			</MDBRow>
			{loading && <MDBRow center>
				<MDBCol size="4">
					<MDBSpinner crazy big />
				</MDBCol>
			</MDBRow>}
			{!loading && routers.length === 0 ?
				<h3 className="text-center mt-5 pt-5" style={{ color: "white" }}>No routers found</h3>
				: <MDBRow center className="mt-5 pt-5">
					<MDBCol size="8">
						<MDBCard>
							<MDBCardBody>
								<MDBCardHeader className="form-header deep-blue-gradient rounded">
									Routers
								</MDBCardHeader>
								<MDBTable>
									<MDBTableHead>
										<th>Id</th>
										<th>Name</th>
									</MDBTableHead>
									<MDBTableBody>
										{routers.map((r) => (<tr key={r._id}
											onClick={() => history.push(`/router/1`)}
										>
											<td>{r._id}</td>
											<td>{r.name}</td>
										</tr>))}
									</MDBTableBody>
								</MDBTable>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
				</MDBRow>
			}
		</MDBContainer>
	)
}

export default Home