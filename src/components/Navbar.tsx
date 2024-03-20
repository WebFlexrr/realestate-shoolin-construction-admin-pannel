'use client';
import React from 'react';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { CreditCard, LogOut, Settings, User } from 'lucide-react';
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
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { deleteCookie, getCookie } from 'cookies-next';

const Navbar = () => {
	const router = useRouter();

	const onLogout = async () => {
		try {
			deleteCookie('accessToken');
			const { data } = await axios(
				`${process.env.NEXT_PUBLIC_API_URL}/users/logout`,
				{
					headers: {
						Authorization: ` Bearer ${getCookie('accessToken')}`,
					},
					// withCredentials: true,
				}
			);
			console.log(data);
			router.push('/signin');
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<section className="fixed left-[20%] right-0 top-0 z-30 h-16 w-[80%] border bg-background ">
			<section className="flex h-full w-full justify-end px-20 py-2">
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
