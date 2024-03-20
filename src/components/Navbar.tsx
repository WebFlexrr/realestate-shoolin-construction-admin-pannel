'use client';
import React from 'react';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
	Component,
	CreditCard,
	Home,
	LogOut,
	Phone,
	Settings,
	User,
} from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ModeToggle } from './theme-toggle';
// import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from './ui/drawer';
import { Button } from './ui/button';

const Navbar = () => {
	const onLogout = async () => {
		deleteCookie('accessToken');
		router.push('/signin');
		// try {
		// 	deleteCookie('accessToken');
		// 	// const { data } = await axios(
		// 	// 	`${process.env.NEXT_PUBLIC_API_URL}/users/logout`,
		// 	// 	{
		// 	// 		headers: {
		// 	// 			Authorization: ` Bearer ${getCookie('accessToken')}`,
		// 	// 		},
		// 	// 		// withCredentials: true,
		// 	// 	}
		// 	// );
		// 	// console.log(data);
		// 	router.push('/signin');
		// } catch (error) {
		// 	console.log(error);
		// }
	};
	const router = useRouter();
	const pathname = usePathname();
	const option = pathname.split('/')[1];
	return (
		<section className="fixed left-0 right-0 top-0 z-30 h-16 w-full border bg-background lg:left-[20%] lg:w-[80%] ">
			<section className="flex h-full w-full justify-between px-5 py-2 lg:justify-between lg:px-20">
				<section className="visible lg:invisible">
					<Drawer>
						<DrawerTrigger>
							<div className="disabled:opacity-50h-10 inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none  ">
								Open
							</div>
						</DrawerTrigger>
						<DrawerContent>
							<DrawerHeader>
								<DrawerTitle className="mb-5">Menu </DrawerTitle>

								<Button
									variant={option === '' ? 'default' : 'secondary'}
									onClick={() => {
										router.push('/');
									}}
									className=" flex w-full justify-start"
								>
									<Component className="mr-2 h-4 w-4" />
									<span>Dashboard</span>
								</Button>

								<Button
									variant={option === 'projects' ? 'default' : 'secondary'}
									onClick={() => {
										router.push('/projects');
									}}
									className=" flex w-full justify-start"
								>
									<Home className="mr-2 h-4 w-4" />
									<span>Projects</span>
								</Button>

								<Button
									variant={option === 'enquiry' ? 'default' : 'secondary'}
									onClick={() => {
										router.push('/enquiry');
									}}
									className="flex w-full justify-start"
								>
									<Phone className="mr-2 h-4 w-4" />
									<span>Enquiry</span>
								</Button>
							</DrawerHeader>
							<DrawerFooter>
								{/* <Button>Submit</Button> */}
								<DrawerClose>
									<Button variant="outline" className="w-full">
										Cancel
									</Button>
								</DrawerClose>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</section>

				<section className="flex w-fit items-center gap-5">
					<ModeToggle />
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Avatar>
								<AvatarImage src="https://github.com/shadcn.png" />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="text-xl">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<User className="mr-2 h-4 w-4" />
									<span>My Profile</span>
									<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<CreditCard className="mr-2 h-4 w-4" />
									<span>Billing</span>
									<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Settings className="mr-2 h-4 w-4" />
									<span>Account Settings</span>
									<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />

							<DropdownMenuItem
								onClick={async () => {
									await onLogout();
								}}
							>
								<LogOut className="mr-2 h-4 w-4" />
								<span>Log out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</section>
			</section>
			<Separator />
		</section>
	);
};

export default Navbar;
