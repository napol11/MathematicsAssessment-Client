import React, { useState, useEffect } from "react";
import "moment/locale/th";

import { useParams } from "react-router-dom";
import "./head.css";
import GuidePoint from "./GuidePoint";
import Table1 from "../Head/Table1";
import Table2 from "../Head/Table2";
import Table3 from "../Head/Table3";
import Table4 from "../Head/Table4";
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
  const [next, setNext] = useState(false);
  // const [total, setTotal] = useState("");
  const [totalpercen, setTotalpercen] = useState("");
  const [fte, setFte] = useState("");

  const onFinish = () => {
    let _list = [];
    dataT1.forEach((v) => {
      let f = {};
      f.formtwo_table = "1";
      f.num = v.Table1No;
      f.formtwo_sucesscom = v.Table1LevelHead;
      _list.push(f);
    });
    dataT2.forEach((v) => {
      let f = {};
      f.formtwo_table = "2";
      f.num = v.Table2No;
      f.formtwo_sucesscom = v.Table2LevelHead;
      _list.push(f);
    });
    dataT3.forEach((v) => {
      let f = {};
      f.formtwo_table = "3";
      f.num = v.Table3No;
      f.formtwo_sucesscom = v.Table3LevelHead;
      _list.push(f);
    });
    dataT4.forEach((v) => {
      let f = {};
      f.formtwo_table = "4";
      f.num = v.Table4No;
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
        notify.success("???????????????????????????????????? !");
        setNext(true);
      })
      .catch((err) => {
        console.log(err);
        notify.error("????????????????????????????????????????????? !");
      });
  };

  useEffect(() => {
    let _list = [];
    dataT1.forEach((v) => {
      let f = {};
      f.formtwo_table = "1";
      f.formtwo_fte = v.Table1FTE;
      f.totle =
        ((parseFloat(v.Table1LevelCOM1) +
          parseFloat(v.Table1LevelCOM2) +
          parseFloat(v.Table1LevelCOM3) +
          parseFloat(v.Table1LevelCOM4) +
          parseFloat(v.Table1LevelHead)) /
          5) *
        v.Table1FTE;
      f.num = v.Table1No;
      f.totlepercen =
        (((parseFloat(v.Table1LevelCOM1) +
          parseFloat(v.Table1LevelCOM2) +
          parseFloat(v.Table1LevelCOM3) +
          parseFloat(v.Table1LevelCOM4) +
          parseFloat(v.Table1LevelHead)) /
          5) *
          v.Table1FTE) /
        4;
      _list.push(f);
    });
    dataT2.forEach((v) => {
      let f = {};
      f.formtwo_table = "2";
      f.formtwo_fte = v.Table2FTE;
      f.totle =
        ((parseFloat(v.Table2LevelCOM1) +
          parseFloat(v.Table2LevelCOM2) +
          parseFloat(v.Table2LevelCOM3) +
          parseFloat(v.Table2LevelCOM4) +
          parseFloat(v.Table2LevelHead)) /
          5) *
        v.Table2FTE;
      f.num = v.Table2No;
      f.totlepercen =
        (((parseFloat(v.Table2LevelCOM1) +
          parseFloat(v.Table2LevelCOM2) +
          parseFloat(v.Table2LevelCOM3) +
          parseFloat(v.Table2LevelCOM4) +
          parseFloat(v.Table2LevelHead)) /
          5) *
          v.Table2FTE) /
        4;
      _list.push(f);
    });
    dataT3.forEach((v) => {
      let f = {};
      f.formtwo_table = "3";
      f.formtwo_fte = v.Table3FTE;
      f.num = v.Table3No;
      f.totle =
        ((parseFloat(v.Table3LevelCOM1) +
          parseFloat(v.Table3LevelCOM2) +
          parseFloat(v.Table3LevelCOM3) +
          parseFloat(v.Table3LevelCOM4) +
          parseFloat(v.Table3LevelHead)) /
          5) *
        v.Table3FTE;
      f.totlepercen =
        (((parseFloat(v.Table3LevelCOM1) +
          parseFloat(v.Table3LevelCOM2) +
          parseFloat(v.Table3LevelCOM3) +
          parseFloat(v.Table3LevelCOM4) +
          parseFloat(v.Table3LevelHead)) /
          5) *
          v.Table3FTE) /
        4;
      _list.push(f);
    });
    dataT4.forEach((v) => {
      let f = {};
      f.formtwo_table = "4";
      f.formtwo_fte = v.Table4FTE;
      f.num = v.Table4No;
      f.totle =
        ((parseFloat(v.Table4LevelCOM1) +
          parseFloat(v.Table4LevelCOM2) +
          parseFloat(v.Table4LevelCOM3) +
          parseFloat(v.Table4LevelCOM4) +
          parseFloat(v.Table4LevelHead)) /
          5) *
        v.Table4FTE;
      f.totlepercen =
        (((parseFloat(v.Table4LevelCOM1) +
          parseFloat(v.Table4LevelCOM2) +
          parseFloat(v.Table4LevelCOM3) +
          parseFloat(v.Table4LevelCOM4) +
          parseFloat(v.Table4LevelHead)) /
          5) *
          v.Table4FTE) /
        4;
      _list.push(f);
    });
    console.log(_list);
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
    setTotalpercen(resultpercen.toFixed(2));
    console.log(resultpercen);
    // setTotal(result);
  }, [dataT1, dataT2, dataT3, dataT4]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="row no-gutter">
        <div className="col-sm-6">
          <label
            style={{ fontWeight: "bold", fontSize: "24px", color: "black" }}
          >
            {`????????????????????? 2.1 ???????????????????????????????????????????????????????????????`}
          </label>
        </div>
        <div className="col-sm-6 text-sm-right align-self-sm-end">
            <div className="row justify-content-sm-end mr-2">
                <GuidePoint />
            </div>
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
          className="col-sm-3"
          style={{
            fontWeight: "bold",
            fontSize: "18px",
            color: "black",
            textAlign: "center",
            marginLeft: "3%",
          }}
        >
          {`?????????`}
        </label>
        <label
          className="col-sm-4"
          style={{ fontWeight: "bold", fontSize: "18px", color: "black" }}
        >
          {`%FTE = ${fte}`}
        </label>
        <label
          className="col-sm-4"
          style={{
            fontWeight: "bold",
            fontSize: "18px",
            color: "black",
            marginLeft: "5%",
          }}
        >
          {`???????????????????????? % = ${totalpercen} ??????????????? (??????????????????????????? 100 ???????????????)`}
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
          ????????????????????????
        </div>
        <div className="mr-4">
          <button
            className="btn-modal-confirm"
            type="submit"
            onClick={onFinish}
          >
            ??????????????????
          </button>
        </div>
        {next === true ? (
          <div className="pl-4 pr-4 btnConfirm" onClick={props.next}>
            ???????????????
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CommitteAssessStep2;
