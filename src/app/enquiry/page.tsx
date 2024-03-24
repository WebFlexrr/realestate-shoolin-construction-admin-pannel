'use client';
import Navbar from '@/components/Navbar';
import SideBar from '@/components/SideBar';
import { DataTable } from './data-table';
import { columns } from './columns';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppSelector } from '@/lib/redux/hooks';
import { useGetAllEnquiryQuery } from '@/lib/redux/api/apiEnquirySlice';

const EnquiryPage = () => {
	const enquiry = useAppSelector((state) => state.enquiry.enquiry);
	useGetAllEnquiryQuery('');

	return (
		<main className="flex h-full w-full">
			<section className="hidden h-full lg:flex lg:w-[20%]">
				<SideBar />
			</section>
			<ScrollArea className="overflow-y-none h-full w-full  lg:w-[80%]  ">
				<Navbar />
				<section className="mt-16 flex h-full w-full flex-col">
					<section className=" h-auto w-full px-10 pb-5 pt-10">
						<span className="text-3xl font-semibold">Enquiries</span>
					</section>
					<section className="mx-auto  flex h-full w-full max-w-7xl  flex-col  gap-5 ">
						<DataTable columns={columns} data={enquiry} />
					</section>
				</section>
			</ScrollArea>
		</main>
	);
};

export default EnquiryPage;
