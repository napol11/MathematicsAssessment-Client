import React, { useEffect, useState } from "react";
import { Button, Table, Popconfirm, Input } from "antd";
// import { WatDatePicker } from "thaidatepicker-react";
import { notify } from "../CustomComponent";
// import { date2Thai } from "../CustomFunction";
import ModalAssess from "./ModalAssess";
import { date2Thai } from "../CustomFunction";

import { useDispatch } from "react-redux";

import "./admin.css";
import axios from "axios";
const url = `https://database-api-pj.herokuapp.com/api/admin`;

const title = { color: "white", fontWeight: "bold", textAlign: "center" };

const { Search } = Input;

const AdminAssessment = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState([]);

  const [Hover, setHover] = useState(false);
  // const [selectedDateStart, setSelectedDateStart] = useState("");
  // const [selectedDateEnd, setSelectedDateEnd] = useState("");
  //   const [selectedDateStartTH, setSelectedDateStartTH] = useState(""); //วันที่ไทย
  //   const [selectedDateEndTH, setSelectedDateEndTH] = useState(""); //วันที่ไทย
  const [data, setdata] = useState([]);
  // const [filter, setfilter] = useState([]);
  const [LoadingTable, setLoadingTable] = useState(false);
  // const [show, setshow] = useState(false);
  // const [ModalTitle, setModalTitle] = useState("");
  const [SendData, setSendData] = useState([]);

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

  const LoadData = async () => {
    axios.get(`${url}/assessment`).then((res) => {
      // console.log(res);
      const data = res.data.data.map((v, i) => ({
        ...v,
        no: i + 1,
        name: v.assessment_name,
        start: v.assessment_start,
        end: v.assessment_end,
        edit: v.assessment_endedit,
      }));
      setdata(data);
      console.log(data);
      setFilter(data);
    });

    setLoadingTable(true);
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

  const deleteStaff = (row) => {
    notify.success(`ลบรายการประเมิน เรียบร้อย!`);
    axios.delete(`${url}/assessment/` + row.id);
    LoadData();
  };

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
      title: <div style={title}>รอบการประเมิน</div>,
      dataIndex: "name", //ตั้งไม่ซ้ำ กับฟิลด์ดาต้า
      key: "name", //ตั้งไม่ซ้ำ กับฟิลด์ดาต้า
      width: "500px",
      // render: (text, row, index) => {
      //   // ห้ามเป็น null
      //   return dateText(row.start, row.end);
      // },
    },
    {
      title: <div style={title}>วันเริ่มประเมิน</div>,
      dataIndex: "start",
      key: "start",
      align: "center",
      width: "150px",
      render: (text, row, index) => {
        return dateText(row.start);
      },
      // sorter: {
      //   compare: (a, b) => a.start - b.start,
      // },
    },
    {
      title: <div style={title}>วันสิ้นสุดส่งแบบฟอร์ม</div>,
      dataIndex: "edit",
      key: "edit",
      align: "center",
      width: "150px",
      render: (text, row, index) => {
        return dateText(row.edit);
      },
      // sorter: {
      //   compare: (a, b) => a.edit - b.edit,
      // },
    },
    {
      title: <div style={title}>วันสิ้นสุดประเมิน</div>,
      dataIndex: "end",
      key: "end",
      align: "center",
      width: "150px",
      render: (text, row, index) => {
        return dateText(row.end);
      },
      // sorter: {
      //   compare: (a, b) => a.end - b.end,
      // },
    },
    {},
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
              title={`คุณต้องการลบรอบการประเมินเลขที่ ${row.no} หรือไม่?`}
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
              className="fas fa-edit editBtn"
              onClick={() => {
                setSendData(row);
                openModal("edit", "assessment");
              }}
            />
          </div>
        );
      },
    },
  ];

  const onSearch = (value) => {
    const regex = new RegExp(value.toString().toUpperCase(), "g");
    const find = filter.filter(({ name }) => {
      const upper = name.toString().toUpperCase();
      return upper.match(regex);
    });
    setdata(find);
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
            การประเมิน
          </label>
          <div className="row mb-4">
            <div className="col-sm-6">
              <Search
                className="adminButton"
                placeholder="ค้นหาการประเมิน"
                style={{ width: 500 }}
                size="large"
                // value={q}
                // onChange={(e) => setQ(e.target.value)}
                onSearch={onSearch}
              />
            </div>
            <div className="col-sm-6 d-sm-flex align-items-sm-end justify-content-sm-end">
              <Button
                shape="round"
                size={"large"}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => openModal("add")}
                style={
                  Hover
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
                เพิ่มการประเมิน
              </Button>
            </div>
          </div>
          {/* ********************************************************** */}
          <Table
            rowKey={"no"} // uniq key หรือ primary key ตัวไม่ซ้ำ
            className="adminTable"
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
            // onRow={(record, recordIndex) => ({
            //   onClick: (e) => {
            //     setSendData({
            //       ...record,
            //       text: dateText(record.start, record.end),
            //     });
            //     openModal("edit");
            //   },
            // })}
          />
        </div>
      </div>
      {/* <ModalAssess
        show={show}
        close={closeModal}
        // title={ModalTitle}
        // data={SendData}
      /> */}
      <ModalAssess reload={LoadData} data={SendData} />
    </div>
  );
};

export default AdminAssessment;
