function SideMenu() {
	return (
		<div className='border-r-1 '>
			<ul className='flex flex-col justify-center items-center space-y-4 h-full w-[250px] '>
				<li>Kanban</li>
				<li>Calendar</li>
				<li>Editor</li>
				<li>Settings</li>
			</ul>
		</div>
	);
}

export default SideMenu;
