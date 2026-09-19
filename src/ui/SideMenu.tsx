import { Drawer } from "@mui/material";

type SideMenuProps = {
	isOpen: boolean;
	onClose: () => void;
};

const MenuItems = ["Kanban", "Calendar", "Editor", "Settings"];

function DrawerContent() {
	return (
		<ul className='flex flex-col justify-center items-center space-y-4 h-full w-[250px] '>
			{MenuItems.map((items) => (
				<li key={items}>{items}</li>
			))}
		</ul>
	);
}

function SideMenu({ isOpen, onClose }: SideMenuProps) {
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
				<DrawerContent />
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
				<DrawerContent />
			</Drawer>
		</>
	);
}

export default SideMenu;
