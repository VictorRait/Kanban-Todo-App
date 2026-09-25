import React, { useState } from "react";
import TaskCard from "./TaskCard";
import AddTaskForm from "./AddTaskForm";
import { useMutation, useQuery, useSubscription } from "@apollo/client/react";
import {
	DELETE_TASK,
	GET_TASKS,
	MOVE_TASK,
	TASK_UPDATED_SUBSCRIPTION,
} from "../graphql/tasks";
import { CELL_CLASS, columnHeaders, stages, teams } from "../constants/board";
import type { TaskStage } from "../types/tasks";

function ToDoBoard() {
	const { data, loading, error, refetch } = useQuery(GET_TASKS);
	const [moveTask] = useMutation(MOVE_TASK);
	const [deleteTask] = useMutation(DELETE_TASK, {
		refetchQueries: ["GetTasks"],
	});

	const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
	const [isAddingTask, setIsAddingTask] = useState(false);

	console.log("fetched tasks:", data?.tasks, { loading, error });

	useSubscription(TASK_UPDATED_SUBSCRIPTION, {
		onData: ({ data }) => {
			console.log("Kuve update received via WebSocket:", data);
			refetch();
		},
	});

	function handleDragOver(e: React.DragEvent) {
		e.preventDefault();
	}

	function handleDrop(e: React.DragEvent, targetTeam: string, targetStage: TaskStage) {
		e.preventDefault();
		const { taskId } = JSON.parse(e.dataTransfer.getData("text/plain"));
		moveTask({ variables: { id: taskId, team: targetTeam, stage: targetStage } });
	}

	function handleDeleteTask(taskId: string) {
		deleteTask({ variables: { id: taskId } });
		setSelectedTaskId(null);
	}

	function getTasksFor(team: string, stage: string) {
		return (
			data?.tasks.filter((task) => task.team === team && task.stage === stage) ?? []
		);
	}

	return (
		<div className='p-4 w-full h-full overflow-x-auto '>
			<div className='grid grid-cols-[80px_repeat(5,minmax(80px,auto))] grid-rows-[50px_1fr_1fr_1fr] text-center items-center h-full border-t border-l  border-slate-300'>
				<div className={CELL_CLASS + " justify-center relative"}>
					<img
						src='../square.png'
						className='scale-50 cursor-pointer'
						onClick={() => {
							setIsAddingTask(!isAddingTask);
						}}
					/>

					<AddTaskForm
						open={isAddingTask}
						onClose={() => setIsAddingTask(false)}
					/>
				</div>
				{columnHeaders.map((headers) => (
					<div
						key={headers}
						className={CELL_CLASS}>
						{headers}
					</div>
				))}
				{teams.map((team) => {
					return (
						<React.Fragment key={team}>
							<div className={CELL_CLASS + " justify-center items-center"}>
								{team}
							</div>
							{stages.map((stage) => (
								<div
									key={stage}
									className={CELL_CLASS + " items-start justify-start"}
									onDragOver={handleDragOver}
									onDrop={(e) => handleDrop(e, team, stage)}>
									{getTasksFor(team, stage).map((task) => (
										<TaskCard
											key={task.id}
											task={task}
											team={team}
											stage={stage}
											isSelected={selectedTaskId === task.id}
											onSelect={() =>
												setSelectedTaskId(
													selectedTaskId === task.id
														? null
														: task.id,
												)
											}
											onDelete={() => handleDeleteTask(task.id)}
										/>
									))}
								</div>
							))}
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
}

export default ToDoBoard;
