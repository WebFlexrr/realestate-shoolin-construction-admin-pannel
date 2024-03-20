'use client';
import Navbar from '@/components/Navbar';
import SideBar from '@/components/SideBar';
import { DataTable } from './data-table';
import { columns } from './columns';
import { ScrollArea } from '@/components/ui/scroll-area';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';

interface Enquiry {
	id: string;
	name: string;
	phone: number;
	email: string;
	message: string;
}

const EnquiryPage = () => {
	const [enquiryData, setEnquiryData] = useState<Enquiry[]>([]);
	getCookie('accessToken');
	console.log(getCookie('accessToken'));
	const fetchEnquiry = async () => {
		try {
			const { data } = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/enquiry/getAllEnquiry`,
				{
					headers: {
						Authorization: ` Bearer ${getCookie('accessToken')}`,
					},
					// withCredentials: true,
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
	}, []);

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
						<DataTable columns={columns} data={enquiryData} />
					</section>
				</section>
			</ScrollArea>
		</main>
	);
};

export default EnquiryPage;
