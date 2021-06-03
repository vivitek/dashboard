import * as Yup from "yup";

const BASE_URL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://api.server.vincipit.com";

const BASE_WS = BASE_URL.replace(/^http/, "ws");

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Required")
    .email("Must be a valid email address"),
  password: Yup.string().required("Required"),
});

const noFooterHeader = ["/login"];

export { LoginSchema, BASE_URL, BASE_WS, noFooterHeader };
