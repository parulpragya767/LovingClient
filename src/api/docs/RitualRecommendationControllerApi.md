# RitualRecommendationControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**create**](#create) | **POST** /api/ritual-recommendation | |
|[**listAll**](#listall) | **GET** /api/ritual-recommendation | |
|[**listById**](#listbyid) | **GET** /api/ritual-recommendation/{id} | |
|[**updateRecommendationAndRitualHistoryStatus**](#updaterecommendationandritualhistorystatus) | **PUT** /api/ritual-recommendation/{id} | |

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

let userId: string; // (default to undefined)
let ritualRecommendationCreateRequest: RitualRecommendationCreateRequest; //

const { status, data } = await apiInstance.create(
    userId,
    ritualRecommendationCreateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ritualRecommendationCreateRequest** | **RitualRecommendationCreateRequest**|  | |
| **userId** | [**string**] |  | defaults to undefined|


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

let userId: string; // (default to undefined)

const { status, data } = await apiInstance.listAll(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|


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

let userId: string; // (default to undefined)
let id: string; // (default to undefined)

const { status, data } = await apiInstance.listById(
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

let userId: string; // (default to undefined)
let id: string; // (default to undefined)
let ritualRecommendationUpdateRequest: RitualRecommendationUpdateRequest; //

const { status, data } = await apiInstance.updateRecommendationAndRitualHistoryStatus(
    userId,
    id,
    ritualRecommendationUpdateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ritualRecommendationUpdateRequest** | **RitualRecommendationUpdateRequest**|  | |
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

