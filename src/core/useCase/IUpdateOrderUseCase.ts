import { InputUpdateOrderStatusDTO, OutputUpdateOrderStatusDTO } from "../../application/dtos/orders/IUpdateOrderStatusDTO"

interface IUpdateOrderUseCase {
    execute({ id, status }: InputUpdateOrderStatusDTO ): Promise<OutputUpdateOrderStatusDTO>
}

export { IUpdateOrderUseCase }