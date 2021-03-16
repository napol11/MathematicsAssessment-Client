import React, { useEffect, useState } from "react";
import { Button, Table, Input, Popconfirm } from "antd";
import { WatDatePicker } from "thaidatepicker-react";
import { notify } from "../CustomComponent";
import { date2Thai } from "../CustomFunction";
import ModalAssess from "./ModalAssess";

import "./admin.css";

const title = { color: "white", fontWeight: "bold", textAlign: "center" };

const AdminAssessment = () => {
  const [Hover, setHover] = useState(false);
  const [selectedDateStart, setSelectedDateStart] = useState("");
  const [selectedDateEnd, setSelectedDateEnd] = useState("");
  //   const [selectedDateStartTH, setSelectedDateStartTH] = useState(""); //วันที่ไทย
  //   const [selectedDateEndTH, setSelectedDateEndTH] = useState(""); //วันที่ไทย
  const [data, setdata] = useState([]);
  const [filter, setfilter] = useState([]);
  const [LoadingTable, setLoadingTable] = useState(false);
  const [show, setshow] = useState(false);
  const [ModalTitle, setModalTitle] = useState("");
  // const [SendData, setSendData] = useState([]);

  const LoadData = () => {
    setLoadingTable(true);
    setdata([
      // custom ใน column
      {
        no: "1",
        // round: "วว ดด ปป - วว ดด ปป",
        start: "2021-02-01", // yyyy-mm-dd
        end: "2021-02-20", // yyyy-mm-dd
      },
      {
        no: "2",
        // round: "วว ดด ปป - วว ดด ปป",
        start: "2021-02-20", // yyyy-mm-dd
        end: "2021-02-22", // yyyy-mm-dd
      },
      {
        no: "3",
        // round: "วว ดด ปป - วว ดด ปป",
        start: "2021-02-22", // yyyy-mm-dd
        end: "2021-02-25", // yyyy-mm-dd
      },
    ]);
    setfilter([
      // custom ใน column
      {
        no: "1",
        // round: "วว ดด ปป - วว ดด ปป",
        start: "2021-02-01", // yyyy-mm-dd
        end: "2021-02-20", // yyyy-mm-dd
      },
      {
        no: "2",
        // round: "วว ดด ปป - วว ดด ปป",
        start: "2021-02-20", // yyyy-mm-dd
        end: "2021-02-22", // yyyy-mm-dd
      },
      {
        no: "3",
        // round: "วว ดด ปป - วว ดด ปป",
        start: "2021-02-22", // yyyy-mm-dd
        end: "2021-02-25", // yyyy-mm-dd
      },
    ]);
    setLoadingTable(false);
  };

  const closeModal = () => {
    setshow(false);
  };

  const openModal = (type) => {
    const list = "รายการประเมิน";
    if (type === "add") {
      setModalTitle({ name: `เพิ่ม${list}`, type: "add" });
      setshow(true);
    } else {
      setModalTitle({ name: `แก้ไข${list}`, type: "edit" });
      setshow(true);
    }
  };

  const deleteStaff = (row) => {
    console.log("delete การประเมิน", row);
    notify.success(`ลบรายการประเมิน เรียบร้อย!`);
  };

  const filterData = (s, e) => {
    setLoadingTable(true); // loading table  // true = โหลดอยู่ , false = เสร็จแล้ว
    const find = filter.filter(({ start, end }) => {
      return start >= s && end <= e;
    });
    setdata(find); // set Data ใส่ตาราง
    setLoadingTable(false);
  };

  const handleDatePickerStart = (christDate, buddhistDate) => {
    setSelectedDateStart(christDate);
    // setSelectedDateStartTH(buddhistDate); วันที่ไทย
    if (christDate !== "" && selectedDateEnd !== "") {
      //   notify.success("filter");
      filterData(christDate, selectedDateEnd);
    } else {
      LoadData();
    }
  };

  const handleDatePickerEnd = (christDate, buddhistDate) => {
    setSelectedDateEnd(christDate);
    // setSelectedDateEndTH(buddhistDate); วันที่ไทย
    if (christDate !== "" && selectedDateStart !== "") {
      //   notify.success("filter");
      filterData(selectedDateStart, christDate);
    } else {
      LoadData();
    }
  };

  const dateText = (begin, finish) => {
    const len = date2Thai(begin).toString().length;
    const lend = date2Thai(finish).toString().length;
    const ystart = date2Thai(begin)
      .toString()
      .substring(len - 2, len); // ตัดจาก 2564 เป็น 64
    const dMstart = date2Thai(begin)
      .toString()
      .substring(0, len - 4); // 01 ก.พ. 2564 เป็น 01 ก.พ.
    const start = dMstart + ystart; // รวม  01 ก.พ. 64
    const yend = date2Thai(finish)
      .toString()
      .substring(lend - 2, lend); // ตัดจาก 2564 เป็น 64
    const dMend = date2Thai(finish)
      .toString()
      .substring(0, lend - 4); // 01 ก.พ. 2564 เป็น 01 ก.พ
    const end = dMend + yend; // รวม  01 ก.พ. 64
    return `${start} - ${end}`;
  };

  const columns = [
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
      title: (
        <div style={{ color: "white", fontWeight: "bold", textAlign: "left" }}>
          รอบการประเมิน
        </div>
      ),
      dataIndex: "round", //ตั้งไม่ซ้ำ กับฟิลด์ดาต้า
      key: "round", //ตั้งไม่ซ้ำ กับฟิลด์ดาต้า
      render: (text, row, index) => {
        // ห้ามเป็น null
        return dateText(row.start, row.end);
      },
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
              title={`คุณต้องการรอบการประเมินเลขที่ ${row.no} หรือไม่?`}
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
          <div className="row no-gutter  mb-3">
            <div className="col-sm-6">
              <label style={{ color: "#c3c9d2" }}>ค้นหารอบการประเมิน</label>
              <Input.Group compact>
                <WatDatePicker
                  value={selectedDateStart}
                  onChange={handleDatePickerStart}
                  placeholder={"เริ่มวันที่"}
                  dateFormat={"yyyy-MM-dd"}
                  displayFormat={"DD MMM YY"}
                  inputStyle={{
                    color: "black",
                    borderRight: "none",
                    width: 120,
                  }}
                  maxDate={selectedDateEnd}
                  clearable={true}
                />
                <Input
                  className="site-input-split"
                  style={{
                    width: 30,
                    borderLeft: 0,
                    borderRight: 0,
                    pointerEvents: "none",
                    backgroundColor: "white",
                  }}
                  placeholder={`~`}
                  disabled
                />
                <WatDatePicker
                  onChange={handleDatePickerEnd}
                  placeholder={"สิ้นสุดวันที่"}
                  dateFormat={"yyyy-MM-dd"}
                  displayFormat={"DD MMM YY"}
                  inputStyle={{
                    color: "black",
                    borderLeft: "none",
                    width: 120,
                  }}
                  minDate={selectedDateStart}
                  clearable={true}
                />
                <Input
                  className="site-input-split"
                  style={{
                    width: 30,
                    borderLeft: 0,

                    pointerEvents: "none",
                    backgroundColor: "white",
                  }}
                  placeholder={`~`}
                  disabled
                  prefix={<i className="fas fa-calendar-alt" />}
                />
              </Input.Group>
            </div>
            <div className="col-sm-6  d-sm-flex align-items-sm-end justify-content-sm-end mt-2 ">
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
      <ModalAssess
        show={show}
        close={closeModal}
        title={ModalTitle}
        // data={SendData}
      />
    </div>
  );
};

export default AdminAssessment;
