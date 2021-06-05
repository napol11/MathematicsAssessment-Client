import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Select, Form } from "antd";

// import "./App.css";
import "./head.css";

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
        title: <div style={title}>{"%FTE"}</div>,
        dataIndex: "Table1FTE",
        key: "Table1FTE",
        width: "10%",
        align: "center",
      },
      {
        title: <div style={title}>{"ระดับความสำเร็จ (พนักงาน)"}</div>,
        dataIndex: "Table1Level",
        key: "Table1Level",
        width: "10%",
        align: "center",
      },
      {
        title: <div style={title}>{"ระดับความสำเร็จ (กรรมการ 1)"}</div>,
        dataIndex: "Table1LevelCOM1",
        key: "Table1LevelCOM1",
        width: "10%",
        align: "center",
      },
      {
        title: <div style={title}>{"ระดับความสำเร็จ (กรรมการ 2)"}</div>,
        dataIndex: "Table1LevelCOM2",
        key: "Table1LevelCOM2",
        width: "10%",
        align: "center",
      },
      {
        title: <div style={title}>{"ระดับความสำเร็จ (กรรมการ 3)"}</div>,
        dataIndex: "Table1LevelCOM3",
        key: "Table1LevelCOM3",
        width: "10%",
        align: "center",
      },
      {
        title: <div style={title}>{"ระดับความสำเร็จ (กรรมการ 4)"}</div>,
        dataIndex: "Table1LevelCOM4",
        key: "Table1LevelCOM4",
        width: "10%",
        align: "center",
      },
      {
        title: (
          <div style={(title, { color: "red" })}>
            {"ระดับความสำเร็จ (หัวหน้า)"}
          </div>
        ),
        dataIndex: "Table1LevelHead",
        key: "Table1LevelHead",
        width: "10%",
        editable: true,
        align: "center",
      },
      {
        title: <div style={title}>{"คะแนนรวม "}</div>,
        dataIndex: "Table1TotalScore",
        key: "Table1TotalScore",
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
              {((parseFloat(row.Table1LevelCOM1) +
                parseFloat(row.Table1LevelCOM2) +
                parseFloat(row.Table1LevelCOM3) +
                parseFloat(row.Table1LevelCOM4) +
                parseFloat(row.Table1LevelHead)) /
                5) *
                parseFloat(row.Table1FTE)}
            </div>
          );
        },
      },
      {
        title: <div style={title}>{"คะแนนรวม %"}</div>,
        dataIndex: "Table1TotalScorePercent",
        key: "Table1TotalScorePercent",
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
              {(((parseFloat(row.Table1LevelCOM1) +
                parseFloat(row.Table1LevelCOM2) +
                parseFloat(row.Table1LevelCOM3) +
                parseFloat(row.Table1LevelCOM4) +
                parseFloat(row.Table1LevelHead)) /
                5) *
                parseFloat(row.Table1FTE)) /
                4}
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
        dataIndex: "Table1Comments",
        key: "Table1Comments",
        width: "40%",
        render: (text, row, index) => {
          return (
            <div
              style={{
                wordWrap: "break-word",
                wordBreak: "break-word",
              }}
            >
              {row.Table1Comments === "ระบุความคิดเห็น"
                ? " - "
                : row.Table1Comments}
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
        axios.post(`${urlCOM}/dataFormtwoAll`, data).then((comAll) => {
          const dataEM = em.data.data.formtwo;
          const dataCOM = com.data.data.formtwoCOM;
          const dataCOMALL = comAll.data.data;
          const T1EM = dataEM.filter((v) => v.formtwo_table === 1);
          const T1EMsoft = T1EM.sort(compare);
          const T1COM = dataCOM.filter((v) => v.formtwo_table === 1);
          const T1COMsoft = T1COM.sort(compare);

          const T1COMALL = dataCOMALL.filter((v) => v.formtwo_table === 1);
          const T1COMFILTER = T1COMALL.filter(
            (e) => parseInt(id_committee) !== e.fk_committee_id
          );
          const T1COMID = T1COMFILTER.map((e) => e.fk_committee_id);
          const duplicateID = [...new Set(T1COMID)];
          const T1COM1 = T1COMFILTER.filter(
            (e) => e.fk_committee_id === duplicateID[0]
          );
          const T1COM1soft = T1COM1.sort(compare);

          const T1COM2 = T1COMFILTER.filter(
            (e) => e.fk_committee_id === duplicateID[1]
          );
          const T1COM2soft = T1COM2.sort(compare);

          const T1COM3 = T1COMFILTER.filter(
            (e) => e.fk_committee_id === duplicateID[2]
          );
          const T1COM3soft = T1COM3.sort(compare);

          const T1COM4 = T1COMFILTER.filter(
            (e) => e.fk_committee_id === duplicateID[3]
          );
          const T1COM4soft = T1COM4.sort(compare);

          console.log(T1COMFILTER);
          this.setState({
            dataSource: T1EMsoft.map((v, i) => ({
              key: i + 1,
              Table1No: i + 1,
              Table1Activity: v.formtwo_name,
              Table1FTE: v.formtwo_fte,
              Table1Level: v.formtwo_sucessem,
              Table1Comments: v.formtwo_comment,
              Table1LevelCOM1:
                T1COM1soft.length !== 0 ? T1COM1soft[i].formtwo_sucesscom : 0,
              Table1LevelCOM2:
                T1COM2soft.length !== 0 ? T1COM2soft[i].formtwo_sucesscom : 0,
              Table1LevelCOM3:
                T1COM3soft.length !== 0 ? T1COM3soft[i].formtwo_sucesscom : 0,
              Table1LevelCOM4:
                T1COM4soft.length !== 0 ? T1COM4soft[i].formtwo_sucesscom : 0,
              Table1LevelHead:
                T1COMsoft.length !== 0 ? T1COMsoft[i].formtwo_sucesscom : " ",
            })),
          });
          const rawData = [...this.state.dataSource];
          this.props.changeData(rawData);
        });
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
              1. การจัดการงานที่รับผิดชอบ
            </label>
          </div>
          <div className="col-sm-6 text-sm-right align-self-sm-end">
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
        </div>
      </>
    );
  }
}
export default Table1;
