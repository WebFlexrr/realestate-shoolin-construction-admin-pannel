'use client';
import Navbar from '@/components/Navbar';
import SideBar from '@/components/SideBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Headset, HomeIcon, User } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';

export default function Home() {
	const [projectData, setProjectData] = useState<Project[]>([]);
	const [enquiryData, setEnquiryData] = useState<Project[]>([]);
	const getAllProjects = async () => {
		try {
			const { data } = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/projects/getAllProjects`,
				{
					headers: {
						Authorization: ` Bearer ${getCookie('accessToken')}`,
					},
				}
			);

			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			setProjectData(data?.data);
		} catch (error) {
			console.log(error);
		}
	};
	const fetchEnquiry = async () => {
		try {
			const { data } = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/enquiry/getAllEnquiry`,
				{
					headers: {
						Authorization: ` Bearer ${getCookie('accessToken')}`,
					},
				}
			);

			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			setEnquiryData(data?.data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		void fetchEnquiry();
		void getAllProjects();
		return () => {
			void fetchEnquiry();
			void getAllProjects();
		};
	}, []);
	return (
		<main className="relative flex h-full w-full  ">
			<section className="hidden h-full lg:flex lg:w-[20%]">
				<SideBar />
			</section>
			<ScrollArea className="overflow-y-none h-full w-full lg:w-[80%]  ">
				<Navbar />
				<section className="mt-16 flex h-full w-full flex-col pb-10">
					<section className=" h-auto w-full px-10 pb-5 pt-10">
						<span className="text-3xl font-semibold">Dashboard</span>
					</section>
					<section className="flex h-full w-full flex-col gap-10 px-5 pt-5 lg:px-10 ">
						<section className="grid h-fit w-full grid-cols-1 gap-10 lg:grid-cols-4">
							<Card className="h-fit w-full">
								<CardHeader>
									<CardTitle className="flex items-center gap-4 text-2xl">
										<HomeIcon />
										Property Posted
									</CardTitle>
								</CardHeader>

								<CardContent className=" ">
									<div className="flex  h-full w-full items-center justify-center text-4xl font-bold">
										{projectData.length}
									</div>
								</CardContent>
							</Card>

							<Card className="h-fit w-full">
								<CardHeader>
									<CardTitle className="flex items-center gap-4 text-2xl">
										<User />
										Registered Users
									</CardTitle>
								</CardHeader>

								<CardContent className=" ">
									<div className="flex  h-full w-full items-center justify-center text-4xl font-bold">
										50
									</div>
								</CardContent>
							</Card>

							<Card className="h-fit w-full">
								<CardHeader>
									<CardTitle className="flex items-center gap-4 text-2xl">
										<Headset />
										Total Enquiries
									</CardTitle>
								</CardHeader>

								<CardContent className=" ">
									<div className="flex  h-full w-full items-center justify-center text-4xl font-bold">
										{enquiryData.length}
									</div>
								</CardContent>
							</Card>
						</section>
						<section className="h-full w-1/2 pb-20 ">
							{/* <DataTable columns={columns} data={EnquiryData}  /> */}
						</section>
					</section>
				</section>
			</ScrollArea>
		</main>
	);
}
