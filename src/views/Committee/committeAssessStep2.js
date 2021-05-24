import React, { useState, useEffect } from "react";
import "moment/locale/th";

import { useParams } from "react-router-dom";
import "./committee.css";
import Table1 from "../Committee/Table1";
import Table2 from "../Committee/Table2";
import Table3 from "../Committee/Table3";
import Table4 from "../Committee/Table4";
import { notify } from "../CustomComponent";

import Cookies from "js-cookie";
import { token } from "../../config";
import axios from "axios";
const url = `https://database-api-pj.herokuapp.com/api/committee`;

const CommitteAssessStep2 = (props) => {
  const { id, assessment } = useParams();
  const [dataT1, setDataT1] = useState([]);
  const [dataT2, setDataT2] = useState([]);
  const [dataT3, setDataT3] = useState([]);
  const [dataT4, setDataT4] = useState([]);
  // const [total, setTotal] = useState("");
  const [totalpercen, setTotalpercen] = useState("");
  const [fte, setFte] = useState("");

  const onFinish = () => {
    let _list = [];
    dataT1.forEach((v) => {
      let f = {};
      f.formtwo_table = "1";
      f.num = v.Table1No;
      f.formtwo_sucesscom = v.Table1LevelCom;
      _list.push(f);
    });
    dataT2.forEach((v) => {
      let f = {};
      f.formtwo_table = "2";
      f.num = v.Table2No;
      f.formtwo_sucesscom = v.Table2LevelCom;
      _list.push(f);
    });
    dataT3.forEach((v) => {
      let f = {};
      f.formtwo_table = "3";
      f.num = v.Table3No;
      f.formtwo_sucesscom = v.Table3LevelCom;
      _list.push(f);
    });
    dataT4.forEach((v) => {
      let f = {};
      f.formtwo_table = "4";
      f.num = v.Table4No;
      f.formtwo_sucesscom = v.Table4LevelCom;
      _list.push(f);
    });
    // console.log(_list);
    const id_assessment = `${assessment}`;
    const id_employee = `${id}`;
    const id_committee = Cookies.get(token.userId);
    const data = {
      assessment_id: id_assessment,
      employee_id: id_employee,
      committee_id: id_committee,
      formtwo: _list,
    };
    console.log(data);
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

  useEffect(() => {
    let _list = [];
    dataT1.forEach((v) => {
      let f = {};
      f.formtwo_table = "1";
      f.formtwo_fte = v.Table1FTE;
      f.num = v.Table1No;
      f.totle = v.Table1FTE * v.Table1LevelCom;
      f.totlepercen = (v.Table1FTE * v.Table1LevelCom) / 4;
      _list.push(f);
    });
    dataT2.forEach((v) => {
      let f = {};
      f.formtwo_table = "2";
      f.num = v.Table2No;
      f.totle = v.Table2FTE * v.Table2LevelCom;
      f.formtwo_fte = v.Table2FTE;
      f.totlepercen = (v.Table2FTE * v.Table2LevelCom) / 4;
      _list.push(f);
    });
    dataT3.forEach((v) => {
      let f = {};
      f.formtwo_table = "3";
      f.num = v.Table3No;
      f.formtwo_fte = v.Table3FTE;
      f.totle = v.Table3FTE * v.Table3LevelCom;
      f.totlepercen = (v.Table3FTE * v.Table3LevelCom) / 4;
      _list.push(f);
    });
    dataT4.forEach((v) => {
      let f = {};
      f.formtwo_table = "4";
      f.num = v.Table4No;
      f.formtwo_fte = v.Table4FTE;
      f.totle = v.Table4FTE * v.Table4LevelCom;
      f.totlepercen = (v.Table4FTE * v.Table4LevelCom) / 4;
      _list.push(f);
    });
    // let result = 0;
    // for (let i = 0; i < _list.length; i++) {
    //   result += parseInt(_list[i].totle);
    // }
    let resultpercen = 0;
    for (let i = 0; i < _list.length; i++) {
      resultpercen += parseFloat(_list[i].totlepercen);
    }
    let fte = 0;
    for (let i = 0; i < _list.length; i++) {
      fte += parseInt(_list[i].formtwo_fte);
    }
    setFte(fte);
    setTotalpercen(resultpercen);
    // setTotal(result);
  }, [dataT1, dataT2, dataT3, dataT4]); // eslint-disable-line react-hooks/exhaustive-deps

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
      <div className="col-sm-12">
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
      </div>
      <div className="col-sm-12 mt-4">
        <label
          className="col-sm-4"
          style={{
            fontWeight: "bold",
            fontSize: "16px",
            color: "black",
            textAlign: "center",
          }}
        >
          {`รวม`}
        </label>
        <label
          className="col-sm-1"
          style={{ fontWeight: "bold", fontSize: "16px", color: "black" }}
        >
          {`%FTE = ${fte}`}
        </label>
        <label
          className="col-sm-4"
          style={{
            fontWeight: "bold",
            fontSize: "16px",
            color: "black",
            marginLeft: "5%",
          }}
        >
          {`คะแนนรวม % = ${totalpercen} คะแนน (คะแนนเต็ม 100 คะแนน)`}
        </label>
      </div>
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
          <button
            className="btn-modal-confirm"
            type="submit"
            onClick={onFinish}
          >
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
