import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./pdf.css";
import { Row, Radio } from "antd";
import { date2Thai } from "../CustomFunction";
import moment from "moment";
import "moment/locale/th";
import logo from "../pages/1624041618306.jpg";

const url = `https://database-api-pj.herokuapp.com/api/committee`;
const urlEM = `https://database-api-pj.herokuapp.com/api/employee`;

const HeadPDF = () => {
  const { id, assessment } = useParams();
  const [sumForm2, setSumForm2] = useState("");
  const [sumForm2Per, setSumForm2Per] = useState("");
  const [sumForm3, setSumForm3] = useState("");
  const [sumForm3Per, setSumForm3Per] = useState("");
  const [total, setTotle] = useState("");
  const [grad, setGrad] = useState("");
  const [pass, setPass] = useState("");
  const [salary, setSalary] = useState("");
  const [dataStape1, setDataStape1] = useState([]);
  const [Title, setTitle] = useState("");

  const LoadData = async () => {
    const id_assessment = `${assessment}`;
    const id_employee = `${id}`;
    const data = {
      employee_id: id_employee,
      assessment_id: id_assessment,
    };
    await axios.post(`${url}/dataFormtwoAll`, data).then((com) => {
      axios.post(`${urlEM}/dataFormtwo`, data).then((em) => {
        const dataEM = em.data.data.formtwo;
        const dataCOMALL = com.data.data;
        // ***************************************************************** ตาราง 1 *************************************************************************************************
        const T1EM = dataEM.filter((v) => v.formtwo_table === 1);
        const T1COMALL = dataCOMALL.filter((v) => v.formtwo_table === 1);
        const T1COMID = T1COMALL.map((e) => e.fk_committee_id);
        const duplicateID = [...new Set(T1COMID)];
        const T1COM1 = T1COMALL.filter(
          (e) => e.fk_committee_id === duplicateID[0]
        );
        const T1COM2 = T1COMALL.filter(
          (e) => e.fk_committee_id === duplicateID[1]
        );
        const T1COM3 = T1COMALL.filter(
          (e) => e.fk_committee_id === duplicateID[2]
        );
        const T1COM4 = T1COMALL.filter(
          (e) => e.fk_committee_id === duplicateID[3]
        );
        const T1COM5 = T1COMALL.filter(
          (e) => e.fk_committee_id === duplicateID[4]
        );
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
            (((parseFloat(T1[i].com1) +
              parseFloat(T1[i].com2) +
              parseFloat(T1[i].com3) +
              parseFloat(T1[i].com4) +
              parseFloat(T1[i].com5)) /
              5) *
              T1[i].emFTE) /
            4,
        }));
        // console.log(resultT1);
        // ***************************************************************** ตาราง 2 *************************************************************************************************
        const T2EM = dataEM.filter((v) => v.formtwo_table === 2);
        const T2COMALL = dataCOMALL.filter((v) => v.formtwo_table === 2);
        const T2COMID = T2COMALL.map((e) => e.fk_committee_id);
        const duplicate2ID = [...new Set(T2COMID)];
        const T2COM1 = T2COMALL.filter(
          (e) => e.fk_committee_id === duplicate2ID[0]
        );
        const T2COM2 = T2COMALL.filter(
          (e) => e.fk_committee_id === duplicate2ID[1]
        );
        const T2COM3 = T2COMALL.filter(
          (e) => e.fk_committee_id === duplicate2ID[2]
        );
        const T2COM4 = T2COMALL.filter(
          (e) => e.fk_committee_id === duplicate2ID[3]
        );
        const T2COM5 = T2COMALL.filter(
          (e) => e.fk_committee_id === duplicate2ID[4]
        );
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
            (((parseFloat(T2[i].com1) +
              parseFloat(T2[i].com2) +
              parseFloat(T2[i].com3) +
              parseFloat(T2[i].com4) +
              parseFloat(T2[i].com5)) /
              5) *
              T2[i].emFTE) /
            4,
        }));
        // console.log(resultT2);
        // ***************************************************************** ตาราง 3 *************************************************************************************************
        const T3EM = dataEM.filter((v) => v.formtwo_table === 3);
        const T3COMALL = dataCOMALL.filter((v) => v.formtwo_table === 3);
        const T3COMID = T3COMALL.map((e) => e.fk_committee_id);
        const duplicate3ID = [...new Set(T3COMID)];
        const T3COM1 = T3COMALL.filter(
          (e) => e.fk_committee_id === duplicate3ID[0]
        );
        const T3COM2 = T3COMALL.filter(
          (e) => e.fk_committee_id === duplicate3ID[1]
        );
        const T3COM3 = T3COMALL.filter(
          (e) => e.fk_committee_id === duplicate3ID[2]
        );
        const T3COM4 = T3COMALL.filter(
          (e) => e.fk_committee_id === duplicate3ID[3]
        );
        const T3COM5 = T3COMALL.filter(
          (e) => e.fk_committee_id === duplicate3ID[4]
        );
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
            (((parseFloat(T3[i].com1) +
              parseFloat(T3[i].com2) +
              parseFloat(T3[i].com3) +
              parseFloat(T3[i].com4) +
              parseFloat(T3[i].com5)) /
              5) *
              T3[i].emFTE) /
            4,
        }));
        // console.log(resultT3);
        // ***************************************************************** ตาราง 4 *************************************************************************************************
        const T4EM = dataEM.filter((v) => v.formtwo_table === 4);
        const T4COMALL = dataCOMALL.filter((v) => v.formtwo_table === 4);
        const T4COMID = T4COMALL.map((e) => e.fk_committee_id);
        const duplicate4ID = [...new Set(T4COMID)];
        const T4COM1 = T4COMALL.filter(
          (e) => e.fk_committee_id === duplicate4ID[0]
        );
        const T4COM2 = T4COMALL.filter(
          (e) => e.fk_committee_id === duplicate4ID[1]
        );
        const T4COM3 = T4COMALL.filter(
          (e) => e.fk_committee_id === duplicate4ID[2]
        );
        const T4COM4 = T4COMALL.filter(
          (e) => e.fk_committee_id === duplicate4ID[3]
        );
        const T4COM5 = T4COMALL.filter(
          (e) => e.fk_committee_id === duplicate4ID[4]
        );
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
            (((parseFloat(T4[i].com1) +
              parseFloat(T4[i].com2) +
              parseFloat(T4[i].com3) +
              parseFloat(T4[i].com4) +
              parseFloat(T4[i].com5)) /
              5) *
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

    await axios.post(`${url}/dataFromthree`, data).then((res) => {
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

    await axios.post(`${url}/dataresulthead`, data).then((res) => {
      console.log(res);
      setGrad(res.data.data.grad || "");
      setPass(res.data.data.pass || "");
      setSalary(res.data.data.salary || "");
    });

    await axios.get(`${urlEM}/employee/` + id_employee).then((info) => {
      axios.post(`${urlEM}/dataFormone`, data).then((form1) => {
        setDataStape1({
          information: {
            firstName: info.data.data.employee_firstname,
            lastName: info.data.data.employee_lastname,
            position: info.data.data.employee_position,
            number: info.data.data.employee_number,
            level: info.data.data.employee_degree,
            division: info.data.data.employee_group,
            startTimes: info.data.data.employee_start,
          },
          leaveHistory: {
            sickLeave:
              form1.data.data.formone.formone_lasick === null
                ? 0
                : form1.data.data.formone.formone_lasick,
            sickLeaveMedical:
              form1.data.data.formone.formone_lapaper === null
                ? 0
                : form1.data.data.formone.formone_lapaper,
            businessLeave:
              form1.data.data.formone.formone_laprivate === null
                ? 0
                : form1.data.data.formone.formone_laprivate,
            late:
              form1.data.data.formone.formone_lalate === null
                ? 0
                : form1.data.data.formone.formone_lalate,
            holiday:
              form1.data.data.formone.formone_laleave === null
                ? 0
                : form1.data.data.formone.formone_laleave,
            MaternityLeave:
              form1.data.data.formone.formone_lababy === null
                ? 0
                : form1.data.data.formone.formone_lababy,
            ordainLeave:
              form1.data.data.formone.formone_lamonk === null
                ? 0
                : form1.data.data.formone.formone_lamonk,
            govermentLack:
              form1.data.data.formone.formone_lamilitary === null
                ? 0
                : form1.data.data.formone.formone_lamilitary,
          },
          salaryHistory: {
            budgetone:
              form1.data.data.formone.formone_budgetone === null
                ? ""
                : form1.data.data.formone.formone_budgetone,
            budgettwo:
              form1.data.data.formone.formone_budgettwo === null
                ? ""
                : form1.data.data.formone.formone_budgettwo,
            promoone:
              form1.data.data.formone.formone_promoone === null
                ? ""
                : form1.data.data.formone.formone_promoone,
            promotwo:
              form1.data.data.formone.formone_promotwo === null
                ? ""
                : form1.data.data.formone.formone_promotwo,
          },
          punishHistory: {
            punishdate:
              form1.data.data.formone.formone_punishdate === null
                ? ""
                : form1.data.data.formone.formone_punishdate,
            punishlevel:
              form1.data.data.formone.formone_punishlevel === null
                ? ""
                : form1.data.data.formone.formone_punishlevel,
          },
          studyHistory: {
            study:
              form1.data.data.formone.formone_study === null
                ? ""
                : form1.data.data.formone.formone_study,
            start:
              form1.data.data.formone.formone_studystart === null
                ? ""
                : form1.data.data.formone.formone_studystart,
            end:
              form1.data.data.formone.formone_studyend === null
                ? ""
                : form1.data.data.formone.formone_studyend,
            back:
              form1.data.data.formone.formone_studyback === null
                ? ""
                : form1.data.data.formone.formone_studyback,
          },
        });
      });
      console.log(dataStape1);
      console.log(dataStape1.studyHistory);
    });

    await axios.get(`${url}/assessment`).then((res) => {
      const assessment = res.data.data.time[0];
      setTitle(assessment.assessment_name);
    });
  };

  useEffect(() => {
    LoadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const totalSum = parseFloat(sumForm3Per) + parseFloat(sumForm2Per);
    setTotle(totalSum.toFixed(2));
  }, [total, sumForm3Per, sumForm2Per]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div
        className="col-sm-11"
        style={{
          // padding: "5px 5px",
          border: "2px solid gray",
          marginLeft: "2%",
          alignItems: "center",
          textAlign: "center",
          marginTop: "5px",
        }}
      >
        <label style={{ fontWeight: "bold", fontSize: "16px", color: "black" }}>
          {`ส่วนที่ 4 สรุปผลการประเมิน`}
        </label>
      </div>
      <Row>
        <div
          className="col-sm-7"
          style={{
            // padding: "5px 5px",
            border: "2px solid gray",
            marginLeft: "2%",
            alignItems: "center",
            textAlign: "center",
            marginTop: "5px",
          }}
        >
          <label style={{ fontSize: "16px", color: "black" }}>
            {`รวมคะแนนการประเมิน`}
          </label>
        </div>
        <div
          className="col-sm-3"
          style={{
            // padding: "5px 5px",
            border: "2px solid gray",
            marginLeft: "8.3%",
            alignItems: "center",
            textAlign: "center",
            marginTop: "5px",
          }}
        >
          <label style={{ fontSize: "16px", color: "black" }}>
            {`พนักงานรับทราบ`}
          </label>
        </div>
      </Row>
      <Row>
        <div
          className="col-sm-7"
          style={{
            border: "2px solid gray",
            marginLeft: "2%",
          }}
        >
          <div className="col-sm-12 p-0">
            <div className="row">
              <div className="col-sm-2">
                <label
                  style={{
                    fontWeight: "normal",
                    fontSize: "13px",
                    color: "black",
                    marginLeft: "40%",
                  }}
                >
                  {`ส่วนที่ 2.1`}
                </label>
              </div>
              <div className="col-sm-4">
                <label
                  style={{
                    fontWeight: "normal",
                    fontSize: "14px",
                    color: "black",
                    // marginLeft: "1%",
                  }}
                >
                  {`ประเมินผลงาน`}
                </label>
              </div>
              <div className="col-sm-2">
                <label
                  style={{
                    fontWeight: "normal",
                    fontSize: "14px",
                    color: "black",
                    // marginLeft: "50%",
                  }}
                >
                  {`${sumForm2} คะแนน`}
                </label>
              </div>
              <div className="col-sm-3">
                <label
                  style={{
                    fontWeight: "normal",
                    fontSize: "14px",
                    color: "black",
                    // marginLeft: "1%",
                  }}
                >
                  {`คิดเป็น ${sumForm2Per} คะแนน`}
                </label>
              </div>
              <div className="col-sm-1">
                <label
                  style={{
                    fontWeight: "normal",
                    fontSize: "14px",
                    color: "black",
                    // marginLeft: "1%",
                  }}
                >
                  {`(70%)`}
                </label>
              </div>
              <div className="col-sm-2">
                <label
                  style={{
                    fontWeight: "normal",
                    fontSize: "13px",
                    color: "black",
                    marginLeft: "40%",
                  }}
                >
                  {`ส่วนที่2.2`}
                </label>
              </div>
              <div className="col-sm-4">
                <label
                  style={{
                    fontWeight: "normal",
                    fontSize: "14px",
                    color: "black",
                    // marginLeft: "1%",
                  }}
                >
                  {`ประเมินคุณลักษณะในการปฏิบัติงานและคุณสมบัติเฉพาะตัว `}
                </label>
              </div>
              <div className="col-sm-2">
                <label
                  style={{
                    fontWeight: "normal",
                    fontSize: "14px",
                    color: "black",
                    // marginLeft: "50%",
                  }}
                >
                  {`${sumForm3} คะแนน `}
                </label>
              </div>
              <div className="col-sm-3">
                <label
                  style={{
                    fontWeight: "normal",
                    fontSize: "14px",
                    color: "black",
                    // marginLeft: "1%",
                  }}
                >
                  {`คิดเป็น ${sumForm3Per}  คะแนน`}
                </label>
              </div>
              <div className="col-sm-1">
                <label
                  style={{
                    fontWeight: "normal",
                    fontSize: "14px",
                    color: "black",
                    // marginLeft: "1%",
                  }}
                >
                  {`(30%)`}
                </label>
              </div>
              <div className="col-sm-8">
                <label
                  style={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    color: "black",
                    marginLeft: "9%",
                  }}
                >
                  {`รวม`}
                </label>
              </div>
              <div className="col-sm-3">
                <label
                  style={{
                    fontWeight: "normal",
                    fontSize: "14px",
                    color: "black",
                    // marginLeft: "1%",
                  }}
                >
                  {`คิดเป็น ${total} คะแนน`}
                </label>
              </div>
              <div className="col-sm-1 ">
                <label
                  style={{
                    fontWeight: "normal",
                    fontSize: "14px",
                    color: "black",
                  }}
                >
                  {`(100%)`}
                </label>
              </div>
              <div className="col-sm-12 ">
                <label
                  style={{
                    fontWeight: "normal",
                    fontSize: "14px",
                    color: "black",
                    marginLeft: "6%",
                  }}
                >
                  {`คะแนนการประเมินผลการปฏิบัติงานเป็นเพียงคะแนนส่วนบุคคลที่ใช้ประกอบการประเมินผลการปฏิบัติงานในเบื้องต้น ทั้งนี้  ผลการประเมินและระดับผลงานขึ้นอยู่กับผลงานในภาพรวมประกอบกับดุลยพินิจของผู้บังคับบัญชา`}
                  <br />
                  {`พนักงานระดับปฏิบัติการ : เกณฑ์ผ่านรวมไม่ต่ำกว่าร้อยละ 60`}
                </label>
              </div>
              <div className="col-sm-12 ">
                <label
                  style={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    color: "black",
                    marginLeft: "6%",
                  }}
                >
                  {`สรุป`}
                </label>
                <Radio.Group style={{ marginLeft: "10%" }} value={pass}>
                  <Radio className="mr-5" value="ผ่านการประเมิน">
                    ผ่านการประเมิน
                  </Radio>
                  <i className="mr-3 ml-3" />
                  <i className="mr-3 ml-3" />
                  <Radio className="ml-5" value="ไม่ผ่านการประเมิน">
                    ไม่ผ่านการประเมิน
                  </Radio>
                </Radio.Group>
                <br />
                <label
                  style={{ marginLeft: "23%" }}
                >{`ผลงานระดับ ${grad}`}</label>
                <br />
                <Radio.Group style={{ marginLeft: "20%" }} value={salary}>
                  <Radio className="mr-5" value="เห็นสมควรให้ขึ้นเงินเดือน">
                    {`เห็นสมควรให้ขึ้นเงินเดือน _____%`}
                  </Radio>
                  <Radio className="ml-2" value="ไม่เห็นสมควรให้ขึ้นเงินเดือน">
                    ไม่เห็นสมควรให้ขึ้นเงินเดือน
                  </Radio>
                </Radio.Group>
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-sm-3"
          style={{
            // padding: "5px 5px",
            border: "2px solid gray",
            marginLeft: "8.3%",
          }}
        >
          <p className="col-12" style={{ marginTop: "3%" }}>
            _______________________________
          </p>
          <p className="col-12" style={{ marginTop: "3%" }}>
            _______________________________
          </p>
          <p className="col-12" style={{ marginTop: "3%" }}>
            _______________________________
          </p>
          <p style={{ marginTop: "3%" }}>ลงชื่อ</p>
          <p style={{ marginTop: "3%", marginLeft: "15%" }}>
            _________________________
          </p>
          <p style={{ marginTop: "3%", marginLeft: "15%" }}>
            ( _______________________ )
          </p>
          <p style={{ marginTop: "3%" }}>{`ตำแหน่ง ${
            dataStape1.information
              ? dataStape1.information.position
                ? dataStape1.information.position
                : null
              : ""
          }`}</p>
          <p style={{ marginTop: "3%" }}>วันที่</p>
        </div>
      </Row>
      <Row>
        <div
          className="col-sm-3"
          style={{
            // padding: "5px 5px",
            border: "2px solid gray",
            marginLeft: "2%",
            marginTop: "1%",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <label style={{ fontSize: "14px", color: "black" }}>
            {`ความเห็นผู้ประเมิน  (ผู้บังคับบัญชา)`}
          </label>
        </div>
        <div
          className="col-sm-3"
          style={{
            // padding: "5px 5px",
            border: "2px solid gray",
            marginTop: "1%",
            alignItems: "center",
            textAlign: "center",
            marginLeft: "8.3%",
          }}
        >
          <label style={{ fontSize: "14px", color: "black" }}>
            {`ความคิดเห็นเพิ่มเติมสำหรับผู้บังคับบัญชาระดับเหนือขึ้นไปจากผู้ประเมิน`}
          </label>
        </div>
        <div
          className="col-sm-3"
          style={{
            // padding: "5px 5px",
            border: "2px solid gray",
            marginTop: "1%",
            alignItems: "center",
            textAlign: "center",
            marginLeft: "8.3%",
          }}
        >
          <label style={{ fontSize: "14px", color: "black" }}>
            {`ความคิดเห็นเพิ่มเติมสำหรับผู้บังคับบัญชาระดับสูงสุด`}
          </label>
        </div>
      </Row>
      <Row>
        <div
          className="col-sm-3"
          style={{
            // padding: "5px 5px",
            border: "2px solid gray",
            marginLeft: "2%",
          }}
        >
          <p style={{ marginTop: "3%" }}>_________________________________</p>
          <p style={{ marginTop: "3%" }}>_________________________________</p>
          <p style={{ marginTop: "3%" }}>_________________________________</p>
          <p style={{ marginTop: "3%" }}>ลงชื่อ</p>
          <p style={{ marginTop: "3%", marginLeft: "15%" }}>
            __________________________
          </p>
          <p style={{ marginTop: "3%", marginLeft: "15%" }}>
            (__________________________)
          </p>
          <p style={{ marginTop: "3%" }}>{`ตำแหน่ง`}</p>
          <p style={{ marginTop: "3%" }}>วันที่</p>
        </div>
        <div
          className="col-sm-3"
          style={{
            // padding: "5px 5px",
            border: "2px solid gray",
            marginLeft: "8.3%",
          }}
        >
          <p style={{ marginTop: "3%" }}>_________________________________</p>
          <p style={{ marginTop: "3%" }}>_________________________________</p>
          <p style={{ marginTop: "3%" }}>_________________________________</p>
          <p style={{ marginTop: "3%" }}>ลงชื่อ</p>
          <p style={{ marginTop: "3%", marginLeft: "15%" }}>
            __________________________
          </p>
          <p style={{ marginTop: "3%", marginLeft: "15%" }}>
            (__________________________)
          </p>
          <p style={{ marginTop: "3%" }}>{`ตำแหน่ง`}</p>
          <p style={{ marginTop: "3%" }}>วันที่</p>
        </div>
        <div
          className="col-sm-3"
          style={{
            // padding: "5px 5px",
            border: "2px solid gray",
            marginLeft: "8.3%",
          }}
        >
          <p style={{ marginTop: "3%" }}>_________________________________</p>
          <p style={{ marginTop: "3%" }}>_________________________________</p>
          <p style={{ marginTop: "3%" }}>_________________________________</p>
          <p style={{ marginTop: "3%" }}>ลงชื่อ</p>
          <p style={{ marginTop: "3%", marginLeft: "15%" }}>
            __________________________
          </p>
          <p style={{ marginTop: "3%", marginLeft: "15%" }}>
            (__________________________)
          </p>
          <p style={{ marginTop: "3%" }}>{`ตำแหน่ง`}</p>
          <p style={{ marginTop: "3%" }}>วันที่</p>
        </div>
      </Row>
      <br />
      {/* form 1 */}
      <br />
      <div style={{ justifyContent: "left", display: "flex" }}>
        <img src={logo} alt="userguideadmin" style={{ width: "70%" }} />
      </div>
      <div
        className="col-sm-11"
        style={{
          // padding: "5px 5px",
          border: "2px solid gray",
          marginLeft: "2%",
          alignItems: "center",
          textAlign: "center",
          marginTop: "5px",
        }}
      >
        <label style={{ fontWeight: "bold", fontSize: "16px", color: "black" }}>
          {`ส่วนที่ 1   ข้อมูลทั่วไปเกี่ยวกับพนักงาน`}
        </label>
      </div>
      <Row>
        <div className="col-4" style={{ marginLeft: "1%", marginTop: "1%" }}>
          {`1. ชื่อ - สกุล ${
            dataStape1.information
              ? dataStape1.information.firstName
                ? dataStape1.information.firstName
                : null
              : ""
          } ${
            dataStape1.information
              ? dataStape1.information.lastName
                ? dataStape1.information.lastName
                : null
              : ""
          }`}
        </div>
        <div className="col-3" style={{ marginTop: "1%" }}>
          {`ตำแหน่ง ${
            dataStape1.information
              ? dataStape1.information.position
                ? dataStape1.information.position
                : null
              : ""
          } `}
        </div>
        <div className="col-1" style={{ marginTop: "1%" }}>
          {`เลขที่ ${
            dataStape1.information
              ? dataStape1.information.number
                ? dataStape1.information.number
                : null
              : ""
          } `}
        </div>
        <div className="col-1" style={{ marginTop: "1%" }}>
          {`ระดับ ${
            dataStape1.information
              ? dataStape1.information.level
                ? dataStape1.information.level
                : null
              : ""
          } `}
        </div>
        <div className="col-2" style={{ marginTop: "1%" }}>
          {`ระดับ ${
            dataStape1.information
              ? dataStape1.information.division
                ? dataStape1.information.division
                : null
              : ""
          } `}
        </div>
      </Row>
      <Row>
        <div className="col-sm-4">
          <label style={{ marginLeft: "3%" }}>
            {`2.เริ่มปฏิบัติงานเมื่อ ${
              dataStape1.information
                ? `วันที่ ${date2Thai(dataStape1.information.startTimes, true)
                    .toString()
                    .substring(0, 2)}
                            เดือน ${date2Thai(
                              dataStape1.information.startTimes,
                              true
                            )
                              .toString()
                              .substring(
                                3,
                                date2Thai(
                                  dataStape1.information.startTimes,
                                  true
                                ).toString().length - 4
                              )}
                              พ.ศ. ${date2Thai(
                                dataStape1.information.startTimes,
                                true
                              )
                                .toString()
                                .substring(
                                  date2Thai(
                                    dataStape1.information.startTimes,
                                    true
                                  ).toString().length - 4,
                                  date2Thai(
                                    dataStape1.information.startTimes,
                                    true
                                  ).toString().length
                                )}
                            `
                : null
            }`}
          </label>
        </div>
        <div className="col-sm-3">
          <label>
            {` รวมเวลาปฏิบัติงาน ${
              dataStape1.information
                ? moment(
                    dataStape1.information.startTimes,
                    "YYYY-MM-DD"
                  ).fromNow(true)
                : null
            }`}
          </label>
        </div>
        <label>
          (ยังไม่นับรวมช่วงระยะเวลาปฏิบัติงานลูกจ้างชั่วคราวตั้งแต่ปีพ.ศ.2544)
        </label>
      </Row>
      <Row>
        <div style={{ marginLeft: "2.3%" }}>3.ในรอบปีงบประมาณที่ผ่านมา</div>
        <div style={{ marginLeft: "2%" }}>
          <label>
            {`${
              dataStape1.studyHistory
                ? dataStape1.studyHistory.study === 2
                  ? "ลาศึกษาต่อ"
                  : "ไม่ลาศึกษาต่อ"
                : null
            }`}
          </label>
        </div>
        {dataStape1.studyHistory ? (
          dataStape1.studyHistory.study === 2 ? (
            <>
              <div style={{ marginLeft: "2%" }}>
                <label className="m-0">ตั้งแต่วันที่</label>
              </div>
              {/* formone_studystart */}
              <div style={{ marginLeft: "2%" }}>
                <label className="m-0">
                  {`${
                    dataStape1.studyHistory
                      ? `วันที่ ${date2Thai(dataStape1.studyHistory.start, true)
                          .toString()
                          .substring(0, 2)}
                            เดือน ${date2Thai(
                              dataStape1.studyHistory.start,
                              true
                            )
                              .toString()
                              .substring(
                                3,
                                date2Thai(
                                  dataStape1.studyHistory.start,
                                  true
                                ).toString().length - 4
                              )}
                              พ.ศ. ${date2Thai(
                                dataStape1.studyHistory.start,
                                true
                              )
                                .toString()
                                .substring(
                                  date2Thai(
                                    dataStape1.studyHistory.start,
                                    true
                                  ).toString().length - 4,
                                  date2Thai(
                                    dataStape1.studyHistory.start,
                                    true
                                  ).toString().length
                                )}
                            `
                      : null
                  }`}
                </label>
              </div>
              <div style={{ marginLeft: "2%" }}>
                <label className="m-0">ถึงวันที่</label>
              </div>
              {/* formone_studyHistoryend */}
              <div style={{ marginLeft: "2%" }}>
                <label className="m-0">
                  {`${
                    dataStape1.studyHistory
                      ? `วันที่ ${date2Thai(dataStape1.studyHistory.end, true)
                          .toString()
                          .substring(0, 2)}
                            เดือน ${date2Thai(dataStape1.studyHistory.end, true)
                              .toString()
                              .substring(
                                3,
                                date2Thai(
                                  dataStape1.studyHistory.end,
                                  true
                                ).toString().length - 4
                              )}
                              พ.ศ. ${date2Thai(
                                dataStape1.studyHistory.end,
                                true
                              )
                                .toString()
                                .substring(
                                  date2Thai(
                                    dataStape1.studyHistory.end,
                                    true
                                  ).toString().length - 4,
                                  date2Thai(
                                    dataStape1.studyHistory.end,
                                    true
                                  ).toString().length
                                )}
                            `
                      : null
                  }`}
                </label>
              </div>
              <div className="col-3"></div>
              <div style={{ marginLeft: "27.5%" }}>
                <label className="m-0">และกลับเข้าปฏิบัติงานวันที่</label>
              </div>
              {/* formone_studyHistoryback */}
              <div style={{ marginLeft: "2%" }}>
                <label className="m-0">
                  {`${
                    dataStape1.studyHistory
                      ? `วันที่ ${date2Thai(dataStape1.studyHistory.back, true)
                          .toString()
                          .substring(0, 2)}
                            เดือน ${date2Thai(
                              dataStape1.studyHistory.back,
                              true
                            )
                              .toString()
                              .substring(
                                3,
                                date2Thai(
                                  dataStape1.studyHistory.back,
                                  true
                                ).toString().length - 4
                              )}
                              พ.ศ. ${date2Thai(
                                dataStape1.studyHistory.back,
                                true
                              )
                                .toString()
                                .substring(
                                  date2Thai(
                                    dataStape1.studyHistory.back,
                                    true
                                  ).toString().length - 4,
                                  date2Thai(
                                    dataStape1.studyHistory.back,
                                    true
                                  ).toString().length
                                )}
                            `
                      : null
                  }`}
                </label>
              </div>
            </>
          ) : null
        ) : null}
      </Row>
      <Row>
        <div style={{ marginLeft: "2.3%" }}>
          4.เวลาปฏิบัติงานในรอบปีงบประมาณที่ผ่านมา
        </div>
        <div style={{ marginLeft: "2%" }}>{`${Title}`}</div>
      </Row>
      <Row>
        <div style={{ marginLeft: "3.2%" }}>โดยมีวันหยุดงาน</div>
        <div style={{ marginLeft: "1%" }}>ดังนี้</div>
        <div style={{ marginLeft: "2%" }}>
          <label>ลาป่วย</label>
        </div>
        <div style={{ marginLeft: "4%" }}>
          <label>
            {`${
              dataStape1.leaveHistory
                ? dataStape1.leaveHistory.sickLeave === ""
                  ? "-"
                  : `${dataStape1.leaveHistory.sickLeave} วัน`
                : "-"
            }`}
          </label>
        </div>
        <div style={{ marginLeft: "2%" }}>
          <label>ลาป่วย ที่มีใบรับรองแพทย์</label>
        </div>
        <div style={{ marginLeft: "2%" }}>
          <label>
            {`${
              dataStape1.leaveHistory
                ? dataStape1.leaveHistory.sickLeaveMedical === ""
                  ? "-"
                  : `${dataStape1.leaveHistory.sickLeaveMedical} วัน`
                : "-"
            }`}
          </label>
        </div>
        <div style={{ marginLeft: "2%" }}>
          <label>ลากิจ</label>
        </div>
        <div style={{ marginLeft: "5%" }}>
          <label>
            {`${
              dataStape1.leaveHistory
                ? dataStape1.leaveHistory.businessLeave === ""
                  ? "-"
                  : `${dataStape1.leaveHistory.businessLeave} วัน`
                : "-"
            }`}
          </label>
        </div>
        <div style={{ marginLeft: "2%" }}>
          <label>มาสาย</label>
        </div>
        <div style={{ marginLeft: "4.5%" }}>
          <label>
            {`${
              dataStape1.leaveHistory
                ? dataStape1.leaveHistory.late === ""
                  ? "-"
                  : `${dataStape1.leaveHistory.late} วัน`
                : "-"
            }`}
          </label>
        </div>
      </Row>
      <Row>
        <div style={{ marginLeft: "17%" }}>
          <label>ลาพักผ่อน</label>
        </div>
        <div style={{ marginLeft: "2%" }}>
          <label>
            {`${
              dataStape1.leaveHistory
                ? dataStape1.leaveHistory.holiday === ""
                  ? "-"
                  : `${dataStape1.leaveHistory.holiday} วัน`
                : "-"
            }`}
          </label>
        </div>
        <div style={{ marginLeft: "2%" }}>
          <label>ลาคลอดบุตร</label>
        </div>
        <div style={{ marginLeft: "8.5%" }}>
          <label>
            {`${
              dataStape1.leaveHistory
                ? dataStape1.leaveHistory.MaternityLeave === ""
                  ? "-"
                  : `${dataStape1.leaveHistory.MaternityLeave} วัน`
                : "-"
            }`}
          </label>
        </div>
        <div style={{ marginLeft: "2%" }}>
          <label>ลาอุปสมบท</label>
        </div>
        <div style={{ marginLeft: "2%" }}>
          <label>
            {`${
              dataStape1.leaveHistory
                ? dataStape1.leaveHistory.ordainLeave === ""
                  ? "-"
                  : `${dataStape1.leaveHistory.ordainLeave} วัน`
                : "-"
            }`}
          </label>
        </div>
        <div style={{ marginLeft: "2%" }}>
          <label>ขาดราชการ</label>
        </div>
        <div style={{ marginLeft: "2%" }}>
          <label>
            {`${
              dataStape1.leaveHistory
                ? dataStape1.leaveHistory.govermentLack === ""
                  ? "-"
                  : `${dataStape1.leaveHistory.govermentLack} วัน`
                : "-"
            }`}
          </label>
        </div>
      </Row>
      <Row>
        <div style={{ marginLeft: "2.3%" }}>5.การเลื่อนขั้นเงินเดือน</div>
        <div style={{ marginLeft: "2%" }}>ปีงบประมาณ</div>
        <div style={{ marginLeft: "8%" }}>
          <label>
            {`${
              dataStape1.salaryHistory
                ? dataStape1.salaryHistory.budgetone === ""
                  ? "-"
                  : `${dataStape1.salaryHistory.budgetone}`
                : "-"
            }`}
          </label>
        </div>
        <div style={{ marginLeft: "3%" }}>
          <label>
            {`${
              dataStape1.salaryHistory
                ? dataStape1.salaryHistory.budgettwo === ""
                  ? "-"
                  : `${dataStape1.salaryHistory.budgettwo}`
                : "-"
            }`}
          </label>
        </div>
      </Row>
      <Row>
        <div style={{ marginLeft: "16%" }}>% การเลื่อนขั้น</div>
        <div style={{ marginLeft: "7%" }}>
          <label>
            {`${
              dataStape1.salaryHistory
                ? dataStape1.salaryHistory.promoone === ""
                  ? "-"
                  : `${dataStape1.salaryHistory.promoone}`
                : "-"
            }`}
          </label>
        </div>
        <div style={{ marginLeft: "3%" }}>
          <label>
            {`${
              dataStape1.salaryHistory
                ? dataStape1.salaryHistory.promotwo === ""
                  ? "-"
                  : `${dataStape1.salaryHistory.promotwo}`
                : "-"
            }`}
          </label>
        </div>
      </Row>
      <Row>
        <div style={{ marginLeft: "2.3%" }}>6.เคยถูกลงโทษทางวินัย</div>
        <div style={{ marginLeft: "2%" }}>เมื่อ</div>
        <div style={{ marginLeft: "2%" }}>
          <label>
            {`${
              dataStape1.punishHistory
                ? dataStape1.punishHistory.punishdate === ""
                  ? "-"
                  : `${dataStape1.punishHistory.punishdate}`
                : "-"
            }`}
          </label>
        </div>
        <div style={{ marginLeft: "3%" }}>ระดับที่ลงโทษ</div>
        <div style={{ marginLeft: "2%" }}>
          <label>
            {`${
              dataStape1.punishHistory
                ? dataStape1.punishHistory.punishlevel === ""
                  ? "-"
                  : `${dataStape1.punishHistory.punishlevel}`
                : "-"
            }`}
          </label>
        </div>
      </Row>
      <div
        className="col-sm-11"
        style={{
          // padding: "5px 5px",
          border: "2px solid gray",
          marginLeft: "2%",
          alignItems: "center",
          textAlign: "center",
          marginTop: "5px",
        }}
      >
        <label>{`การประเมินผลการปฏิบัติงาน   ${Title}`}</label>
      </div>
      <Row>
        <div style={{ marginLeft: "2.3%" }}>คำอธิบายเพิ่มเติม</div>
        <div style={{ marginLeft: "3%" }}>
          <label>
            การประเมินผลการปฏิบัติงาน
            ควรจะมีการหารือระหว่างผู้บังคับบัญชาและผู้ใต้บังคับบัญชาอย่างน้อยเดือนละ
            1 ครั้ง
          </label>
        </div>
      </Row>
      <Row>
        <div style={{ marginLeft: "14%" }}>
          1. แบบประเมินผลการปฏิบัติงาน แบ่งออกเป็น 4 ส่วน คือ
        </div>
        <div style={{ marginLeft: "3%" }}>
          ส่วนที่ 1 - ข้อมูลทั่วไปเกี่ยวกับพนักงาน
        </div>
      </Row>
      <Row>
        <div style={{ marginLeft: "44.3%" }}>ส่วนที่ 2 - การประเมินผลงาน</div>
      </Row>
      <Row>
        <div style={{ marginLeft: "44.3%" }}>
          ส่วนที่ 3 - การพัฒนาและฝึกอบรม
        </div>
      </Row>
      <Row>
        <div style={{ marginLeft: "44.3%" }}>ส่วนที่ 4 - สรุปผลการประเมิน</div>
      </Row>
      <Row>
        <div style={{ marginLeft: "14.5%" }}>
          ในการประเมินผล ทั้งหัวหน้าและพนักงานจะกรอกข้อมูลในแต่ละส่วน
          หัวหน้าจะเป็นผู้ประเมินค่าคะแนนในการปฏิบัติงานของพนักงาน
          โดยจะต้องได้รับความเห็นชอบจากผู้บังคับบัญชาที่สูงอีกขั้นหนึ่ง
          และจากพนักงานผู้ถูกประเมินผลงาน หากไม่สามารถสรุปค่าคะแนนได้
          จะต้องนำผลการพิจารณาคะแนนเสนอต่อคณะกรรมการพิจารณาตัดสินการประเมิน
        </div>
      </Row>
      <Row>
        <div style={{ marginLeft: "14%" }}>
          2. หัวหน้าควรติดตามและหาวิธีให้ความช่วยเหลือพนักงานที่มีปัญหา
          อุปสรรคในการทำงาน และมีผลการประเมินต่ำกว่าเกณฑ์มาตรฐาน
        </div>
      </Row>
      <Row>
        <div style={{ marginLeft: "14%" }}>
          3. การประเมินผลงานนี้
          เปิดโอกาสให้พนักงานประเมินผลงานหรือให้ความเห็นชี้แจงผลการปฏิบัติงานของตนเอง
        </div>
      </Row>
      <Row>
        <div style={{ marginLeft: "14%" }}>
          4. แหากเป็นไปได้ และเหมาะสม หัวหน้าควรสอบถามความเห็นของลูกค้า
          ผู้ใต้บังคับบัญชา หรือผู้ที่ทำงานใกล้ชิดกับพนักงาน
          เกี่ยวกับการปฏิบัติงานของพนักงาน เพื่อใช้เป็นข้อมูลประกอบการประเมิน
        </div>
      </Row>
      <Row>
        <div style={{ marginLeft: "14%" }}>
          5. แโปรดศึกษาจากคู่มือแบบประเมินผลการปฏิบัติงาน
        </div>
      </Row>
    </div>
  );
};

export default HeadPDF;
