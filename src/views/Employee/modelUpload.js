import React, { useState } from "react";
import { CModal, CModalBody, CModalHeader } from "@coreui/react";
// import { sizeFile, ellipsisText } from "../CustomFunction";

import "./App.css";
import { Upload, Button } from "antd";
import "antd/dist/antd.css";
import { notify } from "../CustomComponent";

import Cookies from "js-cookie";
import { token } from "../../config";
import { useParams } from "react-router-dom";

const UploadFile = () => {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [fileList, setFileList] = useState([]);
  // const [uploading, setUploading] = useState(false);

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
      notify.error(`${file.name} is not a pdf file`);
    } else {
      // setFileList(fileList, file);
      return false;
      // const id_assessment = `${id}`;
      // const id_employee = Cookies.get(token.userId);
      // const formData = new FormData();
      // fileList.forEach((file) => {
      //   formData.append("file", file, id_assessment, id_employee);
      // });
    }
    // return file.type === "application/pdf" ? true : Upload.LIST_IGNORE;
  };

  const handleUpload = () => {
    const id_assessment = `${id}`;
    const id_employee = Cookies.get(token.userId);
    const formData = new FormData();
    const user = {
      id_assessment: id_assessment,
      id_employee: id_employee,
    };
    // fileList.forEach((file) => {
    formData.append("file", fileList, user);
    // });
    // setUploading(true);
    console.log(formData);
  };

  const onRemove = (file) => {
    const data = fileList;
    const index = data.indexOf(file);
    const newFileList = data.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
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
            // action="http://localhost:3001/api/employee/upload"
            multiple={true}
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            maxCount={5}
            beforeUpload={beforeUpload}
            onRemove={onRemove}
          >
            {fileList.length < 5 && "+ Upload"}
          </Upload>
          <Button
            type="primary"
            onClick={handleUpload}
            disabled={fileList.length === 0}
            style={{ marginTop: 16, backgroundColor: "white", color: "black" }}
          >
            {/* {uploading ? "Uploading" : "Start Upload"} */}
            Start Upload
          </Button>
        </CModalBody>
      </CModal>
    </>
  );
};

export default UploadFile;
