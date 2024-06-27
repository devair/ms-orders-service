import { Order } from './Order';

class Customer {

    id: number
    name: string
    cpf: string
    email?: string
    phone?: string
    orders: Order[]
    createdAt: Date
}

export { Customer }