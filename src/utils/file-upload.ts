import axios from 'axios';
import { toast } from 'react-toastify';

export const uploadSingleFileToS3 = async (file: File) => {
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
		toast('🦄 Wow so easy!', {
			position: 'top-center',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
			// transition: Bounce,
		});
		return url;
	} catch (error) {
		toast('🦄 Wow so easy!', {
			position: 'top-center',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
			// transition: 'Bounce',
		});
		console.log(error);
	}
};

export const uploadMultipleFileToS3 = async (files: File[]) => {
	console.log('Files', files);

	const requests = files.map(
		async (file) =>
			await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/projects/generateUploadUrl`,
				{
					fileType: file.type,
				}
			)
	);

	axios
		.all(requests)
		.then((data) => {
			console.log(data);
		})
		.catch((error) => {
			console.log(error);
		});

	return files;
};
