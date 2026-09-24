import type { TaskStage } from "../types/tasks";

export const teams = ["teamA", "teamB", "teamC"];
export const stages: TaskStage[] = ["backlog", "todo", "inprogress", "staging", "done"];
export const columnHeaders = [
	"🚥Backlog",
	"📋ToDo",
	"🪖In Progress",
	"🎁Staging",
	"✅Done",
];
export const CELL_CLASS =
	"border-r border-b border-slate-300 p-2 h-full text-center flex justify-center gap-2  ";
