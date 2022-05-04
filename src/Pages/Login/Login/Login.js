import axios from "axios";
import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import auth from "../../../firebase.init";
import Loading from "../../Shared/Loading/Loading";
import PageTitle from "../../Shared/PageTitle/PageTitle";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

  let errorElement;
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const emailRef = useRef("");
  const passwordRef = useRef("");

  if (loading || sending) {
    return <Loading />;
  }

  if (error) {
    errorElement = <p className="text-danger">Error: {error?.message}</p>;
  }

  if (user) {
    // navigate(from, { replace: true });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    await signInWithEmailAndPassword(email, password);
    const { data } = await axios.post("http://localhost:5000/login", { email });
    localStorage.setItem("accessToken", data.accessToken);
    navigate(from, { replace: true });
  };

  const navigateRegister = (event) => {
    navigate("/register");
  };

  const resetPassword = async () => {
    const email = emailRef.current.value;
    if (email) {
      await sendPasswordResetEmail(email);
      toast("Sent Email");
    } else {
      toast("Please enter your email address");
    }
  };

  return (
    <div className="container w-50 mx-auto">
      <PageTitle title={"Login"}></PageTitle>
      <h2 className="text-primary text-center mt-2">Please Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            ref={emailRef}
            type="email"
            autoComplete="off"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            ref={passwordRef}
            type="password"
            autoComplete="off"
            placeholder="Password"
            required
          />
        </Form.Group>
        {errorElement}
        <Button variant="primary w-50 mx-auto d-block mb-2" type="submit">
          Login
        </Button>
      </Form>
      <p>
        New to Genius Car?{" "}
        <Link
          to={"/register"}
          className="text-danger pe-auto text-decoration-none"
          onClick={navigateRegister}
        >
          Please Register
        </Link>
      </p>
      <p>
        Forgot Password?
        <button
          className="btn btn-link text-primary pe-auto text-decoration-none"
          onClick={resetPassword}
        >
          Reset Password
        </button>
      </p>
      <SocialLogin />
    </div>
  );
};

export default Login;