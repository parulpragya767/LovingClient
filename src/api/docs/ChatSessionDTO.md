# ChatSessionDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [default to undefined]
**title** | **string** |  | [optional] [default to undefined]
**lastMessagePreview** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]
**messages** | [**Array&lt;ChatMessageDTO&gt;**](ChatMessageDTO.md) |  | [optional] [default to undefined]

## Example

```typescript
import { ChatSessionDTO } from './api';

const instance: ChatSessionDTO = {
    id,
    title,
    lastMessagePreview,
    createdAt,
    updatedAt,
    messages,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
