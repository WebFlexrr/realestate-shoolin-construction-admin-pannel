'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { type ColumnDef } from '@tanstack/react-table';

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

	{
		accessorKey: 'tags',
		header: 'Tags',
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
				// <Link href={`/projects/edit/${row.original._id}`}>
				<Button>Edit</Button>
				// </Link>
			);
		},
		enableSorting: false,
		enableHiding: false,
	},
];
