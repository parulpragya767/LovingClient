import { setHasOnboarded } from '@/src/lib/onboarding';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const hero = require('../../../assets/images/icon.png');

function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <View style={styles.dotsRow}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          style={[styles.dot, i + 1 === current ? styles.dotActive : styles.dotInactive]}
        />
      ))}
    </View>
  );
}

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.mediaWrap}>
        <Image source={hero} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.content}>
        <Text style={styles.heading}>Welcome to Loving</Text>
        <Text style={styles.subtext}>
          Build deeper connections with guided rituals and an AI companion. Let’s set things up in a few quick steps.
        </Text>

        <ProgressDots current={1} total={3} />

        <View style={styles.actions}>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => router.push('/onboarding/rituals-and-ai-chat')}
            style={[styles.button, styles.buttonPrimary]}
          >
            <Text style={styles.buttonPrimaryText}>Next</Text>
          </TouchableOpacity>

          <TouchableOpacity
            accessibilityRole="button"
            onPress={async () => { await setHasOnboarded(true); router.replace('/(tabs)'); }}
            style={[styles.button, styles.buttonGhost]}
          >
            <Text style={styles.buttonGhostText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 24, paddingBottom: 32, backgroundColor: '#fff' },
  mediaWrap: { alignItems: 'center', justifyContent: 'center', marginTop: 16 },
  image: { width: '80%', height: 200 },
  content: { flex: 1, marginTop: 24 },
  heading: { fontSize: 28, fontWeight: '700', color: '#111', textAlign: 'center' },
  subtext: { marginTop: 12, fontSize: 16, color: '#444', textAlign: 'center', lineHeight: 22 },
  dotsRow: { marginTop: 20, flexDirection: 'row', justifyContent: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 4 },
  dotActive: { backgroundColor: '#111' },
  dotInactive: { backgroundColor: '#ddd' },
  actions: { marginTop: 'auto' },
  button: { paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 12 },
  buttonPrimary: { backgroundColor: '#111' },
  buttonPrimaryText: { color: 'white', fontWeight: '600', fontSize: 16 },
  buttonGhost: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#ddd' },
  buttonGhostText: { color: '#111', fontWeight: '600', fontSize: 16 },
});

