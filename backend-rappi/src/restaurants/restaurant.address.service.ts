// restaurant-address.service.ts
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RestaurantAddress } from "./entities/restaurant-addres";
import { Result } from "./Common/Result";
import { CreateRestaurantAddressDto } from "./dto/Addres/create.restaurantAddress.dto";
import { UpdateRestaurantAddressDto } from "./dto/Addres/update-restaurantAddress.dto";

export class RestauranAddressService {
  constructor(
    @InjectRepository(RestaurantAddress)
    private readonly _AddresRepo: Repository<RestaurantAddress>
  ) {}

  // Crear dirección
  async createAddress(dto: CreateRestaurantAddressDto): Promise<Result<string>> {
    try {
      const address = dto.toEntity();
      const created = await this._AddresRepo.save(address);
      return Result.ok(created.id);
    } catch (err) {
      return Result.fail('Error al crear la dirección', 500);
    }
  }

  // Editar dirección
  async updateAddress(id: string, dto: UpdateRestaurantAddressDto): Promise<Result<number>> {
    try {
      const existing = await this._AddresRepo.findOne({ where: { id } });
      if (!existing) return Result.fail('Dirección no encontrada', 404);

      const updatedEntity = dto.toEntity(existing);
      const responseDB = await this._AddresRepo.update(id, updatedEntity);

      if (!responseDB.affected || responseDB.affected === 0) {
        return Result.fail('No se pudo actualizar la dirección', 500);
      }

      return Result.ok(responseDB.affected);
    } catch (err) {
      return Result.fail('Error al actualizar la dirección', 500);
    }
  }

  // Borrar dirección
  async deleteAddress(id: string): Promise<Result<number>> {
    try {
      const existing = await this._AddresRepo.findOne({ where: { id } });
      if (!existing) return Result.fail('Dirección no encontrada', 404);

      const responseDB = await this._AddresRepo.delete(id);

      if (!responseDB.affected || responseDB.affected === 0) {
        return Result.fail('No se pudo borrar la dirección', 500);
      }

      return Result.ok(responseDB.affected);
    } catch (err) {
      return Result.fail('Error al borrar la dirección', 500);
    }
  }
}
