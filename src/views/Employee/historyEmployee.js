import React, { useEffect, useState, useRef } from "react";
import { CModal, CModalHeader, CModalTitle, CModalBody } from "@coreui/react";
import { Form, Input, Button } from "antd";

import "./employee.css";
import { notify } from "../CustomComponent";
import Cookies from "js-cookie";
import { token } from "../../config";
import { date2Thai } from "../CustomFunction";
import moment from "moment";
import "moment/locale/th";
import axios from "axios";
const url = `https://database-api-pj.herokuapp.com/api/employee`;
const urlauth = `https://database-api-pj.herokuapp.com/api/auth`;

const HistoryEmployee = () => {
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const [data, setData] = useState({
    name: null,
    position: null,
    number: null,
    level: null,
    group: null,
    start: null,
    times: null,
  });
  const formRef = useRef(null);

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
  };

  const onFinish = (values) => {
    const data = {
      ...values,
      employee_id: Cookies.get(token.userId),
    };
    if (data.Com_password === data.password) {
      axios
        .put(`${urlauth}/changepass`, data)
        .then((res) => {
          console.log(res);
          notify.success("บันทึกสำเร็จ !");
          close();
        })
        .catch((err) => {
          console.log(err);
          notify.error("บันทึกไม่สำเร็จ !");
        });
    } else {
      notify.error("รหัสผ่านไม่ตรงกัน !");
    }
  };

  const close = () => {
    formRef.current.resetFields();
    setVisible(!visible);
  };

  useEffect(() => {
    LoadData();
  }, []);
  return (
    <div className="justify-center align-center">
      <div className="row wrap window-height">
        <div className="col-xs-12 col-sm-12 ">
          <div className="row no-gutter mb-4">
            <div className="col-sm-6">
              <label
                style={{ fontWeight: "bold", fontSize: "26px", color: "black" }}
              >
                ประวัติพนักงาน
              </label>
            </div>
            <div className="col-sm-6 text-sm-right align-self-sm-end">
              <Button
                shape="round"
                size={"large"}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => setVisible(true)}
                type="submit"
                style={
                  hover
                    ? {
                        backgroundColor: "#f6be32",
                        border: "2px solid #f6be32",
                        color: "white",
                        paddingLeft: "50px",
                        paddingRight: "50px",
                      }
                    : {
                        backgroundColor: "white",
                        border: "2px solid #f6be32",
                        color: "black",
                        paddingLeft: "50px",
                        paddingRight: "50px",
                      }
                }
              >
                เปลี่ยนรหัสผ่าน
              </Button>
            </div>
          </div>

          <div className="container-fluid ">
            <div className="row no-gutter">
              <div
                className="col-12 mt-2"
                style={{
                  minHeight: "100px",
                  backgroundColor: "#f8f8f8",
                  borderRadius: "10px",
                  padding: "20px",
                }}
              >
                <label
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "black",
                  }}
                >
                  ข้อมูลทั่วไป
                </label>
                <div className="row no-gutter mt-4 ml-3">
                  <div className="col-md-4">
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
                  <div className="col-md-4">
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
                  <div className="col-md-4">
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
                </div>
                <div className="row no-gutter mt-4 ml-3">
                  <div className="col-md-4">
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
                  <div className="col-md-8">
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
                <div className="row no-gutter mt-4 ml-3 mb-3">
                  <div className="col-md-8">
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
                  <div className="col-md-4">
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
              <CModal
                show={visible}
                onClose={() => setVisible(!visible)}
                size="sm"
              >
                <CModalHeader closeButton>
                  <CModalTitle>
                    {<i class="fas fa-exchange-alt"> เปลี่ยนรหัสผ่าน</i>}
                  </CModalTitle>
                </CModalHeader>
                <Form
                  layout="vertical"
                  name="nest-messages"
                  onFinish={onFinish}
                  ref={formRef}
                >
                  <CModalBody>
                    <div className="row no-gutter">
                      <div className="col-md-12">
                        <Form.Item
                          label="ระบุรหัสผ่านเก่า"
                          name="oldpassword"
                          rules={[
                            {
                              required: true,
                              message: "ระบุรหัสผ่านปัจจุบัน",
                            },
                          ]}
                        >
                          <Input.Password />
                        </Form.Item>
                      </div>
                      <div className="col-md-12">
                        <Form.Item
                          label="ระบุรหัสผ่านใหม่"
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: "ระบุรหัสผ่านใหม่",
                            },
                          ]}
                        >
                          <Input.Password />
                        </Form.Item>
                      </div>
                      <div className="col-md-12">
                        <Form.Item
                          label="ยืนยันรหัสผ่านใหม่"
                          name="Com_password"
                          rules={[
                            {
                              required: true,
                              message: "ยืนยันรหัสผ่านใหม่",
                            },
                          ]}
                        >
                          <Input.Password />
                        </Form.Item>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        type="button"
                        onClick={close}
                        style={{
                          borderRadius: "20px",
                          padding: "5px 25px",
                          border: "1px solid #FDC331",
                          backgroundColor: "transparent",
                          marginRight: "10px",
                          outline: "none",
                        }}
                      >
                        ยกเลิก
                      </button>
                      <button
                        type="submit"
                        style={{
                          borderRadius: "20px",
                          padding: "5px 25px",
                          border: "1px solid #FDC331",
                          backgroundColor: "#FDC331",
                          outline: "none",
                        }}
                      >
                        ยืนยัน
                      </button>
                    </div>
                  </CModalBody>
                </Form>
              </CModal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryEmployee;
