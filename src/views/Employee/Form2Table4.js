import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Popconfirm, Form, InputNumber, Select } from "antd";

import { MdDelete } from "react-icons/md";
import "./App.css";

import UploadFile from "./modelUpload";
import Cookies from "js-cookie";
import { token } from "../../config";
import axios from "axios";
const url = `https://database-api-pj.herokuapp.com/api/employee`;

const EditableContext = React.createContext(null);

const title = { color: "black", textAlign: "center" };
const { Option } = Select;
const { TextArea } = Input;

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
  editinglevel,
  editingnumber,
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
    if (editingnumber) {
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
          <InputNumber
            className="textbox"
            ref={inputRef}
            onPressEnter={save}
            onBlur={save}
            min={0}
            max={100}
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
    } else if (editinglevel) {
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
          <Select
            className="textbox"
            ref={inputRef}
            onPressEnter={save}
            onBlur={save}
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
    } else {
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
          <TextArea className="textbox" ref={inputRef} autoSize onBlur={save} />
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
  }

  return <td {...restProps}>{childNode}</td>;
};

function compare(a, b) {
  return a.num - b.num;
}

class Form2Table4 extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: <div style={title}>{"หัวข้อ"}</div>,
        dataIndex: "Table4No",
        key: "Table4No",
        // editable: true,
        align: "center",
        width: "10%",
      },
      {
        title: <div style={title}>{"กิจกรรม"}</div>,
        dataIndex: "Table4Activity",
        key: "Table4Activity",
        editable: true,
        width: "40%",
      },
      {
        title: <div style={title}>{"%FTE (A)"}</div>,
        dataIndex: "Table4FTE",
        key: "Table4FTE",
        editable: true,
        editingnumber: true,
        align: "center",
        width: "10%",
      },
      {
        title: <div style={title}>{"ระดับความสำเร็จ (B)"}</div>,
        dataIndex: "Table4Level",
        key: "Table4Level",
        editable: true,
        editinglevel: true,
        align: "center",
        width: "10%",
      },
      {
        title: <div style={title}>{"คะแนนรวม (A * B)"}</div>,
        dataIndex: "Table4TotalScore",
        key: "Table4TotalScore",
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
              {row.Table4FTE * row.Table4Level}
            </div>
          );
        },
      },
      {
        title: <div style={title}>{"คะแนนรวม % (C / 4)"}</div>,
        dataIndex: "Table4TotalScorePercent",
        key: "Table4TotalScorePercent",
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
              {/* {row.Table1TotalScore} */}
              {(row.Table4FTE * row.Table4Level) / 4}
            </div>
          );
        },
      },
      {
        title: (
          <div style={title}>
            {"ความคิดเห็นเพิ่มเติม/ข้อเสนอแนะ/ปัญหาและอุปสรรค"}
          </div>
        ),
        dataIndex: "Table4Comments",
        key: "Table4Comments",
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
      const T4 = data.filter((v) => v.formtwo_table === 4);
      const T4soft = T4.sort(compare);
      this.setState({
        dataSource:
          T4soft.length !== 0
            ? T4soft.map((v, i) => ({
                key: i + 1,
                Table4No: i + 1,
                Table4Activity: v.formtwo_name,
                Table4FTE: v.formtwo_fte,
                Table4Level: v.formtwo_sucessem,
                Table4Comments: v.formtwo_comment,
              }))
            : [],
        count: T4soft.length !== 0 ? T4soft.length + 1 : 1,
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
      Table4No: `${count}`,
      Table4Activity: "ระบุชื่อกิจกรรม",
      Table4FTE: "0",
      Table4Level: "1",
      // Table4TotalScore: "0",
      // Table4TotalScorePercent: "0",
      Table4Comments: "ระบุความคิดเห็น",
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
          editingnumber: col.editingnumber,
          editinglevel: col.editinglevel,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

    return (
      <>
        <div
          className="row no-gutter mt-5"
          style={{ backgroundColor: "#E7E5E3" }}
        >
          <div className="col-sm-6 mt-4">
            <label
              className="col-sm-10"
              style={{ fontSize: "16px", fontWeight: "bold" }}
            >
              4. การพัฒนาตนเอง
            </label>
          </div>
          <div className="col-sm-6 text-sm-right align-self-sm-end">
            <button className="buttons_add" onClick={this.handleAdd}>
              เพิ่มแถวตาราง
            </button>
            <UploadFile table={4} form={2} />
          </div>
          <Table
            className="committeeTableAssess2"
            components={components}
            rowClassName={() => "editable-row"}
            dataSource={dataSource}
            columns={columns}
            size="middle"
            pagination={false}
            // pagination={{
            //   defaultPageSize: 4,
            // }}
            scroll={{ y: 200 }}
          />
          {/* {console.log(this.props.data.length !== 0 ? this.props.data : null)} */}
        </div>
      </>
    );
  }
}
export default Form2Table4;
