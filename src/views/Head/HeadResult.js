import React, { useEffect, useState } from "react";

import "./head.css";

import { useParams } from "react-router-dom";
import axios from "axios";
const url = `http://localhost:3001/api/committee`;
const urlEM = `http://localhost:3001/api/employee`;

const CommitteAssessStep4 = (props) => {
  const { id, assessment } = useParams();
  const [sumForm2, setSumForm2] = useState("");
  const [sumForm2Per, setSumForm2Per] = useState("");
  const [sumForm3, setSumForm3] = useState("");
  const [sumForm3Per, setSumForm3Per] = useState("");
  const [total, setTotle] = useState("");

  const LoadData = () => {
    const id_assessment = `${assessment}`;
    const id_employee = `${id}`;
    const data = {
      employee_id: id_employee,
      assessment_id: id_assessment,
    };
    axios.post(`${url}/dataFormtwoAll`, data).then((com) => {
      axios.post(`${urlEM}/dataFormtwo`, data).then((em) => {
        const dataEM = em.data.data.formtwo;
        const dataCOMALL = com.data.data;
        // ***************************************************************** ตาราง 1 *************************************************************************************************
        const T1EM = dataEM.filter((v) => v.formtwo_table === 1);
        const T1COMALL = dataCOMALL.filter((v) => v.formtwo_table === 1);
        const T1COMID = T1COMALL.map((e) => e.fk_committee_id);
        const T1COM1 = T1COMALL.filter((e) => e.fk_committee_id === T1COMID[0]);
        const T1COM2 = T1COMALL.filter((e) => e.fk_committee_id === T1COMID[1]);
        const T1COM3 = T1COMALL.filter((e) => e.fk_committee_id === T1COMID[2]);
        const T1COM4 = T1COMALL.filter((e) => e.fk_committee_id === T1COMID[3]);
        const T1COM5 = T1COMALL.filter((e) => e.fk_committee_id === T1COMID[4]);
        const T1 = T1EM.map((v, i) => ({
          emFTE: v.formtwo_fte,
          emLevel: v.formtwo_sucessem,
          com1: T1COM1.length !== 0 ? T1COM1[i].formtwo_sucesscom : 0,
          com2: T1COM2.length !== 0 ? T1COM2[i].formtwo_sucesscom : 0,
          com3: T1COM3.length !== 0 ? T1COM3[i].formtwo_sucesscom : 0,
          com4: T1COM4.length !== 0 ? T1COM4[i].formtwo_sucesscom : 0,
          com5: T1COM5.length !== 0 ? T1COM5[i].formtwo_sucesscom : 0,
        }));
        const resultT1 = T1.map((v, i) => ({
          result:
            (((T1[i].com1 +
              T1[i].com2 +
              T1[i].com3 +
              T1[i].com4 +
              T1[i].com5 +
              T1[i].emLevel) /
              6) *
              T1[i].emFTE) /
            4,
        }));
        // console.log(resultT1);
        // ***************************************************************** ตาราง 2 *************************************************************************************************
        const T2EM = dataEM.filter((v) => v.formtwo_table === 2);
        const T2COMALL = dataCOMALL.filter((v) => v.formtwo_table === 2);
        const T2COMID = T2COMALL.map((e) => e.fk_committee_id);
        const T2COM1 = T2COMALL.filter((e) => e.fk_committee_id === T2COMID[0]);
        const T2COM2 = T2COMALL.filter((e) => e.fk_committee_id === T2COMID[1]);
        const T2COM3 = T2COMALL.filter((e) => e.fk_committee_id === T2COMID[2]);
        const T2COM4 = T2COMALL.filter((e) => e.fk_committee_id === T2COMID[3]);
        const T2COM5 = T2COMALL.filter((e) => e.fk_committee_id === T2COMID[4]);
        const T2 = T2EM.map((v, i) => ({
          emFTE: v.formtwo_fte,
          emLevel: v.formtwo_sucessem,
          com1: T2COM1.length !== 0 ? T2COM1[i].formtwo_sucesscom : 0,
          com2: T2COM2.length !== 0 ? T2COM2[i].formtwo_sucesscom : 0,
          com3: T2COM3.length !== 0 ? T2COM3[i].formtwo_sucesscom : 0,
          com4: T2COM4.length !== 0 ? T2COM4[i].formtwo_sucesscom : 0,
          com5: T2COM5.length !== 0 ? T2COM5[i].formtwo_sucesscom : 0,
        }));
        const resultT2 = T2.map((v, i) => ({
          result:
            (((T2[i].com1 +
              T2[i].com2 +
              T2[i].com3 +
              T2[i].com4 +
              T2[i].com5 +
              T2[i].emLevel) /
              6) *
              T2[i].emFTE) /
            4,
        }));
        // console.log(resultT2);
        // ***************************************************************** ตาราง 3 *************************************************************************************************
        const T3EM = dataEM.filter((v) => v.formtwo_table === 3);
        const T3COMALL = dataCOMALL.filter((v) => v.formtwo_table === 3);
        const T3COMID = T3COMALL.map((e) => e.fk_committee_id);
        const T3COM1 = T3COMALL.filter((e) => e.fk_committee_id === T3COMID[0]);
        const T3COM2 = T3COMALL.filter((e) => e.fk_committee_id === T3COMID[1]);
        const T3COM3 = T3COMALL.filter((e) => e.fk_committee_id === T3COMID[2]);
        const T3COM4 = T3COMALL.filter((e) => e.fk_committee_id === T3COMID[3]);
        const T3COM5 = T3COMALL.filter((e) => e.fk_committee_id === T3COMID[4]);
        const T3 = T3EM.map((v, i) => ({
          emFTE: v.formtwo_fte,
          emLevel: v.formtwo_sucessem,
          com1: T3COM1.length !== 0 ? T3COM1[i].formtwo_sucesscom : 0,
          com2: T3COM2.length !== 0 ? T3COM2[i].formtwo_sucesscom : 0,
          com3: T3COM3.length !== 0 ? T3COM3[i].formtwo_sucesscom : 0,
          com4: T3COM4.length !== 0 ? T3COM4[i].formtwo_sucesscom : 0,
          com5: T3COM5.length !== 0 ? T3COM5[i].formtwo_sucesscom : 0,
        }));
        const resultT3 = T3.map((v, i) => ({
          result:
            (((T3[i].com1 +
              T3[i].com2 +
              T3[i].com3 +
              T3[i].com4 +
              T3[i].com5 +
              T3[i].emLevel) /
              6) *
              T3[i].emFTE) /
            4,
        }));
        // console.log(resultT3);
        // ***************************************************************** ตาราง 4 *************************************************************************************************
        const T4EM = dataEM.filter((v) => v.formtwo_table === 4);
        const T4COMALL = dataCOMALL.filter((v) => v.formtwo_table === 4);
        const T4COMID = T4COMALL.map((e) => e.fk_committee_id);
        const T4COM1 = T4COMALL.filter((e) => e.fk_committee_id === T4COMID[0]);
        const T4COM2 = T4COMALL.filter((e) => e.fk_committee_id === T4COMID[1]);
        const T4COM3 = T4COMALL.filter((e) => e.fk_committee_id === T4COMID[2]);
        const T4COM4 = T4COMALL.filter((e) => e.fk_committee_id === T4COMID[3]);
        const T4COM5 = T4COMALL.filter((e) => e.fk_committee_id === T4COMID[4]);
        const T4 = T4EM.map((v, i) => ({
          emFTE: v.formtwo_fte,
          emLevel: v.formtwo_sucessem,
          com1: T4COM1.length !== 0 ? T4COM1[i].formtwo_sucesscom : 0,
          com2: T4COM2.length !== 0 ? T4COM2[i].formtwo_sucesscom : 0,
          com3: T4COM3.length !== 0 ? T4COM3[i].formtwo_sucesscom : 0,
          com4: T4COM4.length !== 0 ? T4COM4[i].formtwo_sucesscom : 0,
          com5: T4COM5.length !== 0 ? T4COM5[i].formtwo_sucesscom : 0,
        }));
        const resultT4 = T4.map((v, i) => ({
          result:
            (((T4[i].com1 +
              T4[i].com2 +
              T4[i].com3 +
              T4[i].com4 +
              T4[i].com5 +
              T4[i].emLevel) /
              6) *
              T4[i].emFTE) /
            4,
        }));
        // console.log(resultT4);
        // ***************************************************************** รวมคะแนน 1  *************************************************************************************************
        let sum1 = 0;
        for (let i = 0; i < resultT1.length; i++) {
          sum1 += resultT1[i].result;
        }
        // console.log(sum1.toFixed(2));
        // ***************************************************************** รวมคะแนน 2  *************************************************************************************************
        let sum2 = 0;
        for (let i = 0; i < resultT2.length; i++) {
          sum2 += resultT2[i].result;
        }
        // console.log(sum2.toFixed(2));
        // ***************************************************************** รวมคะแนน 3  *************************************************************************************************
        let sum3 = 0;
        for (let i = 0; i < resultT3.length; i++) {
          sum3 += resultT3[i].result;
        }
        // console.log(sum3.toFixed(2));
        // ***************************************************************** รวมคะแนน 4  *************************************************************************************************
        let sum4 = 0;
        for (let i = 0; i < resultT4.length; i++) {
          sum4 += resultT4[i].result;
        }
        // console.log(sum4.toFixed(2));
        // ***************************************************************** รวมคะแนน ฟอร์ม 2  *************************************************************************************************
        const sumForm = sum1 + sum2 + sum3 + sum4;
        // console.log(sumForm);
        setSumForm2(sumForm.toFixed(2));
        // ********************************************************************************* ทำเป็น % ************************************************************************************
        const sumFormpersent = (sumForm / 100) * 70;
        // console.log(sumFormpersent);
        setSumForm2Per(sumFormpersent.toFixed(2));
      });
    });

    axios.post(`${url}/dataFromthree`, data).then((res) => {
      const data = res.data.data;
      // console.log(data);
      let _list = [];
      for (let i = 0; i < data.length; i++) {
        data[i].forEach((v) => {
          let f = {};
          f.score = v.formthree_score;
          _list.push(f);
        });
      }
      let result = 0;
      for (let i = 0; i < _list.length; i++) {
        result += parseInt(_list[i].score) / 5;
      }
      setSumForm3(result.toFixed(2));
      // console.log(result);
      // ****************************************************** form 3 persent ********************************************
      const form3persent = (result / 100) * 30;
      // console.log(form3persent);
      setSumForm3Per(form3persent.toFixed(2));
    });

    const total = parseFloat(sumForm3Per) + parseFloat(sumForm2Per);
    // console.log(total);
    setTotle(total.toFixed(2));
  };

  useEffect(() => {
    LoadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div>
      {/* {console.log(formtwo)} */}
      <div className="row no-gutter">
        <div className="col-sm-6">
          <label
            style={{ fontWeight: "bold", fontSize: "24px", color: "black" }}
          >
            {`ส่วนที่ 4 สรุปผลการประเมิน`}
          </label>
        </div>
      </div>
      <div className="col-sm-12 p-0" style={{ borderRight: "4px solid white" }}>
        <div
          style={{
            backgroundColor: "#F8F6F3",
          }}
        >
          <div className="row no-gutter">
            <div className="col-sm-12">
              <label
                style={{
                  fontWeight: "normal",
                  fontSize: "18px",
                  color: "black",
                  margin: "1%",
                }}
              >
                {`รวมคะแนนการประเมิน`}
              </label>
            </div>
            <div className="col-sm-2">
              <label
                style={{
                  fontWeight: "normal",
                  fontSize: "18px",
                  color: "black",
                  marginLeft: "40%",
                }}
              >
                {`ส่วนที่ 2.1`}
              </label>
            </div>
            <div className="col-sm-3">
              <label
                style={{
                  fontWeight: "normal",
                  fontSize: "18px",
                  color: "black",
                  marginLeft: "1%",
                }}
              >
                {`ประเมินผลงาน`}
              </label>
            </div>
            <div className="col-sm-3">
              <label
                style={{
                  fontWeight: "normal",
                  fontSize: "18px",
                  color: "black",
                  marginLeft: "50%",
                }}
              >
                {`${sumForm2} คะแนน`}
              </label>
            </div>
            <div className="col-sm-2">
              <label
                style={{
                  fontWeight: "normal",
                  fontSize: "18px",
                  color: "black",
                  marginLeft: "1%",
                }}
              >
                {`คิดเป็น ${sumForm2Per} คะแนน`}
              </label>
            </div>
            <div className="col-sm-2">
              <label
                style={{
                  fontWeight: "normal",
                  fontSize: "18px",
                  color: "black",
                  marginLeft: "1%",
                }}
              >
                {`(70%)`}
              </label>
            </div>
            <div className="col-sm-2">
              <label
                style={{
                  fontWeight: "normal",
                  fontSize: "18px",
                  color: "black",
                  marginLeft: "40%",
                }}
              >
                {`ส่วนที่ 2.2`}
              </label>
            </div>
            <div className="col-sm-3">
              <label
                style={{
                  fontWeight: "normal",
                  fontSize: "18px",
                  color: "black",
                  marginLeft: "1%",
                }}
              >
                {`ประเมินคุณลักษณะในการปฏิบัติงานและคุณสมบัติเฉพาะตัว `}
              </label>
            </div>
            <div className="col-sm-3">
              <label
                style={{
                  fontWeight: "normal",
                  fontSize: "18px",
                  color: "black",
                  marginLeft: "50%",
                }}
              >
                {`${sumForm3} คะแนน `}
              </label>
            </div>
            <div className="col-sm-2">
              <label
                style={{
                  fontWeight: "normal",
                  fontSize: "18px",
                  color: "black",
                  marginLeft: "1%",
                }}
              >
                {`คิดเป็น ${sumForm3Per}  คะแนน`}
              </label>
            </div>
            <div className="col-sm-2">
              <label
                style={{
                  fontWeight: "normal",
                  fontSize: "18px",
                  color: "black",
                  marginLeft: "1%",
                }}
              >
                {`(30%)`}
              </label>
            </div>
            <div className="col-sm-2">
              <label
                style={{
                  fontWeight: "normal",
                  fontSize: "18px",
                  color: "black",
                  marginLeft: "40%",
                  marginTop: "2%",
                }}
              >
                {`รวม`}
              </label>
            </div>
            <div className="col-sm-8 text-sm-right">
              <label
                style={{
                  fontWeight: "normal",
                  fontSize: "18px",
                  color: "black",
                  marginLeft: "1%",
                }}
              >
                {`คิดเป็น ${total} คะแนน`}
              </label>
            </div>
            <div className="col-sm-2 ">
              <label
                style={{
                  fontWeight: "normal",
                  fontSize: "18px",
                  color: "black",
                  marginLeft: "1%",
                }}
              >
                {`(100%)`}
              </label>
            </div>
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

export default CommitteAssessStep4;
