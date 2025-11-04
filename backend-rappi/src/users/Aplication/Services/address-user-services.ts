import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAddress } from 'src/users/Domain/entities/user-address.entity';
import { CreateUserAddressDto } from '../dto/addres/create-address.dto';
import { Result } from 'src/common/result/Result';

@Injectable()
export class UsersAddresService {
  constructor(
    @InjectRepository(UserAddress)
    private readonly addressRepository: Repository<UserAddress>,
  ) {}

  async createAddress(
    userId: string,
    dto: CreateUserAddressDto,
  ): Promise<Result<UserAddress>> {
    try {
      const newAddress = this.addressRepository.create({
        ...dto,
        user: { id: userId },
      });

      const saved = await this.addressRepository.save(newAddress);
      return Result.ok(saved);
    } catch (err) {
      return Result.fail<UserAddress>('Error al crear la dirección', 500);
    }
  }

  async dropAddress(
    addressId: string,
    userId: string,
  ): Promise<Result<string>> {
    try {
      const address = await this.addressRepository.findOne({
        where: { id: addressId, user: { id: userId } },
      });

      if (!address) {
        return Result.fail<string>(
          'Dirección no encontrada o no pertenece al usuario',
          404,
        );
      }

      await this.addressRepository.remove(address);
      return Result.ok('Dirección eliminada correctamente');
    } catch (err) {
      return Result.fail<string>('Error al eliminar la dirección', 500);
    }
  }
}
