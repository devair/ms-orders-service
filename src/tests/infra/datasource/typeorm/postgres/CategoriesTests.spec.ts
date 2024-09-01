import { CategoriesRepositoryPostgres } from "../../../../../infra/datasource/typeorm/postgres/CategoriesRepositoryPostgres"
import { ICategoriesGateway } from "../../../../../communication/gateways/ICategoriesGateway"
import { Category } from "../../../../../core/entities/Category"
import { AppDataSource } from "../../../../../infra/datasource/typeorm"
import { CategoryEntity } from "../../../../../infra/datasource/typeorm/entities/CategoryEntity"

let categoriesRepository: ICategoriesGateway
let category: Category

describe('Category testes', () => {

    beforeAll(() => {
        categoriesRepository = new CategoriesRepositoryPostgres(AppDataSource.getRepository(CategoryEntity))
    })

    it('Should be able to create a new category', async () => {

        category = await categoriesRepository.create({ name: 'Bebida', description: 'Bebidas' })

        expect(category).toHaveProperty('id')
    })

    it('Should be able to list categories', async () => {

        const categories = await categoriesRepository.list()

        expect(categories.length).toBeGreaterThan(0)
    })

    it('Should be able to find by id', async () => {

        const categoryFound = await categoriesRepository.findById(category.id)

        expect(categoryFound).not.toBeUndefined()

    })

    it('Should be able to find by name', async () => {

        const categoryFound = await categoriesRepository.findByName(category.name)

        expect(categoryFound).not.toBeUndefined()

    })

    it('Should be able to update category name', async () => {

        const category = await categoriesRepository.create({ name: 'Suco', description: 'Sucos' })

        let categoryFound = await categoriesRepository.findById(category.id)

        categoryFound.name = 'Bebidas'

        await categoriesRepository.update(categoryFound)

        const categoryUpdated = await categoriesRepository.findById(category.id)

        expect(categoryUpdated.name).toBe(categoryFound.name)

    })

})