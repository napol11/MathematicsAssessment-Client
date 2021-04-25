import Cookies from "js-cookie";
import { token } from "../config";

const navug = [
  {
    _tag: "CSidebarNavItem",
    name: "วิธีใช้งาน",
    to: "/employee/userguide",
    icon: "cilBell",
    className: "mb-2",
    id: 1,
  },
  {
    _tag: "CSidebarNavItem",
    name: "วิธีใช้งาน",
    to: "/committee/userguide",
    icon: "cilBell",
    className: "mb-2",
    id: 2,
  },

  {
    _tag: "CSidebarNavItem",
    name: "วิธีใช้งาน",
    to: "/administrator/userguide",
    icon: "cilBell",
    className: "mb-2",
    id: 3,
  },
  {
    _tag: "CSidebarNavItem",
    name: "วิธีใช้งาน",
    to: "/head/userguide",
    icon: "cilBell",
    className: "mb-2",
    id: 4,
  },
];

// เปลี่ยน menu ตรง id
const _navug = navug.filter((r) => r.id === Number(Cookies.get(token.type)));

export default _navug;