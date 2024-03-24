'use client';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { toast } from 'react-toastify';

const formSchema = z.object({
	email: z
		.string({
			required_error: 'First name is required',
			invalid_type_error: 'First name must be string',
		})
		.email(),

	password: z.string({
		required_error: 'First name is required',
		invalid_type_error: 'First name must be string',
	}),
});

type FormDataType = z.infer<typeof formSchema>;

export default function SignIn(): JSX.Element {
	const router = useRouter();
	const form = useForm<FormDataType>({
		resolver: zodResolver(formSchema),
	});

	const onSubmit = async (value: FormDataType) => {
		console.log(value);
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		try {
			const { data } = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/users/adminLogin`,
				value
			);

			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			toast.success(data.message, {
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

			setCookie('accessToken', data.data.accessToken);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			localStorage.setItem('accessToken', data?.data?.accessToken);

			// console.log(data);

			router.push('/');
		} catch (error: unknown) {
			console.log('error', error);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			toast.error('Invalid email & password credentials', {
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
		<div className="flex h-screen w-full items-center justify-center bg-slate-200">
			<Card className="w-full max-w-[400px]">
				<CardHeader>
					<Image
						src={'/logos/logo.png'}
						width={100}
						height={0}
						alt={''}
						className="my-4"
					/>
					<CardTitle>Admin Panel</CardTitle>
					<CardDescription>
						This is a Admin Panel of Shoolin Construction & Developers
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="flex w-full flex-col gap-3"
						>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="Enter your Email" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>password</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="Enter your Password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit" className="mt-2 w-full">
								SignIn
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter className="flex justify-between">
					{/* <Button variant="outline">Cancel</Button> */}
				</CardFooter>
			</Card>
		</div>
	);
}
