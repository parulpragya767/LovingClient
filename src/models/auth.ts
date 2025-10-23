import type { LoginRequest } from '@/src/api/models/login-request';
import type { LoginResponse } from '@/src/api/models/login-response';

export interface AuthLoginRequest extends LoginRequest {}
export interface AuthLoginResponse extends LoginResponse {}

