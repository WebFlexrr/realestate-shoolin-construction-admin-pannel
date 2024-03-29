'use client';
import Navbar from '@/components/Navbar';
import SideBar from '@/components/SideBar';
import { ScrollArea } from '@/components/ui/scroll-area';
import EditProject from './EditProject';
import { useGetSingleProjectQuery } from '@/lib/redux/api/apiProjectSlice';

export type EditedProjectResponse = Omit<
	ProjectResponse,
	'brochure' | 'masterPlan' | 'thumbnail' | 'coverImages'
>;
const ProjectPage = ({ params }: { params: { id: string } }) => {
	const id = params.id;

	const { data: projectData } = useGetSingleProjectQuery(id);
	// let editedProjectData: EditedProjectResponse
	// if (projectData !== undefined) {
	// 	editedProjectData = projectData;
	// }

	return (
		<main className="flex h-full w-full">
			<section className="hidden h-full w-full lg:flex lg:w-[20%]">
				<SideBar />
			</section>
			<ScrollArea className="overflow-y-none relative h-full  w-full lg:w-[80%]">
				<Navbar />
				<EditProject fetchedProjectData={projectData} id={id} />
			</ScrollArea>
		</main>
	);
};

export default ProjectPage;
