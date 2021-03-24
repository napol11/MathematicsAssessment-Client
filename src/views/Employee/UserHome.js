import React from "react"
import LogoKMUTT from "../components/logoKMUTT.js"

import "antd/dist/antd.css"
import { Calendar, Badge } from "antd"

import "../App.css"

const name = "สโรชา"

function getListData(value) {
	let listData
	switch (value.date()) {
		case 8:
			listData = [
				// { type: "warning", content: "This is warning event." },
				// { type: "success", content: "This is usual event." },
			]
			break
		default:
	}
	return listData || []
}

function dateCellRender(value) {
	const listData = getListData(value)
	return (
		<ul className="events">
			{listData.map(item => (
				<li key={item.content}>
					<Badge status={item.type} text={item.content} />
				</li>
			))}
		</ul>
	)
}

// function getMonthData(value) {
// 	if (value.month() === 8) {
// 		return 1394
// 	}
// }

// function monthCellRender(value) {
// 	const num = getMonthData(value)
// 	return num ? (
// 		<div className="notes-month">
// 			<section>{num}</section>
// 			<span>Backlog number</span>
// 		</div>
// 	) : null
// }

function UserHome() {
	return (
		<div style={{ width: "100%" }}>
			<LogoKMUTT />
			<div className="userhome">
				<h1>สวัสดีคุณ{name}</h1>
				<Calendar
					dateCellRender={dateCellRender}
					//  monthCellRender={monthCellRender}
				/>
				,
			</div>
		</div>
	)
}

export default UserHome
