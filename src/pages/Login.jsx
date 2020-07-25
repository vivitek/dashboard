import React, { useEffect, useState } from 'react'
import Card from 'reactstrap/lib/Card'
import CardBody from 'reactstrap/lib/CardBody'
import { useLocation, Link } from 'react-router-dom'
import errors from '../errors'
import * as qs from "query-string"
import Form from 'reactstrap/lib/Form'
import Button from 'reactstrap/lib/Button'
import UncontrolledAlert from 'reactstrap/lib/UncontrolledAlert'
import {Formik} from "formik"
import FormGroupInput from '../components/FormGroupInput'
import * as Yup from 'yup';
import SweetAlert from 'react-bootstrap-sweetalert';
import { login } from '../utils/api'
import { STATUS_MESSAGES } from '../utils/constants'
import Swal from 'sweetalert2'

const LoginSchema = Yup.object().shape({
	email: Yup.string().required("Required").email("Must be a valid email address"),
	password: Yup.string().required("Required")
})
const Login = () => {
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
							password:""
						}}
						validationSchema={LoginSchema}
						onSubmit={async(values) => {
							const result = await login(values)
							if (result.status === STATUS_MESSAGES.SUCCESS) {
								localStorage.setItem("vivi-jwt", result.data.access_token)
								localStorage.setItem("vivi-user", JSON.stringify(result.data.user))
								Swal.fire("Alright!", `Welcome back ${result.data.user.username}!`, "success")
							} else {
								Swal.fire("Oops!", "Something went wrong", "error")
							}
						}}
					>
					{({errors, touched, values, handleChange, handleSubmit}) => (
						<Form onSubmit={handleSubmit}>
							<FormGroupInput name="email" type="email" label="Email" value={values.email} touched={touched.email} error={errors.email} handleChange={handleChange} />
							<FormGroupInput name="password" type="password" label="Password" value={values.password} touched={touched.password} error={errors.password} handleChange={handleChange} />
							<Button type="submit">Send</Button> or <Link to="/register">Create an account</Link>
						</Form>
					)}
					</Formik>
				</CardBody>
			</Card>
		</div>
	)
}

export default Login