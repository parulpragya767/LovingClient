# RitualControllerApi

All URIs are relative to *http://localhost:8080/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getAll**](#getall) | **GET** /v1/rituals | |
|[**getAllTags**](#getalltags) | **GET** /v1/rituals/tags | |
|[**getById**](#getbyid) | **GET** /v1/rituals/{id} | |
|[**search**](#search) | **POST** /v1/rituals/search | |

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

# **getAllTags**
> RitualTags getAllTags()


### Example

```typescript
import {
    RitualControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualControllerApi(configuration);

const { status, data } = await apiInstance.getAllTags();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**RitualTags**

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

# **search**
> PagedModelRitualDTO search()


### Example

```typescript
import {
    RitualControllerApi,
    Configuration,
    Pageable,
    RitualFilterDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualControllerApi(configuration);

let pageable: Pageable; // (default to undefined)
let ritualFilterDTO: RitualFilterDTO; // (optional)

const { status, data } = await apiInstance.search(
    pageable,
    ritualFilterDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ritualFilterDTO** | **RitualFilterDTO**|  | |
| **pageable** | **Pageable** |  | defaults to undefined|


### Return type

**PagedModelRitualDTO**

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

