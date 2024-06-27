import { EntitySchema } from 'typeorm';
import { Product } from '../../../../core/entities/Product';
import { BaseColumnSchemaPart } from './BaseColumnSchemaPart ';


export const ProductEntity = new EntitySchema<Product>({
    name: 'products',
    columns: {
        ...BaseColumnSchemaPart,
        code: {
            type: 'varchar',
            unique: true
        },
        name: {
            type: 'varchar',            
        },
        description: {
            type: 'varchar',
        },
        price: {
            type: 'decimal',
            default: 0
        },
        image: {
            type: 'varchar',
            nullable: true
        },
        categoryId: {
            name: 'category_id',
            type: 'int'
        }        
    },
    
    relations: {
        category: {
            type: 'many-to-one',
            target: 'categories', 
            onDelete: 'SET NULL',
            joinColumn: {
                name: 'category_id'
            }
        },

        orders: {
            type: 'many-to-many',            
            target: 'orders',            
            joinColumn: {
                name: 'product_id'
            },                                
        }
    },
})