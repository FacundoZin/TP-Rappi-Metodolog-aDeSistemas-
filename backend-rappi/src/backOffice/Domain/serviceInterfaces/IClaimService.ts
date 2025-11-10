import { claimCreated } from 'src/backOffice/Application/Dtos/claim-created.dto';
import { Result } from 'src/common/result/Result';

export interface IClaimService {
  createVendorClaim(
    orderId: string,
    VendorId: string,
    description: string,
  ): Promise<Result<claimCreated>>;
  CreateClientClaim(
    orderId: string,
    ClientId: string,
    description: string,
  ): Promise<Result<claimCreated>>;
}

export const CLAIM_SERVICE = Symbol('IClaimService');
