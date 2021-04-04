import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Button, Popconfirm, Form } from "antd";

import { MdDelete } from "react-icons/md";
import "./App.css";

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
            message: `กรุณากรอก ${title}!`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
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
        editable: true,
        width: "5%",
      },
      {
        title: <div style={title}>{"กิจกรรม"}</div>,
        dataIndex: "Table1Activity",
        editable: true,
      },
      {
        title: <div style={title}>{"%FTE"}</div>,
        dataIndex: "Table1FTE",
        editable: true,
        width: "10%",
      },
      {
        title: <div style={title}>{"ระดับความสำเร็จ"}</div>,
        dataIndex: "Table1Level",
        editable: true,
        width: "10%",
      },
      {
        title: <div style={title}>{"คะแนนรวม"}</div>,
        dataIndex: "Table1TotalScore",
        width: "10%",
      },
      {
        title: <div style={title}>{"คะแนนรวม %"}</div>,
        dataIndex: "Table1TotalScorePercent",
        width: "10%",
      },
      {
        title: <div style={title}>{"ความคิดเห็น"}</div>,
        dataIndex: "Table1Comments",
        editable: true,
      },
      {
        title: " ",
        dataIndex: "Table1Upload",
        width: "10%",
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Button style={{ borderColor: "#F04D22" }}>อัปโหลดเอกสาร</Button>
          ) : null,
      },
      {
        title: " ",
        dataIndex: "operation",
        width: "10%",
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="คุณแน่ใจว่าจะลบ ?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <MdDelete size="25px" color="red" />
            </Popconfirm>
          ) : null,
      },
    ];
    this.state = {
      dataSource: [],
      count: 1,
    };
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      Table1No: `${count}`,
      Table1Activity: "กรอกชื่อกิจกรรม",
      Table1FTE: "กรอกค่า FTE",
      Table1Level: "กรอกระดับ",
      Table1TotalScore: "",
      Table1TotalScorePercent: "",
      Table1Comments: "กรอกความคิดเห็น",
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
          className="col-sm-12 text-sm-right align-self-sm-end"
          style={{ marginTop: "1%" }}
        >
          <button className="buttons_add" onClick={this.handleAdd}>
            เพิ่มแถวตาราง
          </button>
        </div>
        <Table
          className="committeeTableAssess2 mt-4"
          components={components}
          rowClassName={() => "editable-row"}
          dataSource={dataSource}
          columns={columns}
          title={() => (
            <label style={{ fontSize: "16px", fontWeight: "bold" }}>
              1. การจัดการงานที่รับผิดชอบ
            </label>
          )}
          pagination={{
            defaultPageSize: 4,
          }}
          size="middle"
        />
      </>
    );
  }
}
export default Form2Table1;
