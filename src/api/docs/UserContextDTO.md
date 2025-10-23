# UserContextDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**userId** | **string** |  | [optional] [default to undefined]
**conversationId** | **string** |  | [optional] [default to undefined]
**emotionalStates** | [**Array&lt;EmotionalState&gt;**](EmotionalState.md) |  | [optional] [default to undefined]
**relationalNeeds** | [**Array&lt;RelationalNeed&gt;**](RelationalNeed.md) |  | [optional] [default to undefined]
**preferredLoveLanguages** | [**Array&lt;LoveType&gt;**](LoveType.md) |  | [optional] [default to undefined]
**preferredRitualTypes** | [**Array&lt;RitualType&gt;**](RitualType.md) |  | [optional] [default to undefined]
**preferredTones** | [**Array&lt;RitualTone&gt;**](RitualTone.md) |  | [optional] [default to undefined]
**availableTimeMinutes** | **number** |  | [optional] [default to undefined]
**preferredEffortLevel** | [**EffortLevel**](EffortLevel.md) |  | [optional] [default to undefined]
**preferredIntensity** | [**IntensityLevel**](IntensityLevel.md) |  | [optional] [default to undefined]
**currentContexts** | [**Array&lt;LifeContext&gt;**](LifeContext.md) |  | [optional] [default to undefined]
**timeContext** | [**TimeContext**](TimeContext.md) |  | [optional] [default to undefined]
**relationshipStatus** | [**RelationshipStatus**](RelationshipStatus.md) |  | [optional] [default to undefined]
**semanticQuery** | **string** |  | [optional] [default to undefined]
**lastInteractionAt** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { UserContextDTO } from './api';

const instance: UserContextDTO = {
    id,
    userId,
    conversationId,
    emotionalStates,
    relationalNeeds,
    preferredLoveLanguages,
    preferredRitualTypes,
    preferredTones,
    availableTimeMinutes,
    preferredEffortLevel,
    preferredIntensity,
    currentContexts,
    timeContext,
    relationshipStatus,
    semanticQuery,
    lastInteractionAt,
    createdAt,
    updatedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
