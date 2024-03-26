'use client';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { type ColumnDef } from '@tanstack/react-table';

export const columns: Array<ColumnDef<Enquiry>> = [
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
		accessorKey: 'phone',
		header: 'Phone',
	},
	{
		accessorKey: 'email',
		header: 'Email',
	},
	// {
	// 	accessorKey: 'createdAt',
	// 	header: 'Date',
	// },
	{
		accessorKey: 'createdAt',
		header: 'Date',
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		cell: ({ row }) => new Date(row.original.createdAt).toUTCString(),
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
								Edit
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							{/* <Link href={`/projects/${row.original.slug}`}>
								<DropdownMenuItem>Edit</DropdownMenuItem>
							</Link> */}
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
