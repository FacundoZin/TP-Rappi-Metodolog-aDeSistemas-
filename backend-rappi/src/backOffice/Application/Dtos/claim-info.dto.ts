import { ClaimStatus } from 'src/backOffice/Domain/Enum/claim-status';

export class ClaimInfo {
  id: string;
  description: string;
  orderId: string;
  claimerName: string;
  contactEmail: string;
  createdAt: Date;
  status: ClaimStatus;
}
