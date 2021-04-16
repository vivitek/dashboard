import React, { useContext } from "react";
import {
    Row,
    Col,
    Form,
    Card,
    CardBody,
    CardTitle,
    Button,
    FormGroup,
    Input,
    Label,
    CustomInput,
} from "reactstrap";
import Gravatar from "react-gravatar";
import { Formik, useFormik } from "formik";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import * as Yup from "yup";
import FormGroupInput from "../components/FormGroupInput";
import { UserContext } from "../contexts/UserContext";
import GraphqlError from "../components/GraphqlError";
import {
    ME,
    UPDATE_USER,
    GET_OTP_URL,
    CHECK_2FA,
    TOGGLE_2FA,
} from "../utils/apollo";
import QrCode from "qrcode.react";

const UpdateSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    username: Yup.string()
        .required("Required")
        .min(2, "Too short")
        .max(50, "Too long"),
});

const Profile = () => {
    const { loading, data, error, refetch: refetchMe } = useQuery(ME);
    const { data: url_data } = useQuery(GET_OTP_URL);
    const [updateUser] = useMutation(UPDATE_USER);
    const [checkToken] = useMutation(CHECK_2FA);
    const [toggleOtp] = useMutation(TOGGLE_2FA);
    const [me, setMe] = useState({});
    const [otpUrl, setOtpUrl] = useState("");
    const userContext = useContext(UserContext);
    const profileForm = useFormik({
        initialValues: {
            email: "",
            username: "",
            _id: userContext.user._id,
        },
        validationSchema: UpdateSchema,
        onSubmit: async (values) => {
            const res = await updateUser({
                variables: {
                    userUpdateInput: {
                        ...values,
                        _id: userContext.user._id,
                    },
                },
            });
            Swal.fire("OK", res.message, "success");
            refetchMe();
        },
    });

    useEffect(() => {
        if (data?.me) {
            console.log(data.me);
            setMe(data.me);
            userContext.changeUser(data.me);
            profileForm.setFieldValue("email", data.me.email);
            profileForm.setFieldValue("username", data.me.username);
        }
        // eslint-disable-next-line
    }, [data]);

    useEffect(() => {
        if (url_data) {
            setOtpUrl(url_data.getOtpUrl);
        }
    }, [url_data]);

    if (loading) {
        return <Row style={{ height: "100%" }}>loading...</Row>;
    }
    if (error) {
        return (
            <Row>
                <GraphqlError error={error} />
            </Row>
        );
    }
    return (
        <Row>
            <Col lg="8" md="6" sm="12">
                <Card>
                    <CardBody>
                        <CardTitle>Edit {me.username} </CardTitle>
                        <Row>
                            <Col sm="12" md="6">
                                <h5>Edit Profile</h5>
                                <Form onSubmit={profileForm.handleSubmit}>
                                    <FormGroupInput
                                        name="email"
                                        label="Email"
                                        type="email"
                                        value={profileForm.values.email}
                                        error={profileForm.errors.email}
                                        touched={profileForm.touched.email}
                                        handleChange={profileForm.handleChange}
                                    />
                                    <FormGroupInput
                                        name="username"
                                        label="Username"
                                        value={profileForm.values.username}
                                        error={profileForm.errors.username}
                                        touched={profileForm.touched.email}
                                        handleChange={profileForm.handleChange}
                                    />
                                    <Button type="submit">Update</Button>
                                </Form>
                            </Col>
                            <Col sm="12" md="6">
                                <h5>Session Preferences</h5>
                                <CustomInput
                                    id="toggleOtp"
                                    type="switch"
                                    name="toggleOtp"
                                    label="Activate 2FA"
                                    checked={me.otp_enabled}
                                    onChange={async () => {
                                        await toggleOtp();
                                        await refetchMe();
                                    }}
                                />

                                {me.otp_enabled && (
                                    <Row className="mt-5">
                                        <Col align="center">
                                            <h5>Scan this qrcode</h5>
                                            <QrCode value={otpUrl} />
                                            <h5>
                                                Or enter this code manually:{" "}
                                                {me.otp_secret}
                                            </h5>
                                            <p>
                                                Once you added our service to an
                                                Authenticator, test it below
                                            </p>
                                            <Formik
                                                initialValues={{
                                                    code: "",
                                                }}
                                                onSubmit={async (values) => {
                                                    const res = await checkToken(
                                                        {
                                                            variables: {
                                                                code:
                                                                    values.code,
                                                            },
                                                        }
                                                    );
                                                    console.log(res.data);
                                                    if (res.data.checkOtpCode) {
                                                        Swal.fire(
                                                            "Alright!",
                                                            "The code you entered is correct",
                                                            "success"
                                                        );
                                                    } else {
                                                        Swal.fire(
                                                            "Oops!",
                                                            "The code you entered appears to be incorrect",
                                                            "error"
                                                        );
                                                    }
                                                }}
                                            >
                                                {({
                                                    errors,
                                                    values,
                                                    touched,
                                                    handleSubmit,
                                                    handleChange,
                                                }) => (
                                                    <Form
                                                        onSubmit={handleSubmit}
                                                    >
                                                        <FormGroupInput
                                                            value={values.code}
                                                            error={errors.code}
                                                            touched={
                                                                touched.code
                                                            }
                                                            handleChange={
                                                                handleChange
                                                            }
                                                            name="code"
                                                            label="Code"
                                                        />
                                                        <Button type="submit">
                                                            Check
                                                        </Button>
                                                    </Form>
                                                )}
                                            </Formik>
                                        </Col>
                                    </Row>
                                )}
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col lg="4" md="6" sm="12">
                <Card>
                    <CardBody>
                        <Row>
                            <Col align="center" xs="12">
                                <Gravatar
                                    email={me.email}
                                    style={{ borderRadius: "100%" }}
                                    size={100}
                                />
                            </Col>
                            <Col align="center" xs="12" className="mt-4">
                                <h2>{me.username}</h2>
                            </Col>
                            <Col align="center" xs="12" className="mt-3">
                                <h3>{me.email}</h3>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default Profile;
