import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {

    constructor(private categoriesService: CategoriesService){}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create new category' })
    @ApiResponse({ status: 401, description: 'Access denied! Log in first!' })
    async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        return await this.categoriesService.createCategory(createCategoryDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all categories' })
    async getCategories(): Promise<Category[]> {
        return this.categoriesService.getCategories();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get category by ID' })
    async getCategory(@Param(":id") id : string) : Promise<Category>{
        return this.categoriesService.getCategoryById(id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete category by ID' })
    @ApiResponse({ status: 401, description: 'Access denied! Log in first!' })
    async deleteCategory(@Param(":id") id : string) : Promise<Category>{
        return await this.categoriesService.deleteCategory(id);
    }
}
