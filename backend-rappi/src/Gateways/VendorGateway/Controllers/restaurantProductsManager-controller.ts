import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';
import {
  PRODUCT_MANAGER,
  type IProductManager,
} from 'src/restaurants/domain/ServiceInterfaces/IProductManager';
import { CreateProductDto } from 'src/restaurants/Application/Dtos/Prodcut/Input/create-product.dto';
import { UpdateProductDto } from 'src/restaurants/Application/Dtos/Prodcut/Input/update-product.dto';

@UseGuards(JwtAuthGuard)
@Controller('restaurants/products')
export class RestaurantProductsManagerController {
  constructor(
    @Inject(PRODUCT_MANAGER)
    private readonly productManager: IProductManager,
  ) {}

  @Post()
  async createProduct(@Body() dto: CreateProductDto) {
    const result = await this.productManager.CreateProduct(dto);

    if (!result.success)
      throw new HttpException(result.message!, result.errorcode!);

    return {
      message: 'Producto creado correctamente',
      id: result.data,
    };
  }

  @Get()
  async getProducts() {
    const result = await this.productManager.GetProductList();

    if (!result.success)
      throw new HttpException(result.message!, result.errorcode!);

    return result.data;
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    const result = await this.productManager.GetProductById(id);

    if (!result.success)
      throw new HttpException(result.message!, result.errorcode!);

    return result.data;
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    const result = await this.productManager.updateProduct(id, dto);

    if (!result.success)
      throw new HttpException(result.message!, result.errorcode!);

    return {
      message: 'Producto actualizado correctamente',
      affectedRows: result.data,
    };
  }

  @Patch(':id/status')
  async changeStatus(@Param('id') id: string, @Body('status') status: boolean) {
    const result = await this.productManager.ChangeProductStatus(id, status);

    if (!result.success)
      throw new HttpException(result.message!, result.errorcode!);

    return {
      message: 'Estado de producto actualizado correctamente',
    };
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    const result = await this.productManager.deleteProduct(id);

    if (!result.success)
      throw new HttpException(result.message!, result.errorcode!);

    return {
      message: 'Producto eliminado correctamente',
      affectedRows: result.data,
    };
  }
}
