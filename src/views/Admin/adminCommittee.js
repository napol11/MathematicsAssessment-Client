import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  // Input,
  Popconfirm,
} from "antd";
import { notify } from "../CustomComponent";
import { useDispatch } from "react-redux";
import ModalAdmin from "./ModalAdmin";

import "./admin.css";

// const { Search } = Input;

const title = {
  color: "white",
  fontWeight: "bold",
  // textAlign: "left"
};

const AdminCommittee = () => {
  // const [hover, setHover] = useState(false);
  const [hover2, setHover2] = useState(false);
  // const [LoadingTable1, setLoadingTable1] = useState(true);
  const [LoadingTable2, setLoadingTable2] = useState(true);
  // const [LoadingSearch, setLoadingSearch] = useState(false);
  // const [dataHeader, setdataHeader] = useState([]);
  const [dataCommittee, setdataCommittee] = useState([]);
  // const [filterCommittee, setfilterCommittee] = useState([]);

  const [SendData, setSendData] = useState([]);

  const dispatch = useDispatch();

  // const columnsHeader = [
  //   {
  //     title: <div style={title}>เลขที่</div>,
  //     dataIndex: "id",
  //     key: "id",
  //     align: "center",
  //     width: "80px",
  //     render: (text, row, index) => {
  //       return index + 1;
  //     },
  //   },
  //   {
  //     title: <div style={title}>ชื่อ-นามสกุล</div>,
  //     dataIndex: "name",
  //     key: "name",
  //   },
  //   {
  //     title: <div style={title}>ตำแหน่ง</div>,
  //     dataIndex: "position",
  //     key: "position",
  //   },
  //   {
  //     title: <div style={title}>เบอร์โทร</div>,
  //     dataIndex: "bel",
  //     key: "bel",
  //   },
  //   {
  //     title: <div style={title}>อีเมล</div>,
  //     dataIndex: "email",
  //     key: "email",
  //   },
  //   {
  //     title: <div style={title}>{null}</div>,
  //     dataIndex: "delete",
  //     key: "delete",
  //     width: "50px",
  //     render: (text, row, index) => {
  //       return (
  //         <div
  //           style={{
  //             wordWrap: "break-word",
  //             wordBreak: "break-word",
  //             textAlign: "center",
  //             backgroundColor: "none",
  //             cursor: "pointer",
  //           }}
  //         >
  //           <Popconfirm
  //             style={{ border: "1px solid black", padding: 10 }}
  //             placement="topRight"
  //             title={`คุณต้องการลบหัวหน้าเลขที่ ${row.no} หรือไม่?`}
  //             onConfirm={() => deleteHeader(row)}
  //             okText="ตกลง"
  //             cancelText="ยกเลิก"
  //           >
  //             <i className="fas fa-trash-alt deleteBtn" />
  //           </Popconfirm>
  //         </div>
  //       );
  //     },
  //   },
  // ];
  const columnsCommittee = [
    {
      title: <div style={title}>เลขที่</div>,
      dataIndex: "id",
      key: "id",
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
              color: "red",
              cursor: "pointer",
            }}
          >
            <Popconfirm
              style={{ border: "1px solid black", padding: 10 }}
              placement="topRight"
              title={`คุณต้องการลบกรรมการเลขที่ ${row.no} หรือไม่?`}
              onConfirm={() => deleteCommittee(row)}
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

  // const deleteHeader = (row) => {
  //   console.log("delete หัวหน้า", row);
  //   notify.success(`ลบรายชื่อหัวหน้า เรียบร้อย!`);
  // };

  const deleteCommittee = (row) => {
    console.log("delete กรรมการ", row);
    notify.success(`ลบรายชื่อกรรมการ เรียบร้อย!`);
  };

  // const search = (value) => {
  //   setLoadingSearch(true);
  //   setLoadingTable2(true);
  //   const regex = new RegExp(value.toString().toUpperCase(), "g");
  //   const find = filterCommittee.filter(({ name }) => {
  //     const upper = name.toString().toUpperCase();
  //     return upper.match(regex);
  //   });
  //   setdataCommittee(find);
  //   setLoadingSearch(false);
  //   setLoadingTable2(false);
  // };

  const LoadData = () => {
    // Axios data ตอนเริ่ม Component
    // loading table ที่ 1 // true = โหลดอยู่ , false = เสร็จแล้ว
    // setLoadingTable1(false);
    // loading table ที่ 2 // true = โหลดอยู่ , false = เสร็จแล้ว
    setLoadingTable2(false);
    //  set dataHeader
    // setdataHeader([
    //   {
    //     no: "1",
    //     name: "John Brown",
    //     position: "xxxxxxxxxxx",
    //     bel: "xxxxxxxxxxx",
    //     email: "xxxxx@hotmail.com",
    //   },
    //   {
    //     no: "2",
    //     name: "Jim Green",
    //     position: "xxxxxxxxxxx",
    //     bel: "xxxxxxxxxxx",
    //     email: "xxxxx@hotmail.com",
    //   },
    //   {
    //     no: "3",
    //     name: "Joe Black",
    //     position: "xxxxxxxxxxx",
    //     bel: "xxxxxxxxxxx",
    //     email: "xxxxx@hotmail.com",
    //   },
    //   {
    //     no: "4",
    //     name: "John Brown",
    //     position: "xxxxxxxxxxx",
    //     bel: "xxxxxxxxxxx",
    //     email: "xxxxx@hotmail.com",
    //   },
    //   {
    //     no: "5",
    //     name: "Jim Green",
    //     position: "xxxxxxxxxxx",
    //     bel: "xxxxxxxxxxx",
    //     email: "xxxxx@hotmail.com",
    //   },
    //   {
    //     no: "6",
    //     name: "Joe Black",
    //     position: "xxxxxxxxxxx",
    //     bel: "xxxxxxxxxxx",
    //     email: "xxxxx@hotmail.com",
    //   },
    // ]);
    //  set dataCommittee
    setdataCommittee([
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
        name: "John Brown1",
        position: "xxxxxxxxxxx",
        bel: "xxxxxxxxxxx",
        email: "xxxxx@hotmail.com",
      },
    ]);
    //  set filterCommittee ทำเหมือน ดาต้า dataCommittee ไว้ filter
    // setfilterCommittee([
    //   {
    //     no: "1",
    //     name: "John Brown",
    //     position: "xxxxxxxxxxx",
    //     bel: "xxxxxxxxxxx",
    //     email: "xxxxx@hotmail.com",
    //   },
    //   {
    //     no: "2",
    //     name: "Jim Green",
    //     position: "xxxxxxxxxxx",
    //     bel: "xxxxxxxxxxx",
    //     email: "xxxxx@hotmail.com",
    //   },
    //   {
    //     no: "3",
    //     name: "Joe Black",
    //     position: "xxxxxxxxxxx",
    //     bel: "xxxxxxxxxxx",
    //     email: "xxxxx@hotmail.com",
    //   },
    //   {
    //     no: "4",
    //     name: "John Brown1",
    //     position: "xxxxxxxxxxx",
    //     bel: "xxxxxxxxxxx",
    //     email: "xxxxx@hotmail.com",
    //   },
    // ]);
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
            รายชื่อกรรมการ
          </label>

          {/* <div className="row no-gutter mb-3">
            <div className="col-sm-6">
              <label
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  color: "black",
                }}
              >
                รายชื่อหัวหน้า
              </label>
            </div>
            <div className="col-sm-6 text-sm-right ">
              <Button
                shape="round"
                size={"large"}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => openModal("add", "head")}
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
                เพิ่มหัวหน้า
              </Button>
            </div>
          </div>

          <Table
            rowKey={"no"} // uniq key หรือ primary key ตัวไม่ซ้ำ
            className="adminTable"
            columns={columnsHeader}
            dataSource={dataHeader}
            pagination={false}
            loading={{
              spinning: LoadingTable1,
              tip: "กำลังโหลด...",
              size: "large",
            }}
            locale={{ emptyText: "ไม่มีข้อมูล" }}
            scroll={{ y: 120 }}
            size="small"
            onRow={(record, recordIndex) => ({
              onClick: (e) => {
                setSendData(record);
                openModal("edit", "head");
              },
            })}
          /> */}

          <div className="row no-gutter mt-4">
            <div className="col-sm-12">
              <label
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  color: "black",
                }}
              >
                รายชื่อกรรมการ
              </label>
            </div>
          </div>
          <div className="row no-gutter  mb-3">
            {/* <div className="col-sm-6">
              <Search
                className="adminButton"
                placeholder="ค้นหารายชื่อกรรมการ"
                loading={LoadingSearch}
                style={{ width: "80%" }}
                onSearch={search}
              />
            </div> */}
            <div className="col-sm-12 text-sm-right ">
              <Button
                shape="round"
                size={"large"}
                onMouseEnter={() => setHover2(true)}
                onMouseLeave={() => setHover2(false)}
                onClick={() => openModal("add", "committee")}
                style={
                  hover2
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
                เพิ่มกรรมการ
              </Button>
            </div>
          </div>
          <Table
            rowKey={"no"} // uniq key หรือ primary key ตัวไม่ซ้ำ
            className="adminTable"
            columns={columnsCommittee}
            dataSource={dataCommittee}
            pagination={false}
            loading={{
              spinning: LoadingTable2,
              tip: "กำลังโหลด...",
              size: "large",
            }}
            locale={{ emptyText: "ไม่มีข้อมูล" }}
            // scroll={{ y: 160 }}
            size="small"
            onRow={(record, recordIndex) => ({
              onClick: (e) => {
                setSendData(record);
                openModal("edit", "committee");
              },
            })}
          />
        </div>
      </div>
      <ModalAdmin reload={LoadData} data={SendData} />
    </div>
  );
};

export default AdminCommittee;
