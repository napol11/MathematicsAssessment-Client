import React, { useState } from "react";

import { Steps, Button, Row, Modal } from "antd";
import "antd/dist/antd.css";
import "./step.css";

import Form1 from "./UserForm1";
import Form2 from "./UserForm2";
import Form3 from "./UserForm3";
import Success from "./UserSuccess";

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

  return (
    <div>
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
        {/* {current < steps.length - 2 && (
					<Button style={{ margin: "0 8px", borderColor: "#F6BE32", color: "black" }} onClick={() => prev()}>
						ย้อนกลับ
					</Button>
				)} */}
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
      <Modal
        visible={modal}
        width={"35%"}
        style={{ textAlign: "center" }}
        closable={false}
        footer={null}
      >
        <img
          src="/logo/warning.png"
          alt="warning"
          style={{ width: "15%", marginBottom: "3%", marginTop: "3%" }}
        />
        <Row style={{ marginLeft: "6%" }}>
          <h2>หากท่านเลือก</h2>
          <h2 style={{ color: "red" }}>‘ยืนยัน’</h2>
          <h2>จะไม่สามารถกลับมาแก้ไขแบบประเมินได้อีก</h2>
        </Row>
        <Row style={{ marginLeft: "23%" }}>
          <h2>ท่านต้องการส่งแบบประเมินหรือไม่</h2>
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
      </Modal>
    </div>
  );
}

export default UserStep;
