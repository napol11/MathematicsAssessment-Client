import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { date2Thai } from "../CustomFunction";
import { useHistory } from "react-router-dom";

import "./head.css";

const title = { color: "white", fontWeight: "bold", textAlign: "center" };

const HeadMain = () => {
  const history = useHistory();

  const [LoadingTable, setLoadingTable] = useState(false);
  const [data, setdata] = useState([]);
  const [Title, setTitle] = useState("");

  const columns = [
    {
      title: <div style={title}>ลำดับ</div>,
      dataIndex: "id",
      key: "id",
      align: "center",
      width: "80px",
      render: (text, row, index) => {
        return index + 1;
      },
    },
    {
      title: <div style={title}>ชื่อกรรมการ</div>,
      dataIndex: "name",
      key: "name",
    },
    {
      title: <div style={title}>สถานะ</div>,
      dataIndex: "position",
      key: "position",
    },
    {
      title: <div style={title}>{null}</div>,
      dataIndex: "status",
      key: "status",
      width: "300px",
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
            onClick={success ? null : () => history.push(`/head/${row.no}`)}
          >
            {`${success ? "รอการประเมิน" : "ประเมิน"}`}
          </div>
        );
      },
    },
  ];

  const LoadData = () => {
    // loading table  // true = โหลดอยู่ , false = เสร็จแล้ว
    setLoadingTable(true);
    // set Data ใส่ตาราง
    setdata([
      {
        no: "1",
        name: "John Brown",
        position: "xxxxxxxxxxx",
        status: "wait",
      },
      {
        no: "2",
        name: "Jim Green",
        position: "xxxxxxxxxxx",
        status: "wait",
      },
      {
        no: "3",
        name: "Joe Black",
        position: "xxxxxxxxxxx",
        status: "wait",
      },
      {
        no: "4",
        name: "John Brown",
        position: "xxxxxxxxxxx",
        status: "wait",
      },
      {
        no: "5",
        name: "Joe Black",
        position: "xxxxxxxxxxx",
        status: "success",
      },
    ]);
    setTitle(
      `${date2Thai("2020-01-01", true)} - ${date2Thai("2020-07-01", true)}`
    );
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
            style={{ fontWeight: "bold", fontSize: "26px", color: "black", marginBottom: "2%" }}
          >
            การประเมิน {Title}
          </label>
          <div className="row no-gutter mb-3">
            <div className="col-sm-6">
              <label
                style={{
                  fontWeight: "normal",
                  fontSize: "20px",
                  color: "black",
                }}
              >
                การประเมินจากกรรมการ
              </label>
            </div>
          </div>
          {/* ********************************** */}
          <Table
            rowKey={"no"} // uniq key หรือ primary key ตัวไม่ซ้ำ
            className="committeeTable"
            columns={columns}
            dataSource={data}
            loading={{
              spinning: LoadingTable,
              tip: "กำลังโหลด...",
              size: "large",
            }}
            locale={{ emptyText: "ไม่มีข้อมูล" }}
            scroll={{ y: 500 }}
            size="middle"
          />
        </div>
      </div>
    </div>
  );
};
export default HeadMain;
