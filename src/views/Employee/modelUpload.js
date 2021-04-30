import React, { useState } from "react";
import { CModal, CModalBody, CModalHeader } from "@coreui/react";
// import { sizeFile, ellipsisText } from "../CustomFunction";
// import reqwest from "reqwest";
import axios from "axios";

import "./App.css";
import { Upload, Button } from "antd";
import "antd/dist/antd.css";
import { notify } from "../CustomComponent";

import Cookies from "js-cookie";
import { token } from "../../config";
import { useParams } from "react-router-dom";

const UploadFile = (props) => {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const showModal = () => {
    setShow(true);
  };

  const close = () => {
    setShow(false);
  };

  const beforeUpload = (file) => {
    if (file.type !== "application/pdf") {
      notify.error(`${file.name} is not a pdf file`);
    } else {
      setFileList((fileList) => [...fileList, file]);
      return false;
    }
  };

  const handleUpload = async () => {
    const id_assessment = `${id}`;
    const id_employee = Cookies.get(token.userId);
    const table = props.table;

    setUploading(true);

    const data = new FormData();
    fileList.forEach((File) => {
      data.append("files", File, File.name);
    });
    data.append("id_assessment", id_assessment);
    data.append("id_employee", id_employee);
    data.append("table", table);
    await axios
      .post("http://localhost:3001/api/employee/upload", data)
      .then((res) => {
        notify.success("อับโหลดได้");
        setUploading(false);
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        notify.error("อับโหลดไม่ได้");
        setUploading(false);
        // setFileList([]);
      });
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
        {fileList.length > 0 ? "มีเอกสาร" : "อัปโหลดเอกสาร"}
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
            // loading={uploading}
          >
            {uploading ? "Uploading" : "Start Upload"}
            {/* Start Upload */}
          </Button>
        </CModalBody>
      </CModal>
    </>
  );
};

export default UploadFile;
