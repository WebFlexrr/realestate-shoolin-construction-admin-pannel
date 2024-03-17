'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { type ColumnDef } from '@tanstack/react-table';

export const projectData: Project[] = [
	{
		_id: '65f485daec3014f9d8ad5e32',
		name: 'SANCTORUM',
		price: '87 Lacs',
		tags: ['resident', 'under-construction'],
		apartmentType: ['2', '3', '4'],
		totalUnits: 177,
		possessionDate: '2025-02-03T18:30:00.000Z',
		totalFloors: '18+2',
		description:
			"Imagine a place where five elements - earth, air, water, energy and space - come to create a peaceful home just for you. That's Tattvam for you. Set in Bagmari, it's your key to live a balanced and wonderful life. Built by Isha Group,",
		amenities: [
			{
				name: 'elevators',
				type: true,
				_id: '65f485daec3014f9d8ad5e33',
			},
			{
				name: 'security Camera',
				type: false,
				_id: '65f485daec3014f9d8ad5e34',
			},
		],
		masterPlan: 'link',
		unitPlan: [
			{
				floorNo: 1,
				flatType: [
					{
						flatName: 'A',
						image: 'link',
						coveredArea: '205.924',
						stairArea: '23.38',
						builtUpArea: '229.30',
						serviceArea: '57.33',
						totalArea: '286.63',
						price: '87 Lacs',
						_id: '65f485daec3014f9d8ad5e36',
					},
					{
						flatName: 'G1',
						image: 'link',
						coveredArea: '169.09',
						stairArea: '-',
						builtUpArea: '169.09',
						serviceArea: '33.82(20%)',
						totalArea: '202.91',
						price: '87 Lacs',
						_id: '65f485daec3014f9d8ad5e37',
					},
				],
				_id: '65f485daec3014f9d8ad5e35',
			},
			{
				floorNo: 2,
				flatType: [
					{
						flatName: 'A',
						image: 'link',
						coveredArea: '205.924',
						stairArea: '23.38',
						builtUpArea: '229.30',
						serviceArea: '57.33',
						totalArea: '286.63',
						price: '87 Lacs',
						_id: '65f485daec3014f9d8ad5e39',
					},
					{
						flatName: 'B',
						image: 'link',
						coveredArea: '169.09',
						stairArea: '-',
						builtUpArea: '169.09',
						serviceArea: '33.82(20%)',
						totalArea: '202.91',
						price: '87 Lacs',
						_id: '65f485daec3014f9d8ad5e3a',
					},
				],
				_id: '65f485daec3014f9d8ad5e38',
			},
		],
		map: 'link',
		address: '1231, subhash',
		brochure: 'link',
		thumbnail: 'link',
		coverImages: ['link', 'link'],
		isPublished: true,
		constructionStatus: [],
		createdAt: '2024-03-15T17:31:06.327Z',
		updatedAt: '2024-03-15T17:31:06.327Z',
		__v: 0,
	},
];

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
	},
];
