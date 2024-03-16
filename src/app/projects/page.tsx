import Navbar from '@/components/Navbar';
import SideBar from '@/components/SideBar';

export default function Enquiry() {
	return (
		<main className="flex h-full w-full">
			<section className="h-full w-[20%]">
				<SideBar />
			</section>
			<section className="overflow-y-none relative h-full w-[80%] border border-black">
				<Navbar />
				<section className="flex h-full w-full flex-col border border-primary"></section>
				{/* <section className="flex h-full  w-full flex-col ">
					<section className=" h-auto w-full px-10 pb-5 pt-10">
						<span className="text-3xl font-semibold">Enquiries</span>
					</section>
					<section className="mx-auto  flex h-full w-full max-w-7xl  flex-col  gap-5 ">
						<DataTable columns={columns} data={EnquiryData} />
					</section>
				</section> */}
			</section>
		</main>
	);
}
