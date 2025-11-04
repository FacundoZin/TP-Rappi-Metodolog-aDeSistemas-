import { Injectable } from '@nestjs/common';
import { IEmailService } from 'src/orders/Domain/Interfaces/IEmailService';

@Injectable()
export class EmailServie implements IEmailService {
  notifyUser(userEmail: string, message: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  notifyVendor(vendroEmail: any, message: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
