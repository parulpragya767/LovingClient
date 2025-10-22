# RitualControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getAll**](#getall) | **GET** /api/rituals | |
|[**getAllTags**](#getalltags) | **GET** /api/rituals/tags | |
|[**getById**](#getbyid) | **GET** /api/rituals/{id} | |
|[**search**](#search) | **POST** /api/rituals/search | |

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
> RitualTagsDTO getAllTags()


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

**RitualTagsDTO**

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
> PageRitualDTO search()


### Example

```typescript
import {
    RitualControllerApi,
    Configuration,
    Pageable,
    RitualFilterRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualControllerApi(configuration);

let pageable: Pageable; // (default to undefined)
let ritualFilterRequest: RitualFilterRequest; // (optional)

const { status, data } = await apiInstance.search(
    pageable,
    ritualFilterRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ritualFilterRequest** | **RitualFilterRequest**|  | |
| **pageable** | **Pageable** |  | defaults to undefined|


### Return type

**PageRitualDTO**

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

