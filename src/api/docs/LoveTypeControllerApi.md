# LoveTypeControllerApi

All URIs are relative to *http://localhost:8080/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getAllLoveTypes**](#getalllovetypes) | **GET** /v1/love-types | |
|[**getLoveTypeById**](#getlovetypebyid) | **GET** /v1/love-types/{id} | |

# **getAllLoveTypes**
> Array<LoveTypeInfo> getAllLoveTypes()


### Example

```typescript
import {
    LoveTypeControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LoveTypeControllerApi(configuration);

const { status, data } = await apiInstance.getAllLoveTypes();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<LoveTypeInfo>**

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

# **getLoveTypeById**
> LoveTypeInfo getLoveTypeById()


### Example

```typescript
import {
    LoveTypeControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LoveTypeControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getLoveTypeById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**LoveTypeInfo**

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

