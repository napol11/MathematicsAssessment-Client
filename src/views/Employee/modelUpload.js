import React, { useState } from "react";
import { CModal, CModalBody, CModalHeader } from "@coreui/react";

import { Upload } from "antd";
import "./App.css";

const UploadFile = () => {
  const [show, setShow] = useState(false);
  const [fileList, setFileList] = useState([]);

  const showModal = () => {
    setShow(true);
  };

  const close = () => {
    setShow(false);
  };

  const onChange = ({ file: newFileList }) => {
    setFileList(newFileList);
  };

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
            เอกสาร
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
          <Upload
            onChange={onChange}
            fileList={fileList}
            maxCount={5}
            listType="picture-card"
          >
            {" "}
            {fileList.length < 5 && "+ Upload"}{" "}
          </Upload>
        </CModalBody>
      </CModal>
    </>
  );
};

export default UploadFile;
