import { CustomDecorator, SetMetadata } from '@nestjs/common';

export enum Role {
  UsersEntity = 'user',
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]): CustomDecorator<string> =>
  SetMetadata(ROLES_KEY, roles);
