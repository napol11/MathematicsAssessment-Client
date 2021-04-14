import React, { useState, useRef, useEffect } from "react";
import { Button, Row, Form, Input } from "antd";
import { CModal, CModalBody } from "@coreui/react";
import { useParams } from "react-router-dom";
import { notify } from "../CustomComponent";

import "./committee.css";

import Cookies from "js-cookie";
import { token } from "../../config";
import axios from "axios";
const url = `http://localhost:3001/api/committee`;

const CommitteAssessStep32 = (props) => {
  const data = props.data.EvaForm32;

  const Employee = () => {
    const styleTile = { marginLeft: "10%" };
    const styleDetail = {
      fontWeight: "bold",
      marginLeft: "20%",
      marginBottom: 0,
    };
    const values = data.Employee.map((r, i) => {
      const detail = r.detail.map((row, index) => {
        const txt =
          r.detail.length > 1 ? (
            <p key={`D${index}`} style={styleDetail}>{`${index + 1}. ${
              row.message
            }`}</p>
          ) : (
            <p key={`D${index}`} style={styleDetail}>{` ${row.message}`}</p>
          );
        return txt;
      });

      return (
        <div>
          <p
            key={`T${i}`}
            className={i !== 0 ? "mt-5" : ""}
            style={styleTile}
          >{`${i + 1}. ${r.title}`}</p>
          {detail}
        </div>
      );
    });
    return values;
  };

  const [modal, setModal] = useState(false);
  const showmodal = () => {
    setModal(true);
  };

  const handleCancel = () => {
    setModal(false);
  };

  const { id, assessment } = useParams();
  const formRef = useRef(null);
  const { TextArea } = Input;

  const onFinish = (values) => {
    const id_assessment = `${assessment}`;
    const id_employee = `${id}`;
    const id_committee = Cookies.get(token.userId);
    const form = {
      ...values,
      assessment_id: id_assessment,
      employee_id: id_employee,
      committee_id: id_committee,
    };
    axios
      .post(`${url}/formfour`, form)
      .then((res) => {
        console.log(res);
        notify.success("บันทึกสำเร็จ !");
      })
      .catch((err) => {
        console.log(err);
        // notify.error("บันทึกไม่สำเร็จ !");
      });
  };
  const [form, setForm] = useState([
    {
      name: ["comone"],
      value: "",
    },
    {
      name: ["comtwo"],
      value: "",
    },
  ]);

  const LoadData = () => {
    const id_assessment = `${assessment}`;
    const id_employee = `${id}`;
    const id_committee = Cookies.get(token.userId);
    const form = {
      employee_id: id_employee,
      assessment_id: id_assessment,
      committee_id: id_committee,
    };
    axios.post(`${url}/dataFormfourById`, form).then((res) => {
      const data = res.data.data;
      // console.log(data.length);
      if (data !== null) {
        setForm([
          {
            name: ["comone"],
            value: res.data.data.formfour_comone || "",
          },
          {
            name: ["comtwo"],
            value: res.data.data.formfour_comtwo || "",
          },
        ]);
      }
    });
  };

  useEffect(() => {
    LoadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="row no-gutter">
        <div className="col-sm-12">
          <label
            style={{ fontWeight: "bold", fontSize: "24px", color: "black" }}
          >
            {`ส่วนที่ 3 การพัฒนาและฝึกอบรม`}
          </label>
        </div>
      </div>
      <div className="row no-gutter mt-2">
        <div
          className="col-sm-6 p-0"
          style={{ borderRight: "4px solid white" }}
        >
          <div
            style={{
              height: "36px",
              backgroundColor: "#fbdb8a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            พนักงาน
          </div>
          <div
            style={{
              backgroundColor: "#F8F6F3",
              padding: "3%",
            }}
          >
            {Employee()}
          </div>
        </div>
        <div className="col-sm-6 p-0" style={{ borderLeft: "4px solid white" }}>
          <div
            style={{
              height: "36px",
              backgroundColor: "#fbdb8a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ผู้ประเมิน
          </div>
          <div
            style={{
              backgroundColor: "#F8F6F3",
              padding: "3%",
            }}
          >
            {/* {Committee()} */}
            <Form
              ref={formRef}
              layout="vertical"
              name="nest-messages"
              onFinish={onFinish}
              fields={form}
            >
              <p>
                1. ท่านคิดว่าผู้ใใต้บังคับบัญชายังขาดความรู้
                ความชำนาญทักษะในเรื่องใดบ้าง
              </p>
              <Form.Item name={["comone"]}>
                <TextArea
                  className="textarea"
                  style={{ width: "100%" }}
                  placeholder="     กรุณาแสดงความคิดเห็น"
                  rows="5"
                />
              </Form.Item>
              <p>
                2. ท่านคิดว่าผู้ใใต้บังคับบัญชาหควรจะอบรม
                หรือต้องการความรู้เรื่องใดบ้างที่จะช่วยให้มีความสามารถปฏิบัติงานที่ได้รับมอบหมายในปัจจุบันได้ดียิ่งขึ้น
                (เรียงลำดับความสำคัญ 1-5)
              </p>
              <Form.Item name={["comtwo"]}>
                <TextArea
                  className="textarea"
                  style={{ width: "100%" }}
                  placeholder="     กรุณาแสดงความคิดเห็น"
                  rows="5"
                />
              </Form.Item>
              <div className="col-sm-12  d-sm-flex align-items-sm-end justify-content-sm-end mt-2">
                <button className="btn-modal-confirm" type="submit">
                  บันทึก
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>

      <CModal show={modal} size="lg" style={{ textAlign: "center" }}>
        <CModalBody>
          <img
            src="/logo/warning.png"
            alt="warning"
            style={{
              width: "15%",
              marginBottom: "3%",
              marginTop: "3%",
            }}
          />
          <Row justify="center">
            <h4>หากท่านเลือก</h4>
            <h4 style={{ color: "red" }}> "ยืนยัน" </h4>
            <h4>จะไม่สามารถกลับมาแก้ไขแบบประเมินได้อีก</h4>
          </Row>
          <Row justify="center">
            <h4>ท่านต้องการส่งแบบประเมินหรือไม่</h4>
          </Row>

          <Button
            style={{
              marginTop: "3%",
              marginRight: "2%",
              borderColor: "#F6BE32",
              color: "black",
              width: "15%",
            }}
            onClick={() => handleCancel()}
          >
            ยกเลิก
          </Button>
          <Button
            style={{
              marginTop: "3%",
              borderColor: "#F6BE32",
              color: "black",
              backgroundColor: "#F6BE32",
              width: "15%",
            }}
            onClick={props.next}
          >
            ยืนยัน
          </Button>
        </CModalBody>
      </CModal>

      <div
        className="mt-3 mb-4"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="pl-4 pr-4 mr-4 btnCancel" onClick={props.prev}>
          ย้อนกลับ
        </div>
        <div
          className="pl-4 pr-4 mr-4 btnConfirm"
          // onClick={() => showmodal()}
          onClick={props.next}
        >
          ถัดไป
        </div>
      </div>
    </div>
  );
};

export default CommitteAssessStep32;
