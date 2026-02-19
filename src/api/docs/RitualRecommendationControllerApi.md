# RitualRecommendationControllerApi

All URIs are relative to *http://localhost:8080/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**create**](#create) | **POST** /v1/ritual-recommendation | |
|[**listAll**](#listall) | **GET** /v1/ritual-recommendation | |
|[**listById**](#listbyid) | **GET** /v1/ritual-recommendation/{id} | |
|[**updateRecommendationAndRitualHistoryStatus**](#updaterecommendationandritualhistorystatus) | **PUT** /v1/ritual-recommendation/{id} | |

# **create**
> RitualRecommendationDTO create(ritualRecommendationCreateRequest)


### Example

```typescript
import {
    RitualRecommendationControllerApi,
    Configuration,
    RitualRecommendationCreateRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualRecommendationControllerApi(configuration);

let ritualRecommendationCreateRequest: RitualRecommendationCreateRequest; //

const { status, data } = await apiInstance.create(
    ritualRecommendationCreateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ritualRecommendationCreateRequest** | **RitualRecommendationCreateRequest**|  | |


### Return type

**RitualRecommendationDTO**

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

# **listAll**
> Array<RitualRecommendationDTO> listAll()


### Example

```typescript
import {
    RitualRecommendationControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualRecommendationControllerApi(configuration);

const { status, data } = await apiInstance.listAll();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<RitualRecommendationDTO>**

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

# **listById**
> RitualRecommendationDTO listById()


### Example

```typescript
import {
    RitualRecommendationControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualRecommendationControllerApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.listById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**RitualRecommendationDTO**

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

# **updateRecommendationAndRitualHistoryStatus**
> updateRecommendationAndRitualHistoryStatus(ritualRecommendationUpdateRequest)


### Example

```typescript
import {
    RitualRecommendationControllerApi,
    Configuration,
    RitualRecommendationUpdateRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualRecommendationControllerApi(configuration);

let id: string; // (default to undefined)
let ritualRecommendationUpdateRequest: RitualRecommendationUpdateRequest; //

const { status, data } = await apiInstance.updateRecommendationAndRitualHistoryStatus(
    id,
    ritualRecommendationUpdateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ritualRecommendationUpdateRequest** | **RitualRecommendationUpdateRequest**|  | |
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

