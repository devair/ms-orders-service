interface InputUpdateCategoryDTO {   
    id: number 
    name?: string;
    description?: string;
}

interface OutputUpdateCategoryDTO {   
    id: number 
    name: string;
    description?: string;
}

export { InputUpdateCategoryDTO, OutputUpdateCategoryDTO }