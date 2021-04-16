import React, { useEffect } from "react";
import Card from "reactstrap/lib/Card";
import CardBody from "reactstrap/lib/CardBody";
import { useHistory } from "react-router-dom";
import Form from "reactstrap/lib/Form";
import Button from "reactstrap/lib/Button";
import { Formik } from "formik";
import FormGroupInput from "../components/FormGroupInput";
import { CHECK_2FA, LOGIN, ME } from "../utils/apollo";
import { LoginSchema } from "../utils/constants";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { UserContext } from "../contexts/UserContext";
import useError from "../hooks/useErrors";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";

const MySwal = withReactContent(Swal);

const Login = () => {
    const history = useHistory();
    const alerts = useError();
    const [login] = useMutation(LOGIN);
    const [getMe, { loading: meLoading, data: meData }] = useLazyQuery(ME);
    const [checkCode] = useMutation(CHECK_2FA);

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

                                        if (!result.data.login.otp_enabled) {
                                            MySwal.fire(
                                                "Alright!",
                                                `Welcome back ${result.data.login.user.username}!`,
                                                "success"
                                            );
                                            context.changeUser(
                                                result.data.login.user
                                            );
                                            history.push("/");
                                        } else {
                                            MySwal.fire(
                                                "Enter 2FA Code",
                                                <div>
                                                    <FormGroupInput
                                                        label="Code"
                                                        name="code"
                                                    />
                                                </div>
                                            );
                                        }
                                    } catch (error) {
                                        MySwal.fire(
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
