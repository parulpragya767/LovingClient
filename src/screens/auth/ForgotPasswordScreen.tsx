 import { supabase } from '@/src/lib/supabase';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
 
 export default function ForgotPasswordScreen() {
   const router = useRouter();
   const [email, setEmail] = useState('');
   const [loading, setLoading] = useState(false);
 
   const onSendResetLink = async () => {
     if (!email) {
       Alert.alert('Missing info', 'Please enter your email');
       return;
     }
 
     setLoading(true);
     const { error } = await supabase.auth.resetPasswordForEmail(email.trim());
     setLoading(false);
 
     if (error) {
       Alert.alert('Request failed', error.message);
       return;
     }
 
     router.push('/auth/check-your-email');
   };
 
   return (
     <View className="flex-1 bg-[#25292e] px-6 justify-center">
       <Text className="text-3xl font-bold text-center text-white mb-3">Reset password</Text>
       <Text className="text-base text-center text-white/80 mb-10">
         Enter your email and we’ll send you a reset link.
       </Text>
 
       <View>
         <Text className="text-white mb-2">Email</Text>
         <TextInput
           value={email}
           onChangeText={setEmail}
           placeholder="you@example.com"
           placeholderTextColor="#9aa0a6"
           keyboardType="email-address"
           autoCapitalize="none"
           className="bg-white/10 text-white rounded-xl px-4 py-3 border border-white/15"
         />
       </View>
 
       <TouchableOpacity
         onPress={onSendResetLink}
         disabled={loading}
         className="mt-6 bg-[#ffd33d] rounded-xl py-3 items-center"
       >
         {loading ? (
           <ActivityIndicator color="#25292e" />
         ) : (
           <Text className="text-[#25292e] font-semibold">Send reset link</Text>
         )}
       </TouchableOpacity>
 
       <TouchableOpacity onPress={() => router.back()} className="mt-4 items-center">
         <Text className="text-white/80">Back</Text>
       </TouchableOpacity>
     </View>
   );
 }

