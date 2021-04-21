import React, { useState } from "react";
import { CModal, CModalBody, CModalHeader } from "@coreui/react";
// import { sizeFile, ellipsisText } from "../CustomFunction";

import "./App.css";
import { Upload, message } from "antd";
import "antd/dist/antd.css";

const UploadFile = () => {
  const [show, setShow] = useState(false);
  const [fileList, setFileList] = useState([]);

  const showModal = () => {
    setShow(true);
  };

  const close = () => {
    setShow(false);
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const beforeUpload = (file) => {
    if (file.type !== "application/pdf") {
      message.error(`${file.name} is not a pdf file`);
    }
    return file.type === "application/pdf" ? true : Upload.LIST_IGNORE;
  };

  return (
    <>
      <button className="buttons_add" onClick={showModal}>
        อัปโหลดเอกสาร
      </button>
      <CModal show={show} closeOnBackdrop={false} centered>
        <CModalHeader>
          <label
            className="m-0"
            style={{ color: "black", fontWeight: "bold", fontSize: 20 }}
          >
            เอกสารประกอบการประเมิน (สูงสุด 5 ไฟล์)
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
            name="files"
            action="http://localhost:3001/api/employee/upload"
            multiple={true}
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            maxCount={5}
            beforeUpload={beforeUpload}
          >
            {fileList.length < 5 && "+ Upload"}
          </Upload>
        </CModalBody>
      </CModal>
      {console.log(fileList)}
    </>
  );
};

export default UploadFile;
