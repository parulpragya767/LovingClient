# LovingApplicationApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**sayHello**](#sayhello) | **GET** /sayHello | |

# **sayHello**
> string sayHello()


### Example

```typescript
import {
    LovingApplicationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LovingApplicationApi(configuration);

let name: string; // (optional) (default to 'World')

const { status, data } = await apiInstance.sayHello(
    name
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **name** | [**string**] |  | (optional) defaults to 'World'|


### Return type

**string**

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

