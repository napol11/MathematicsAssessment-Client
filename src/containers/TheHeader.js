import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  //   CHeaderNavItem,
  //   CHeaderNavLink,
  //   CSubheader,
  //   CBreadcrumbRouter,
  CImg,
} from "@coreui/react";
// import imgHeader from "../assets/icons/header.jpg";
import logo from "../views/pages/logo.png";

// routes config
// import routes from "../routes";

const TheHeader = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);

  //   const toggleSidebar = () => {
  //     const val = [true, "responsive"].includes(sidebarShow)
  //       ? false
  //       : "responsive";
  //     dispatch({ type: "set", sidebarShow: val });
  //   };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  return (
    <CHeader withSubheader style={{ border: "none" }}>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      {/* <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      /> */}
      <CHeaderBrand
        className="mx-auto d-lg-none"
        style={{ fontWeight: "bold", color: "#f37736" }}
        // to="/"
      >
        <CImg
          src={logo}
          className="d-inline-block align-top"
          alt="KMUTT ระบบประเมินประสิทธิภาพพนักงานสายสนับสนุน"
          height="50"
        />
        <br />
        ระบบประเมินประสิทธิภาพพนักงานสายสนับสนุน
        <br />
        ภาควิชาคณิตศาสตร์
      </CHeaderBrand>

      <CHeaderNav
        className="d-md-down-none mr-auto"
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          color: "#f37736",
          cursor: "default",
        }}
      >
        {/* <CHeaderNavItem className="px-1 mb-2 mt-2">
          <CImg
            src={imgHeader}
            className="d-inline-block align-top"
            alt="KMUTT ระบบประเมินประสิทธิภาพพนักงานสายสนับสนุน"
            height="90"
          />
        </CHeaderNavItem> */}
        <CImg
          src={logo}
          className="d-inline-block align-top m-2"
          alt="KMUTT ระบบประเมินประสิทธิภาพพนักงานสายสนับสนุน"
          height="90"
          style={{
            paddingLeft: "25px",
          }}
        />
        <dv >
        <br />
        ระบบประเมินประสิทธิภาพพนักงานสายสนับสนุน
        <br />
        ภาควิชาคณิตศาสตร์
        </dv>
      </CHeaderNav>

      {/* <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
      </CSubheader> */}
    </CHeader>
  );
};

export default TheHeader;
