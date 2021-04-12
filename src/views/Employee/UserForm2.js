import React, { useState, useEffect } from "react";
// import { Form } from "antd";
// import { useParams } from "react-router-dom";
// import { notify } from "../CustomComponent";

import "./App.css";

import GuidePoint from "./GuidePoint";
import GuideCode from "./GuideCode";
import Form2Table1 from "./Form2Table1";
import Form2Table2 from "./Form2Table2";
import Form2Table3 from "./Form2Table3";
import Form2Table4 from "./Form2Table4";
// import axios from "axios";
// const url = `http://localhost:3001/api/employee`;

function UserForm2() {
  // const { id } = useParams();
  // const formRef = useRef(null);
  const [dataT1, setDataT1] = useState([]);
  const [dataT2, setDataT2] = useState([]);
  const [dataT3, setDataT3] = useState([]);
  const [dataT4, setDataT4] = useState([]);
  // const [rawData, setRawData] = useState([]);

  const LoadData = () => {
    // console.log("123");
  };

  const onFinish = () => {
    console.log(dataT1);
    console.log(dataT2);
    console.log(dataT3);
    console.log(dataT4);
    // const rawData =
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
          <div className="col-sm-6 text-sm-right align-self-sm-end">
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
        <Form2Table1 data={dataT1} changeData={(dataT1) => setDataT1(dataT1)} />
        <Form2Table2 data={dataT2} changeData={(dataT2) => setDataT2(dataT2)} />
        <Form2Table3 data={dataT3} changeData={(dataT3) => setDataT3(dataT3)} />
        <Form2Table4 data={dataT4} changeData={(dataT4) => setDataT4(dataT4)} />
        <div className="col-sm-12  d-sm-flex align-items-sm-end justify-content-sm-end mt-2">
          <button
            className="btn-modal-confirm"
            type="submit"
            onClick={onFinish}
          >
            บันทึก
          </button>
        </div>
        {/* <Form
          ref={formRef}
          layout="vertical"
          name="nest-messages"
          onFinish={onFinish}
        >
          <Form.Item name={["formtwo"]}>
            <Form2Table1
              data={dataT1}
              changeData={(dataT1) => setDataT1(dataT1)}
            />
          </Form.Item>
          <Form.Item name={["formtwo"]}>
            <Form2Table2
              data={dataT2}
              changeData={(dataT2) => setDataT2(dataT2)}
            />
          </Form.Item>
          <Form.Item name={["formtwo"]}>
            <Form2Table3
              data={dataT3}
              changeData={(dataT3) => setDataT3(dataT3)}
            />
          </Form.Item>
          <Form.Item name={["formtwo"]}>
            <Form2Table4
              data={dataT4}
              changeData={(dataT4) => setDataT4(dataT4)}
            />
          </Form.Item>
          <div className="col-sm-12  d-sm-flex align-items-sm-end justify-content-sm-end mt-2">
            <button className="btn-modal-confirm" type="submit">
              บันทึก
            </button>
          </div>
        </Form> */}
      </div>
    </div>
  );
}

export default UserForm2;
