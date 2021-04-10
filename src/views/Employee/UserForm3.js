import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { notify } from "../CustomComponent";

import "antd/dist/antd.css";
import { Form, Input } from "antd";

import "./App.css";

import axios from "axios";
const url = `http://localhost:3001/api/employee`;

const { TextArea } = Input;

function UserFrom3() {
  const { id } = useParams();
  const formRef = useRef(null);

  const [form, setForm] = useState([
    {
      name: ["empne"],
      value: "",
    },
    {
      name: ["emtwo"],
      value: "",
    },
    {
      name: ["emthree"],
      value: "",
    },
    {
      name: ["emfour"],
      value: "",
    },
  ]);

  const LoadData = () => {
    const id_assessment = `${id}`;
    const id_employee = "1";
    const assessment = {
      employee_id: id_employee,
      assessment_id: id_assessment,
    };
    axios.post(`${url}/dataFormfour`, assessment).then((res) => {
      console.log(res);
      setForm([
        {
          name: ["empne"],
          value: res.data.data.formfour.formfour_emone,
        },
        {
          name: ["emtwo"],
          value: res.data.data.formfour.formfour_emtwo,
        },
        {
          name: ["emthree"],
          value: res.data.data.formfour.formfour_emthree,
        },
        {
          name: ["emfour"],
          value: res.data.data.formfour.formfour_emfour,
        },
      ]);
    });
  };

  const onFinish = (values) => {
    console.log(values);
    const id_assessment = `${id}`;
    const id_employee = "1";
    const data = {
      ...values,
      assessment_id: id_assessment,
      employee_id: id_employee,
    };
    axios
      .post(`${url}/formfour`, data)
      .then((res) => {
        console.log(res);
        notify.success("บันทึกสำเร็จ !");
      })
      .catch((err) => {
        console.log(err);
        notify.error("บันทึกไม่สำเร็จ !");
      });
  };

  useEffect(() => {
    LoadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div style={{ width: "100%" }}>
      <div className="userform3">
        <div className="col-sm-12">
          <label
            style={{ fontWeight: "bold", fontSize: "24px", color: "black" }}
          >
            {` ส่วนที่ 2.2 แบบประเมินคุณลักษณะการปฏิบัติงานและคุณสมบัติเฉพาะตัวสำหรับพนักงานระดับปฏิบัติการ`}
          </label>
        </div>
        <Form
          ref={formRef}
          layout="vertical"
          name="nest-messages"
          onFinish={onFinish}
          fields={form}
        >
          <p>1. ท่านขาดความรู้ ความชำนาญ ทักษะในเรื่องใดบ้าง</p>
          <Form.Item
            // id="form3employees1"
            name={["empne"]}
            rules={[
              {
                required: true,
                message: "กรุณากรอกข้อความ!",
              },
            ]}
          >
            <TextArea className="textbox" rows={4} />
          </Form.Item>
          <p>
            2. ท่านคิดว่าจะสามารถเพิ่มความรู้ ความชำนาญ
            ทักษะดังกล่าวได้โดยวิธีใดบ้าง
          </p>
          <Form.Item
            id="form3employees2"
            name={["emtwo"]}
            rules={[
              {
                required: true,
                message: "กรุณากรอกข้อความ!",
              },
            ]}
          >
            <TextArea className="textbox" rows={4} />
          </Form.Item>
          <p>3. ในช่วง 6 เดือนที่ผ่านมา ท่านได้เข้ารับการอบรมอะไรบ้าง</p>
          <Form.Item
            id="form3employees3"
            name={["emthree"]}
            rules={[
              {
                required: true,
                message: "กรุณากรอกข้อความ!",
              },
            ]}
          >
            <TextArea className="textbox" rows={4} />
          </Form.Item>
          <p>
            4. ท่านสนใจการฝึกอบรม
            หรือต้องการเรียนรู้เรื่องใดบ้างที่จะช่วยให้มีความสามารถปฏิบัติงานที่ได้รับมอบหมายในปัจจุบันได้ดียิ่งขึ้น
            (เรียงลำดับความสำคัญ 1-5){" "}
          </p>
          <Form.Item
            id="form3employees4"
            name={["emfour"]}
            rules={[
              {
                required: true,
                message: "กรุณากรอกข้อความ!",
              },
            ]}
          >
            <TextArea className="textbox" rows={4} />
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

export default UserFrom3;
