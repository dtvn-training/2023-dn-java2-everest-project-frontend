import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Signin.css";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { Dashboard } from "../Dashboard/Dashboard";

const LOGIN_URL = "/api/v1/auth/authenticate";

export const Signin = () => {
  // const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  function getLocalAccessToken() {
    const accessToken = window.localStorage.getItem("accessToken");
    return accessToken;
  }

  function getLocalRefreshToken() {
    const refreshToken = window.localStorage.getItem("refreshToken");
    return refreshToken;
  }
  const instance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const handleSubmit = async (values) => {
    try {
      console.log(values);
      const response = await axios.post(LOGIN_URL, values, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response);
      console.log(JSON.stringify(response?.data));

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setEmail("");
      console.log("accesstoken: " + accessToken);
      setPassword("");
      setSuccess(true);
      navigate("/dashboard"); // Chuyển hướng đến trang Dashboard sau khi đăng nhập thành công
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
      console.error(err);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <Dashboard />
        </section>
      ) : (
        <div className="container">
          <div className="form-container">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-title">WELCOME</div>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  ref={userRef}
                  autoComplete="off"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  required
                />
                {formik.touched.email && formik.errors.email ? <p>{formik.errors.email}</p> : null}
              </div>

              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  required
                />
                {formik.touched.password && formik.errors.password ? <p>{formik.errors.password}</p> : null}
              </div>

              <div className="login-butons">
                <button type="submit">Sign In</button>
                <div className="login-social">
                  <button className="fb-login">Facebook</button>
                  <button className="google-login">Google</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

// <section>
// <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
//   {errMsg}
// </p>
// <h1>Sign In</h1>
// <form onSubmit={formik.handleSubmit}>
//   <label htmlFor="username">Username:</label>
//   <input
//     type="email"
//     id="email"
//     ref={userRef}
//     autoComplete="off"
//     onChange={formik.handleChange}
//     onBlur={formik.handleBlur}
//     value={formik.values.email}
//     required
//   />
//   {formik.touched.email && formik.errors.email ? <p>{formik.errors.email}</p> : null}

//   <label htmlFor="password">Password:</label>
//   <input
//     type="password"
//     id="password"
//     onChange={formik.handleChange}
//     onBlur={formik.handleBlur}
//     value={formik.values.password}
//     required
//   />
//   {formik.touched.password && formik.errors.password ? <p>{formik.errors.password}</p> : null}
//   <button type="submit">Sign In</button>
// </form>
// </section>
