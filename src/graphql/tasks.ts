import { gql, type TypedDocumentNode } from "@apollo/client";
import type { Task, TasksData, BoardsData } from "../types/tasks";

export const GET_BOARDS: TypedDocumentNode<BoardsData> = gql`
	query GetBoards {
		boards {
			id
			name
		}
	}
`;

export const GET_TASKS: TypedDocumentNode<TasksData> = gql`
	query GetTasks($boardId: ID!) {
		tasks(boardId: $boardId) {
			id
			title
			content
			image
			team
			stage
			boardId
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

export const CREATE_TASK: TypedDocumentNode<
	{ createTask: Task },
	{
		input: {
			title?: string;
			content: string[];
			image?: string;
			team: string;
			stage: string;
			boardId: string;
		};
	}
> = gql`
	mutation CreateTask($input: CreateTaskInput!) {
		createTask(input: $input) {
			id
			title
			content
			image
			team
			stage
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
