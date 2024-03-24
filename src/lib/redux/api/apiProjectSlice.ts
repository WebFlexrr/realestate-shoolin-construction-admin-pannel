// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { updateProject } from '../Slices/project/projectSlice';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/project`;

// Define a service using a base URL and expected endpoints
export const apiProjectSlice = createApi({
	reducerPath: 'apiProjectSlice',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		// credentials: 'include',
	}),
	endpoints: (builder) => ({
		getAllProjects: builder.query<Enquiry, string>({
			query: () => `/getAllProjects`,
			// invalidatesTags: ['Enquiry'],
			async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const response: any = await cacheDataLoaded;
				console.log('Conseol', response.data.data);
				dispatch(updateProject(response.data.data));
			},
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllProjectsQuery } = apiProjectSlice;
