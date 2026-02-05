import LoadingState from '@/src/components/states/LoadingState';
import { Screen } from '@/src/components/ui/Screen';
import React from 'react';
import { Platform, View } from 'react-native';
import { WebView } from 'react-native-webview';

type Props = {
  url: string;
};

export function EmbeddedWebPage({ url }: Props) {
  if (Platform.OS === 'web') {
    return (
      <Screen>
        <iframe
          src={url}
          className="w-full h-full border-0"
          title="Embedded Web Page"
        />
      </Screen>
    );
  }

  return (
    <WebView
      source={{ uri: url }}
      startInLoadingState
      renderLoading={() => (
        <View className="flex-1">
          <LoadingState text="Loading..." />
        </View>
      )}
    />
  );
}