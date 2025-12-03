# RitualDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [default to undefined]
**title** | **string** |  | [default to undefined]
**tagLine** | **string** |  | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**howItHelps** | **string** |  | [optional] [default to undefined]
**steps** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**loveTypes** | [**Array&lt;LoveType&gt;**](LoveType.md) |  | [optional] [default to undefined]
**relationalNeeds** | [**Array&lt;RelationalNeed&gt;**](RelationalNeed.md) |  | [optional] [default to undefined]
**ritualMode** | [**RitualMode**](RitualMode.md) |  | [optional] [default to undefined]
**ritualTones** | [**Array&lt;RitualTone&gt;**](RitualTone.md) |  | [optional] [default to undefined]
**timeTaken** | [**TimeTaken**](TimeTaken.md) |  | [optional] [default to undefined]
**mediaAssets** | [**Array&lt;MediaAsset&gt;**](MediaAsset.md) |  | [optional] [default to undefined]
**semanticSummary** | **string** |  | [optional] [default to undefined]
**status** | [**PublicationStatus**](PublicationStatus.md) |  | [optional] [default to undefined]
**contentHash** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { RitualDTO } from './api';

const instance: RitualDTO = {
    id,
    title,
    tagLine,
    description,
    howItHelps,
    steps,
    loveTypes,
    relationalNeeds,
    ritualMode,
    ritualTones,
    timeTaken,
    mediaAssets,
    semanticSummary,
    status,
    contentHash,
    createdAt,
    updatedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
