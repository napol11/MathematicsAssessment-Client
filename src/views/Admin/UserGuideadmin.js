import React from "react";
import "antd/dist/antd.css";
import logo from "../pages/admin.PNG";

const UserGuideadmin = () => {
    return (
      <div>
        <div className="mb-2">
            <label
                className="col-xs-10 col-sm-10"
                style={{ fontWeight: "bold", fontSize: "26px", color: "black" }}
            >
                วิธีใช้งานสำหรับผู้ดูแลระบบ
            </label>
        </div>
        <div style={{ justifyContent:"center", display: "flex", }}>
            <img src={logo} alt="userguideadmin" style={{ width: "80%" }} />
        </div>
      </div>
    );
  }

export default UserGuideadmin;