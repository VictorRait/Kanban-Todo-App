import {
	Box,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Typography,
} from "@mui/material";
import { GET_BOARDS } from "../graphql/tasks";
import { useState } from "react";
import { useQuery } from "@apollo/client/react";

type SideMenuProps = {
	isOpen: boolean;
	onClose: () => void;
	selectedBoardId: string;
	onSelectBoard: (boardId: string) => void;
};

const NavItems = ["Kanban", "Calendar", "Editor", "Settings"];

function DrawerContent({
	selectedBoardId,
	onSelectBoard,
	onClose,
}: {
	selectedBoardId: string;
	onSelectBoard: (boardId: string) => void;
	onClose: () => void;
}) {
	const [activeTab, setActiveTab] = useState("Kanban");

	const { data, loading } = useQuery(GET_BOARDS);
	const boards = data?.boards ?? [];

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
						<ListItemButton
							onClick={() => alert("Add board modal coming next!")}
							sx={{
								"&:hover": {
									bgColor: "action.hover",
								},
							}}>
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
		</Box>
	);
}

function SideMenu({ isOpen, onClose, selectedBoardId, onSelectBoard }: SideMenuProps) {
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
				/>
			</Drawer>
		</>
	);
}

export default SideMenu;
