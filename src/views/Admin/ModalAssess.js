import React, { useRef, useState } from "react";
import { CModal, CModalHeader, CModalBody, CModalFooter } from "@coreui/react";
import { Spin, Form, Input } from "antd";
import { WatDatePicker } from "thaidatepicker-react";
import { notify } from "../CustomComponent";

import axios from "axios";
const url = `http://localhost:3001/api/admin`;

const ModalAssess = (props) => {
  const [Loading, setLoading] = useState(false);
  const [selectedDateStart, setSelectedDateStart] = useState("");
  const [selectedDateEnd, setSelectedDateEnd] = useState("");
  // const [selectedDateStartR, setSelectedDateStartR] = useState("");
  // const [selectedDateEndR, setSelectedDateEndR] = useState("");
  const formRef = useRef(null);

  const handleDatePickerStart = (christDate, buddhistDate) => {
    setSelectedDateStart(christDate);
    console.log(formRef.current.getFieldValue("start"));
  };

  const handleDatePickerEnd = (christDate, buddhistDate) => {
    setSelectedDateEnd(christDate);
  };

  // const handleDatePickerStartR = (christDate, buddhistDate) => {
  //   setSelectedDateStartR(christDate);
  // };

  // const handleDatePickerEndR = (christDate, buddhistDate) => {
  //   setSelectedDateEndR(christDate);
  // };
  const addAssessment = (values) => {
    axios
      .post(`${url}/assessment`, values)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const save = (values) => {
    addAssessment(values);
  };

  const close = () => {
    formRef.current.resetFields();
    reset();
    props.close();
  };

  const reset = () => {
    setSelectedDateStart("");
    setSelectedDateEnd("");
    // setSelectedDateStartR("");
    // setSelectedDateEndR("");
  };

  const onFinish = (values) => {
    if (props.title.type === "edit") {
      close();
      console.log("data editt", values);
      notify.success("แก้ไขรายการประเมินเรียบร้อย!");
    } else {
      close();
      notify.success("บันทึกรายการประเมินเรียบร้อย!");
      save(values);
    }
  };

  const LoadData = () => {
    setLoading(true);
    // console.log("start", props.data.start);
    // if (props.title.type === "edit") {
    //   setSelectedDateStart(props.data.start);
    //   setSelectedDateEnd(props.data.end);
    // } else {
    //   setSelectedDateStart("");
    //   setSelectedDateEnd("");
    // }
    setLoading(false);
  };

  return (
    <CModal
      show={props.show}
      onOpened={LoadData}
      closeOnBackdrop={false}
      size="lg"
    >
      <Spin size="large" tip="กำลังโหลด..." spinning={Loading}>
        <CModalHeader>
          <label
            className="m-0"
            style={{ color: "black", fontWeight: "bold", fontSize: 20 }}
          >
            {props.title.name}
            <br />
            {props.title.type === "edit" ? props.data.text : null}
          </label>

          <div className="col-2 text-right">
            <i
              onClick={close}
              className="fas fa-times-circle"
              style={{
                color: "red",
                cursor: "pointer",
                fontSize: 20,
              }}
            />
          </div>
        </CModalHeader>
        <Form
          ref={formRef}
          layout="vertical"
          name="nest-messages"
          onFinish={onFinish}
        >
          <CModalBody>
            <div className="row ">
              <div className="col-12">
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  name={"name"}
                  label="รอบการประเมิน "
                  rules={[
                    {
                      required: true,
                      message: "กรุณาระบุ รอบการประเมิน",
                    },
                  ]}
                >
                  <Input
                    placeholder=" ‎‏‏‎ ‎ระบุรอบประเมิน"
                    autoComplete="off"
                    className="input-modal"
                  />
                  {/* <WatDatePicker
                    value={selectedDateStartR}
                    onChange={handleDatePickerStartR}
                    placeholder={"ระบุวันที่เริ่มรอบการประเมิน"}
                    dateFormat={"yyyy-MM-dd"}
                    displayFormat={"DD MMM YY"}
                    inputStyle={{
                      color: "black",
                      //   borderRight: "none",
                      width: 350,
                    }}
                    maxDate={selectedDateEndR}
                    clearable={true}
                  /> */}
                </Form.Item>
              </div>
              {/* <div className="col-sm-6">
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  name={"roundEnd"}
                  label="รอบการประเมิน ถึง"
                  rules={[
                    {
                      required: true,
                      message: "กรุณาระบุ รอบการประเมิน",
                    },
                  ]}
                >
                  <WatDatePicker
                    onChange={handleDatePickerEndR}
                    placeholder={"ระบุวันที่สิ้นสุดรอบการประเมิน"}
                    dateFormat={"yyyy-MM-dd"}
                    displayFormat={"DD MMM YY"}
                    inputStyle={{
                      color: "black",
                      //   borderLeft: "none",
                      width: 350,
                    }}
                    minDate={selectedDateStartR}
                    clearable={true}
                  />
                </Form.Item>
              </div> */}
            </div>
            <div className="row no-gutter">
              <div className="col-sm-6">
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  name={"start"}
                  label="วันที่เริ่มต้นการประเมิน"
                  rules={[
                    {
                      required: true,
                      message: "กรุณาระบุ วันที่เริ่มต้นการประเมิน",
                    },
                  ]}
                >
                  <WatDatePicker
                    value={selectedDateStart}
                    onChange={handleDatePickerStart}
                    placeholder={"ระบุวันที่เริ่มต้นการประเมิน"}
                    dateFormat={"yyyy-MM-dd"}
                    displayFormat={"DD MMM YY"}
                    inputStyle={{
                      color: "black",
                      width: 370,
                    }}
                    maxDate={selectedDateEnd}
                    clearable={true}
                  />
                </Form.Item>
              </div>
              <div className="col-sm-6">
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  name={"end"}
                  label="วันที่สิ้นสุดการประเมิน"
                  rules={[
                    {
                      required: true,
                      message: "กรุณาระบุ วันที่สิ้นสุดการประเมิน",
                    },
                  ]}
                >
                  <WatDatePicker
                    value={selectedDateEnd}
                    onChange={handleDatePickerEnd}
                    placeholder={"ระบุวันที่สิ้นสุดการประเมิน"}
                    dateFormat={"yyyy-MM-dd"}
                    displayFormat={`DD MMM YY`}
                    inputStyle={{
                      color: "black",
                      width: 350,
                    }}
                    minDate={selectedDateStart}
                    clearable={true}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="row ">
              <div className="col-12">
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  name={"endedit"}
                  label="วันที่สิ้นสุดการกรอกแบบประเมิน"
                  rules={[
                    {
                      required: true,
                      message: "กรุณาระบุ วันที่สิ้นสุดการกรอกแบบประเมิน",
                    },
                  ]}
                >
                  <WatDatePicker
                    placeholder={"ระบุวันที่สิ้นสุดการกรอกแบบประเมิน"}
                    dateFormat={"yyyy-MM-dd"}
                    displayFormat={`DD MMM YY`}
                    inputStyle={{
                      color: "black",
                      // width: "100%",
                      width: 750,
                    }}
                    minDate={selectedDateEnd}
                    clearable={true}
                  />
                </Form.Item>
              </div>
            </div>
          </CModalBody>
          <CModalFooter style={{ display: "flex", justifyContent: "center" }}>
            <button className="btn-modal-cancel" type="button" onClick={close}>
              ยกเลิก
            </button>
            <button className="btn-modal-confirm" type="submit">
              ยืนยัน
            </button>
          </CModalFooter>
        </Form>
      </Spin>
    </CModal>
  );
};

export default ModalAssess;
