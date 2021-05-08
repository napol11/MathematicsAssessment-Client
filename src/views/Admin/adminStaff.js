import React, { useEffect, useState } from "react";
import { Button, Table, Popconfirm, Input } from "antd";
import { notify } from "../CustomComponent";
import ModalStaff from "./ModalStaff";

import { useDispatch } from "react-redux";

import "./admin.css";
import axios from "axios";
const url = `http://localhost:3001/api/admin`;

const { Search } = Input;
const title = { color: "white", fontWeight: "bold", textAlign: "center" };

const AdminStaff = () => {
  const [hover, sethover] = useState(false);
  const [LoadingTable, setLoadingTable] = useState(false);
  // const [LoadingSearch, setLoadingSearch] = useState(false);
  const [datastaff, setdatastaff] = useState([]);
  // const [filterstaff, setfilterstaff] = useState([]);
  const [SendData, setSendData] = useState([]);
  const [filter, setFilter] = useState([]);
  // const [show, setshow] = useState(false);
  const dispatch = useDispatch();

  const columnsstaff = [
    // {
    //   title: <div style={title}>ลำดับที่</div>,
    //   dataIndex: "no",
    //   key: "no",
    //   align: "center",
    //   width: "100px",
    //   render: (text, row, index) => {
    //     return index + 1;
    //   },
    // },
    {
      title: <div style={title}>เลขที่</div>,
      dataIndex: "number",
      key: "number",
      align: "center",
      width: "150px",
      sorter: {
        compare: (a, b) => a.number - b.number,
      },
    },
    {
      title: <div style={title}>ชื่อ-นามสกุล</div>,
      dataIndex: "name",
      key: "name",
      width: "500px",
      // render: (text, row, index) => {
      //   return `${row.firstname} ${row.lastname}`;
      // },
      // sorter: {
      //   compare: (a, b) => a.name - b.name,
      // },
    },
    {
      title: <div style={title}>ตำแหน่ง</div>,
      dataIndex: "position",
      key: "position",
      align: "center",
      width: "150px",
    },
    {
      title: <div style={title}>เบอร์โทร</div>,
      dataIndex: "tel",
      key: "tel",
      align: "center",
      width: "150px",
    },

    {},
    // {
    //   title: <div style={title}>อีเมล</div>,
    //   dataIndex: "email",
    //   key: "email",
    // },
    {
      title: <div style={title}>{null}</div>,
      dataIndex: "delete",
      key: "delete",
      width: "10px",
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
    {
      title: <div style={title}>{null}</div>,
      dataIndex: "edit",
      key: "edit",
      width: "100px",
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
            <i
              className="fas fa-user-edit editBtn"
              onClick={() => {
                setSendData(row);
                openModal("edit", "staff");
              }}
            />
          </div>
        );
      },
    },
  ];

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

  const deleteStaff = (row) => {
    // console.log("delete พนักงาน", row);
    notify.success("ลบรายชื่อพนักงาน เรียบร้อย!");
    axios.delete(`${url}/employee/` + row.id);
    LoadData();
  };

  const onSearch = (value) => {
    const regex = new RegExp(value.toString().toUpperCase(), "g");
    const find = filter.filter(({ name }) => {
      const upper = name.toString().toUpperCase();
      return upper.match(regex);
    });
    setdatastaff(find);
    console.log(find);
  };

  const LoadData = () => {
    // loading table  // true = โหลดอยู่ , false = เสร็จแล้ว
    setLoadingTable(true);
    // set Data ใส่ตาราง
    axios.get(`${url}/employee`).then((res) => {
      console.log(res);
      const data = res.data.data.map((v, i) => ({
        ...v,
        no: i + 1,
        firstname: v.employee_firstname,
        lastname: v.employee_lastname,
        position: v.employee_position,
        tel: v.employee_tel,
        name: v.employee_firstname + " " + v.employee_lastname,
        number: v.employee_number,
      }));
      setdatastaff(data);
      setFilter(data);
      // setfilterstaff(data);
    });
    // set Data ไว้ filter
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
            style={{ fontWeight: "bold", fontSize: "36px", color: "black" }}
          >
            รายชื่อพนักงาน
          </label>
          <div className="row mb-4">
            <div className="col-sm-6">
              <Search
                className="adminButton"
                placeholder="ค้นหาพนักงาน"
                style={{ width: 500 }}
                size="large"
                // value={q}
                // onChange={(e) => setQ(e.target.value)}
                onSearch={onSearch}
              />
            </div>
            <div className="col-sm-6 text-sm-right ">
              <Button
                shape="round"
                size={"large"}
                onMouseEnter={() => sethover(true)}
                onMouseLeave={() => sethover(false)}
                onClick={() => openModal("add", "staff")}
                // onClick={() => setshow(true)}
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
            // onRow={(record, recordIndex) => ({
            //   onClick: (e) => {
            //     // console.log(e);
            //     setSendData(record);
            //     openModal("edit", "staff");
            //   },
            // })}
          />
        </div>
      </div>
      {/* <ModalStaff
        reload={LoadData}
        data={SendData}
        show={show}
        closeModal={() => setshow(false)}
      /> */}
      <ModalStaff reload={LoadData} data={SendData} />
    </div>
  );
};

export default AdminStaff;
