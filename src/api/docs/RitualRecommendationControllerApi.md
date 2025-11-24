# RitualRecommendationControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**listAll**](#listall) | **GET** /api/ritual-recommendation | |
|[**listById**](#listbyid) | **GET** /api/ritual-recommendation/{id} | |
|[**updateStatus**](#updatestatus) | **PUT** /api/ritual-recommendation/{id}/status | |

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

# **updateStatus**
> RitualRecommendationDTO updateStatus(ritualRecommendationUpdateStatusRequest)


### Example

```typescript
import {
    RitualRecommendationControllerApi,
    Configuration,
    RitualRecommendationUpdateStatusRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualRecommendationControllerApi(configuration);

let id: string; // (default to undefined)
let ritualRecommendationUpdateStatusRequest: RitualRecommendationUpdateStatusRequest; //

const { status, data } = await apiInstance.updateStatus(
    id,
    ritualRecommendationUpdateStatusRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ritualRecommendationUpdateStatusRequest** | **RitualRecommendationUpdateStatusRequest**|  | |
| **id** | [**string**] |  | defaults to undefined|


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

