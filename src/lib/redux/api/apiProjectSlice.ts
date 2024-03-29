// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { updateProject } from '../Slices/project/projectSlice';
import { getCookie } from 'cookies-next';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/projects`;

// Define a service using a base URL and expected endpoints
export const apiProjectSlice = createApi({
	reducerPath: 'apiProjectSlice',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		// credentials: 'include',
		prepareHeaders: (headers) => {
			headers.set('Content-type', 'application/json');
			headers.set('Authorization', `Bearer ${getCookie('accessToken')}`);
			return headers;
		},
	}),
	tagTypes: ['Project'],
	endpoints: (builder) => ({
		getAllProjects: builder.query<ProjectResponse[] | undefined, string>({
			query: () => `/getAllProjects`,

			async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const response: any = await cacheDataLoaded;
				dispatch(updateProject(response.data.data));
			},
		}),
		getSingleProject: builder.query<ProjectResponse, string>({
			query: (slug) => `/getSingleProject/${slug}`,
			transformResponse: (response: { data: ProjectResponse }, meta, arg) => {
				const projectData = response.data;
				delete projectData.brochure;
				delete projectData.masterPlan;
				delete projectData.thumbnail;
				delete projectData.coverImages;

				console.log('Console--->', projectData);
				return projectData;
			},
			// async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
			// 	// eslint-disable-next-line @typescript-eslint/no-explicit-any
			// 	const response: any = await cacheDataLoaded;
			// 	// dispatch(updateProject(response.data.data));
			// },
		}),
		deleteSingleProject: builder.mutation<ProjectResponse, string>({
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
		createNewProject: builder.mutation<ProjectResponse, CreateProject>({
			query: (body) => ({
				url: `/createProject`,
				method: 'POST',
				body,
			}),
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
	useGetAllProjectsQuery,
	useGetSingleProjectQuery,
	useDeleteSingleProjectMutation,
	useCreateNewProjectMutation,
} = apiProjectSlice;
