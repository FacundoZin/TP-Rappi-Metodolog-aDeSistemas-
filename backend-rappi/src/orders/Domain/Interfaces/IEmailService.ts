export interface IEmailService {
  notifyUser(userEmail: string): Promise<void>;
  notifyVendor(vendroEmail, message: string): Promise<void>;
}
