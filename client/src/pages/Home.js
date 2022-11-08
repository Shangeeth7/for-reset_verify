import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import "../layout.css";

import { useSelector } from "react-redux";

function Home() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  return (
    <div className="main">
      Name : {user?.name}
      <br />
      Email : {user?.email}
      <div className="buttonss">
        <Button
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
          type="primary"
        >
          <Link to="/login">Logout</Link>
        </Button>
      </div>
    </div>
  );
}

export default Home;
