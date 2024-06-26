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
import React, { type FC } from 'react';
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
import { useRouter } from 'next/navigation';
import { amenities, apartmentTypes, type form, formSchema } from './formSchema';

interface CreateProjectsFormProps {
	fetchedProjectData: ProjectResponse | undefined;
	id: string;
}

const EditProject: FC<CreateProjectsFormProps> = ({
	fetchedProjectData,
	id,
}) => {
	const router = useRouter();
	console.log('fertch213131---->', fetchedProjectData);
	const form = useForm<form>({
		resolver: zodResolver(formSchema),
		values: { ...fetchedProjectData },
	});

	const { control, watch } = form;

	const {
		fields: unitPlanFields,
		append,
		remove,
	} = useFieldArray({
		name: 'unitPlan',
		control,
	});

	// const { formState } = form;

	console.log('watch', watch('thumbnail'));

	const handleAppend = () => {
		append({
			flatName: '',
			floorNo: '',
			image: undefined,
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

	const onSubmit = async (values: form) => {
		console.log('get value', values);

		// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
		// try {

		// 	const brochureUrlData: string = await uploadSingleFileToS3(
		// 		values.brochure
		// 	);
		// 	const masterPlanUrlData: string = await uploadSingleFileToS3(
		// 		values.masterPlan
		// 	);
		// 	const thumbnailUrlData: string = await uploadSingleFileToS3(
		// 		values.thumbnail
		// 	);

		// 	const coverImages = await uploadSingleFileToS3(values.coverImages[0]);

		// 	console.log('brochureUrlData', brochureUrlData);
		// 	console.log('masterPlanUrlData', masterPlanUrlData);
		// 	console.log('thumbnailUrlData', thumbnailUrlData);
		// 	console.log(' coverImages', coverImages);

		// 	const updatedFormData = {
		// 		...values,
		// 		brochure: brochureUrlData,
		// 		masterPlan: masterPlanUrlData,

		// 		thumbnail: thumbnailUrlData,
		// 		coverImages: [coverImages],
		// 	};
		// 	console.log(updatedFormData);

		// 	const { data } = await axios.post(
		// 		`${process.env.NEXT_PUBLIC_API_URL}/projects/editProject`,
		// 		{
		// 			id,
		// 			...updatedFormData,
		// 		},
		// 		{
		// 			headers: {
		// 				Authorization: ` Bearer ${getCookie('accessToken')}`,
		// 			},
		// 			// withCredentials: true,
		// 		}
		// 	);

		// 	console.log('Create project Responce---------------> ', data);

		// 	// console.log(data);
		// 	toast({
		// 		title: 'Form Successfull Uploaded',
		// 		description: 'Form Successfull Uploaded',
		// 	});
		// } catch (error) {
		// 	console.log(error);
		// 	// toast({
		// 	// 	title: 'Form Successfull Uploaded',
		// 	// 	description: 'Form Successfull Uploaded',
		// 	// });
		// }
	};

	return (
		<section className="mx-auto h-full w-full max-w-7xl flex-col px-5 py-16 ">
			<section className="h-fit w-full py-4">
				<Button
					onClick={() => {
						router.push('/projects');
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
									<span>Edit Panel</span>
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
																						? field.onChange(
																								field.value !== undefined
																									? field.value.push(item.id)
																									: undefined
																								// item.id
																							)
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
																						? field.onChange(
																								field.value !== undefined
																									? field.value.push(item.id)
																									: undefined
																								// item.id
																							)
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

export default EditProject;
