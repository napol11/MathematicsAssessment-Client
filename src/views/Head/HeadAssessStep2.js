import React, { useState } from "react";
import "moment/locale/th";

import { useParams } from "react-router-dom";
import "./head.css";
import Table1 from "../Head/Table1";
import Table2 from "../Head/Table2";
import Table3 from "../Head/Table3";
import Table4 from "../Head/Table4";
import { notify } from "../CustomComponent";

import Cookies from "js-cookie";
import { token } from "../../config";
import axios from "axios";
const url = `http://localhost:3001/api/committee`;

const CommitteAssessStep2 = (props) => {
  const { id, assessment } = useParams();
  const [dataT1, setDataT1] = useState([]);
  const [dataT2, setDataT2] = useState([]);
  const [dataT3, setDataT3] = useState([]);
  const [dataT4, setDataT4] = useState([]);

  const onFinish = () => {
    let _list = [];
    dataT1.forEach((v) => {
      let f = {};
      f.formtwo_table = "1";
      f.formtwo_sucesscom = v.Table1LevelHead;
      _list.push(f);
    });
    dataT2.forEach((v) => {
      let f = {};
      f.formtwo_table = "2";
      f.formtwo_sucesscom = v.Table2LevelHead;
      _list.push(f);
    });
    dataT3.forEach((v) => {
      let f = {};
      f.formtwo_table = "3";
      f.formtwo_sucesscom = v.Table3LevelHead;
      _list.push(f);
    });
    dataT4.forEach((v) => {
      let f = {};
      f.formtwo_table = "4";
      f.formtwo_sucesscom = v.Table4LevelHead;
      _list.push(f);
    });
    // console.log(dataT1);
    const id_assessment = `${assessment}`;
    const id_employee = `${id}`;
    const id_committee = Cookies.get(token.userId);
    const data = {
      assessment_id: id_assessment,
      employee_id: id_employee,
      committee_id: id_committee,
      formtwo: _list,
    };
    // console.log(data);
    axios
      .post(`${url}/formtwo`, data)
      .then((res) => {
        console.log(res);
        notify.success("บันทึกสำเร็จ !");
      })
      .catch((err) => {
        console.log(err);
        notify.error("บันทึกไม่สำเร็จ !");
      });
  };

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
      </div>
      <Table1
        data={dataT1}
        changeData={(dataT1) => setDataT1(dataT1)}
        pathEM={`${id}`}
        pathAS={`${assessment}`}
      />
      <Table2
        data={dataT2}
        changeData={(dataT2) => setDataT2(dataT2)}
        pathEM={`${id}`}
        pathAS={`${assessment}`}
      />
      <Table3
        data={dataT3}
        changeData={(dataT3) => setDataT3(dataT3)}
        pathEM={`${id}`}
        pathAS={`${assessment}`}
      />
      <Table4
        data={dataT4}
        changeData={(dataT4) => setDataT4(dataT4)}
        pathEM={`${id}`}
        pathAS={`${assessment}`}
      />

      <div
        className="mt-4 mb-4"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="pl-3 pr-3 mr-4 btnCancel" onClick={props.prev}>
          ย้อนกลับ
        </div>
        <div className="mr-4">
          <button className="btn-modal-confirm" type="submit" onClick={onFinish}>
            บันทึก
          </button>
        </div>
        <div className="pl-4 pr-4 btnConfirm" onClick={props.next}>
          ถัดไป
        </div>
      </div>
      
    </div>
  );
};

export default CommitteAssessStep2;
