import React from "react";
import "antd/dist/antd.css";
import { Modal, Row, Col, Divider } from "antd";
import { AiFillCloseCircle } from "react-icons/ai";

class GuideCode extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
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
          <button className="buttons_form2_2" onClick={this.showModal}>
            รหัสกลยุทธ์
          </button>
        </div>
        <Modal
          visible={this.state.visible}
          title="รหัสการพัฒนามหาวิทยาลัยในระยะแผนกลยุทธ์ ฉบับที่ 12 (Strategic Goals) "
          onCancel={this.handleCancel}
          footer={null}
          width="70%"
          style={{ textAlign: "center", top: "2%" }}
          closeIcon={<AiFillCloseCircle color="#F04D22" size="50%" />}
        >
          <Row style={{ backgroundColor: "whitesmoke" }}>
            <Col span={10} style={{ textAlign: "left" }}>
              <p>
                1.ผลิตบัณฑิตที่มีคุณภาพตามคุณลักษณะที่พึงประสงค์ของ มจธ. (Social
                Change Agent)
              </p>
            </Col>
            <Col span={12}>
              <Row>
                <p> - พัฒนาและปรับปรุงกระบวนการเรียนรู้</p>
                <Divider style={{ margin: 0 }} />
                <p> - พัฒนาสมรรถนะอาจารย์</p>
                <Divider style={{ margin: 0 }} />
                <p> - พัฒนาสภาพแวดล้อมที่เอื้อต่อการเรียนรู้</p>
              </Row>
            </Col>
            <Col span={2} style={{ textAlign: "center" }}>
              <p>11</p>
              <Divider style={{ margin: 0 }} />
              <p>12</p>
              <Divider style={{ margin: 0 }} />
              <p>13</p>
            </Col>
          </Row>
          <Divider style={{ margin: 0 }} />
          <Row>
            <Col span={10} style={{ textAlign: "left", marginTop: 10 }}>
              <p>
                2.สร้างความเป็นเลิศทางการวิจัย งานสร้างสรรค์ และนวัตกรรม
                (Research and Innovation)
              </p>
            </Col>
            <Col span={12}>
              <Row>
                <p>
                  {" "}
                  - สนับสนุนกลุ่มวิจัยที่มหาวิทยาลัยมีศักยภาพ
                  ให้เป็นศูนย์ความเป็นเลิศระดับภูมิภาค
                </p>
                <Divider style={{ margin: 0 }} />
                <p>
                  {" "}
                  -
                  พัฒนาโครงสร้างพื้นฐานและระบบส่งเสริมการวิจัยที่แข่งขั้นได้ในระดับชาติและนานาชาติ
                </p>
                <Divider style={{ margin: 0 }} />
                <p>
                  {" "}
                  - สร้างสิ่งแวดล้อมที่เกื้อหนุนการวิจัย
                  ดึงดูดและรักษาบุคลากรที่มีความเป็นเลิศทางวิชาการ
                </p>
                <Divider style={{ margin: 0 }} />
                <p>
                  {" "}
                  -
                  ส่งเสริมการจัดหาทรัพยากรวิจัยและความร่วมมือกับภาคการผลิตและการวิจัย
                </p>
                <Divider style={{ margin: 0 }} />
                <p> - ขับเคลื่อนการพัฒนานวัตกรรมและผู้ประกอบการ</p>
                <Divider style={{ margin: 0 }} />
                <p>
                  {" "}
                  -
                  ส่งเสริมภาพลักษณ์การวิจัยให้เป็นที่ประจักษ์และสร้างผลกระทบจากผลงานวิจัยและนวัตกร
                </p>
              </Row>
            </Col>
            <Col span={2} style={{ textAlign: "center" }}>
              <p>21</p>
              <Divider style={{ margin: 0 }} />
              <p>22</p>
              <Divider style={{ margin: 0 }} />
              <p>23</p>
              <Divider style={{ margin: 0 }} />
              <p>24</p>
              <Divider style={{ margin: 0 }} />
              <p>25</p>
              <Divider style={{ margin: 0 }} />
              <p>26</p>
            </Col>
          </Row>
          <Divider style={{ margin: 0 }} />
          <Row style={{ backgroundColor: "whitesmoke" }}>
            <Col span={10} style={{ textAlign: "left", marginTop: 10 }}>
              <p>3.พัฒนา มจธ. สู่ความเป็นสากล(Internationalization)</p>
            </Col>
            <Col span={12}>
              <Row>
                <p>
                  {" "}
                  -
                  พัฒนาและปรับปรุงโครงสร้างพื้นฐานที่มีมาตรฐานสากลและส่งเสริมความเป็นนานาชาติ
                </p>
                <Divider style={{ margin: 0 }} />
                <p>
                  {" "}
                  -
                  พัฒนาความเข็มแข็งทางวิชาการของมหาวิทยาลัยเพื่อการพัฒนาสู่ความเป็นสากล
                </p>
                <Divider style={{ margin: 0 }} />
                <p>
                  {" "}
                  - ส่งเสริมศักยภาพนักศึกษาให้มีสมรรถนะสากล พร้อมเป็นพลเมืองโลก
                </p>
                <Divider style={{ margin: 0 }} />
                <p>
                  {" "}
                  - สร้างความรู้จักและเป็นที่ยอมรับของมหาวิทยาลัยในระดับสากล
                  (Visibility) แบบมุ่งเป้า
                </p>
              </Row>
            </Col>
            <Col span={2} style={{ textAlign: "center" }}>
              <p>31</p>
              <Divider style={{ margin: 0 }} />
              <p>32</p>
              <Divider style={{ margin: 0 }} />
              <p>33</p>
              <Divider style={{ margin: 0 }} />
              <p>34</p>
            </Col>
          </Row>
          <Divider style={{ margin: 0 }} />
          <Row>
            <Col span={10} style={{ textAlign: "left", marginTop: 10 }}>
              <p>
                4.พัฒนาสมรรถนะองค์กรเพื่อให้บริการอย่างมีคุณภาพ สู่การเป็น
                “องค์กรที่มีขีดสมรรถนะสูง” High (Performance Organization)
              </p>
            </Col>
            <Col span={12}>
              <Row>
                <p>
                  {" "}
                  - ปรับกระบวนทัศน์การบริหารจัดการให้เกิดความคล่องตัว
                  และส่งเสริมการทำงานร่วมกันแบบองค์รวม
                </p>
                <Divider style={{ margin: 0 }} />
                <p> - ปรับเปลี่ยนทัศนคติและศักยภาพของบุคลากร</p>
                <Divider style={{ margin: 0 }} />
                <p>
                  {" "}
                  - แสวงหา บริหารทรัพย์สิน
                  และรายได้เพื่อการพี่งพาตนเองได้อย่างมีเสถียรภาพยั่งยืน
                </p>
                <Divider style={{ margin: 0 }} />
                <p>
                  {" "}
                  -
                  พัฒนาขีดความสามารถด้านเทคโนโลยีสารสนเทศสู่การเป็นมหาวิทยาลัยดิจิทัล
                </p>
              </Row>
            </Col>
            <Col span={2} style={{ textAlign: "center" }}>
              <p>41</p>
              <Divider style={{ margin: 0 }} />
              <p>42</p>
              <Divider style={{ margin: 0 }} />
              <p>43</p>
              <Divider style={{ margin: 0 }} />
              <p>44</p>
            </Col>
          </Row>
          <Divider style={{ margin: 0 }} />
          <Row style={{ backgroundColor: "whitesmoke" }}>
            <Col span={10} style={{ textAlign: "left", marginTop: 10 }}>
              <p>
                5.ส่งเสริมและพัฒนาที่เป็นมิตรกับสังคมและสิ่งแวดล้อม (Green
                Heart)
              </p>
            </Col>
            <Col span={12}>
              <Row>
                <p>
                  {" "}
                  -
                  พัฒนาสภาพแวดล้อมและระบบริหารจัดการที่สนับสนุนการสร้างคุณภาพชีวิตที่ดี
                  (Quality of Life)
                </p>
                <Divider style={{ margin: 0 }} />
                <p>
                  {" "}
                  - สร้างความตระหนักรู้ด้านพลังงาน สิ่งแวดล้อม และความปลอดภัย
                  ในทุกระดับ
                </p>
                <Divider style={{ margin: 0 }} />
                <p>
                  {" "}
                  - บูรณาแนวคิดสร้างสรรค์การพัฒนาเพื่อความยั่งยืนกับภารกิจหลัก
                </p>
              </Row>
            </Col>
            <Col span={2} style={{ textAlign: "center" }}>
              <p>51</p>
              <Divider style={{ margin: 0 }} />
              <p>52</p>
              <Divider style={{ margin: 0 }} />
              <p>53</p>
            </Col>
          </Row>
          <Divider style={{ margin: 0 }} />
          <Row>
            <Col span={10} style={{ textAlign: "left", marginTop: 10 }}>
              <p>6.เครือข่ายและพันธมิตร (Alliances and Partnerships)</p>
            </Col>
            <Col span={12}>
              <Row>
                <p> - เครือข่ายและพันธมิตร Alliances and Partnerships</p>
              </Row>
            </Col>
            <Col span={2} style={{ textAlign: "center" }}>
              <p>61</p>
            </Col>
          </Row>
          <Divider style={{ margin: 0 }} />
          <Row style={{ backgroundColor: "whitesmoke" }}>
            <Col span={10} style={{ textAlign: "left", marginTop: 10 }}>
              <p>7.KMUTT New Normal</p>
            </Col>
            <Col span={12}></Col>
            <Col span={2} style={{ textAlign: "center" }}>
              <p>71</p>
            </Col>
          </Row>
          <Divider style={{ margin: 0 }} />
        </Modal>
      </>
    );
  }
}

export default GuideCode;
