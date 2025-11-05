export interface IEmailService {
  notifyUser(userEmail: string, message: string): Promise<void>;
  notifyVendor(vendroEmail, message: string): Promise<void>;
}
