import React from 'react'
import FormGroup from 'reactstrap/lib/FormGroup'
import Label from 'reactstrap/lib/Label'
import Input from 'reactstrap/lib/Input'

const FormGroupInput = ({name, label, type, value, touched, error, handleChange}) => (
	<FormGroup className={touched && error ? "has-danger" : ""}>
		<Label for={name}>{label}</Label>
		<Input value={value} onChange={handleChange} type={type} id={name} />
		{error && <span className="form-error-message">{error}</span>}
	</FormGroup>
)

export default FormGroupInput