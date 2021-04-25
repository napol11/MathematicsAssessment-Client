import React from "react";
import "antd/dist/antd.css";
import logo from "../pages/employee.PNG";

const UserGuideem = () => {
    return (
      <div>
        <div className="mb-3">
            <label
                className="col-xs-10 col-sm-10"
                style={{ fontWeight: "bold", fontSize: "26px", color: "black" }}
            >
                วิธีใช้งานสำหรับพนักงาน
            </label>
        </div>
        <div style={{ justifyContent:"center", display: "flex", }}>
            <img src={logo} alt="userguideem" style={{ width: "80%" }} />
        </div>
      </div>
    );
  }

export default UserGuideem;