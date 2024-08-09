import { OutputFindCategoryDTO } from "../../../dtos/categories/IFindCategoryDTO"

interface OutputFindProductDTO {
    id: number
    name: string
    code: string
    description: string    
    category? : OutputFindCategoryDTO
    categoryId?: number
    price: number
    image: string
}

export { OutputFindProductDTO  }