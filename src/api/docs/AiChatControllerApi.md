# AiChatControllerApi

All URIs are relative to *http://localhost:8080/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createSession**](#createsession) | **POST** /v1/chat/sessions | |
|[**deleteSession**](#deletesession) | **DELETE** /v1/chat/sessions/{sessionId} | |
|[**getChatSessionWithHistory**](#getchatsessionwithhistory) | **GET** /v1/chat/sessions/{sessionId}/messages | |
|[**getSamplePrompts**](#getsampleprompts) | **GET** /v1/chat/sample-prompts | |
|[**listSessions**](#listsessions) | **GET** /v1/chat/sessions | |
|[**recommendRitualPack**](#recommendritualpack) | **POST** /v1/chat/sessions/{sessionId}/recommend | |
|[**sendMessage**](#sendmessage) | **POST** /v1/chat/sessions/{sessionId}/messages | |

# **createSession**
> ChatSessionDTO createSession()


### Example

```typescript
import {
    AiChatControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AiChatControllerApi(configuration);

const { status, data } = await apiInstance.createSession();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ChatSessionDTO**

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

# **deleteSession**
> deleteSession()


### Example

```typescript
import {
    AiChatControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AiChatControllerApi(configuration);

let sessionId: string; // (default to undefined)

const { status, data } = await apiInstance.deleteSession(
    sessionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sessionId** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getChatSessionWithHistory**
> ChatSessionDTO getChatSessionWithHistory()


### Example

```typescript
import {
    AiChatControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AiChatControllerApi(configuration);

let sessionId: string; // (default to undefined)

const { status, data } = await apiInstance.getChatSessionWithHistory(
    sessionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sessionId** | [**string**] |  | defaults to undefined|


### Return type

**ChatSessionDTO**

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

# **getSamplePrompts**
> Array<string> getSamplePrompts()


### Example

```typescript
import {
    AiChatControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AiChatControllerApi(configuration);

const { status, data } = await apiInstance.getSamplePrompts();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<string>**

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

# **listSessions**
> Array<ChatSessionDTO> listSessions()


### Example

```typescript
import {
    AiChatControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AiChatControllerApi(configuration);

const { status, data } = await apiInstance.listSessions();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<ChatSessionDTO>**

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

# **recommendRitualPack**
> RecommendRitualPackResponse recommendRitualPack()


### Example

```typescript
import {
    AiChatControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AiChatControllerApi(configuration);

let sessionId: string; // (default to undefined)

const { status, data } = await apiInstance.recommendRitualPack(
    sessionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sessionId** | [**string**] |  | defaults to undefined|


### Return type

**RecommendRitualPackResponse**

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

