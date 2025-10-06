# RitualPackControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**create1**](#create1) | **POST** /api/ritual-packs | |
|[**delete1**](#delete1) | **DELETE** /api/ritual-packs/{id} | |
|[**getAll1**](#getall1) | **GET** /api/ritual-packs | |
|[**getById1**](#getbyid1) | **GET** /api/ritual-packs/{id} | |
|[**update1**](#update1) | **PUT** /api/ritual-packs/{id} | |

# **create1**
> RitualPackDTO create1(ritualPackDTO)


### Example

```typescript
import {
    RitualPackControllerApi,
    Configuration,
    RitualPackDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualPackControllerApi(configuration);

let ritualPackDTO: RitualPackDTO; //

const { status, data } = await apiInstance.create1(
    ritualPackDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ritualPackDTO** | **RitualPackDTO**|  | |


### Return type

**RitualPackDTO**

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

# **delete1**
> delete1()


### Example

```typescript
import {
    RitualPackControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualPackControllerApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.delete1(
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

# **getAll1**
> Array<RitualPackDTO> getAll1()


### Example

```typescript
import {
    RitualPackControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualPackControllerApi(configuration);

const { status, data } = await apiInstance.getAll1();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<RitualPackDTO>**

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

# **getById1**
> RitualPackDTO getById1()


### Example

```typescript
import {
    RitualPackControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualPackControllerApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.getById1(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**RitualPackDTO**

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

# **update1**
> RitualPackDTO update1(ritualPackDTO)


### Example

```typescript
import {
    RitualPackControllerApi,
    Configuration,
    RitualPackDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualPackControllerApi(configuration);

let id: string; // (default to undefined)
let ritualPackDTO: RitualPackDTO; //

const { status, data } = await apiInstance.update1(
    id,
    ritualPackDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ritualPackDTO** | **RitualPackDTO**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**RitualPackDTO**

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

