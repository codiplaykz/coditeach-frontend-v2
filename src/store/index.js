import {configureStore} from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import projectReducer from './slices/projectSlice'
import curriculumReducer from './slices/curriculumSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        project: projectReducer,
        curriculum: curriculumReducer,
    }
})