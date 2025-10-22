# UserContextControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createUserContext**](#createusercontext) | **POST** /api/user-contexts | |
|[**getUserContexts**](#getusercontexts) | **GET** /api/user-contexts | |

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

