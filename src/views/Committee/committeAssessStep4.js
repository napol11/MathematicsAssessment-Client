import React from "react";
import { useHistory } from "react-router-dom";

import "./committee.css";

const CommitteAssessStep4 = () => {
  const history = useHistory();

  return (
    <div className="text-center m-0">
      <i
        className="fas fa-check-circle"
        style={{
          fontSize: "150px",
          color: "rgba(240, 77, 34, 0.2)",
          marginTop: "10%",
        }}
      />
      <p className="mt-4 mb-0" style={{ fontWeight: "bold", fontSize: "24px" }}>
        เสร็จสิ้นขั้นตอนการประเมิน
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: "16px",
            borderRadius: "20px",
            width: "200px",
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
          className="btnConfirm"
          onClick={() => history.push("/committee")}
        >
          กลับสู่หน้าหลัก
        </div>
      </div>
    </div>
  );
};

export default CommitteAssessStep4;
