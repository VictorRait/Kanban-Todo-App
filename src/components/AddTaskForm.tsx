import React, { useState } from "react";

function AddTaskForm({
	setRows,
	setIsAddingTask,
}: {
	setRows: React.Dispatch<React.SetStateAction<any[]>>;
	setIsAddingTask: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [taskName, setTaskName] = useState("");
	const [taskDetails, setTaskDetails] = useState("");
	const inputClass =
		"border border-slate-300 rounded px-2 py-1 text-xs w-full min-w-50 in-focus:border-slate-400 focus:outline-none focus:ring-1";
	const labelClass = "flex flex-col gap-1";

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const result = {
			team: formData.get("team") as string,
			stage: formData.get("stage") as string,
			name: formData.get("task") as string,
			details: formData.get("details") as string,
		};
		console.log(result);

		setRows((prevRows) =>
			prevRows.map((row) => {
				if (row.team !== result.team) return row;

				return {
					...row,
					team: result.team,
					[result.stage]: [
						...row[result.stage as keyof typeof row],
						{
							id: Date.now().toString(),
							title: result.name || undefined,
							content: [result.details],
						},
					],
				};
			}),
		);

		setTaskName("");
		setTaskDetails("");
		setIsAddingTask(false);
		return result;
	}
	return (
		<form
			onSubmit={handleSubmit}
			className='absolute p-6 items-start bg-white border border-slate-400  top-10 left-12  flex flex-col text-left text-sm gap-2

    '>
			<button
				type='button'
				onClick={() => setIsAddingTask(false)}
				className='absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer'>
				X
			</button>
			<label className={labelClass}>
				Task:
				<input
					type='text'
					name='task'
					placeholder='What needs doing?'
					value={taskName}
					onChange={(e) => setTaskName(e.target.value)}
					className={inputClass}
				/>
			</label>
			<label className={labelClass}>
				Details:
				<textarea
					value={taskDetails}
					name='details'
					onChange={(e) => setTaskDetails(e.target.value)}
					placeholder='Enter description here...'
					className={inputClass}></textarea>
			</label>
			<label className={labelClass}>
				Team:
				<select
					name='team'
					className={inputClass}>
					<option value='teamA'>Team A</option>
					<option value='teamB'>Team B</option>
					<option value='teamC'>Team C</option>
				</select>
			</label>
			<label className={labelClass}>
				Stage:
				<select
					name='stage'
					className={inputClass}>
					<option value='backlog'>Backlog</option>
					<option value='todo'>ToDo</option>
					<option value='inprogress'>In Progress</option>
					<option value='staging'>Staging</option>
					<option value='done'>Done</option>
				</select>
			</label>
			<button
				className='border border-slate-400 px-2 py-1 mt-3 rounded text-xs cursor-pointer focus:outline-none focus:ring-1 self-end'
				type='submit'>
				Submit
			</button>
		</form>
	);
}

export default AddTaskForm;
