import { EntitySchema } from 'typeorm';
import { BaseColumnSchemaPart } from './BaseColumnSchemaPart ';
import { Order } from '../../../../core/entities/Order';


export const OrderEntity = new EntitySchema<Order>({
    name: 'orders',
    columns: {
        ...BaseColumnSchemaPart,
        amount: {
            type: 'decimal',
            nullable: true
        },
        status: {
            type: 'varchar',
            default: ''
        },
        customerId: {
            name: 'customer_id',
            type: 'int',
            nullable: true
        },
    },

    relations: {
        customer: {
            type: 'many-to-one',
            target: 'customers',
            onDelete: 'SET NULL',
            joinColumn: {
                name: 'customer_id'
            }
        },
        products: {
            type: 'many-to-many',            
            target: 'products',  
            cascade: true,
            joinColumn: {
                name: 'order_id'
            },                                
        }
    },
})