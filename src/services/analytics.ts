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

  ritualStarted(ritual: { id: string; loveTypes?: number[]; ritualMode?: string }) {
    if (!this.initialized) return;
    
    track('ritual_started', {
      ritual_id: ritual.id,
      love_types: ritual.loveTypes,
      mode: ritual.ritualMode,
    });
  }

  ritualCompleted(ritual: { id: string }) {
    if (!this.initialized) return;
    
    track('ritual_completed', {
      ritual_id: ritual.id,
    });
  }

  ritualAddedToCurrent(ritual: { id: string; title?: string; loveTypes?: string[]; ritualMode?: string }) {
    if (!this.initialized) return;
    
    track('ritual_added_to_current', {
      ritual_id: ritual.id,
      ritual_title: ritual.title,
      love_types: ritual.loveTypes,
      mode: ritual.ritualMode,
    });
  }

  trackEvent(eventName: string, properties?: Record<string, any>) {
    if (!this.initialized) return;
    track(eventName, properties);
  }
}

export const Analytics = new AnalyticsService();
