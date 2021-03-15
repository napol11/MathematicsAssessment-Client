import React from "react";
import { Table } from "antd";
import "moment/locale/th";
import { useDispatch, useSelector } from "react-redux";

import "./committee.css";
const title = { color: "black", fontWeight: "bold", textAlign: "center" };

const CommitteAssessStep2 = (props) => {
  const data = props.data;
  const dispatch = useDispatch();
  const committeeAss2Modal = useSelector((state) => state.committeeAss2Modal);

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
      title: <div style={title}>{"ระดับความสำเร็จ (กรรมการ)"}</div>,
      dataIndex: "levelCommittee",
      key: "levelCommittee",
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
      title: <div style={title}>{"ความคิดเห็น"}</div>,
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: <div style={title}>{null}</div>,
      dataIndex: "upload",
      key: "upload",
      align: "center",
      render: (text, row, index) => {
        const success = text === "success" ? true : false;
        return (
          <div
            style={{
              wordWrap: "break-word",
              wordBreak: "break-word",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() =>
              dispatch({
                type: "set",
                committeeAss2Modal: { ...committeeAss2Modal, show: true },
              })
            }
          >
            {`${success ? "อัพโหลดเอกสารแล้ว" : ""}`}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="row no-gutter">
        <div className="col-sm-6">
          <label
            style={{ fontWeight: "bold", fontSize: "24px", color: "black" }}
          >
            {`ส่วนที่ 2.1 รายการผลการปฏิบัติงาน`}
          </label>
        </div>
        <div
          className="col-sm-6 text-sm-right align-self-sm-end"
          // style={{ display: "flex", justifyContent: "center" }}
        >
          <div className="row justify-content-sm-end">
            <div className="committee2Btn pl-4 pr-4 mr-4">หมายเหตุคะแนน</div>
            <div className="committee2Btn pl-4 pr-4">รหัสกลยุทธ์</div>
          </div>
        </div>
      </div>
      <Table
        rowKey={"head"} // uniq key หรือ primary key ตัวไม่ซ้ำ
        className="committeeTableAssess2 mt-4"
        columns={columns}
        dataSource={data.performanceReport}
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
        size="small"
      />
      <div
        className="mt-3 mb-4"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="pl-4 pr-4 mr-4 btnCancel" onClick={props.prev}>
          ย้อนกลับ
        </div>
        <div className="pl-4 pr-4 mr-4 btnConfirm" onClick={props.next}>
          ถัดไป
        </div>
      </div>
    </div>
  );
};

export default CommitteAssessStep2;
