export type TaskStage = "backlog" | "todo" | "inprogress" | "staging" | "done";

export type Board = {
	id: string;
	name: string;
};

export type BoardsData = {
	boards: Board[];
};

export type Task = {
	id: string;
	title?: string;
	content: string[];
	image?: string;
	team: string;
	stage: string;
	boardId: string;
};

export type TasksData = {
	tasks: Task[];
};
