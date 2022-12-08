import LessonResponse from "./LessonResponse";

export default interface BlockResponse{
    id: number
    module_id: number
    title: string
    description: string
    created_at: string
    lessons: LessonResponse[]
}
