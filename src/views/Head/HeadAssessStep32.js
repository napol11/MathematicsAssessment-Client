import React, { useState } from "react";
import { Button, Row } from "antd";
import { CModal, CModalBody } from "@coreui/react";
import "./head.css";

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

  const Committee = () => {
    const styleTitle = { marginBottom: 0 };
    const value = data.Committee.map((row, index) => {
      return (
        <div>
          <p
            key={`p${index}`}
            className={index !== 0 ? "mt-5 mb-2" : "mb-2"}
            style={styleTitle}
          >{`${index + 1}. ${row.title}`}</p>
          <textarea
            key={`area${index}`}
            onChange={(e) => Comment(e, row, index)}
            className="textarea"
            style={{ width: "100%" }}
            placeholder="     กรุณาแสดงความคิดเห็น"
            rows="8"
            value={row.comment}
          />
        </div>
      );
    });

    return value;
  };

  const Comment = (e, row, index) => {
    const val = [...data.Committee];
    val.splice(index, 1, { ...row, comment: e.target.value });
    props.setData({
      ...props.data,
      EvaForm32: { ...data, Committee: val },
    });
  };

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
            {Committee()}
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
        <div className="pl-4 pr-4 mr-4 btnConfirm" onClick={() => showmodal()}>
          ถัดไป
        </div>
      </div>
    </div>
  );
};

export default CommitteAssessStep32;
