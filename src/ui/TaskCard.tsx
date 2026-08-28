type Task = {
	id: string;
	title: string;
};

type TaskCardProps = {
	task: Task;
	team: string;
	stage: string;
};

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
			className='bg-white border border-slate-300 rounded p-2 mb-1 text-xs text-left shadow-sm cursor-grab'
			key={task.id}>
			{task.title}
		</div>
	);
}

export default TaskCard;
export type { Task };
