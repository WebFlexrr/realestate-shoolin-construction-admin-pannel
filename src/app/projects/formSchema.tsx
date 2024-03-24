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
	name: z.string().trim(),
	price: z.string(),
	propertyType: z.string(),
	status: z.string(),
	brochure: z
		.custom<File>((v) => v instanceof File, {
			message: 'Brochure is required',
		})
		.refine((value) => value.type === 'application/pdf', {
			message: 'You can enter only pdf.',
		}),
	apartmentType: z
		.string()
		.array()
		.refine((value) => value.some((item) => item), {
			message: 'You have to select at least one item.',
		}),
	totalUnits: z.string(),
	possessionDate: z.date({
		required_error: 'A date of birth is required.',
	}),
	totalFloors: z.string(),
	description: z.string().trim(),
	amenities: z
		.string()
		.array()
		.refine((value) => value.some((item) => item), {
			message: 'You have to select at least one item.',
		}),

	masterPlan: z.custom<File>((v) => v instanceof File, {
		message: 'Master plan is required',
	}),
	unitPlan: z
		.object({
			flatName: z.string(),
			floorNo: z.string(),
			image: z
				.custom<File>((v) => v instanceof File, {
					message: 'Master plan is required',
				})
				.optional(),
			coveredArea: z.string(),
			stairArea: z.string(),
			builtUpArea: z.string(),
			serviceArea: z.string(),
			totalArea: z.string(),
			sold: z.boolean(),
			price: z.string(),
		})
		.array()
		.optional(),
	map: z.string().url(),
	address: z.string().trim(),
	thumbnail: z.custom<File>((v) => v instanceof File, {
		message: 'thumbnail is required',
	}),
	coverImages: z
		.custom<File>((v) => v instanceof File, {
			message: 'coverImages is required',
		})
		.array(),
	isPublished: z.boolean().default(false).optional(),
});

export type form = z.infer<typeof formSchema>;
