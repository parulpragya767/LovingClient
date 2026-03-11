# SubscriptionControllerApi

All URIs are relative to *http://localhost:8080/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getSubscription**](#getsubscription) | **GET** /v1/subscription | |
|[**hasAccessToPremiumFeatures**](#hasaccesstopremiumfeatures) | **GET** /v1/subscription/premium | |
|[**hasActiveSubscription**](#hasactivesubscription) | **GET** /v1/subscription/active | |

# **getSubscription**
> SubscriptionDTO getSubscription()


### Example

```typescript
import {
    SubscriptionControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SubscriptionControllerApi(configuration);

const { status, data } = await apiInstance.getSubscription();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**SubscriptionDTO**

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

# **hasAccessToPremiumFeatures**
> boolean hasAccessToPremiumFeatures()


### Example

```typescript
import {
    SubscriptionControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SubscriptionControllerApi(configuration);

const { status, data } = await apiInstance.hasAccessToPremiumFeatures();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**boolean**

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

# **hasActiveSubscription**
> boolean hasActiveSubscription()


### Example

```typescript
import {
    SubscriptionControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SubscriptionControllerApi(configuration);

const { status, data } = await apiInstance.hasActiveSubscription();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**boolean**

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

