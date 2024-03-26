'use client';
import Navbar from '@/components/Navbar';
import SideBar from '@/components/SideBar';
import { DataTable } from './data-table';
import { projectColumns } from './columns';
import CreateProjectsForm from './CreateProjectsForm';
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppSelector } from '@/lib/redux/hooks';
import { useGetAllProjectsQuery } from '@/lib/redux/api/apiProjectSlice';

export default function ProjectPage() {
	const [create, setCreate] = useState<boolean>(false);
	const project = useAppSelector((state) => state.project.projects);
	useGetAllProjectsQuery('');

	return (
		<main className="flex h-full w-full">
			<section className="hidden h-full w-full lg:flex lg:w-[20%]">
				<SideBar />
			</section>
			<ScrollArea className="overflow-y-none relative h-full  w-full lg:w-[80%]">
				<Navbar />

				{create ? (
					<CreateProjectsForm setCreate={setCreate} />
				) : (
					<section className="flex h-full w-full flex-col   py-16 ">
						<section className=" h-auto w-full px-10 pb-5 pt-10">
							<span className="text-3xl font-semibold">Projects</span>
						</section>
						<section className="mx-auto flex h-full   w-screen  px-3 lg:w-full ">
							<section className="mx-auto flex h-full w-full max-w-7xl flex-col ">
								<DataTable
									columns={projectColumns}
									data={project}
									setCreate={setCreate}
								/>
							</section>
						</section>
					</section>
				)}
			</ScrollArea>
		</main>
	);
}
