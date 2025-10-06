# RitualTagsControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**allTags**](#alltags) | **GET** /api/tags | |
|[**effortLevels**](#effortlevels) | **GET** /api/tags/effort-levels | |
|[**emotionalStates**](#emotionalstates) | **GET** /api/tags/emotional-states | |
|[**lifeContexts**](#lifecontexts) | **GET** /api/tags/life-contexts | |
|[**loveTypes**](#lovetypes) | **GET** /api/tags/love-types | |
|[**publicationStatuses**](#publicationstatuses) | **GET** /api/tags/publication-statuses | |
|[**relationalNeeds**](#relationalneeds) | **GET** /api/tags/relational-needs | |
|[**rhythms**](#rhythms) | **GET** /api/tags/rhythms | |
|[**ritualModes**](#ritualmodes) | **GET** /api/tags/ritual-modes | |
|[**ritualTones**](#ritualtones) | **GET** /api/tags/ritual-tones | |
|[**ritualTypes**](#ritualtypes) | **GET** /api/tags/ritual-types | |
|[**sensitivityLevels**](#sensitivitylevels) | **GET** /api/tags/sensitivity-levels | |

# **allTags**
> { [key: string]: Array<string>; } allTags()


### Example

```typescript
import {
    RitualTagsControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualTagsControllerApi(configuration);

const { status, data } = await apiInstance.allTags();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**{ [key: string]: Array<string>; }**

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

# **effortLevels**
> Array<string> effortLevels()


### Example

```typescript
import {
    RitualTagsControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualTagsControllerApi(configuration);

const { status, data } = await apiInstance.effortLevels();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<string>**

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

# **emotionalStates**
> Array<string> emotionalStates()


### Example

```typescript
import {
    RitualTagsControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualTagsControllerApi(configuration);

const { status, data } = await apiInstance.emotionalStates();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<string>**

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

# **lifeContexts**
> Array<string> lifeContexts()


### Example

```typescript
import {
    RitualTagsControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualTagsControllerApi(configuration);

const { status, data } = await apiInstance.lifeContexts();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<string>**

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

# **loveTypes**
> Array<string> loveTypes()


### Example

```typescript
import {
    RitualTagsControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualTagsControllerApi(configuration);

const { status, data } = await apiInstance.loveTypes();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<string>**

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

# **publicationStatuses**
> Array<string> publicationStatuses()


### Example

```typescript
import {
    RitualTagsControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualTagsControllerApi(configuration);

const { status, data } = await apiInstance.publicationStatuses();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<string>**

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

# **relationalNeeds**
> Array<string> relationalNeeds()


### Example

```typescript
import {
    RitualTagsControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualTagsControllerApi(configuration);

const { status, data } = await apiInstance.relationalNeeds();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<string>**

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

# **rhythms**
> Array<string> rhythms()


### Example

```typescript
import {
    RitualTagsControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualTagsControllerApi(configuration);

const { status, data } = await apiInstance.rhythms();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<string>**

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

# **ritualModes**
> Array<string> ritualModes()


### Example

```typescript
import {
    RitualTagsControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualTagsControllerApi(configuration);

const { status, data } = await apiInstance.ritualModes();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<string>**

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

# **ritualTones**
> Array<string> ritualTones()


### Example

```typescript
import {
    RitualTagsControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualTagsControllerApi(configuration);

const { status, data } = await apiInstance.ritualTones();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<string>**

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

# **ritualTypes**
> Array<string> ritualTypes()


### Example

```typescript
import {
    RitualTagsControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualTagsControllerApi(configuration);

const { status, data } = await apiInstance.ritualTypes();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<string>**

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

# **sensitivityLevels**
> Array<string> sensitivityLevels()


### Example

```typescript
import {
    RitualTagsControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RitualTagsControllerApi(configuration);

const { status, data } = await apiInstance.sensitivityLevels();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<string>**

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

