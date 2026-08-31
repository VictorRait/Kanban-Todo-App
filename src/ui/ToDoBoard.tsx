import React, { useState } from "react";
import TaskCard from "./TaskCard";
import type { Task } from "./TaskCard";

type TeamRow = {
	team: string;
	backlog: Task[];
	todo: Task[];
	inprogress: Task[];
	staging: Task[];
	done: Task[];
};

function ToDoBoard() {
	const columnHeaders = ["Backlog", "ToDo", "InProgress", "Staging", "Done"];
	const cellClass =
		"border-r border-b border-slate-300 p-2 h-full items-center text-center";
	const [rows, setRows] = useState<TeamRow[]>([
		{
			team: "teamA",
			backlog: [
				{ id: "a1", title: "Task 1" },
				{ id: "a2", title: "Task 2" },
			],
			todo: [{ id: "a3", title: "Task 3" }],
			inprogress: [],
			staging: [],
			done: [],
		},
		{
			team: "teamB",
			backlog: [{ id: "b1", title: "Task 1" }],
			todo: [],
			inprogress: [],
			staging: [],
			done: [],
		},
		{
			team: "teamC",
			backlog: [],
			todo: [{ id: "c1", title: "Task 1" }],
			inprogress: [],
			staging: [],
			done: [],
		},
	]);

	function handleDragOver(e: React.DragEvent) {
		e.preventDefault();
		console.log("drag start");
	}

	function handleDrop(e: React.DragEvent) {
		e.preventDefault();
		const data = JSON.parse(e.dataTransfer.getData("text/plain"));
		console.log("dropped", data);
	}

	return (
		<div className='p-4 w-full h-full'>
			<div className='grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr] grid-rows-[50px_1fr_1fr_1fr] text-center items-center w-full h-full border-t border-l  border-slate-300'>
				<div className={cellClass}>+</div>
				{columnHeaders.map((headers) => (
					<div
						key={headers}
						className={cellClass}>
						{headers}
					</div>
				))}
				{rows.map((row) => {
					return (
						<React.Fragment key={row.team}>
							<div
								className={cellClass + " flex justify-center"}
								onDragOver={handleDragOver}
								onDrop={handleDrop}>
								{row.team}
							</div>
							<div
								className={cellClass}
								onDragOver={handleDragOver}
								onDrop={handleDrop}>
								{row.backlog.map((task) => (
									<TaskCard
										key={task.id}
										task={task}
										team={row.team}
										stage='backlog'
									/>
								))}
							</div>
							<div
								className={cellClass}
								onDragOver={handleDragOver}
								onDrop={handleDrop}>
								{row.todo.map((task) => (
									<TaskCard
										key={task.id}
										task={task}
										team={row.team}
										stage='todo'
									/>
								))}
							</div>
							<div
								className={cellClass}
								onDragOver={handleDragOver}
								onDrop={handleDrop}>
								{row.inprogress.map((task) => (
									<TaskCard
										key={task.id}
										task={task}
										team={row.team}
										stage='backlog'
									/>
								))}
							</div>
							<div
								className={cellClass}
								onDragOver={handleDragOver}
								onDrop={handleDrop}>
								{row.staging.map((task) => (
									<TaskCard
										task={task}
										team={row.team}
										stage='backlog'
									/>
								))}
							</div>
							<div
								className={cellClass}
								onDragOver={handleDragOver}
								onDrop={handleDrop}>
								{row.done.map((task) => (
									<TaskCard
										key={task.id}
										task={task}
										team={row.team}
										stage='backlog'
									/>
								))}
							</div>
						</React.Fragment>
					);
				})}{" "}
			</div>
		</div>
	);
}

export default ToDoBoard;
