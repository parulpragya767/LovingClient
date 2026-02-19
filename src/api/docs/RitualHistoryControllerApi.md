# RitualHistoryControllerApi

All URIs are relative to *http://localhost:8080/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**_delete**](#_delete) | **DELETE** /v1/ritual-history/{id} | |
|[**bulkCreate**](#bulkcreate) | **POST** /v1/ritual-history/bulk | |
|[**bulkUpdateStatus**](#bulkupdatestatus) | **PUT** /v1/ritual-history/bulk/status | |
|[**complete**](#complete) | **POST** /v1/ritual-history/{id}/complete | |
|[**create1**](#create1) | **POST** /v1/ritual-history | |
|[**list**](#list) | **GET** /v1/ritual-history | |
|[**listByRecommendationId**](#listbyrecommendationid) | **GET** /v1/ritual-history/recommendation/{recommendationId} | |
|[**listCurrent**](#listcurrent) | **GET** /v1/ritual-history/current | |
|[**updateStatus**](#updatestatus) | **PUT** /v1/ritual-history/{id}/status | |

# **_delete**
> _delete()


### Example

```typescript
import {
    RitualHistoryControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualHistoryControllerApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance._delete(
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

# **bulkCreate**
> Array<RitualHistoryDTO> bulkCreate(ritualHistoryCreateRequest)


### Example

```typescript
import {
    RitualHistoryControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualHistoryControllerApi(configuration);

let ritualHistoryCreateRequest: Array<RitualHistoryCreateRequest>; //

const { status, data } = await apiInstance.bulkCreate(
    ritualHistoryCreateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ritualHistoryCreateRequest** | **Array<RitualHistoryCreateRequest>**|  | |


### Return type

**Array<RitualHistoryDTO>**

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

# **bulkUpdateStatus**
> bulkUpdateStatus(bulkRitualHistoryStatusUpdateRequest)


### Example

```typescript
import {
    RitualHistoryControllerApi,
    Configuration,
    BulkRitualHistoryStatusUpdateRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualHistoryControllerApi(configuration);

let bulkRitualHistoryStatusUpdateRequest: BulkRitualHistoryStatusUpdateRequest; //

const { status, data } = await apiInstance.bulkUpdateStatus(
    bulkRitualHistoryStatusUpdateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **bulkRitualHistoryStatusUpdateRequest** | **BulkRitualHistoryStatusUpdateRequest**|  | |


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **complete**
> complete(ritualHistoryUpdateRequest)


### Example

```typescript
import {
    RitualHistoryControllerApi,
    Configuration,
    RitualHistoryUpdateRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualHistoryControllerApi(configuration);

let id: string; // (default to undefined)
let ritualHistoryUpdateRequest: RitualHistoryUpdateRequest; //

const { status, data } = await apiInstance.complete(
    id,
    ritualHistoryUpdateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ritualHistoryUpdateRequest** | **RitualHistoryUpdateRequest**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **create1**
> RitualHistoryDTO create1(ritualHistoryCreateRequest)


### Example

```typescript
import {
    RitualHistoryControllerApi,
    Configuration,
    RitualHistoryCreateRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualHistoryControllerApi(configuration);

let ritualHistoryCreateRequest: RitualHistoryCreateRequest; //

const { status, data } = await apiInstance.create1(
    ritualHistoryCreateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ritualHistoryCreateRequest** | **RitualHistoryCreateRequest**|  | |


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

# **list**
> Array<UserRitualDTO> list()


### Example

```typescript
import {
    RitualHistoryControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualHistoryControllerApi(configuration);

let status: RitualHistoryStatus; // (optional) (default to undefined)

const { status, data } = await apiInstance.list(
    status
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **status** | **RitualHistoryStatus** |  | (optional) defaults to undefined|


### Return type

**Array<UserRitualDTO>**

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

# **listByRecommendationId**
> UserRitualPackDTO listByRecommendationId()


### Example

```typescript
import {
    RitualHistoryControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualHistoryControllerApi(configuration);

let recommendationId: string; // (default to undefined)

const { status, data } = await apiInstance.listByRecommendationId(
    recommendationId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **recommendationId** | [**string**] |  | defaults to undefined|


### Return type

**UserRitualPackDTO**

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

# **listCurrent**
> CurrentRitualsDTO listCurrent()


### Example

```typescript
import {
    RitualHistoryControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualHistoryControllerApi(configuration);

const { status, data } = await apiInstance.listCurrent();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**CurrentRitualsDTO**

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

# **updateStatus**
> updateStatus(ritualHistoryUpdateRequest)


### Example

```typescript
import {
    RitualHistoryControllerApi,
    Configuration,
    RitualHistoryUpdateRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualHistoryControllerApi(configuration);

let id: string; // (default to undefined)
let ritualHistoryUpdateRequest: RitualHistoryUpdateRequest; //

const { status, data } = await apiInstance.updateStatus(
    id,
    ritualHistoryUpdateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ritualHistoryUpdateRequest** | **RitualHistoryUpdateRequest**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

