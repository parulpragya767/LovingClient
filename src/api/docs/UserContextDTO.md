# UserContextDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**userId** | **string** |  | [optional] [default to undefined]
**conversationId** | **string** |  | [optional] [default to undefined]
**journey** | [**Journey**](Journey.md) |  | [optional] [default to undefined]
**loveTypes** | [**Array&lt;LoveType&gt;**](LoveType.md) |  | [optional] [default to undefined]
**relationalNeeds** | [**Array&lt;RelationalNeed&gt;**](RelationalNeed.md) |  | [optional] [default to undefined]
**relationshipStatus** | [**RelationshipStatus**](RelationshipStatus.md) |  | [optional] [default to undefined]
**semanticSummary** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { UserContextDTO } from './api';

const instance: UserContextDTO = {
    id,
    userId,
    conversationId,
    journey,
    loveTypes,
    relationalNeeds,
    relationshipStatus,
    semanticSummary,
    createdAt,
    updatedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
