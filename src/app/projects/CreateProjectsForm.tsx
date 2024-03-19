'use client';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, CalendarIcon } from 'lucide-react';
import React, { type FC, type Dispatch, type SetStateAction } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';

// const amenities = [
// 	{
// 		id: 'recents',
// 		label: 'Recents',
// 	},
// 	{
// 		id: 'home',
// 		label: 'Home',
// 	},
// 	{
// 		id: 'applications',
// 		label: 'Applications',
// 	},
// 	{
// 		id: 'desktop',
// 		label: 'Desktop',
// 	},
// 	{
// 		id: 'downloads',
// 		label: 'Downloads',
// 	},
// 	{
// 		id: 'documents',
// 		label: 'Documents',
// 	},
// ] as const;

const tags = [
	{
		id: 'underConstruction',
		label: 'Under Construction',
	},
	{
		id: 'resident',
		label: 'Resident',
	},
	{
		id: 'complete',
		label: 'Complete',
	},
] as const;

const formSchema = z.object({
	name: z.string().trim(),
	price: z.string(),
	tags: z.string().array(),
	brochure: z.custom<File>((v) => v instanceof File, {
		message: 'Brochure is required',
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
			floorNo: z.number(),
			flatType: z
				.object({
					flatName: z.string(),
					image: z.string(),
					coveredArea: z.string(),
					stairArea: z.string(),
					builtUpArea: z.string(),
					serviceArea: z.string(),
					totalArea: z.string(),
					sold: z.boolean(),
					price: z.string(),
				})
				.array(),
		})
		.array(),
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

type form = z.infer<typeof formSchema>;

interface CreateProjectsFormProps {
	create: boolean;
	setCreate: Dispatch<SetStateAction<boolean>>;
}

const CreateProjectsForm: FC<CreateProjectsFormProps> = ({
	create,
	setCreate,
}) => {
	const form = useForm<form>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			price: '',
			tags: ['', ''],
			apartmentType: ['', ''],
			totalUnits: '',
			possessionDate: new Date(),
			totalFloors: '',
			description: '',
			amenities: ['', ''],
			unitPlan: [
				{
					floorNo: 0,
					flatType: [
						{
							flatName: '',
							image: '',
							coveredArea: '',
							stairArea: '',
							builtUpArea: '',
							serviceArea: '',
							totalArea: '',
							sold: false,
							price: '',
						},
					],
				},
			],
			map: '',
			address: '',
			isPublished: false,
		},
	});

	// const { control,handleSubmit } = form;

	// const {
	// 	fields,
	// } = useFieldArray({
	// 	name: 'unitPlan',
	// 	control,
	// });

	const onSubmit = async (values: form) => {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log('get value', values);
	};

	return (
		<section className="mx-auto h-full w-full max-w-7xl flex-col py-16 ">
			<section className="h-fit w-full py-4">
				<Button
					onClick={() => {
						setCreate(false);
					}}
				>
					<ArrowLeft /> Back
				</Button>
			</section>
			<Card className=" w-full rounded-lg border  bg-background  ">
				<Form {...form}>
					<form
						// action={`${process.env.NEXT_PUBLIC_API_URL}/projects/createProject`}

						// encType={'multipart/form-data'}
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<CardHeader className="w-full ">
							<CardTitle className="flex w-full justify-between">
								<section className="flex w-full items-center justify-between ">
									<span>Create a new Project</span>
									<section className="flex gap-5 ">
										<FormField
											control={form.control}
											name="isPublished"
											render={({ field }) => (
												<FormItem className="flex items-center gap-3">
													<FormLabel className="text-xl">Publish</FormLabel>
													<FormControl>
														<Switch
															checked={field.value}
															onCheckedChange={field.onChange}
														/>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>
										<Button className="text-lg" type="submit">
											Save
										</Button>
									</section>
								</section>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<section className="grid grid-cols-2 gap-7">
								<Card>
									<CardHeader>
										<CardTitle>Project Details</CardTitle>
										<CardDescription>
											this is a initial Information
										</CardDescription>
									</CardHeader>
									<CardContent className=" space-y-2">
										<FormField
											control={form.control}
											name="name"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Project Name</FormLabel>
													<FormControl>
														<Input
															placeholder="Enter Project Name"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="price"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Price</FormLabel>
													<FormControl>
														<Input placeholder="Enter the Price" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="tags"
											render={() => (
												<FormItem>
													<div className="mb-4">
														<FormLabel className="text-base">Tags</FormLabel>
														<FormDescription>
															Select the minimum one items.
														</FormDescription>
													</div>
													<section className="flex w-full gap-3">
														{tags.map((item) => (
															<FormField
																key={item.id}
																control={form.control}
																name="tags"
																render={({ field }) => {
																	return (
																		<FormItem
																			key={item.id}
																			className="flex flex-row items-start space-x-3 space-y-0"
																		>
																			<FormControl>
																				<Checkbox
																					checked={field.value?.includes(
																						item.id
																					)}
																					onCheckedChange={(checked) => {
																						checked
																							? field.onChange([
																									...field.value,
																									item.id,
																								])
																							: field.onChange(
																									field.value?.filter(
																										(value) => value !== item.id
																									)
																								);
																					}}
																				/>
																			</FormControl>
																			<FormLabel className="font-normal">
																				{item.label}
																			</FormLabel>
																		</FormItem>
																	);
																}}
															/>
														))}
													</section>

													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="brochure"
											render={({ field: { ref, name, onBlur, onChange } }) => (
												<FormItem>
													<FormLabel>Brochure</FormLabel>
													<FormControl>
														<Input
															type="file"
															placeholder="Enter the Price"
															// {...field}
															ref={ref}
															name={name}
															onBlur={onBlur}
															onChange={(e) => {
																onChange(e.target.files?.[0]);
															}}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										{/* <FormField
											control={form.control}
											name="apartmentType"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Apartment Type</FormLabel>
													<FormControl>
														<Select
															onValueChange={field.onChange}
															defaultValue={field.value}
														>
															<SelectTrigger className="w-full">
																<SelectValue placeholder="Type" />
															</SelectTrigger>
															<SelectContent className="w-full">
																<SelectItem value={'2'}>2 BHK</SelectItem>
																<SelectItem value={'3'}>3 BHK</SelectItem>
																<SelectItem value={'4'}>4BHK</SelectItem>
															</SelectContent>
														</Select>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/> */}
										<FormField
											control={form.control}
											name="totalUnits"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Total Unit</FormLabel>
													<FormControl>
														<Input placeholder="Enter Total Units" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="possessionDate"
											render={({ field }) => (
												<FormItem className="flex flex-col">
													<FormLabel>Possession Date</FormLabel>
													<Popover>
														<PopoverTrigger asChild>
															<FormControl>
																<Button
																	variant={'outline'}
																	className={cn(
																		'w-full pl-3 text-left font-normal',
																		!field.value && 'text-muted-foreground'
																	)}
																>
																	{field.value ? (
																		format(field.value, 'PPP')
																	) : (
																		<span>Pick a date</span>
																	)}
																	<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
																</Button>
															</FormControl>
														</PopoverTrigger>
														<PopoverContent
															className="w-auto p-0"
															align="start"
														>
															<Calendar
																mode="single"
																selected={field.value}
																onSelect={field.onChange}
																disabled={(date) =>
																	date > new Date() ||
																	date < new Date('1900-01-01')
																}
																initialFocus
															/>
														</PopoverContent>
													</Popover>

													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="totalFloors"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Total Floors</FormLabel>
													<FormControl>
														<Input
															placeholder="Enter Total Floors"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</CardContent>
								</Card>
								{/* <Card>
									<CardHeader>
										<CardTitle>Project Contents</CardTitle>
										<CardDescription>this is a initial Information</CardDescription>
									</CardHeader>
									<CardContent className=" space-y-4">
										<FormField
											control={form.control}
											name="description"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Description</FormLabel>
													<FormControl>
														<Textarea placeholder="Description" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="amenities"
											render={() => (
												<FormItem>
													<div className="mb-4">
														<FormLabel className="text-base">
															Amenities
														</FormLabel>
														<FormDescription>
															Select the minimum one items.
														</FormDescription>
													</div>
													<section className="grid w-full grid-cols-2 gap-3">
														{amenities.map((item) => (
															<FormField
																key={item.id}
																control={form.control}
																name="amenities"
																render={({ field }) => {
																	return (
																		<FormItem
																			key={item.id}
																			className="flex flex-row items-start space-x-3 space-y-0"
																		>
																			<FormControl>
																				<Checkbox
																					checked={field.value?.includes(
																						item.id
																					)}
																					onCheckedChange={(checked) => {
																						checked
																							? field.onChange([
																									...field.value,
																									item.id,
																								])
																							: field.onChange(
																									field.value?.filter(
																										(value) => value !== item.id
																									)
																								);
																					}}
																				/>
																			</FormControl>
																			<FormLabel className="font-normal">
																				{item.label}
																			</FormLabel>
																		</FormItem>
																	);
																}}
															/>
														))}
													</section>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="masterPlan"
											render={({ field: { ref, name, onBlur, onChange } }) => (
												<FormItem>
													<FormLabel>Master Plan</FormLabel>
													<FormControl>
														<Input
															type="file"
															ref={ref}
															name={name}
															onBlur={onBlur}
															onChange={(e) => {
																onChange(e.target.files?.[0]);
															}}
															placeholder="Master Plan"
															// {...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										
										<FormField
											control={form.control}
											name="map"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Map Link</FormLabel>
													<FormControl>
														<Input placeholder="Give the map link" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="address"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Address</FormLabel>
													<FormControl>
														<Textarea
															placeholder="Give the map link"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</CardContent>
								</Card> */}
								{/* <Card>
									<CardHeader>
										<CardTitle>Unit Plan</CardTitle>
									</CardHeader>
									<CardContent>
										<Card>
											<CardHeader>
												<CardTitle>Create</CardTitle>
											</CardHeader>
											<CardContent>
												<FormField
													control={form.control}
													name="unitPlan"
													render={({ field }) => (
														<FormItem>
															<div className="mb-4">
																<FormLabel className="text-base">
																	Floors
																</FormLabel>
																<FormDescription>
																	Select the minimum one items.
																</FormDescription>
															</div>
															<section className="grid w-full grid-cols-2 gap-3">
																{fields.map((field, index) => (
																	<FormField
																		key={field.id}
																		control={form.control}
																		name="unitPlan"
																		render={({ field }) => {
																			return (
																				<FormItem
																					key={field.id}
																					className="flex flex-row items-start space-x-3 space-y-0"
																				>
																					<FormLabel>Floor No</FormLabel>
																					<FormControl>
																						<Input
																							placeholder="shadcn"
																							{...field}
																						/>
																					</FormControl>
																					 <FormLabel className="font-normal">
																						{item.label}
																					</FormLabel> 
																				</FormItem>
																			);
																		}}
																	/>
																))}
															</section>
														</FormItem>

														// <FormItem>
														// 	<FormLabel>Description</FormLabel>
														// 	<FormControl>
														// 		<Textarea
														// 			placeholder="Description"
														// 			{...field}
														// 		/>
														// 	</FormControl>
														// 	<FormMessage />
														// </FormItem>
													)}
												/>
											</CardContent>
										</Card>
									</CardContent>
								</Card> */}
							</section>
						</CardContent>
					</form>
				</Form>
			</Card>
		</section>
	);
};

export default CreateProjectsForm;
