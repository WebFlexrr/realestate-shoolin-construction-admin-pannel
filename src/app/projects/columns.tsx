'use client';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { type ColumnDef } from '@tanstack/react-table';
// import axios from 'axios';
// import { getCookie } from 'cookies-next';
import Link from 'next/link';

// const handleDelete = async (id: string) => {
// 	try {
// 		const { data } = await axios.delete(
// 			`${process.env.NEXT_PUBLIC_API_URL}/projects/deleteSingleProject`,
// 			{

// 				id,
// 			}

// 		);
// 		console.log(data);
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

export const projectColumns: Array<ColumnDef<Project>> = [
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

	// {
	// 	accessorKey: 'tags',
	// 	header: 'Tags',
	// },
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
								Open
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<Link href={`/projects/${row.original._id}`}>
								<DropdownMenuItem>Edit</DropdownMenuItem>
							</Link>
							{/* <DropdownMenuItem
								onClick={() => {
									// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
									void handleDelete(row.original._id!);
									window.location.reload();
								}}
							>
								Delete
							</DropdownMenuItem> */}
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
