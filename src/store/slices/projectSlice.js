import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    projectName: '',
    projectType: '',
    projectLevel: '',
};

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProject(state, action) {
            state.projectName = action.payload.projectName;
            state.projectType = action.payload.projectType;
            state.projectLevel = action.payload.projectLevel;
        },
        removeProject(state) {
            state.projectName = null;
            state.projectType = null;
            state.projectLevel = null;
        }
    },
});

export const {setProject, removeProject} = projectSlice.actions;

export default projectSlice.reducer;