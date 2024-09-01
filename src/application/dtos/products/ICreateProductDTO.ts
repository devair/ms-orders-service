import { OutputFindCategoryDTO } from "../categories/IFindCategoryDTO"

interface InputCreateProductDTO {
    name: string
    code: string
    description: string    
    categoryId: number 
    price: number
    image: string
}

interface OutputCreateProductDTO {
    id: number
    name: string
    code: string
    description: string    
    category : OutputFindCategoryDTO
    categoryId: number 
    price: number
    image: string
}

export { InputCreateProductDTO, OutputCreateProductDTO }