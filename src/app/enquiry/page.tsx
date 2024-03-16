import Navbar from '@/components/Navbar';
import SideBar from '@/components/SideBar';
import { DataTable } from './data-table';
import { EnquiryData, columns } from './columns';
import { ScrollArea } from '@/components/ui/scroll-area';

const EnquiryPage = async () => {
	try {
		const allEnquiry = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/enquiry/getAllEnquiry`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json', // Set content type to JSON
				},
			}
		);

		console.log(allEnquiry);
	} catch (error) {
		console.log(error);
	}

	return (
		<main className="flex h-full w-full">
			<section className="h-full w-[20%]">
				<SideBar />
			</section>
			<ScrollArea className="overflow-y-none h-full w-[80%]  ">
				<Navbar />
				<section className="mt-16 flex h-full w-full flex-col">
					<section className=" h-auto w-full px-10 pb-5 pt-10">
						<span className="text-3xl font-semibold">Enquiries</span>
					</section>
					<section className="mx-auto  flex h-full w-full max-w-7xl  flex-col  gap-5 ">
						<DataTable columns={columns} data={EnquiryData} />
					</section>
				</section>
			</ScrollArea>
		</main>
	);
};

export default EnquiryPage;
