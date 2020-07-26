import * as Yup from "yup"

const STATUS_MESSAGES = {
	SUCCESS:"success",
	ERROR:"error"
}

const LoginSchema = Yup.object().shape({
	email: Yup.string().required("Required").email("Must be a valid email address"),
	password: Yup.string().required("Required")
})

const UserSchema = Yup.object().shape({
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

export {STATUS_MESSAGES, LoginSchema, UserSchema}