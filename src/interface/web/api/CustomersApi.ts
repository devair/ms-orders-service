import { Request, Response } from "express"
import { CreateCustomerController } from "../../../communication/controllers/customers/CreateCustomerController";
import { CustomersRepositoryPostgres } from "../../../infra/datasource/typeorm/postgres/CustomersRepositoryPostgres";
import { ListCustomersController } from "../../../communication/controllers/customers/ListCustomersController";
import { FindByIdCustomerController } from "../../../communication/controllers/customers/FindByIdCustomerController";
import { SearchCustomersController } from "../../../communication/controllers/customers/SearchCustomersController";
import { CustomerPresenter } from "../../../communication/presenters/CustomerPresenter";

class CustomersApi {

    static async create(request: Request, response: Response): Promise<Response> {
        const { name, email, cpf, phone }= request.body;
        
        const customersRepository = new CustomersRepositoryPostgres()
        const createCustomerController = new CreateCustomerController(customersRepository)

        try {
            const data = await createCustomerController.handler({ name, email, cpf, phone });
            response.contentType('application/json')            
            return response.status(201).send(CustomerPresenter.toJson(data))
        }
        catch (ex) {
            return response.status(400).json({ message: ex.message });
        }        
    }

    static async list(request: Request, response: Response): Promise<Response> {

        const customersRepository = new CustomersRepositoryPostgres()
        const listCustomersController = new ListCustomersController(customersRepository)
        
        try{
            const data = await listCustomersController.handler()
            response.contentType('application/json')
            return response.status(200).send(CustomerPresenter.toJson(data))

        } catch (ex) {
            return response.status(400).json({ message: ex.message });
        }        
    }

    static async findById(request: Request, response: Response): Promise<Response>{
        
        const { id } = request.params

        const customersRepository = new CustomersRepositoryPostgres()
        const findByIdCustomersController = new FindByIdCustomerController(customersRepository)

        try{
            const data = await findByIdCustomersController.handler( parseInt(id) )
            response.contentType('application/json')
            return response.status(200).send(CustomerPresenter.toJson(data))
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }
    }

    static async search (request: Request, response: Response): Promise<Response>{
        
        const { cpf, name }  = request.query as { [key: string]: string}
        
        const customersRepository = new CustomersRepositoryPostgres()
        const searchCustomersController = new SearchCustomersController(customersRepository)

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