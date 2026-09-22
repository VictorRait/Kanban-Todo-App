import React, { useState } from "react";
import { gql } from "@apollo/client";

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { useMutation } from "@apollo/client/react";

const compactFieldSx = {
	"& .MuiInputBase-input": { fontSize: "0.875rem" },
	"& .MuiInputLabel-root": { fontSize: "0.875rem" },
};

const CREATE_TASK = gql`
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

function AddTaskForm({ open, onClose }: { open: boolean; onClose: () => void }) {
	const [taskName, setTaskName] = useState("");
	const [taskDetails, setTaskDetails] = useState("");
	const [createTask] = useMutation(CREATE_TASK, {
		// If you pass your actual GET_TASKS query document here, it forces Apollo to update the list:
		// refetchQueries: [{ query: GET_TASKS }],
		refetchQueries: ["GetTasks"], // make sure this matches your query operation name!
	});

	const inputClass =
		"border border-slate-300 rounded px-2 py-1 text-xs w-full min-w-50 in-focus:border-slate-400 focus:outline-none focus:ring-1";

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const team = formData.get("team") as string;
		const stage = formData.get("stage") as string;
		const image = formData.get("image") as string;

		const detailsText = (formData.get("details") as string) || "";
		const content = detailsText
			.split("\n")
			.map((line) => line.trim())
			.filter((line) => line.length > 0);

		createTask({
			variables: {
				input: {
					title: taskName,
					content: content,
					image: image || undefined,
					stage: stage,
					team: team,
				},
			},
		});

		setTaskName("");
		setTaskDetails("");
		onClose();
	}
	return (
		<Dialog
			open={open}
			onClose={onClose}>
			<DialogTitle className='text-sm font-bold text-left'>Add Task</DialogTitle>

			<form
				onSubmit={handleSubmit}
				className='p-6  bg-white border border-slate-400  top-10 left-12  flex flex-col text-left items-end text-sm gap-2

    '>
				<DialogContent
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: 1,
						p: 0,
						minWidth: 300,
					}}>
					<TextField
						type='text'
						label='Task'
						name='task'
						placeholder='What needs doing?'
						value={taskName}
						onChange={(e) => setTaskName(e.target.value)}
						size='small'
						fullWidth
						sx={{ ...compactFieldSx, mt: 0.8 }}></TextField>
					<TextField
						label='Details'
						multiline
						rows={3}
						name='details'
						value={taskDetails}
						onChange={(e) => setTaskDetails(e.target.value)}
						placeholder='Enter description here...'
						size='small'
						fullWidth
						sx={compactFieldSx}></TextField>
					<TextField
						label='Image URL (optional)'
						name='image'
						placeholder='Enter image URL here...'
						size='small'
						fullWidth
						sx={compactFieldSx}
					/>
					<FormControl
						sx={compactFieldSx}
						size='small'>
						<InputLabel id='team-label'>Team:</InputLabel>

						<Select
							name='team'
							labelId='team-label'
							defaultValue='teamA'
							className={inputClass}
							aria-labelledby='team-label'>
							<MenuItem value='teamA'>Team A</MenuItem>
							<MenuItem value='teamB'>Team B</MenuItem>
							<MenuItem value='teamC'>Team C</MenuItem>
						</Select>
					</FormControl>
					<FormControl
						sx={compactFieldSx}
						size='small'>
						<InputLabel id='stage-label'>Stage:</InputLabel>
						<Select
							name='stage'
							labelId='stage-label'
							defaultValue='backlog'
							className={inputClass}>
							<MenuItem value='backlog'>Backlog</MenuItem>
							<MenuItem value='todo'>ToDo</MenuItem>
							<MenuItem value='inprogress'>In Progress</MenuItem>
							<MenuItem value='staging'>Staging</MenuItem>
							<MenuItem value='done'>Done</MenuItem>
						</Select>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button
						className='border border-slate-400 px-2 py-1 mt-3 rounded text-xs cursor-pointer focus:outline-none focus:ring-1 self-end'
						type='submit'
						variant='contained'>
						Submit
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}

export default AddTaskForm;
