import axios from 'axios';
import { toast } from 'react-toastify';

export const uploadSingleFileToS3 = async (
	file: File | undefined
): Promise<string | undefined> => {
	if (file === undefined) {
		return undefined;
	}

	console.log('file', file);

	try {
		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/projects/generateUploadUrl`,
			{
				fileType: file.type,
			}
		);

		const { uploadUrl, url }: { uploadUrl: string; url: string } = data.data;

		await axios.put(
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			uploadUrl,
			file
		);

		console.log(url);
		toast.success('Nice File Properly Uploaded', {
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
		toast.error('Not Good Error happens', {
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
		return undefined;
	}
};

export const uploadMultipleFileToS3 = async (
	fileArray: Array<File | undefined> | undefined
) => {
	if (fileArray === undefined) {
		return undefined;
	}
	console.log('Files', fileArray);

	const preSignedUrls: Array<string | undefined> = [];

	for (const image of fileArray) {
		const preSignedUrl = await uploadSingleFileToS3(image);
		preSignedUrls.push(preSignedUrl);
	}
	return preSignedUrls;
};
