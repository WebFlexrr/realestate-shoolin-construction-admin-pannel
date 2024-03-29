import { z } from 'zod';

export const amenities = [
	{
		id: 'elevator',
		label: 'Elevator',
	},
	{
		id: 'security-camera',
		label: 'Security Camera',
	},
	{
		id: '24/7-power-backup',
		label: '24/7 Power Backup',
	},
	{
		id: '24/7-water-supply',
		label: '24/7 Water Supply',
	},
	{
		id: 'garden',
		label: 'Garden',
	},
	{
		id: 'swimming-pool',
		label: 'Swimming Pool',
	},
] as const;

export const apartmentTypes = [
	{
		id: '1',
		label: '1 BHK',
	},
	{
		id: '2',
		label: '2 BHK',
	},
	{
		id: '3',
		label: '3BHK',
	},
	{
		id: '4',
		label: '4BHK',
	},
	{
		id: '5',
		label: '5BHK',
	},
] as const;

export const formSchema = z.object({
	name: z.string().trim().optional(),
	price: z.string().optional(),
	propertyType: z.string().optional(),
	status: z.string().optional(),
	brochure: z
		.custom<File>((v) => v instanceof File, {
			message: 'Brochure is required',
		})
		.refine((value) => value.type === 'application/pdf', {
			message: 'You can enter only pdf.',
		})
		.optional(),
	apartmentType: z
		.string()
		.array()
		.refine((value) => value.some((item) => item), {
			message: 'You have to select at least one item.',
		})
		.optional(),
	totalUnits: z.string().optional(),
	possessionDate: z
		.date({
			required_error: 'A date of birth is required.',
		})
		.optional(),
	totalFloors: z.string().optional(),
	description: z.string().trim().optional(),
	amenities: z
		.string()
		.array()
		.refine((value) => value.some((item) => item), {
			message: 'You have to select at least one item.',
		})
		.optional(),

	masterPlan: z
		.custom<File>((v) => v instanceof File, {
			message: 'Master plan is required',
		})
		.optional(),
	unitPlan: z
		.object({
			flatName: z.string(),
			floorNo: z.string(),
			image: z
				.custom<File>((v) => v instanceof File, {
					message: 'Unit plan Image is required',
				})
				.optional(),
			coveredArea: z.string().optional(),
			stairArea: z.string().optional(),
			builtUpArea: z.string().optional(),
			serviceArea: z.string().optional(),
			totalArea: z.string().optional(),
			sold: z.boolean().optional(),
			price: z.string(),
		})
		.array()
		.optional(),
	map: z.string().url().optional(),
	address: z.string().trim().optional(),
	thumbnail: z
		.custom<File>((v) => v instanceof File, {
			message: 'thumbnail is required',
		})
		.optional(),
	coverImages: z
		.custom<File>((v) => v instanceof File, {
			message: 'coverImages is required',
		})
		.optional()
		.array()
		.optional(),
	isPublished: z.boolean().default(false).optional(),
});

export type form = z.infer<typeof formSchema>;
