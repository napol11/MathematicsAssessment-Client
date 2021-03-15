import React, { useEffect, useState } from "react";
import { Steps } from "antd";
import CommitteAssessStep1 from "./committeAssessStep1";
import CommitteAssessStep2 from "./committeAssessStep2";
import CommitteAssessStep31 from "./committeAssessStep31";
import CommitteAssessStep32 from "./committeAssessStep32";
import CommitteAssessStep4 from "./committeAssessStep4";
import ModalComAssess2 from "./modalComAssess2";

import "./committee.css";

const { Step } = Steps;

const CommitteeAssess = () => {
  const [data, setData] = useState([]);
  const [current, setCurrent] = React.useState(0);
  const [step3, setStep3] = useState(0);

  const LoadData = () => {
    setData({
      information: {
        firstName: "สโรชา",
        lastName: "สังข์บุญลือ",
        position: "บาริสต้า",
        number: 49,
        level: "เชี่ยวชาญ",
        division: "ดุสิต",
        startTimes: "2009-07-10",
      },
      leaveHistory: {
        sickLeave: 20,
        sickLeaveMedical: 0,
        businessLeave: 0,
        late: 0,
        holiday: 0,
        MaternityLeave: 0,
        ordainLeave: 0,
        govermentLack: 0,
        studieLeave: "ไม่ได้ลาศึกษาต่อ",
        startWork: "2020-02-01",
        endWork: "2020-07-31",
      },
      salaryHistory: [
        {
          start: "2019-10-01",
          end: "2019-09-30",
          salary: 0,
        },
      ],
      punishHistory: [], /// [{ start:'2020-02-01', end:'2020-02-03',detail:"" }]
      performanceReport: [
        {
          head: "1.1",
          event: "xxxxxxxxxxxxxxxxxxx",
          fte: "xx",
          levelEmployee: "xx",
          levelCommittee: "xx",
          comment: "xxxxxxxxxxxx",
          upload: "success",
        },
        {
          head: "1.2",
          event: "xxxxxxxxxxxxxxxxxxx",
          fte: "xx",
          levelEmployee: "xx",
          levelCommittee: "xx",
          comment: "xxxxxxxxxxxx",
          upload: "success",
        },
        {
          head: "1.3",
          event: "xxxxxxxxxxxxxxxxxxx",
          fte: "xx",
          levelEmployee: "xx",
          levelCommittee: "xx",
          comment: "xxxxxxxxxxxx",
          upload: "success",
        },
        {
          head: "1.4",
          event: "xxxxxxxxxxxxxxxxxxx",
          fte: "xx",
          levelEmployee: "xx",
          levelCommittee: "xx",
          comment: "xxxxxxxxxxxx",
          upload: "success",
        },
        {
          head: "1.5",
          event: "xxxxxxxxxxxxxxxxxxx",
          fte: "xx",
          levelEmployee: "xx",
          levelCommittee: "xx",
          comment: "xxxxxxxxxxxx",
          upload: "wait",
        },
      ],
      EvaForm31: [
        {
          id: 1,
          title: {
            title: "หมวดที่ 1 คุณลักษณะในการปฎิบัติงาน",
            head: "1. การพัฒนาการทำงานอย่างต่อเนื่องและความคิดริเริ่ม",
            detail:
              "การนำเอาแนวความคิดหรือแนวปฏิบัติใหม่ๆมาใช้อย่างรอบคอบและเป็นระบบเพื่อเพิ่มผลิตภาพของหน่วยงานและการริเริ่มทำงานที่ตนรับผิดชอบด้วยตนเอง",
          },
          levelStart: 8,
          levelEnd: 10,
          //   point: "", ไม่มีก็ไม่ต้องใส่ ไม่งั้นจะ error เฉพาะ EvaForm31
          //   skill: "", ไม่มีก็ไม่ต้องใส่ ไม่งั้นจะ error เฉพาะ EvaForm31
        },
        {
          id: 2,
          title:
            "สามารถพัฒนาการทำงานได้ดีมากและเป็นผู้ริเริ่มหรือมีสว่นริเริ่มสูงในการปฎิบัติงานทั้งที่เป็นงานเดิมและงานใหม่ทำให้เกิดผลในการเพิ่มผลิตภาพของสำนักงานได้เป็นอย่างดีมาก",
          levelStart: 8,
          levelEnd: 10,
          point: "",
          skill: "",
        },
        {
          id: 3,
          title:
            "สามารถพัฒนาการทำงานได้และมีส่วนริเริ่มและสนับสนุนการปฏิบัติงานเดิมและแนวใหม่ทำให้เกิดผลดีและเพิ่มผลิตภาพของสำนักงานได้อย่างดี",
          levelStart: 6,
          levelEnd: 7,
          point: "",
          skill: "",
        },
        {
          id: 4,
          title: {
            title: "หมวดที่ 2 คุณลักษณะในการปฎิบัติงาน",
            head: "1. การพัฒนาการทำงานอย่างต่อเนื่องและความคิดริเริ่ม",
            detail:
              "การนำเอาแนวความคิดหรือแนวปฏิบัติใหม่ๆมาใช้อย่างรอบคอบและเป็นระบบเพื่อเพิ่มผลิตภาพของหน่วยงานและการริเริ่มทำงานที่ตนรับผิดชอบด้วยตนเอง",
          },
          levelStart: 8,
          levelEnd: 10,
          //   point: "", ไม่มีก็ไม่ต้องใส่ ไม่งั้นจะ error เฉพาะ EvaForm31
          //   skill: "", ไม่มีก็ไม่ต้องใส่ ไม่งั้นจะ error เฉพาะ EvaForm31
        },
        {
          id: 5,
          title:
            "สามารถพัฒนาการทำงานได้ดีมากและเป็นผู้ริเริ่มหรือมีสว่นริเริ่มสูงในการปฎิบัติงานทั้งที่เป็นงานเดิมและงานใหม่ทำให้เกิดผลในการเพิ่มผลิตภาพของสำนักงานได้เป็นอย่างดีมาก",
          levelStart: 8,
          levelEnd: 10,
          point: "",
          skill: "",
        },
        {
          id: 6,
          title:
            "สามารถพัฒนาการทำงานได้และมีส่วนริเริ่มและสนับสนุนการปฏิบัติงานเดิมและแนวใหม่ทำให้เกิดผลดีและเพิ่มผลิตภาพของสำนักงานได้อย่างดี",
          levelStart: 6,
          levelEnd: 7,
          point: "",
          skill: "",
        },
      ],
      EvaForm32: {
        Employee: [
          {
            title: "ท่านขาดรู้ ความชำนาญ ทักษะในเรื่องใดบ้าง",
            detail: [{ message: "คอมพิวเตอร์,โปรแกรม และโฟโต้ช็อป" }],
          },
          {
            title:
              "ท่านคิดว่าจะสามารถเพิ่มความรู้ ความชำนาญ ทักษะดังกล่าวได้โดยวิธีใดบ้าง",
            detail: [{ message: "คอมพิวเตอร์,โปรแกรม และโฟโต้ช็อป" }],
          },
          {
            title: "ในช่วง 6 เดือนที่ผ่านมา ท่านได้เข้ารับการอบรมอะไรบ้าง",
            detail: [
              { message: "Python" },
              { message: "C" },
              { message: "Data sci" },
              { message: "Softwate engineering" },
              { message: "OOP" },
            ],
          },
          {
            title:
              "ท่านสนใจการฝึกอบรม หรือต้องการเรียนรู้เรื่องใดบ้างที่จะช่วยให้มีความสามารถปฏิบัติงานที่ได้รับมอบหมายในปัจจุบันได้ดียิ้งขึ้น (เรียงลำดับความสำคัญ 1-5)",
            detail: [
              { message: "Python" },
              { message: "C" },
              { message: "Data sci" },
              { message: "Softwate engineering" },
              { message: "OOP" },
            ],
          },
        ],
        Committee: [
          {
            title:
              "ท่านคิดว่าผู้ใใต้บังคับบัญชายังขาดความรู้ ความชำนาญทักษะในเรื่องใดบ้าง",
            comment: "",
          },
          {
            title:
              "ท่านคิดว่าผู้ใใต้บังคับบัญชาหควรจะอบรม หรือต้องการความรู้เรื่องใดบ้างที่จะช่วยให้มีความสามารถปฏิบัติงานที่ได้รับมอบหมายในปัจจุบันได้ดียิ่งขึ้น (เรียงลำดับความสำคัญ 1-5)",
            comment: "",
          },
        ],
      },
    });
  };

  const setValues = (data) => {
    setData(data);
  };

  useEffect(() => {
    LoadData();
  }, []);

  return (
    <div className="justify-center align-center">
      <div className="row wrap window-height">
        <div className="col-xs-12 col-sm-12">
          <label
            className="mb-0"
            style={{ fontWeight: "bold", fontSize: "30px", color: "black" }}
          >
            การประเมินพนักงาน
          </label>
          <br />
          <label
            style={{ fontWeight: "normal", fontSize: "14px", color: "black" }}
          >
            {`ชื่อ : `}&nbsp;
          </label>
          <label
            style={{
              fontWeight: "normal",
              fontSize: "14px",
              color: "rgb(243, 119, 54)",
            }}
          >
            {`${data.information ? data.information.firstName : null} ${
              data.information ? data.information.lastName : null
            }`}
          </label>
          <label
            style={{ fontWeight: "normal", fontSize: "14px", color: "black" }}
          >
            {`, เลขที่ : `}&nbsp;
          </label>
          <label
            style={{
              fontWeight: "normal",
              fontSize: "14px",
              color: "rgb(243, 119, 54)",
            }}
          >
            {` ${data.information ? data.information.number : null}`}
          </label>
          <div className="row no-gutter mt-2 ">
            <div className="col-sm-2" />
            <div className="col-sm-8">
              <Steps size="small" current={current} className="committeeSteps">
                <Step title="ตรวจสอบ" description="ข้อมูล" />
                <Step title="ตรวจสอบ" description="ผลการปฎิบัติงาน" />
                <Step title="ประเมิน" description="พนักงาน" />
                <Step title="ให้ความคิดเห็น" />
              </Steps>
            </div>
            <div className="col-sm-2" />
          </div>
          <br />
          <div>
            {/* ห้าม refresh ไม่งั้น Data State จะกลับสู่ defualt ต้อง save ทุกครั้งที่ กด ถัดไป */}
            {current === 0 ? (
              <CommitteAssessStep1
                data={data}
                next={() => setCurrent(current + 1)}
              />
            ) : current === 1 ? (
              <CommitteAssessStep2
                data={data}
                prev={() => setCurrent(current - 1)}
                next={() => setCurrent(current + 1)}
                setData={setValues}
              />
            ) : current === 2 ? (
              step3 === 0 ? (
                <CommitteAssessStep31
                  data={data}
                  prev={() => setCurrent(current - 1)}
                  next={() => setStep3(step3 + 1)}
                  setData={setValues}
                />
              ) : (
                <CommitteAssessStep32
                  data={data}
                  prev={() => setStep3(step3 - 1)}
                  next={() => setCurrent(4)}
                  setData={setValues}
                />
              )
            ) : current === 3 ? (
              <CommitteAssessStep4 data={data} />
            ) : current === 4 ? (
              <CommitteAssessStep4 data={data} />
            ) : null}
          </div>
          {/* *************************************************************** */}
        </div>
      </div>
      <ModalComAssess2 />
    </div>
  );
};

export default CommitteeAssess;
