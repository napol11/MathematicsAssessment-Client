import React from "react";
import "antd/dist/antd.css";
import { Row, Col } from "antd";

import { CModal, CModalHeader, CModalBody } from "@coreui/react";

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
          <CModalHeader closeButton>หมายเหตุคะแนน</CModalHeader>
          <CModalBody>
            <Row>
              <Col>
                <img
                  className="guidepointpic"
                  src="/logo/หมายเหตุคะแนน.png"
                  alt="หมายเหตุคะแนน"
                />
              </Col>
              <Col>
                <p>4 = ประสิทธิภาพดีเยี่ยม ควรเป็นแบบอย่าง</p>
                <p>3.5 = ประสิทธิภาพดีมาก</p>
                <p>3 = ประสิทธิภาพดี</p>
                <p>2.5 = ประสิทธิภาพพอใช้ ต้องปรับปรุง</p>
                <p>2 = ต้องการปรับปรุงพัฒนา</p>
                <p>1.5 = ต้องการปรับปรุงพัฒนาอย่างมาก</p>
                <p>1 = ต้องการปรับปรุงพัฒนาอย่างเร่งด่วน</p>
              </Col>
            </Row>
            <h3 style={{ textAlign: "center", marginTop: "2%" }}>
              **คะแนนในส่วนนี้คิดเป็นคะแนนเต็ม 70 คะแนน ของผลงานในภาพรวมทั้งหมด
            </h3>
          </CModalBody>
        </CModal>
      </>
    );
  }
}

export default GuidePoint;
