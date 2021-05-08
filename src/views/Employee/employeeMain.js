import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { date2Thai } from "../CustomFunction";
import { useHistory } from "react-router-dom";

import "./employee.css";
import axios from "axios";
const url = `https://database-api-pj.herokuapp.com/api/employee`;

const title = { color: "white", fontWeight: "bold", textAlign: "center" };

const CommitteeMain = () => {
  const history = useHistory();

  const [LoadingTable, setLoadingTable] = useState(false);
  const [data, setdata] = useState([]);
  //   const [filter, setfilter] = useState([]);
  // const [Title, setTitle] = useState("");

  const dateText = (date) => {
    const len = date2Thai(date).toString().length;
    const ystart = date2Thai(date)
      .toString()
      .substring(len - 2, len); // ตัดจาก 2564 เป็น 64
    const dMstart = date2Thai(date)
      .toString()
      .substring(0, len - 4); // 01 ก.พ. 2564 เป็น 01 ก.พ.
    const start = dMstart + ystart; // รวม  01 ก.พ. 64
    return `${start}`;
  };

  const columns = [
    {
      title: <div style={title}>เลขที่</div>,
      dataIndex: "no",
      key: "no",
      align: "center",
      width: "100px",
      render: (text, row, index) => {
        return index + 1;
      },
    },
    {
      title: <div style={title}>รอบการประเมิน</div>,
      dataIndex: "name",
      key: "name",
      width: "500px",
    },
    {
      title: <div style={title}>วันเริ่มประเมิน</div>,
      dataIndex: "start",
      key: "start",
      align: "center",
      width: "150px",
      render: (text, row, index) => {
        // ห้ามเป็น null
        return dateText(row.start);
      },
    },
    {
      title: <div style={title}>วันสิ้นสุดส่งแบบฟอร์ม</div>,
      dataIndex: "end",
      key: "end",
      align: "center",
      width: "150px",
      render: (text, row, index) => {
        // ห้ามเป็น null
        return dateText(row.end);
      },
    },
    {},
    {
      title: <div style={title}>{null}</div>,
      dataIndex: "status",
      key: "status",
      width: "15%",
      render: (text, row, index) => {
        const success = row.status === "success" ? true : false;
        const Intime = new Date(row.end) < new Date() ? true : false;
        return (
          <div
            style={{
              wordWrap: "break-word",
              wordBreak: "break-word",
              textAlign: "center",
            }}
            // className={success ? "btnCommitteeDisable" : "btnCommittee"}
            className={
              new Date(row.end) < new Date()
                ? "btnCommitteeDisable"
                : "btnCommittee"
              // || success
              // ? "btnCommitteeDisable"
              // : "btnCommittee"
            }
            // onClick={
            //   success
            //     ? null
            //     : () => history.push(`/employee/evaluation/${row.id}`)
            // }
            onClick={
              Intime
                ? null
                : () =>
                    history.push(`/employee/evaluation/${row.id}`) || success
                      ? null
                      : () => history.push(`/employee/evaluation/${row.id}`)
            }
          >
            {/* {`${success ? "ส่งแบบประเมินแล้ว" : "ส่งแบบประเมิน"}`} */}
            {`${Intime ? "หมดเวลาส่งแบบฟอร์ม" : "ส่งแบบประเมิน"}` ||
              `${success ? "ส่งแบบประเมินแล้ว" : null}`}
          </div>
        );
      },
    },
  ];

  //   const search = (value) => {
  //     setLoadingTable(true); // loading table  // true = โหลดอยู่ , false = เสร็จแล้ว

  //     const regex = new RegExp(value.toString().toUpperCase(), "g");
  //     const find = filter.filter(({ name }) => {
  //       const upper = name.toString().toUpperCase();
  //       return upper.match(regex);
  //     });
  //     setdata(find); // set Data ใส่ตาราง
  //     setLoadingTable(false);
  //   };

  const LoadData = () => {
    // loading table  // true = โหลดอยู่ , false = เสร็จแล้ว
    setLoadingTable(true);
    // set Data ใส่ตาราง
    const employee_id = {
      employee_id: "1",
    };
    axios.post(`${url}/assessment`, employee_id).then((res) => {
      const form = res.data.data.form;
      // const result = res.data.data.formresult;

      const data = form.map((v, i) => ({
        ...v,
        no: i + 1,
        name: v.assessment_name,
        start: v.assessment_start,
        end: v.assessment_endedit,
        // status: v.id.map((value) => result.fk_assessment_id === value),
      }));
      setdata(data);
      // console.log(data);
    });
    // set Data ไว้ filter
    // setfilter([
    //   {
    //     no: "1",
    //     name: "1 มกราคม 2562  -  30  กรกฎาคม 2562",
    //     status: "wait",
    //   },
    //   {
    //     no: "2",
    //     name: "1 ตุลาคม 2562  -  30  ธันวาคม 2562",
    //     status: "wait",
    //   },
    // ]);
    // set Title
    // setTitle(
    //   `${date2Thai("2020-01-01", true)} - ${date2Thai("2020-07-01", true)}`
    // );
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
            style={{ fontWeight: "bold", fontSize: "26px", color: "black" }}
          >
            รายการแบบประเมิน
            {/* {Title} */}
          </label>

          {/* ********************************** */}
          <Table
            rowKey={"no"} // uniq key หรือ primary key ตัวไม่ซ้ำ
            className="committeeTable mt-4"
            columns={columns}
            dataSource={data}
            // pagination={false}
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
