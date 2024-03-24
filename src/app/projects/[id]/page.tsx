'use client';
import Navbar from '@/components/Navbar';
import SideBar from '@/components/SideBar';
import { ScrollArea } from '@/components/ui/scroll-area';

import EditProject from './EditProject';
import { useState } from 'react';
import { ToastAction } from '@/components/ui/toast';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { getCookie } from 'cookies-next';

const ProjectPage = ({ params }: { params: { id: string } }) => {
	const id = params.id;

	const [fetchedProjectData, setFetchedProjectData] = useState<Project>();
	const { toast } = useToast();

	const fetchProjectData = async () => {
		try {
			const { data } = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/projects/getSingleProject/${id}`,
				{
					headers: {
						Authorization: ` Bearer ${getCookie('accessToken')}`,
					},
					// withCredentials: true,
				}
			);

			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			const projectData: Project = data.data;

			// delete projectData.brochure;
			// delete projectData.masterPlan;
			// delete projectData.thumbnail;
			// delete projectData.coverImages;

			setFetchedProjectData(projectData);
		} catch (error) {
			console.log(error);
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong. File Not uploaded',
				description: 'There was a problem with your request.',
				action: <ToastAction altText="Try again">Try again</ToastAction>,
			});
		}
	};

	useState(() => {
		void fetchProjectData();
	});

	// console.log('fertch', fetchedProjectData);

	return (
		<main className="flex h-full w-full">
			<section className="hidden h-full w-full lg:flex lg:w-[20%]">
				<SideBar />
			</section>
			<ScrollArea className="overflow-y-none relative h-full  w-full lg:w-[80%]">
				<Navbar />
				<EditProject fetchedProjectData={fetchedProjectData} id={id} />
			</ScrollArea>
		</main>
	);
};

export default ProjectPage;
