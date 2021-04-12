import React, { useState, useEffect } from "react";
// import { Form } from "antd";
import { useParams } from "react-router-dom";
// import { notify } from "../CustomComponent";

import "./App.css";

import GuidePoint from "./GuidePoint";
import GuideCode from "./GuideCode";
import Form2Table1 from "./Form2Table1";
import Form2Table2 from "./Form2Table2";
import Form2Table3 from "./Form2Table3";
import Form2Table4 from "./Form2Table4";
import { notify } from "../CustomComponent";
import axios from "axios";
const url = `http://localhost:3001/api/employee`;

function UserForm2() {
  const { id } = useParams();
  // const formRef = useRef(null);
  const [dataT1, setDataT1] = useState([]);
  const [dataT2, setDataT2] = useState([]);
  const [dataT3, setDataT3] = useState([]);
  const [dataT4, setDataT4] = useState([]);

  // const LoadData = () => {
  //   // console.log("123");
  //   const id_assessment = `${id}`;
  //   const id_employee = "1";
  //   const data = {
  //     assessment_id: id_assessment,
  //     employee_id: id_employee,
  //   };
  //   // const result = await axios.post(`${url}/dataFormtwo`, data)
  //   axios.post(`${url}/dataFormtwo`, data).then((res) => {
  //     // console.log(res);
  //     const data = res.data.data.formtwo;
  //     const T1 = data.filter((v) => v.formtwo_table === 1);
  //     const T2 = data.filter((v) => v.formtwo_table === 2);
  //     const T3 = data.filter((v) => v.formtwo_table === 3);
  //     const T4 = data.filter((v) => v.formtwo_table === 4);
  //     setDataT1(T1);
  //     setDataT2(T2);
  //     setDataT3(T3);
  //     setDataT4(T4);
  //     // console.log(dataT1);
  //   });
  // };

  const onFinish = () => {
    let _list = [];
    dataT1.forEach((v) => {
      let f = {};
      f.formtwo_table = "1";
      f.formtwo_name = v.Table1Activity;
      f.formtwo_fte = v.Table1FTE;
      f.formtwo_sucessem = v.Table1Level;
      f.formtwo_comment = v.Table1Comments;
      _list.push(f);
    });
    dataT2.forEach((v) => {
      let f = {};
      f.formtwo_table = "2";
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
      f.formtwo_name = v.Table4Activity;
      f.formtwo_fte = v.Table4FTE;
      f.formtwo_sucessem = v.Table4Level;
      f.formtwo_comment = v.Table4Comments;
      _list.push(f);
    });
    // console.log(_list);
    const id_assessment = `${id}`;
    const id_employee = "1";
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
  };

  useEffect(() => {
    // LoadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
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
        <div className="col-sm-12  d-sm-flex align-items-sm-end justify-content-sm-end mt-2">
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
