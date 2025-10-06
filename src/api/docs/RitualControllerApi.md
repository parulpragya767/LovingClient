# RitualControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**_delete**](#_delete) | **DELETE** /api/rituals/{id} | |
|[**create**](#create) | **POST** /api/rituals | |
|[**getAll**](#getall) | **GET** /api/rituals | |
|[**getById**](#getbyid) | **GET** /api/rituals/{id} | |
|[**update**](#update) | **PUT** /api/rituals/{id} | |

# **_delete**
> _delete()


### Example

```typescript
import {
    RitualControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualControllerApi(configuration);

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

# **create**
> RitualDTO create(ritualDTO)


### Example

```typescript
import {
    RitualControllerApi,
    Configuration,
    RitualDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualControllerApi(configuration);

let ritualDTO: RitualDTO; //

const { status, data } = await apiInstance.create(
    ritualDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ritualDTO** | **RitualDTO**|  | |


### Return type

**RitualDTO**

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

# **getAll**
> Array<RitualDTO> getAll()


### Example

```typescript
import {
    RitualControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualControllerApi(configuration);

const { status, data } = await apiInstance.getAll();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<RitualDTO>**

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

# **getById**
> RitualDTO getById()


### Example

```typescript
import {
    RitualControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualControllerApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.getById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**RitualDTO**

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

# **update**
> RitualDTO update(ritualDTO)


### Example

```typescript
import {
    RitualControllerApi,
    Configuration,
    RitualDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualControllerApi(configuration);

let id: string; // (default to undefined)
let ritualDTO: RitualDTO; //

const { status, data } = await apiInstance.update(
    id,
    ritualDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ritualDTO** | **RitualDTO**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**RitualDTO**

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

