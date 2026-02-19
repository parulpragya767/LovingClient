# RitualPackControllerApi

All URIs are relative to *http://localhost:8080/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getAll1**](#getall1) | **GET** /v1/ritual-packs | |
|[**getById1**](#getbyid1) | **GET** /v1/ritual-packs/{id} | |

# **getAll1**
> Array<RitualPackDTO> getAll1()


### Example

```typescript
import {
    RitualPackControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualPackControllerApi(configuration);

const { status, data } = await apiInstance.getAll1();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<RitualPackDTO>**

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

# **getById1**
> RitualPackDTO getById1()


### Example

```typescript
import {
    RitualPackControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualPackControllerApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.getById1(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**RitualPackDTO**

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

