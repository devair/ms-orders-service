interface InputCreateCategoryDTO {
    name: string
    description: string
}

interface OutputCreateCategoryDTO {
    id: number
    name: string
    description: string
}

export { InputCreateCategoryDTO, OutputCreateCategoryDTO }