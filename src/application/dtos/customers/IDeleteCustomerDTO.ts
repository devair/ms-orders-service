interface InputCustomerDeleteDTO {
    name: string,
    address: string,
    phone: string
}

interface OutputCustomerDeleteDTO {
    id: number
    name: string,
    address: string,
    phone: string
}

export {  InputCustomerDeleteDTO, OutputCustomerDeleteDTO }