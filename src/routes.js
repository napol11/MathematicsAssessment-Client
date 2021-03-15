import React from "react";

const Main = React.lazy(() => import("./views/main"));
const HistoryEmployee = React.lazy(() =>
  import("./views/Employee/historyEmployee")
);

const AdminAssessment = React.lazy(() =>
  import("./views/Admin/adminAssessment")
);
const AdminStaff = React.lazy(() => import("./views/Admin/adminStaff"));
const AdminCommittee = React.lazy(() => import("./views/Admin/adminCommittee"));

const CommitteeMain = React.lazy(() =>
  import("./views/Committee/committeeMain")
);
const CommitteeAssess = React.lazy(() =>
  import("./views/Committee/committeeAssess")
);

const routes = [
  { path: "/", exact: true, name: "หน้าหลัก", component: Main },
  {
    path: "/employee/history",
    exact: true,
    name: "ประวัติพนักงาน",
    component: HistoryEmployee,
  },
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
    path: "/committee",
    exact: true,
    name: "รายการประเมิน",
    component: CommitteeMain,
  },
  {
    path: "/committee/:id",
    exact: true,
    name: "การประเมินพนักงาน",
    component: CommitteeAssess,
  },
];

export default routes;
