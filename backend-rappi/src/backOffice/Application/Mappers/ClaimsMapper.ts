import { Claim } from 'src/backOffice/Domain/Entities/claim.entity';
import { claimCreated } from '../Dtos/claim-created.dto';
import { ClaimStatus } from 'src/backOffice/Domain/Enum/claim-status';

export class ClaimsMapper {
  static toEntity(params: {
    orderId: string;
    description: string;
    claimerId: string;
    claimerName: string;
    claimerEmail: string;
    isVendor: boolean;
  }): Claim {
    const claim = new Claim();
    claim.orderId = params.orderId;
    claim.description = params.description;
    claim.status = ClaimStatus.PENDING;
    claim.contactEmail = params.claimerEmail;
    claim.claimerName = params.claimerName;

    if (params.isVendor) {
      claim.vendorId = params.claimerId;
    } else {
      claim.clientId = params.claimerId;
    }

    return claim;
  }

  static toClaimCreatedDto(claim: Claim): claimCreated {
    return {
      idClaim: claim.id,
      claimStatus: claim.status,
      createdAt: claim.createdAt,
    };
  }
}
