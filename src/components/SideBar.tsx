'use client';
import React from 'react';
import { Separator } from './ui/separator';

import { Button } from './ui/button';

import { Component, Home, Phone } from 'lucide-react';
import { Label } from './ui/label';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

const SideBar = (): React.JSX.Element => {
	const router = useRouter();
	const pathname = usePathname();
	const option = pathname.split('/')[1];
	return (
		<section className="flex h-full w-full ">
			<section className="flex h-full w-full flex-col gap-3 px-4 py-6 ">
				<section className="flex h-auto w-full justify-center">
					<Image
						src={'/logos/logo.png'}
						width={100}
						height={0}
						alt={''}
						className=" w-28 "
					/>
				</section>
				<Label className="text-lg font-bold">Menu</Label>
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
			</section>
			<Separator orientation="vertical" />
		</section>
	);
};

export default SideBar;
