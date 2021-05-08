import React, { useState, useEffect } from "react";
import { CModal, CModalBody, CModalHeader } from "@coreui/react";
import axios from "axios";

import "./head.css";
import { Upload } from "antd";
import "antd/dist/antd.css";
import { useParams } from "react-router-dom";

const url = `https://database-api-pj.herokuapp.com/api/employee`;

const UploadFile = (props) => {
  const { id, assessment } = useParams();
  const [show, setShow] = useState(false);
  const [fileList, setFileList] = useState([]);

  const showModal = () => {
    setShow(true);
    // LoadData();
  };

  const close = () => {
    setShow(false);
    // setFileList([]);
  };

  const LoadData = () => {
    const id_assessment = `${assessment}`;
    const id_employee = `${id}`;
    const data = {
      assessment_id: id_assessment,
      employee_id: id_employee,
    };
    axios.post(`${url}/file`, data).then((res) => {
      const data = res.data.data;
      const table = parseInt(props.table);
      const fileform = props.form;
      // console.log(data);
      // console.log(table);
      // console.log(fileform);
      if (data === "not found file") {
        setFileList([]);
      } else {
        const form = data.filter((v) => v.form === fileform);
        if (form.length > 0) {
          console.log(form.table === 1);
          const file = form.filter((v) => v.table === table);
          if (file.length > 0) {
            const list = file.map((v, i) => ({
              ...v,
              uid: i + 1,
              name: v.doc_originalname,
              url:
                "https://database-api-pj.herokuapp.com/api/employee/file/" +
                v.doc_name,
            }));
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

  useEffect(() => {
    LoadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <b
        className={`ml-3 ${
          fileList.length > 0 ? "buttons_add" : "buttons_disable"
        }`}
        onClick={showModal}
      >
        {fileList.length > 0 ? "มีเอกสาร" : "ไม่มีเอกสาร"}
        {/* เอกสาร */}
      </b>
      <CModal show={show} closeOnBackdrop={false} centered>
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
          <Upload
            name="files"
            multiple={false}
            listType="picture"
            fileList={fileList}
            showUploadList={
              ({ showPreviewIcon: true }, { showRemoveIcon: false })
            }
          ></Upload>
        </CModalBody>
      </CModal>
    </>
  );
};

export default UploadFile;
