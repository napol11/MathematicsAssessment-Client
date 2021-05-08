import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Form } from "antd";

// import "./App.css";
import "./head.css";

import UploadFile from "./modelUpload";
import Cookies from "js-cookie";
import { token } from "../../config";
import axios from "axios";
const url = `http://localhost:3001/api/employee`;
const urlCOM = `http://localhost:3001/api/committee`;

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

class Table2 extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: <div style={title}>{"หัวข้อ"}</div>,
        dataIndex: "Table3No",
        key: "Table3No",
        align: "center",
        width: "10%",
      },
      {
        title: <div style={title}>{"กิจกรรม"}</div>,
        dataIndex: "Table3Activity",
        key: "Table3Activity",
        width: "40%",
      },
      {
        title: <div style={title}>{"%FTE"}</div>,
        dataIndex: "Table3FTE",
        key: "Table3FTE",
        width: "10%",
        align: "center",
      },
      {
        title: <div style={title}>{"ระดับความสำเร็จ (พนักงาน)"}</div>,
        dataIndex: "Table3Level",
        key: "Table3Level",
        width: "10%",
        align: "center",
      },
      {
        title: <div style={title}>{"ระดับความสำเร็จ (กรรมการ 1)"}</div>,
        dataIndex: "Table3LevelCOM1",
        key: "Table3LevelCOM1",
        width: "10%",
        align: "center",
      },
      {
        title: <div style={title}>{"ระดับความสำเร็จ (กรรมการ 2)"}</div>,
        dataIndex: "Table3LevelCOM2",
        key: "Table3LevelCOM2",
        width: "10%",
        align: "center",
      },
      {
        title: <div style={title}>{"ระดับความสำเร็จ (กรรมการ 3)"}</div>,
        dataIndex: "Table3LevelCOM3",
        key: "Table3LevelCOM3",
        width: "10%",
        align: "center",
      },
      {
        title: <div style={title}>{"ระดับความสำเร็จ (กรรมการ 4)"}</div>,
        dataIndex: "Table3LevelCOM4",
        key: "Table3LevelCOM4",
        width: "10%",
        align: "center",
      },
      {
        title: (
          <div style={(title, { color: "red" })}>
            {"ระดับความสำเร็จ (หัวหน้า)"}
          </div>
        ),
        dataIndex: "Table3LevelHead",
        key: "Table3LevelHead",
        width: "10%",
        editable: true,
        align: "center",
      },
      {
        title: <div style={title}>{"คะแนนรวม "}</div>,
        dataIndex: "Table3TotalScore",
        key: "Table3TotalScore",
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
              {((parseFloat(row.Table3LevelCOM1) +
                parseFloat(row.Table3LevelCOM2) +
                parseFloat(row.Table3LevelCOM3) +
                parseFloat(row.Table3LevelCOM4) +
                parseFloat(row.Table3LevelHead)) /
                5) *
                parseFloat(row.Table3FTE)}
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
              {(((parseFloat(row.Table3LevelCOM1) +
                parseFloat(row.Table3LevelCOM2) +
                parseFloat(row.Table3LevelCOM3) +
                parseFloat(row.Table3LevelCOM4) +
                parseFloat(row.Table3LevelHead)) /
                5) *
                parseFloat(row.Table3FTE)) /
                4}
            </div>
          );
        },
      },
      {
        title: <div style={title}>{"ความคิดเห็น"}</div>,
        dataIndex: "Table3Comments",
        align: "center",
        width: "30%",
        key: "Table3Comments",
        render: (text, row, index) => {
          return (
            <div
              style={{
                wordWrap: "break-word",
                wordBreak: "break-word",
                // textAlign: "center",
              }}
            >
              {row.Table3Comments === "ระบุความคิดเห็น"
                ? " - "
                : row.Table3Comments}
            </div>
          );
        },
      },
      {
        title: <div style={title}>{"รหัสกลยุทธ์"}</div>,
        dataIndex: "Table3Code",
        key: "Table3Code",
        width: "10%",
        align: "center",
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
          const T3EM = dataEM.filter((v) => v.formtwo_table === 3);
          const T3COM = dataCOM.filter((v) => v.formtwo_table === 3);
          const T3COMALL = dataCOMALL.filter((v) => v.formtwo_table === 3);
          const T3COMFILTER = T3COMALL.filter(
            (e) => parseInt(id_committee) !== e.fk_committee_id
          );
          const T3COMID = T3COMFILTER.map((e) => e.fk_committee_id);
          const duplicateID = [...new Set(T3COMID)];
          const T3COM1 = T3COMFILTER.filter(
            (e) => e.fk_committee_id === duplicateID[0]
          );
          const T3COM2 = T3COMFILTER.filter(
            (e) => e.fk_committee_id === duplicateID[1]
          );
          const T3COM3 = T3COMFILTER.filter(
            (e) => e.fk_committee_id === duplicateID[2]
          );
          const T3COM4 = T3COMFILTER.filter(
            (e) => e.fk_committee_id === duplicateID[3]
          );
          this.setState({
            dataSource: T3EM.map((v, i) => ({
              key: i + 1,
              Table3No: i + 1,
              Table3Activity: v.formtwo_name,
              Table3FTE: v.formtwo_fte,
              Table3Level: v.formtwo_sucessem,
              Table3Comments: v.formtwo_comment,
              Table3Code: v.formtwo_code,
              Table3LevelCOM1:
                T3COM1.length !== 0 ? T3COM1[i].formtwo_sucesscom : 0,
              Table3LevelCOM2:
                T3COM2.length !== 0 ? T3COM2[i].formtwo_sucesscom : 0,
              Table3LevelCOM3:
                T3COM3.length !== 0 ? T3COM3[i].formtwo_sucesscom : 0,
              Table3LevelCOM4:
                T3COM4.length !== 0 ? T3COM4[i].formtwo_sucesscom : 0,
              Table3LevelHead:
                T3COM.length !== 0 ? T3COM[i].formtwo_sucesscom : " ",
            })),
          });
          const rawData = [...this.state.dataSource];
          this.props.changeData(rawData);
        });
      });
    });
  }

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
          <br/>
          <label
            className="col-sm-11"
            style={{ fontSize: "16px", fontWeight: "bold" }}
          >
            3. การจัดการแบบข้ามสายงาน
          </label>
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
      </>
    );
  }
}
export default Table2;
