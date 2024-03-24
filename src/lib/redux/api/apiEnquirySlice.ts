// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { updateEnquiry } from '../Slices/enquiry/enquiry';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/enquiry`;

// Define a service using a base URL and expected endpoints
export const apiEnquirySlice = createApi({
	reducerPath: 'apiEnquirySlice',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		// credentials: 'include',
	}),
	endpoints: (builder) => ({
		getAllEnquiry: builder.query<Enquiry, string>({
			query: () => `/getAllEnquiry`,
			// invalidatesTags: ['Enquiry'],
			async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const response: any = await cacheDataLoaded;
				// console.log('Conseol', response.data.data);
				dispatch(updateEnquiry(response.data.data));
			},
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllEnquiryQuery } = apiEnquirySlice;
