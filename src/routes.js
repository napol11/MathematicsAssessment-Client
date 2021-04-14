import React from "react";

const Main = React.lazy(() => import("./views/main"));

//พนักงาน
const HistoryEmployee = React.lazy(() =>
  import("./views/Employee/historyEmployee")
);
const Employee = React.lazy(() => import("./views/Employee/employeeMain"));
const EmployeeAssess = React.lazy(() => import("./views/Employee/step"));

//แอดมิน
const AdminAssessment = React.lazy(() =>
  import("./views/Admin/adminAssessment")
);
const AdminStaff = React.lazy(() => import("./views/Admin/adminStaff"));
const AdminCommittee = React.lazy(() => import("./views/Admin/adminCommittee"));

//กรรมการ
const CommitteeMain = React.lazy(() =>
  import("./views/Committee/committeeMain")
);
const CommitteeAssess = React.lazy(() =>
  import("./views/Committee/committeeAssess")
);

//หัวหน้า
const HeadMain = React.lazy(() => import("./views/Head/headMain"));
const HeadAssess = React.lazy(() => import("./views/Head/HeadAssess"));

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
];

export default routes;
