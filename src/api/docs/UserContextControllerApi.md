# UserContextControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createUserContext**](#createusercontext) | **POST** /api/user-contexts | |
|[**deleteUserContext**](#deleteusercontext) | **DELETE** /api/user-contexts/{id} | |
|[**getActiveUserContext**](#getactiveusercontext) | **GET** /api/user-contexts/active | |
|[**getUserContext**](#getusercontext) | **GET** /api/user-contexts/{id} | |
|[**getUserContexts**](#getusercontexts) | **GET** /api/user-contexts | |
|[**updateUserContext**](#updateusercontext) | **PUT** /api/user-contexts/{id} | |

# **createUserContext**
> UserContextDTO createUserContext(userContextDTO)


### Example

```typescript
import {
    UserContextControllerApi,
    Configuration,
    UserContextDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new UserContextControllerApi(configuration);

let userContextDTO: UserContextDTO; //

const { status, data } = await apiInstance.createUserContext(
    userContextDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userContextDTO** | **UserContextDTO**|  | |


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

# **deleteUserContext**
> deleteUserContext()


### Example

```typescript
import {
    UserContextControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserContextControllerApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.deleteUserContext(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


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

# **getActiveUserContext**
> UserContextDTO getActiveUserContext()


### Example

```typescript
import {
    UserContextControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserContextControllerApi(configuration);

let userId: string; // (default to undefined)

const { status, data } = await apiInstance.getActiveUserContext(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|


### Return type

**UserContextDTO**

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

# **getUserContext**
> UserContextDTO getUserContext()


### Example

```typescript
import {
    UserContextControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserContextControllerApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.getUserContext(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**UserContextDTO**

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
    UserContextControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserContextControllerApi(configuration);

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

# **updateUserContext**
> UserContextDTO updateUserContext(userContextDTO)


### Example

```typescript
import {
    UserContextControllerApi,
    Configuration,
    UserContextDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new UserContextControllerApi(configuration);

let id: string; // (default to undefined)
let userContextDTO: UserContextDTO; //

const { status, data } = await apiInstance.updateUserContext(
    id,
    userContextDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userContextDTO** | **UserContextDTO**|  | |
| **id** | [**string**] |  | defaults to undefined|


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

