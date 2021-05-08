import React, { useRef, useState } from "react";
import { CModal, CModalHeader, CModalBody, CModalFooter } from "@coreui/react";
import { Spin, Form, Select, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { notify } from "../CustomComponent";
import "./admin.css";

import axios from "axios";
const url = `https://database-api-pj.herokuapp.com/api/admin`;

const { Option } = Select;

const ModalCommittee = (props) => {
  const dispatch = useDispatch();
  const adminModal = useSelector((state) => state.adminModal);

  const formRef = useRef(null);

  const [Title, setTitle] = useState(null);
  const [Loading, setLoading] = useState(false);

  const LoadData = () => {
    console.log(props);
    setLoading(true);

    let title = "รายชื่อกรรมการ";

    if (adminModal.type === "add") {
      setTitle(`เพิ่ม${title}`);
    } else {
      setTitle(`แก้ไข${title}`);
      console.log(props.data.tel);
      ///  set values เซ็ทค่าในฟอร์ม
      // จะเอามาจาก props หรือ Axios ก็ได้
      formRef.current.setFieldsValue({
        firstname: props.data.firstname,
        lastname: props.data.lastname,
        position: props.data.position,
        email: props.data.email,
        tel: props.data.tel,
      });
    }
    // formRef.current.setFieldsValue({ user: { position: null } });
    setLoading(false);
  };

  const close = () => {
    formRef.current.resetFields();
    dispatch({ type: "set", adminModal: { ...adminModal, show: false } });
  };

  const addcommittee = (values) => {
    const data = {
      ...values,
      status: values.position === "หัวหน้า" ? "1" : "0",
    };
    // console.log(data);
    axios
      .post(`${url}/committee`, data)
      .then((res) => {
        console.log(res);
        window.location.replace("/administrator/committee");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editcommittee = (values) => {
    const data = {
      ...values,
      status: values.position === "หัวหน้า" ? "1" : "0",
      role: "1",
    };
    // console.log(props.data.id);
    axios
      .put(`${url}/committee/` + props.data.id, data)
      .then((res) => {
        console.log(res);
        window.location.replace("/administrator/committee");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveCommittee = (values) => {
    setLoading(true);
    close();
    notify.success("บันทึกรายชื่อกรรมการเรียบร้อย !");
    props.reload();
    setLoading(false);
    addcommittee(values);
  };

  const editCommittee = (values) => {
    setLoading(true);
    close();
    notify.success("แก้ไขรายชื่อกรรมการเรียบร้อย !");
    props.reload();
    setLoading(false);
    editcommittee(values);
  };

  const onFinish = (values) => {
    // console.log(values);
    if (adminModal.type === "add") {
      saveCommittee(values);
    } else {
      editCommittee(values);
    }
  };

  const onChangePosition = (e) => {
    const value = e;
    console.log(value);
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
          <div className="col-10">
            <label
              className="m-0"
              style={{ color: "black", fontWeight: "bold", fontSize: 20 }}
            >
              {Title}
            </label>
          </div>

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
            <div className="row no-gutter">
              <div className="col-sm-6">
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  name={["firstname"]}
                  label="ชื่อ"
                  rules={[{ required: true, message: "กรุณาระบุ ชื่อ" }]}
                >
                  <Input
                    type="text"
                    placeholder=" ‎‏‏‎ ‎ระบุชื่อ"
                    autoComplete="off"
                    className="input-modal"
                  />
                </Form.Item>
              </div>
              <div className="col-sm-6">
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  name={["lastname"]}
                  label="นามสกุล"
                  rules={[{ required: true, message: "กรุณาระบุ นามสกุล" }]}
                >
                  <Input
                    placeholder=" ‎‏‏‎ ‎ระบุนามสกุล"
                    autoComplete={"off"}
                    className="input-modal"
                  />
                </Form.Item>
              </div>
            </div>
            <Form.Item
              style={{ marginBottom: "10px" }}
              name={["position"]}
              label="ตำแหน่ง"
              rules={[{ required: true, message: "กรุณาระบุ ตำแหน่ง" }]}
            >
              <Select
                className="select-modal"
                placeholder=" ‎‏‏‎ ‎ระบุตำแหน่ง"
                onChange={onChangePosition}
              >
                <Option value="กรรมการ">กรรมการ</Option>
                <Option value="หัวหน้า">หัวหน้า</Option>
              </Select>
            </Form.Item>
            <div className="row no-gutter">
              <div className="col-sm-6">
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  name={["email"]}
                  label="อีเมล"
                  rules={[
                    { required: true, message: "กรุณาระบุ อีเมล" },
                    { type: "email", message: "อีเมล ไม่ถูกต้อง!" },
                  ]}
                >
                  <Input
                    placeholder=" ‎‏‏‎ ‎ระบุอีเมล"
                    autoComplete={"off"}
                    className="input-modal"
                    disabled={adminModal.type === "add" ? false : true}
                  />
                </Form.Item>
              </div>
              <div className="col-sm-6">
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  name={["tel"]}
                  label="เบอร์โทร"
                  rules={[{ required: true, message: "กรุณาระบุ เบอร์โทร" }]}
                >
                  <Input
                    placeholder="‏‏‎‎‎ระบุเบอร์โทร"
                    autoComplete={"off"}
                    className="input-modal"
                    minLength={10}
                    maxLength={10}
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

export default ModalCommittee;
