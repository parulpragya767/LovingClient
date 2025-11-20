import { Stack } from 'expo-router';

export default function AIChatLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{
          title: 'AI Chat',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="list" 
        options={{
          title: 'List',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="chat" 
        options={{
          title: 'Chat',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
