import React, { Component } from "react";

import UserStep from "./step";

// import "../App.css";

export default class form extends Component {
  render() {
    return (
      <div style={{ width: "100%" }}>
        <div className="userform">
          <h1>แบบประเมิน</h1>
        </div>
        <div>
          <UserStep />
        </div>
      </div>
    );
  }
}
