import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    modules: [],
    title: '',
    description: '',
    selectedModuleId: -1,
    selectedBlockId: -1,
    selectedLessonId: -1,
    showLessonConstructor: false,
    showLessonContainer: false
};

const curriculumSlice= createSlice({
    name: 'curriculum',
    initialState,
    reducers: {
        setCurriculumInfo(state, action) {
            state.title = action.payload.title
            state.description = action.payload.description
        },
        addModule(state, action) {
            state.modules.push(action.payload.module);
        },
        deleteModule(state, action) {
            state.modules = state.modules.filter((current, index) => index !== action.payload.moduleId)
        },
        addBlock(state, action) {
            state.modules[state.selectedModuleId].blocks.push(action.payload.block)
        },
        deleteBlock(state, action) {
            let {moduleId, blockId} = action.payload
            state.modules[moduleId].blocks = state.modules[moduleId].blocks.filter((current, index) => index !== blockId)
        },
        addLesson(state, action) {
            let {selectedModuleId, selectedBlockId} = state
            state.modules[selectedModuleId].blocks[selectedBlockId].lessons.push(action.payload.lesson)
        },
        deleteLesson(state, action) {
            let {moduleId, blockId, lessonId} = action.payload
            state.modules[moduleId].blocks[blockId].lessons = state.modules[moduleId].blocks[blockId].lessons.filter((current, index) => index !== lessonId)
        },
        setSelectedModuleId(state, action) {
            state.selectedModuleId = action.payload.moduleId
        },
        setSelectedBlockId(state, action) {
            state.selectedBlockId = action.payload.blockId
        },
        setSelectedLessonId(state, action) {
            state.selectedLessonId = action.payload.lessonId
        },
        setShowLessonConstructor(state, action) {
            state.showLessonConstructor = action.payload.show
        },
        setShowLessonContainer(state, action) {
            state.showLessonContainer = action.payload.show
        }
    },
});

export const {  setCurriculumInfo,
                addModule,
                addBlock,
                addLesson,
                deleteBlock,
                deleteModule,
                deleteLesson,
                setSelectedModuleId,
                setSelectedBlockId,
                setSelectedLessonId,
                setShowLessonConstructor,
                setShowLessonContainer
                } = curriculumSlice.actions;

export default curriculumSlice.reducer;