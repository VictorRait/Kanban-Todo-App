import { describe, expect, it } from "vitest";
import { GET_TASKS, TASK_UPDATED_SUBSCRIPTION } from "../graphql/tasks";
import ToDoBoard from "./ToDoBoard";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing/react";
describe("ToDoBoard component ", () => {
	const mocks = [
		{
			request: { query: GET_TASKS },
			result: {
				data: {
					tasks: [
						{
							id: "task-99",
							title: "Interview Ready Task",
							content: ["Pass technical interview,", "Celebrate"],
							image: null,
							team: "teamA",
							stage: "todo",
							__typename: "Task",
						},
					],
				},
			},
		},
		{
			request: { query: TASK_UPDATED_SUBSCRIPTION },
			result: {
				data: {
					taskUpdated: {
						id: "task-99",
						title: "Interview Ready Task",
						content: ["Pass technical interview,", "Celebrate"],
						image: null,
						team: "teamA",
						stage: "todo",
						__typename: "Task",
					},
				},
			},
		},
	];

	it("should render the loading state initially, then redner tasks from GraphQL", async () => {
		render(
			<MockedProvider mocks={mocks}>
				<ToDoBoard />
			</MockedProvider>,
		);

		expect(screen.getByText("Loading Board...")).toBeInTheDocument();

		const taskTitle = await screen.findByText("Interview Ready Task");
		expect(taskTitle).toBeInTheDocument();

		expect(screen.getByText("Pass technical interview,")).toBeInTheDocument();
		expect(screen.getByText("Celebrate")).toBeInTheDocument();
	});
});
