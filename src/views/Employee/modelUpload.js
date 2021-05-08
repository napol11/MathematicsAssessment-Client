import React, { useState } from "react";
import { CModal, CModalBody, CModalHeader } from "@coreui/react";
import axios from "axios";

import "./App.css";
import { Upload, Button } from "antd";
import "antd/dist/antd.css";
import { notify } from "../CustomComponent";

import Cookies from "js-cookie";
import { token } from "../../config";
import { useParams } from "react-router-dom";

const url = `http://localhost:3001/api/employee`;

const UploadFile = (props) => {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [disable, setDisable] = useState(true);

  const showModal = () => {
    setShow(true);
    LoadData();
  };

  const close = () => {
    setShow(false);
    setFileList([]);
  };

  const beforeUpload = (file) => {
    if (file.type !== "application/pdf") {
      notify.error(`${file.name} สามารถแนบเอกสารที่เป็น PDF เท่านั้น`);
    } else {
      setFileList((fileList) => [...fileList, file]);
      setDisable(false);
      return false;
    }
  };

  const handleUpload = async () => {
    const id_assessment = `${id}`;
    const id_employee = Cookies.get(token.userId);
    const table = props.table;
    const form = props.form;

    setUploading(true);
    // console.log(fileList);

    const data = new FormData();
    fileList.forEach((File) => {
      data.append("files", File, File.name);
    });
    data.append("id_assessment", id_assessment);
    data.append("id_employee", id_employee);
    data.append("table", table);
    data.append("form", form);
    await axios
      .post(`${url}/upload`, data)
      .then((res) => {
        notify.success("อับโหลดได้");
        setUploading(false);
        console.log(res);
        setDisable(true);
      })
      .catch((e) => {
        console.log(e);
        notify.error("อับโหลดไม่ได้");
        setDisable(true);
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

    const id_assessment = `${id}`;
    const id_employee = Cookies.get(token.userId);
    const user = {
      assessment_id: id_assessment,
      employee_id: id_employee,
    };
    axios.patch(`${url}/file/` + file.id, user).then((res) => {
      console.log(res);
    });
  };

  const LoadData = () => {
    const id_assessment = `${id}`;
    const id_employee = Cookies.get(token.userId);
    const data = {
      assessment_id: id_assessment,
      employee_id: id_employee,
    };
    axios.post(`${url}/file`, data).then((res) => {
      const data = res.data.data;
      const table = props.table;
      const fileform = props.form;
      console.log(data);
      if (data === "not found file") {
        setFileList([]);
      } else {
        const form = data.filter((v) => v.form === fileform);
        if (form.length > 0) {
          const file = form.filter((v) => v.table === table);
          if (file.length > 0) {
            const list = file.map((v, i) => ({
              ...v,
              uid: i + 1,
              name: v.doc_originalname,
              url: "http://localhost:3001/api/employee/file/" + v.doc_name,
            }));
            console.log(list);
            setFileList(list);
          } else {
            setFileList([]);
          }
        } else {
          setFileList([]);
        }
      }
    });
  };

  return (
    <>
      <b
        className="buttons_add ml-3"
        onClick={showModal}
        style={{ fontWeight: "normal" }}
      >
        {/* {fileList.length > 0 ? "มีเอกสาร" : "อัปโหลดเอกสาร"} */}
        แนบเอกสาร
      </b>
      <CModal show={show} closeOnBackdrop={false} centered>
        <CModalHeader>
          <label
            className="m-0"
            style={{ color: "black", fontWeight: "bold", fontSize: 20 }}
          >
            เอกสารประกอบการประเมิน (สามารถแนบไฟล์สกุล PDF ได้เพียง 1 ไฟล์)
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
            action={handleUpload}
            multiple={false}
            listType="picture"
            fileList={fileList}
            maxCount={1}
            beforeUpload={beforeUpload}
            onRemove={onRemove}
            // iconRender= {}
            showUploadList={{ showPreviewIcon: true }}
          >
            {fileList.length < 1 && "+ เพิ่มเอกสาร"}
          </Upload>
          <center>
            <Button
              type="primary"
              onClick={handleUpload}
              disabled={fileList.length === 0 || disable ? true : false}
              style={{
                marginTop: 16,
                backgroundColor: "white",
                color: "black",
              }}
              // loading={uploading}
            >
              {uploading ? "กำลังอัปโหลด" : "แนบเอกสาร"}
              {/* Start Upload */}
            </Button>
          </center>
        </CModalBody>
      </CModal>
    </>
  );
};

export default UploadFile;
