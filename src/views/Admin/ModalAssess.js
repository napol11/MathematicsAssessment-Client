import React, { useRef, useState } from "react";
import { CModal, CModalHeader, CModalBody, CModalFooter } from "@coreui/react";
import { Spin, Form, Input } from "antd";
import { WatDatePicker } from "thaidatepicker-react";
import { notify } from "../CustomComponent";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
const url = `https://database-api-pj.herokuapp.com/api/admin`;

const ModalAssess = (props) => {
  const dispatch = useDispatch();
  const [Title, setTitle] = useState(null);
  const adminModal = useSelector((state) => state.adminModal);

  const [Loading, setLoading] = useState(false);
  const [selectedDateStart, setSelectedDateStart] = useState("");
  const [selectedDateEnd, setSelectedDateEnd] = useState("");
  const [selectedDateEdit, setSelectedDateEdit] = useState("");

  const formRef = useRef(null);

  const handleDatePickerStart = (christDate, buddhistDate) => {
    setSelectedDateStart(christDate);
  };

  const handleDatePickerEnd = (christDate, buddhistDate) => {
    setSelectedDateEnd(christDate);
  };

  const handleDatePickerEdit = (christDate, buddhistDate) => {
    setSelectedDateEdit(christDate);
  };

  const addAssessment = (values) => {
    axios
      .post(`${url}/assessment`, values)
      .then((res) => {
        console.log(res);
        window.location.replace("/administrator/assessment");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sditAssessment = (values) => {
    axios
      .put(`${url}/assessment/` + props.data.id, values)
      .then((res) => {
        console.log(res);
        window.location.replace("/administrator/assessment");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const save = (values) => {
    setLoading(true);
    close();
    notify.success("บันทึกการประเมินเรียบร้อย !");
    props.reload();
    setLoading(false);
    addAssessment(values);
  };

  const edit = (values) => {
    setLoading(true);
    close();
    notify.success("แก้ไขการประเมินเรียบร้อย !");
    props.reload();
    setLoading(false);
    sditAssessment(values);
  };
  const close = () => {
    formRef.current.resetFields();
    dispatch({ type: "set", adminModal: { ...adminModal, show: false } });
  };

  const onFinish = (values) => {
    // console.log(values);
    if (adminModal.type === "add") {
      save(values);
    } else {
      edit(values);
    }
  };

  const LoadData = () => {
    setLoading(true);
    let title = "การประเมิน";

    if (adminModal.type === "add") {
      setTitle(`เพิ่ม${title}`);
    } else {
      setTitle(`แก้ไข${title}`);
      formRef.current.setFieldsValue({
        name: props.data.assessment_name,
        start: setSelectedDateStart(props.data.start),
        end: setSelectedDateEnd(props.data.assessment_end),
        endedit: setSelectedDateEdit(props.data.assessment_endedit),
      });
    }

    setLoading(false);
  };

  return (
    <CModal
      show={adminModal.show}
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
            {Title}
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
                </Form.Item>
              </div>
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
                    value={selectedDateEdit}
                    onChange={handleDatePickerEdit}
                    placeholder={"ระบุวันที่สิ้นสุดการกรอกแบบประเมิน"}
                    dateFormat={"yyyy-MM-dd"}
                    displayFormat={`DD MMM YY`}
                    inputStyle={{
                      color: "black",
                      // width: "100%",
                      width: 750,
                    }}
                    minDate={selectedDateStart}
                    maxDate={selectedDateEnd}
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
