# RitualPackDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [default to undefined]
**title** | **string** |  | [default to undefined]
**tagLine** | **string** |  | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**howItHelps** | **string** |  | [optional] [default to undefined]
**rituals** | [**Array&lt;RitualDTO&gt;**](RitualDTO.md) |  | [optional] [default to undefined]
**ritualIds** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**journey** | [**Journey**](Journey.md) |  | [optional] [default to undefined]
**loveTypes** | [**Array&lt;LoveType&gt;**](LoveType.md) |  | [optional] [default to undefined]
**relationalNeeds** | [**Array&lt;RelationalNeed&gt;**](RelationalNeed.md) |  | [optional] [default to undefined]
**mediaAssets** | [**Array&lt;MediaAsset&gt;**](MediaAsset.md) |  | [optional] [default to undefined]
**semanticSummary** | **string** |  | [optional] [default to undefined]
**status** | [**PublicationStatus**](PublicationStatus.md) |  | [optional] [default to undefined]
**contentHash** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { RitualPackDTO } from './api';

const instance: RitualPackDTO = {
    id,
    title,
    tagLine,
    description,
    howItHelps,
    rituals,
    ritualIds,
    journey,
    loveTypes,
    relationalNeeds,
    mediaAssets,
    semanticSummary,
    status,
    contentHash,
    createdAt,
    updatedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
