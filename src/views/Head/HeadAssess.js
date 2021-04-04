import React, { useEffect, useState } from "react";
import { Steps } from "antd";
import HeadAssessStep1 from "./HeadAssessStep1";
import HeadAssessStep2 from "./HeadAssessStep2";
import HeadAssessStep31 from "./HeadAssessStep31";
import HeadAssessStep32 from "./HeadAssessStep32";
import HeadAssessStep4 from "./HeadAssessStep4";

import "./head.css";
import "./step.css";

const { Step } = Steps;

const HeadAssess = () => {
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
      // performanceReport: [
      //   {
      //     head: "1.1",
      //     event: "xxxxxxxxxxxxxxxxxxx",
      //     fte: "xx",
      //     levelEmployee: "xx",
      //     levelCommittee: "xx",
      //     comment: "xxxxxxxxxxxx",
      //     upload: "success",
      //   },
      //   {
      //     head: "1.2",
      //     event: "xxxxxxxxxxxxxxxxxxx",
      //     fte: "xx",
      //     levelEmployee: "xx",
      //     levelCommittee: "xx",
      //     comment: "xxxxxxxxxxxx",
      //     upload: "success",
      //   },
      //   {
      //     head: "1.3",
      //     event: "xxxxxxxxxxxxxxxxxxx",
      //     fte: "xx",
      //     levelEmployee: "xx",
      //     levelCommittee: "xx",
      //     comment: "xxxxxxxxxxxx",
      //     upload: "success",
      //   },
      //   {
      //     head: "1.4",
      //     event: "xxxxxxxxxxxxxxxxxxx",
      //     fte: "xx",
      //     levelEmployee: "xx",
      //     levelCommittee: "xx",
      //     comment: "xxxxxxxxxxxx",
      //     upload: "success",
      //   },
      //   {
      //     head: "1.5",
      //     event: "xxxxxxxxxxxxxxxxxxx",
      //     fte: "xx",
      //     levelEmployee: "xx",
      //     levelCommittee: "xx",
      //     comment: "xxxxxxxxxxxx",
      //     upload: "wait",
      //   },
      // ],
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
          title:
            "สามารถพัฒนาการทำงานได้บ้างในเรื่องยอมรับการปฏิบัติงานในแนวใหม่ได้บ้างมีส่วนริเริ่มไม่มากนักและไม่ค่อยสามารถคิดหรือปฏิบัติงานในแนวใหม่ได้",
          levelStart: 4,
          levelEnd: 5,
          point: "",
          skill: "",
        },
        {
          id: 5,
          title:
            "ไม่มีความคิดริเริ่มไม่สามารถพัฒนางานได้ไม่อาจดำเนินงานในแนวใหม่ได้ไม่สามารถร่วมคิดหรือดำเนินงานในแนวใหม่ๆได้",
          levelStart: 0,
          levelEnd: 3,
          point: "",
          skill: "",
        },
        {
          id: 6,
          title: {
            head: "2. การแก้ปัญหาและการตัดสินใจ",
            detail:
              " การพยายามแก้ปัญหาโดยมองทั้งในด้านกว้างและด้านลึกมีการตัดสินใจรอบคอบและมีการวางแนวความคิดอย่างมีระบบแต่ทันการ",
          },
          levelStart: 8,
          levelEnd: 10,
          //   point: "", ไม่มีก็ไม่ต้องใส่ ไม่งั้นจะ error เฉพาะ EvaForm31
          //   skill: "", ไม่มีก็ไม่ต้องใส่ ไม่งั้นจะ error เฉพาะ EvaForm31
        },
        {
          id: 7,
          title:
            "เข้าใจปัญหาได้ลึกซึ้งดีมากสามารถตัดสินใจเด็ดขาดและมีการวางแนวความคิดอย่างมีระบบทันการและมีวิจารณญาณที่ดี",
          levelStart: 8,
          levelEnd: 10,
          point: "",
          skill: "",
        },
        {
          id: 8,
          title:
            "เข้าใจปัญหาดีตัดสินใจได้ดีโดยส่วนใหญ่แต่ยังขาดความรอบคอบในการตัดสินใจและการวางแนวความคิดอย่างมีระบบ",
          levelStart: 6,
          levelEnd: 7,
          point: "",
          skill: "",
        },
        {
          id: 9,
          title:
            "ไม่เข้าใจปัญหาดีนักตัดสินใจค่อนข้างช้าและการวางแนวความคิดยังไม่ค่อยมีระบบดีนัก",
          levelStart: 4,
          levelEnd: 5,
          point: "",
          skill: "",
        },
        {
          id: 10,
          title:
            "จับประเด็นปัญหาไม่ได้ไม่อาจไว้ใจให้ตัดสินใจและไม่มีการวางแผนความคิดอย่างมีระบบเพิกเฉยไม่ตัดสินใจหรือประเมินข้อเท็จจริงผิด",
          levelStart: 0,
          levelEnd: 3,
          point: "",
          skill: "",
        },
        {
          id: 11,
          title: {
            title: "หมวดที่ 2 คุณสมบัติเฉพาะตัว",
            head:
              "3. ความรู้ความสามารถ   ความรู้  ความเข้าใจ  ความสามารถและความเชี่ยวชาญในงานที่รับผิดชอบ",
            detail:
              "ความรู้ ความเข้าใจ ความสามารถและความเชี่ยวชาญในงานที่รับผิดชอบ",
          },
          levelStart: 8,
          levelEnd: 10,
          //   point: "", ไม่มีก็ไม่ต้องใส่ ไม่งั้นจะ error เฉพาะ EvaForm31
          //   skill: "", ไม่มีก็ไม่ต้องใส่ ไม่งั้นจะ error เฉพาะ EvaForm31
        },
        {
          id: 12,
          title:
            "รู้ เข้าใจ และสามารถเข้าถึงงานในทุกด้านที่รับผิดชอบได้โดยสมบูรณ์และสามารถดัดแปลงเครื่องมือหรือวิธีการทำงานให้เข้ากับภาระงานใหม่ได้",
          levelStart: 12,
          levelEnd: 15,
          point: "",
          skill: "",
        },
        {
          id: 13,
          title:
            "มีความรู้ความสามารถและมีความเข้าใจในงานโดยส่วนใหญ่มีความชำนาญในงานของตน",
          levelStart: 8,
          levelEnd: 11,
          point: "",
          skill: "",
        },
        {
          id: 14,
          title:
            "ไม่มีความรู้ความเข้าใจพอสำหรับงานในความรับผิดชอบบางด้านขาดความชำนาญในงานของตน",
          levelStart: 4,
          levelEnd: 7,
          point: "",
          skill: "",
        },
        {
          id: 15,
          title: "ต้องพึ่งผู้อื่นเสมอและไม่สามารถใช้อุปกรณ์ได้อย่างถูกต้อง",
          levelStart: 0,
          levelEnd: 3,
          point: "",
          skill: "",
        },
        {
          id: 16,
          title: {
            head: "4. การปฏิบัติงานและทัศนคติต่องาน",
            detail:
              "การปฏิบัติตามคำแนะนำด้วยความรับผิดชอบทัศนคติต่องานและการกำหนดวัตถุประสงค์",
          },
          levelStart: 8,
          levelEnd: 10,
        },
        {
          id: 17,
          title:
            "มีความกระตือรือล้นในการทำงานที่รับผิดชอบและในงานที่ท้าทายความสามารถมีระเบียบวินัยอย่างพอดี",
          levelStart: 8,
          levelEnd: 10,
          point: "",
          skill: "",
        },
        {
          id: 18,
          title:
            "ปกติทำตามข้อแนะนำได้ดีและบางครั้งสามารถริเริ่มได้มีระเบียบวินัยในการทำงาน",
          levelStart: 6,
          levelEnd: 7,
          point: "",
          skill: "",
        },
        {
          id: 19,
          title:
            "ต้องคอยดูแลใกล้ชิดกำหนดวัตถประสงค์มิค่อยได้บางครั้งขาดระเบียบวินัย",
          levelStart: 4,
          levelEnd: 5,
          point: "",
          skill: "",
        },
        {
          id: 20,
          title:
            "ไม่ชอบให้กำกับแต่ต้องเฝ้าคุมและแนะนำอย่างใกล้ชิดเป็นประจำไม่มีระเบียบวินัย",
          levelStart: 0,
          levelEnd: 3,
          point: "",
          skill: "",
        },
        {
          id: 21,
          title: {
            head: "5. ความสม่ำเสมอในการทำงานและการอุทิศตน ",
            detail:
              "การมาทำงานอย่างสม่ำเสมอโดยคำนึงถึงภาระรับผิดชอบเป็นหลักการอุทิศตนให้กับงานโดยไม่ย่อท้อความอุตสาหะวิริยะในการทำงาน",
          },
          levelStart: 8,
          levelEnd: 10,
        },
        {
          id: 22,
          title:
            "มาปฏิบัติงานดีมากและทำงานอย่างสม่ำเสมอโดยนึกถึงภาระงานเป็นหลักมีความอุตสาหะวิริยะและอุทิศตนให้กับงานอย่างดีมาก",
          levelStart: 12,
          levelEnd: 15,
          point: "",
          skill: "",
        },
        {
          id: 23,
          title:
            "ปฏิบัติงานอย่างสม่ำเสมอจนเสร็จสิ้นภาระงานขาดงานหรือมาสายน้อยมากอุทิศตนให้กับงานโดยมีความขยันหมั่นเพียร",
          levelStart: 8,
          levelEnd: 11,
          point: "",
          skill: "",
        },
        {
          id: 24,
          title:
            "มีปัญหาบ้างในเรื่องการมาทำงานความตรงต่อเวลาและการใช้เวลาอย่างเหมาะสมอุทิศตนและขยันหมั่นเพียรน้อยกว่าที่ควร",
          levelStart: 4,
          levelEnd: 7,
          point: "",
          skill: "",
        },
        {
          id: 25,
          title:
            "มีปัญหามากในเรื่องการมาทำงานและความตรงต่อเวลาหรือใช้เวลาอย่างไม่ถูกต้องไม่อุทิศตนให้กับงานไม่มีความขยันหมั่นเพียร",
          levelStart: 0,
          levelEnd: 3,
          point: "",
          skill: "",
        },
        {
          id: 26,
          title: {
            head: "6. ศักยภาพในการพัฒน ",
            detail:
              "ศักยภาพในการปรับปรุงตนเองให้ทำงานดีขึ้นเรื่อยๆความสามารถปรับตัวให้เข้ากับงานใหม่ๆ",
          },
          levelStart: 8,
          levelEnd: 10,
        },
        {
          id: 27,
          title:
            "มีศักยภาพสูงในการพัฒนาของตนและงานของตนให้ดีขึ้นเรื่อยๆปรับตัวให้เข้ากับงานใหม่ๆได้ดีมาก",
          levelStart: 12,
          levelEnd: 15,
          point: "",
          skill: "",
        },
        {
          id: 28,
          title:
            "พัฒนาตนและงานของตนอย่างสม่ำเสมอปรับตัวให้เข้ากับงานใหม่ๆได้ดี",
          levelStart: 8,
          levelEnd: 11,
          point: "",
          skill: "",
        },
        {
          id: 29,
          title:
            "ไม่ค่อยมีศักยภาพในการพัฒนาตนเองและงานไม่ค่อยสามารถปรับตัวให้เข้ากับงานใหม่ๆได้",
          levelStart: 4,
          levelEnd: 7,
          point: "",
          skill: "",
        },
        {
          id: 30,
          title: "ไม่สามารถพัฒนาตนและงานของตนได้ไม่สามารถทำงานใหม่ๆได้",
          levelStart: 0,
          levelEnd: 3,
          point: "",
          skill: "",
        },
        {
          id: 31,
          title: {
            head: "7. ความซื่อสัตย์ต่อองค์กรและทัศนคติที่ดีต่อองค์กร  ",
            detail: "ช่วยเสริมสร้างให้ตนและหน่วยงานมีชื่อเสียงและเจริญก้าวหน้า",
          },
          levelStart: 8,
          levelEnd: 10,
        },
        {
          id: 32,
          title:
            "มีความซื่อสัตย์ต่อองค์กรเป็นที่เชื่อถือและไว้ใจได้มีทัศนคติที่ดีต่อองค์กรเสียสละเพื่อช่วยเสริมให้หน่วยงานเจริญก้าวหน้าและมีจิตสำนึกว่างานขององค์กรเป็นเสมือนงานของตนเอง",
          levelStart: 8,
          levelEnd: 10,
          point: "",
          skill: "",
        },
        {
          id: 33,
          title:
            "มีความซื่อสัตย์ต่อองค์กรมีทัศนคติที่ดีต่อองค์กรทำให้บังเกิดผลดี",
          levelStart: 6,
          levelEnd: 7,
          point: "",
          skill: "",
        },
        {
          id: 34,
          title:
            "มีความซื่อสัตย์ต่อองค์กรบ้างและมีทัศนคติที่ดีต่อองค์กรพอสมควรอาจจะต้องแนะนำถึงวิธีที่ควรปฏิบัติให้บ้างเป็นบางครั้ง",
          levelStart: 4,
          levelEnd: 5,
          point: "",
          skill: "",
        },
        {
          id: 35,
          title:
            "ต้องคอยชี้แนะให้เห็นถึงความสำคัญของความซื่อสัตย์และการสร้างทัศนคติที่ดีต่อองค์กรอยู่เสมอ",
          levelStart: 0,
          levelEnd: 3,
          point: "",
          skill: "",
        },
        {
          id: 36,
          title: {
            head: "8. การประพฤติตนอยู่ในศีลธรรมอันดี   ",
            detail:
              "ประพฤติปฏิบัติตนอยู่ในกรอบของศีลธรรมและจรรยาบรรณวิชาชีพอย่างเสมอต้นเสมอปลาย",
          },
          levelStart: 8,
          levelEnd: 10,
        },
        {
          id: 37,
          title:
            "ประพฤติตนเหมาะสมอยู่ในศีลธรรมอันดีมีความซื่อตรงต่อตนเองและผู้อื่นอย่างสม่ำเสมอเป็นแบบอย่างที่ดี",
          levelStart: 8,
          levelEnd: 10,
          point: "",
          skill: "",
        },
        {
          id: 38,
          title: "ประพฤติตนเหมาะสมอยู่ในศีลธรรมอันดีพอสมควร",
          levelStart: 6,
          levelEnd: 7,
          point: "",
          skill: "",
        },
        {
          id: 39,
          title:
            "ไม่ประพฤติปฏิบัติตนอยู่ในศีลธรรมบ้างในบางครั้งวุฒิภาวะทางอารมณ์ยังไม่มั่นคง",
          levelStart: 4,
          levelEnd: 5,
          point: "",
          skill: "",
        },
        {
          id: 40,
          title:
            "ไม่ได้ปฏิบัติตนอยู่ในศีลธรรมเท่าที่ควรต้องคอยตักเตือนอยู่เสมอ",
          levelStart: 0,
          levelEnd: 3,
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
                <Step title="เสร็จสิ้นการประเมิน" />
              </Steps>
            </div>
            <div className="col-sm-2" />
          </div>
          <br />
          <div>
            {/* ห้าม refresh ไม่งั้น Data State จะกลับสู่ defualt ต้อง save ทุกครั้งที่ กด ถัดไป */}
            {current === 0 ? (
              <HeadAssessStep1
                data={data}
                next={() => setCurrent(current + 1)}
              />
            ) : current === 1 ? (
              <HeadAssessStep2
                data={data}
                prev={() => setCurrent(current - 1)}
                next={() => setCurrent(current + 1)}
                setData={setValues}
              />
            ) : current === 2 ? (
              step3 === 0 ? (
                <HeadAssessStep31
                  data={data}
                  prev={() => setCurrent(current - 1)}
                  next={() => setStep3(step3 + 1)}
                  setData={setValues}
                />
              ) : (
                <HeadAssessStep32
                  data={data}
                  prev={() => setStep3(step3 - 1)}
                  next={() => setCurrent(4)}
                  setData={setValues}
                />
              )
            ) : current === 3 ? (
              <HeadAssessStep4 data={data} />
            ) : current === 4 ? (
              <HeadAssessStep4 data={data} />
            ) : null}
          </div>
          {/* *************************************************************** */}
        </div>
      </div>
    </div>
  );
};
export default HeadAssess;
