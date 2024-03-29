import { createSlice } from '@reduxjs/toolkit';

const initialState: {
	projects: ProjectResponse[];
} = { projects: [] };

const projectSlice = createSlice({
	name: 'project',
	initialState,
	reducers: {
		updateProject: (state, action) => {
			state.projects = action.payload;
		},
	},
});

export const { updateProject } = projectSlice.actions;
export default projectSlice.reducer;
