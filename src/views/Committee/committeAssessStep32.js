import React from "react";

import "./committee.css";

const CommitteAssessStep32 = (props) => {
  const data = props.data.EvaForm32;

  const Employee = () => {
    const styleTile = { marginLeft: "10%" };
    const styleDetail = {
      fontWeight: "bold",
      marginLeft: "20%",
      marginBottom: 0,
    };
    const values = data.Employee.map((r, i) => {
      const detail = r.detail.map((row, index) => {
        const txt =
          r.detail.length > 1 ? (
            <p key={`D${index}`} style={styleDetail}>{`${index + 1}. ${
              row.message
            }`}</p>
          ) : (
            <p key={`D${index}`} style={styleDetail}>{` ${row.message}`}</p>
          );
        return txt;
      });

      return (
        <div>
          <p
            key={`T${i}`}
            className={i !== 0 ? "mt-5" : ""}
            style={styleTile}
          >{`${i + 1}. ${r.title}`}</p>
          {detail}
        </div>
      );
    });
    return values;
  };

  const Committee = () => {
    const styleTitle = { marginBottom: 0 };
    const value = data.Committee.map((row, index) => {
      return (
        <div>
          <p
            key={`p${index}`}
            className={index !== 0 ? "mt-5 mb-2" : "mb-2"}
            style={styleTitle}
          >{`${index + 1}. ${row.title}`}</p>
          <textarea
            key={`area${index}`}
            onChange={(e) => Comment(e, row, index)}
            style={{
              width: "100%",
              backgroundColor: "#E7E5E3",
              border: "1px solid transparent",
              borderRadius: "10px",
            }}
            placeholder="กรุณาแสดงความคิดเห็น"
            rows="4"
            value={row.comment}
          />
        </div>
      );
    });

    return value;
  };

  const Comment = (e, row, index) => {
    const val = [...data.Committee];
    val.splice(index, 1, { ...row, comment: e.target.value });
    props.setData({
      ...props.data,
      EvaForm32: { ...data, Committee: val },
    });
  };

  return (
    <div>
      <div className="row no-gutter">
        <div className="col-sm-12">
          <label
            style={{ fontWeight: "bold", fontSize: "24px", color: "black" }}
          >
            {`ส่วนที่ 3 การพัฒนาและฝึกอบรม`}
          </label>
        </div>
      </div>
      <div className="row no-gutter mt-2">
        <div
          className="col-sm-6 p-0"
          style={{ borderRight: "4px solid white" }}
        >
          <div
            style={{
              height: "36px",
              backgroundColor: "#fbdb8a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            พนักงาน
          </div>
          <div
            style={{
              backgroundColor: "#F8F6F3",
              padding: "3%",
            }}
          >
            {Employee()}
          </div>
        </div>
        <div className="col-sm-6 p-0" style={{ borderLeft: "4px solid white" }}>
          <div
            style={{
              height: "36px",
              backgroundColor: "#fbdb8a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ผู้ประเมิน
          </div>
          <div
            style={{
              backgroundColor: "#F8F6F3",
              padding: "3%",
            }}
          >
            {Committee()}
          </div>
        </div>
      </div>
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

export default CommitteAssessStep32;
