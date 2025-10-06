# LoveTypeControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createLoveType**](#createlovetype) | **POST** /api/love-types | |
|[**deleteLoveType**](#deletelovetype) | **DELETE** /api/love-types/{id} | |
|[**getAllLoveTypes**](#getalllovetypes) | **GET** /api/love-types | |
|[**getLoveTypeById**](#getlovetypebyid) | **GET** /api/love-types/{id} | |
|[**updateLoveType**](#updatelovetype) | **PUT** /api/love-types/{id} | |

# **createLoveType**
> LoveTypeInfo createLoveType(loveTypeInfo)


### Example

```typescript
import {
    LoveTypeControllerApi,
    Configuration,
    LoveTypeInfo
} from './api';

const configuration = new Configuration();
const apiInstance = new LoveTypeControllerApi(configuration);

let loveTypeInfo: LoveTypeInfo; //

const { status, data } = await apiInstance.createLoveType(
    loveTypeInfo
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **loveTypeInfo** | **LoveTypeInfo**|  | |


### Return type

**LoveTypeInfo**

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

# **deleteLoveType**
> deleteLoveType()


### Example

```typescript
import {
    LoveTypeControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LoveTypeControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.deleteLoveType(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


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

# **getAllLoveTypes**
> Array<LoveTypeInfo> getAllLoveTypes()


### Example

```typescript
import {
    LoveTypeControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LoveTypeControllerApi(configuration);

const { status, data } = await apiInstance.getAllLoveTypes();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<LoveTypeInfo>**

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

# **getLoveTypeById**
> LoveTypeInfo getLoveTypeById()


### Example

```typescript
import {
    LoveTypeControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LoveTypeControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getLoveTypeById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**LoveTypeInfo**

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

# **updateLoveType**
> LoveTypeInfo updateLoveType(loveTypeInfo)


### Example

```typescript
import {
    LoveTypeControllerApi,
    Configuration,
    LoveTypeInfo
} from './api';

const configuration = new Configuration();
const apiInstance = new LoveTypeControllerApi(configuration);

let id: number; // (default to undefined)
let loveTypeInfo: LoveTypeInfo; //

const { status, data } = await apiInstance.updateLoveType(
    id,
    loveTypeInfo
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **loveTypeInfo** | **LoveTypeInfo**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

**LoveTypeInfo**

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

