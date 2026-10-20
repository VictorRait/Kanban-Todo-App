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

	return (
		<div className='flex h-screen'>
			<SideMenu
				isOpen={isMenuOpen}
				onClose={() => setIsMenuOpen(false)}
				selectedBoardId={selectedBoardId}
				onSelectBoard={(id) => setSelectedBoardId(id)}
				setBoardName={setBoardName}
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
					<div>{boardName} Board</div>
				</div>
				<ToDoBoard
					key={selectedBoardId}
					boardId={selectedBoardId}
				/>
			</div>
		</div>
	);
}

export default AppLayout;
