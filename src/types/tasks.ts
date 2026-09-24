export type TaskStage = "backlog" | "todo" | "inprogress" | "staging" | "done";

export type Task = {
	id: string;
	title?: string;
	content: string[];
	image?: string;
	team: string;
	stage: string;
};

export type TasksData = {
	tasks: Task[];
};
