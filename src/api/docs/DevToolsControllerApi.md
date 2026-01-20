# DevToolsControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createUserContext**](#createusercontext) | **POST** /internal/dev-tools/user-contexts | |
|[**getUserContexts**](#getusercontexts) | **GET** /internal/dev-tools/user-contexts | |
|[**getUserContextsForConversation**](#getusercontextsforconversation) | **GET** /internal/dev-tools/user-contexts/session/{id} | |

# **createUserContext**
> UserContextDTO createUserContext(userContextCreateRequest)


### Example

```typescript
import {
    DevToolsControllerApi,
    Configuration,
    UserContextCreateRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DevToolsControllerApi(configuration);

let userId: string; // (default to undefined)
let userContextCreateRequest: UserContextCreateRequest; //

const { status, data } = await apiInstance.createUserContext(
    userId,
    userContextCreateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userContextCreateRequest** | **UserContextCreateRequest**|  | |
| **userId** | [**string**] |  | defaults to undefined|


### Return type

**UserContextDTO**

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

# **getUserContexts**
> Array<UserContextDTO> getUserContexts()


### Example

```typescript
import {
    DevToolsControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DevToolsControllerApi(configuration);

let userId: string; // (default to undefined)

const { status, data } = await apiInstance.getUserContexts(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|


### Return type

**Array<UserContextDTO>**

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

# **getUserContextsForConversation**
> Array<UserContextDTO> getUserContextsForConversation()


### Example

```typescript
import {
    DevToolsControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DevToolsControllerApi(configuration);

let userId: string; // (default to undefined)
let id: string; // (default to undefined)

const { status, data } = await apiInstance.getUserContextsForConversation(
    userId,
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**Array<UserContextDTO>**

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

