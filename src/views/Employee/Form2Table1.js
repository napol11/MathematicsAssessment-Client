import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Popconfirm, Form } from "antd";

import { MdDelete } from "react-icons/md";
import "./App.css";

import UploadFile from "./modelUpload";
import Cookies from "js-cookie";
import { token } from "../../config";
import axios from "axios";
const url = `http://localhost:3001/api/employee`;

// import { withRouter } from "react-router-dom";

const title = { color: "black", textAlign: "center" };

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `กรุณาระบุ !`,
          },
        ]}
      >
        <Input
          className="textbox"
          ref={inputRef}
          onPressEnter={save}
          onBlur={save}
        />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

class Form2Table1 extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: <div style={title}>{"หัวข้อ"}</div>,
        dataIndex: "Table1No",
        key: "Table1No",
        // editable: true,
        align: "center",
        width: "10%",
      },
      {
        title: <div style={title}>{"กิจกรรม"}</div>,
        dataIndex: "Table1Activity",
        key: "Table1Activity",
        editable: true,
        width: "40%",
      },
      {
        title: <div style={title}>{"%FTE (A)"}</div>,
        dataIndex: "Table1FTE",
        key: "Table1FTE",
        editable: true,
        align: "center",
        width: "10%",
      },
      {
        title: <div style={title}>{"ระดับความสำเร็จ (B)"}</div>,
        dataIndex: "Table1Level",
        key: "Table1Level",
        editable: true,
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
        editable: true,
        width: "50%",
      },
      // {
      //   title: " ",
      //   dataIndex: "Table1Upload",
      //   width: "10%",
      //   render: (_, record) =>
      //     this.state.dataSource.length >= 1 ? (
      //       <Button className="buttons_upload">อัปโหลดเอกสาร</Button>
      //     ) : null,
      // },
      {
        title: " ",
        dataIndex: "operation",
        key: "operation",
        width: "10%",
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="คุณแน่ใจว่าจะลบกิจกรรมนี้ ?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <MdDelete size="25px" cursor="pointer" />
            </Popconfirm>
          ) : null,
      },
    ];
    this.state = {
      dataSource: [],
      count: 1,
      // dataSource:
      //   this.props.data.length !== 0
      //     ? this.props.data.map((v, i) => ({
      //         key: i + 1,
      //         Table1No: i + 1,
      //         Table1Activity: v.formtwo_name,
      //         Table1FTE: v.formtwo_fte,
      //         Table1Level: v.formtwo_sucessem,
      //         Table1Comments: v.formtwo_comment,
      //       }))
      //     : [],
      // count: this.props.data.length !== 0 ? this.props.data.length + 1 : 1,
    };
  }

  componentDidMount() {
    // const { id } = this.props.params;
    const id_assessment = this.props.path;
    const id_employee = Cookies.get(token.userId);
    const data = {
      assessment_id: id_assessment,
      employee_id: id_employee,
    };
    axios.post(`${url}/dataFormtwo`, data).then((res) => {
      const data = res.data.data.formtwo;
      const T1 = data.filter((v) => v.formtwo_table === 1);
      this.setState({
        dataSource:
          T1.length !== 0
            ? T1.map((v, i) => ({
                key: i + 1,
                Table1No: i + 1,
                Table1Activity: v.formtwo_name,
                Table1FTE: v.formtwo_fte,
                Table1Level: v.formtwo_sucessem,
                Table1Comments: v.formtwo_comment,
              }))
            : [],
        count: T1.length !== 0 ? T1.length + 1 : 1,
      });
      const rawData = [...this.state.dataSource];
      this.props.changeData(rawData);
    });
  }

  handleDelete = (key) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => item.key === key);
    newData.splice(index, 1);
    this.setState({
      dataSource: newData,
    });
    this.props.changeData(newData);
  };
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      Table1No: `${count}`,
      Table1Activity: "ระบุชื่อกิจกรรม",
      Table1FTE: "0",
      Table1Level: "0",
      // Table1TotalScore: "0",
      // Table1TotalScorePercent: "0",
      Table1Comments: "ระบุความคิดเห็น",
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };
  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
    this.props.changeData(newData);
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

    return (
      <>
        <div
          className="Row col-sm-12 mt-4"
          style={{ backgroundColor: "#E7E5E3" }}
        >
          <label
            className="col-sm-10"
            style={{ fontSize: "16px", fontWeight: "bold" }}
          >
            1. การจัดการงานที่รับผิดชอบ
          </label>
          <button className="buttons_add" onClick={this.handleAdd}>
            เพิ่มแถวตาราง
          </button>
          <UploadFile table={1} form={2} />
        </div>
        <Table
          className="committeeTableAssess2"
          components={components}
          rowClassName={() => "editable-row"}
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          // pagination={{
          //   defaultPageSize: 4,
          // }}
          scroll={{ y: 200 }}
          size="middle"
        />
        {/* {console.log(this.props.data.length !== 0 ? this.props.data : null)} */}
      </>
    );
  }
}
export default Form2Table1;
