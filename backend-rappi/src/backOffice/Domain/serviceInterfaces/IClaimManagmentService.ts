import { Result } from 'src/common/result/Result';
import { Claim } from '../Entities/claim.entity';
import { ClaimStatus } from '../Enum/claim-status';

export interface IClaimManagmentService {
  getAllClaims(): Promise<Result<Claim[]>>;
  getClaimById(claimId: string): Promise<Result<Claim>>;
  updateClaimStatus(
    claimId: string,
    status: ClaimStatus,
  ): Promise<Result<void>>;
}

export const CLAIM_MANAGMENT_SERVICE = Symbol('IClaimManagmentService');
