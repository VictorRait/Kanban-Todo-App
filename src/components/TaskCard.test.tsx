import { describe, expect, it, vi } from "vitest";
import TaskCard from "./TaskCard";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe(" TaskCard component", () => {
	it("renders the title and content provided in the task prop", () => {
		render(
			<TaskCard
				task={{
					id: "1",
					title: "Test Task",
					content: ["Content 1", "Content 2"],
				}}
				team='Team A'
				stage='todo'
				isSelected={false}
				onSelect={vi.fn()}
				onDelete={vi.fn()}
			/>,
		);

		expect(screen.getByText("Test Task")).toBeInTheDocument();
		expect(screen.getByText("Content 1")).toBeInTheDocument();
	});
	it("does not show delete when not selected", () => {
		render(
			<TaskCard
				task={{
					id: "2",
					title: "Test Task",
					content: ["Content A", "Content B"],
				}}
				team='Team A'
				stage='todo'
				isSelected={false}
				onSelect={vi.fn()}
				onDelete={vi.fn()}
			/>,
		);

		expect(screen.queryByTitle("Delete Task")).not.toBeInTheDocument();
	});

	it("shows delete when selected", async () => {
		const mockDelete = vi.fn();
		const user = userEvent.setup();
		render(
			<TaskCard
				task={{
					id: "3",
					title: "Test Task",
					content: ["Content C", "Content D"],
				}}
				team='Team C'
				stage='staging'
				isSelected={true}
				onSelect={vi.fn()}
				onDelete={mockDelete}
			/>,
		);

		const deleteButton = screen.getByTitle("Delete Task");
		expect(deleteButton).toBeInTheDocument();

		await user.click(deleteButton);

		expect(mockDelete).toHaveBeenCalledTimes(1);
	});
});
