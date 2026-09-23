import React, { useState } from "react";
import TaskCard from "./TaskCard";
import type { TaskStage } from "./TaskCard";
import AddTaskForm from "../components/AddTaskForm";
import { useMutation, useQuery } from "@apollo/client/react";
import { gql, type TypedDocumentNode } from "@apollo/client";

type FetchedTask = {
	id: string;
	title?: string;
	content: string[];
	image?: string;
	team: string;
	stage: string;
};

type TasksData = {
	tasks: FetchedTask[];
};

const GET_TASKS: TypedDocumentNode<TasksData> = gql`
	query GetTasks {
		tasks {
			id
			title
			content
			image
			team
			stage
		}
	}
`;

const MOVE_TASK: TypedDocumentNode<
	FetchedTask,
	{ id: string; team: string; stage: string }
> = gql`
	mutation MoveTask($id: ID!, $team: String!, $stage: String!) {
		moveTask(id: $id, team: $team, stage: $stage) {
			id
			stage
			team
		}
	}
`;

const DELETE_TASK: TypedDocumentNode<{ deletedTask: { id: string } }, { id: string }> =
	gql`
		mutation DeleteTask($id: ID!) {
			deleteTask(id: $id) {
				id
			}
		}
	`;

const teams = ["teamA", "teamB", "teamC"];
const stages: TaskStage[] = ["backlog", "todo", "inprogress", "staging", "done"];
const columnHeaders = ["🚥Backlog", "📋ToDo", "🪖In Progress", "🎁Staging", "✅Done"];
const cellClass =
	"border-r border-b border-slate-300 p-2 h-full text-center flex justify-center gap-2  ";

function ToDoBoard() {
	const { data, loading, error } = useQuery(GET_TASKS);
	const [moveTask] = useMutation(MOVE_TASK);
	const [deleteTask] = useMutation(DELETE_TASK, {
		refetchQueries: ["GetTasks"],
	});

	const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
	const [isAddingTask, setIsAddingTask] = useState(false);

	console.log("fetched tasks:", data?.tasks, { loading, error });

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
				<div className={cellClass + " justify-center relative"}>
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
						className={cellClass}>
						{headers}
					</div>
				))}
				{teams.map((team) => {
					return (
						<React.Fragment key={team}>
							<div className={cellClass + " justify-center items-center"}>
								{team}
							</div>
							{stages.map((stage) => (
								<div
									key={stage}
									className={cellClass + " items-start justify-start"}
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
