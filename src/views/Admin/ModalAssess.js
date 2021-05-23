import React, { useRef, useState } from "react";
import { CModal, CModalHeader, CModalBody, CModalFooter } from "@coreui/react";
import { Spin, Form, Select, Input } from "antd";
import { WatDatePicker } from "thaidatepicker-react";
import { notify } from "../CustomComponent";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
const url = `https://database-api-pj.herokuapp.com/api/admin`;

const { Option } = Select;

const ModalAssess = (props) => {
  const dispatch = useDispatch();
  const [Title, setTitle] = useState(null);
  const adminModal = useSelector((state) => state.adminModal);

  const [Loading, setLoading] = useState(false);
  const [selectedDateStart, setSelectedDateStart] = useState("");
  const [selectedDateEnd, setSelectedDateEnd] = useState("");
  const [selectedDateEdit, setSelectedDateEdit] = useState("");
  const [selectedyear, setSelectedyear] = useState("");

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
    console.log(values);
    // axios
    //   .post(`${url}/assessment`, values)
    //   .then((res) => {
    //     console.log(res);
    //     window.location.replace("/administrator/assessment");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const reset = () => {
    setSelectedDateStart("");
    setSelectedDateEnd("");
    setSelectedDateEdit("");
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
    reset();
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
    var d = new Date();
    var year = d.getFullYear();
    setSelectedyear(year);

    if (adminModal.type === "add") {
      setTitle(`เพิ่ม${title}`);
    } else {
      setTitle(`แก้ไข${title}`);
      setSelectedDateStart(props.data.start);
      setSelectedDateEnd(props.data.end);
      setSelectedDateEdit(props.data.edit);
      formRef.current.setFieldsValue({
        name: props.data.assessment_name,
        // start: setSelectedDateStart(props.data.start),
        // end: setSelectedDateEnd(props.data.assessment_end),
        // endedit: setSelectedDateEdit(props.data.assessment_endedit),
      });
      console.log(selectedDateStart);
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
                      message: "กรุณาเลือก รอบการประเมิน",
                    },
                  ]}
                >
                  <Select
                    className="select-modal"
                    placeholder=" ‎‏‏‎ ‎เลือกรอบการประเมิน"
                  >
                    <Option
                      value={`รอบที่ 1 : 1 ส.ค. - 31 ม.ค. ${
                        selectedyear + 543
                      }`}
                    >{`รอบที่ 1 : 1 ส.ค. - 31 ม.ค. ${
                      selectedyear + 543
                    }`}</Option>
                    <Option
                      value={`รอบที่ 2 : 1 ก.พ. - 31 ก.ค. ${
                        selectedyear + 544
                      }`}
                    >
                      {`รอบที่ 2 : 1 ก.พ. - 31 ก.ค. ${selectedyear + 544}`}
                    </Option>
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className="row no-gutter">
              {/* <div className="col-sm-6">
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  name={["year"]}
                  label="ประจำปีที่"
                  rules={[
                    { required: true, message: "กรุณาระบุ ปีการประเมิน" },
                  ]}
                >
                  <Input
                    placeholder=" ‎‏‏‎ ‎ระบุปีการประเมิน"
                    autoComplete="off"
                    className="input-modal"
                    minLength={4}
                    maxLength={4}
                  />
                </Form.Item>
              </div> */}
              <div className="col-sm-6">
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  name={"start"}
                  label="วันเริ่มต้นของการส่งข้อมูลการประเมินพนักงาน"
                  rules={[
                    {
                      required: true,
                      message: "กรุณาระบุ วันเริ่มต้นของการส่งข้อมูลการประเมิน",
                    },
                  ]}
                >
                  <WatDatePicker
                    value={selectedDateStart}
                    onChange={handleDatePickerStart}
                    placeholder={"ระบุวันเริ่มต้นของการส่งข้อมูลการประเมิน"}
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
                  name={"endedit"}
                  label="วันสุดท้ายของการส่งข้อมูลการประเมินพนักงาน"
                  rules={[
                    {
                      required: true,
                      message: "กรุณาระบุ วันสุดท้ายของการส่งข้อมูลการประเมิน",
                    },
                  ]}
                >
                  <WatDatePicker
                    value={selectedDateEdit}
                    onChange={handleDatePickerEdit}
                    placeholder={"ระบุวันสุดท้ายของการส่งข้อมูลการประเมิน"}
                    dateFormat={"yyyy-MM-dd"}
                    displayFormat={`DD MMM YY`}
                    inputStyle={{
                      color: "black",
                      // width: "100%",
                      width: 365,
                    }}
                    minDate={selectedDateStart}
                    maxDate={selectedDateEnd}
                    clearable={true}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="row no-gutter">
              <div className="col-sm-6">
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  name={"end"}
                  label="วันสุดท้ายของการประเมินโดยกรรมการ"
                  rules={[
                    {
                      required: true,
                      message: "กรุณาระบุ วันสุดท้ายของการประเมิน",
                    },
                  ]}
                >
                  <WatDatePicker
                    value={selectedDateEnd}
                    onChange={handleDatePickerEnd}
                    placeholder={"ระบุวันสุดท้ายของการประเมิน"}
                    dateFormat={"yyyy-MM-dd"}
                    displayFormat={`DD MMM YY`}
                    inputStyle={{
                      color: "black",
                      width: 765,
                    }}
                    minDate={selectedDateStart}
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
