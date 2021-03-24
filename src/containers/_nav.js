import Cookies from "js-cookie";
import { token } from "../config";

const nav = [
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "หน้าหลัก",
  //   to: "/",
  //   icon: "cil-home",
  //   className: "mb-2",
  //   id: 1,
  // },
  {
    _tag: "CSidebarNavItem",
    name: "ประวัติพนักงาน",
    to: "/employee/history",
    icon: "cil-user",
    className: "mb-2",
    id: 1,
  },
  {
    _tag: "CSidebarNavItem",
    name: "แบบประเมิน",
    to: "/employee/evaluation",
    icon: "cil-file",
    className: "mb-2",
    id: 1,
  },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "ผลการประเมิน",
  //   to: "/employee/result",
  //   icon: "cilSpreadsheet",
  //   className: "mb-2",
  //   id: 1,
  // },
  {
    _tag: "CSidebarNavItem",
    name: "ประเมินพนักงาน",
    to: "/committee",
    icon: "cilList",
    className: "mb-2",
    id: 2,
  },
  {
    _tag: "CSidebarNavItem",
    name: "กรรมการ",
    to: "/administrator/committee",
    icon: "cilUser",
    className: "mb-2",
    id: 3,
  },
  {
    _tag: "CSidebarNavItem",
    name: "พนักงาน",
    to: "/administrator/staff",
    icon: "cilPeople",
    className: "mb-2",
    id: 3,
  },
  {
    _tag: "CSidebarNavItem",
    name: "การประเมิน",
    to: "/administrator/assessment",
    icon: "cilNotes",
    className: "mb-2",
    id: 3,
  },
];

// เปลี่ยน menu ตรง id
const _nav = nav.filter((r) => r.id === Number(Cookies.get(token.type)));

export default _nav;
