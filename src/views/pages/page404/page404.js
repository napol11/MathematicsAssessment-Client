import React from "react";
import { Result, Button } from "antd";
import { useHistory } from "react-router-dom";

const Page404 = () => {
  const history = useHistory();
  return (
    <Result
      status="404"
      title="404"
      subTitle="แจ้งเตือน!, ไม่พบหน้าที่คุณกำลังค้นหา."
      extra={
        <Button type="primary" onClick={() => history.goBack()}>
          กลับหน้า
        </Button>
      }
    />
  );
};

export default Page404;
