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
    recommendation_source?: 'CHAT' | 'WEEKLY';
  }) {
    if (!this.initialized) return;
    track('ritual_added', params);
  }

  ritualCompleted(params: {
    ritual_id: string;
    ritual_pack_id: string;
    recommendation_source: 'CHAT' | 'WEEKLY';
  }) {
    if (!this.initialized) return;
    track('ritual_completed', params);
  }

  ritualRemoved(params: {
    ritual_id: string;
    ritual_pack_id: string;
    recommendation_source: 'CHAT' | 'WEEKLY';
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

  trackEvent(eventName: string, properties?: Record<string, any>) {
    if (!this.initialized) return;
    track(eventName, properties);
  }
}

export const Analytics = new AnalyticsService();
