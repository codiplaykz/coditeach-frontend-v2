import ModuleResponse from "./ModuleResponse";

export default interface CurriculumResponse{
    id: number
    name: number
    title: string
    description: string
    created_at: string
    modules: ModuleResponse[]
}
