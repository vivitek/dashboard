import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import { MDBRow, MDBCol, MDBContainer, MDBCard, MDBCardBody, MDBCardHeader, MDBInput, MDBBtn } from 'mdbreact'
import axios from 'axios'

const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const history = useHistory()

	return (
		<MDBContainer>
			<MDBRow center className="mt-5 pt-5">
				<MDBCol md="6" xs="8" sm="10">
					<MDBCard>
						<MDBCardBody>
							<MDBCardHeader className="form-header deep-blue-gradient rounded"><h3>Sign In</h3></MDBCardHeader>
							<div className="grey-text">
								<MDBInput label="Type your email"
								icon="envelope"
								getValue={(value) => setEmail(value)} 
								type="email"/>
								<MDBInput label="Type your password"
								icon="lock"
								getValue={(value) => setPassword(value)}
	
								type="password" />
							</div>
							<div className="text-center mt-4">
								<MDBBtn
								color="light-blue"
								className="mt-3"
								onClick={() => {
									if (email && password) {
										axios.post("https://vivi.matteogassend.com/auth/login", {
											email,
											password
										}).then(res => {
											localStorage.setItem("jwt", res.data.token)
											history.push("/")
										})
									}
								}}>
									Sign In
								</MDBBtn>
							</div>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	)
}

export default Login