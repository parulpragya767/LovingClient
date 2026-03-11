import type { SubscriptionDTO } from '@/src/api/models/subscription-dto';
import type { UsageQuotaDTO } from '@/src/api/models/usage-quota-dto';
import type { UserDTO } from '@/src/api/models/user-dto';
import type { UserUpdateRequest as ApiUserUpdateRequest } from '@/src/api/models/user-update-request';

export interface User extends UserDTO {}
export interface UserUpdateRequest extends ApiUserUpdateRequest {}
export interface Subscription extends SubscriptionDTO {}
export interface UsageQuota extends UsageQuotaDTO {}