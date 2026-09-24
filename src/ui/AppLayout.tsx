import { useState } from "react";
import SideMenu from "../components/SideMenu";
import ToDoBoard from "../components/ToDoBoard";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function AppLayout() {
	// const theme = useTheme();
	// const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<div className='flex h-screen'>
			<SideMenu
				isOpen={isMenuOpen}
				onClose={() => setIsMenuOpen(false)}
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
					<div>Welcome Board</div>
				</div>
				<ToDoBoard />
			</div>
		</div>
	);
}

export default AppLayout;
