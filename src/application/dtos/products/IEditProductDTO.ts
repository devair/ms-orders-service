
interface InputUpdateProductDTO {   
    id: number
    name: string
    code: string
    description: string    
    categoryId: number 
    price: number
    image: string
}

interface OutputUpdateProductDTO {
    id: number    
    name: string
    code: string
    description: string    
    categoryId: number 
    price: number
    image: string
}

export { InputUpdateProductDTO,OutputUpdateProductDTO }