import React, { useState, useEffect } from "react";
import { Button, Table, Popconfirm } from "antd";
import { notify } from "../CustomComponent";
import { useDispatch } from "react-redux";
import ModalCommittee from "./ModalCommittee";

import "./admin.css";
import axios from "axios";
const url = `http://localhost:3001/api/admin`;

const title = { color: "white", fontWeight: "bold", textAlign: "center" };

const AdminCommittee = () => {
  const [hover, setHover] = useState(false);
  const [LoadingTable, setLoadingTable] = useState(true);
  const [dataCommittee, setdataCommittee] = useState([]);
  const [SendData, setSendData] = useState([]);

  const dispatch = useDispatch();

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
      render: (text, row, index) => {
        return `${row.firstname} ${row.lastname}`;
      },
    },
    {
      title: <div style={title}>ตำแหน่ง</div>,
      dataIndex: "position",
      key: "position",
      //   render: (text, row, index) => {
      //     return `${text === "lead" ? "หัวหน้า" : "กรรมการ"}`;
      //   },
    },
    {
      title: <div style={title}>เบอร์โทร</div>,
      dataIndex: "tel",
      key: "tel",
    },
    // {
    //   title: <div style={title}>อีเมล</div>,
    //   dataIndex: "email",
    //   key: "email",
    // },
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
    {
      title: <div style={title}>{null}</div>,
      dataIndex: "edit",
      key: "edit",
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
            <i
              className="fas fa-user-edit editBtn"
              onClick={() => {
                setSendData(row);
                openModal("edit", "committee");
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

  const deleteCommittee = (row) => {
    notify.success(`ลบรายชื่อกรรมการ เรียบร้อย!`);
    axios.delete(`${url}/committee/` + row.id);
    LoadData();
  };

  const LoadData = () => {
    // Axios data ตอนเริ่ม Component

    axios.get(`${url}/committee`).then((res) => {
      const data = res.data.data.map((v, i) => ({
        ...v,
        no: i + 1,
        firstname: v.committee_firstname,
        lastname: v.committee_lastname,
        position: v.committee_position,
        tel: v.committee_tel,
      }));
      setdataCommittee(data);
    });

    // loading table  // true = โหลดอยู่ , false = เสร็จแล้ว
    setLoadingTable(false);

    //  set dataCommittee
    // position lead = "หัวหน้า"
    // position committee = "กรรมการ"
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

          <div className="row no-gutter  mb-3">
            <div className="col-sm-6" />

            <div className="col-sm-6 text-sm-right ">
              <Button
                shape="round"
                size={"large"}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => openModal("add", "committee")}
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
            // onRow={(record, recordIndex) => ({
            //   onClick: (e) => {
            //     console.log(e);
            //     setSendData(record);
            //     openModal("edit", "committee");
            //   },
            // })}
          />
        </div>
      </div>
      <ModalCommittee reload={LoadData} data={SendData} />
    </div>
  );
};

export default AdminCommittee;
