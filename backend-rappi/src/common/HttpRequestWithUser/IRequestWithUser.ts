import { Request } from 'express';
import { JwtPayload } from '../JwtPayload/JwtPayload';

export interface RequestWithUser extends Request {
  user: JwtPayload;
}
