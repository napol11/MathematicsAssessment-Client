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
  }

  return <td {...restProps}>{childNode}</td>;
};

class Form2Table3 extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: <div style={title}>{"หัวข้อ"}</div>,
        dataIndex: "Table3No",
        key: "Table3No",
        // editable: true,
        align: "center",
        width: "10%",
      },
      {
        title: <div style={title}>{"กิจกรรม"}</div>,
        dataIndex: "Table3Activity",
        key: "Table3Activity",
        editable: true,
        width: "40%",
      },
      {
        title: <div style={title}>{"%FTE (A)"}</div>,
        dataIndex: "Table3FTE",
        key: "Table3FTE",
        editable: true,
        editingnumber: true,
        align: "center",
        width: "10%",
      },
      {
        title: <div style={title}>{"ระดับความสำเร็จ (B)"}</div>,
        dataIndex: "Table3Level",
        key: "Table3Level",
        editable: true,
        editinglevel: true,
        align: "center",
        width: "10%",
      },
      {
        title: <div style={title}>{"คะแนนรวม (A * B)"}</div>,
        dataIndex: "Table3TotalScore",
        key: "Table3TotalScore",
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
              {row.Table3FTE * row.Table3Level}
            </div>
          );
        },
      },
      {
        title: <div style={title}>{"คะแนนรวม % (C / 4)"}</div>,
        dataIndex: "Table3TotalScorePercent",
        key: "Table3TotalScorePercent",
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
              {(row.Table3FTE * row.Table3Level) / 4}
            </div>
          );
        },
      },
      {
        title: <div style={title}>{"ความคิดเห็น"}</div>,
        dataIndex: "Table3Comments",
        key: "Table3Comments",
        editable: true,
        width: "40%",
      },
      {
        title: <div style={title}>{"รหัสกลยุทธ์"}</div>,
        dataIndex: "Table3Code",
        key: "Table3Code",
        editable: true,
        editingnumber: true,
        align: "center",
        width: "10%",
      },
      // {
      //   title: " ",
      //   dataIndex: "Table2Upload",
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
      // key: i + 1,
      // Table2No: i + 1,
      // Table2Activity: v.formtwo_name,
      // Table2FTE: v.formtwo_fte,
      // Table2Level: v.formtwo_sucessem,
      // Table2Comments: v.formtwo_comment,
      // Table2Code: v.formtwo_code,
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
      const T3 = data.filter((v) => v.formtwo_table === 3);
      this.setState({
        dataSource:
          T3.length !== 0
            ? T3.map((v, i) => ({
                key: i + 1,
                Table3No: i + 1,
                Table3Activity: v.formtwo_name,
                Table3FTE: v.formtwo_fte,
                Table3Level: v.formtwo_sucessem,
                Table3Comments: v.formtwo_comment,
                Table3Code: v.formtwo_code,
              }))
            : [],
        count: T3.length !== 0 ? T3.length + 1 : 1,
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
      Table3No: `${count}`,
      Table3Activity: "ระบุชื่อกิจกรรม",
      Table3FTE: "0",
      Table3Level: "0",
      // Table3TotalScorePercent: "0",
      Table3Comments: "ระบุความคิดเห็น",
      Table3Code: "0",
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
            3. การจัดการแบบข้ามสายงาน
          </label>
          </div>
          <div className="col-sm-6 text-sm-right align-self-sm-end">
          <button className="buttons_add" onClick={this.handleAdd}>
            เพิ่มแถวตาราง
          </button>
          <UploadFile table={3} form={2} />
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
        </div>
      </>
    );
  }
}
export default Form2Table3;
