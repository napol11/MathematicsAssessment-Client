import React, { useRef, useState } from "react";
import { CModal, CModalHeader, CModalBody, CModalFooter } from "@coreui/react";
import { Spin, Form, Select, Input } from "antd";
import { notify } from "../CustomComponent";
import { WatDatePicker } from "thaidatepicker-react";
import "./admin.css";

const { Option } = Select;

export default function ModalStaff(props) {
  const { show, reload, closeModal } = props;

  const formRef = useRef(null);

  const [Loading, setLoading] = useState(false);
  const [Title, setTitle] = useState(null);
  const [Level, setLevel] = useState(null);
  const [Division, setDivision] = useState(null);

  const close = () => {
    formRef.current.resetFields();
    closeModal();
  };

  const LoadData = () => {
    // ex option level
    const dataLevel = [
      {
        id: 1,
        levelName: "ระดับ 1",
        level: "1",
      },
      {
        id: 2,
        levelName: "ระดับ 2",
        level: "2",
      },
    ];

    // ex option division

    const dataDiv = [
      {
        id: 1,
        divName: "สังกัด 1",
        div: "1",
      },
      {
        id: 2,
        divName: "สังกัด 2",
        div: "2",
      },
    ];
    const divisions = dataDiv.map((r, i) => {
      return (
        <Option key={i} value={r.div}>
          {r.divName}
        </Option>
      );
    });
    const levels = dataLevel.map((r, i) => {
      return (
        <Option key={i} value={r.level}>
          {r.levelName}
        </Option>
      );
    });
    setLoading(true);
    // Title
    setTitle("เพิ่มรายชื่อพนักงาน");
    // map ระดับ สังกัด
    setLevel(levels);
    setDivision(divisions);

    setLoading(false);
  };

  const save = () => {
    setLoading(true);
    close();
    notify.success("บันทึกรายชื่อพนักงานเรียบร้อย !");
    reload();
    setLoading(false);
  };

  const onFinish = (values) => {
    // values ค่าจาก form
    console.log(values);
    save();
  };

  return (
    <div>
      <CModal show={show} onOpened={LoadData} closeOnBackdrop={false} size="lg">
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
                    name={["user", "firstName"]}
                    label="ชื่อ"
                    rules={[{ required: true, message: "กรุณากรอก ชื่อ!" }]}
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
                    name={["user", "lastName"]}
                    label="นามสกุล"
                    rules={[{ required: true, message: "กรุณากรอก นามสกุล!" }]}
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
                    name={["user", "position"]}
                    label="ตำแหน่ง"
                    rules={[{ required: true, message: "กรุณากรอก ตำแหน่ง!" }]}
                  >
                    <Select
                      className="select-modal"
                      placeholder=" ‎‏‏‎ ‎ระบุตำแหน่ง"
                    >
                      <Option value="committee">กรรมการ</Option>
                      <Option value="lead">หัวหน้า</Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="col-sm-6">
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    name={["user", "number"]}
                    label="เลขที่"
                    rules={[{ required: true, message: "กรุณากรอก เลขที่!" }]}
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
                    name={["user", "level"]}
                    label="ระดับ"
                    rules={[{ required: true, message: "กรุณากรอก ระดับ!" }]}
                  >
                    <Select
                      className="select-modal"
                      placeholder=" ‎‏‏‎ ‎ระบุระดับ"
                    >
                      {Level}
                    </Select>
                  </Form.Item>
                </div>
                <div className="col-sm-6">
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    name={["user", "division"]}
                    label="สังกัด"
                    rules={[{ required: true, message: "กรุณากรอก สังกัด!" }]}
                  >
                    <Select
                      className="select-modal"
                      placeholder=" ‎‏‏‎ ‎ระบุสังกัด"
                    >
                      {Division}
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <div className="row no-gutter">
                <div className="col-sm-6">
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    name={["user", "dateStart"]}
                    label="วันที่เริ่มทำงาน"
                    rules={[
                      {
                        required: false,
                        message: "กรุณากรอก วันที่เริ่มทำงาน!",
                      },
                    ]}
                  >
                    <WatDatePicker
                      placeholder={"วันที่เริ่มทำงาน"}
                      dateFormat={"yyyy-MM-dd"}
                      displayFormat={"DD MMM YY"}
                      inputStyle={{
                        color: "black",
                        width: "100%",
                      }}
                      clearable={true}
                    />
                  </Form.Item>
                </div>
                <div className="col-sm-6">
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    name={["user", "email"]}
                    label="อีเมลล์"
                    rules={[
                      { required: true, message: "กรุณากรอก อีเมลล์!" },
                      { type: "email", message: "อีเมลล์ ไม่ถูกต้อง!" },
                    ]}
                  >
                    <Input
                      placeholder=" ‎‏‏‎ ‎ระบุอีเมลล์"
                      autoComplete={"off"}
                      className="input-modal"
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
