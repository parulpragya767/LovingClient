import { Identify, identify, init, setUserId, track } from '@amplitude/analytics-react-native';

class AnalyticsService {
  private initialized = false;

  initialize() {
    if (this.initialized) return;

    const apiKey = process.env.EXPO_PUBLIC_AMPLITUDE_API_KEY;
    
    if (!apiKey) {
      console.warn('Amplitude API key not found. Analytics will not be tracked.');
      return;
    }

    init(apiKey);
    this.initialized = true;
  }

  setUser(userId: string) {
    if (!this.initialized) return;
    setUserId(userId);
  }

  identifyUser(userId: string, properties?: Record<string, any>) {
    if (!this.initialized) return;
    
    const identifyObj = new Identify();
    if (properties) {
      Object.entries(properties).forEach(([key, value]) => {
        identifyObj.set(key, value);
      });
    }
    identify(identifyObj);
    setUserId(userId);
  }

  appOpened() {
    if (!this.initialized) return;
    track('app_opened');
  }

  ritualPackRecommended(params: {
    ritual_pack_id: string;
    recommendation_id: string;
    recommendation_source: 'CHAT' | 'WEEKLY';
  }) {
    if (!this.initialized) return;
    track('ritual_pack_recommended', params);
  }

  ritualPackSelected(params: {
    ritual_pack_id: string;
    recommendation_id: string;
    recommendation_source: 'CHAT' | 'WEEKLY';
    ritual_count_total: number;
    ritual_count_selected: number;
  }) {
    if (!this.initialized) return;
    track('ritual_pack_selected', params);
  }

  ritualAdded(params: {
    ritual_id: string;
    ritual_pack_id?: string | null;
    recommendation_source?: 'CHAT' | 'WEEKLY' | null;
  }) {
    if (!this.initialized) return;
    track('ritual_added', params);
  }

  ritualCompleted(params: {
    ritual_id: string;
    ritual_pack_id?: string | null;
    recommendation_source?: 'CHAT' | 'WEEKLY' | null;
  }) {
    if (!this.initialized) return;
    track('ritual_completed', params);
  }

  ritualRemoved(params: {
    ritual_id: string;
    ritual_pack_id?: string | null;
    recommendation_source?: 'CHAT' | 'WEEKLY' | null;
  }) {
    if (!this.initialized) return;
    track('ritual_removed', params);
  }

  chatReadyForRecommendation(params: {
    chat_id: string;
    message_count: number;
  }) {
    if (!this.initialized) return;
    track('chat_ready_for_recommendation', params);
  }

  loveTypeViewed(params: {
    love_type: string;
  }) {
    if (!this.initialized) return;
    track('love_type_viewed', params);
  }

  ritualFilterApplied(params: {
    love_types?: string[];
    ritual_modes?: string[];
    time_taken?: string[];
    relational_needs?: string[];
    ritual_tones?: string[];
    keyword?: string;
    result_count: number;
  }) {
    if (!this.initialized) return;
    
    const hasFilters = 
      (params.love_types && params.love_types.length > 0) ||
      (params.ritual_modes && params.ritual_modes.length > 0) ||
      (params.time_taken && params.time_taken.length > 0) ||
      (params.relational_needs && params.relational_needs.length > 0) ||
      (params.ritual_tones && params.ritual_tones.length > 0) ||
      (params.keyword && params.keyword.trim().length > 0);
    
    if (!hasFilters) return;
    
    const filteredParams: Record<string, any> = { result_count: params.result_count };
    
    if (params.love_types && params.love_types.length > 0) {
      filteredParams.love_types = params.love_types;
    }
    if (params.ritual_modes && params.ritual_modes.length > 0) {
      filteredParams.ritual_modes = params.ritual_modes;
    }
    if (params.time_taken && params.time_taken.length > 0) {
      filteredParams.time_taken = params.time_taken;
    }
    if (params.relational_needs && params.relational_needs.length > 0) {
      filteredParams.relational_needs = params.relational_needs;
    }
    if (params.ritual_tones && params.ritual_tones.length > 0) {
      filteredParams.ritual_tones = params.ritual_tones;
    }
    if (params.keyword) {
      filteredParams.keyword = params.keyword;
    }
    
    track('ritual_filter_applied', filteredParams);
  }

  trackEvent(eventName: string, properties?: Record<string, any>) {
    if (!this.initialized) return;
    track(eventName, properties);
  }
}

export const Analytics = new AnalyticsService();
