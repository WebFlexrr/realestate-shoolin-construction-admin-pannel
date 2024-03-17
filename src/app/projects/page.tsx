'use client';
import Navbar from '@/components/Navbar';
import SideBar from '@/components/SideBar';
import { DataTable } from './data-table';
import { projectColumns, projectData } from './columns';
import CreateProjectsForm from './CreateProjectsForm';
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ProjectPage() {
	const [create, setCreate] = useState<boolean>(false);
	return (
		<main className="flex h-full w-full">
			<section className="h-full w-[20%]">
				<SideBar />
			</section>
			<ScrollArea className="overflow-y-none relative h-full w-[80%]">
				<Navbar />
				{create ? (
					<CreateProjectsForm create={create} setCreate={setCreate} />
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
										create={create}
										setCreate={setCreate}
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
