import { EntitySchema } from 'typeorm';
import { BaseColumnSchemaPart } from './BaseColumnSchemaPart ';
import { OrderItem } from '../../../../core/entities/OrderItem';


export const OrderItemEntity = new EntitySchema<OrderItem>({
    name: 'order_items',
    columns: {
        ...BaseColumnSchemaPart,
        orderId: {
            name: 'order_id',
            type: 'int',                                    
        },
        productId: {
            name: 'product_id',
            type: 'int'
        },
        quantity: {
            type: 'int',
            default: 0
        },
        unitPrice: {
            name: 'unit_price',
            type: 'decimal',
            default: 0
        },

    },

    relations: {
        order: {
            type: 'many-to-one',
            target: 'orders',   
            joinColumn: {
                name: 'order_id'
            }
        },
        product: {
            type: 'many-to-one',
            target: 'products',            
            joinColumn: {
                name: 'product_id'
            }
        }
    },
})