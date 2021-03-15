import React, { useState } from "react";
import { CModal, CModalBody } from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import { sizeFile, ellipsisText } from "../CustomFunction";

const ModalCommitteeAssessment2 = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.committeeAss2Modal);
  const [file, setFile] = useState({
    file: null,
    name: null,
    size: 0,
  });

  const resetFile = () => {
    setFile({
      file: null,
      name: null,
      size: 0,
    });
  };

  const close = () => {
    resetFile();
    dispatch({ type: "set", committeeAss2Modal: { ...modal, show: false } });
  };

  const onChange = (e) => {
    setFile({
      file: e.target.files[0], /// ไฟล์อัพโหลด จะเอาไปให้ใช้ redux
      name: e.target.files[0].name,
      size: e.target.files[0].size,
    });
    console.log(e.target.files[0]);
  };

  return (
    <CModal show={modal.show} closeOnBackdrop={false} centered size="lg">
      <CModalBody>
        <div>
          <div
            className="row no-gutte pr-4"
            style={{ justifyContent: "flex-end" }}
          >
            <i
              className="fas fa-times-circle"
              style={{ color: "#F04D22", cursor: "pointer" }}
              onClick={close}
            />
          </div>
          <div className="row no-gutter">
            <div className="col-sm-12">
              <label style={{ fontWeight: "bold" }}>
                เอกสารเกี่ยวกับการประเมิน
              </label>
            </div>
          </div>

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
        </div>
      </CModalBody>
    </CModal>
  );
};

export default ModalCommitteeAssessment2;
