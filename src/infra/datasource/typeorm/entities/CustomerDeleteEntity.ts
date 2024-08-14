import { EntitySchema } from "typeorm";
import { BaseColumnSchemaPart } from "./BaseColumnSchemaPart ";
import { Customer } from "../../../../core/entities/Customer";
import { CustomerDelete } from "../../../../core/entities/CustomerDelete"


export const CustomerDeleteEntity = new EntitySchema<CustomerDelete>({
    name: "customers_delete",
    columns: {
        ...BaseColumnSchemaPart,
        name: {
            type: 'varchar',
        },    
        address: {
            type: 'varchar',
        },       
        phone: {
            type: 'varchar',            
        }               
    },

})