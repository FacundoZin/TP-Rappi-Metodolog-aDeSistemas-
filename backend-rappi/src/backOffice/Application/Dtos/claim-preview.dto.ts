import { ClaimStatus } from 'src/backOffice/Domain/Enum/claim-status';

export class ClaimPreview {
  id: string;
  description: string;
  status: ClaimStatus; // antes stauts
  createdAt: Date; // antes createAt
}
