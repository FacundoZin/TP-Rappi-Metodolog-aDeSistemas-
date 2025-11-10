import {
  Body,
  Controller,
  HttpException,
  Inject,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { VendorOnly } from 'src/auth/Decorators/decorators';
import {
  CLAIM_SERVICE,
  type IClaimService,
} from 'src/backOffice/Domain/serviceInterfaces/IClaimService';
import { type RequestWithUser } from 'src/common/HttpRequestWithUser/IRequestWithUser';

@VendorOnly()
@Controller('vendors/orders/:idOrder/claims')
export class VendorClaimsController {
  constructor(
    @Inject(CLAIM_SERVICE)
    private readonly claimsService: IClaimService,
  ) {}

  @Post()
  async postClaim(
    @Req() req: RequestWithUser,
    @Param('idOrder') idOrder: string,
    @Body() body: { description: string },
  ) {
    const result = await this.claimsService.createVendorClaim(
      idOrder,
      req.user.sub,
      body.description,
    );

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }

    return result.data;
  }
}
