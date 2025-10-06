# AiChatControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getChatHistory**](#getchathistory) | **GET** /api/ai-chat/sessions/{sessionId}/history | |
|[**sendMessage**](#sendmessage) | **POST** /api/ai-chat/sessions/{sessionId}/messages | |
|[**startSession**](#startsession) | **POST** /api/ai-chat/sessions | |

# **getChatHistory**
> GetHistoryResponse getChatHistory()


### Example

```typescript
import {
    AiChatControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AiChatControllerApi(configuration);

let sessionId: string; // (default to undefined)

const { status, data } = await apiInstance.getChatHistory(
    sessionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sessionId** | [**string**] |  | defaults to undefined|


### Return type

**GetHistoryResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **sendMessage**
> SendMessageResponse sendMessage(sendMessageRequest)


### Example

```typescript
import {
    AiChatControllerApi,
    Configuration,
    SendMessageRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AiChatControllerApi(configuration);

let sessionId: string; // (default to undefined)
let sendMessageRequest: SendMessageRequest; //

const { status, data } = await apiInstance.sendMessage(
    sessionId,
    sendMessageRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sendMessageRequest** | **SendMessageRequest**|  | |
| **sessionId** | [**string**] |  | defaults to undefined|


### Return type

**SendMessageResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **startSession**
> StartSessionResponse startSession(startSessionRequest)


### Example

```typescript
import {
    AiChatControllerApi,
    Configuration,
    StartSessionRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AiChatControllerApi(configuration);

let startSessionRequest: StartSessionRequest; //

const { status, data } = await apiInstance.startSession(
    startSessionRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **startSessionRequest** | **StartSessionRequest**|  | |


### Return type

**StartSessionResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

