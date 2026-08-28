import SideMenu from "./SideMenu";
import ToDoBoard from "./ToDoBoard";

function AppLayout() {
	return (
		<div className='flex h-screen'>
			<SideMenu />
			<div className='flex flex-col w-full items-center'>
				<div>Welcome Board</div>
				<ToDoBoard />
			</div>
		</div>
	);
}

export default AppLayout;
