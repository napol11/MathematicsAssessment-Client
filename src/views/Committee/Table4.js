import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Select, Form } from "antd";

// import "./App.css";
import "./committee.css";

import UploadFile from "./modelUpload";
import Cookies from "js-cookie";
import { token } from "../../config";
import axios from "axios";
const url = `https://database-api-pj.herokuapp.com/api/employee`;
const urlCOM = `https://database-api-pj.herokuapp.com/api/committee`;

// import { withRouter } from "react-router-dom";

const title = { color: "black", textAlign: "center" };
const { Option } = Select;

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
  }

  return <td {...restProps}>{childNode}</td>;
};

function compare(a, b) {
  return a.num - b.num;
}
class Table1 extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: <div style={title}>{"หัวข้อ"}</div>,
        dataIndex: "Table4No",
        key: "Table4No",
        align: "center",
        width: "10%",
      },
      {
        title: <div style={title}>{"กิจกรรม"}</div>,
        dataIndex: "Table4Activity",
        key: "Table4Activity",
        width: "40%",
      },
      {
        title: <div style={title}>{"%FTE"}</div>,
        dataIndex: "Table4FTE",
        key: "Table4FTE",
        width: "10%",
        align: "center",
      },
      {
        title: <div style={title}>{"ระดับความสำเร็จ (พนักงาน)"}</div>,
        dataIndex: "Table4Level",
        key: "Table4Level",
        width: "10%",
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
        width: "10%",
        editable: true,
        align: "center",
      },
      {
        title: <div style={title}>{"คะแนนรวม "}</div>,
        dataIndex: "Table4TotalScore",
        key: "Table4TotalScore",
        width: "10%",
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
        width: "10%",
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
        title: (
          <div style={title}>
            {"ความคิดเห็นเพิ่มเติม/ข้อเสนอแนะ/ปัญหาและอุปสรรค"}
          </div>
        ),
        dataIndex: "Table4Comments",
        key: "Table4Comments",
        width: "40%",
        render: (text, row, index) => {
          return (
            <div
              style={{
                wordWrap: "break-word",
                wordBreak: "break-word",
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
    const id_committee = Cookies.get(token.userId);
    const data = {
      assessment_id: id_assessment,
      employee_id: id_employee,
    };
    const dataCom = {
      assessment_id: id_assessment,
      employee_id: id_employee,
      committee_id: id_committee,
    };
    axios.post(`${url}/dataFormtwo`, data).then((em) => {
      axios.post(`${urlCOM}/dataFormtwo`, dataCom).then((com) => {
        const dataEM = em.data.data.formtwo;
        const dataCOM = com.data.data.formtwoCOM;
        const T4EM = dataEM.filter((v) => v.formtwo_table === 4);
        const T4EMsoft = T4EM.sort(compare);

        const T4COM = dataCOM.filter((v) => v.formtwo_table === 4);
        const T4COMsoft = T4COM.sort(compare);

        this.setState({
          dataSource: T4EMsoft.map((v, i) => ({
            key: i + 1,
            Table4No: i + 1,
            Table4Activity: v.formtwo_name,
            Table4FTE: v.formtwo_fte,
            Table4Level: v.formtwo_sucessem,
            Table4Comments: v.formtwo_comment,
            Table4LevelCom:
              T4COMsoft.length !== 0 ? T4COMsoft[i].formtwo_sucesscom : " ",
          })),
        });
        const rawData = [...this.state.dataSource];
        this.props.changeData(rawData);
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
        <div
          className="row no-gutter mt-4"
          style={{ backgroundColor: "#E7E5E3" }}
        >
          <div className="col-sm-6 mt-4">
            <label style={{ fontSize: "16px", fontWeight: "bold" }}>
              4. การพัฒนาตนเอง
            </label>
          </div>
          <div className="col-sm-6 text-sm-right align-self-sm-end">
            <UploadFile table={4} form={2} />
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
        </div>
      </>
    );
  }
}
export default Table1;
