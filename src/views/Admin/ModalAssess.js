import React, { useRef, useState } from "react";
import { CModal, CModalHeader, CModalBody, CModalFooter } from "@coreui/react";
import { Spin, Form, Button } from "antd";
import { WatDatePicker } from "thaidatepicker-react";
import { notify } from "../CustomComponent";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const ModalAssess = (props) => {
  const [Loading, setLoading] = useState(false);
  const [selectedDateStart, setSelectedDateStart] = useState("");
  const [selectedDateEnd, setSelectedDateEnd] = useState("");
  const formRef = useRef(null);

  const handleDatePickerStart = (christDate, buddhistDate) => {
    setSelectedDateStart(christDate);
    console.log(formRef.current.getFieldValue("start"));
  };

  const handleDatePickerEnd = (christDate, buddhistDate) => {
    setSelectedDateEnd(christDate);
  };

  const close = () => {
    formRef.current.resetFields();
    props.close();
  };

  const onFinish = (values) => {
    if (props.title.type === "edit") {
      close();
      console.log("data editt", values);
      notify.success("แก้ไขรายการประเมินเรียบร้อย!");
    } else {
      close();
      console.log("data save", values);
      notify.success("บันทึกรายการประเมินเรียบร้อย!");
    }
  };

  const LoadData = () => {
    setLoading(true);
    console.log("start", props.data.start);
    if (props.title.type === "edit") {
      setSelectedDateStart(props.data.start);
      setSelectedDateEnd(props.data.end);
    } else {
      setSelectedDateStart("");
      setSelectedDateEnd("");
    }
    setLoading(false);
  };

  return (
    <CModal
      show={props.show}
      onOpened={LoadData}
      closeOnBackdrop={false}
      size="sm"
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
        </CModalHeader>
        <Form
          ref={formRef}
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
        >
          <CModalBody>
            <Form.Item
              style={{ marginBottom: "10px" }}
              name={"start"}
              label="วันที่เริ่มต้น"
              rules={[{ required: true, message: "กรุณากรอก วันที่เริ่มต้น" }]}
            >
              <WatDatePicker
                value={selectedDateStart}
                onChange={handleDatePickerStart}
                placeholder={"เริ่มวันที่"}
                dateFormat={"yyyy-MM-dd"}
                displayFormat={"DD MMM YY"}
                inputStyle={{
                  color: "black",
                  width: 120,
                }}
                maxDate={selectedDateEnd}
                clearable={true}
              />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "10px" }}
              name={"end"}
              label="วันที่สิ้นสุด"
              rules={[{ required: true, message: "กรุณากรอก วันที่สิ้นสุด" }]}
            >
              <WatDatePicker
                value={selectedDateEnd}
                onChange={handleDatePickerEnd}
                placeholder={"สิ้นสุดวันที่"}
                dateFormat={"yyyy-MM-dd"}
                displayFormat={`DD MMM YY`}
                inputStyle={{
                  color: "black",
                  width: 120,
                }}
                minDate={selectedDateStart}
                clearable={true}
              />
            </Form.Item>
          </CModalBody>
          <CModalFooter>
            <Button type="primary" htmlType="submit">
              ยืนยัน
            </Button>
            <Button onClick={close}>ยกเลิก</Button>
          </CModalFooter>
        </Form>
      </Spin>
    </CModal>
  );
};

export default ModalAssess;
