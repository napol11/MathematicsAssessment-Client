import React, { useEffect, useState, useRef } from "react";
import { Table, Popconfirm, Form, Input, InputNumber, Select } from "antd";
// import { notify } from "../CustomComponent";
import { MdDelete } from "react-icons/md";
import { CModal, CModalHeader, CModalBody, CModalFooter } from "@coreui/react";

import "./App.css";

import Cookies from "js-cookie";
import { token } from "../../config";
import axios from "axios";
const url = `https://database-api-pj.herokuapp.com/api/employee`;

const title = { color: "black", textAlign: "center" };

const { Option } = Select;

const AdminAssessment = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [open, setOpen] = useState(false);

  const formRef = useRef(null);

  const onpenModel = () => {
    setOpen(true);
  };

  const closeModel = () => {
    formRef.current.resetFields();
    setOpen(false);
  };

  const onFinish = (values) => {
    const adddata = {
      Table1Activity: values.name,
      Table1FTE: values.FTE,
      Table1Level: values.Level,
      Table1Comments: values.comment,
    };
    console.log(adddata);
  };

  const LoadData = async () => {
    const id_assessment = props.path;
    const id_employee = Cookies.get(token.userId);
    const data = {
      assessment_id: id_assessment,
      employee_id: id_employee,
    };
    axios.post(`${url}/dataFormtwo`, data).then((res) => {
      const data = res.data.data.formtwo;
      const T1 = data.filter((v) => v.formtwo_table === 1);
      console.log(T1);
      const raw =
        T1.length !== 0
          ? T1.map((v, i) => ({
              Table1No: i + 1,
              Table1Activity: v.formtwo_name,
              Table1FTE: v.formtwo_fte,
              Table1Level: v.formtwo_sucessem,
              Table1Comments: v.formtwo_comment,
            }))
          : [];
      setDataSource(raw);
      props.changeData(raw);
    });
  };

  const columns = [
    {
      title: <div style={title}>{"หัวข้อ"}</div>,
      dataIndex: "Table1No",
      key: "Table1No",
      align: "center",
      width: "10%",
    },
    {
      title: <div style={title}>{"กิจกรรม"}</div>,
      dataIndex: "Table1Activity",
      key: "Table1Activity",

      width: "40%",
    },
    {
      title: <div style={title}>{"%FTE (A)"}</div>,
      dataIndex: "Table1FTE",
      key: "Table1FTE",

      align: "center",
      width: "10%",
    },
    {
      title: <div style={title}>{"ระดับความสำเร็จ (B)"}</div>,
      dataIndex: "Table1Level",
      key: "Table1Level",

      align: "center",
      width: "10%",
    },
    {
      title: <div style={title}>{"คะแนนรวม (A * B)"}</div>,
      dataIndex: "Table1TotalScore",
      key: "Table1TotalScore",
      align: "center",
      width: "10%",
      render: (text, row, index) => {
        return (
          <div
            style={{
              wordWrap: "break-word",
              wordBreak: "break-word",
              // textAlign: "center",
            }}
          >
            {row.Table1FTE * row.Table1Level}
          </div>
        );
      },
    },
    {
      title: <div style={title}>{"คะแนนรวม % (C / 4)"}</div>,
      dataIndex: "Table1TotalScorePercent",
      key: "Table1TotalScorePercent",
      align: "center",
      width: "10%",
      render: (text, row, index) => {
        return (
          <div
            style={{
              wordWrap: "break-word",
              wordBreak: "break-word",
              // textAlign: "center",
            }}
          >
            {(row.Table1FTE * row.Table1Level) / 4}
          </div>
        );
      },
    },
    {
      title: <div style={title}>{"ความคิดเห็น"}</div>,
      dataIndex: "Table1Comments",
      key: "Table1Comments",

      width: "50%",
    },
    {
      title: " ",
      dataIndex: "operation",
      key: "operation",
      width: "10%",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="คุณแน่ใจว่าจะลบกิจกรรมนี้ ?"
            // onConfirm={() => this.handleDelete(record.key)}
          >
            <MdDelete size="25px" cursor="pointer" />
          </Popconfirm>
        ) : null,
    },
  ];

  useEffect(() => {
    LoadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="Row col-sm-12 mt-4" style={{ backgroundColor: "#E7E5E3" }}>
      {/* ********************************************************** */}
      <div
        className="Row col-sm-12 mt-4"
        // style={{ backgroundColor: "#E7E5E3" }}
      >
        <label
          className="col-sm-10"
          style={{ fontSize: "16px", fontWeight: "bold" }}
        >
          1. การจัดการงานที่รับผิดชอบ
        </label>
        <button className="buttons_add" onClick={onpenModel}>
          เพิ่มข้อมูล
        </button>
      </div>
      <Table
        rowKey={"Table1No"} // uniq key หรือ primary key ตัวไม่ซ้ำ
        className="committeeTableAssess2"
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={{ y: 200 }}
        locale={{ emptyText: "ไม่มีข้อมูล" }}
        size="middle"
      />
      {/* ********************************************************** */}
      <CModal show={open} onClose={closeModel} closeOnBackdrop={false}>
        <CModalHeader>
          <label
            className="m-0"
            style={{ color: "black", fontWeight: "bold", fontSize: 20 }}
          >
            เพิ่มข้อมูลลงตาราง การจัดการงานที่รับผิดชอบ
          </label>
          <div className="col-2 text-right">
            <i
              onClick={closeModel}
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
          layout="vertical"
          name="nest-messages"
          ref={formRef}
          onFinish={onFinish}
        >
          <CModalBody>
            <div className="row no-gutter">
              <div className="col-sm-12">
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  name={["name"]}
                  label="ชื่อกิจกรรม"
                  rules={[{ required: true, message: "กรุณาระบุ ชื่อกิจกรรม" }]}
                >
                  <Input
                    placeholder=" ‎‏‏‎ ‎ระบุชื่อกิจกรรม"
                    autoComplete="off"
                    className="input-modal"
                  />
                </Form.Item>
              </div>
              <div className="col-sm-6">
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  name={["FTE"]}
                  label="%FTE"
                  rules={[{ required: true, message: "กรุณาระบุ %FTE" }]}
                >
                  <InputNumber
                    placeholder=" ‎‏‏‎ ‎ระบุ %FTE"
                    autoComplete={"off"}
                    className="input-modal"
                    style={{ width: "200px" }}
                    min={0}
                    max={100}
                  />
                </Form.Item>
              </div>
              <div className="col-sm-6">
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  name={["Level"]}
                  label="ระดับความสำเร็จ"
                  rules={[
                    { required: true, message: "กรุณาระบุ ระดับความสำเร็จ" },
                  ]}
                >
                  <Select
                    className="select-modal"
                    placeholder=" ‎‏‏‎ ระดับความสำเร็จ"
                  >
                    <Option value="1">1</Option>
                    <Option value="1.5">1.5</Option>
                    <Option value="2">2</Option>
                    <Option value="2.5">2.5</Option>
                    <Option value="3">3</Option>
                    <Option value="3.5">3.5</Option>
                    <Option value="4">4</Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="col-sm-12">
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  name={["comment"]}
                  label="ความคิดเห็น"
                >
                  <Input
                    placeholder=" ‎‏‏‎ ‎ระบุ ความคิดเห็น"
                    autoComplete="off"
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
              onClick={closeModel}
            >
              ยกเลิก
            </button>
            <button className="btn-modal-confirm" type="submit">
              ยืนยัน
            </button>
          </CModalFooter>
        </Form>
      </CModal>
    </div>
  );
};

export default AdminAssessment;
