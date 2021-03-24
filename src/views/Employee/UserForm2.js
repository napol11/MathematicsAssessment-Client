import React from "react";
import { Col, Row } from "antd";

import "./App.css";

import GuidePoint from "./GuidePoint";
import GuideCode from "./GuideCode";
import Form2Table1 from "./Form2Table1";
import Form2Table2 from "./Form2Table2";
import Form2Table3 from "./Form2Table3";
import Form2Table4 from "./Form2Table4";

function UserForm2() {
  return (
    <div style={{ width: "100%" }}>
      <div className="userform2">
        <Row>
          <Col xs={24} sm={18} md={18} lg={18} xl={20}>
            <h1>ส่วนที่ 2.1 รายงานผลการปฏิบัติงาน</h1>
          </Col>
          <space />
          <Col xs={24} sm={4} md={3} lg={3} xl={2}>
            <GuidePoint />
          </Col>
          <Col
            xs={24}
            sm={4}
            md={3}
            lg={3}
            xl={2}
            style={{ paddingLeft: "1%" }}
          >
            <GuideCode />
          </Col>
        </Row>
        <div className="card">
          <Form2Table1 />
        </div>
        <div className="card">
          <Form2Table2 />
        </div>
        <div className="card">
          <Form2Table3 />
        </div>
        <div className="card">
          <Form2Table4 />
        </div>
      </div>
    </div>
  );
}

export default UserForm2;
