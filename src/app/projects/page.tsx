/* eslint-disable @typescript-eslint/no-unsafe-argument */
'use client';
import Navbar from '@/components/Navbar';
import SideBar from '@/components/SideBar';
import { DataTable } from './data-table';
import { projectColumns } from './columns';
import CreateProjectsForm from './CreateProjectsForm';
import { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import axios from 'axios';
import EditProject from './EditProject';
import { getCookie } from 'cookies-next';

export default function ProjectPage() {
	const [create, setCreate] = useState<boolean>(false);
	const [projectData, setProjectData] = useState([]);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [isEditableProjectData, setIsEditableProjectData] = useState<
		Project | undefined
	>(undefined);
	const fetchEnquiry = async () => {
		try {
			const { data } = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/projects/getAllProjects`,
				{
					headers: {
						Authorization: ` Bearer ${getCookie('accessToken')}`,
					},
					// withCredentials: true,
				}
			);

			setProjectData(data?.data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		void fetchEnquiry();
	}, []);

	// console.log(isEditableProjectData);

	return (
		<main className="flex h-full w-full">
			<section className="h-full w-[20%]">
				<SideBar />
			</section>
			<ScrollArea className="overflow-y-none relative h-full w-[80%]">
				<Navbar />

				{isEditOpen ? (
					<EditProject
						isEditableProjectData={isEditableProjectData}
						setIsEditableProjectData={setIsEditableProjectData}
						setIsEditOpen={setIsEditOpen}
					/>
				) : create ? (
					<CreateProjectsForm setCreate={setCreate} />
				) : (
					<section className="flex h-full w-full flex-col py-16 ">
						<section className=" h-auto w-full px-10 pb-5 pt-10">
							<span className="text-3xl font-semibold">Projects</span>
						</section>
						<section className="mx-auto flex h-full w-full ">
							{/* <section className="h-full w-[70%] border border-black"></section> */}
							<section className="mx-auto flex h-full w-full max-w-7xl flex-col ">
								<section className="">
									<DataTable
										columns={projectColumns}
										data={projectData}
										setCreate={setCreate}
										setIsEditableProjectData={setIsEditableProjectData}
										setIsEditOpen={setIsEditOpen}
									/>
								</section>
							</section>
						</section>
					</section>
				)}
			</ScrollArea>
		</main>
	);
}
