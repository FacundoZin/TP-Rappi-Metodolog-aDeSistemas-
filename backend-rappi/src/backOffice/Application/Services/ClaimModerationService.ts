import { InjectRepository } from '@nestjs/typeorm';
import { Claim } from 'src/backOffice/Domain/Entities/claim.entity';
import { ClaimStatus } from 'src/backOffice/Domain/Enum/claim-status';
import { IClaimManagmentService } from 'src/backOffice/Domain/serviceInterfaces/IClaimManagmentService';
import { Result } from 'src/common/result/Result';
import { In, Repository } from 'typeorm';
import { ClaimInfo } from '../Dtos/claim-info.dto';
import { ClaimPreview } from '../Dtos/claim-preview.dto';
import { ClaimsMapper } from '../Mappers/ClaimsMapper';

export class ClaimModerationService implements IClaimManagmentService {
  constructor(
    @InjectRepository(Claim)
    private readonly claimRepository: Repository<Claim>,
  ) {}

  async getAllClaims(): Promise<Result<ClaimPreview[]>> {
    try {
      const claims = await this.claimRepository.find({
        where: { status: In([ClaimStatus.PENDING, ClaimStatus.IN_REVIEW]) },
        order: { createdAt: 'DESC' },
      });

      const claimPreviews: ClaimPreview[] = claims.map((claim) => ({
        id: claim.id,
        description: claim.description,
        status: claim.status,
        createdAt: claim.createdAt,
      }));

      return Result.ok(claims.map(ClaimsMapper.toPreview));
    } catch (error) {
      return Result.fail('Error al obtener los reclamos', 500);
    }
  }

  async getClaimById(claimId: string): Promise<Result<ClaimInfo>> {
    try {
      const claim = await this.claimRepository.findOne({
        where: { id: claimId },
      });

      if (!claim) {
        return Result.fail('Reclamo no encontrado', 404);
      }

      return Result.ok(ClaimsMapper.toInfo(claim));
    } catch (error) {
      return Result.fail('Error al obtener el reclamo', 500);
    }
  }

  async updateClaimStatus(
    claimId: string,
    status: ClaimStatus,
  ): Promise<Result<void>> {
    try {
      const claim = await this.claimRepository.findOne({
        where: { id: claimId },
      });

      if (!claim) {
        return Result.fail('Reclamo no encontrado', 404);
      }

      claim.status = status;
      await this.claimRepository.save(claim);

      return Result.ok(undefined);
    } catch (error) {
      return Result.fail('Error al actualizar el estado del reclamo', 500);
    }
  }
}
