import React, { useEffect, useState } from "react";
import { Calendar, Select, Radio, Col, Row, Alert } from "antd";
import locale from "antd/es/calendar/locale/th_TH";
import "moment/locale/th";

const Main = () => {
  const [name, setname] = useState(null);

  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  useEffect(() => {
    setname("หนึ่งสอง สาม");
  }, []);
  return (
    <div className="justify-center align-center">
      <div className="row wrap window-height">
        <div className="col-xs-12 col-sm-12">
          <label
            style={{ fontWeight: "normal", fontSize: "24px", color: "black" }}
          >
            สวัสดี คุณ{name}
          </label>
          <div
            className="p-4"
            style={{
              border: "1px solid #f0f0f0",
              borderRadius: "5px",
            }}
          >
            <Calendar
              locale={locale}
              fullscreen={false}
              onPanelChange={onPanelChange}
              headerRender={({ value, type, onChange, onTypeChange }) => {
                const start = 0;
                const end = 12;
                const monthOptions = [];

                const current = value.clone();
                const localeData = value.localeData();
                const months = [];
                for (let i = 0; i < 12; i++) {
                  current.month(i);
                  months.push(localeData.monthsShort(current));
                }

                for (let index = start; index < end; index++) {
                  monthOptions.push(
                    <Select.Option className="month-item" key={`${index}`}>
                      {months[index]}
                    </Select.Option>
                  );
                }
                const month = value.month();

                const year = value.year();
                const options = [];
                for (let i = year - 10; i < year + 10; i += 1) {
                  options.push(
                    <Select.Option key={i} value={i} className="year-item">
                      {i + 543}
                    </Select.Option>
                  );
                }
                return (
                  <div style={{ padding: 8 }}>
                    <Row gutter={8} style={{ justifyContent: "flex-end" }}>
                      <Col>
                        <Radio.Group
                          size="small"
                          onChange={(e) => onTypeChange(e.target.value)}
                          value={type}
                        >
                          <Radio.Button value="month">เดือน</Radio.Button>
                          <Radio.Button value="year">ปี</Radio.Button>
                        </Radio.Group>
                      </Col>
                      <Col>
                        <Select
                          size="small"
                          dropdownMatchSelectWidth={false}
                          className="my-year-select"
                          onChange={(newYear) => {
                            const now = value.clone().year(newYear);
                            onChange(now);
                          }}
                          value={String(year + 543)}
                        >
                          {options}
                        </Select>
                      </Col>
                      <Col>
                        <Select
                          size="small"
                          dropdownMatchSelectWidth={false}
                          value={String(month)}
                          onChange={(selectedMonth) => {
                            const newValue = value.clone();
                            newValue.month(parseInt(selectedMonth, 10));
                            onChange(newValue);
                          }}
                        >
                          {monthOptions}
                        </Select>
                      </Col>
                    </Row>
                  </div>
                );
              }}
            />
          </div>
          <label
            className="pt-3 "
            style={{ fontWeight: "bold", fontSize: "20px", color: "black" }}
          >
            แจ้งเตือน
            <Alert
              className="mt-4"
              message="สามารถดูผลการประเมินรอบ xxxx ได้วันที่ วว ดด ปป"
              type="warning"
              closable
              //   onClose={onClose}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Main;
