import React from "react"
import LogoKMUTT from "../components/logoKMUTT.js"

import { Col, Row, Divider } from "antd"
import "antd/dist/antd.css"

import "../App.css"

function userResult() {
	return (
		<div style={{ width: "100%" }}>
			<LogoKMUTT />
			<div className="userresult">
				<h1>ผลประเมิน</h1>
                <Row>
                    <Col xs={24} sm={20} md={21} lg={21} xl={22}>
                        <h2>ผลการประเมินรอบปีงบประมาณ 1 มกราคม 2563 - 1 กรกฎาคม 2563 </h2>
                    </Col>
                    <Col xs={24} sm={4} md={3} lg={3} xl={2}>
                        <div className="control-buttons">
				            <button className="buttons_form2_1" >
					            พิมพ์ผลประเมิน
				            </button>
			            </div>
                    </Col>
                </Row>
        
                <Divider/>
			</div>
		</div>
	)
}

export default userResult