# UserContextCreateRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**conversationId** | **string** |  | [optional] [default to undefined]
**journey** | [**Journey**](Journey.md) |  | [optional] [default to undefined]
**loveTypes** | [**Array&lt;LoveType&gt;**](LoveType.md) |  | [optional] [default to undefined]
**relationalNeeds** | [**Array&lt;RelationalNeed&gt;**](RelationalNeed.md) |  | [optional] [default to undefined]
**relationshipStatus** | [**RelationshipStatus**](RelationshipStatus.md) |  | [optional] [default to undefined]
**semanticSummary** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { UserContextCreateRequest } from './api';

const instance: UserContextCreateRequest = {
    conversationId,
    journey,
    loveTypes,
    relationalNeeds,
    relationshipStatus,
    semanticSummary,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
