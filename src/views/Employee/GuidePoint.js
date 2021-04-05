import React from "react";
import "antd/dist/antd.css";
import { Row, Col } from "antd";

import { CModal, CModalBody } from "@coreui/react";

import logo from "../pages/หมายเหตุคะแนน.png";

class GuidePoint extends React.Component {
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
        <div className="control-buttons">
          <button className="buttons_form2_1" onClick={this.showModal}>
            หมายเหตุคะแนน
          </button>
        </div>
        <CModal show={this.state.visible} onClose={this.showModal} size="lg">
          <CModalBody>
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
            <Row style={{ marginTop: "3%" }}>
                <Col offset={13}>
                    <h3>หมายเหตุการให้คะแนน</h3>
                </Col>
            </Row>
            <Row justify="start" style={{ marginTop: "1%" }}>
              <Col>
                <img className="guidepointpic" src={logo} alt="หมายเหตุคะแนน" />
              </Col>
              <Col style={{ textAlign: "start" }}>
                <p>4 = ประสิทธิภาพดีเยี่ยม ควรเป็นแบบอย่าง</p>
                <p>3.5 = ประสิทธิภาพดีมาก</p>
                <p>3 = ประสิทธิภาพดี</p>
                <p>2.5 = ประสิทธิภาพพอใช้ ต้องปรับปรุง</p>
                <p>2 = ต้องการปรับปรุงพัฒนา</p>
                <p>1.5 = ต้องการปรับปรุงพัฒนาอย่างมาก</p>
                <p>1 = ต้องการปรับปรุงพัฒนาอย่างเร่งด่วน</p>
              </Col>
            </Row>
            <h4 style={{ textAlign: "center", marginTop: "3%" }}>
              **คะแนนในส่วนนี้คิดเป็นคะแนนเต็ม 70 คะแนน ของผลงานในภาพรวมทั้งหมด
            </h4>
          </CModalBody>
        </CModal>
      </>
    );
  }
}

export default GuidePoint;
