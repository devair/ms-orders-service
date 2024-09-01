import { EntitySchemaColumnOptions } from "typeorm";
const isTest = process.env.NODE_ENV === "test"

const dateType = process.env.NODE_ENV === "test" ? 'datetime' : 'timestamp with time zone'

export const BaseColumnSchemaPart = {
    id: {
        type: Number,
        primary: true,
        generated: true,
    } as EntitySchemaColumnOptions,
    createdAt: {
        name: "created_at",
        type: dateType,
        createDate: true,
    } as EntitySchemaColumnOptions,
    
}