import React, { useState } from "react";
import TaskCard from "./TaskCard";
import type { Task, TaskStage } from "./TaskCard";

type TeamRow = {
	team: string;
	backlog: Task[];
	todo: Task[];
	inprogress: Task[];
	staging: Task[];
	done: Task[];
};

const columnHeaders = ["🚥Backlog", "📋ToDo", "🪖In Progress", "🎁Staging", "✅Done"];
const cellClass =
	"border-r border-b border-slate-300 p-2 h-full text-center flex justify-center gap-2  ";

const initialRows: TeamRow[] = [
	{
		team: "teamA",
		backlog: [
			{
				id: "a1",
				title: "Task 1",
				content: ["This is the first task", "Additional details"],
			},
			{ id: "a2", content: ["Task 2"] },
		],
		todo: [{ id: "a3", content: ["Task 3"] }],
		inprogress: [],
		staging: [],
		done: [],
	},
	{
		team: "teamB",
		backlog: [{ id: "b1", content: ["Task 1"] }],
		todo: [],
		inprogress: [],
		staging: [],
		done: [],
	},
	{
		team: "teamC",
		backlog: [],
		todo: [{ id: "c1", content: ["Task 1"] }],
		inprogress: [],
		staging: [],
		done: [],
	},
];

function ToDoBoard() {
	const [rows, setRows] = useState<TeamRow[]>(initialRows);

	function handleDragOver(e: React.DragEvent) {
		e.preventDefault();
	}

	function handleDrop(e: React.DragEvent, targetTeam: string, targetStage: TaskStage) {
		e.preventDefault();
		const data = JSON.parse(e.dataTransfer.getData("text/plain"));

		const sourceRow = rows.find((row) => row.team === data.team);
		const stageTask = sourceRow?.[data.stage as TaskStage] as Task[];
		const task = stageTask?.find((t) => t.id === data.taskId);
		if (!task) return;
		console.log("data", data);

		setRows((prevRows) =>
			prevRows.map((row) => {
				if (row.team !== data.team) return row;

				return {
					...row,
					[data.stage]: stageTask?.filter((t) => t.id !== data.taskId),
				};
			}),
		);

		setRows((prevRows) =>
			prevRows.map((row) => {
				if (row.team !== targetTeam) return row;

				return {
					...row,
					[targetStage]: [...row[targetStage], task],
				};
			}),
		);
	}

	return (
		<div className='p-4 w-full h-full'>
			<div className='grid grid-cols-[80px_repeat(5,minmax(80px,auto))] grid-rows-[50px_1fr_1fr_1fr] text-center items-center w-full h-full border-t border-l  border-slate-300'>
				<div className={cellClass + " justify-center"}>
					<img
						src='../square.png'
						className='scale-50 cursor-pointer'
					/>
				</div>
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
							<div className={cellClass + " justify-center items-center "}>
								{row.team}
							</div>
							<div
								className={cellClass + " items-start justify-start"}
								onDragOver={handleDragOver}
								onDrop={(e) => handleDrop(e, row.team, "backlog")}>
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
								className={cellClass + " items-start justify-start	"}
								onDragOver={handleDragOver}
								onDrop={(e) => handleDrop(e, row.team, "todo")}>
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
								className={cellClass + " items-start justify-start"}
								onDragOver={handleDragOver}
								onDrop={(e) => handleDrop(e, row.team, "inprogress")}>
								{row.inprogress.map((task) => (
									<TaskCard
										key={task.id}
										task={task}
										team={row.team}
										stage='inprogress'
									/>
								))}
							</div>
							<div
								className={cellClass + " items-start justify-start"}
								onDragOver={handleDragOver}
								onDrop={(e) => handleDrop(e, row.team, "staging")}>
								{row.staging.map((task) => (
									<TaskCard
										key={task.id}
										task={task}
										team={row.team}
										stage='staging'
									/>
								))}
							</div>
							<div
								className={cellClass + " items-start justify-start"}
								onDragOver={handleDragOver}
								onDrop={(e) => handleDrop(e, row.team, "done")}>
								{row.done.map((task) => (
									<TaskCard
										key={task.id}
										task={task}
										team={row.team}
										stage='done'
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
