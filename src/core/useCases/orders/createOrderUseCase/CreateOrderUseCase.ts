import { ICustomersGateway } from "../../../../communication/gateways/ICustomersGateway"
import { IOrderItemsGateway } from "../../../../communication/gateways/IOrderItemsGateway"
import { IOrdersGateway } from "../../../../communication/gateways/IOrdersGateway"
import { IProductsGateway } from "../../../../communication/gateways/IProductsGateway"
import { Order } from "../../../entities/Order"
import { InputCreateOrderDTO, OutputCreateOrderDTO } from "./ICreateOrderDTO"

class CreateOrderUseCase {

    constructor(private orderRepository: IOrdersGateway,
        private orderItemsRepository: IOrderItemsGateway,
        private customersRepository: ICustomersGateway,
        private productsRepository: IProductsGateway
    ) {

    }
    async execute({ customer, orderItems }: InputCreateOrderDTO): Promise<OutputCreateOrderDTO> {

        let customerFound

        if (customer) {
            customerFound = await this.customersRepository.findByCpf(customer.cpf)

            if (!customer) {
                throw new Error(`Customer ${customer.cpf} not found`)
            }
        }


        const order = Order.place(customerFound)
        const promiseArray = orderItems.map(async (item) => {
            const productFound = await this.productsRepository.findByCode(item.product.code)
            
            if(!productFound){
                throw new Error(`Product ${item.product.code} not found`)
            }

            order.addItem({ product: productFound, quantity: item.quantity, unitPrice: item.unitPrice })

        })

        await Promise.all(promiseArray)

        const orderCreated = await this.orderRepository.create(order)

        await this.orderItemsRepository.createAll(order.orderItems)

        return {
            id: orderCreated.id,
            status: orderCreated.status,
            amount: orderCreated.amount
        }
    }
}

export { CreateOrderUseCase }