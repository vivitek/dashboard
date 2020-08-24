import React from 'react'
import Card from 'reactstrap/lib/Card'
import CardBody from 'reactstrap/lib/CardBody'
import { Link, useHistory } from 'react-router-dom'
import Form from 'reactstrap/lib/Form'
import Button from 'reactstrap/lib/Button'
import {Formik} from "formik"
import FormGroupInput from '../components/FormGroupInput'
import { login } from '../utils/api'
import { STATUS_MESSAGES, LoginSchema } from '../utils/constants'
import Swal from 'sweetalert2'
import { UserContext } from '../contexts/UserContext'
import useError from '../hooks/useErrors'

const Login = () => {
	const history = useHistory()
	const alerts = useError()
	return (
		<div>
			{alerts}
			<Card>
				<CardBody>
				<UserContext.Consumer>
					{(context) => (

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
									context.changeUser(result.data.user)
									history.push("/")
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
					)}
				</UserContext.Consumer>
				</CardBody>
			</Card>
		</div>
	)
}

export default Login