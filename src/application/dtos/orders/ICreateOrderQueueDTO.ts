interface OutputOrderQueueDTO {
    orderId: number
    customerName: string
    status: string
    amount: number
    items?: OutputOrderItemQueueDTO[]
}

interface OutputOrderItemQueueDTO {
    productName: string
    productCode: string
    quantity: number        
}

export { OutputOrderQueueDTO, OutputOrderItemQueueDTO}