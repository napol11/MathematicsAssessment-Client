import React from "react";
import "antd/dist/antd.css";
import { Button } from "antd";

import { CModal, CModalBody, CModalHeader } from "@coreui/react";
import { BsQuestion } from "react-icons/bs";

import logo from "../pages/admin.PNG";

class UserGuideadmin extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <div>
          <Button 
            shape="circle" 
            icon={<BsQuestion size={25}/>} 
            onClick={this.showModal}
            className="userguide_button"
          />
        </div>
        <CModal show={this.state.visible} onClose={this.showModal} size="xl">
          <CModalHeader>
            <h3>วิธีใช้งานสำหรับผู้ดูแลระบบ</h3>
            <div className="text-right">
              <i
                onClick={this.showModal}
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
            <img src={logo} alt="userguideadmin" style={{ width: "100%" }} />
          </CModalBody>
        </CModal>
      </>
    );
  }
}

export default UserGuideadmin;