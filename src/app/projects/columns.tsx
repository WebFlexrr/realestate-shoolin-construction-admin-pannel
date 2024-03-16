'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { type ColumnDef } from '@tanstack/react-table';

export interface Enquiry {
	id: string;
	name: string;
	status: 'pending' | 'processing' | 'success' | 'failed';
	phone: number;
	email: string;
	message: string;
}

export const EnquiryData: Enquiry[] = [
	{
		id: '65f5a437c75d3edb65830112',
		name: 'Tejodeep Mitra Roy',
		status: 'pending',
		phone: 9786128921,
		email: 'tejodep@gmail.com',
		message: 'hi hello',
	},
	{
		id: '65f5a437c75d3edb65830112',
		name: 'denodeep Mitra Roy',
		status: 'pending',
		phone: 9786228921,
		email: 'tejodep@gmail.com',
		message: 'hi hello',
	},
	{
		id: '65f5a437c75d3edb65830112',
		name: 'denodeep Mitra Roy',
		status: 'pending',
		phone: 9786228921,
		email: 'tejodep@gmail.com',
		message: 'hi hello',
	},
	{
		id: '65f5a437c75d3edb65830112',
		name: 'denodeep Mitra Roy',
		status: 'pending',
		phone: 9786228921,
		email: 'tejodep@gmail.com',
		message: 'hi hello',
	},
	{
		id: '65f5a437c75d3edb65830112',
		name: 'denodeep Mitra Roy',
		status: 'pending',
		phone: 9786228921,
		email: 'tejodep@gmail.com',
		message: 'hi hello',
	},
	{
		id: '65f5a437c75d3edb65830112',
		name: 'denodeep Mitra Roy',
		status: 'pending',
		phone: 9786228921,
		email: 'tejodep@gmail.com',
		message: 'hi hello',
	},
	{
		id: '65f5a437c75d3edb65830112',
		name: 'denodeep Mitra Roy',
		status: 'pending',
		phone: 9786228921,
		email: 'tejodep@gmail.com',
		message: 'hi hello',
	},
	{
		id: '65f5a437c75d3edb65830112',
		name: 'denodeep Mitra Roy',
		status: 'pending',
		phone: 9786228921,
		email: 'tejodep@gmail.com',
		message: 'hi hello',
	},
	{
		id: '65f5a437c75d3edb65830112',
		name: 'denodeep Mitra Roy',
		status: 'pending',
		phone: 9786228921,
		email: 'tejodep@gmail.com',
		message: 'hi hello',
	},
	{
		id: '65f5a437c75d3edb65830112',
		name: 'denodeep Mitra Roy',
		status: 'pending',
		phone: 9786228921,
		email: 'tejodep@gmail.com',
		message: 'hi hello',
	},
	{
		id: '65f5a437c75d3edb65830112',
		name: 'denodeep Mitra Roy',
		status: 'pending',
		phone: 9786228921,
		email: 'tejodep@gmail.com',
		message: 'hi hello',
	},
	{
		id: '65f5a437c75d3edb65830112',
		name: 'denodeep Mitra Roy',
		status: 'pending',
		phone: 9786228921,
		email: 'tejodep@gmail.com',
		message: 'hi hello',
	},
	{
		id: '65f5a437c75d3edb65830112',
		name: 'denodeep Mitra Roy',
		status: 'pending',
		phone: 9786228921,
		email: 'tejodep@gmail.com',
		message: 'hi hello',
	},
	{
		id: '65f5a437c75d3edb65830112',
		name: 'denodeep Mitra Roy',
		status: 'pending',
		phone: 9786228921,
		email: 'tejodep@gmail.com',
		message: 'hi hello',
	},
	{
		id: '65f5a437c75d3edb65830112',
		name: 'denodeep Mitra Roy',
		status: 'pending',
		phone: 9786228921,
		email: 'tejodep@gmail.com',
		message: 'hi hello',
	},
	{
		id: '65f5a437c75d3edb65830112',
		name: 'denodeep Mitra Roy',
		status: 'pending',
		phone: 9786228921,
		email: 'tejodep@gmail.com',
		message: 'hi hello',
	},
	{
		id: '65f5a437c75d3edb65830112',
		name: 'denodeep Mitra Roy',
		status: 'pending',
		phone: 9786228921,
		email: 'tejodep@gmail.com',
		message: 'hi hello',
	},
	{
		id: '65f5a437c75d3edb65830112',
		name: 'denodeep Mitra Roy',
		status: 'pending',
		phone: 9786228921,
		email: 'tejodep@gmail.com',
		message: 'hi hello',
	},
	{
		id: '65f5a437c75d3edb65830112',
		name: 'denodeep Mitra Roy',
		status: 'pending',
		phone: 9786228921,
		email: 'tejodep@gmail.com',
		message: 'hi hello',
	},
	{
		id: '65f5a437c75d3edb65830112',
		name: 'denodeep Mitra Roy',
		status: 'pending',
		phone: 9786228921,
		email: 'tejodep@gmail.com',
		message: 'hi hello',
	},
];

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
	{
		accessorKey: 'status',
		header: 'Status',
	},
	{
		accessorKey: 'message',
		header: 'Message',
	},
];
