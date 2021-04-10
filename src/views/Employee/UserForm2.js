import React, { useState, useEffect, useRef } from "react";
import { Form } from "antd";
import { useParams } from "react-router-dom";
import { notify } from "../CustomComponent";

import "./App.css";

import GuidePoint from "./GuidePoint";
import GuideCode from "./GuideCode";
import Form2Table1 from "./Form2Table1";
import Form2Table2 from "./Form2Table2";
import Form2Table3 from "./Form2Table3";
import Form2Table4 from "./Form2Table4";
import axios from "axios";
const url = `http://localhost:3001/api/employee`;

function UserForm2() {
  const { id } = useParams();
  const formRef = useRef(null);

  const LoadData = () => {
    console.log("123");
  };

  const onFinish = (values) => {
    console.log(values);
  };

  useEffect(() => {
    LoadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
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
              <div className="mr-3">
                <GuidePoint />
              </div>
              <div>
                <GuideCode />
              </div>
            </div>
          </div>
        </div>
        <Form
          ref={formRef}
          layout="vertical"
          name="nest-messages"
          onFinish={onFinish}
          // fields={datala}
        >
          <Form.Item name={["formtwo", "formtwo_T1"]}>
            <Form2Table1 />
          </Form.Item>
          <Form.Item name={["formtwo", "formtwo_T2"]}>
            <Form2Table2 />
          </Form.Item>
          <Form.Item name={["formtwo", "formtwo_T3"]}>
            <Form2Table3 />
          </Form.Item>
          <Form.Item name={["formtwo", "formtwo_T4"]}>
            <Form2Table4 />
          </Form.Item>
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

export default UserForm2;
