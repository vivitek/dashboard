import React, { useEffect, useState } from 'react'
import Card from 'reactstrap/lib/Card'
import CardBody from 'reactstrap/lib/CardBody'
import { useLocation, Link } from 'react-router-dom'
import errors from '../errors'
import * as qs from "query-string"
import Form from 'reactstrap/lib/Form'
import Button from 'reactstrap/lib/Button'
import { Formik } from 'formik';
import * as Yup from 'yup';
import UncontrolledAlert from 'reactstrap/lib/UncontrolledAlert'
import FormGroupInput from '../components/FormGroupInput'
import { register } from '../utils/api'
import Swal from "sweetalert2"
import {STATUS_MESSAGES} from '../utils/constants'
const signUpSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email address").required("Required"),
	username: Yup.string().required("Required").min(2, "Too short").max(50, "Too long"),
	password: Yup.string().required("Required").matches(
		/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
		"Password must contain at least 8 characters, one uppercase, one number and one special case character"
	),
	confirmPassword: Yup.string().required("Required").when("password", {
		is: password => (password && password.length > 0 ? true : false),
		then: Yup.string().oneOf([Yup.ref("password")], "Password doesn't match")
	})

})

const Register = () => {
	const location = useLocation()
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
				<Formik
					initialValues={{
						email:"",
						username:"",
						password:"",
						confirmPassword:""
					}}
					validationSchema={signUpSchema}
					onSubmit={async values => {
						const {confirmPassword, ...data} = values
						const result = await register(data)
						if (result.status === STATUS_MESSAGES.SUCCESS) {
								localStorage.setItem("vivi-jwt", result.data.access_token)
								localStorage.setItem("vivi-user", JSON.stringify(result.data.user))
								Swal.fire("Alright!", `Welcome ${result.data.user.username}!`, "success")
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
				</CardBody>
			</Card>
		</div>
	)
}

export default Register