import React from "react";
// import { Col, Row } from "antd";

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
        <div className="row no-gutter">
          <div className="col-sm-6">
            <label
              style={{ fontWeight: "bold", fontSize: "24px", color: "black" }}
            >
              {`ส่วนที่ 2.1 รายการผลการปฏิบัติงาน`}
            </label>
          </div>
          <div
            className="col-sm-6 text-sm-right align-self-sm-end"
            // style={{ display: "flex", justifyContent: "center" }}
          >
            <div className="row justify-content-sm-end">
              {/* <div className="committee2Btn pl-4 pr-4 mr-4"> */}
              <GuidePoint />
              {/* </div> */}
              {/* <div className="committee2Btn pl-4 pr-4"> */}
              <GuideCode />
              {/* </div> */}
            </div>
          </div>
        </div>
        <div>
          <Form2Table1 />
        </div>
        {/* <div className="card"> */}
        <Form2Table2 />
        {/* </div> */}
        {/* <div className="card"> */}
        <Form2Table3 />
        {/* </div> */}
        {/* <div className="card"> */}
        <Form2Table4 />
        {/* </div> */}
      </div>
    </div>
  );
}

export default UserForm2;
