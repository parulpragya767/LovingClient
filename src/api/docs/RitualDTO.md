# RitualDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**title** | **string** |  | [optional] [default to undefined]
**shortDescription** | **string** |  | [optional] [default to undefined]
**fullDescription** | **string** |  | [optional] [default to undefined]
**ritualTypes** | [**Array&lt;RitualType&gt;**](RitualType.md) |  | [optional] [default to undefined]
**ritualMode** | [**RitualMode**](RitualMode.md) |  | [optional] [default to undefined]
**ritualTones** | [**Array&lt;RitualTone&gt;**](RitualTone.md) |  | [optional] [default to undefined]
**sensitivityLevel** | [**SensitivityLevel**](SensitivityLevel.md) |  | [optional] [default to undefined]
**effortLevel** | [**EffortLevel**](EffortLevel.md) |  | [optional] [default to undefined]
**estimatedDurationMinutes** | **number** |  | [optional] [default to undefined]
**ritualSteps** | [**Array&lt;RitualStep&gt;**](RitualStep.md) |  | [optional] [default to undefined]
**mediaAssets** | [**Array&lt;MediaAsset&gt;**](MediaAsset.md) |  | [optional] [default to undefined]
**loveTypesSupported** | [**Array&lt;LoveType&gt;**](LoveType.md) |  | [optional] [default to undefined]
**emotionalStatesSupported** | [**Array&lt;EmotionalState&gt;**](EmotionalState.md) |  | [optional] [default to undefined]
**relationalNeedsServed** | [**Array&lt;RelationalNeed&gt;**](RelationalNeed.md) |  | [optional] [default to undefined]
**lifeContextsRelevant** | [**Array&lt;LifeContext&gt;**](LifeContext.md) |  | [optional] [default to undefined]
**rhythm** | [**Rhythm**](Rhythm.md) |  | [optional] [default to undefined]
**preparationRequirements** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**semanticSummary** | **string** |  | [optional] [default to undefined]
**status** | [**PublicationStatus**](PublicationStatus.md) |  | [optional] [default to undefined]
**createdBy** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { RitualDTO } from './api';

const instance: RitualDTO = {
    id,
    title,
    shortDescription,
    fullDescription,
    ritualTypes,
    ritualMode,
    ritualTones,
    sensitivityLevel,
    effortLevel,
    estimatedDurationMinutes,
    ritualSteps,
    mediaAssets,
    loveTypesSupported,
    emotionalStatesSupported,
    relationalNeedsServed,
    lifeContextsRelevant,
    rhythm,
    preparationRequirements,
    semanticSummary,
    status,
    createdBy,
    createdAt,
    updatedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
