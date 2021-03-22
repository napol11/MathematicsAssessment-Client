import React, { useEffect, useState, useRef } from "react";
import {
  // CImg,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInput,
  CInputGroupAppend,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} from "@coreui/react";

const HistoryEmployee = () => {
  const inputReset = useRef(null);
  const [showPass, setshowPass] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const [data, setData] = useState({
    name: null,
    position: null,
    number: null,
    level: null,
    group: null,
    start: null,
    times: null,
  });

  const resetPassword = () => {
    console.log("success");
  };

  useEffect(() => {
    setData({
      name: "สโรชา สังข์บูญ",
      position: "บาริสต้า",
      number: 49,
      level: "เชี่ยวชาญ",
      group: "ดุสิต",
      start: "วันที่ 10  เดือน กรกฎาคม พ.ศ. 2552",
      times: "11 ปี 6 เดือน 22 วัน",
    });
  }, []);
  return (
    <div className="justify-center align-center">
      <div className="row wrap window-height">
        <div className="col-xs-12 col-sm-12 ">
          <div className="text-center">
            <label
              style={{ fontWeight: "bold", fontSize: "36px", color: "black" }}
            >
              ประวัติพนักงาน
            </label>
          </div>
          <div
            className="container-fluid "
            // style={{ paddingTop: "10px" }}
          >
            <div className="row no-gutter">
              <div
                className="col-md-5 text-center"
                style={{ paddingTop: "1%" }}
              >
                {/* <CImg
                  src={"avatars/5.jpg"}
                  style={{
                    borderRadius: "50em",
                    height: "auto",
                    width: "150px",
                    border: "1px solid #f8f8f8 ",
                  }}
                /> */}
                <br />
                {/* <div
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  onClick={() => setVisible(true)}
                  type="submit"
                  className="text-uppercase mb-2 rounded-pill shadow-sm"
                  style={
                    hover
                      ? {
                          color: "white",
                          padding: "10px 80px",
                          marginTop: "10%",
                          backgroundColor: "#f6be32",
                          border: "1px solid #f6be32",
                          fontSize: "16px",
                        }
                      : {
                          color: "black",
                          padding: "10px 80px",
                          marginTop: "10%",
                          backgroundColor: "white",
                          border: "1px solid #f6be32",
                          fontSize: "16px",
                        }
                  }
                >
                  เปลี่ยนรหัสผ่าน
                </div> */}
              </div>
              <div
                className="col-12 "
                style={{
                  //   border: "1px solid black",
                  minHeight: "100px",
                  backgroundColor: "#f8f8f8",
                  borderRadius: "10px",
                  padding: "20px",
                }}
              >
                <label
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "black",
                  }}
                >
                  ข้อมูลทั่วไป
                </label>
                <div className="row no-gutter mb-4">
                  <div className="col-md-4">
                    <label
                      className="m-0"
                      style={{ color: "#5f5f5f", fontSize: "14px" }}
                    >
                      ชื่อ-สกุล
                    </label>
                    <br />
                    <label
                      className="m-0"
                      style={{ color: "black", fontSize: "16px" }}
                    >
                      {data.name}
                    </label>
                  </div>
                  <div className="col-md-4">
                    <label
                      className="m-0"
                      style={{ color: "#5f5f5f", fontSize: "14px" }}
                    >
                      ตำแหน่ง
                    </label>
                    <br />
                    <label
                      className="m-0"
                      style={{ color: "black", fontSize: "16px" }}
                    >
                      {data.position}
                    </label>
                  </div>
                  <div className="col-md-4">
                    <label
                      className="m-0"
                      style={{ color: "#5f5f5f", fontSize: "14px" }}
                    >
                      เลขที่
                    </label>
                    <br />
                    <label
                      className="m-0"
                      style={{ color: "black", fontSize: "16px" }}
                    >
                      {data.number}
                    </label>
                  </div>
                </div>
                <div className="row no-gutter mb-4">
                  <div className="col-md-4">
                    <label
                      className="m-0"
                      style={{ color: "#5f5f5f", fontSize: "14px" }}
                    >
                      ระดับ
                    </label>
                    <br />
                    <label
                      className="m-0"
                      style={{ color: "black", fontSize: "16px" }}
                    >
                      {data.level}
                    </label>
                  </div>
                  <div className="col-md-8">
                    <label
                      className="m-0"
                      style={{ color: "#5f5f5f", fontSize: "14px" }}
                    >
                      สังกัด
                    </label>
                    <br />
                    <label
                      className="m-0"
                      style={{ color: "black", fontSize: "16px" }}
                    >
                      {data.group}
                    </label>
                  </div>
                </div>
                <div className="row no-gutter mb-4">
                  <div className="col-md-8">
                    <label
                      className="m-0"
                      style={{ color: "#5f5f5f", fontSize: "14px" }}
                    >
                      เริ่มปฏิบัติงานเมื่อ
                    </label>
                    <br />
                    <label
                      className="m-0"
                      style={{ color: "black", fontSize: "16px" }}
                    >
                      {data.start}
                    </label>
                  </div>
                  <div className="col-md-4">
                    <label
                      className="m-0"
                      style={{ color: "#5f5f5f", fontSize: "14px" }}
                    >
                      รวมเวลาปฏิบัติงาน
                    </label>
                    <br />
                    <label
                      className="m-0"
                      style={{ color: "black", fontSize: "16px" }}
                    >
                      {data.times}
                    </label>
                  </div>
                </div>
                <div
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  onClick={() => setVisible(true)}
                  type="submit"
                  className="text-uppercase mb-2 rounded-pill shadow-sm"
                  style={
                    hover
                      ? {
                          color: "white",
                          padding: "10px 80px",
                          marginTop: "3%",
                          backgroundColor: "#f6be32",
                          border: "1px solid #f6be32",
                          fontSize: "16px",
                          textAlign: "center",
                          width: "20%",
                        }
                      : {
                          color: "black",
                          padding: "10px 80px",
                          marginTop: "3%",
                          backgroundColor: "white",
                          border: "1px solid #f6be32",
                          fontSize: "16px",
                          textAlign: "center",
                          width: "20%",
                        }
                  }
                >
                  เปลี่ยนรหัสผ่าน
                </div>
              </div>

              <CModal
                show={visible}
                onClose={() => setVisible(!visible)}
                size="sm"
              >
                <CModalHeader closeButton>
                  <CModalTitle>
                    {<i class="fas fa-exchange-alt"> เปลี่ยนรหัสผ่าน</i>}
                  </CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <div className="row no-gutter">
                    <div className="col-md-12">
                      <label
                        className="m-0"
                        style={{ color: "#5f5f5f", fontSize: "14px" }}
                      >
                        รหัสผ่าน
                      </label>
                      <br />
                      <CInputGroup>
                        <CInputGroupPrepend>
                          <CInputGroupText
                            className={"bg-white text-black"}
                            style={{ borderRight: "none" }}
                          >
                            <i className="fas fa-key" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          style={{ borderLeft: "none" }}
                          type={showPass ? "text" : "password"}
                          placeholder="ระบุรหัสผ่านใหม่"
                          name="reset"
                          autoComplete="off"
                          innerRef={inputReset}
                        />
                        <CInputGroupAppend
                          onClick={() => setshowPass(!showPass)}
                        >
                          <CInputGroupText
                            className={"bg-white text-black"}
                            style={{ borderLeft: "none" }}
                          >
                            {showPass ? (
                              <i className="fas fa-eye-slash"></i>
                            ) : (
                              <i className="fas fa-eye" />
                            )}
                          </CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </div>
                  </div>
                </CModalBody>
                <CModalFooter>
                  <CButton color="primary" onClick={resetPassword}>
                    ตกลง
                  </CButton>{" "}
                  <CButton
                    color="secondary"
                    onClick={() => setVisible(!visible)}
                  >
                    ยกเลิก
                  </CButton>
                </CModalFooter>
              </CModal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryEmployee;
