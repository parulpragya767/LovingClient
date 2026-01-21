import type { UserDTO } from '@/src/api/models/user-dto';
import type { UserUpdateRequest as ApiUserUpdateRequest } from '@/src/api/models/user-update-request';

export interface User extends UserDTO {}
export interface UserUpdateRequest extends ApiUserUpdateRequest {}

