// restaurant-address.service.ts
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantAddress } from 'src/restaurants/domain/entities/restaurant-addres';
import { Injectable } from '@nestjs/common';
import { Result } from 'src/common/result/Result';
import { IRestaurantAddressManager } from 'src/restaurants/domain/ServiceInterfaces/Managment/IRestaurantAddresManager';
import { CreateRestaurantAddressDto } from '../../Dtos/Addres/Input/create.restaurantAddress.dto';
import { RestaurantAddressMapper } from '../../Mappers/restaurantaddres-mapper';
import { UpdateRestaurantAddressDto } from '../../Dtos/Addres/Input/update-restaurantAddress.dto';

@Injectable()
export class RestauranAddressManager implements IRestaurantAddressManager {
  constructor(
    @InjectRepository(RestaurantAddress)
    private readonly _AddresRepo: Repository<RestaurantAddress>,
  ) {}

  // Crear dirección
  async createAddress(
    dto: CreateRestaurantAddressDto,
  ): Promise<Result<string>> {
    try {
      const address = RestaurantAddressMapper.formCreateDto(dto);
      const created = await this._AddresRepo.save(address);
      return Result.ok(created.id);
    } catch (err) {
      return Result.fail('Error al crear la dirección', 500);
    }
  }

  // Editar dirección
  async updateAddress(
    idAddres: string,
    dto: UpdateRestaurantAddressDto,
  ): Promise<Result<number>> {
    try {
      const existing = await this._AddresRepo.findOne({
        where: { id: idAddres },
      });
      if (!existing) return Result.fail('Dirección no encontrada', 404);

      const updatedEntity = RestaurantAddressMapper.fromUpdateDto(
        dto,
        existing,
      );
      const responseDB = await this._AddresRepo.update(idAddres, updatedEntity);

      if (!responseDB.affected || responseDB.affected === 0) {
        return Result.fail('No se pudo actualizar la dirección', 500);
      }

      return Result.ok(responseDB.affected);
    } catch (err) {
      return Result.fail('Error al actualizar la dirección', 500);
    }
  }

  // Borrar dirección
  async deleteAddress(idAddres: string): Promise<Result<number>> {
    try {
      const existing = await this._AddresRepo.findOne({
        where: { id: idAddres },
      });
      if (!existing) return Result.fail('Dirección no encontrada', 404);

      const responseDB = await this._AddresRepo.delete(idAddres);

      if (!responseDB.affected || responseDB.affected === 0) {
        return Result.fail('No se pudo borrar la dirección', 500);
      }

      return Result.ok(responseDB.affected);
    } catch (err) {
      return Result.fail('Error al borrar la dirección', 500);
    }
  }
}
