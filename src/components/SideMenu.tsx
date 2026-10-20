import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	TextField,
	Typography,
} from "@mui/material";
import { CREATE_BOARD, GET_BOARDS } from "../graphql/tasks";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";

type SideMenuProps = {
	isOpen: boolean;
	onClose: () => void;
	selectedBoardId: string;
	onSelectBoard: (boardId: string) => void;
	setBoardName: (name: string) => void;
};

const NavItems = ["Kanban", "Calendar", "Editor", "Settings"];

function DrawerContent({
	selectedBoardId,
	onSelectBoard,
	onClose,
	setBoardName,
}: {
	selectedBoardId: string;
	onSelectBoard: (boardId: string) => void;
	onClose: () => void;
	setBoardName: (name: string) => void;
}) {
	const [activeTab, setActiveTab] = useState("Kanban");

	const [isAddingBoard, setIsAddingBoard] = useState(false);
	const [newBoardName, setNewBoardName] = useState("");

	const { data, loading } = useQuery(GET_BOARDS);
	const boards = data?.boards ?? [];

	const [createBoard, { loading: isCreating }] = useMutation(CREATE_BOARD, {
		refetchQueries: [{ query: GET_BOARDS }],
	});

	async function handleCreateBoard(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!newBoardName.trim()) return;

		try {
			const result = await createBoard({
				variables: { name: newBoardName.trim() },
			});

			if (result.data?.createBoard) {
				onSelectBoard(result.data.createBoard.id);
			}

			setNewBoardName("");
			setIsAddingBoard(false);
		} catch (err) {
			console.error("Failed to create board:", err);
		}
	}
	return (
		<Box
			sx={{
				width: 250,
				height: "100%",
				display: "flex",
				flexDirection: "column",
				p: 2,
			}}>
			{activeTab === "Kanban" && (
				<Box sx={{ mb: 2 }}>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							mb: 1,
						}}>
						<Typography
							variant='caption'
							sx={{
								fontWeight: 700,
								color: "text.secondary",
								letterSpacing: 1,
							}}>
							BOARDS
						</Typography>
					</Box>

					{loading ? (
						<Typography
							variant='body2'
							sx={{ color: "text.secondary", p: 1 }}>
							Loading boards...
						</Typography>
					) : (
						<List
							dense
							sx={{ p: 0 }}>
							{boards.map((board) => {
								const isSelected = selectedBoardId === board.id;
								return (
									<ListItem
										key={board.id}
										disablePadding
										sx={{ mb: 0.5 }}>
										<ListItemButton
											selected={isSelected}
											onClick={() => {
												onSelectBoard(board.id);
												setBoardName(board.name);
												onClose(); // Closes drawer on mobile
											}}
											sx={{
												borderRadius: 1,
												"&.Mui-selected": {
													bgcolor: "primary.light",
													color: "primary.contrastText",
													fontWeight: "bold",
													"&:hover": {
														bgcolor: "primary.main",
													},
												},
											}}>
											<ListItemText primary={board.name} />
										</ListItemButton>
									</ListItem>
								);
							})}
						</List>
					)}
					<ListItem
						disablePadding
						sx={{ mt: 1 }}>
						<ListItemButton onClick={() => setIsAddingBoard(true)}>
							<ListItemText
								primary='➕ New board...'
								slotProps={{
									primary: { variant: "body2" },
								}}
							/>
						</ListItemButton>
					</ListItem>

					<Divider sx={{ my: 2 }} />
				</Box>
			)}
			<Typography
				variant='caption'
				sx={{
					fontWeight: 700,
					color: "text.secondary",
					letterSpacing: 1,
					mb: 1,
				}}>
				MENU
			</Typography>
			<List
				dense
				sx={{ p: 0 }}>
				{NavItems.map((item) => {
					const isActive = activeTab === item;
					return (
						<ListItem
							key={item}
							disablePadding
							sx={{ mb: 0.5 }}>
							<ListItemButton
								selected={isActive}
								onClick={() => setActiveTab(item)}>
								<ListItemText
									primary={item}
									slotProps={{ primary: { variant: "body2" } }}
								/>
							</ListItemButton>
						</ListItem>
					);
				})}
			</List>
			<Dialog
				open={isAddingBoard}
				onClose={() => setIsAddingBoard(false)}>
				<DialogTitle>Add New Board</DialogTitle>
				<form onSubmit={handleCreateBoard}>
					<DialogContent sx={{ minWidth: 280, pt: 1 }}>
						<TextField
							fullWidth
							size='small'
							label='Board Name'
							placeholder='e.g. Q4 Sprint, Launch Plan'
							value={newBoardName}
							onChange={(e) => setNewBoardName(e.target.value)}
							required
						/>
					</DialogContent>
					<DialogActions sx={{ px: 3, pb: 2 }}>
						<Button
							onClick={() => setIsAddingBoard(false)}
							size='small'>
							Cancel
						</Button>
						<Button
							type='submit'
							variant='contained'
							size='small'
							disabled={isCreating}>
							{isCreating ? "Creating..." : "Create"}
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</Box>
	);
}

function SideMenu({
	isOpen,
	onClose,
	selectedBoardId,
	onSelectBoard,
	setBoardName,
}: SideMenuProps) {
	return (
		<>
			{/* permanent */}
			<Drawer
				variant='permanent'
				sx={{
					display: { xs: "none", md: "block" },
					width: 250,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: 250,
						boxSizing: "border-box",
						borderRight: "1px solid",
						borderColor: "divider",
					},
				}}>
				<DrawerContent
					selectedBoardId={selectedBoardId}
					onSelectBoard={onSelectBoard}
					onClose={onClose}
					setBoardName={setBoardName}
				/>
			</Drawer>

			{/* temporary for mobile */}
			<Drawer
				variant='temporary'
				open={isOpen}
				onClose={onClose}
				ModalProps={{ keepMounted: true }}
				sx={{
					display: { sm: "block", md: "none" },
				}}>
				<DrawerContent
					selectedBoardId={selectedBoardId}
					onSelectBoard={onSelectBoard}
					onClose={onClose}
					setBoardName={setBoardName}
				/>
			</Drawer>
		</>
	);
}

export default SideMenu;
