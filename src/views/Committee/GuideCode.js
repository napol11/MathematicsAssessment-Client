import React from "react";
import "antd/dist/antd.css";
import { CModal, CModalHeader, CModalBody } from "@coreui/react";
import { Row, Col, Divider } from "antd";

class GuideCode extends React.Component {
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
          <button className="buttons_form2_2" onClick={this.showModal}>
            รหัสกลยุทธ์
          </button>
        </div>
        <CModal show={this.state.visible} onClose={this.showModal} size="xl">
          <CModalHeader>
            <h4>รหัสการพัฒนามหาวิทยาลัยในระยะแผนกลยุทธ์ ฉบับที่ 12 (Strategic Goals)</h4>
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
            <Row style={{ backgroundColor: "whitesmoke" }}>
              <Col span={9} style={{ textAlign: "left" }}>
                <p>
                  1.ผลิตบัณฑิตที่มีคุณภาพตามคุณลักษณะที่พึงประสงค์ของ มจธ.
                  (Social Change Agent)
                </p>
              </Col>
              <Col span={13}>
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
              <Col span={9} style={{ textAlign: "left", marginTop: 10 }}>
                <p>
                  2.สร้างความเป็นเลิศทางการวิจัย งานสร้างสรรค์ และนวัตกรรม
                  (Research and Innovation)
                </p>
              </Col>
              <Col span={13}>
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
              <Col span={9} style={{ textAlign: "left", marginTop: 10 }}>
                <p>3.พัฒนา มจธ. สู่ความเป็นสากล(Internationalization)</p>
              </Col>
              <Col span={13}>
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
                    - ส่งเสริมศักยภาพนักศึกษาให้มีสมรรถนะสากล
                    พร้อมเป็นพลเมืองโลก
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
              <Col span={9} style={{ textAlign: "left", marginTop: 10 }}>
                <p>
                  4.พัฒนาสมรรถนะองค์กรเพื่อให้บริการอย่างมีคุณภาพ สู่การเป็น
                  “องค์กรที่มีขีดสมรรถนะสูง” High (Performance Organization)
                </p>
              </Col>
              <Col span={13}>
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
              <Col span={9} style={{ textAlign: "left", marginTop: 10 }}>
                <p>
                  5.ส่งเสริมและพัฒนาที่เป็นมิตรกับสังคมและสิ่งแวดล้อม (Green
                  Heart)
                </p>
              </Col>
              <Col span={13}>
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
              <Col span={9} style={{ textAlign: "left", marginTop: 10 }}>
                <p>6.เครือข่ายและพันธมิตร (Alliances and Partnerships)</p>
              </Col>
              <Col span={13}>
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
              <Col span={9} style={{ textAlign: "left", marginTop: 10 }}>
                <p>7.KMUTT New Normal</p>
              </Col>
              <Col span={13}></Col>
              <Col span={2} style={{ textAlign: "center" }}>
                <p>71</p>
              </Col>
            </Row>
            <Divider style={{ margin: 0 }} />
          </CModalBody>
        </CModal>
      </>
    );
  }
}

export default GuideCode;
