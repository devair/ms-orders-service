import { EntitySchemaColumnOptions } from "typeorm";

export const BaseColumnSchemaPart = {
    id: {
        type: Number,
        primary: true,
        generated: true,
    } as EntitySchemaColumnOptions,
    createdAt: {
        name: "created_at",
        type: "timestamp with time zone",
        createDate: true,
    } as EntitySchemaColumnOptions,
    
}