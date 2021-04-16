import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Form } from "antd";

// import "./App.css";
import "./head.css";

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
        dataIndex: "Table2No",
        key: "Table2No",
        align: "center",
        width: "10%",
      },
      {
        title: <div style={title}>{"กิจกรรม"}</div>,
        dataIndex: "Table2Activity",
        key: "Table2Activity",
        width: "40%",
      },
      {
        title: <div style={title}>{"%FTE"}</div>,
        dataIndex: "Table2FTE",
        key: "Table2FTE",
        width: "10%",
        align: "center",
      },
      {
        title: <div style={title}>{"ระดับความสำเร็จ (พนักงาน)"}</div>,
        dataIndex: "Table2Level",
        key: "Table2Level",
        width: "10%",
        align: "center",
      },
      {
        title: <div style={title}>{"ระดับความสำเร็จ (กรรมการ 1)"}</div>,
        dataIndex: "Table2LevelCOM1",
        key: "Table2LevelCOM1",
        width: "10%",
        align: "center",
      },
      {
        title: <div style={title}>{"ระดับความสำเร็จ (กรรมการ 2)"}</div>,
        dataIndex: "Table2LevelCOM2",
        key: "Table2LevelCOM2",
        width: "10%",
        align: "center",
      },
      {
        title: <div style={title}>{"ระดับความสำเร็จ (กรรมการ 3)"}</div>,
        dataIndex: "Table2LevelCOM3",
        key: "Table2LevelCOM3",
        width: "10%",
        align: "center",
      },
      {
        title: <div style={title}>{"ระดับความสำเร็จ (กรรมการ 4)"}</div>,
        dataIndex: "Table2LevelCOM4",
        key: "Table2LevelCOM4",
        width: "10%",
        align: "center",
      },
      {
        title: (
          <div style={(title, { color: "red" })}>
            {"ระดับความสำเร็จ (หัวหน้า)"}
          </div>
        ),
        dataIndex: "Table2LevelHead",
        key: "Table2LevelHead",
        width: "10%",
        editable: true,
        align: "center",
      },
      {
        title: <div style={title}>{"คะแนนรวม "}</div>,
        dataIndex: "Table2TotalScore",
        key: "Table2TotalScore",
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
              {row.Table2FTE * row.Table2LevelHead === "NaN"
                ? ""
                : row.Table2FTE * row.Table2LevelHead}
            </div>
          );
        },
      },
      {
        title: <div style={title}>{"คะแนนรวม %"}</div>,
        dataIndex: "Table2TotalScorePercent",
        key: "Table2TotalScorePercent",
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
              {(row.Table2FTE * row.Table2LevelHead) / 4 === "NaN"
                ? "  "
                : (row.Table2FTE * row.Table2LevelHead) / 4}
            </div>
          );
        },
      },
      {
        title: <div style={title}>{"ความคิดเห็น"}</div>,
        dataIndex: "Table2Comments",
        align: "center",
        key: "Table2Comments",
        width: "30%",
        render: (text, row, index) => {
          return (
            <div
              style={{
                wordWrap: "break-word",
                wordBreak: "break-word",
                // textAlign: "center",
              }}
            >
              {row.Table2Comments === "ระบุความคิดเห็น"
                ? " - "
                : row.Table2Comments}
            </div>
          );
        },
      },
      {
        title: <div style={title}>{"รหัสกลยุทธ์"}</div>,
        dataIndex: "Table2Code",
        key: "Table2Code",
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
          const T2EM = dataEM.filter((v) => v.formtwo_table === 2);
          const T2COM = dataCOM.filter((v) => v.formtwo_table === 2);
          const T2COMALL = dataCOMALL.filter((v) => v.formtwo_table === 2);
          const T2COMID = T2COMALL.map((e) => e.fk_committee_id);
          const T2COM1 = T2COMALL.filter(
            (e) => e.fk_committee_id === T2COMID[0]
          );
          const T2COM2 = T2COMALL.filter(
            (e) => e.fk_committee_id === T2COMID[1]
          );
          const T2COM3 = T2COMALL.filter(
            (e) => e.fk_committee_id === T2COMID[2]
          );
          const T2COM4 = T2COMALL.filter(
            (e) => e.fk_committee_id === T2COMID[3]
          );
          this.setState({
            dataSource: T2EM.map((v, i) => ({
              key: i + 1,
              Table2No: i + 1,
              Table2Activity: v.formtwo_name,
              Table2FTE: v.formtwo_fte,
              Table2Level: v.formtwo_sucessem,
              Table2Comments: v.formtwo_comment,
              Table2Code: v.formtwo_code,
              Table2LevelCOM1:
                T2COM2.length !== 0 ? T2COM1[i].formtwo_sucesscom : "ยังไม่มี",
              Table2LevelCOM2:
                T2COM2.length !== 0 ? T2COM2[i].formtwo_sucesscom : "ยังไม่มี",
              Table2LevelCOM3:
                T2COM3.length !== 0 ? T2COM3[i].formtwo_sucesscom : "ยังไม่มี",
              Table2LevelCOM4:
                T2COM4.length !== 0 ? T2COM4[i].formtwo_sucesscom : "ยังไม่มี",
              Table2LevelHead:
                T2COM.length !== 0 ? T2COM[i].formtwo_sucesscom : " ",
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
        <Table
          className="committeeTableAssess2 mt-4"
          components={components}
          rowClassName={() => "editable-row"}
          dataSource={dataSource}
          columns={columns}
          title={() => (
            <label style={{ fontSize: "16px", fontWeight: "bold" }}>
              2. การบริหารนโยบาย
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
export default Table2;
