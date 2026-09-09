import {  Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

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
		<Card
			draggable
			onDragStart={handleDragStart}
			variant='outlined'
			sx={{
				mb: 1,
				textAlign: "left",
				cursor: "grab",
				borderColor: "grey.300",
				maxWidth: 180,
			}}
			key={task.id}>
			<CardContent
				className='p-0'
				sx={{ p: 1, "&:last-child": { pb: 1 } }}>
				{task.title && (
					<Typography
						variant='subtitle1'
						sx={{ fontWeight: "700", mb: 0.5 }}>
						{task.title}
					</Typography>
				)}
				<Typography
					component='ul'
					variant='body2'
					color='text.secondary'
					className='list-disc list-outside pl-4'
					sx={{ "::marker": { m: 0 } }}>
					{task.content.map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</Typography>
			</CardContent>
		</Card>
	);
}

export default TaskCard;
export type { Task, TaskStage };
