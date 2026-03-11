# SubscriptionDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**tier** | [**SubscriptionTier**](SubscriptionTier.md) |  | [default to undefined]
**status** | [**SubscriptionStatus**](SubscriptionStatus.md) |  | [default to undefined]
**expiresAt** | **string** |  | [optional] [default to undefined]
**isBetaUser** | **boolean** |  | [default to undefined]
**hasPremiumAccess** | **boolean** |  | [default to undefined]

## Example

```typescript
import { SubscriptionDTO } from './api';

const instance: SubscriptionDTO = {
    tier,
    status,
    expiresAt,
    isBetaUser,
    hasPremiumAccess,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
