import React from "react";

import "antd/dist/antd.css";
import { Form, Input } from "antd";

import "./App.css";

const { TextArea } = Input;

function UserFrom3() {
  return (
    <div style={{ width: "100%" }}>
      <div className="userform3">
        <div className="col-sm-12">
          <label
            style={{ fontWeight: "bold", fontSize: "24px", color: "black" }}
          >
            {` ส่วนที่ 2.2 แบบประเมินคุณลักษณะการปฏิบัติงานและคุณสมบัติเฉพาะตัวสำหรับพนักงานระดับปฏิบัติการ`}
          </label>
        </div>
        <Form>
          <p>1. ท่านขาดความรู้ ความชำนาญ ทักษะในเรื่องใดบ้าง</p>
          <Form.Item
            id="form3employees1"
            name="form3employees1"
            rules={[
              {
                required: true,
                message: "กรุณากรอกข้อความ!",
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <p>
            2. ท่านคิดว่าจะสามารถเพิ่มความรู้ ความชำนาญ
            ทักษะดังกล่าวได้โดยวิธีใดบ้าง
          </p>
          <Form.Item
            id="form3employees2"
            name="form3employees2"
            rules={[
              {
                required: true,
                message: "กรุณากรอกข้อความ!",
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <p>3. ในช่วง 6 เดือนที่ผ่านมา ท่านได้เข้ารับการอบรมอะไรบ้าง</p>
          <Form.Item
            id="form3employees3"
            name="form3employees3"
            rules={[
              {
                required: true,
                message: "กรุณากรอกข้อความ!",
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <p>
            4. ท่านสนใจการฝึกอบรม
            หรือต้องการเรียนรู้เรื่องใดบ้างที่จะช่วยให้มีความสามารถปฏิบัติงานที่ได้รับมอบหมายในปัจจุบันได้ดียิ่งขึ้น
            (เรียงลำดับความสำคัญ 1-5){" "}
          </p>
          <Form.Item
            id="form3employees4"
            name="form3employees4"
            rules={[
              {
                required: true,
                message: "กรุณากรอกข้อความ!",
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default UserFrom3;
