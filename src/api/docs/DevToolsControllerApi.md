# DevToolsControllerApi

All URIs are relative to *http://localhost:8080/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createUserContext**](#createusercontext) | **POST** /internal/dev-tools/user-contexts | |
|[**getDailyUsage**](#getdailyusage) | **GET** /internal/dev-tools/usage/daily | |
|[**getUserContexts**](#getusercontexts) | **GET** /internal/dev-tools/user-contexts | |
|[**getUserContextsForConversation**](#getusercontextsforconversation) | **GET** /internal/dev-tools/user-contexts/session/{id} | |
|[**getWeeklyUsage**](#getweeklyusage) | **GET** /internal/dev-tools/usage/weekly | |
|[**incrementAiMessageUsage**](#incrementaimessageusage) | **POST** /internal/dev-tools/usage/increment/ai-message | |
|[**incrementRecommendationUsage**](#incrementrecommendationusage) | **POST** /internal/dev-tools/usage/increment/recommendation | |

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

let userContextCreateRequest: UserContextCreateRequest; //

const { status, data } = await apiInstance.createUserContext(
    userContextCreateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userContextCreateRequest** | **UserContextCreateRequest**|  | |


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

# **getDailyUsage**
> UserUsageCounterDTO getDailyUsage()


### Example

```typescript
import {
    DevToolsControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DevToolsControllerApi(configuration);

const { status, data } = await apiInstance.getDailyUsage();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**UserUsageCounterDTO**

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

const { status, data } = await apiInstance.getUserContexts();
```

### Parameters
This endpoint does not have any parameters.


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

let id: string; // (default to undefined)

const { status, data } = await apiInstance.getUserContextsForConversation(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
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

# **getWeeklyUsage**
> UserUsageCounterDTO getWeeklyUsage()


### Example

```typescript
import {
    DevToolsControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DevToolsControllerApi(configuration);

const { status, data } = await apiInstance.getWeeklyUsage();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**UserUsageCounterDTO**

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

# **incrementAiMessageUsage**
> incrementAiMessageUsage()


### Example

```typescript
import {
    DevToolsControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DevToolsControllerApi(configuration);

const { status, data } = await apiInstance.incrementAiMessageUsage();
```

### Parameters
This endpoint does not have any parameters.


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

# **incrementRecommendationUsage**
> incrementRecommendationUsage()


### Example

```typescript
import {
    DevToolsControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DevToolsControllerApi(configuration);

const { status, data } = await apiInstance.incrementRecommendationUsage();
```

### Parameters
This endpoint does not have any parameters.


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

