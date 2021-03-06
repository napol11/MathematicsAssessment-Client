import React, { useRef, useState } from "react";
import { CModal, CModalHeader, CModalBody, CModalFooter } from "@coreui/react";
import { Spin, Form, Select, Input } from "antd";
import { notify } from "../CustomComponent";
import { WatDatePicker } from "thaidatepicker-react";
import "./admin.css";

import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
const url = `https://database-api-pj.herokuapp.com/api/admin`;

const { Option } = Select;

export default function ModalStaff(props) {
  // const { show, reload, closeModal } = props;

  const dispatch = useDispatch();
  const adminModal = useSelector((state) => state.adminModal);

  const formRef = useRef(null);

  const [Loading, setLoading] = useState(false);
  const [Title, setTitle] = useState(null);
  const [listdegree, setListdegree] = useState([]);
  const close = () => {
    formRef.current.resetFields();
    dispatch({ type: "set", adminModal: { ...adminModal, show: false } });
  };

  const LoadData = () => {
    console.log(props);
    setLoading(true);
    // Title
    let title = "รายชื่อพนักงาน";

    if (adminModal.type === "add") {
      setTitle(`เพิ่ม${title}`);
    } else {
      console.log(props);
      setTitle(`แก้ไข${title}`);
      // console.log(props);
      ///  set values เซ็ทค่าในฟอร์ม
      // จะเอามาจาก props หรือ Axios ก็ได้
      formRef.current.setFieldsValue({
        firstname: props.data.firstname,
        lastname: props.data.lastname,
        position: props.data.position,
        email: props.data.email,
        tel: props.data.employee_tel,
        number: props.data.number,
        degree: props.data.employee_degree,
        group: props.data.employee_group,
        start: props.data.employee_start,
      });
      if (props.data.employee_position === "นักบริหารงานทั่วไป") {
        const degreedata = ["จ.1", "จ.2", "จ.3", "จ.4"];
        setListdegree(degreedata);
      } else {
        const degreedata = ["สว.1", "สว.2", "สว.3", "สว.4"];
        setListdegree(degreedata);
      }
    }

    setLoading(false);
  };

  const onChangeDegree = (value) => {
    if (value === "นักบริหารงานทั่วไป") {
      const degreedata = ["จ.1", "จ.2", "จ.3", "จ.4"];
      setListdegree(degreedata);
    } else {
      const degreedata = ["สว.1", "สว.2", "สว.3", "สว.4"];
      setListdegree(degreedata);
    }
  };

  const addEmployee = (values) => {
    const data = {
      ...values,
    };
    let numfilter = props.rawstaft.filter((v) => v.number === data.number);
    if (numfilter.length === 0) {
      notify.success("บันทึกรายชื่อพนักงานเรียบร้อย !");
      axios
        .post(`${url}/employee`, data)
        .then((res) => {
          console.log(res);
          window.location.replace("/administrator/staff");
        })
        .catch((err) => {
          console.log(err);
        });
      close();
    } else {
      notify.error("เลขที่ ซ้ำ !");
      formRef.current.setFieldsValue({
        number: "",
      });
    }
  };

  const editEmployrr = (values) => {
    axios
      .put(`${url}/employee/` + props.data.id, values)
      .then((res) => {
        console.log(res);
        window.location.replace("/administrator/staff");
        close();
        notify.success("แก้ไขรายชื่อพนักงานเรียบร้อย !");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const save = (values) => {
    addEmployee(values);
    setLoading(true);
    // reload();
    setLoading(false);
  };

  const edit = (values) => {
    editEmployrr(values);
    setLoading(true);
    // reload();
    setLoading(false);
  };

  const onFinish = (values) => {
    // console.log(values);
    if (adminModal.type === "add") {
      save(values);
    } else {
      edit(values);
    }
  };

  return (
    <div>
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
              <div className="row no-gutter">
                <div className="col-sm-6">
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    name={["position"]}
                    label="ตำแหน่ง"
                    rules={[{ required: true, message: "กรุณาระบุ ตำแหน่ง" }]}
                  >
                    <Select
                      className="select-modal"
                      placeholder=" ‎‏‏‎ ‎ระบุตำแหน่ง"
                      onChange={onChangeDegree}
                    >
                      <Option value="นักคอมพิวเตอร์">นักคอมพิวเตอร์</Option>
                      <Option value="ครูปฏิบัติการ"> ครูปฏิบัติการ</Option>
                      <Option value="นักบริหารงานทั่วไป">
                        นักบริหารงานทั่วไป
                      </Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="col-sm-6">
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    name={["number"]}
                    label="เลขที่"
                    rules={[{ required: true, message: "กรุณาระบุ เลขที่" }]}
                  >
                    <Input
                      placeholder=" ‎‏‏‎ ‎ระบุเลขที่"
                      autoComplete={"off"}
                      className="input-modal"
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="row no-gutter">
                <div className="col-sm-6">
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    name={["degree"]}
                    label="ระดับ"
                    rules={[{ required: true, message: "กรุณาระบุ ระดับ" }]}
                  >
                    <Select
                      className="select-modal"
                      placeholder=" ‎‏‏‎ ‎ระบุระดับ"
                    >
                      {/* <Option value="จ.1">จ.1</Option>
                      <Option value="จ.2">จ.2</Option>
                      <Option value="จ.3">จ.3</Option>
                      <Option value="จ.4">จ.4</Option>
                      <Option value="สว.1">สว.1</Option>
                      <Option value="สว.2">สว.2</Option>
                      <Option value="สว.3">สว.3</Option>
                      <Option value="สว.4">สว.4</Option> */}
                      {listdegree.map((listdegree) => (
                        <Option key={listdegree}>{listdegree}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className="col-sm-6">
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    name={["group"]}
                    label="สังกัด"
                    rules={[{ required: true, message: "กรุณาระบุ สังกัด" }]}
                  >
                    <Select
                      className="select-modal"
                      placeholder=" ‎‏‏‎ ‎ระบุสังกัด"
                    >
                      <Option value="‎ภาควิชาคณิตศาสตร์">
                        ‎ภาควิชาคณิตศาสตร์
                      </Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <div className="row no-gutter">
                <div className="col-sm-12">
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    name={["start"]}
                    label="วันที่เริ่มทำงาน"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาระบุ วันที่เริ่มทำงาน",
                      },
                    ]}
                  >
                    <WatDatePicker
                      placeholder={"วันที่เริ่มทำงาน"}
                      dateFormat={"yyyy-MM-dd"}
                      displayFormat={"DD MMM YY"}
                      inputStyle={{
                        color: "black",
                        width: 765,
                      }}
                      clearable={true}
                    />
                  </Form.Item>
                </div>
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
                      placeholder=" ‎‏‏‎ เบอร์โทร"
                      autoComplete={"off"}
                      className="input-modal"
                      minLength={9}
                      maxLength={10}
                    />
                  </Form.Item>
                </div>
              </div>
            </CModalBody>
            <CModalFooter style={{ display: "flex", justifyContent: "center" }}>
              <button
                className="btn-modal-cancel"
                type="button"
                onClick={close}
              >
                ยกเลิก
              </button>
              <button className="btn-modal-confirm" type="submit">
                ยืนยัน
              </button>
            </CModalFooter>
          </Form>
        </Spin>
      </CModal>
    </div>
  );
}
