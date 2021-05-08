import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { date2Thai } from "../CustomFunction";
import { useHistory } from "react-router-dom";

import "./committee.css";

import axios from "axios";
const url = `https://database-api-pj.herokuapp.com/api/committee`;

// const { Search } = Input;
const title = { color: "white", fontWeight: "bold", textAlign: "center" };

const CommitteeMain = () => {
  const history = useHistory();

  const [LoadingTable, setLoadingTable] = useState(false);
  // const [LoadingSearch, setLoadingSearch] = useState(false);
  const [data, setdata] = useState([]);
  // const [filter, setfilter] = useState([]);
  const [Title, setTitle] = useState("");
  const [TitleTime, setTitleTime] = useState("");

  const columns = [
    {
      title: <div style={title}>ลำดับที่</div>,
      dataIndex: "no",
      key: "no",
      align: "center",
      width: "100px",
      render: (text, row, index) => {
        return index + 1;
      },
    },
    {
      title: <div style={title}>ชื่อ-นามสกุล</div>,
      dataIndex: "name",
      key: "name",
      width: "500px",
    },
    {
      title: <div style={title}>ตำแหน่ง</div>,
      dataIndex: "position",
      key: "position",
      align: "center",
      width: "150px",
    },
    {
      title: <div style={title}>ระดับ</div>,
      dataIndex: "level",
      key: "level",
      align: "center",
      width: "150px",
    },
    // {
    //   title: <div style={title}>สังกัด</div>,
    //   dataIndex: "division",
    //   key: "division",
    //   align: "center",
    //   width: "150px",
    // },
    {},
    {
      title: <div style={title}>{null}</div>,
      dataIndex: "status",
      key: "status",
      width: "15%",
      render: (text, row, index) => {
        const success = row.status === "success" ? true : false;
        return (
          <div
            style={{
              wordWrap: "break-word",
              wordBreak: "break-word",
              textAlign: "center",
            }}
            className={success ? "btnCommitteeDisable" : "btnCommittee"}
            onClick={
              success
                ? null
                : () =>
                    history.push(`/committee/${row.assessment.id}/${row.id}`)
            }
          >
            {`${success ? "ประเมินแล้ว" : "ประเมิน"}`}
          </div>
        );
      },
    },
  ];

  // const search = (value) => {
  //   setLoadingSearch(true); // loading ปุ่ม search  // true = โหลดอยู่ , false = เสร็จแล้ว
  //   setLoadingTable(true); // loading table  // true = โหลดอยู่ , false = เสร็จแล้ว

  //   const regex = new RegExp(value.toString().toUpperCase(), "g");
  //   const find = filter.filter(({ name }) => {
  //     const upper = name.toString().toUpperCase();
  //     return upper.match(regex);
  //   });
  //   setdata(find); // set Data ใส่ตาราง
  //   setLoadingSearch(false);
  //   setLoadingTable(false);
  // };

  const LoadData = () => {
    // loading table  // true = โหลดอยู่ , false = เสร็จแล้ว
    setLoadingTable(true);
    axios
      .get(`${url}/assessment`)
      .then((res) => {
        console.log(res.data.data);
        const employee = res.data.data.employee;
        const assessment = res.data.data.time[0];
        const dataEm = [];
        for (let i = 0; i < employee.length; i++) {
          for (let d = 0; d < employee[i].length; d++) {
            dataEm.push(employee[i][d]);
          }
        }
        const data = dataEm.map((v, i) => ({
          ...v,
          no: i + 1,
          name: v.employee_firstname + " " + v.employee_lastname,
          position: v.employee_position,
          level: v.employee_degree,
          division: v.employee_group,
          assessment,
        }));
        // console.log(data);
        setdata(data);
        setTitle(assessment.assessment_name);
        setTitleTime(
          `วันเริ่มต้นประเมิน ${date2Thai(
            new Date(assessment.assessment_endedit)
          )} - ${date2Thai(new Date(assessment.assessment_end))}`
        );
      })
      .catch((err) => {
        console.log(err);
        setdata([]);
        setTitle("ยังไม่มีรอบการประเมินที่เปิด");
        setTitleTime("ยังไม่มีรอบการประเมินที่เปิด");
      });

    setLoadingTable(false);
  };

  useEffect(() => {
    LoadData();
  }, []);

  return (
    <div className="justify-center align-center">
      <div className="row wrap window-height">
        <div className="col-xs-12 col-sm-12">
          <label
            style={{
              fontWeight: "bold",
              fontSize: "26px",
              color: "black",
              marginBottom: "2%",
            }}
          >
            การประเมิน {Title} <br />
            {TitleTime}
          </label>
          <div className="row no-gutter  mb-3">
            <div className="col-sm-6">
              <label
                style={{
                  fontWeight: "normal",
                  fontSize: "20px",
                  color: "black",
                }}
              >
                รายชื่อพนักงานที่ต้องประเมิน
              </label>
            </div>
            {/* <div className="col-sm-6 text-sm-right ">
              <Search
                className="committeeInput"
                placeholder="ค้นหารายชื่อพนักงาน"
                loading={LoadingSearch}
                style={{ width: "80%" }}
                onSearch={search}
              />
            </div> */}
          </div>
          {/* ********************************** */}
          <Table
            rowKey={"no"} // uniq key หรือ primary key ตัวไม่ซ้ำ
            className="committeeTable"
            columns={columns}
            dataSource={data}
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30"],
              locale: { items_per_page: "/ หน้า" },
            }}
            loading={{
              spinning: LoadingTable,
              tip: "กำลังโหลด...",
              size: "large",
            }}
            locale={{ emptyText: "ไม่มีข้อมูล" }}
            // scroll={{ y: 500 }}
            size="middle"
          />
        </div>
      </div>
    </div>
  );
};

export default CommitteeMain;
