import { TokenType } from './token.type';

export interface JwtUser {
  /** USER ID */
  sub: string;

  /** JWT ID */
  jti: string;

  /** JWT Token Type */
  type: TokenType;

  /** Issued at */
  iat: number;

  /** isCreator */
  isCreator?: boolean;

  /** isAdmin */
  isAdmin?: boolean;

  /** Expiration time */
  exp: number;
}
