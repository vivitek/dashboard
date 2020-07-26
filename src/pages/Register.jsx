import React, { useEffect, useState } from 'react'
import Card from 'reactstrap/lib/Card'
import CardBody from 'reactstrap/lib/CardBody'
import { useLocation, Link, useHistory } from 'react-router-dom'
import errors from '../errors'
import * as qs from "query-string"
import Form from 'reactstrap/lib/Form'
import Button from 'reactstrap/lib/Button'
import { Formik } from 'formik';
import UncontrolledAlert from 'reactstrap/lib/UncontrolledAlert'
import FormGroupInput from '../components/FormGroupInput'
import { register } from '../utils/api'
import Swal from "sweetalert2"
import {STATUS_MESSAGES, UserSchema} from '../utils/constants'
import { UserContext } from '../contexts/UserContext'


const Register = () => {
	const location = useLocation()
	const history = useHistory()
	const [shownAlerts, setShownAlerts] = useState([])
	useEffect(() => {
		const query = qs.parse(location.search)
		if (query["error"]) {
			setShownAlerts([
				<UncontrolledAlert key={query.error} color="danger">{errors[query["error"]]}</UncontrolledAlert>
			])
		}
	}, [location])

	return (
		<div>
			{shownAlerts}
			<Card>
				<CardBody>
				<UserContext.Consumer>
					{(context) => (
						<Formik
							initialValues={{
								email:"",
								username:"",
								password:"",
								confirmPassword:""
							}}
							validationSchema={UserSchema}
							onSubmit={async values => {
								const {confirmPassword, ...data} = values
								const result = await register(data)
								if (result.status === STATUS_MESSAGES.SUCCESS) {
										localStorage.setItem("vivi-jwt", result.data.access_token)
										localStorage.setItem("vivi-user", JSON.stringify(result.data.user))
										Swal.fire("Alright!", `Welcome ${result.data.user.username}!`, "success")
										context.changeUser(result.data.user)
										history.push("/")
									} else {
										Swal.fire("Oops!", "Something went wrong", "error")
									}
							}}
						>
							{({errors, touched, values, handleChange, handleSubmit}) => (

								<Form onSubmit={handleSubmit}>
									<FormGroupInput name="email" label="Email" type="email" handleChange={handleChange} value={values.email} error={errors.email} touched={touched.email} />
									<FormGroupInput name="username" label="Username" type="text" handleChange={handleChange} value={values.username} error={errors.username} touched={touched.username} />
									<FormGroupInput name="password" label="Password" type="password" handleChange={handleChange} value={values.password} error={errors.password} touched={touched.password} />
									<FormGroupInput name="confirmPassword" label="Confirm Password" type="password" handleChange={handleChange} value={values.confirmPassword} error={errors.confirmPassword} touched={touched.confirmPassword} />
									<Button type="submit">Send</Button> or <Link to="/login">Sign In</Link>
								</Form>
							)
							}
						</Formik>
					)}
				</UserContext.Consumer>
				</CardBody>
			</Card>
		</div>
	)
}

export default Register