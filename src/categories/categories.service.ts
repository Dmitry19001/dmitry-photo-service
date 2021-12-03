import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {

    constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) {}

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = new Category();
        category.name = createCategoryDto.name;
        category.description = createCategoryDto.description;

        return await this.categoryRepository.save(category);
    }

    async deleteCategory(id:string): Promise<Category> {
        const category = this.categoryRepository.findOne(id);
        const status = await this.categoryRepository.delete(id);

        return category;
    }

    async getCategoryById(id: string): Promise<Category> {
        return await this.categoryRepository.findOne(id);
    }

    async getCategoryByName(name: string): Promise<Category> {
        return await this.categoryRepository.findOne({where: {name: name}});
    }

    async getCategories(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

}
