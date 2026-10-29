import { useState } from "react";
import SideMenu from "../components/SideMenu";
import ToDoBoard from "../components/ToDoBoard";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function AppLayout() {
	// const theme = useTheme();
	// const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [boardName, setBoardName] = useState("Website Redesign");
	const [selectedBoardId, setSelectedBoardId] = useState("board-1");
	const [activeTab, setActiveTab] = useState("Kanban");

	return (
		<div className='flex h-screen'>
			<SideMenu
				isOpen={isMenuOpen}
				onClose={() => setIsMenuOpen(false)}
				selectedBoardId={selectedBoardId}
				onSelectBoard={(id) => setSelectedBoardId(id)}
				setBoardName={setBoardName}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			/>
			<div className='flex flex-col w-full min-w-0 items-center relative'>
				<div className='w-full flex items-center justify-center pt-2'>
					<IconButton
						onClick={() => setIsMenuOpen(true)}
						sx={{
							display: { sm: "inline-flex", md: "none" },
							position: "absolute",
							left: 35,
							top: 0,
						}}>
						<MenuIcon />
					</IconButton>
				</div>
				{activeTab === "Kanban" ? (
					<>
						{" "}
						<div>{boardName} Board</div>
						<ToDoBoard boardId={selectedBoardId} />
					</>
				) : (
					<div className='h-full flex justify-center items-center'>
						<h1 className=' border border-red-400 p-4'>
							This feature will be available in future updates!😀
						</h1>
					</div>
				)}
			</div>
		</div>
	);
}

export default AppLayout;
