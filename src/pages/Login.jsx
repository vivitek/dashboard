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
						onSubmit={(values) => {
							console.log(values)
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