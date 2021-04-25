import React from "react";
import "antd/dist/antd.css";
import logo from "../pages/committee.PNG";

const UserGuidecom = () => {
    return (
      <div>
        <div className="mb-2">
            <label
                className="col-xs-10 col-sm-10"
                style={{ fontWeight: "bold", fontSize: "26px", color: "black" }}
            >
                วิธีใช้งานสำหรับกรรมการ
            </label>
        </div>
        <div style={{ justifyContent:"center", display: "flex", }}>
            <img src={logo} alt="userguidecom" style={{ width: "70%" }} />
        </div>
      </div>
    );
  }

export default UserGuidecom;