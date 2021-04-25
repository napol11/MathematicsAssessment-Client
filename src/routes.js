import React from "react";

const Main = React.lazy(() => import("./views/main"));

//พนักงาน
const HistoryEmployee = React.lazy(() =>
  import("./views/Employee/historyEmployee")
);
const Employee = React.lazy(() => import("./views/Employee/employeeMain"));
const EmployeeAssess = React.lazy(() => import("./views/Employee/step"));
const EmployeeUserGuide= React.lazy(() => import("./views/Employee/UserGuideem"));

//แอดมิน
const AdminAssessment = React.lazy(() =>
  import("./views/Admin/adminAssessment")
);
const AdminStaff = React.lazy(() => import("./views/Admin/adminStaff"));
const AdminCommittee = React.lazy(() => import("./views/Admin/adminCommittee"));
const AdminUserGuide = React.lazy(() => import("./views/Admin/UserGuideadmin"));

//กรรมการ
const CommitteeMain = React.lazy(() =>
  import("./views/Committee/committeeMain")
);
const CommitteeAssess = React.lazy(() =>
  import("./views/Committee/committeeAssess")
);
const CommitteeUserGuide = React.lazy(() =>
import("./views/Committee/UserGuidecom")
);

//หัวหน้า
const HeadMain = React.lazy(() => import("./views/Head/headMain"));
const HeadAssess = React.lazy(() => import("./views/Head/HeadAssess"));
const HeadUserGuide = React.lazy(() =>
import("./views/Head/UserGuidehead")
);

const routes = [
  { path: "/", exact: true, name: "หน้าหลัก", component: Main },

  // ****************************************************  พนักงาน  ***********************************************************************************************
  {
    path: "/employee/history",
    exact: true,
    name: "ประวัติพนักงาน",
    component: HistoryEmployee,
  },
  {
    path: "/employee/evaluation",
    exact: true,
    name: "ทำประเมิน",
    component: Employee,
  },
  {
    path: "/employee/evaluation/:id",
    exact: true,
    name: "การประเมินพนักงาน",
    component: EmployeeAssess,
  },
  {
    path: "/employee/userguide",
    exact: true,
    name: "วิธีใช้งานสำหรับพนักงาน",
    component: EmployeeUserGuide,
  },

  // ****************************************************  แอดมิน  ***********************************************************************************************
  {
    path: "/administrator/assessment",
    exact: true,
    name: "การประเมิน",
    component: AdminAssessment,
  },
  {
    path: "/administrator/staff",
    exact: true,
    name: "พนักงาน",
    component: AdminStaff,
  },
  {
    path: "/administrator/committee",
    exact: true,
    name: "กรรมการ",
    component: AdminCommittee,
  },
  {
    path: "/administrator/userguide",
    exact: true,
    name: "วิธีใช้งานสำหรับผู้ดูแลระบบ",
    component: AdminUserGuide,
  },

  // ****************************************************  กรรมการ  ***********************************************************************************************
  {
    path: "/committee",
    exact: true,
    name: "รายการประเมิน",
    component: CommitteeMain,
  },
  {
    path: "/committee/:assessment/:id",
    exact: true,
    name: "การประเมินพนักงาน",
    component: CommitteeAssess,
  },
  {
    path: "/committee/userguide",
    exact: true,
    name: "วิธีใช้งานสำหรับกรรมการ",
    component: CommitteeUserGuide,
  },

  // ****************************************************  หัวหน้า  ***********************************************************************************************
  {
    path: "/head",
    exact: true,
    name: "รายการประเมิน",
    component: HeadMain,
  },
  {
    path: "/head/:assessment/:id",
    exact: true,
    name: "การประเมินพนักงาน",
    component: HeadAssess,
  },
  {
    path: "/head/userguide",
    exact: true,
    name: "วิธีใช้งานสำหรับหัวหน้ากรรมการ",
    component: HeadUserGuide,
  },
];

export default routes;
