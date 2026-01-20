# RitualHistoryControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**_delete**](#_delete) | **DELETE** /api/ritual-history/{id} | |
|[**bulkCreate**](#bulkcreate) | **POST** /api/ritual-history/bulk | |
|[**bulkUpdateStatus**](#bulkupdatestatus) | **PUT** /api/ritual-history/bulk/status | |
|[**complete**](#complete) | **POST** /api/ritual-history/{id}/complete | |
|[**create1**](#create1) | **POST** /api/ritual-history | |
|[**list**](#list) | **GET** /api/ritual-history | |
|[**listCurrent**](#listcurrent) | **GET** /api/ritual-history/current | |
|[**updateStatus**](#updatestatus) | **PUT** /api/ritual-history/{id}/status | |

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

let userId: string; // (default to undefined)
let id: string; // (default to undefined)

const { status, data } = await apiInstance._delete(
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

let userId: string; // (default to undefined)
let ritualHistoryCreateRequest: Array<RitualHistoryCreateRequest>; //

const { status, data } = await apiInstance.bulkCreate(
    userId,
    ritualHistoryCreateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ritualHistoryCreateRequest** | **Array<RitualHistoryCreateRequest>**|  | |
| **userId** | [**string**] |  | defaults to undefined|


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

let userId: string; // (default to undefined)
let bulkRitualHistoryStatusUpdateRequest: BulkRitualHistoryStatusUpdateRequest; //

const { status, data } = await apiInstance.bulkUpdateStatus(
    userId,
    bulkRitualHistoryStatusUpdateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **bulkRitualHistoryStatusUpdateRequest** | **BulkRitualHistoryStatusUpdateRequest**|  | |
| **userId** | [**string**] |  | defaults to undefined|


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

let userId: string; // (default to undefined)
let id: string; // (default to undefined)
let ritualHistoryUpdateRequest: RitualHistoryUpdateRequest; //

const { status, data } = await apiInstance.complete(
    userId,
    id,
    ritualHistoryUpdateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ritualHistoryUpdateRequest** | **RitualHistoryUpdateRequest**|  | |
| **userId** | [**string**] |  | defaults to undefined|
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

let userId: string; // (default to undefined)
let ritualHistoryCreateRequest: RitualHistoryCreateRequest; //

const { status, data } = await apiInstance.create1(
    userId,
    ritualHistoryCreateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ritualHistoryCreateRequest** | **RitualHistoryCreateRequest**|  | |
| **userId** | [**string**] |  | defaults to undefined|


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

let userId: string; // (default to undefined)

const { status, data } = await apiInstance.list(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|


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

let userId: string; // (default to undefined)

const { status, data } = await apiInstance.listCurrent(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|


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

let userId: string; // (default to undefined)
let id: string; // (default to undefined)
let ritualHistoryUpdateRequest: RitualHistoryUpdateRequest; //

const { status, data } = await apiInstance.updateStatus(
    userId,
    id,
    ritualHistoryUpdateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ritualHistoryUpdateRequest** | **RitualHistoryUpdateRequest**|  | |
| **userId** | [**string**] |  | defaults to undefined|
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

