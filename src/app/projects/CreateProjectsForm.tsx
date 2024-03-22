'use client';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
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
import { useFieldArray, useForm } from 'react-hook-form';
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { getCookie } from 'cookies-next';

const amenities = [
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

const apartmentTypes = [
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

const formSchema = z.object({
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

type form = z.infer<typeof formSchema>;

interface CreateProjectsFormProps {
	setCreate: Dispatch<SetStateAction<boolean>>;
}

const CreateProjectsForm: FC<CreateProjectsFormProps> = ({ setCreate }) => {
	const { toast } = useToast();
	const form = useForm<form>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			price: '',
			propertyType: 'residential',
			status: 'not-started',
			apartmentType: [],
			totalUnits: '',
			possessionDate: new Date(),
			totalFloors: '',
			description: '',
			amenities: [],
			// unitPlan: [
			// 	{
			// 		flatName: '',
			// 		floorNo: '1',
			// 		coveredArea: '',
			// 		stairArea: '',
			// 		builtUpArea: '',
			// 		serviceArea: '',
			// 		totalArea: '',
			// 		sold: false,
			// 		price: '',
			// 	},
			// ],
			map: '',
			address: '',
			isPublished: false,
		},
	});

	const { control } = form;

	const {
		fields: unitPlanFields,
		append,
		remove,
	} = useFieldArray({
		name: 'unitPlan',
		control,
	});

	const { formState } = form;

	console.log(formState);

	const handleAppend = () => {
		append({
			flatName: '',
			floorNo: '1',
			coveredArea: '',
			stairArea: '',
			builtUpArea: '',
			serviceArea: '',
			totalArea: '',
			sold: false,
			price: '',
		});
	};

	const handleRemove = (index: number) => {
		remove(index);
	};

	const uploadSingleFileToS3 = async (file: File) => {
		console.log('file', file);

		try {
			const { data } = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/projects/generateUploadUrl`,
				{
					fileType: file.type,
				}
			);

			const { uploadUrl, url, key } = data.data;

			await axios.put(
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				uploadUrl,
				file
			);

			console.log(url);
			console.log(key);
			toast({
				title: 'File Uploaded',
				description: 'There was a problem with your request.',
				action: <ToastAction altText="Try again">Try again</ToastAction>,
			});
			return url;
		} catch (error) {
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong. File Not uploaded',
				description: 'There was a problem with your request.',
				action: <ToastAction altText="Try again">Try again</ToastAction>,
			});

			console.log(error);
		}
	};

	// const uploadMultipleFileToS3 = async (files: File[]) => {
	// 	console.log('Files', files);

	// 	const requests = files.map(async (file) =>
	// 		await axios.post(
	// 			`${process.env.NEXT_PUBLIC_API_URL}/projects/generateUploadUrl`,
	// 			{
	// 				fileType: file.type,
	// 			}
	// 		)
	// 	);

	// 	axios
	// 		.all(requests)
	// 		.then((data) => console.log(data))
	// 		.catch((error) => console.log(error));

	// 	return files;
	// };

	const onSubmit = async (values: form) => {
		// console.log('get value', values);

		// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
		try {
			const brochureUrlData: string = await uploadSingleFileToS3(
				values.brochure
			);
			const masterPlanUrlData: string = await uploadSingleFileToS3(
				values.masterPlan
			);
			const thumbnailUrlData: string = await uploadSingleFileToS3(
				values.thumbnail
			);

			const coverImages = await uploadSingleFileToS3(values.coverImages[0]);

			console.log('brochureUrlData', brochureUrlData);
			console.log('masterPlanUrlData', masterPlanUrlData);
			console.log('thumbnailUrlData', thumbnailUrlData);
			console.log(' coverImages', coverImages);

			const updatedFormData = {
				...values,
				brochure: brochureUrlData,
				masterPlan: masterPlanUrlData,

				thumbnail: thumbnailUrlData,
				coverImages: [coverImages],
			};
			console.log(updatedFormData);

			const { data } = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/projects/createProject`,
				updatedFormData,
				{
					headers: {
						Authorization: ` Bearer ${getCookie('accessToken')}`,
					},
					// withCredentials: true,
				}
			);

			console.log('Create project Responce---------------> ', data);

			// console.log(data);
			toast({
				title: 'Form Successfull Uploaded',
				description: 'Form Successfull Uploaded',
			});
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.log(error);
			toast({
				variant: 'destructive',
				title: 'Error happened',
				description: error.response.message,
			});
			// toast({
			// 	title: 'Form Successfull Uploaded',
			// 	description: 'Form Successfull Uploaded',
			// });
		}
	};

	return (
		<section className="mx-auto h-full w-full max-w-7xl flex-col  py-16 ">
			<section className="h-fit w-full px-5 py-4">
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
					<form onSubmit={form.handleSubmit(onSubmit)} id="project">
						<CardHeader className="w-full ">
							<CardTitle className="flex w-full justify-between">
								<section className="flex w-full flex-col justify-between  lg:flex-row lg:items-center ">
									<span>Create a new Project</span>
									<section className="flex flex-col gap-5 lg:flex-row ">
										<FormField
											control={form.control}
											name="isPublished"
											render={({ field }) => (
												<FormItem className="flex  items-center gap-3">
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
										<Button form="project" type="submit">
											Submit
										</Button>
									</section>
								</section>
							</CardTitle>
						</CardHeader>
						<CardContent className="grid grid-cols-1 gap-7 lg:grid-cols-2">
							<Card className="col-span-1">
								<CardHeader>
									<CardTitle>Project Information</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Project Name</FormLabel>
												<FormControl>
													<Input placeholder="Enter Project Name" {...field} />
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
										name="propertyType"
										render={({ field }) => (
											<FormItem>
												<FormLabel>propertyType</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select the Property Type" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value="residential">
															Residential
														</SelectItem>
														<SelectItem value="commercial">
															Commercial
														</SelectItem>
														<SelectItem value="residential-&-commercial">
															Residential & Commercial
														</SelectItem>
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="status"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Status</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select the Status of the Project" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value="completed">Completed</SelectItem>
														<SelectItem value="under-construction">
															Under-Construction
														</SelectItem>
														<SelectItem value="not-started">
															Not started
														</SelectItem>
													</SelectContent>
												</Select>
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
														placeholder="Enter the Brochure"
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

									<FormField
										control={form.control}
										name="apartmentType"
										render={() => (
											<FormItem>
												<div className="mb-4">
													<FormLabel className="text-base">
														Apartment Type
													</FormLabel>
													<FormDescription>
														Select the items you want to display in the sidebar.
													</FormDescription>
												</div>
												<section className="grid grid-cols-2 gap-4">
													{apartmentTypes.map((item) => (
														<FormField
															key={item.id}
															control={form.control}
															name="apartmentType"
															render={({ field }) => {
																return (
																	<FormItem
																		key={item.id}
																		className="flex flex-row items-start space-x-3 space-y-0"
																	>
																		<FormControl>
																			<Checkbox
																				checked={field.value?.includes(item.id)}
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
													<PopoverContent className="w-auto p-0" align="start">
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
													<Input placeholder="Enter Total Floors" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>
							<Card className="col-span-1">
								<CardHeader>
									<CardTitle>Project Contents</CardTitle>
									<CardDescription>
										this is a initial Information
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
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
													<FormLabel className="text-base">Amenities</FormLabel>
													<FormDescription>
														Select the minimum one items.
													</FormDescription>
												</div>
												<section className="grid grid-cols-2 gap-4">
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
																				checked={field.value?.includes(item.id)}
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
							</Card>
							<Card className="col-span-1 lg:col-span-2">
								<CardHeader>
									<CardTitle>Image Upload</CardTitle>
								</CardHeader>
								<CardContent className="grid grid-cols-1 gap-7 lg:grid-cols-2">
									<FormField
										control={form.control}
										name="thumbnail"
										render={({ field: { ref, name, onBlur, onChange } }) => (
											<FormItem>
												<FormLabel>Thumbnail</FormLabel>
												<FormControl>
													<Input
														type="file"
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
									<FormField
										control={form.control}
										name="coverImages"
										render={({ field: { ref, name, onBlur, onChange } }) => (
											<FormItem>
												<FormLabel>Cover Images</FormLabel>
												<FormControl>
													<Input
														type="file"
														ref={ref}
														name={name}
														onBlur={onBlur}
														onChange={(e) => {
															// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
															onChange(Object.values(e.target.files!));
														}}
														placeholder="Master Plan"
														multiple
														// {...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>
							<Card className="col-span-1 lg:col-span-2">
								<CardHeader className="w-full ">
									<CardTitle className="flex w-full justify-between">
										<section className="flex w-full items-center justify-between ">
											<span>Unit Plan</span>
											<Button
												onClick={() => {
													handleAppend();
												}}
											>
												Create
											</Button>
										</section>
									</CardTitle>
								</CardHeader>
								<CardContent className=" space-y-4">
									{unitPlanFields.map((field, index) => (
										<Card key={field.id}>
											<CardHeader>
												<CardTitle>Item no {index + 1}</CardTitle>
											</CardHeader>
											<CardContent className="grid grid-cols-1 gap-3 p-5 lg:grid-cols-8">
												<FormField
													control={form.control}
													name={`unitPlan.${index}.flatName`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>Flat Name</FormLabel>
															<FormControl>
																<Input
																	placeholder="Enter the floor name"
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name={`unitPlan.${index}.floorNo`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>floor number</FormLabel>
															<FormControl>
																<Input
																	placeholder="Enter the floor number"
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name={`unitPlan.${index}.image`}
													render={({
														field: { ref, name, onBlur, onChange },
													}) => (
														<FormItem>
															<FormLabel>Image</FormLabel>
															<FormControl>
																<Input
																	type="file"
																	placeholder="Enter the Brochure"
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

												<FormField
													control={form.control}
													name={`unitPlan.${index}.coveredArea`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>Covered Area</FormLabel>
															<FormControl>
																<Input
																	placeholder="Enter the Covered Area"
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name={`unitPlan.${index}.stairArea`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>Stair Area</FormLabel>
															<FormControl>
																<Input
																	placeholder="Enter the Stair Area"
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name={`unitPlan.${index}.builtUpArea`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>Built Up Area</FormLabel>
															<FormControl>
																<Input
																	placeholder="Enter the Built Up Area"
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name={`unitPlan.${index}.serviceArea`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>Service Area</FormLabel>
															<FormControl>
																<Input
																	placeholder="Enter the Service Area"
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name={`unitPlan.${index}.totalArea`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>Total Area</FormLabel>
															<FormControl>
																<Input
																	placeholder="Enter Total Area"
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name={`unitPlan.${index}.sold`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>is Sold</FormLabel>
															<FormControl>
																<Switch
																	checked={field.value}
																	onCheckedChange={field.onChange}
																/>
																{/* <Select
																	onValueChange={field.onChange}
																	defaultValue={field.value}
																>
																	<FormControl>
																		<SelectTrigger>
																			<SelectValue placeholder="Select the Status of the Project" />
																		</SelectTrigger>
																	</FormControl>
																	<SelectContent>
																		<SelectItem value={'false'}>
																			False
																		</SelectItem>
																		<SelectItem value={'true'}>true</SelectItem>
																	</SelectContent>
																</Select> */}
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name={`unitPlan.${index}.price`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>Price</FormLabel>
															<FormControl>
																<Input placeholder="Enter Price" {...field} />
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<Button
													onClick={() => {
														handleRemove(index);
													}}
												>
													remove
												</Button>
											</CardContent>
										</Card>
									))}
								</CardContent>
							</Card>
						</CardContent>
						<CardFooter></CardFooter>
					</form>
				</Form>
			</Card>
		</section>
	);
};

export default CreateProjectsForm;
