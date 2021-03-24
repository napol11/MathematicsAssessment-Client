import React from 'react';
import 'antd/dist/antd.css';
import { Modal, Row, Col } from 'antd';
import { AiFillCloseCircle } from "react-icons/ai"

class GuidePoint extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
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
        <Modal
            title="หมายเหตุคะแนน"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okButtonProps={{ disabled: true }}
            cancelButtonProps={{ disabled: true }}
            footer={null}
            width="35%"
            closeIcon={<AiFillCloseCircle color="#F04D22" size="50%"/>}
        >
            <Row>
                <Col>
                    <img className="guidepointpic" src="/logo/หมายเหตุคะแนน.png" alt="หมายเหตุคะแนน" />
                </Col>
                <Col >
                    <p>4 = ประสิทธิภาพดีเยี่ยม ควรเป็นแบบอย่าง</p>
                    <p>3.5 = ประสิทธิภาพดีมาก</p>
                    <p>3 = ประสิทธิภาพดี</p>
                    <p>2.5 = ประสิทธิภาพพอใช้ ต้องปรับปรุง</p>
                    <p>2 = ต้องการปรับปรุงพัฒนา</p>
                    <p>1.5 = ต้องการปรับปรุงพัฒนาอย่างมาก</p>
                    <p>1 = ต้องการปรับปรุงพัฒนาอย่างเร่งด่วน</p>
                </Col>
            </Row>
            <h3 style={{ textAlign: "center", marginTop: "2%" }}>**คะแนนในส่วนนี้คิดเป็นคะแนนเต็ม 70 คะแนน ของผลงานในภาพรวมทั้งหมด</h3>
        </Modal>
      </>
    );
  }
}

export default GuidePoint
