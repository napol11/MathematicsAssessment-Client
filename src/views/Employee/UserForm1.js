import React, { useState, useEffect, useRef } from "react";
import { InputNumber, Form } from "antd";
import { useParams } from "react-router-dom";
import { notify } from "../CustomComponent";
import moment from "moment";
import "moment/locale/th";
import "antd/dist/antd.css";

import Cookies from "js-cookie";
import { token } from "../../config";
import "./employee.css";
import { date2Thai } from "../CustomFunction";
import axios from "axios";
const url = `https://database-api-pj.herokuapp.com/api/employee`;

function UserProfile(props) {
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
  const [next, setNext] = useState(false);

  const LoadData = () => {
    const id_employee = Cookies.get(token.userId);
    axios.get(`${url}/employee/` + id_employee).then((res) => {
      // const startWork = date2Thai(res.data.data.employee_start);
      const start = new Date(res.data.data.employee_start);
      // const data = new Date();
      // const timeYear = data.getFullYear() - start.getFullYear();
      setData({
        name:
          res.data.data.employee_firstname +
          " " +
          res.data.data.employee_lastname,
        position: res.data.data.employee_position,
        number: res.data.data.employee_number,
        level: res.data.data.employee_degree,
        group: res.data.data.employee_group,
        start: res.data.data.employee_start,
        // times: timeYear + "   ปี",
        times: start,
      });
    });
    const id_assessment = `${id}`;
    const assessment = {
      employee_id: id_employee,
      assessment_id: id_assessment,
    };
    axios.post(`${url}/dataFormone`, assessment).then((res) => {
      console.log(res);
      setDatala([
        {
          name: ["formone_lasick"],
          value:
            res.data.data.formone.formone_lasick === ""
              ? ""
              : res.data.data.formone.formone_lasick,
        },
        {
          name: ["formone_lalate"],
          value:
            res.data.data.formone.formone_lalate === null
              ? ""
              : res.data.data.formone.formone_lalate,
        },
        {
          name: ["formone_laleave"],
          value:
            res.data.data.formone.formone_laleave === ""
              ? ""
              : res.data.data.formone.formone_laleave,
        },
        {
          name: ["formone_lamilitary"],
          value:
            res.data.data.formone.formone_lamilitary === ""
              ? ""
              : res.data.data.formone.formone_lamilitary,
        },
        {
          name: ["formone_lamonk"],
          value:
            res.data.data.formone.formone_lamonk === ""
              ? ""
              : res.data.data.formone.formone_lamonk,
        },
        {
          name: ["formone_lapaper"],
          value:
            res.data.data.formone.formone_lapaper === ""
              ? ""
              : res.data.data.formone.formone_lapaper,
        },
        {
          name: ["formone_laprivate"],
          value:
            res.data.data.formone.formone_laprivate === ""
              ? ""
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
            res.data.data.formone.formone_lababy === ""
              ? ""
              : res.data.data.formone.formone_lababy,
        },
      ]);
    });
  };

  const onFinish = (values) => {
    const id_assessment = `${id}`;
    const id_employee = Cookies.get(token.userId);
    const data = {
      ...values,
      assessment_id: id_assessment,
      employee_id: id_employee,
    };
    console.log(data);
    axios
      .post(`${url}/formone`, data)
      .then((res) => {
        console.log(res);
        notify.success("บันทึกสำเร็จ !");
        setNext(true);
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div style={{ marginTop: "2%" }}>
      <label style={{ fontWeight: "bold", fontSize: "24px", color: "black" }}>
        {`ส่วนที่ 1 ข้อมูลทั่วไปเกี่ยวกับพนักงาน`}
      </label>
      <div
        className="mt-3"
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
                {console.log(data)}
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
                {/* {data.start} */}
                {`${
                  data.start
                    ? `วันที่ ${date2Thai(data.start, true)
                        .toString()
                        .substring(0, 2)}
                            เดือน ${date2Thai(data.start, true)
                              .toString()
                              .substring(
                                3,
                                date2Thai(data.start, true).toString().length -
                                  4
                              )}
                              พ.ศ. ${date2Thai(data.start, true)
                                .toString()
                                .substring(
                                  date2Thai(data.start, true).toString()
                                    .length - 4,
                                  date2Thai(data.start, true).toString().length
                                )}
                            `
                    : null
                }`}
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
                {/* {data.times} */}
                {`${
                  data.times
                    ? moment(data.times, "YYYY-MM-DD").fromNow(true)
                    : null
                }`}
              </label>
            </div>
          </div>
        </div>
      </div>
      <Form
          ref={formRef}
          layout="vertical"
          name="nest-messages"
          onFinish={onFinish}
          fields={datala}
        >
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
          <div className="row no-gutter pl-4 pr-4 mt-2">
            <div className="col-sm-3">
              <Form.Item
                style={{ marginBottom: "10px" }}
                name={["formone_lasick"]}
                label="ลาป่วย"
              >
                <InputNumber
                  min={0}
                  max={100}
                  maxLength={4}
                  className="textarea"
                  style={{ width: "100px" }}
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
                  max={100}
                  maxLength={4}
                  className="textarea"
                  style={{ width: "100px" }}
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
                  max={100}
                  maxLength={4}
                  className="textarea"
                  style={{ width: "100px" }}
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
                  max={100}
                  maxLength={4}
                  className="textarea"
                  style={{ width: "100px" }}
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
                  max={100}
                  maxLength={4}
                  className="textarea"
                  style={{ width: "100px" }}
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
                  max={100}
                  maxLength={4}
                  className="textarea"
                  style={{ width: "100px" }}
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
                  max={100}
                  maxLength={4}
                  className="textarea"
                  style={{ width: "100px" }}
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
                  max={100}
                  maxLength={4}
                  className="textarea"
                  style={{ width: "100px" }}
                  placeholder="ระบุจำนวนวัน"
                />
              </Form.Item>
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
            <div className="col-sm-1">
                <label 
                    className="m-0 mt-2" 
                    style={{ color: "#5f5f5f", fontSize: "14px" }}
                >
                ปีงบประมาณ
                </label>
            </div>
            <div className="col-sm-5">
              <Form.Item
                style={{ marginBottom: "10px" }}
                name={["formone_budgetone"]}
                // rules={[{ required: true }]}
              >
                <textarea className="textarea" style={{ width: "100%" }} />
              </Form.Item>
            </div>
            <div className="col-sm-5">
              <Form.Item
                style={{ marginBottom: "10px" }}
                name={["formone_budgettwo"]}
                // rules={[{ required: true }]}
              >
                <textarea className="textarea" style={{ width: "100%" }} />
              </Form.Item>
            </div>
            </div>
            <div className="row no-gutter pl-4 pr-4 mt-2">
            <div className="col-sm-1">
                <label 
                    className="m-0 mt-2" 
                    style={{ color: "#5f5f5f", fontSize: "14px" }}
                >
                % การเลื่อนขั้น
                </label>
            </div>
            <div className="col-sm-5">
              <Form.Item
                style={{ marginBottom: "10px" }}
                name={["formone_promoone"]}
                // rules={[{ required: true }]}
              >
                <textarea className="textarea" style={{ width: "100%" }} />
              </Form.Item>
            </div>
            <div className="col-sm-5">
              <Form.Item
                style={{ marginBottom: "10px" }}
                name={["formone_promotwo"]}
                // rules={[{ required: true }]}
              >
                <textarea className="textarea" style={{ width: "100%" }} />
              </Form.Item>
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
                  {`ประวัติการถูกลงโทษทางวินัย`}
                </label>
              </div>
            </div>
            <div className="row no-gutter pl-4 pr-4 mt-2">
            <div className="col-sm-1">
                <label 
                    className="m-0 mt-2" 
                    style={{ color: "#5f5f5f", fontSize: "14px" }}
                >
                เมื่อ
                </label>
            </div>
            <div className="col-sm-5">
              <Form.Item
                style={{ marginBottom: "10px" }}
                name={["formone_punishdate"]}
                // rules={[{ required: true }]}
              >
                <textarea className="textarea" style={{ width: "100%" }} />
              </Form.Item>
            </div>
            <div className="col-sm-1">
                <label 
                    className="m-0 mt-2" 
                    style={{ color: "#5f5f5f", fontSize: "14px" }}
                >
                ระดับที่ลงโทษ
                </label>
            </div>
            <div className="col-sm-5">
              <Form.Item
                style={{ marginBottom: "10px" }}
                name={["formone_punishlevel"]}
                // rules={[{ required: true }]}
              >
                <textarea className="textarea" style={{ width: "100%" }} />
              </Form.Item>
            </div>
            </div>

          </div>


          <div
            className="mt-4 mb-4"
            style={{
                display: "flex",
                justifyContent: "center",
            }}
          >
            <div className="mr-4">
            <button className="btn-modal-confirm" type="submit">
              บันทึก
            </button>
            </div>
            {next === true ? (
              <div className="pl-4 pr-4 btnConfirm" onClick={props.next}>
                ถัดไป
              </div>
            ) : null}
          </div>
      </Form>
    </div>
  );
}

export default UserProfile;
