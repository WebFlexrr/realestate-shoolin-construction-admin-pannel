// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { updateProject } from '../Slices/project/projectSlice';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/projects`;

// Define a service using a base URL and expected endpoints
export const apiProjectSlice = createApi({
	reducerPath: 'apiProjectSlice',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		// credentials: 'include',
	}),
	tagTypes: ['Project'],
	endpoints: (builder) => ({
		getAllProjects: builder.query<Project[] | undefined, string>({
			query: () => `/getAllProjects`,

			async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const response: any = await cacheDataLoaded;
				dispatch(updateProject(response.data.data));
			},
		}),
		getSingleProject: builder.query<Project, string>({
			query: (slug) => `/getSingleProject/${slug}`,

			async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const response: any = await cacheDataLoaded;
				console.log('Conseol', response.data.data);
				// dispatch(updateProject(response.data.data));
			},
		}),
		deleteSingleProject: builder.mutation<Project, string>({
			query: (body) => ({
				url: `/deleteSingleProject`,
				method: 'DELETE',
				body,
			}),
			invalidatesTags: ['Project'],
			async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
				// const response: any = await cacheDataLoaded;
				// dispatch(addNewMessage(response.data));
			},
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
	useGetAllProjectsQuery,
	useGetSingleProjectQuery,
	useDeleteSingleProjectMutation,
} = apiProjectSlice;
