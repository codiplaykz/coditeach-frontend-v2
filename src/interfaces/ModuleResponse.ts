import BlockResponse from "./BlockResponse";

export default interface ModuleResponse{
    id: number
    curriculum_id: number
    title: string
    description: string
    created_at: string
    blocks: BlockResponse[]
}
