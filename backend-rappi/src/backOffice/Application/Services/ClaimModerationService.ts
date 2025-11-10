import { Claim } from 'src/backOffice/Domain/Entities/claim.entity';
import { ClaimStatus } from 'src/backOffice/Domain/Enum/claim-status';
import { IClaimManagmentService } from 'src/backOffice/Domain/serviceInterfaces/IClaimManagmentService';
import { Result } from 'src/common/result/Result';

export class ClaimModerationService implements IClaimManagmentService {
  getAllClaims(): Promise<Result<Claim[]>> {
    throw new Error('Method not implemented.');
  }
  getClaimById(claimId: string): Promise<Result<Claim>> {
    throw new Error('Method not implemented.');
  }
  updateClaimStatus(
    claimId: string,
    status: ClaimStatus,
  ): Promise<Result<void>> {
    throw new Error('Method not implemented.');
  }
}
