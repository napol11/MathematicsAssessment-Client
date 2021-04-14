import React from "react";
import { date2Thai } from "../CustomFunction";
import moment from "moment";
import "moment/locale/th";
import "./head.css";
import { useHistory } from "react-router-dom";

const CommitteAssessStep1 = (props) => {
  const data = props.data;
  const history = useHistory();

  // const salaryHistory = () => {
  //   if (data.salaryHistory !== undefined) {
  //     if (data.salaryHistory.length) {
  //       return (
  //         <div className="col-sm-12">
  //           <label
  //             className="m-0"
  //             style={{ color: "#5f5f5f", fontSize: "14px" }}
  //           >
  //             ปีงบประมาณ
  //           </label>
  //           {data.salaryHistory.map((r, i) => {
  //             return (
  //               <p
  //                 key={i}
  //                 className="m-0"
  //                 style={{ color: "black", fontSize: "16px" }}
  //               >
  //                 {`${r.start ? date2Thai(r.start, true) : null} - ${
  //                   r.end ? date2Thai(r.end, true) : null
  //                 }`}
  //               </p>
  //             );
  //           })}
  //         </div>
  //       );
  //     } else {
  //       return "-";
  //     }
  //   } else {
  //     return "-";
  //   }
  // };
  // const punishHistory = () => {
  //   if (data.punishHistory !== undefined) {
  //     if (data.punishHistory.length > 0) {
  //       return (
  //         <div className="col-sm-12">
  //           <label
  //             className="m-0"
  //             style={{ color: "#5f5f5f", fontSize: "14px" }}
  //           >
  //             ปีงบประมาณ
  //           </label>

  //           {data.punishHistory.map((r, i) => {
  //             return (
  //               <p
  //                 key={i}
  //                 className="m-0"
  //                 style={{ color: "black", fontSize: "16px" }}
  //               >
  //                 {`${r.start ? date2Thai(r.start, true) : null} - ${
  //                   r.end ? date2Thai(r.end, true) : null
  //                 }`}
  //               </p>
  //             );
  //           })}
  //         </div>
  //       );
  //     } else {
  //       return "-";
  //     }
  //   } else {
  //     return "-";
  //   }
  // };
  return (
    <div>
      <label style={{ fontWeight: "bold", fontSize: "24px", color: "black" }}>
        {`ส่วนที่ 1 ข้อมูลทั่วไปเกี่ยวกับพนักงาน`}
      </label>
      <div
        style={{
          padding: "14px",
          borderRadius: "4px",
          backgroundColor: "rgba(79, 78, 78, 0.04)",
        }}
      >
        <div>
          <div className="row no-gutter">
            <div className="col-sm-12">
              <label
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  color: "black",
                }}
              >
                {`ข้อมูลทั่วไป`}
              </label>
            </div>
          </div>
          <div className="row no-gutter pl-4 pr-4">
            <div className="col-sm-3">
              <label
                className="m-0"
                style={{ color: "#5f5f5f", fontSize: "14px" }}
              >
                ชื่อ-สกุล
              </label>
              <br />
              <label
                className="m-0"
                style={{ color: "black", fontSize: "16px" }}
              >
                {`${data.information ? data.information.firstName : null} ${
                  data.information ? data.information.lastName : null
                }`}
              </label>
            </div>
            <div className="col-sm-2">
              <label
                className="m-0"
                style={{ color: "#5f5f5f", fontSize: "14px" }}
              >
                ตำแหน่ง
              </label>
              <br />
              <label
                className="m-0"
                style={{ color: "black", fontSize: "16px" }}
              >
                {`${data.information ? data.information.position : null}`}
              </label>
            </div>
            <div className="col-sm-2">
              <label
                className="m-0"
                style={{ color: "#5f5f5f", fontSize: "14px" }}
              >
                เลขที่
              </label>
              <br />
              <label
                className="m-0"
                style={{ color: "black", fontSize: "16px" }}
              >
                {`${data.information ? data.information.number : null}`}
              </label>
            </div>
            <div className="col-sm-2">
              <label
                className="m-0"
                style={{ color: "#5f5f5f", fontSize: "14px" }}
              >
                ระดับ
              </label>
              <br />
              <label
                className="m-0"
                style={{ color: "black", fontSize: "16px" }}
              >
                {`${data.information ? data.information.level : null}`}
              </label>
            </div>
            <div className="col-sm-3">
              <label
                className="m-0"
                style={{ color: "#5f5f5f", fontSize: "14px" }}
              >
                สังกัด
              </label>
              <br />
              <label
                className="m-0"
                style={{ color: "black", fontSize: "16px" }}
              >
                {`${data.information ? data.information.division : null}`}
              </label>
            </div>
          </div>
          <div className="row no-gutter pl-4 pr-4 mt-3">
            <div className="col-sm-5">
              <label
                className="m-0"
                style={{ color: "#5f5f5f", fontSize: "14px" }}
              >
                เริ่มปฏิบัติงานเมื่อ
              </label>
              <br />
              <label
                className="m-0"
                style={{ color: "black", fontSize: "16px" }}
              >
                {`${
                  data.information
                    ? `วันที่ ${date2Thai(data.information.startTimes, true)
                        .toString()
                        .substring(0, 2)}
                            เดือน ${date2Thai(data.information.startTimes, true)
                              .toString()
                              .substring(
                                3,
                                date2Thai(
                                  data.information.startTimes,
                                  true
                                ).toString().length - 4
                              )}
                              พ.ศ. ${date2Thai(
                                data.information.startTimes,
                                true
                              )
                                .toString()
                                .substring(
                                  date2Thai(
                                    data.information.startTimes,
                                    true
                                  ).toString().length - 4,
                                  date2Thai(
                                    data.information.startTimes,
                                    true
                                  ).toString().length
                                )}
                            `
                    : null
                }`}
              </label>
            </div>
            <div className="col-sm-7">
              <label
                className="m-0"
                style={{ color: "#5f5f5f", fontSize: "14px" }}
              >
                รวมเวลาปฏิบัติงาน
              </label>
              <br />
              <label
                className="m-0"
                style={{ color: "black", fontSize: "16px" }}
              >
                {`${
                  data.information
                    ? moment(data.information.startTimes, "YYYY-MM-DD").fromNow(
                        true
                      )
                    : null
                }`}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div
        className="mt-4"
        style={{
          padding: "14px",
          borderRadius: "4px",
          backgroundColor: "rgba(79, 78, 78, 0.04)",
        }}
      >
        <div className="row no-gutter">
          <div className="col-sm-12">
            <label
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "black",
              }}
            >
              {`ประวัติการลา`}
            </label>
          </div>
        </div>
        {/* <div className="row no-gutter pl-4 pr-4">
          <div className="col-sm-12">
            <label
              className="m-0"
              style={{ color: "#5f5f5f", fontSize: "14px" }}
            >
              การลาศึกษาต่อ
            </label>
            <br />
            <label className="m-0" style={{ color: "black", fontSize: "16px" }}>
              {`${data.leaveHistory ? data.leaveHistory.studieLeave : null}`}
            </label>
          </div>
        </div> */}
        {/* <div className="row no-gutter pl-4 pr-4 mt-2">
          <div className="col-sm-12">
            <label
              className="m-0"
              style={{ color: "#5f5f5f", fontSize: "14px" }}
            >
              เวลาปฏิบัติงานในรอบปีงบประมาณที่ผ่านมา
            </label>
            <br />
            <label className="m-0" style={{ color: "black", fontSize: "16px" }}>
              {`${
                data.leaveHistory
                  ? date2Thai(data.leaveHistory.startWork, true)
                  : null
              }
                  ${`-`}
                  ${
                    data.leaveHistory
                      ? date2Thai(data.leaveHistory.endWork, true)
                      : null
                  }
                  `}
            </label>
          </div>
        </div> */}
        <div className="row no-gutter pl-4 pr-4 mt-2">
          <div className="col-sm-3">
            <label
              className="m-0"
              style={{ color: "#5f5f5f", fontSize: "14px" }}
            >
              ลาป่วย
            </label>
            <br />
            <label className="m-0" style={{ color: "black", fontSize: "16px" }}>
              {`${
                data.leaveHistory
                  ? data.leaveHistory.sickLeave === 0
                    ? "-"
                    : `${data.leaveHistory.sickLeave} วัน`
                  : "-"
              }`}
            </label>
          </div>
          <div className="col-sm-3">
            <label
              className="m-0"
              style={{ color: "#5f5f5f", fontSize: "14px" }}
            >
              ลาป่วย ที่มีใบรับรองแพทย์
            </label>
            <br />
            <label className="m-0" style={{ color: "black", fontSize: "16px" }}>
              {`${
                data.leaveHistory
                  ? data.leaveHistory.sickLeaveMedical === 0
                    ? "-"
                    : `${data.leaveHistory.sickLeaveMedical} วัน`
                  : "-"
              }`}
            </label>
          </div>
          <div className="col-sm-3">
            <label
              className="m-0"
              style={{ color: "#5f5f5f", fontSize: "14px" }}
            >
              ลากิจ
            </label>
            <br />
            <label className="m-0" style={{ color: "black", fontSize: "16px" }}>
              {`${
                data.leaveHistory
                  ? data.leaveHistory.businessLeave === 0
                    ? "-"
                    : `${data.leaveHistory.businessLeave} วัน`
                  : "-"
              }`}
            </label>
          </div>
          <div className="col-sm-3">
            <label
              className="m-0"
              style={{ color: "#5f5f5f", fontSize: "14px" }}
            >
              มาสาย
            </label>
            <br />
            <label className="m-0" style={{ color: "black", fontSize: "16px" }}>
              {`${
                data.leaveHistory
                  ? data.leaveHistory.late === 0
                    ? "-"
                    : `${data.leaveHistory.late} วัน`
                  : "-"
              }`}
            </label>
          </div>
        </div>
        <div className="row no-gutter pl-4 pr-4 mt-2">
          <div className="col-sm-3">
            <label
              className="m-0"
              style={{ color: "#5f5f5f", fontSize: "14px" }}
            >
              ลาพักผ่อน
            </label>
            <br />
            <label className="m-0" style={{ color: "black", fontSize: "16px" }}>
              {`${
                data.leaveHistory
                  ? data.leaveHistory.holiday === 0
                    ? "-"
                    : `${data.leaveHistory.holiday} วัน`
                  : "-"
              }`}
            </label>
          </div>
          <div className="col-sm-3">
            <label
              className="m-0"
              style={{ color: "#5f5f5f", fontSize: "14px" }}
            >
              ลาคลอดบุตร
            </label>
            <br />
            <label className="m-0" style={{ color: "black", fontSize: "16px" }}>
              {`${
                data.leaveHistory
                  ? data.leaveHistory.MaternityLeave === 0
                    ? "-"
                    : `${data.leaveHistory.MaternityLeave} วัน`
                  : "-"
              }`}
            </label>
          </div>
          <div className="col-sm-3">
            <label
              className="m-0"
              style={{ color: "#5f5f5f", fontSize: "14px" }}
            >
              ลาอุปสมบท
            </label>
            <br />
            <label className="m-0" style={{ color: "black", fontSize: "16px" }}>
              {`${
                data.leaveHistory
                  ? data.leaveHistory.ordainLeave === 0
                    ? "-"
                    : `${data.leaveHistory.ordainLeave} วัน`
                  : "-"
              }`}
            </label>
          </div>
          <div className="col-sm-3">
            <label
              className="m-0"
              style={{ color: "#5f5f5f", fontSize: "14px" }}
            >
              ขาดราชการ
            </label>
            <br />
            <label className="m-0" style={{ color: "black", fontSize: "16px" }}>
              {`${
                data.leaveHistory
                  ? data.leaveHistory.govermentLack === 0
                    ? "-"
                    : `${data.leaveHistory.govermentLack} วัน`
                  : "-"
              }`}
            </label>
          </div>
        </div>
      </div>
      <div
        className="mt-4"
        style={{
          padding: "14px",
          borderRadius: "4px",
          backgroundColor: "rgba(79, 78, 78, 0.04)",
        }}
      >
        <div className="row no-gutter">
          <div className="col-sm-12">
            <label
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "black",
              }}
            >
              {`ประวัติการเลื่อนขั้นเงินเดือน`}
            </label>
          </div>
        </div>
        <div className="row no-gutter pl-4 pr-4 mt-2">
          {/* {salaryHistory()} */}
          <label className="m-0" style={{ color: "black", fontSize: "16px" }}>
            {/* {`${data.salaryHistory ? data.salaryHistory.text : null}`} */}
            {`${
              data.salaryHistory
                ? data.salaryHistory.text === ""
                  ? "-"
                  : `${data.salaryHistory.text}`
                : "-"
            }`}
          </label>
        </div>
      </div>

      <div
        className="mt-4"
        style={{
          padding: "14px",
          borderRadius: "4px",
          backgroundColor: "rgba(79, 78, 78, 0.04)",
        }}
      >
        <div className="row no-gutter">
          <div className="col-sm-12">
            <label
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "black",
              }}
            >
              {`ประวัติการถูกลงโทษทางวินัย`}
            </label>
          </div>
        </div>
        <div className="row no-gutter pl-4 pr-4 mt-2">
          {/* {punishHistory()} */}
          {/* {`${data.punishHistory ? data.punishHistory.text : null}`} */}
          {`${
            data.punishHistory
              ? data.punishHistory.text === ""
                ? "-"
                : `${data.punishHistory.text}`
              : "-"
          }`}
        </div>
      </div>

      <div
        className="mt-3 mb-4"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          className="pl-4 pr-4 mr-4 btnCancel"
          onClick={() => history.push("/head")}
        >
          ยกเลิก
        </div>
        <div className="pl-4 pr-4 mr-4 btnConfirm" onClick={props.next}>
          ถัดไป
        </div>
      </div>
    </div>
  );
};

export default CommitteAssessStep1;
