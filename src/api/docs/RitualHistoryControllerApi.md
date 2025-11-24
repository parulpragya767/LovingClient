# RitualHistoryControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**_delete**](#_delete) | **DELETE** /api/ritual-history/{id} | |
|[**bulkCreate**](#bulkcreate) | **POST** /api/ritual-history/bulk | |
|[**bulkUpdateStatus**](#bulkupdatestatus) | **PUT** /api/ritual-history/bulk/status | |
|[**complete**](#complete) | **POST** /api/ritual-history/{id}/complete | |
|[**create**](#create) | **POST** /api/ritual-history | |
|[**list**](#list) | **GET** /api/ritual-history | |
|[**listCurrent**](#listcurrent) | **GET** /api/ritual-history/current | |
|[**updateStatus1**](#updatestatus1) | **PUT** /api/ritual-history/{id}/status | |

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
> Array<RitualHistoryDTO> bulkCreate(ritualHistoryDTO)


### Example

```typescript
import {
    RitualHistoryControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualHistoryControllerApi(configuration);

let ritualHistoryDTO: Array<RitualHistoryDTO>; //

const { status, data } = await apiInstance.bulkCreate(
    ritualHistoryDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ritualHistoryDTO** | **Array<RitualHistoryDTO>**|  | |


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
> Array<RitualHistoryDTO> bulkUpdateStatus(bulkRitualHistoryStatusUpdateRequest)


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

# **complete**
> RitualHistoryDTO complete(ritualHistoryUpdateRequest)


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

# **create**
> RitualHistoryDTO create(ritualHistoryDTO)


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

const { status, data } = await apiInstance.create(
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

const { status, data } = await apiInstance.list();
```

### Parameters
This endpoint does not have any parameters.


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

# **updateStatus1**
> RitualHistoryDTO updateStatus1(ritualHistoryUpdateRequest)


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

const { status, data } = await apiInstance.updateStatus1(
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

