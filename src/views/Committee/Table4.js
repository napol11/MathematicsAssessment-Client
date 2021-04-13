import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Form } from "antd";

// import "./App.css";
import "./committee.css";

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

class Table1 extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: <div style={title}>{"หัวข้อ"}</div>,
        dataIndex: "Table4No",
        key: "Table4No",
        align: "center",
        width: "80px",
      },
      {
        title: <div style={title}>{"กิจกรรม"}</div>,
        dataIndex: "Table4Activity",
        key: "Table4Activity",
      },
      {
        title: <div style={title}>{"%FTE"}</div>,
        dataIndex: "Table4FTE",
        key: "Table4FTE",
        width: "50px",
        align: "center",
      },
      {
        title: <div style={title}>{"ระดับความสำเร็จ (พนักงาน)"}</div>,
        dataIndex: "Table4Level",
        key: "Table4Level",
        width: "80px",
        align: "center",
      },
      {
        title: (
          <div style={(title, { color: "red" })}>
            {"ระดับความสำเร็จ (กรรมการ)"}
          </div>
        ),
        dataIndex: "Table4LevelCom",
        key: "Table4LevelCom",
        width: "80px",
        editable: true,
        align: "center",
      },
      {
        title: <div style={title}>{"คะแนนรวม "}</div>,
        dataIndex: "Table4TotalScore",
        key: "Table4TotalScore",
        width: "80px",
        render: (text, row, index) => {
          return (
            <div
              style={{
                wordWrap: "break-word",
                wordBreak: "break-word",
                textAlign: "center",
              }}
            >
              {row.Table4FTE * row.Table4LevelCom === "NaN"
                ? ""
                : row.Table4FTE * row.Table4LevelCom}
            </div>
          );
        },
      },
      {
        title: <div style={title}>{"คะแนนรวม %"}</div>,
        dataIndex: "Table4TotalScorePercent",
        key: "Table4TotalScorePercent",
        width: "80px",
        render: (text, row, index) => {
          return (
            <div
              style={{
                wordWrap: "break-word",
                wordBreak: "break-word",
                textAlign: "center",
              }}
            >
              {(row.Table4FTE * row.Table4LevelCom) / 4 === "NaN"
                ? "  "
                : (row.Table4FTE * row.Table4LevelCom) / 4}
            </div>
          );
        },
      },
      {
        title: <div style={title}>{"ความคิดเห็น"}</div>,
        dataIndex: "Table4Comments",
        align: "center",
        key: "Table4Comments",
        render: (text, row, index) => {
          return (
            <div
              style={{
                wordWrap: "break-word",
                wordBreak: "break-word",
                // textAlign: "center",
              }}
            >
              {row.Table4Comments === "ระบุความคิดเห็น"
                ? " - "
                : row.Table4Comments}
            </div>
          );
        },
      },
    ];
    this.state = {
      dataSource: [],
      count: 1,
    };
  }

  componentDidMount() {
    const id_assessment = this.props.pathAS;
    const id_employee = this.props.pathEM;
    const data = {
      assessment_id: id_assessment,
      employee_id: id_employee,
    };
    axios.post(`${url}/dataFormtwo`, data).then((res) => {
      const data = res.data.data.formtwo;
      const T4 = data.filter((v) => v.formtwo_table === 4);
      this.setState({
        dataSource:
          T4.length !== 0
            ? T4.map((v, i) => ({
                key: i + 1,
                Table4No: i + 1,
                Table4Activity: v.formtwo_name,
                Table4FTE: v.formtwo_fte,
                Table4Level: v.formtwo_sucessem,
                Table4Comments: v.formtwo_comment,
              }))
            : [],
        count: T4.length !== 0 ? T4.length + 1 : 1,
      });
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
        <Table
          className="committeeTableAssess2 mt-4"
          components={components}
          rowClassName={() => "editable-row"}
          dataSource={dataSource}
          columns={columns}
          title={() => (
            <label style={{ fontSize: "16px", fontWeight: "bold" }}>
              4. การพัฒนาตนเอง
            </label>
          )}
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
export default Table1;
