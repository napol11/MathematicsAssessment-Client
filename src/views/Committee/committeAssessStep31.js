import React, { useState, useEffect } from "react";
import { Table, Cascader } from "antd";

import "./committee.css";

import Cookies from "js-cookie";
import { token } from "../../config";
import { notify } from "../CustomComponent";
import { useParams } from "react-router-dom";
import axios from "axios";
const url = `https://database-api-pj.herokuapp.com/api/committee`;

const title = { color: "black", fontWeight: "bold", textAlign: "center" };

const CommitteAssessStep31 = (props) => {
  // console.log(props);
  const { id, assessment } = useParams();
  const { data, setData } = props;
  const [diss, setDiss] = useState(true);
  const [next, setNext] = useState(false);

  useEffect(() => {
    const value = data.EvaForm31.every((r, i) => {
      return r.point !== "";
    });
    setDiss(!value);
  }, [data]);

  const selected = (value, row, index) => {
    const val = [...data.EvaForm31];
    const point = value.length !== 0 ? value[0].toString() : "";
    val.splice(index, 1, { ...row, point });
    setData({
      ...data,
      EvaForm31: val,
    });
  };

  const inputSkill = (e, row, index) => {
    const val = [...data.EvaForm31];
    val.splice(index, 1, { ...row, skill: e.target.value });
    setData({
      ...data,
      EvaForm31: val,
    });
  };

  const columns = [
    {
      title: (
        <div style={title}>{"องค์ประกอบและรายละเอียดประกอบการพิจารณา"}</div>
      ),
      dataIndex: "title",
      key: "title",
      render: (text, row, index) => {
        const str = typeof text === "string" ? true : false;
        if (str) {
          return `- ${text}`;
        } else {
          return (
            <div>
              <p className="ml-4" style={{ fontWeight: "bold" }}>
                {text.title}
              </p>

              <label style={{ fontWeight: "bold" }}>{text.head}</label>
              <label style={{ fontWeight: "normal" }}>{text.detail}</label>
            </div>
          );
        }
      },
    },
    {
      title: <div style={title}>{"ระดับคะแนน"}</div>,
      dataIndex: "levelPoint",
      key: "levelPoint",
      width: "100px",
      align: "center",
      render: (text, row, index) => {
        const str = typeof row.title === "string" ? true : false;
        if (str) {
          return (
            <label
              style={{ fontWeight: "bold" }}
            >{`${row.levelStart} - ${row.levelEnd}`}</label>
          );
        } else {
          return null;
        }
      },
    },
    {
      title: <div style={title}>{"คะแนนที่ได้"}</div>,
      dataIndex: "point",
      key: "point",
      width: "100px",
      align: "center",
      render: (text, row, index) => {
        const str = typeof row.title === "string" ? true : false;
        let options = [];
        for (let i = row.levelStart; i <= row.levelEnd; i++) {
          options.push({ value: i, label: i });
        }
        if (str) {
          return (
            <Cascader
              onChange={(value) => selected(value, row, index)}
              value={[text]}
              options={options}
              placeholder={null}
            />
          );
        } else {
          return null;
        }
      },
    },
    {
      title: (
        <div style={title}>{"ความสามารถ/ทักษะดีเด่น และที่ปรับปรุงได้อีก"}</div>
      ),
      dataIndex: "skill",
      key: "skill",
      align: "center",
      render: (text, row, index) => {
        const str = typeof row.title === "string" ? true : false;
        if (str) {
          return (
            <textarea
              onChange={(value) => inputSkill(value, row, index)}
              value={text}
              className="textarea"
              style={{ width: "90%" }}
            ></textarea>
          );
        } else {
          return null;
        }
      },
    },
  ];

  const onFinish = () => {
    let _list = [];
    console.log(data.EvaForm31);
    const raw = data.EvaForm31;
    const filter = raw.filter((e) => e.point !== undefined);
    filter.forEach((v, i) => {
      let f = {};
      f.formthree_score = v.point === "" ? "0" : v.point;
      f.formthree_num = i + 1;
      f.formthree_comment = v.skill;
      _list.push(f);
    });
    const id_assessment = `${assessment}`;
    const id_employee = `${id}`;
    const id_committee = Cookies.get(token.userId);
    const senddata = {
      assessment_id: id_assessment,
      employee_id: id_employee,
      committee_id: id_committee,
      formthree: _list,
    };
    console.log(senddata);
    axios
      .post(`${url}/formthree`, senddata)
      .then((res) => {
        console.log(res);
        notify.success("บันทึกสำเร็จ !");
        setNext(true);
      })
      .catch((err) => {
        console.log(err);
        notify.error("บันทึกไม่สำเร็จ !");
      });
  };

  return (
    <div>
      <div className="row no-gutter">
        <div className="col-sm-12">
          <label
            style={{ fontWeight: "bold", fontSize: "24px", color: "black" }}
          >
            {`ส่วนที่ 2.2 แบบประเมินคุณลักษณะการปฎิบัติงานและคุณสมบัติเฉพาะตัว สำหรับพนักงานระดับปฎิบัติการ`}
          </label>
        </div>
      </div>
      <div className="row no-gutter">
        <div className="col-sm-9">
          <label
            style={{ fontWeight: "normal", fontSize: "18px", color: "black" }}
          >
            {`แบบประเมินคุณลักษณะการปฎิบัติงานและคุณสมบัติเฉพาะตัว สำหรับพนักงานระดับปฎิบัติการ`}
          </label>
        </div>
        <div className="col-sm-3 text-sm-right align-self-sm-end">
          <div className="row justify-content-sm-end">
            {/* <div className="committee2Btn pl-4 pr-4 mr-4">หมายเหตุคะแนน</div> */}
            {/* <div className="committee2Btn pl-4 pr-4">เกณฑ์การประเมิน</div> */}
          </div>
        </div>
      </div>
      <Table
        rowKey={"id"} // uniq key หรือ primary key ตัวไม่ซ้ำ
        className="committeeTableAssess3 mt-4"
        columns={columns}
        dataSource={data.EvaForm31}
        pagination={false}
        // pagination={{
        //   defaultPageSize: 100,
        //   showSizeChanger: true,
        //   pageSizeOptions: ["10", "20", "30"],
        //   locale: { items_per_page: "/ หน้า" },
        // }}
        // loading={{
        //   spinning: LoadingTable,
        //   tip: "กำลังโหลด...",
        //   size: "large",
        // }}
        locale={{ emptyText: "ไม่มีข้อมูล" }}
        scroll={{ y: 500 }}
        size="middle"
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
          <button
            // className={`${
            //   diss ? "btn-modal-confirm-Dis" : "btn-modal-confirm"
            // }`}
            className="btn-modal-confirm"
            type="submit"
            // onClick={diss ? null : onFinish}
            onClick={onFinish}
          >
            บันทึก
          </button>
        </div>
        {/* <div
          // className={`pl-4 pr-4 ${diss ? "btnConfirmDis" : "btnConfirm"}`}
          // onClick={diss ? null : props.next}
          className=" pl-4 pr-4 btnConfirm"
          onClick={props.next}
        >
          ถัดไป
        </div> */}
        {next === true ? (
          <div className="pl-4 pr-4 btnConfirm" onClick={props.next}>
            ถัดไป
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CommitteAssessStep31;
