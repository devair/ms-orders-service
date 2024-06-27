import { EntitySchema } from "typeorm";
import { Category } from "../../../../core/entities/Category";
import { BaseColumnSchemaPart } from "./BaseColumnSchemaPart ";


export const CategoryEntity = new EntitySchema<Category>({
    name: "categories",
    columns: {
        ...BaseColumnSchemaPart,
        name: {
            type: 'varchar',
            unique: true
        },
        description: {
            type: 'varchar',
        }
    },    
})