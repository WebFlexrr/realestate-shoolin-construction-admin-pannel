'use client';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { type ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { getCookie } from 'cookies-next';
// import axios from 'axios';
// import { getCookie } from 'cookies-next';
import Link from 'next/link';
import { toast } from 'react-toastify';

export const handleDelete = async (ids: string[]) => {
	if (ids.length === 0) {
		toast.warning('Items are not selected', {
			position: 'top-center',
			autoClose: 4000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: 0,
			theme: 'light',
		});
	}

	try {
		await axios.delete(
			`${process.env.NEXT_PUBLIC_API_URL}/projects/deleteProject`,
			{
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
				data: {
					id: [...ids],
				},
			}
		);

		toast.success('Item deleted', {
			position: 'top-center',
			autoClose: 4000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: 0,
			theme: 'light',
		});
		window.location.reload();
	} catch (error) {
		console.log(error);
		toast.error('Item not deleted', {
			position: 'top-center',
			autoClose: 4000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: 0,
			theme: 'light',
		});
	}
};

export const projectColumns: Array<ColumnDef<ProjectResponse>> = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => {
					table.toggleAllPageRowsSelected(!!value);
				}}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => {
					row.toggleSelected(!!value);
				}}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: '_id',
		header: 'Id',
	},
	{
		accessorKey: 'isPublished',
		header: 'isPublished',
	},
	{
		accessorKey: 'edit',
		header: 'Edit',
		cell: ({ row }) => {
			// console.log(row.original._id);
			return (
				// <Link href={`/projects/${row.original._id}`}>
				<>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<div className="disabled:opacity-50h-10 inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none  ">
								Menu
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<Link href={`/projects/${row.original.slug}`}>
								<DropdownMenuItem>Edit</DropdownMenuItem>
							</Link>

							<AlertDialog>
								<AlertDialogTrigger className="w-full border border-black text-start">
									Delete
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>
											Are you absolutely sure?
										</AlertDialogTitle>
										<AlertDialogDescription>
											This action cannot be undone. This will permanently delete
											your account and remove your data from our servers.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
										<AlertDialogAction
											onClick={() => {
												// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
												void handleDelete([row.original._id]);
											}}
										>
											Continue
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</DropdownMenuContent>
					</DropdownMenu>
				</>

				// </Link>
			);
		},
		enableSorting: false,
		enableHiding: false,
	},
];
