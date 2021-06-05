import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { notify } from "../CustomComponent";

import "antd/dist/antd.css";
import { Form, Input } from "antd";

import "./App.css";

import UploadFile from "./modelUpload";
import Cookies from "js-cookie";
import { token } from "../../config";
import axios from "axios";
const url = `https://database-api-pj.herokuapp.com/api/employee`;

const { TextArea } = Input;

function UserFrom3(props) {
  const { id } = useParams();
  const formRef = useRef(null);
  const [next, setNext] = useState(false);

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
    const id_employee = Cookies.get(token.userId);
    const assessment = {
      employee_id: id_employee,
      assessment_id: id_assessment,
    };
    axios.post(`${url}/dataFormfour`, assessment).then((res) => {
      console.log(res);
      setForm([
        {
          name: ["empne"],
          value:
            res.data.data.formfour.formfour_emone === null
              ? ""
              : res.data.data.formfour.formfour_emone,
        },
        {
          name: ["emtwo"],
          value:
            res.data.data.formfour.formfour_emtwo === null
              ? ""
              : res.data.data.formfour.formfour_emtwo,
        },
        {
          name: ["emthree"],
          value:
            res.data.data.formfour.formfour_emthree === null
              ? ""
              : res.data.data.formfour.formfour_emthree,
        },
        {
          name: ["emfour"],
          value:
            res.data.data.formfour.formfour_emfour === null
              ? ""
              : res.data.data.formfour.formfour_emfour,
        },
      ]);
    });
  };

  const onFinish = (values) => {
    console.log(values);
    const id_assessment = `${id}`;
    const id_employee = Cookies.get(token.userId);
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
        setNext(true);
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
        <div className="col-sm-12 mb-4">
          <label
            style={{ fontWeight: "bold", fontSize: "24px", color: "black" }}
          >
            {` ส่วนที่ 3 แบบประเมินคุณลักษณะการปฏิบัติงานและคุณสมบัติเฉพาะตัวสำหรับพนักงานระดับปฏิบัติการ`}
          </label>
        </div>

        <Form
          ref={formRef}
          layout="vertical"
          name="nest-messages"
          onFinish={onFinish}
          fields={form}
        >
          <div className="row no-gutter mb-4">
            <label className="col-sm-6">
              1. ท่านขาดความรู้ ความชำนาญ ทักษะในเรื่องใดบ้าง
            </label>
            <div className="col-sm-6 text-sm-right align-self-sm-end">
              <UploadFile table={1} form={3} />
            </div>
          </div>
          <Form.Item
            // id="form3employees1"
            name={["empne"]}
            // rules={[
            //   {
            //     required: true,
            //     message: "กรุณากรอกข้อความ!",
            //   },
            // ]}
          >
            <TextArea className="textbox" rows={4} />
          </Form.Item>
          <div className="row no-gutter mb-4">
            <label className="col-sm-6 mt-2">
              2. ท่านคิดว่าจะสามารถเพิ่มความรู้ ความชำนาญ
              ทักษะดังกล่าวได้โดยวิธีใดบ้าง
            </label>
            <div className="col-sm-6 text-sm-right align-self-sm-end">
              <UploadFile table={2} form={3} />
            </div>
          </div>
          <Form.Item
            id="form3employees2"
            name={["emtwo"]}
            // rules={[
            //   {
            //     required: true,
            //     message: "กรุณากรอกข้อความ!",
            //   },
            // ]}
          >
            <TextArea className="textbox" rows={4} />
          </Form.Item>
          <div className="row no-gutter mb-4">
            <label className="col-sm-6 mt-2">
              3. ในช่วง 6 เดือนที่ผ่านมา ท่านได้เข้ารับการอบรมอะไรบ้าง
            </label>
            <div className="col-sm-6 text-sm-right align-self-sm-end">
              <UploadFile table={3} form={3} />
            </div>
          </div>
          <Form.Item
            id="form3employees3"
            name={["emthree"]}
            // rules={[
            //   {
            //     required: true,
            //     message: "กรุณากรอกข้อความ!",
            //   },
            // ]}
          >
            <TextArea className="textbox" rows={4} />
          </Form.Item>
          <div className="row no-gutter mb-4">
            <label className="col-sm-9 mt-2">
              4.
              ท่านสนใจการฝึกอบรมหรือต้องการเรียนรู้เรื่องใดบ้างที่จะช่วยให้มีความสามารถปฏิบัติงานที่ได้รับมอบหมายในปัจจุบันได้ดียิ่งขึ้น
              (เรียงลำดับความสำคัญ 1-5){" "}
            </label>
            <div className="col-sm-3 text-sm-right align-self-sm-end">
              <UploadFile table={3} form={3} />
            </div>
          </div>
          <Form.Item
            id="form3employees4"
            name={["emfour"]}
            // rules={[
            //   {
            //     required: true,
            //     message: "กรุณากรอกข้อความ!",
            //   },
            // ]}
          >
            <TextArea className="textbox" rows={4} />
          </Form.Item>
            <div 
                className="mt-4 mb-4"
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
            <div className="pl-3 pr-3 mr-4 btnCancel" onClick={props.prev}>
              ย้อนกลับ
            </div>
            <div className="mr-4">
            <button
                className="btn-modal-confirm"
                type="submit"
            >
                บันทึก
            </button>
            </div>
            {next === true ? (
              <div className="pl-4 pr-4 btnConfirm" onClick={props.next}>
                ถัดไป
              </div>
            ) : null}
          </div>
        </Form>
      </div>
    </div>
  );
}

export default UserFrom3;
