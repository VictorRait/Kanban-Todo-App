type Task = {
	id: string;
	title?: string;
	content: string[];
};

type TaskCardProps = {
	task: Task;
	team: string;
	stage: string;
};

type TaskStage = "backlog" | "todo" | "inprogress" | "staging" | "done";

function TaskCard({ task, team, stage }: TaskCardProps) {
	function handleDragStart(e: React.DragEvent) {
		e.dataTransfer.setData(
			"text/plain",
			JSON.stringify({ team, stage, taskId: task.id }),
		);
	}

	return (
		<div
			draggable
			onDragStart={handleDragStart}
			className='bg-white border border-slate-300 rounded p-2 mb-1 text-xs text-left shadow-sm cursor-grab w-50 m-0'
			key={task.id}>
			<div>
				{" "}
				{task.title && <div className='font-bold'>{task.title}</div>}
				<ul>
					{task.content.map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default TaskCard;
export type { Task, TaskStage };
