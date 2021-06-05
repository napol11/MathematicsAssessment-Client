import React, { useRef, useState } from "react";
import {
  CImg,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInput,
  CInputGroupAppend,
  CLabel,
} from "@coreui/react";
// import imgHeader from "./logo.png";
import picture from "./login.png";
import logo from "./Group 772.png";

import { notify } from "../CustomComponent";
import { token } from "../../config";
import Cookies from "js-cookie";

import "./login.css";

import axios from "axios";
const url = `https://database-api-pj.herokuapp.com/api/auth`;

const Login = () => {
  const [showPass, setshowPass] = useState(false);
  const inputUsername = useRef(null);
  const inputPassword = useRef(null);
  // const [userData, setUserData] = useState(null);

  const submitLogin = (e) => {
    e.preventDefault();
    const username = inputUsername.current.value; // ค่า username
    const password = inputPassword.current.value; // ค่า password
    const login = {
      username: username,
      password: password,
    };
    axios
      .post(`${url}/login`, login)
      .then((res) => {
        const data = res.data;
        // console.log(data);
        // setUserData(data);
        if (data != null) {
          if (data.data.role === 2) {
            Cookies.set(token.type, 1);
            Cookies.set(token.token, "kmuttTest");
            Cookies.set(token.userId, data.data.profile.id);
            Cookies.set(
              token.userName,
              data.data.profile.employee_firstname +
                " " +
                data.data.profile.employee_lastname
            );
            Cookies.set(
              token.userPosition,
              data.data.profile.employee_position
            );
            window.location.replace("/employee/history");
          } else if (
            data.data.role === 1 &&
            data.data.profile.committee_status === 0
          ) {
            Cookies.set(token.type, 2);
            Cookies.set(token.token, "kmuttTest");
            Cookies.set(token.userId, data.data.profile.id);
            Cookies.set(
              token.userName,
              data.data.profile.committee_firstname +
                " " +
                data.data.profile.committee_lastname
            );
            Cookies.set(
              token.userPosition,
              data.data.profile.committee_position
            );
            window.location.replace("/committee");
          } else if (
            data.data.role === 1 &&
            data.data.profile.committee_status === 1
          ) {
            Cookies.set(token.type, 4);
            Cookies.set(token.token, "kmuttTest");
            Cookies.set(token.userId, data.data.profile.id);
            Cookies.set(
              token.userName,
              data.data.profile.committee_firstname +
                " " +
                data.data.profile.committee_lastname
            );
            Cookies.set(
              token.userPosition,
              data.data.profile.committee_position
            );
            window.location.replace("/head");
          } else if (data.data.role === 0) {
            // user: admin pass: 0846438474
            Cookies.set(token.type, 3);
            Cookies.set(token.token, "kmuttTest");
            Cookies.set(token.userName, "Admin");
            Cookies.set(token.userPosition, "admin");
            window.location.replace("/administrator/committee");
          }
        }
      })
      .catch((err) => {
        console.log(err);
        notify.error("ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง !");
      });
    // if (userData != null) {
    //   if (userData.data.role === 2) {
    //     Cookies.set(token.type, 1);
    //     Cookies.set(token.token, "kmuttTest");
    //     Cookies.set(token.userId, userData.data.profile.id);
    //     window.location.replace("/employee/history");
    //   } else if (
    //     userData.data.role === 1 &&
    //     userData.data.profile.committee_status === 0
    //   ) {
    //     Cookies.set(token.type, 2);
    //     Cookies.set(token.token, "kmuttTest");
    //     Cookies.set(token.userId, userData.data.profile.id);
    //     window.location.replace("/committee");
    //   } else if (
    //     userData.data.role === 1 &&
    //     userData.data.profile.committee_status === 1
    //   ) {
    //     Cookies.set(token.type, 4);
    //     Cookies.set(token.token, "kmuttTest");
    //     Cookies.set(token.userId, userData.data.profile.id);
    //     window.location.replace("/head");
    //   } else if (userData.data.role === 0) {
    //     // user: admin pass: 0846438474
    //     Cookies.set(token.type, 3);
    //     Cookies.set(token.token, "kmuttTest");
    //     window.location.replace("/administrator/committee");
    //   }
    // }

    // set cookie token.type ไว้ทำสิทธิ์หน้าเมนู
    // set cookie token.token สิทธ์เข้าถึงหน้าเมนู
    // token.type 1 Employee
    // token.type 2 Head / Committee
    // token.type 3 Admin
    // ******************** ไว้เปลี่ยน token.type _nav.js ********************
    // window.location.replace("/"); // Login เสร็จต้องไปหน้าหลัก ห้ามใช้ history.push เฉพาะอันนี้
  };

  // const resetPassword = () => {
  //   // const username = inputUsername.current.value;
  //   // รีเซ็ตรหัส
  //   console.log("reset password");
  // };

  return (
    <div className="maincontainer">
      <div className="container-fluid">
        <div className="row no-gutter">
          <div
            className="col-md-6 d-none d-md-flex"
            style={{
              backgroundImage: "url(" + picture + ")",
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          >
            <div className="container">
              <CImg
                src={logo}
                className="d-inline-block align-top m-4"
                alt="KMUTT ระบบประเมินประสิทธิภาพพนักงานสายสนับสนุน"
                height="128"
              />
              {/* <div
                className="row ml-4 mt-4"
                style={{
                  fontWeight: "bold",
                  fontSize: "24px",
                  color: "#fdc331",
                }}
              >
                Department of
              </div>
              <div
                className="row ml-4"
                style={{
                  fontWeight: "bold",
                  fontSize: "24px",
                  color: "#fdc331",
                }}
              >
                Mathematics
              </div> */}
            </div>
            <br />
          </div>

          <div className="col-md-6 bg-white">
            <div
              className=" d-flex align-items-center py-5"
              style={{ minHeight: "100vh" }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-lg-10 col-xl-7 mx-auto">
                    <h1 className=" text-center">
                      ลงชื่อเข้าสู่ระบบประเมินประสิทธิภาพ
                    </h1>
                    <br />
                    <form onSubmit={submitLogin}>
                      <div className="form-group mb-3">
                        <CLabel style={{ color: "#7e7e7e" }}>
                          ชื่อผู้ใช้งาน
                        </CLabel>
                        <CInputGroup>
                          <CInputGroupPrepend>
                            <CInputGroupText
                              className={"login_input bg-white text-black"}
                              style={{ borderRight: "none" }}
                            >
                              <i className="fas fa-user" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            style={{ borderLeft: "none" }}
                            type="text"
                            placeholder="ระบุชื่อผู้ใช้งาน"
                            className="username"
                            name="username"
                            autoComplete="off"
                            innerRef={inputUsername}
                          />
                        </CInputGroup>
                      </div>
                      <div className="form-group mb-3">
                        <CLabel style={{ color: "#7e7e7e" }}>รหัสผ่าน</CLabel>
                        <CInputGroup>
                          <CInputGroupPrepend>
                            <CInputGroupText
                              className={"login_input bg-white text-black"}
                              style={{ borderRight: "none" }}
                            >
                              <i className="fas fa-key" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            style={{ borderLeft: "none", borderRight: "none" }}
                            type={showPass ? "text" : "password"}
                            placeholder="ระบุรหัสผ่าน"
                            className="password"
                            name="password"
                            innerRef={inputPassword}
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

                      {/* <div className="text-right">
                        <label
                          className="mr-4 text-reset-password"
                          onClick={resetPassword}
                        >
                          ลืมรหัสผ่าน
                        </label>
                      </div> */}
                      <button
                        type="submit"
                        className="submitYellow btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                        style={{ color: "white" }}
                      >
                        เข้าสู่ระบบ
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
