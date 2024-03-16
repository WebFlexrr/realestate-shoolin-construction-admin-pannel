import Navbar from '@/components/Navbar';
import SideBar from '@/components/SideBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Headset, HomeIcon, User } from 'lucide-react';

export default function Home() {
	return (
		<main className="flex h-full w-full flex-col ">
			<Navbar />
			<section className="flex h-full w-full border border-black">
				<section className="h-full w-[20%]">
					<SideBar />
				</section>
				<section className="h-full w-[80%] ">
					<section className="flex h-full  w-full flex-col">
						<section className=" h-auto w-full px-10 pb-5 pt-10">
							<span className="text-3xl font-semibold">Dashboard</span>
						</section>
						<section className="flex h-full w-full flex-col gap-10  overflow-y-auto px-10 pt-5 ">
							<section className="grid h-fit w-full grid-cols-4 gap-10">
								<Card className="h-fit w-full">
									<CardHeader>
										<CardTitle className="flex items-center gap-4 text-2xl">
											<HomeIcon />
											Property Posted
										</CardTitle>
									</CardHeader>

									<CardContent className=" ">
										<div className="flex  h-full w-full items-center justify-center text-4xl font-bold">
											50
										</div>
									</CardContent>
								</Card>

								<Card className="h-fit w-full">
									<CardHeader>
										<CardTitle className="flex items-center gap-4 text-2xl">
											<User />
											Registered Users
										</CardTitle>
									</CardHeader>

									<CardContent className=" ">
										<div className="flex  h-full w-full items-center justify-center text-4xl font-bold">
											50
										</div>
									</CardContent>
								</Card>

								<Card className="h-fit w-full">
									<CardHeader>
										<CardTitle className="flex items-center gap-4 text-2xl">
											<Headset />
											Total Enquiries
										</CardTitle>
									</CardHeader>

									<CardContent className=" ">
										<div className="flex  h-full w-full items-center justify-center text-4xl font-bold">
											20
										</div>
									</CardContent>
								</Card>
							</section>
							<section className="h-full w-full ">
								{/* <DataTable columns={columns} data={payments} /> */}
							</section>
						</section>
					</section>
				</section>
			</section>
		</main>
	);
}
