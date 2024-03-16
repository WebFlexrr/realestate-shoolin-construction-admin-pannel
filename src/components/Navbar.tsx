import React from 'react';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
	CreditCard,
	LogOut,
	// Mail,
	// MessageSquare,
	// Plus,
	// PlusCircle,
	Settings,
	User,
	// UserPlus,
	// Users,
} from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	// DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	// DropdownMenuSub,
	// DropdownMenuSubContent,
	// DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ModeToggle } from './theme-toggle';
import Image from 'next/image';

const Navbar = (): React.JSX.Element => {
	return (
		<section className=" h-16 w-full ">
			<section className="flex h-full w-full justify-between px-20 py-2">
				<Image
					src={'/logos/logo.png'}
					width={100}
					height={0}
					alt={''}
					className=" w-16 "
				/>
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
								{/* <DropdownMenuItem>
									<Keyboard className="mr-2 h-4 w-4" />
									<span>Keyboard shortcuts</span>
									<DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
								</DropdownMenuItem> */}
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							{/* <DropdownMenuGroup>
								<DropdownMenuItem>
									<Users className="mr-2 h-4 w-4" />
									<span>Team</span>
								</DropdownMenuItem>
								 <DropdownMenuSub>
									<DropdownMenuSubTrigger>
										<UserPlus className="mr-2 h-4 w-4" />
										<span>Invite users</span>
									</DropdownMenuSubTrigger>
									<DropdownMenuPortal>
										<DropdownMenuSubContent>
											<DropdownMenuItem>
												<Mail className="mr-2 h-4 w-4" />
												<span>Email</span>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<MessageSquare className="mr-2 h-4 w-4" />
												<span>Message</span>
											</DropdownMenuItem>
											<DropdownMenuSeparator />
											<DropdownMenuItem>
												<PlusCircle className="mr-2 h-4 w-4" />
												<span>More...</span>
											</DropdownMenuItem>
										</DropdownMenuSubContent>
									</DropdownMenuPortal>
								</DropdownMenuSub>
								<DropdownMenuItem>
									<Plus className="mr-2 h-4 w-4" />
									<span>New Team</span>
									<DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
								</DropdownMenuItem>
							</DropdownMenuGroup> */}
							{/* <DropdownMenuSeparator /> */}
							{/* <DropdownMenuItem>
								<Github className="mr-2 h-4 w-4" />
								<span>GitHub</span>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<LifeBuoy className="mr-2 h-4 w-4" />
								<span>Support</span>
							</DropdownMenuItem>
							<DropdownMenuItem disabled>
								<Cloud className="mr-2 h-4 w-4" />
								<span>API</span>
							</DropdownMenuItem> */}
							{/* <DropdownMenuSeparator /> */}
							<DropdownMenuItem>
								<LogOut className="mr-2 h-4 w-4" />
								<span>Log out</span>
								<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
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
