import Navbar from '@/components/Navbar';
import SideBar from '@/components/SideBar';
import { DataTable } from './data-table';
import { EnquiryData, columns } from './columns';

export default function Enquiry() {
	return (
		<main className="flex h-full w-full flex-col ">
			<Navbar />
			<section className="flex h-full w-full">
				<section className="h-full w-[20%]">
					<SideBar />
				</section>
				<section className="h-full w-[80%] ">
					<section className="flex h-full  w-full flex-col">
						<section className=" h-auto w-full px-10 pb-5 pt-10">
							<span className="text-3xl font-semibold">Enquiries</span>
						</section>
						<section className="mx-auto  flex h-full w-full max-w-7xl  flex-col  gap-5 ">
							<DataTable columns={columns} data={EnquiryData} />
						</section>
					</section>
				</section>
			</section>
		</main>
	);
}
