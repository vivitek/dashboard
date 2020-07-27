import React from 'react'
import {Row} from 'reactstrap'
import Col from 'reactstrap/lib/Col'
import Card from 'reactstrap/lib/Card'
import CardBody from 'reactstrap/lib/CardBody'
import CardTitle from 'reactstrap/lib/CardTitle'
import Gravatar from 'react-gravatar'
import {Formik} from "formik"
import Form from 'reactstrap/lib/Form'
import FormGroupInput from '../components/FormGroupInput'
import {  STATUS_MESSAGES } from '../utils/constants'
import Button from 'reactstrap/lib/Button'
import { updateUser } from '../utils/api'
import Swal from 'sweetalert2'
import * as Yup from "yup"
import {UserContext} from '../contexts/UserContext'

const UpdateSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email address").required("Required"),
	username: Yup.string().required("Required").min(2, "Too short").max(50, "Too long")
})
const Profile = () => {

	return (
		<UserContext.Consumer>
			{(context) => <Row>
				<Col lg="8" md="6" sm="12">
					<Card>
						<CardBody>
							<CardTitle>Edit Profile</CardTitle>
							{console.log(context)}

							<Formik
								initialValues={{
									email: context.user.email,
									username: context.user.username
								}}
								validationSchema={UpdateSchema}
								onSubmit={async(values) => {
									const res = await updateUser(values, context.user._id)
									if (res.status === STATUS_MESSAGES.SUCCESS) {
										Swal.fire("OK", res.message, "success")
										context.changeUser(res.data)
									} else {
										Swal.fire("FAIL", res.message, "error")
									}
								}}
							>
								{({errors, values, handleSubmit, handleChange, touched}) => (
									<Form onSubmit={handleSubmit}>
										<FormGroupInput name="email" label="Email" type="email" value={values.email} error={errors.email} touched={touched.email} handleChange={handleChange} />
										<FormGroupInput name="username" label="Username" value={values.username} error={errors.username} touched={touched.email} handleChange={handleChange} />
										<Button type="submit">Update</Button>
									</Form>
								)}
							</Formik>
						</CardBody>
					</Card>
				</Col>
				<Col lg="4" md="6" sm="12">
					<Card>
						<CardBody>
							<Row>
								<Col align="center" xs="12">
									<Gravatar email={context.user.email} style={{borderRadius:"100%"}} size={100} />
								</Col>
								<Col align="center" xs="12" className="mt-4">
									{context.user.username}
								</Col>
								<Col align="center" xs="12" className="mt-3">
									{context.user.email}
								</Col>
							</Row>
						</CardBody>
					</Card>
				</Col>
			</Row>}
		</UserContext.Consumer>
	)
}

export default Profile