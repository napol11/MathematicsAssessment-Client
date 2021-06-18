import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./pdf.css";
import { Row, Radio, Form, Select } from "antd";

const url = `https://database-api-pj.herokuapp.com/api/committee`;
const urlEM = `https://database-api-pj.herokuapp.com/api/employee`;

const HeadPDF = () => {
  const [data, setData] = useState([
    {
      name: ["grad"],
      value: "",
    },
    {
      name: ["pass"],
      value: "",
    },
    {
      name: ["salary"],
      value: "",
    },
  ]);

  const { id, assessment } = useParams();
  const [sumForm2, setSumForm2] = useState("");
  const [sumForm2Per, setSumForm2Per] = useState("");
  const [sumForm3, setSumForm3] = useState("");
  const [sumForm3Per, setSumForm3Per] = useState("");
  const [total, setTotle] = useState("");

  const formRef = useRef(null);

  const LoadData = async () => {
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

    axios.post(`${url}/dataresulthead`, data).then((res) => {
      console.log(res);
      setData([
        {
          name: ["grad"],
          value: res.data.data.grad || "",
        },
        {
          name: ["pass"],
          value: res.data.data.pass || "",
        },
        {
          name: ["salary"],
          value: res.data.data.salary || "",
        },
      ]);
    });
  };

  useEffect(() => {
    LoadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const totalSum = parseFloat(sumForm3Per) + parseFloat(sumForm2Per);
    setTotle(totalSum.toFixed(2));
    console.log(total);
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
        <label style={{ fontWeight: "bold", fontSize: "24px", color: "black" }}>
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
          <label style={{ fontSize: "18px", color: "black" }}>
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
          <label style={{ fontSize: "18px", color: "black" }}>
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
          <div
            className="col-sm-12 p-0"
            style={{ borderRight: "4px solid white" }}
          >
            <div>
              <div className="row no-gutter">
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
                <div className="col-sm-8">
                  <label
                    style={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      color: "black",
                      marginLeft: "9%",
                    }}
                  >
                    {`รวม`}
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
                <div className="col-sm-12 mt-4">
                  <label
                    style={{
                      fontWeight: "normal",
                      fontSize: "16px",
                      color: "black",
                      marginLeft: "6%",
                    }}
                  >
                    {`คะแนนการประเมินผลการปฏิบัติงานเป็นเพียงคะแนนส่วนบุคคลที่ใช้ประกอบการประเมินผลการปฏิบัติงานในเบื้องต้น ทั้งนี้  ผลการประเมินและระดับผลงานขึ้นอยู่กับผลงานในภาพรวมประกอบกับดุลยพินิจของผู้บังคับบัญชา`}
                  </label>
                </div>
                <div className="col-sm-12 ">
                  <label
                    style={{
                      fontWeight: "normal",
                      fontSize: "16px",
                      color: "black",
                      marginLeft: "6%",
                    }}
                  >
                    {`พนักงานระดับปฏิบัติการ : เกณฑ์ผ่านรวมไม่ต่ำกว่าร้อยละ 60`}
                  </label>
                </div>
                <div className="col-sm-12 mt-4">
                  <label
                    style={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      color: "black",
                      marginLeft: "6%",
                    }}
                  >
                    {`สรุป`}
                  </label>
                  <Form ref={formRef} name="nest-messages" fields={data}>
                    <Form.Item name={["pass"]} className="col-sm-12 mb-4">
                      <Radio.Group style={{ marginLeft: "17%" }}>
                        <Radio className="mr-5" value="ผ่านการประเมิน">
                          ผ่านการประเมิน
                        </Radio>
                        <i className="mr-5 ml-5" />
                        <i className="mr-5 ml-5" />
                        <Radio className="ml-5" value="ไม่ผ่านการประเมิน">
                          ไม่ผ่านการประเมิน
                        </Radio>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item
                      name={["grad"]}
                      label="ผลงานระดับ"
                      className=" mb-3"
                      style={{ marginLeft: "19%" }}
                    >
                      <Select
                        className="select-modal"
                        placeholder=" ‎‏‏‎ ผลงานระดับ"
                        style={{ width: "20%" }}
                      ></Select>
                    </Form.Item>
                    <Form.Item name={["salary"]} className="col-sm-12 mb-4">
                      <Radio.Group style={{ marginLeft: "17%" }}>
                        <Radio
                          className="mr-5"
                          value="เห็นสมควรให้ขึ้นเงินเดือน"
                        >
                          {`เห็นสมควรให้ขึ้นเงินเดือน`}
                        </Radio>
                        <i className="mr-5 ml-5" />
                        <i className="mr-4 ml-4" />
                        <Radio
                          className="ml-5"
                          value="ไม่เห็นสมควรให้ขึ้นเงินเดือน"
                        >
                          ไม่เห็นสมควรให้ขึ้นเงินเดือน
                        </Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Form>
                </div>
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
          <p style={{ marginTop: "5%" }}>
            _________________________________________________________
          </p>
          <p style={{ marginTop: "5%" }}>
            _________________________________________________________
          </p>
          <p style={{ marginTop: "5%" }}>
            _________________________________________________________
          </p>
          <p style={{ marginTop: "5%" }}>
            _________________________________________________________
          </p>
          <p style={{ marginTop: "5%" }}>
            _________________________________________________________
          </p>
          <p style={{ marginTop: "5%" }}>ลงชื่อ</p>
          <p style={{ marginTop: "5%", marginLeft: "15%" }}>
            _________________________________________
          </p>
          <p style={{ marginTop: "5%", marginLeft: "15%" }}>
            ( ________________________________________ )
          </p>
          <p style={{ marginTop: "5%" }}>{`ตำแหน่ง`}</p>
          <p style={{ marginTop: "5%" }}>วันที่</p>
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
          <label style={{ fontSize: "18px", color: "black" }}>
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
          <label style={{ fontSize: "18px", color: "black" }}>
            {`ความคิดเห็นเพิ่มเติมสำหรับผู้บังคับบัญชา`}
            <br />
            {`ระดับเหนือขึ้นไปจากผู้ประเมิน`}
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
          <label style={{ fontSize: "18px", color: "black" }}>
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
          <p style={{ marginTop: "5%" }}>
            _________________________________________________________
          </p>
          <p style={{ marginTop: "5%" }}>
            _________________________________________________________
          </p>
          <p style={{ marginTop: "5%" }}>
            _________________________________________________________
          </p>
          <p style={{ marginTop: "5%" }}>
            _________________________________________________________
          </p>
          <p style={{ marginTop: "5%" }}>
            _________________________________________________________
          </p>
          <p style={{ marginTop: "5%" }}>ลงชื่อ</p>
          <p style={{ marginTop: "5%", marginLeft: "15%" }}>
            _________________________________________
          </p>
          <p style={{ marginTop: "5%", marginLeft: "15%" }}>
            ( ________________________________________ )
          </p>
          <p style={{ marginTop: "5%" }}>{`ตำแหน่ง`}</p>
          <p style={{ marginTop: "5%" }}>วันที่</p>
        </div>
        <div
          className="col-sm-3"
          style={{
            // padding: "5px 5px",
            border: "2px solid gray",
            marginLeft: "8.3%",
          }}
        >
          <p style={{ marginTop: "5%" }}>
            _________________________________________________________
          </p>
          <p style={{ marginTop: "5%" }}>
            _________________________________________________________
          </p>
          <p style={{ marginTop: "5%" }}>
            _________________________________________________________
          </p>
          <p style={{ marginTop: "5%" }}>
            _________________________________________________________
          </p>
          <p style={{ marginTop: "5%" }}>
            _________________________________________________________
          </p>
          <p style={{ marginTop: "5%" }}>ลงชื่อ</p>
          <p style={{ marginTop: "5%", marginLeft: "15%" }}>
            _________________________________________
          </p>
          <p style={{ marginTop: "5%", marginLeft: "15%" }}>
            ( ________________________________________ )
          </p>
          <p style={{ marginTop: "5%" }}>{`ตำแหน่ง`}</p>
          <p style={{ marginTop: "5%" }}>วันที่</p>
        </div>
        <div
          className="col-sm-3"
          style={{
            // padding: "5px 5px",
            border: "2px solid gray",
            marginLeft: "8.3%",
          }}
        >
          <p style={{ marginTop: "5%" }}>
            _________________________________________________________
          </p>
          <p style={{ marginTop: "5%" }}>
            _________________________________________________________
          </p>
          <p style={{ marginTop: "5%" }}>
            _________________________________________________________
          </p>
          <p style={{ marginTop: "5%" }}>
            _________________________________________________________
          </p>
          <p style={{ marginTop: "5%" }}>
            _________________________________________________________
          </p>
          <p style={{ marginTop: "5%" }}>ลงชื่อ</p>
          <p style={{ marginTop: "5%", marginLeft: "15%" }}>
            _________________________________________
          </p>
          <p style={{ marginTop: "5%", marginLeft: "15%" }}>
            ( ________________________________________ )
          </p>
          <p style={{ marginTop: "5%" }}>{`ตำแหน่ง`}</p>
          <p style={{ marginTop: "5%" }}>วันที่</p>
        </div>
      </Row>
    </div>
  );
};

export default HeadPDF;
