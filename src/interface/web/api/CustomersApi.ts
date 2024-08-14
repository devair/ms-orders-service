import { Request, Response } from "express"
import { CreateCustomerController } from "../../../communication/controllers/customers/CreateCustomerController";
import { ListCustomersController } from "../../../communication/controllers/customers/ListCustomersController";
import { FindByIdCustomerController } from "../../../communication/controllers/customers/FindByIdCustomerController";
import { SearchCustomersController } from "../../../communication/controllers/customers/SearchCustomersController";
import { CustomerPresenter } from "../../../communication/presenters/CustomerPresenter";
import { DataSource } from "typeorm"
import { CreateCustomerUseCase } from "../../../application/useCases/customers/CreateCustomerUseCase"
import { ListCustomersUseCase } from "../../../application/useCases/customers/ListCustomersUseCase"
import { FindByIdCustomerUseCase } from "../../../application/useCases/customers/FindByIdCustomerUseCase"
import { FindByCpfCustomerUseCase } from "../../../application/useCases/customers/FindByCpfCustomerUseCase"
import { FindByNameCustomerUseCase } from "../../../application/useCases/customers/FindByNameCustomerUseCase"

class CustomersApi {

    constructor(
        private readonly dataSource: DataSource
    ) { }

    async create(request: Request, response: Response): Promise<Response> {
        const { name, email, cpf, phone }= request.body;
        
        const createCustomerUseCase = new CreateCustomerUseCase(this.dataSource)
        const createCustomerController = new CreateCustomerController(createCustomerUseCase)

        try {
            const data = await createCustomerController.handler({ name, email, cpf, phone });
            response.contentType('application/json')            
            return response.status(201).send(CustomerPresenter.toJson(data))
        }
        catch (ex) {
            return response.status(400).json({ message: ex.message });
        }        
    }

    async list(request: Request, response: Response): Promise<Response> {

        const listCustomersUseCase = new ListCustomersUseCase(this.dataSource)
        const listCustomersController = new ListCustomersController(listCustomersUseCase)
        
        try{
            const data = await listCustomersController.handler()
            response.contentType('application/json')
            return response.status(200).send(CustomerPresenter.toJson(data))

        } catch (ex) {
            return response.status(400).json({ message: ex.message });
        }        
    }

    async findById(request: Request, response: Response): Promise<Response>{
        
        const { id } = request.params

        const findByIdCustomerUseCase = new FindByIdCustomerUseCase(this.dataSource)        
        const findByIdCustomersController = new FindByIdCustomerController(findByIdCustomerUseCase)

        try{
            const data = await findByIdCustomersController.handler( parseInt(id) )
            response.contentType('application/json')
            return response.status(200).send(CustomerPresenter.toJson(data))
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }
    }

    async search (request: Request, response: Response): Promise<Response>{
        
        const { cpf, name }  = request.query as { [key: string]: string}
        
        const findByCpfCustomerUseCase = new FindByCpfCustomerUseCase(this.dataSource)
        const findByNameCustomerUseCase = new FindByNameCustomerUseCase(this.dataSource)
        const searchCustomersController = new SearchCustomersController(findByCpfCustomerUseCase,findByNameCustomerUseCase)

        try{
            const data = await searchCustomersController.handler(cpf, name)
            response.contentType('application/json')
            return response.status(200).send(CustomerPresenter.toJson(data))
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }        
    }
}

export { CustomersApi }