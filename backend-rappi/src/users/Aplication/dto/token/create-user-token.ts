export class CreateUserTokenDto {
  userId: string;
  role: string;
  username: string;
  email: string;
  address: string;

  constructor(
    userId: string,
    role: string,
    userName: string,
    email: string,
    address: string,
  ) {
    this.userId = userId;
    this.role = role;
    this.username = userName;
    this.email = email;
    this.address = address;
  }
}
