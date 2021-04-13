import React, { useState, useEffect } from "react";
import { Table, InputNumber } from "antd";

import "./committee.css";

import { useParams } from "react-router-dom";
import axios from "axios";
const url = `http://localhost:3001/api/employee`;

const title = { color: "black", fontWeight: "bold", textAlign: "center" };

const Table3 = () => {
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
            max={20}
            min={0}
            // onPressEnter={onChangeValue()}
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
    {
      title: <div style={title}>{"รหัสกลยุทธ์"}</div>,
      dataIndex: "code",
      key: "code",
      width: "100px",
      align: "center",
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
      // console.log(res);
      const data = res.data.data.formtwo;
      const T2 = data.filter((v) => v.formtwo_table === 2);
      const raw =
        T2.length !== 0
          ? T2.map((v, i) => ({
              no: i + 1,
              event: v.formtwo_name,
              fte: v.formtwo_fte,
              levelEmployee: v.formtwo_sucessem,
              comment: v.formtwo_comment,
              code: v.formtwo_code,
            }))
          : [];
      // console.log(raw);
      setData(raw);
    });
  };

  useEffect(() => {
    LoadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div>
      <Table
        rowKey={"head"} // uniq key หรือ primary key ตัวไม่ซ้ำ
        className="committeeTableAssess2 mt-4"
        columns={columns}
        dataSource={data}
        title={() => (
          <label style={{ fontSize: "16px", fontWeight: "bold" }}>
            3. การจัดการแบบข้ามสายงาน
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
    </div>
  );
};
export default Table3;
