# ChatMessageDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [default to undefined]
**sessionId** | **string** |  | [default to undefined]
**role** | [**ChatMessageRole**](ChatMessageRole.md) |  | [default to undefined]
**content** | **string** |  | [optional] [default to undefined]
**metadata** | [**ChatMetadata**](ChatMetadata.md) |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { ChatMessageDTO } from './api';

const instance: ChatMessageDTO = {
    id,
    sessionId,
    role,
    content,
    metadata,
    createdAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
