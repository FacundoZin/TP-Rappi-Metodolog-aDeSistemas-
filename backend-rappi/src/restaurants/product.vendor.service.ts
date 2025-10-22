import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/Prodcut/Input/create-product.dto";
import { Result } from "./Common/Result";
import { UpdateProductDto } from "./dto/Prodcut/Input/update-product.dto";

@Injectable()
export class ProducVendorService{
    
    constructor(
        @InjectRepository(Product)
        private readonly ProductRepo: Repository<Product>
    ){}

    async CreateProduct (dto: CreateProductDto): Promise<Result<string>>{
        try {
            const product = await this.ProductRepo.save(dto.toEntity());
            return Result.ok(product.id);
        } catch (error) {
            return Result.fail("No se pudo crear el producto: " + error.message, 500);
        }
    }

    async GetProductById(Id: string): Promise<Result<Product>>{
        const product = await this.ProductRepo.findOne({ where: { id: Id } });
        if(!product) return Result.fail('Producto no encontrado', 404);
        return Result.ok(product);
    }

    async deleteProduct(id: string): Promise<Result<number>>{
        const result = await this.ProductRepo.delete(id);
        
        if (!result.affected || result.affected === 0)
            return Result.fail('Lo senitmos el producto no fue borrado', 404);
        
        return Result.ok(result.affected);
    }

    async ChangeProductStatus( Id: string, status: boolean ): Promise<Result<number>>{
        const product = await this.ProductRepo.findOne({ where: { id: Id } });
        if(!product) return Result.fail('el producto que se esta intentando borrar no existe', 404);

        product.isAvailable = status

        const responseDB = await this.ProductRepo.update(Id, product)

        if (!responseDB.affected || responseDB.affected === 0) return Result.fail(
            'Lo sentimos, no pudimos modificar el producto en la base de datos', 404);
        
        return Result.ok(responseDB.affected);
    }

    async GetProductList(){

    }

    async updateProduct(Id: string, dto: UpdateProductDto): Promise<Result<number>> {
        const product = await this.ProductRepo.findOne({ where: { id: Id } });
        
        if(!product) return Result.fail('Producto no encontrado', 404);
        
        const updatedEntity = dto.toEntity(product);
        const responseDB = await this.ProductRepo.update(Id, updatedEntity)

        if (!responseDB.affected || responseDB.affected === 0) return Result.fail(
            'Lo sentimos, no pudimoscarar el producto en la base de datos', 404);
        
        return Result.ok(responseDB.affected);
    }

}