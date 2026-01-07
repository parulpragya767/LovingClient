import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';

type Props = {
  url: string;
};

export function EmbeddedWebPage({ url }: Props) {
  // On native, prefer in-app browser for trust + UX
  if (Platform.OS !== 'web') {
    WebBrowser.openBrowserAsync(url);
    return null;
  }

  // Web fallback
  return <WebView source={{ uri: url }} />;
}
