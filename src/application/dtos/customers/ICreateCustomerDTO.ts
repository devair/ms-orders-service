interface InputCreateCustomerDTO {
    name: string
    cpf: string
    email: string
    phone: string
}

interface OutputCreateCustomerDTO {
    id: number
    name: string
    cpf: string
    email: string
    phone: string
}

export { InputCreateCustomerDTO, OutputCreateCustomerDTO }