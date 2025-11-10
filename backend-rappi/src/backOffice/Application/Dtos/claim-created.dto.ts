import { ClaimStatus } from 'src/backOffice/Domain/Enum/claim-status';

export class claimCreated {
  idClaim: string;
  claimStatus: ClaimStatus;
  createdAt: Date;
}
