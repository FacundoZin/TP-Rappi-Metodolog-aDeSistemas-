import { Result } from 'src/common/result/Result';
import { ClaimStatus } from '../Enum/claim-status';
import { ClaimInfo } from 'src/backOffice/Application/Dtos/claim-info.dto';
import { ClaimPreview } from 'src/backOffice/Application/Dtos/claim-preview.dto';

export interface IClaimManagmentService {
  getAllClaims(): Promise<Result<ClaimPreview[]>>;
  getClaimById(claimId: string): Promise<Result<ClaimInfo>>;
  updateClaimStatus(
    claimId: string,
    status: ClaimStatus,
  ): Promise<Result<void>>;
}

export const CLAIM_MANAGMENT_SERVICE = Symbol('IClaimManagmentService');
