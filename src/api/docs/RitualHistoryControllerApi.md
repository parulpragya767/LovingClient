# RitualHistoryControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**create2**](#create2) | **POST** /api/ritual-histories | |
|[**delete2**](#delete2) | **DELETE** /api/ritual-histories/{id} | |
|[**getById2**](#getbyid2) | **GET** /api/ritual-histories/{id} | |
|[**list**](#list) | **GET** /api/ritual-histories | |
|[**update2**](#update2) | **PUT** /api/ritual-histories/{id} | |

# **create2**
> RitualHistoryDTO create2(ritualHistoryDTO)


### Example

```typescript
import {
    RitualHistoryControllerApi,
    Configuration,
    RitualHistoryDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualHistoryControllerApi(configuration);

let ritualHistoryDTO: RitualHistoryDTO; //

const { status, data } = await apiInstance.create2(
    ritualHistoryDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ritualHistoryDTO** | **RitualHistoryDTO**|  | |


### Return type

**RitualHistoryDTO**

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

# **delete2**
> delete2()


### Example

```typescript
import {
    RitualHistoryControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualHistoryControllerApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.delete2(
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

# **getById2**
> RitualHistoryDTO getById2()


### Example

```typescript
import {
    RitualHistoryControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualHistoryControllerApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.getById2(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**RitualHistoryDTO**

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

# **list**
> Array<RitualHistoryDTO> list()


### Example

```typescript
import {
    RitualHistoryControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualHistoryControllerApi(configuration);

let userId: string; // (optional) (default to undefined)
let ritualId: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.list(
    userId,
    ritualId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | (optional) defaults to undefined|
| **ritualId** | [**string**] |  | (optional) defaults to undefined|


### Return type

**Array<RitualHistoryDTO>**

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

# **update2**
> RitualHistoryDTO update2(ritualHistoryDTO)


### Example

```typescript
import {
    RitualHistoryControllerApi,
    Configuration,
    RitualHistoryDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualHistoryControllerApi(configuration);

let id: string; // (default to undefined)
let ritualHistoryDTO: RitualHistoryDTO; //

const { status, data } = await apiInstance.update2(
    id,
    ritualHistoryDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ritualHistoryDTO** | **RitualHistoryDTO**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**RitualHistoryDTO**

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

