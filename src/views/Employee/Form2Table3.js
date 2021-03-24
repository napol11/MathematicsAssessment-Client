import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Button, Popconfirm, Form, Col, Row } from "antd";

import { MdDelete } from "react-icons/md";
import "./App.css";

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

class Form2Table3 extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "หัวข้อ",
        dataIndex: "Table3No",
        editable: true,
        width: "5%",
      },
      {
        title: "กิจกรรม",
        dataIndex: "Table3Activity",
        editable: true,
      },
      {
        title: "FTE %",
        dataIndex: "Table3FTE",
        editable: true,
        width: "10%",
      },
      {
        title: "ระดับความสำเร็จ",
        dataIndex: "Table3Level",
        editable: true,
        width: "10%",
      },
      {
        title: "คะแนนรวม",
        dataIndex: "Table3TotalScore",
        width: "10%",
      },
      {
        title: "คะแนนรวม %",
        dataIndex: "Table3TotalScorePercent",
        width: "10%",
      },
      {
        title: "ความคิดเห็น",
        dataIndex: "Table3Comments",
        editable: true,
      },
      {
        title: "รหัสกลยุทธ์",
        dataIndex: "Table3Code",
        editable: true,
      },
      {
        title: " ",
        dataIndex: "Table3Upload",
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
      Table3No: `${count}`,
      Table3Activity: "กรอกชื่อกิจกรรม",
      Table3FTE: "กรอกค่า FTE",
      Table3Level: "กรอกระดับ",
      Table3TotalScore: "",
      Table3TotalScorePercent: "",
      Table3Comments: "กรอกความคิดเห็น",
      Table3Code: "กรอกรหัสกลยุทธ์",
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
        <div>
          <Row>
            <Col xs={24} sm={20} md={21} lg={21} xl={22}>
              <h2>3. การจัดการแบบข้ามสายงาน</h2>
            </Col>
            <space />
            <Col xs={24} sm={4} md={3} lg={3} xl={2}>
              <div className="control-buttons">
                <button className="buttons_add" onClick={this.handleAdd}>
                  เพิ่มแถวตาราง
                </button>
              </div>
            </Col>
          </Row>
        </div>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          dataSource={dataSource}
          columns={columns}
        />
      </>
    );
  }
}
export default Form2Table3;
