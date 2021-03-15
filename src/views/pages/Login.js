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
import imgHeader from "./logo.png";
import picture from "./login.png";

import { token } from "../../config";
import Cookies from "js-cookie";

import "./login.css";

const Login = () => {
  const [showPass, setshowPass] = useState(false);
  const inputUsername = useRef(null);
  const inputPassword = useRef(null);

  const submitLogin = (e) => {
    e.preventDefault();
    const username = inputUsername.current.value; // ค่า username
    const password = inputPassword.current.value; // ค่า password
    // set cookie token.type ไว้ทำสิทธิ์หน้าเมนู
    // set cookie token.token สิทธ์เข้าถึงหน้าเมนู
    // token.type 1 Employee
    // token.type 2 Head / Committee
    // token.type 3 Admin
    // ******************** ไว้เปลี่ยน token.type _nav.js ********************
    if (Number(username) === 1 && Number(password) === 123) {
      Cookies.set(token.type, 1);
      Cookies.set(token.token, "kmuttTest");
      window.location.replace("/");
    } else if (Number(username) === 2 && Number(password) === 123) {
      Cookies.set(token.type, 2);
      Cookies.set(token.token, "kmuttTest");
      window.location.replace("/");
    } else if (Number(username) === 3 && Number(password) === 123) {
      Cookies.set(token.type, 3);
      Cookies.set(token.token, "kmuttTest");
      window.location.replace("/");
    }
    // window.location.replace("/"); // Login เสร็จต้องไปหน้าหลัก ห้ามใช้ history.push เฉพาะอันนี้
  };

  const resetPassword = () => {
    // const username = inputUsername.current.value;
    // รีเซ็ตรหัส
    console.log("reset password");
  };

  return (
    <div className="maincontainer">
      <div className="container-fluid">
        <div className="row no-gutter">
          <div
            className="col-md-5 d-none d-md-flex"
            style={{
              backgroundImage: "url(" + picture + ")",
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          >
            <div className="container">
              <CImg
                src={imgHeader}
                className="d-inline-block align-top m-4"
                alt="KMUTT ระบบประเมินประสิทธิภาพพนักงานสายสนับสนุน"
                height="128"
              />
              <div
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
                Mathematic
              </div>
            </div>
            <br />
          </div>

          <div className="col-md-7 bg-white">
            <div
              className=" d-flex align-items-center py-5"
              style={{ minHeight: "100vh" }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-lg-10 col-xl-7 mx-auto">
                    <h1 className=" text-center">ลงชื่อเข้าสู่ระบบ</h1>
                    <br />
                    <form onSubmit={submitLogin}>
                      <div className="form-group mb-3">
                        <CLabel style={{ color: "#7e7e7e" }}>
                          ชื่อผู้ใช้งาน
                        </CLabel>
                        <CInputGroup>
                          <CInputGroupPrepend>
                            <CInputGroupText
                              className={"bg-white text-black"}
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
                              className={"bg-white text-black"}
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

                      <div className="text-right">
                        <label
                          className="mr-4 text-reset-password"
                          onClick={resetPassword}
                        >
                          ลืมรหัสผ่าน
                        </label>
                      </div>
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
