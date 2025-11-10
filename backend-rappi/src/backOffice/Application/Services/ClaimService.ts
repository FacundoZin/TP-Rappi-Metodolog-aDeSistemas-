import { IClaimService } from 'src/backOffice/Domain/serviceInterfaces/IClaimService';
import { Result } from 'src/common/result/Result';
import { claimCreated } from '../Dtos/claim-created.dto';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Claim } from 'src/backOffice/Domain/Entities/claim.entity';
import {
  type IVendorProvider,
  VENDOR_PROVIDER,
} from 'src/vendorsAccount/Domain/port/IVendorProvider';
import {
  type IUserProvider,
  USER_PROVIDER,
} from 'src/usersAccount/Domain/Ports/user-provider-interface';
import {
  type IOrderProvider,
  ORDER_ADAPTER,
} from 'src/orders/Domain/ports/IOrderProvider';
import { ClaimsMapper } from '../Mappers/ClaimsMapper';

@Injectable()
export class ClaimService implements IClaimService {
  constructor(
    @InjectRepository(Claim)
    private readonly claimRepository: Repository<Claim>,
    @Inject(VENDOR_PROVIDER)
    private readonly vendorAdapter: IVendorProvider,
    @Inject(USER_PROVIDER)
    private readonly userAdapter: IUserProvider,
    @Inject(ORDER_ADAPTER)
    private readonly orderAdapter: IOrderProvider,
  ) {}

  async createVendorClaim(
    orderId: string,
    vendorId: string,
    description: string,
  ): Promise<Result<claimCreated>> {
    const [resultOrder, resultVendor] = await Promise.all([
      this.orderAdapter.provideFullOder(orderId),
      this.vendorAdapter.ProvideContactInfo(vendorId),
    ]);

    if (!resultOrder.success)
      return Result.fail(resultOrder.message!, resultOrder.errorcode!);
    if (!resultVendor.success)
      return Result.fail(resultVendor.message!, resultVendor.errorcode!);

    const claim = ClaimsMapper.toEntity({
      orderId,
      description,
      claimerId: vendorId,
      claimerName: resultVendor.data!.name,
      claimerEmail: resultVendor.data!.email,
      isVendor: true,
    });

    const claimCreated = await this.claimRepository.save(claim);
    return Result.ok(ClaimsMapper.toClaimCreatedDto(claimCreated));
  }

  async CreateClientClaim(
    orderId: string,
    clientId: string,
    description: string,
  ): Promise<Result<claimCreated>> {
    const [resultOrder, resultClient] = await Promise.all([
      this.orderAdapter.provideFullOder(orderId),
      this.userAdapter.ProvideContactInfo(clientId),
    ]);

    if (!resultOrder.success)
      return Result.fail(resultOrder.message!, resultOrder.errorcode!);
    if (!resultClient.success)
      return Result.fail(resultClient.message!, resultClient.errorcode!);

    const claim = ClaimsMapper.toEntity({
      orderId,
      description,
      claimerId: clientId,
      claimerName: resultClient.data!.name,
      claimerEmail: resultClient.data!.email,
      isVendor: false,
    });

    const claimCreated = await this.claimRepository.save(claim);
    return Result.ok(ClaimsMapper.toClaimCreatedDto(claimCreated));
  }
}
