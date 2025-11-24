# RitualHistoryDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**userId** | **string** |  | [optional] [default to undefined]
**ritualId** | **string** |  | [optional] [default to undefined]
**ritualPackId** | **string** |  | [optional] [default to undefined]
**recommendationId** | **string** |  | [optional] [default to undefined]
**status** | [**RitualHistoryStatus**](RitualHistoryStatus.md) |  | [optional] [default to undefined]
**feedback** | [**EmojiFeedback**](EmojiFeedback.md) |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { RitualHistoryDTO } from './api';

const instance: RitualHistoryDTO = {
    id,
    userId,
    ritualId,
    ritualPackId,
    recommendationId,
    status,
    feedback,
    createdAt,
    updatedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
