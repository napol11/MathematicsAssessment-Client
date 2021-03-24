import React from "react";
import "antd/dist/antd.css";
import { Row, Col, Form, Input, InputNumber } from "antd";

import "./App.css";

const name = "สโรชา";
const surname = "สังข์บุญลือ";
const postion = "บาริสต้า";
const no = "49";
const level = "เชี่ยวชาญ";
const affiiliate = "ดุสิต";
const datestart = "วันที่ 10 เดือนกรกฎาคม พ.ศ. 2552";
const datetotal = "11 ปี 6 เดือน 22 วัน   ";

function UserProfile() {
  return (
    <div style={{ width: "100%" }}>
      <div className="userform1">
        <h1>ส่วนที่ 1 ข้อมูลทั่วไปเกี่ยวกับพนักงาน</h1>

        {/* ข้อมูลทั่วไป */}
        <div className="card">
          <h2>ข้อมูลทั่วไป</h2>
          <Row className="headrow">
            <Col xs={24} sm={12} md={5} lg={5} xl={5}>
              ชื่อ-สกุล
            </Col>
            <Col xs={24} sm={12} md={5} lg={5} xl={5}>
              ตำแหน่ง
            </Col>
            <Col xs={24} sm={12} md={5} lg={5} xl={5}>
              เลขที่
            </Col>
            <Col xs={24} sm={12} md={5} lg={5} xl={5}>
              ระดับ
            </Col>
            <Col xs={24} sm={12} md={4} lg={4} xl={4}>
              สังกัด
            </Col>
          </Row>
          <Row className="inrow">
            <Col xs={24} sm={12} md={5} lg={5} xl={5}>
              {name} {surname}
            </Col>
            <Col xs={24} sm={12} md={5} lg={5} xl={5}>
              {postion}
            </Col>
            <Col xs={24} sm={12} md={5} lg={5} xl={5}>
              {no}
            </Col>
            <Col xs={24} sm={12} md={5} lg={5} xl={5}>
              {level}
            </Col>
            <Col xs={24} sm={12} md={4} lg={4} xl={4}>
              {affiiliate}
            </Col>
          </Row>
          <Row className="headrow">
            <Col xs={24} sm={12} md={14} lg={12} xl={10}>
              เริ่มปฎิบัติการเมื่อ
            </Col>
            <Col xs={24} sm={12} md={10} lg={12} xl={12}>
              รวมเวลาปฏิบัติงาน
            </Col>
          </Row>
          <Row className="inrow">
            <Col xs={24} sm={12} md={14} lg={12} xl={10}>
              {datestart}
            </Col>
            <Col xs={24} sm={12} md={10} lg={12} xl={12}>
              {datetotal}
            </Col>
          </Row>
        </div>

        <Form>
          {/* ประวัติการลา */}
          <div className="card">
            <form>
              <h2>ประวัติการลา</h2>
              <Row className="headrow">
                <Col xs={24} sm={24} md={14} lg={14} xl={7}>
                  เวลาปฏิบัติงานในรอบปีงบประมาณที่ผ่านมา
                </Col>
                <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                  1 มกราคม 2562 - 30 กรกฎาคม 2562
                </Col>
              </Row>
              <Row className="headrow">
                <Col span={24}>โดยมีวันหยุดงาน ดังนี้</Col>
              </Row>
              <Row className="headrow">
                <Col span={6}>ลาป่วย</Col>
                <Col span={6}>ลาป่วย ที่มีใบรับรองแพทย์</Col>
                <Col span={6}>ลากิจ</Col>
                <Col span={6}>มาสาย</Col>
              </Row>
              <Row className="inrow">
                <Col span={3}>
                  <Form.Item
                    id="lasick"
                    name="lasick"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาระบุจำนวนวัน!",
                      },
                    ]}
                  >
                    <InputNumber placeholder="จำนวนวัน" />
                  </Form.Item>
                </Col>
                <Col span={3} offset={3}>
                  <Form.Item
                    id="lasickwithepaper"
                    name="lasickwithepaper"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาระบุจำนวนวัน!",
                      },
                    ]}
                  >
                    <InputNumber placeholder="จำนวนวัน" />
                  </Form.Item>
                </Col>
                <Col span={3} offset={3}>
                  <Form.Item
                    id="lapersonal"
                    name="lapersonal"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาระบุจำนวนวัน!",
                      },
                    ]}
                  >
                    <InputNumber placeholder="จำนวนวัน" />
                  </Form.Item>
                </Col>
                <Col span={3} offset={3}>
                  <Form.Item
                    id="lalate"
                    name="lalate"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาระบุจำนวนวัน!",
                      },
                    ]}
                  >
                    <InputNumber placeholder="จำนวนวัน" />
                  </Form.Item>
                </Col>
              </Row>
              <Row className="headrow">
                <Col span={6}>ลาพักผ่อน</Col>
                <Col span={6}>ลาคลอดบุตร</Col>
                <Col span={6}>ลาอุปสมบท</Col>
                <Col span={6}>ขาดราชการ</Col>
              </Row>
              <Row className="inrow">
                <Col span={3}>
                  <Form.Item
                    id="larest"
                    name="larest"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาระบุจำนวนวัน!",
                      },
                    ]}
                  >
                    <InputNumber placeholder="จำนวนวัน" />
                  </Form.Item>
                </Col>
                <Col span={3} offset={3}>
                  <Form.Item
                    id="lababy"
                    name="lababy"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาระบุจำนวนวัน!",
                      },
                    ]}
                  >
                    <InputNumber placeholder="จำนวนวัน" />
                  </Form.Item>
                </Col>
                <Col span={3} offset={3}>
                  <Form.Item
                    id="lamonk"
                    name="lamonk"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาระบุจำนวนวัน!",
                      },
                    ]}
                  >
                    <InputNumber placeholder="จำนวนวัน" />
                  </Form.Item>
                </Col>
                <Col span={3} offset={3}>
                  <Form.Item
                    id="lamilitary"
                    name="lamilitary"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาระบุจำนวนวัน!",
                      },
                    ]}
                  >
                    <InputNumber placeholder="จำนวนวัน" />
                  </Form.Item>
                </Col>
              </Row>
            </form>
          </div>

          {/* ประวัติการเลื่อนขั้นเงินเดือน */}
          <div className="card">
            <form>
              <h2>ประวัติการเลื่อนขั้นเงินเดือน</h2>
              <Row className="headrow">
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={24}
                  xl={2}
                  style={{ marginTop: "12px" }}
                >
                  ปีงบประมาณ
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                  <Form.Item
                    id="yearbudget1"
                    name="yearbudget1"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกข้อความ!",
                      },
                    ]}
                  >
                    <Input
                      style={{ width: "90%", marginTop: "8px" }}
                      placeholder=""
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                  <Form.Item
                    id="yearbudget2"
                    name="yearbudget2"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกข้อความ!",
                      },
                    ]}
                  >
                    <Input
                      style={{ width: "90%", marginTop: "8px" }}
                      placeholder=""
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row className="headrow">
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={24}
                  xl={2}
                  style={{ marginTop: "12px" }}
                >
                  % การเลื่อนขั้น
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                  <Form.Item
                    id="percentpromo1"
                    name="percentpromo1"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกข้อความ!",
                      },
                    ]}
                  >
                    <Input
                      style={{ width: "90%", marginTop: "8px" }}
                      placeholder=""
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                  <Form.Item
                    id="percentpromo2"
                    name="percentpromo2"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกข้อความ!",
                      },
                    ]}
                  >
                    <Input
                      style={{ width: "90%", marginTop: "8px" }}
                      placeholder=""
                    />
                  </Form.Item>
                </Col>
              </Row>
            </form>
          </div>

          {/* ประวัติการถูกลงโทษทางวินัย */}
          <div className="card">
            <form>
              <h2>ประวัติการถูกลงโทษทางวินัย</h2>
              <Row className="headrow">
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={24}
                  xl={1}
                  style={{ marginTop: "12px" }}
                >
                  เมื่อ
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={10}>
                  <Form.Item
                    id="punishdate"
                    name="punishdate"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาระบุวันที่!",
                      },
                    ]}
                  >
                    <Input
                      style={{ width: "90%", marginTop: "8px" }}
                      placeholder="ระบุว่าเมื่อใด"
                    />
                  </Form.Item>
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={24}
                  xl={2}
                  style={{ marginTop: "12px" }}
                >
                  ระดับที่ลงโทษ
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={10}>
                  <Form.Item
                    id="punishlevel"
                    name="punishlevel"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาระบุระดับที่ลงโทษ!",
                      },
                    ]}
                  >
                    <Input
                      style={{ width: "90%", marginTop: "8px" }}
                      placeholder="ระบุระดับที่ลงโทษ"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </form>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default UserProfile;
