import React, { useState } from "react";

import { Steps, Button, Row } from "antd";
import "antd/dist/antd.css";
import "./step.css";

import { CModal, CModalBody } from "@coreui/react";

import Form1 from "./UserForm1";
import Form2 from "./UserForm2";
import Form3 from "./UserForm3";
import Success from "./UserSuccess";

import Cookies from "js-cookie";
import { token } from "../../config";
import { useParams } from "react-router-dom";
import axios from "axios";
const url = `https://database-api-pj.herokuapp.com/api/employee`;

const { Step } = Steps;

const steps = [
  {
    title: "ตรวจสอบข้อมูล",
  },
  {
    title: "รายการผลการปฏิบัติงาน",
  },
  {
    title: "รายการการพัฒนาและฝึกอบรม",
  },
  {
    title: "เสร็จสิ้นการประเมิน",
  },
];

function UserStep() {
  const [current, setCurrent] = useState(0);
  const [modal, setModal] = useState(false);
  const { id } = useParams();

  const next = () => {
    setCurrent(current + 1);
  };

  // const prev = () => {
  //   setCurrent(current - 1);
  // };

  // const showmodal = () => {
  //   setModal(true);
  // };

  const handleOk = () => {
    const id_assessment = `${id}`;
    const id_employee = Cookies.get(token.userId);
    const data = {
      assessment_id: id_assessment,
      employee_id: id_employee,
    };
    axios
      .post(`${url}/finishAssessment`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setModal(false);
    next();
  };

  // const handleCancel = () => {
  //   setModal(false);
  // };

  return (
    <div>
      <div className="userform mb-5">
        <h1>แบบประเมิน</h1>
      </div>
      <center>
        <Steps className="mb-5" style={{ width: "75%" }} current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
      </center>
      <div>
        {/* {current === 0 && [<Form1 />]}
        {current === 1 && [<Form2 />]}
        {current === 2 && [<Form3 />]}
        {current === 3 && [<Success />]} */}
        {current === 0 ? (
          <Form1 next={() => setCurrent(current + 1)} />
        ) : current === 1 ? (
          <Form2
            next={() => setCurrent(current + 1)}
            prev={() => setCurrent(current - 1)}
          />
        ) : current === 2 ? (
          <Form3
            next={() => setModal(true)}
            prev={() => setCurrent(current - 1)}
          />
        ) : current === 3 ? (
          <Success />
        ) : null}
      </div>
      {/* <div style={{ marginTop: 24, textAlign: "center" }}>
        {current === 1 && (
          <Button
            style={{
              margin: "0 8px",
              borderColor: "#F6BE32",
              color: "black",
              marginBottom: "1%",
            }}
            onClick={() => prev()}
          >
            ย้อนกลับ
          </Button>
        )}
        {current === 2 && (
          <Button
            style={{
              margin: "0 8px",
              borderColor: "#F6BE32",
              color: "black",
              marginBottom: "1%",
            }}
            onClick={() => prev()}
          >
            ย้อนกลับ
          </Button>
        )}
        {current < steps.length - 2 && (
          <Button
            style={{
              backgroundColor: "#F6BE32",
              borderColor: "#F6BE32",
              color: "black",
              marginBottom: "1%",
              paddingLeft: "22px",
              paddingRight: "22px",
            }}
            onClick={() => next()}
          >
            ถัดไป
          </Button>
        )}
        {current === steps.length - 2 && (
          <Button
            style={{
              backgroundColor: "#F6BE32",
              borderColor: "#F6BE32",
              color: "black",
              marginBottom: "1%",
              paddingLeft: "22px",
              paddingRight: "22px",
            }}
            onClick={() => showmodal()}
            // onClick={() => next()}
          >
            ถัดไป
          </Button>
        )}
      </div> */}
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
            <h4>ท่านสามารถกลับมาแก้ไขแบบประเมินได้อีก</h4>
          </Row>
          <Row justify="center">
            <h4>จนกว่าจะครบกำหนดวันส่งแบบประเมินวันสุดท้าย</h4>
          </Row>

          {/* <Button
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
          </Button> */}
          <Button
            style={{
              marginTop: "3%",
              borderColor: "#F6BE32",
              color: "black",
              backgroundColor: "#F6BE32",
              width: "15%",
            }}
            onClick={() => handleOk()}
          >
            ตกลง
          </Button>
        </CModalBody>
      </CModal>
    </div>
  );
}

export default UserStep;
