import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
// import { date2Thai } from "../CustomFunction";
// import moment from "moment";
// import { useHistory } from "react-router-dom";
// import { Row, Col, Form, Input, InputNumber } from "antd";

// import "./App.css";

import "./employee.css";
import { date2Thai } from "../CustomFunction";
import axios from "axios";
const url = `http://localhost:3001/api/employee`;
// const data = props.data;
// const history = useHistory();

function UserProfile() {
  const [data, setData] = useState({
    name: null,
    position: null,
    number: null,
    level: null,
    group: null,
    start: null,
    times: null,
  });
  const LoadData = () => {
    const id_employee = 1;
    axios.get(`${url}/employee/` + id_employee).then((res) => {
      const startWork = date2Thai(res.data.data.employee_start);
      const start = new Date(res.data.data.employee_start);
      const data = new Date();
      const timeYear = data.getFullYear() - start.getFullYear();
      setData({
        name:
          res.data.data.employee_firstname +
          " " +
          res.data.data.employee_lastname,
        position: res.data.data.employee_position,
        number: res.data.data.employee_number,
        level: res.data.data.employee_degree,
        group: res.data.data.employee_group,
        start: startWork,
        times: timeYear + "   ปี",
      });
    });
  };

  useEffect(() => {
    LoadData();
  }, []);
  return (
    <div style={{ marginTop: "2%" }}>
      <label style={{ fontWeight: "bold", fontSize: "24px", color: "black" }}>
        {`ส่วนที่ 1 ข้อมูลทั่วไปเกี่ยวกับพนักงาน`}
      </label>
      <div
        style={{
          padding: "14px",
          borderRadius: "4px",
          backgroundColor: "rgba(79, 78, 78, 0.04)",
        }}
      >
        <div>
          <div className="row no-gutter">
            <div className="col-sm-12">
              <label
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  color: "black",
                }}
              >
                {`ข้อมูลทั่วไป`}
              </label>
            </div>
          </div>
          <br />
          <div className="row no-gutter pl-4 pr-4">
            <div className="col-sm-3">
              <label
                className="m-0"
                style={{ color: "#5f5f5f", fontSize: "14px" }}
              >
                ชื่อ-สกุล
              </label>
              <br />
              <label
                className="m-0"
                style={{ color: "black", fontSize: "16px" }}
              >
                {data.name}
              </label>
            </div>
            <div className="col-sm-2">
              <label
                className="m-0"
                style={{ color: "#5f5f5f", fontSize: "14px" }}
              >
                ตำแหน่ง
              </label>
              <br />
              <label
                className="m-0"
                style={{ color: "black", fontSize: "16px" }}
              >
                {data.position}
              </label>
            </div>
            <div className="col-sm-2">
              <label
                className="m-0"
                style={{ color: "#5f5f5f", fontSize: "14px" }}
              >
                เลขที่
              </label>
              <br />
              <label
                className="m-0"
                style={{ color: "black", fontSize: "16px" }}
              >
                {data.number}
              </label>
            </div>
            <div className="col-sm-2">
              <label
                className="m-0"
                style={{ color: "#5f5f5f", fontSize: "14px" }}
              >
                ระดับ
              </label>
              <br />
              <label
                className="m-0"
                style={{ color: "black", fontSize: "16px" }}
              >
                {data.level}
              </label>
            </div>
            <div className="col-sm-3">
              <label
                className="m-0"
                style={{ color: "#5f5f5f", fontSize: "14px" }}
              >
                สังกัด
              </label>
              <br />
              <label
                className="m-0"
                style={{ color: "black", fontSize: "16px" }}
              >
                {data.group}
              </label>
            </div>
          </div>
          <div className="row no-gutter pl-4 pr-4 mt-3">
            <div className="col-sm-5">
              <label
                className="m-0"
                style={{ color: "#5f5f5f", fontSize: "14px" }}
              >
                เริ่มปฏิบัติงานเมื่อ
              </label>
              <br />
              <label
                className="m-0"
                style={{ color: "black", fontSize: "16px" }}
              >
                {data.start}
              </label>
            </div>
            <div className="col-sm-7">
              <label
                className="m-0"
                style={{ color: "#5f5f5f", fontSize: "14px" }}
              >
                รวมเวลาปฏิบัติงาน
              </label>
              <br />
              <label
                className="m-0"
                style={{ color: "black", fontSize: "16px" }}
              >
                {data.times}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div
        className="mt-4"
        style={{
          padding: "14px",
          borderRadius: "4px",
          backgroundColor: "rgba(79, 78, 78, 0.04)",
        }}
      >
        <div className="row no-gutter">
          <div className="col-sm-12">
            <label
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "black",
              }}
            >
              {`ประวัติการลา`}
            </label>
          </div>
        </div>
        {/* <div className="row no-gutter pl-4 pr-4">
          <div className="col-sm-12">
            <label
              className="m-0"
              style={{ color: "#5f5f5f", fontSize: "14px" }}
            >
              การลาศึกษาต่อ
            </label>
            <br />
            <label className="m-0" style={{ color: "black", fontSize: "16px" }}>
              <input
                // value={text}
                style={{
                  width: "300px",
                  border: "1px solid transparent",
                  backgroundColor: "rgba(79, 78, 78, 0.1)",
                  borderRadius: "3px",
                }}
                placeholder="ระบุวันลาศึกษาต่อ"
              />
              {`${data.leaveHistory ? data.leaveHistory.studieLeave : null}`}
            </label>
          </div>
        </div> */}
        <div className="row no-gutter pl-4 pr-4 mt-2">
          <div className="col-sm-12">
            <label
              className="m-0"
              style={{ color: "#5f5f5f", fontSize: "14px" }}
            >
              เวลาปฏิบัติงานในรอบปีงบประมาณที่ผ่านมา
            </label>
            <br />
            <label className="m-0" style={{ color: "black", fontSize: "16px" }}>
              {/* {`${
                data.leaveHistory
                  ? date2Thai(data.leaveHistory.startWork, true)
                  : null
              }
                  ${`-`}
                  ${
                    data.leaveHistory
                      ? date2Thai(data.leaveHistory.endWork, true)
                      : null
                  }
                  `} */}
            </label>
          </div>
        </div>
        <div className="row no-gutter pl-4 pr-4 mt-2">
          <div className="col-sm-3">
            <label
              className="m-0"
              style={{ color: "#5f5f5f", fontSize: "14px" }}
            >
              ลาป่วย
            </label>
            <br />
            <label className="m-0" style={{ color: "black", fontSize: "16px" }}>
              <input
                // value={text}
                style={{
                  width: "100px",
                  border: "1px solid transparent",
                  backgroundColor: "rgba(79, 78, 78, 0.1)",
                  borderRadius: "3px",
                }}
                placeholder="ระบุจำนวนวัน"
              />
              {/* {`${
                data.leaveHistory
                  ? data.leaveHistory.sickLeave === 0
                    ? "-"
                    : `${data.leaveHistory.sickLeave} วัน`
                  : "-"
              }`} */}
            </label>
          </div>
          <div className="col-sm-3">
            <label
              className="m-0"
              style={{ color: "#5f5f5f", fontSize: "14px" }}
            >
              ลาป่วย ที่มีใบรับรองแพทย์
            </label>
            <br />
            <label className="m-0" style={{ color: "black", fontSize: "16px" }}>
              <input
                // value={text}
                style={{
                  width: "100px",
                  border: "1px solid transparent",
                  backgroundColor: "rgba(79, 78, 78, 0.1)",
                  borderRadius: "3px",
                }}
                placeholder="ระบุจำนวนวัน"
              />
              {/* {`${
                data.leaveHistory
                  ? data.leaveHistory.sickLeaveMedical === 0
                    ? "-"
                    : `${data.leaveHistory.sickLeaveMedical} วัน`
                  : "-"
              }`} */}
            </label>
          </div>
          <div className="col-sm-3">
            <label
              className="m-0"
              style={{ color: "#5f5f5f", fontSize: "14px" }}
            >
              ลากิจ
            </label>
            <br />
            <label className="m-0" style={{ color: "black", fontSize: "16px" }}>
              <input
                // value={text}
                style={{
                  width: "100px",
                  border: "1px solid transparent",
                  backgroundColor: "rgba(79, 78, 78, 0.1)",
                  borderRadius: "3px",
                }}
                placeholder="ระบุจำนวนวัน"
              />
              {/* {`${
                data.leaveHistory
                  ? data.leaveHistory.businessLeave === 0
                    ? "-"
                    : `${data.leaveHistory.businessLeave} วัน`
                  : "-"
              }`} */}
            </label>
          </div>
          <div className="col-sm-3">
            <label
              className="m-0"
              style={{ color: "#5f5f5f", fontSize: "14px" }}
            >
              มาสาย
            </label>
            <br />
            <label className="m-0" style={{ color: "black", fontSize: "16px" }}>
              <input
                // value={text}
                style={{
                  width: "100px",
                  border: "1px solid transparent",
                  backgroundColor: "rgba(79, 78, 78, 0.1)",
                  borderRadius: "3px",
                }}
                placeholder="ระบุจำนวนวัน"
              />
              {/* {`${
                data.leaveHistory
                  ? data.leaveHistory.late === 0
                    ? "-"
                    : `${data.leaveHistory.late} วัน`
                  : "-"
              }`} */}
            </label>
          </div>
        </div>
        <div className="row no-gutter pl-4 pr-4 mt-2">
          <div className="col-sm-3">
            <label
              className="m-0"
              style={{ color: "#5f5f5f", fontSize: "14px" }}
            >
              ลาพักผ่อน
            </label>
            <br />
            <label className="m-0" style={{ color: "black", fontSize: "16px" }}>
              <input
                // value={text}
                style={{
                  width: "100px",
                  border: "1px solid transparent",
                  backgroundColor: "rgba(79, 78, 78, 0.1)",
                  borderRadius: "3px",
                }}
                placeholder="ระบุจำนวนวัน"
              />
              {/* {`${
                data.leaveHistory
                  ? data.leaveHistory.holiday === 0
                    ? "-"
                    : `${data.leaveHistory.holiday} วัน`
                  : "-"
              }`} */}
            </label>
          </div>
          <div className="col-sm-3">
            <label
              className="m-0"
              style={{ color: "#5f5f5f", fontSize: "14px" }}
            >
              ลาคลอดบุตร
            </label>
            <br />
            <label className="m-0" style={{ color: "black", fontSize: "16px" }}>
              <input
                // value={text}
                style={{
                  width: "100px",
                  border: "1px solid transparent",
                  backgroundColor: "rgba(79, 78, 78, 0.1)",
                  borderRadius: "3px",
                }}
                placeholder="ระบุจำนวนวัน"
              />
              {/* {`${
                data.leaveHistory
                  ? data.leaveHistory.MaternityLeave === 0
                    ? "-"
                    : `${data.leaveHistory.MaternityLeave} วัน`
                  : "-"
              }`} */}
            </label>
          </div>
          <div className="col-sm-3">
            <label
              className="m-0"
              style={{ color: "#5f5f5f", fontSize: "14px" }}
            >
              ลาอุปสมบท
            </label>
            <br />
            <label className="m-0" style={{ color: "black", fontSize: "16px" }}>
              <input
                // value={text}
                style={{
                  width: "100px",
                  border: "1px solid transparent",
                  backgroundColor: "rgba(79, 78, 78, 0.1)",
                  borderRadius: "3px",
                }}
                placeholder="ระบุจำนวนวัน"
              />
              {/* {`${
                data.leaveHistory
                  ? data.leaveHistory.ordainLeave === 0
                    ? "-"
                    : `${data.leaveHistory.ordainLeave} วัน`
                  : "-"
              }`} */}
            </label>
          </div>
          <div className="col-sm-3">
            <label
              className="m-0"
              style={{ color: "#5f5f5f", fontSize: "14px" }}
            >
              ขาดราชการ
            </label>
            <br />
            <label className="m-0" style={{ color: "black", fontSize: "16px" }}>
              <input
                // value={text}
                style={{
                  width: "100px",
                  border: "1px solid transparent",
                  backgroundColor: "rgba(79, 78, 78, 0.1)",
                  borderRadius: "3px",
                }}
                placeholder="ระบุจำนวนวัน"
              />
              {/* {`${
                data.leaveHistory
                  ? data.leaveHistory.govermentLack === 0
                    ? "-"
                    : `${data.leaveHistory.govermentLack} วัน`
                  : "-"
              }`} */}
            </label>
          </div>
        </div>
      </div>
      <div
        className="mt-4"
        style={{
          padding: "14px",
          borderRadius: "4px",
          backgroundColor: "rgba(79, 78, 78, 0.04)",
        }}
      >
        <div className="row no-gutter">
          <div className="col-sm-12">
            <label
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "black",
              }}
            >
              {`ประวัติการเลื่อนขั้นเงินเดือน`}
            </label>
          </div>
        </div>

        <div className="row no-gutter pl-4 pr-4 mt-2">
          {/* {salaryHistory()} */}
          <textarea
            // value={text}
            style={{
              width: "100%",
              backgroundColor: "#E7E5E3",
              border: "1px solid transparent",
              borderRadius: "10px",
            }}
          />
        </div>
      </div>

      <div
        className="mt-4"
        style={{
          padding: "14px",
          borderRadius: "4px",
          backgroundColor: "rgba(79, 78, 78, 0.04)",
        }}
      >
        <div className="row no-gutter">
          <div className="col-sm-12">
            <label
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "black",
              }}
            >
              {`ประวัติการถูกลงโทษทางวินัย`}
            </label>
          </div>
        </div>
        <div className="row no-gutter pl-4 pr-4 mt-2">
          {/* {punishHistory()} */}
          <textarea
            // value={text}
            style={{
              width: "100%",
              backgroundColor: "#E7E5E3",
              border: "1px solid transparent",
              borderRadius: "10px",
            }}
          />
        </div>
      </div>

      {/* <div
        className="mt-3 mb-4"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          className="pl-4 pr-4 mr-4 btnCancel"
          onClick={() => history.push("/committee")}
        >
          ยกเลิก
        </div>
        <div className="pl-4 pr-4 mr-4 btnConfirm" onClick={props.next}>
          ถัดไป
        </div>
      </div> */}
    </div>
  );
}

export default UserProfile;
