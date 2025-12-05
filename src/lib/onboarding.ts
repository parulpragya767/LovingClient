import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'hasOnboarded';

export async function getHasOnboarded(): Promise<boolean> {
  try {
    const v = await AsyncStorage.getItem(KEY);
    return v === 'true';
  } catch {
    return false;
  }
}

export async function setHasOnboarded(v: boolean): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, v ? 'true' : 'false');
  } catch {
    // noop
  }
}
