import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  CCreateElement,
  CSidebar,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CSidebarHeader,
  CSidebarFooter,
  // CImg,
} from "@coreui/react";

// sidebar nav config
import navigation from "./_nav";
import navigationug from "./_navUserGuide";
import "./_nav.css";

// remove cookies
import { remove } from "../config";

const bg = "#4f4e4e";
const fontSize = "18px";

const TheSidebar = () => {
  const history = useHistory();

  const [cusStyle, setCusStyle] = useState(false);
  const [name, setName] = useState(null);
  const [position, setPosition] = useState(null);
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow);

  const Logout = () => {
    remove();
    history.push("/login");
  };

//   ชื่อ user
  useEffect(() => {
    setName("");
    setPosition("");
  }, []);
  
  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
      style={{ background: "#4d5666" }}
    >
      <CSidebarHeader style={{ background: bg }}>
        <div className="text-center mt-5">
          {/* <CImg
            src={"avatars/6.jpg"}
            style={{ borderRadius: "50em", height: "auto", width: "100px" }}
          /> */}
          <br />
          <label className="mb-0 mt-4" style={{ fontSize: fontSize }}>
            {name}
          </label>
          <br className="mb-0" />
          <label style={{ fontWeight: "bold", fontSize: fontSize }}>
            {position}
          </label>
        </div>
      </CSidebarHeader>
      <CSidebarNav style={{ background: bg }}>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
        <hr 
            style={{ backgroundColor: "white", width: "90%" }}
        />
        <CCreateElement
          items={navigationug}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer
        style={{ background: bg }}
        className="c-d-md-down-none"
      />
      <CSidebarFooter style={{ background: bg }}>
        <div className="ml-4 mb-4"
          style={
            cusStyle
              ? { 
                  width: "80%",
                  padding: "13px",
                  fontWeight: "bold",
                  textAlign: "center",
                  borderRadius: "25px",
                  border: "1px solid #fdc331",
                  background: "#fdc331",
                  fontSize: "14px",
                  cursor: "pointer",
                  color: "#000015",
                }
              : {
                  width: "80%",
                  padding: "13px",
                  fontWeight: "bold",
                  textAlign: "center",
                  borderRadius: "25px",
                  border: "1px solid #fdc331",
                  fontSize: "14px",
                  cursor: "pointer",
                }
          }
          onMouseEnter={() => setCusStyle(true)}
          onMouseLeave={() => setCusStyle(false)}
          onClick={Logout}
        >
          ออกจากระบบ
        </div>
      </CSidebarFooter>
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
