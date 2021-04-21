import React, { useState } from "react";
import { CModal, CModalBody, CModalHeader } from "@coreui/react";
import { sizeFile, ellipsisText } from "../CustomFunction";

import "./App.css";

const UploadFile = () => {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState([]);

  const showModal = () => {
    setShow(true);
  };

  const close = () => {
    setShow(false);
  };

  // const onChange = ({ file: newFileList }) => {
  //   setFileList(newFileList);
  // };

  const onChange = (e) => {
    // const data = new FormData();
    // console.log(e.target.files);
    // setFile(e.target.files);
    // for (var i = 0; i < file.length; i++) {
    //   data.append("files", file[i]);
    // }
    // console.log(file);
    // console.log(data);
    setFile({
      file: e.target.files[0], /// ไฟล์อัพโหลด จะเอาไปให้ใช้ redux
      name: e.target.files[0].name,
      size: e.target.files[0].size,
    });
  };

  const resetFile = () => {
    setFile({
      file: null,
      name: null,
      size: 0,
    });
  };

  // const beforeUpload = (file) => {
  //   if (file.type !== "image/png") {
  //     message.error(`${file.name} is not a pdf file`);
  //   }
  //   return file.type === "image/png" ? true : Upload.LIST_IGNORE;
  // };

  return (
    <>
      <button className="buttons_add" onClick={showModal}>
        อัปโหลดเอกสาร
      </button>
      <CModal show={show} closeOnBackdrop={false} centered size="md">
        <CModalHeader>
          <label
            className="m-0"
            style={{ color: "black", fontWeight: "bold", fontSize: 20 }}
          >
            เอกสารประกอบการประเมิน
          </label>

          <div className="col-2 text-right">
            <i
              onClick={close}
              className="fas fa-times-circle"
              style={{
                color: "red",
                cursor: "pointer",
                fontSize: 20,
              }}
            />
          </div>
        </CModalHeader>
        <CModalBody>
          <div className="row no-gutter mt-3 mb-4">
            <div className="col-sm-1" />
            <div
              className="col-sm-3"
              style={{
                borderRadius: "5px",
                height: "150px",
                backgroundColor: "rgba(246, 190, 50, 0.38)",
              }}
            >
              <div
                className="row pr-2 pt-2"
                style={{ justifyContent: "flex-end" }}
              >
                {file.file ? (
                  <i
                    className="fas fa-times"
                    style={{ cursor: "pointer" }}
                    onClick={resetFile}
                  />
                ) : null}
              </div>
              <div className="text-center">
                <input
                  type="file"
                  id="file_upload"
                  accept="application/pdf"
                  style={{ display: "none" }}
                  onChange={onChange}
                  // multiple
                />
                <label htmlFor="file_upload" style={{ cursor: "pointer" }}>
                  {file.file ? (
                    <i
                      className="fas fa-file-pdf"
                      style={{ fontSize: "50px" }}
                    />
                  ) : (
                    <i
                      className="fas  fa-file-upload"
                      style={{ fontSize: "50px" }}
                    />
                  )}
                </label>
                <p>{file.name ? ellipsisText(file.name) : "ไม่มีไฟล์"}</p>
                <p style={{ fontSize: "5px" }}>{sizeFile(file.size)}</p>
              </div>
            </div>
          </div>
        </CModalBody>
      </CModal>
    </>
  );
};

export default UploadFile;
