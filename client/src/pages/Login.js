import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function Login() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/login", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };
  const sendResetPasswordLink = async () => {
    try {
      toast.loading("");
      const response = await axios.post("/api/user/send-password-reset-link", {
        email,
      });
      toast.dismiss();
      if (response.data.success) {
        toast.success(response.data.message);
        setShowForgotPassword(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="authentication">
      {!showForgotPassword && (
        <div className="authentication-form card p-3">
          <h1 className="card-title">Welcome Back</h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Email" name="email">
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input placeholder="Password" type="password" />
            </Form.Item>

            <Button
              className="primary-button my-2 full-width-button"
              htmlType="submit"
            >
              LOGIN
            </Button>

            <Link to="/register" className="anchor mt-2">
              CLICK HERE TO REGISTER
            </Link>
          </Form>
          <h6
            className="cursor-pointer underline "
            onClick={() => setShowForgotPassword(true)}
          >
            Forgot Password
          </h6>
        </div>
      )}

      {showForgotPassword && (
        <div className="authentication-form card p-3 ">
          <h1 className="card-title">Change your Password</h1>
          <br />
          <input
            type="text"
            className="py-1  px-3 border-2 border-secondary focus:outline-none w-full"
            placeholder="e-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <div className="flex justify-between items-end">
            <button
              className="primary-button my-2 full-width-button"
              onClick={sendResetPasswordLink}
            >
              Send Re-set password link
            </button>
          </div>
          <h6
            onClick={() => setShowForgotPassword(false)}
            className="cursor-pointer underline "
          >
            Click Here To Login
          </h6>
        </div>
      )}
    </div>
  );
}

export default Login;
