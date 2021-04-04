import React from "react";
import { Table } from "antd";

import "./head.css";
const title = { color: "black", fontWeight: "bold", textAlign: "center" };

const Table1 = () => {
  const columns = [
    {
      title: <div style={title}>{"หัวข้อ"}</div>,
      dataIndex: "head",
      key: "head",
      align: "center",
      width: "80px",
    },
    {
      title: <div style={title}>{"กิจกรรม"}</div>,
      dataIndex: "event",
      key: "event",
    },
    {
      title: <div style={title}>{"%FTE (A)"}</div>,
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
      title: <div style={title}>{"ระดับความสำเร็จ (กรรมการ1)"}</div>,
      dataIndex: "levelCommittee1",
      key: "levelCommittee1",
      width: "80px",
      align: "center",
      render: (text, row, index) => {
        return (
          <input
            readOnly
            value={text}
            style={{
              width: "50px",
              border: "1px solid transparent",
              backgroundColor: "rgba(79, 78, 78, 0.1)",
              borderRadius: "3px",
            }}
          />
        );
      },
    },
    {
      title: <div style={title}>{"ระดับความสำเร็จ (กรรมการ2)"}</div>,
      dataIndex: "levelCommittee2",
      key: "levelCommittee2",
      width: "80px",
      align: "center",
      render: (text, row, index) => {
        return (
          <input
            readOnly
            value={text}
            style={{
              width: "50px",
              border: "1px solid transparent",
              backgroundColor: "rgba(79, 78, 78, 0.1)",
              borderRadius: "3px",
            }}
          />
        );
      },
    },
    {
      title: <div style={title}>{"ระดับความสำเร็จ (กรรมการ3)"}</div>,
      dataIndex: "levelCommittee3",
      key: "levelCommittee3",
      width: "80px",
      align: "center",
      render: (text, row, index) => {
        return (
          <input
            readOnly
            value={text}
            style={{
              width: "50px",
              border: "1px solid transparent",
              backgroundColor: "rgba(79, 78, 78, 0.1)",
              borderRadius: "3px",
            }}
          />
        );
      },
    },
    {
      title: <div style={title}>{"ระดับความสำเร็จ (กรรมการ4)"}</div>,
      dataIndex: "levelCommittee4",
      key: "levelCommittee4",
      width: "80px",
      align: "center",
      render: (text, row, index) => {
        return (
          <input
            readOnly
            value={text}
            style={{
              width: "50px",
              border: "1px solid transparent",
              backgroundColor: "rgba(79, 78, 78, 0.1)",
              borderRadius: "3px",
            }}
          />
        );
      },
    },
    {
      title: <div style={title}>{"ระดับความสำเร็จ (หัวหน้า)"}</div>,
      dataIndex: "levelCommitteeHead",
      key: "levelCommitteeHead",
      width: "80px",
      align: "center",
      render: (text, row, index) => {
        return (
          <input
            readOnly
            value={text}
            style={{
              width: "50px",
              border: "1px solid transparent",
              backgroundColor: "rgba(79, 78, 78, 0.1)",
              borderRadius: "3px",
            }}
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
    },
    {
      title: <div style={title}>{"คะแนนรวม %"}</div>,
      dataIndex: "totalpercen",
      key: "totalpercen",
      width: "80px",
      align: "center",
    },
    {
      title: <div style={title}>{"ความคิดเห็น"}</div>,
      dataIndex: "comment",
      key: "comment",
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
  const data = [];
  return (
    <div>
      <Table
        rowKey={"head"} // uniq key หรือ primary key ตัวไม่ซ้ำ
        className="committeeTableAssess2 mt-4"
        columns={columns}
        dataSource={data}
        title={() => (
          <label style={{ fontSize: "16px", fontWeight: "bold" }}>
            1. การจัดการงานที่รับผิดชอบ
          </label>
        )}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
          locale: { items_per_page: "/ หน้า" },
        }}
        // loading={{
        //   spinning: LoadingTable,
        //   tip: "กำลังโหลด...",
        //   size: "large",
        // }}
        locale={{ emptyText: "ไม่มีข้อมูล" }}
        scroll={{ y: 500 }}
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
export default Table1;
