import React, { useEffect, useState } from "react";
import { InputNumber, Table } from "antd";

import "./committee.css";

import { useParams } from "react-router-dom";
import axios from "axios";
const url = `http://localhost:3001/api/employee`;

const title = { color: "black", fontWeight: "bold", textAlign: "center" };

const Table1 = (props) => {
  const columns = [
    {
      title: <div style={title}>{"หัวข้อ"}</div>,
      dataIndex: "no",
      key: "no",
      align: "center",
      width: "80px",
    },
    {
      title: <div style={title}>{"กิจกรรม"}</div>,
      dataIndex: "event",
      key: "event",
    },
    {
      title: <div style={title}>{"%FTE"}</div>,
      dataIndex: "fte",
      key: "fte",
      width: "50px",
      align: "center",
    },
    {
      title: <div style={title}>{"ระดับความสำเร็จ (พนักงาน)"}</div>,
      dataIndex: "levelEmployee",
      key: "levelEmployee",
      width: "80px",
      align: "center",
    },
    {
      title: <div style={title}>{"ระดับความสำเร็จ (กรรมการ)"}</div>,
      dataIndex: "levelCommittee",
      key: "levelCommittee",
      width: "80px",
      align: "center",
      render: (text, row, index) => {
        return (
          <InputNumber
            // readOnly
            value={text}
            style={{
              width: "50px",
              border: "1px solid transparent",
              backgroundColor: "rgba(79, 78, 78, 0.1)",
              borderRadius: "3px",
              color: "red",
              textAlign: "center",
            }}
            onChange={onChange}
            max={20}
            min={0}
          />
        );
      },
    },
    {
      title: <div style={title}>{"คะแนนรวม"}</div>,
      dataIndex: "total",
      key: "total",
      width: "80px",
      align: "center",
      render: (text, row, index) => {
        return (
          <div
            style={{
              wordWrap: "break-word",
              wordBreak: "break-word",
              // textAlign: "center",
            }}
          >
            {row.fte * row.levelCommittee !== "NaN"
              ? " "
              : row.fte * row.levelCommittee}
          </div>
        );
      },
    },
    {
      title: <div style={title}>{"คะแนนรวม %"}</div>,
      dataIndex: "totalpercen",
      key: "totalpercen",
      width: "80px",
      align: "center",
      render: (text, row, index) => {
        return (
          <div
            style={{
              wordWrap: "break-word",
              wordBreak: "break-word",
              // textAlign: "center",
            }}
          >
            {(row.fte * row.levelCommittee) / 4 !== "NaN"
              ? " "
              : (row.fte * row.levelCommittee) / 4}
          </div>
        );
      },
    },
    {
      title: <div style={title}>{"ความคิดเห็น"}</div>,
      dataIndex: "comment",
      key: "comment",
      render: (text, row, index) => {
        return (
          <div
            style={{
              wordWrap: "break-word",
              wordBreak: "break-word",
              // textAlign: "center",
            }}
          >
            {row.comment === "ระบุความคิดเห็น" ? " - " : row.comment}
          </div>
        );
      },
    },
    // {
    //   title: <div style={title}>{null}</div>,
    //   dataIndex: "upload",
    //   key: "upload",
    //   align: "center",
    //   render: (text, row, index) => {
    //     const success = text === "success" ? true : false;
    //     return (
    //       <div
    //         style={{
    //           wordWrap: "break-word",
    //           wordBreak: "break-word",
    //           textAlign: "center",
    //           cursor: "pointer",
    //         }}
    //         onClick={() =>
    //           dispatch({
    //             type: "set",
    //             committeeAss2Modal: { ...committeeAss2Modal, show: true },
    //           })
    //         }
    //       >
    //         {`${success ? "มีเอกสาร" : ""}`}
    //       </div>
    //     );
    //   },
    // },
  ];
  // const data = [];
  const [data, setData] = useState([]);
  const { id, assessment } = useParams();

  const LoadData = () => {
    const id_assessment = `${assessment}`;
    const id_employee = `${id}`;
    const form = {
      employee_id: id_employee,
      assessment_id: id_assessment,
    };
    axios.post(`${url}/dataFormtwo`, form).then((res) => {
      const data = res.data.data.formtwo;
      const T1 = data.filter((v) => v.formtwo_table === 1);
      const raw =
        T1.length !== 0
          ? T1.map((v, i) => ({
              no: i + 1,
              event: v.formtwo_name,
              fte: v.formtwo_fte,
              levelEmployee: v.formtwo_sucessem,
              comment: v.formtwo_comment,
              // levelCommittee: null,
            }))
          : [];
      setData(raw);
    });
  };

  const onChange = (value) => {
    console.log("changed", value);
    // setData({ levelCommittee: value });
  };

  useEffect(() => {
    LoadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   props.changeData(data);
  // }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Table
        className="committeeTableAssess2 mt-4"
        columns={columns}
        dataSource={data}
        title={() => (
          <label style={{ fontSize: "16px", fontWeight: "bold" }}>
            1. การจัดการงานที่รับผิดชอบ
          </label>
        )}
        pagination={false}
        scroll={{ y: 200 }}
        locale={{ emptyText: "ไม่มีข้อมูล" }}
        size="middle"
      />
      <div
        className="mt-3 mb-4"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      ></div>
      {/* {console.log(data)} */}
    </div>
  );
};
export default Table1;
