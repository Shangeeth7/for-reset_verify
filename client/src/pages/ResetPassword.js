import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const resetPassword = async () => {
    try {
      toast.loading();
      const response = await axios.post("/api/user/resetpassword", {
        password,
        token: params.token,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error("Expired or Invalid Link");
      }
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="authentication">
      <div className="authentication-form card p-3 ">
        <h1 className="card-title">Change your Password</h1>
        <br />
        <input
          type="password"
          className="py-1  px-3 border-2 border-secondary focus:outline-none w-full"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br />
        <input
          type="password"
          className="py-1 px-3  border-2 border-secondary focus:outline-none w-full"
          placeholder="confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmpassword}
        />
        <br />

        <div className="flex justify-between items-end">
          {password.length === 6 && password === confirmpassword ? (
            <button
              className="primary-button my-2 full-width-button"
              onClick={resetPassword}
            >
              RESET PASSWORD
            </button>
          ) : (
            "Enter your Passwords"
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
