import React, { useEffect, useState } from "react";
import { Button, Table, Input, Popconfirm } from "antd";
import { notify } from "../CustomComponent";
import { useDispatch } from "react-redux";
import ModalAdmin from "./ModalAdmin";

import "./admin.css";

const { Search } = Input;
const title = { color: "white", fontWeight: "bold", textAlign: "center" };

const AdminStaff = () => {
  const [hover, sethover] = useState(false);
  const [LoadingTable, setLoadingTable] = useState(false);
  const [LoadingSearch, setLoadingSearch] = useState(false);
  const [datastaff, setdatastaff] = useState([]);
  const [filterstaff, setfilterstaff] = useState([]);
  const [SendData, setSendData] = useState([]);

  const dispatch = useDispatch();

  const columnsstaff = [
    {
      title: <div style={title}>เลขที่</div>,
      dataIndex: "no",
      key: "no",
      align: "center",
      width: "80px",
      render: (text, row, index) => {
        return index + 1;
      },
    },
    {
      title: <div style={title}>ชื่อ-นามสกุล</div>,
      dataIndex: "name",
      key: "name",
    },
    {
      title: <div style={title}>ตำแหน่ง</div>,
      dataIndex: "position",
      key: "position",
    },
    {
      title: <div style={title}>เบอร์โทร</div>,
      dataIndex: "bel",
      key: "bel",
    },
    {
      title: <div style={title}>อีเมล</div>,
      dataIndex: "email",
      key: "email",
    },
    {
      title: <div style={title}>{null}</div>,
      dataIndex: "delete",
      key: "delete",
      width: "50px",
      render: (text, row, index) => {
        return (
          <div
            style={{
              wordWrap: "break-word",
              wordBreak: "break-word",
              textAlign: "center",
              backgroundColor: "none",
              cursor: "pointer",
            }}
          >
            <Popconfirm
              style={{ border: "1px solid black", padding: 10 }}
              placement="topRight"
              title={`คุณต้องการลบพนักงานเลขที่ ${row.no} หรือไม่?`}
              onConfirm={() => deleteStaff(row)}
              okText="ตกลง"
              cancelText="ยกเลิก"
            >
              <i className="fas fa-trash-alt deleteBtn" />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const deleteStaff = (row) => {
    console.log("delete พนักงาน", row);
    notify.success("ลบรายชื่อพนักงาน เรียบร้อย!");
  };

  const search = (value) => {
    setLoadingSearch(true); // loading ปุ่ม search  // true = โหลดอยู่ , false = เสร็จแล้ว
    setLoadingTable(true); // loading table  // true = โหลดอยู่ , false = เสร็จแล้ว
    const regex = new RegExp(value.toString().toUpperCase(), "g");
    const find = filterstaff.filter(({ name }) => {
      const upper = name.toString().toUpperCase();
      return upper.match(regex);
    });
    setdatastaff(find); // set Data ใส่ตาราง
    setLoadingSearch(false);
    setLoadingTable(false);
  };

  const LoadData = () => {
    // loading table  // true = โหลดอยู่ , false = เสร็จแล้ว
    setLoadingTable(true);
    // set Data ใส่ตาราง
    setdatastaff([
      {
        no: "1",
        name: "John Brown",
        position: "xxxxxxxxxxx",
        bel: "xxxxxxxxxxx",
        email: "xxxxx@hotmail.com",
      },
      {
        no: "2",
        name: "Jim Green",
        position: "xxxxxxxxxxx",
        bel: "xxxxxxxxxxx",
        email: "xxxxx@hotmail.com",
      },
      {
        no: "3",
        name: "Joe Black",
        position: "xxxxxxxxxxx",
        bel: "xxxxxxxxxxx",
        email: "xxxxx@hotmail.com",
      },
      {
        no: "4",
        name: "John Brown",
        position: "xxxxxxxxxxx",
        bel: "xxxxxxxxxxx",
        email: "xxxxx@hotmail.com",
      },
      {
        no: "5",
        name: "Jim Green",
        position: "xxxxxxxxxxx",
        bel: "xxxxxxxxxxx",
        email: "xxxxx@hotmail.com",
      },
      {
        no: "6",
        name: "Joe Black",
        position: "xxxxxxxxxxx",
        bel: "xxxxxxxxxxx",
        email: "xxxxx@hotmail.com",
      },
    ]);
    // set Data ไว้ filter
    setfilterstaff([
      {
        no: "1",
        name: "John Brown",
        position: "xxxxxxxxxxx",
        bel: "xxxxxxxxxxx",
        email: "xxxxx@hotmail.com",
      },
      {
        no: "2",
        name: "Jim Green",
        position: "xxxxxxxxxxx",
        bel: "xxxxxxxxxxx",
        email: "xxxxx@hotmail.com",
      },
      {
        no: "3",
        name: "Joe Black",
        position: "xxxxxxxxxxx",
        bel: "xxxxxxxxxxx",
        email: "xxxxx@hotmail.com",
      },
      {
        no: "4",
        name: "John Brown",
        position: "xxxxxxxxxxx",
        bel: "xxxxxxxxxxx",
        email: "xxxxx@hotmail.com",
      },
      {
        no: "5",
        name: "Jim Green",
        position: "xxxxxxxxxxx",
        bel: "xxxxxxxxxxx",
        email: "xxxxx@hotmail.com",
      },
      {
        no: "6",
        name: "Joe Black",
        position: "xxxxxxxxxxx",
        bel: "xxxxxxxxxxx",
        email: "xxxxx@hotmail.com",
      },
    ]);
    setLoadingTable(false);
  };

  const openModal = (type, page) => {
    dispatch({
      type: "set",
      adminModal: {
        show: true,
        type,
        page,
      },
    });
  };

  useEffect(() => {
    LoadData();
  }, []);

  return (
    <div className="justify-center align-center">
      <div className="row wrap window-height">
        <div className="col-xs-12 col-sm-12">
          <label
            style={{ fontWeight: "bold", fontSize: "36px", color: "black" }}
          >
            รายชื่อพนักงาน
          </label>
          <div className="row no-gutter  mb-3">
            <div className="col-sm-6">
              <Search
                className="adminButton"
                placeholder="ค้นหารายชื่อพนักงาน"
                loading={LoadingSearch}
                style={{ width: "80%" }}
                onSearch={search}
              />
            </div>
            <div className="col-sm-6 text-sm-right ">
              <Button
                shape="round"
                size={"large"}
                onMouseEnter={() => sethover(true)}
                onMouseLeave={() => sethover(false)}
                onClick={() => openModal("add", "staff")}
                style={
                  hover
                    ? {
                        backgroundColor: "#f6be32",
                        border: "2px solid #f6be32",
                        color: "white",
                        paddingLeft: "50px",
                        paddingRight: "50px",
                      }
                    : {
                        backgroundColor: "white",
                        border: "2px solid #f6be32",
                        color: "black",
                        paddingLeft: "50px",
                        paddingRight: "50px",
                      }
                }
              >
                เพิ่มพนักงาน
              </Button>
            </div>
          </div>
          {/* ********************************** */}
          <Table
            rowKey={"no"} // uniq key หรือ primary key ตัวไม่ซ้ำ
            className="adminTable"
            columns={columnsstaff}
            dataSource={datastaff}
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
            scroll={{ y: 500 }}
            size="small"
            onRow={(record, recordIndex) => ({
              onClick: (e) => {
                setSendData(record);
                openModal("edit", "staff");
              },
            })}
          />
        </div>
      </div>
      <ModalAdmin reload={LoadData} data={SendData} />
    </div>
  );
};

export default AdminStaff;
