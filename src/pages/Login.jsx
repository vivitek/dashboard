import React from "react";
import Card from "reactstrap/lib/Card";
import CardBody from "reactstrap/lib/CardBody";
import { useHistory } from "react-router-dom";
import Form from "reactstrap/lib/Form";
import Button from "reactstrap/lib/Button";
import { Formik } from "formik";
import FormGroupInput from "../components/FormGroupInput";
import { LOGIN } from "../utils/apollo";
import { LoginSchema } from "../utils/constants";
import Swal from "sweetalert2";
import { UserContext } from "../contexts/UserContext";
import useError from "../hooks/useErrors";
import { useMutation } from "@apollo/client";

const Login = () => {
    const history = useHistory();
    const alerts = useError();
    const [login] = useMutation(LOGIN);
    return (
        <div>
            {alerts}
            <Card>
                <CardBody>
                    <UserContext.Consumer>
                        {(context) => (
                            <Formik
                                initialValues={{
                                    email: "",
                                    password: "",
                                }}
                                validationSchema={LoginSchema}
                                onSubmit={async (values) => {
                                    try {
                                        const result = await login({
                                            variables: {
                                                loginData: values,
                                            },
                                        });
                                        console.log(result);
                                        localStorage.setItem(
                                            "vivi-jwt",
                                            result.data.login.access_token
                                        );
                                        localStorage.setItem(
                                            "vivi-user",
                                            JSON.stringify(
                                                result.data.login.user
                                            )
                                        );
                                        Swal.fire(
                                            "Alright!",
                                            `Welcome back ${result.data.login.user.username}!`,
                                            "success"
                                        );
                                        context.changeUser(
                                            result.data.login.user
                                        );
                                        history.push("/");
                                    } catch (error) {
                                        Swal.fire(
                                            "Something went wrong",
                                            "Could not authenticate with provided details",
                                            "error"
                                        );
                                    }
                                }}
                            >
                                {({
                                    errors,
                                    touched,
                                    values,
                                    handleChange,
                                    handleSubmit,
                                }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <FormGroupInput
                                            name="email"
                                            type="email"
                                            label="Email"
                                            value={values.email}
                                            touched={touched.email}
                                            error={errors.email}
                                            handleChange={handleChange}
                                        />
                                        <FormGroupInput
                                            name="password"
                                            type="password"
                                            label="Password"
                                            value={values.password}
                                            touched={touched.password}
                                            error={errors.password}
                                            handleChange={handleChange}
                                        />
                                        <Button type="submit">Send</Button>
                                    </Form>
                                )}
                            </Formik>
                        )}
                    </UserContext.Consumer>
                </CardBody>
            </Card>
        </div>
    );
};

export default Login;
