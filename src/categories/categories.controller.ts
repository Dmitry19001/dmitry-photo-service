import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {

    constructor(private categoriesService: CategoriesService){}

    @Post()
    @UseGuards(JwtAuthGuard)
    async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        return await this.categoriesService.createCategory(createCategoryDto);
    }

    @Get()
    async getCategories(): Promise<Category[]> {
        return this.categoriesService.getCategories();
    }

    @Get(':id')
    async getCategory(@Param(":id") id : string) : Promise<Category>{
        return this.categoriesService.getCategoryById(id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteCategory(@Param(":id") id : string) : Promise<Category>{
        return await this.categoriesService.deleteCategory(id);
    }
}
