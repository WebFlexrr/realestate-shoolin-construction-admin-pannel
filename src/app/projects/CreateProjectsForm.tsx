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
import { amenities, apartmentTypes, type form, formSchema } from './formSchema';
import {
	uploadMultipleFileToS3,
	uploadSingleFileToS3,
} from '@/utils/file-upload';
import { toast } from 'react-toastify';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { useCreateNewProjectMutation } from '@/lib/redux/api/apiProjectSlice';

interface CreateProjectsFormProps {
	setCreate: Dispatch<SetStateAction<boolean>>;
}

const CreateProjectsForm: FC<CreateProjectsFormProps> = ({ setCreate }) => {
	const [createNewProject, isLoading] = useCreateNewProjectMutation();
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
			floorNo: '',
			image: undefined,
			coveredArea: '',
			stairArea: '',
			builtUpArea: '',
			serviceArea: '',
			totalArea: '',
			price: '',
		});
	};

	const handleRemove = (index: number) => {
		remove(index);
	};

	const onSubmit = async (values: form) => {
		// console.log('Cover Images', values.coverImages);
		console.log('get value', values);

		// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
		try {
			const brochureUrlData = await uploadSingleFileToS3(values.brochure);
			const masterPlanUrlData = await uploadSingleFileToS3(values.masterPlan);
			const thumbnailUrlData = await uploadSingleFileToS3(values.thumbnail);

			const coverImages = await uploadMultipleFileToS3(values.coverImages);

			const preSignedUrlInUnits = [];

			for (const unit of values.unitPlan) {
				const preSignedUrl = await uploadSingleFileToS3(unit.image);

				preSignedUrlInUnits.push({ ...unit, image: preSignedUrl });
			}

			console.log('Cover Images', coverImages);

			console.log('brochureUrlData', brochureUrlData);
			console.log('masterPlanUrlData', masterPlanUrlData);
			console.log('thumbnailUrlData', thumbnailUrlData);
			console.log(' coverImages', coverImages);

			const updatedFormData = {
				...values,
				brochure: brochureUrlData,
				masterPlan: masterPlanUrlData,
				unitPlan: preSignedUrlInUnits,
				thumbnail: thumbnailUrlData,
				coverImages: coverImages === undefined ? undefined : [...coverImages],
			};
			// 	console.log(updatedFormData);

			const response = await createNewProject(updatedFormData).unwrap();
			console.log(response);
			// 	const { data } = await axios.post(
			// 		`${process.env.NEXT_PUBLIC_API_URL}/projects/createProject`,
			// 		updatedFormData,
			// 		{
			// 			headers: {
			// 				Authorization: ` Bearer ${getCookie('accessToken')}`,
			// 			},
			// 			// withCredentials: true,
			// 		}
			// 	);

			// 	console.log('Create project Responce---------------> ', data);

			// 	// console.log(data);
			// 	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			// 	toast.success(data.message, {
			// 		position: 'top-center',
			// 		autoClose: 4000,
			// 		hideProgressBar: false,
			// 		closeOnClick: true,
			// 		pauseOnHover: false,
			// 		draggable: true,
			// 		progress: 0,
			// 		theme: 'light',
			// 		// transition: Flip,
			// 	});
			// 	// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: unknown) {
			console.log(error);
			toast.error('something error happend', {
				position: 'top-center',
				autoClose: 4000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: 0,
				theme: 'light',
				// transition: Flip,
			});
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
										<Button form="project" type="submit" disabled={!isLoading}>
											{isLoading ? (
												<span>Submit</span>
											) : (
												<svg
													aria-hidden="true"
													className="inline h-6 w-6 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
													viewBox="0 0 100 101"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
														fill="currentColor"
													/>
													<path
														d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
														fill="currentFill"
													/>
												</svg>
											)}
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
															// onChange(e.target.files);
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
							<Card className="col-span-1 lg:col-span-1">
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
											<CardContent className="grid grid-cols-1 items-center gap-3 lg:grid-cols-4">
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
																	disabled
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
																	disabled
																/>
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
												<FormField
													control={form.control}
													name={`unitPlan.${index}.sold`}
													render={({ field }) => (
														<FormItem className="flex flex-col">
															<FormLabel>is Sold</FormLabel>
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

												<Dialog>
													<DialogTrigger className="w-full">
														<Button
															variant={'outline'}
															className="w-full border border-primary"
														>
															Edit
														</Button>
													</DialogTrigger>
													<DialogContent className="">
														<DialogHeader>
															<DialogTitle>
																Are you absolutely sure?
															</DialogTitle>
															<DialogDescription>
																This action cannot be undone. This will
																permanently delete your account and remove your
																data from our servers.
															</DialogDescription>
															<section className="grid w-full grid-cols-2 gap-5">
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
																					placeholder="Enter the Image"
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
																		<FormItem className="flex flex-col">
																			<FormLabel>is Sold</FormLabel>
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
																<FormField
																	control={form.control}
																	name={`unitPlan.${index}.price`}
																	render={({ field }) => (
																		<FormItem>
																			<FormLabel>Price</FormLabel>
																			<FormControl>
																				<Input
																					placeholder="Enter Price"
																					{...field}
																				/>
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
																<DialogClose asChild>
																	<Button type="button" variant="secondary">
																		Close
																	</Button>
																</DialogClose>
															</section>
														</DialogHeader>
													</DialogContent>
												</Dialog>
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
