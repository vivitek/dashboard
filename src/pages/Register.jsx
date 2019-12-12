import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBInput, MDBIcon, MDBBtn } from 'mdbreact'
import PhoneInput from 'react-phone-input-2'
import axios from 'axios'
import 'react-phone-input-2/lib/bootstrap.css'

const Register = () => {
	const history = useHistory()
	const [email, setEmail] = useState("")
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [telephoneNumber, setPhone] = useState("")
	const [password, setPassword] = useState("")

	return (
		<MDBContainer>
			<MDBRow center className="mt-5 pt-5">
				<MDBCol md="6">
					<MDBCard>
						<MDBCardBody>
							<MDBCardHeader className="form-header rounded deep-blue-gradient">
								<h3>Sign Up</h3>
							</MDBCardHeader>
							<div className="grey-text">
								<MDBInput icon="envelope" label="Type your email" type="email" getValue={(e) => setEmail(e)} />
								<MDBInput icon="user" label="Type your first name" getValue={(e) => setFirstName(e)} />
								<MDBInput icon="user" label="Type your last name" getValue={(e) => setLastName(e)} />
								<MDBInput icon="lock" type="password" label="Type your password" getValue={(e) => setPassword(e)} />
								<PhoneInput country="fr" onChange={(e) => setPhone(e)} value={telephoneNumber}  />
							</div>
							<div className="text-center mt-4">
								<MDBBtn color="light-blue" onClick={() => {
									if (email && password && firstName && lastName && telephoneNumber) {
										axios.post("https://vivi.matteogassend.com/auth/register", {
											email, password, firstName, lastName, telephoneNumber
										}).then(res => {
											localStorage.setItem("jwt", res.data.token)
											history.push("/")
										})
									}
								}}>
									Submit
								</MDBBtn>
							</div>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	)
}

export default Register