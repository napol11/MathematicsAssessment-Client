import React, { useState } from "react";

import { Steps, Button, Row } from "antd";
import "antd/dist/antd.css";
import "./step.css";

import { CModal, CModalBody } from "@coreui/react";

import Form1 from "./UserForm1";
import Form2 from "./UserForm2";
import Form3 from "./UserForm3";
import Success from "./UserSuccess";

// import axios from "axios";
// const url = `http://localhost:3001/api/employee`;

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
  // const [formone, setFormone] = useState([]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const showmodal = () => {
    setModal(true);
  };

  const handleOk = () => {
    setModal(false);
    next();
  };

  const handleCancel = () => {
    setModal(false);
  };

  // const LoadData = () => {
  //   const employee_id = {
  //     employee_id: "1",
  //     assessment_id: "1",
  //   };
  //   axios.post(`${url}/dataFormone`, employee_id).then((res) => {
  //     // console.log(res);
  //     setFormone({
  //       formone_budgetone: res.data.data.formone.formone_budgetone,
  //       formone_budgettwo: res.data.data.formone.formone_budgettwo,
  //       formone_lababy: res.data.data.formone.formone_lababy,
  //       formone_lalate: res.data.data.formone.formone_lalate,
  //       formone_laleave: res.data.data.formone.formone_laleave,
  //       formone_lamilitary: res.data.data.formone.formone_lamilitary,
  //       formone_lamonk: res.data.data.formone.formone_lamonk,
  //       formone_lapaper: res.data.data.formone.formone_lapaper,
  //       formone_laprivate: res.data.data.formone.formone_laprivate,
  //       formone_lasick: res.data.data.formone.formone_lasick,
  //       formone_promone: res.data.data.formone.formone_promone,
  //       formone_promtwo: res.data.data.formone.formone_promtwo,
  //       formone_punishdate: res.data.data.formone.formone_punishdate,
  //       formone_punishievel: res.data.data.formone.formone_punishievel,
  //       employee_id,
  //     });
  //     // setFormone(data);
  //   });
  // };
  // useEffect(() => {
  //   // LoadData();
  // }, []);

  return (
    <div>
      <div className="userform">
        <h1>แบบประเมิน</h1>
      </div>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div>
        {current === 0 && [<Form1 />]}
        {current === 1 && [<Form2 />]}
        {current === 2 && [<Form3 />]}
        {current === 3 && [<Success />]}
      </div>
      <div style={{ marginTop: 24, textAlign: "center" }}>
        {current === 1 && (
          <Button
            style={{ margin: "0 8px", borderColor: "#F6BE32", color: "black" }}
            onClick={() => prev()}
          >
            ย้อนกลับ
          </Button>
        )}
        {current === 2 && (
          <Button
            style={{ margin: "0 8px", borderColor: "#F6BE32", color: "black" }}
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
            }}
            onClick={() => showmodal()}
          >
            ส่ง
          </Button>
        )}
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
            onClick={() => handleOk()}
          >
            ยืนยัน
          </Button>
        </CModalBody>
      </CModal>
    </div>
  );
}

export default UserStep;
