import React, { useState, useEffect, useRef } from "react";
import { InputNumber, Form } from "antd";
import { useParams } from "react-router-dom";
import { notify } from "../CustomComponent";
import "antd/dist/antd.css";
// import { date2Thai } from "../CustomFunction";
// import moment from "moment";

import "./employee.css";
import { date2Thai } from "../CustomFunction";
import axios from "axios";
const url = `http://localhost:3001/api/employee`;

function UserProfile() {
  const { id } = useParams();
  // console.log(`${id}`);
  const formRef = useRef(null);
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
    const id_employee = "1";
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
    // const id_assessment = `${id}`;
    const id_assessment = "1";
    const assessment = {
      employee_id: id_employee,
      assessment_id: id_assessment,
    };
    axios.post(`${url}/dataFormone`, assessment).then((res) => {
      setDatala([
        {
          name: ["formone_lasick"],
          value:
            res.data.data.formone.formone_lasick === null
              ? 0
              : res.data.data.formone.formone_lasick,
        },
        {
          name: ["formone_lalate"],
          value:
            res.data.data.formone.formone_lalate === null
              ? 0
              : res.data.data.formone.formone_lalate,
        },
        {
          name: ["formone_laleave"],
          value:
            res.data.data.formone.formone_laleave === null
              ? 0
              : res.data.data.formone.formone_laleave,
        },
        {
          name: ["formone_lamilitary"],
          value:
            res.data.data.formone.formone_lamilitary === null
              ? 0
              : res.data.data.formone.formone_lamilitary,
        },
        {
          name: ["formone_lamonk"],
          value:
            res.data.data.formone.formone_lamonk === null
              ? 0
              : res.data.data.formone.formone_lamonk,
        },
        {
          name: ["formone_lapaper"],
          value:
            res.data.data.formone.formone_lapaper === null
              ? 0
              : res.data.data.formone.formone_lapaper,
        },
        {
          name: ["formone_laprivate"],
          value:
            res.data.data.formone.formone_laprivate === null
              ? 0
              : res.data.data.formone.formone_laprivate,
        },
        {
          name: ["formone_historypromo"],
          value:
            res.data.data.formone.formone_historypromo === null
              ? ""
              : res.data.data.formone.formone_historypromo,
        },
        {
          name: ["formone_historypunish"],
          value:
            res.data.data.formone.formone_historypunish === null
              ? ""
              : res.data.data.formone.formone_historypunish,
        },
        {
          name: ["formone_lababy"],
          value:
            res.data.data.formone.formone_lababy === null
              ? 0
              : res.data.data.formone.formone_lababy,
        },
      ]);
    });
  };

  const onFinish = (values) => {
    const data = {
      ...values,
      assessment_id: 1,
      employee_id: 1,
    };
    // console.log(values);
    axios
      .post(`${url}/formone`, data)
      .then((res) => {
        console.log(res);
        notify.success("บันทึกสำเร็จ !");
      })
      .catch((err) => {
        console.log(err);
        notify.error("บันทึกไม่สำเร็จ !");
      });
  };

  const [datala, setDatala] = useState([
    {
      name: ["formone_lasick"],
      value: "",
    },
    {
      name: ["formone_lalat"],
      value: "",
    },
    {
      name: ["formone_laleave"],
      value: "",
    },
    {
      name: ["formone_lamilitary"],
      value: "",
    },
    {
      name: ["formone_lamonk"],
      value: "",
    },
    {
      name: ["formone_lapaper"],
      value: "",
    },
    {
      name: ["formone_laprivate"],
      value: "",
    },
    {
      name: ["formone_historypromo"],
      value: "",
    },
    {
      name: ["formone_historypunish"],
      value: "",
    },
    {
      name: ["formone_lababy"],
      value: "",
    },
  ]);

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
        <Form
          ref={formRef}
          layout="vertical"
          name="nest-messages"
          onFinish={onFinish}
          fields={datala}
        >
          <div className="row no-gutter pl-4 pr-4 mt-2">
            <div className="col-sm-3">
              <Form.Item
                style={{ marginBottom: "10px" }}
                name={["formone_lasick"]}
                label="ลาป่วย"
              >
                <InputNumber
                  min={0}
                  style={{
                    width: "100px",
                    border: "1px solid transparent",
                    backgroundColor: "rgba(79, 78, 78, 0.1)",
                    borderRadius: "3px",
                  }}
                  placeholder="ระบุจำนวนวัน"
                />
              </Form.Item>
            </div>
            <div className="col-sm-3">
              <Form.Item
                style={{ marginBottom: "10px" }}
                name={["formone_lapaper"]}
                label="ลาป่วย ที่มีใบรับรองแพทย์"
              >
                <InputNumber
                  min={0}
                  style={{
                    width: "100px",
                    border: "1px solid transparent",
                    backgroundColor: "rgba(79, 78, 78, 0.1)",
                    borderRadius: "3px",
                  }}
                  placeholder="ระบุจำนวนวัน"
                />
              </Form.Item>
            </div>
            <div className="col-sm-3">
              <Form.Item
                style={{ marginBottom: "10px" }}
                name={["formone_laprivate"]}
                label="ลากิจ"
                // rules={[{ required: true }]}
              >
                <InputNumber
                  min={0}
                  style={{
                    width: "100px",
                    border: "1px solid transparent",
                    backgroundColor: "rgba(79, 78, 78, 0.1)",
                    borderRadius: "3px",
                  }}
                  placeholder="ระบุจำนวนวัน"
                />
              </Form.Item>
            </div>
            <div className="col-sm-3">
              <Form.Item
                style={{ marginBottom: "10px" }}
                name={["formone_lalate"]}
                label="มาสาย"
                // rules={[{ required: true }]}
              >
                <InputNumber
                  min={0}
                  style={{
                    width: "100px",
                    border: "1px solid transparent",
                    backgroundColor: "rgba(79, 78, 78, 0.1)",
                    borderRadius: "3px",
                  }}
                  placeholder="ระบุจำนวนวัน"
                />
              </Form.Item>
            </div>
          </div>
          <div className="row no-gutter pl-4 pr-4 mt-2">
            <div className="col-sm-3">
              <Form.Item
                style={{ marginBottom: "10px" }}
                name={["formone_laleave"]}
                label="ลาพักผ่อน"
                // rules={[{ required: true }]}
              >
                <InputNumber
                  min={0}
                  style={{
                    width: "100px",
                    border: "1px solid transparent",
                    backgroundColor: "rgba(79, 78, 78, 0.1)",
                    borderRadius: "3px",
                  }}
                  placeholder="ระบุจำนวนวัน"
                />
              </Form.Item>
            </div>
            <div className="col-sm-3">
              <Form.Item
                style={{ marginBottom: "10px" }}
                name={["formone_lababy"]}
                label="ลาคลอดบุตร"
                // rules={[{ required: true }]}
              >
                <InputNumber
                  min={0}
                  style={{
                    width: "100px",
                    border: "1px solid transparent",
                    backgroundColor: "rgba(79, 78, 78, 0.1)",
                    borderRadius: "3px",
                  }}
                  placeholder="ระบุจำนวนวัน"
                />
              </Form.Item>
            </div>
            <div className="col-sm-3">
              <Form.Item
                style={{ marginBottom: "10px" }}
                name={["formone_lamonk"]}
                label="ลาอุปสมบท"
                // rules={[{ required: true }]}
              >
                <InputNumber
                  min={0}
                  style={{
                    width: "100px",
                    border: "1px solid transparent",
                    backgroundColor: "rgba(79, 78, 78, 0.1)",
                    borderRadius: "3px",
                  }}
                  placeholder="ระบุจำนวนวัน"
                />
              </Form.Item>
            </div>
            <div className="col-sm-3">
              <Form.Item
                style={{ marginBottom: "10px" }}
                name={["formone_lamilitary"]}
                label="ขาดราชการ"
                // rules={[{ required: true }]}
              >
                <InputNumber
                  min={0}
                  style={{
                    width: "100px",
                    border: "1px solid transparent",
                    backgroundColor: "rgba(79, 78, 78, 0.1)",
                    borderRadius: "3px",
                  }}
                  placeholder="ระบุจำนวนวัน"
                />
              </Form.Item>
            </div>
          </div>
          <div
            className="mt-12"
            style={{
              padding: "14px",
              borderRadius: "4px",
              // backgroundColor: "rgba(79, 78, 78, 0.04)",
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
              <Form.Item
                style={{ marginBottom: "10px" }}
                name={["formone_historypromo"]}
                // label="ประวัติการเลื่อนขั้นเงินเดือน"
                // rules={[{ required: true }]}
              >
                <textarea
                  // value={text}
                  style={{
                    width: "100%",
                    backgroundColor: "#E7E5E3",
                    border: "1px solid transparent",
                    borderRadius: "10px",
                  }}
                />
              </Form.Item>
            </div>
          </div>
          <div
            className="mt-12"
            style={{
              padding: "14px",
              borderRadius: "4px",
              // backgroundColor: "rgba(79, 78, 78, 0.04)",
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
              <Form.Item
                style={{ marginBottom: "10px" }}
                name={["formone_historypunish"]}
              >
                <textarea
                  // value={text}
                  style={{
                    width: "100%",
                    backgroundColor: "#E7E5E3",
                    border: "1px solid transparent",
                    borderRadius: "10px",
                  }}
                />
              </Form.Item>
            </div>
          </div>
          <div className="col-sm-12  d-sm-flex align-items-sm-end justify-content-sm-end mt-2">
            <button className="btn-modal-confirm" type="submit">
              บันทึก
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default UserProfile;
