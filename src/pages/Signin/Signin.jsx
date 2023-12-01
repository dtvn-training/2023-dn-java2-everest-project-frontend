import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Signin.css";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosClient";
import Dashboard from "../Dashboard/Dashboard";
import Account from "../Account/Account";

const LOGIN_URL = "/api/v1/auth/login";

const Signin = () => {
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

  const handleSubmit = async (values) => {
    console.log(values);
    const response = await axios.post(LOGIN_URL, values, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    console.log(response);
    if (response.data.code === 200) {
      const accessToken = response?.data?.access_token;
      const refreshToken = response?.data?.refresh_token;
      setEmail("");
      console.log("accesstoken: " + accessToken);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setPassword("");
      setSuccess(true);
      navigate("/campaign");
    } else if (response.data.code === 400) {
      const errorMessage = response?.data?.message || "Login Failed";
      setErrMsg(errorMessage);
      errRef.current.focus();
    } else {
      setErrMsg("No Server Response");
      errRef.current.focus();
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
              <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                {errMsg}
              </p>
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

export default Signin;
