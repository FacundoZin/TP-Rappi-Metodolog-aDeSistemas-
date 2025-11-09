import { Module } from '@nestjs/common';
import { BackOfficeModule } from 'src/backOffice/backOffice.module';

@Module({
  imports: [BackOfficeModule],
  controllers: [],
})
export class AdminGatewayModule {}
