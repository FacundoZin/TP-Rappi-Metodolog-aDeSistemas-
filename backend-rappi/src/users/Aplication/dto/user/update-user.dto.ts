import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './user/create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
