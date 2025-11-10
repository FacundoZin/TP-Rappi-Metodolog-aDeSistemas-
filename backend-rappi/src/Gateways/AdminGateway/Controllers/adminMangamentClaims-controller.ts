import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  HttpException,
  Inject,
} from '@nestjs/common';
import { AdminOnly } from 'src/auth/Decorators/decorators';
import {
  CLAIM_MANAGMENT_SERVICE,
  type IClaimManagmentService,
} from 'src/backOffice/Domain/serviceInterfaces/IClaimManagmentService';
import { ClaimStatus } from 'src/backOffice/Domain/Enum/claim-status';

@AdminOnly()
@Controller('admin/claims')
export class AdminClaimModerationController {
  constructor(
    @Inject(CLAIM_MANAGMENT_SERVICE)
    private readonly claimModerationService: IClaimManagmentService,
  ) {}

  @Get('pending')
  async getPendingClaims() {
    const result = await this.claimModerationService.getAllClaims();

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }

    return result.data;
  }

  @Get(':claimId')
  async getClaimById(@Param('claimId') claimId: string) {
    const result = await this.claimModerationService.getClaimById(claimId);

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }

    return result.data;
  }

  @Patch(':claimId/status')
  async updateClaimStatus(
    @Param('claimId') claimId: string,
    @Body('status') status: ClaimStatus,
  ) {
    const result = await this.claimModerationService.updateClaimStatus(
      claimId,
      status,
    );

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }

    return { message: `Estado del reclamo ${claimId} actualizado a ${status}` };
  }
}
