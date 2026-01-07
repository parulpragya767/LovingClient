import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

type Props = {
  url: string;
};

export function EmbeddedWebPage({ url }: Props) {
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <iframe
          src={url}
          style={iframeStyle}
          title="Embedded Web Page"
        />
      </View>
    );
  }

  return <WebView source={{ uri: url }} style={styles.webview} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

const iframeStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  border: 0,
};
