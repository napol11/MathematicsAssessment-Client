import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./App.css";

import GuidePoint from "./GuidePoint";
import GuideCode from "./GuideCode";
import Form2Table1 from "./Form2Table1";
import Form2Table2 from "./Form2Table2";
import Form2Table3 from "./Form2Table3";
import Form2Table4 from "./Form2Table4";

// import Table1 from "./table1";

import Cookies from "js-cookie";
import { token } from "../../config";
import { notify } from "../CustomComponent";
import axios from "axios";
const url = `https://database-api-pj.herokuapp.com/api/employee`;

function UserForm2() {
  const { id } = useParams();
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
      f.formtwo_name = v.Table1Activity;
      f.formtwo_fte = v.Table1FTE;
      f.formtwo_sucessem = v.Table1Level;
      f.formtwo_comment = v.Table1Comments;
      _list.push(f);
    });
    dataT2.forEach((v) => {
      let f = {};
      f.formtwo_table = "2";
      f.num = v.Table2No;
      f.formtwo_name = v.Table2Activity;
      f.formtwo_fte = v.Table2FTE;
      f.formtwo_sucessem = v.Table2Level;
      f.formtwo_comment = v.Table2Comments;
      f.formtwo_code = v.Table2Code;
      _list.push(f);
    });
    dataT3.forEach((v) => {
      let f = {};
      f.formtwo_table = "3";
      f.num = v.Table3No;
      f.formtwo_name = v.Table3Activity;
      f.formtwo_fte = v.Table3FTE;
      f.formtwo_sucessem = v.Table3Level;
      f.formtwo_comment = v.Table3Comments;
      f.formtwo_code = v.Table3Code;
      _list.push(f);
    });
    dataT4.forEach((v) => {
      let f = {};
      f.formtwo_table = "4";
      f.num = v.Table4No;
      f.formtwo_name = v.Table4Activity;
      f.formtwo_fte = v.Table4FTE;
      f.formtwo_sucessem = v.Table4Level;
      f.formtwo_comment = v.Table4Comments;
      _list.push(f);
    });
    let result = 0;
    for (let i = 0; i < _list.length; i++) {
      result += parseInt(_list[i].formtwo_fte);
    }
    if (result < 100) {
      console.log("น้อยกว่า 100 ");
      notify.error("ค่า FTE รวมยังไม่ถึง 100% !");
    } else if (result > 100) {
      console.log("มากกว่า 100");
      notify.error("ค่า FTE รวมเกิน 100% !");
    } else if (result === 100) {
      const id_assessment = `${id}`;
      const id_employee = Cookies.get(token.userId);
      const data = {
        assessment_id: id_assessment,
        employee_id: id_employee,
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
    }
  };

  useEffect(() => {
    let _list = [];
    dataT1.forEach((v) => {
      let f = {};
      f.formtwo_table = "1";
      f.num = v.Table1No;
      f.formtwo_fte = v.Table1FTE;
      f.totle = v.Table1FTE * v.Table1Level;
      f.totlepercen = (v.Table1FTE * v.Table1Level) / 4;
      _list.push(f);
    });
    dataT2.forEach((v) => {
      let f = {};
      f.formtwo_table = "2";
      f.num = v.Table2No;
      f.totle = v.Table2FTE * v.Table2Level;
      f.formtwo_fte = v.Table2FTE;
      f.totlepercen = (v.Table2FTE * v.Table2Level) / 4;
      _list.push(f);
    });
    dataT3.forEach((v) => {
      let f = {};
      f.formtwo_table = "3";
      f.num = v.Table3No;
      f.formtwo_fte = v.Table3FTE;
      f.totle = v.Table3FTE * v.Table3Level;
      f.totlepercen = (v.Table3FTE * v.Table3Level) / 4;
      _list.push(f);
    });
    dataT4.forEach((v) => {
      let f = {};
      f.formtwo_table = "4";
      f.num = v.Table4No;
      f.formtwo_fte = v.Table4FTE;
      f.totle = v.Table4FTE * v.Table4Level;
      f.totlepercen = (v.Table4FTE * v.Table4Level) / 4;
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
    <div style={{ width: "100%" }}>
      <div className="userform2">
        <div className="row no-gutter">
          <div className="col-sm-6">
            <label
              style={{ fontWeight: "bold", fontSize: "24px", color: "black" }}
            >
              {`ส่วนที่ 2.1 รายการผลการปฏิบัติงาน`}
            </label>
          </div>
          <div className="col-sm-6 text-sm-right align-self-sm-end">
            <div className="row justify-content-sm-end">
              <div className="mr-3">
                <GuidePoint />
              </div>
              <div>
                <GuideCode />
              </div>
            </div>
          </div>
        </div>
        {/* <Table1
          path={`${id}`}
          data={dataT1}
          changeData={(dataT1) => setDataT1(dataT1)}
        /> */}
        <Form2Table1
          data={dataT1}
          changeData={(dataT1) => setDataT1(dataT1)}
          path={`${id}`}
        />
        <Form2Table2
          data={dataT2}
          changeData={(dataT2) => setDataT2(dataT2)}
          path={`${id}`}
        />
        <Form2Table3
          data={dataT3}
          changeData={(dataT3) => setDataT3(dataT3)}
          path={`${id}`}
        />
        <Form2Table4
          data={dataT4}
          changeData={(dataT4) => setDataT4(dataT4)}
          path={`${id}`}
        />
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
            className="col-sm-2"
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
              marginLeft: "3%",
            }}
          >
            {`คะแนนรวม % = ${totalpercen} คะแนน (คะแนนเต็ม 100 คะแนน)`}
          </label>
        </div>
        <div className="col-sm-12  d-sm-flex align-items-sm-end justify-content-sm-end mt-4">
          <button
            className="btn-modal-confirm"
            type="submit"
            onClick={onFinish}
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserForm2;
