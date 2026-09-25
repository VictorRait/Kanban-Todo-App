import { gql, type TypedDocumentNode } from "@apollo/client";
import type { Task, TasksData } from "../types/tasks";

export const GET_TASKS: TypedDocumentNode<TasksData> = gql`
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

export const MOVE_TASK: TypedDocumentNode<
	Task,
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

export const DELETE_TASK: TypedDocumentNode<
	{ deletedTask: { id: string } },
	{ id: string }
> = gql`
	mutation DeleteTask($id: ID!) {
		deleteTask(id: $id) {
			id
		}
	}
`;

export const TASK_UPDATED_SUBSCRIPTION = gql`
	subscription OnTaskUpdated {
		taskUpdated {
			id
			title
			content
			image
			team
			stage
		}
	}
`;
