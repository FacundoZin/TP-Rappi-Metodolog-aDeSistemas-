export class CreateVendorTokenDto {
  userId: string;
  role: string;
  username: string;
  email: string;

  constructor(userId: string, role: string, userName: string, email: string) {
    this.userId = userId;
    this.role = role;
    this.username = userName;
    this.email = email;
  }
}
