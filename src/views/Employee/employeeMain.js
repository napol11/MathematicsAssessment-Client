import React, { useEffect, useState } from "react";
import { Table } from "antd";
// import { date2Thai } from "../CustomFunction";
import { useHistory } from "react-router-dom";

import "./employee.css";

const title = { color: "white", fontWeight: "bold", textAlign: "center" };

const CommitteeMain = () => {
  const history = useHistory();

  const [LoadingTable, setLoadingTable] = useState(false);
  const [data, setdata] = useState([]);
//   const [filter, setfilter] = useState([]);
  // const [Title, setTitle] = useState("");

  const columns = [
    {
      title: <div style={title}>เลขที่</div>,
      dataIndex: "id",
      key: "id",
      align: "center",
      width: "10%",
      render: (text, row, index) => {
        return index + 1;
      },
    },
    {
      title: <div style={title}>รอบการประเมิน</div>,
      dataIndex: "name",
      key: "name",
      width: "75%",
    },
    {
      title: <div style={title}>{null}</div>,
      dataIndex: "status",
      key: "status",
      //   width: "50px",
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
                : () => history.push(`/employee/evaluation/${row.no}`)
            }
          >
            {`${success ? "ส่งแบบประเมินแล้ว" : "ส่งแบบประเมิน"}`}
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
    setdata([
      {
        no: "1",
        name: "1 มกราคม 2562  -  30  กรกฎาคม 2562",
        status: "wait",
      },
      {
        no: "2",
        name: "1 ตุลาคม 2562  -  30  ธันวาคม 2562",
        status: "wait",
      },
    ]);
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
            pagination={false}
            // pagination={{
            //   defaultPageSize: 10,
            //   showSizeChanger: true,
            //   pageSizeOptions: ["10", "20", "30"],
            //   locale: { items_per_page: "/ หน้า" },
            // }}
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
