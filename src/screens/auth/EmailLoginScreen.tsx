 import { useAuth } from '@/src/context/AuthContext';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
 
 export default function EmailLoginScreen() {
   const router = useRouter();
   const { signIn } = useAuth();
 
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [loading, setLoading] = useState(false);
 
   const onLogin = async () => {
     if (!email || !password) {
       Alert.alert('Missing info', 'Please enter email and password');
       return;
     }
 
     setLoading(true);
     const { error } = await signIn({ email: email.trim(), password });
     setLoading(false);
 
     if (error) {
       Alert.alert('Login failed', error);
     }
   };
 
   return (
     <View className="flex-1 bg-[#25292e] px-6 justify-center">
       <Text className="text-3xl font-bold text-center text-white mb-10">Welcome</Text>
 
       <View className="space-y-4">
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
 
         <View className="mt-4">
           <Text className="text-white mb-2">Password</Text>
           <TextInput
             value={password}
             onChangeText={setPassword}
             placeholder="••••••••"
             placeholderTextColor="#9aa0a6"
             secureTextEntry
             className="bg-white/10 text-white rounded-xl px-4 py-3 border border-white/15"
           />
         </View>
 
         <TouchableOpacity
           onPress={() => router.push('/auth/forgot-password')}
           className="mt-3 self-end"
         >
           <Text className="text-white/80">Forgot password?</Text>
         </TouchableOpacity>
 
         <TouchableOpacity
           onPress={onLogin}
           disabled={loading}
           className="mt-3 bg-[#ffd33d] rounded-xl py-3 items-center"
         >
           {loading ? (
             <ActivityIndicator color="#25292e" />
           ) : (
             <Text className="text-[#25292e] font-semibold">Sign In</Text>
           )}
         </TouchableOpacity>
 
         <TouchableOpacity
           onPress={() => router.push('/auth/email-signup')}
           className="mt-4 items-center"
         >
           <Text className="text-white/80">New here? Create an account</Text>
         </TouchableOpacity>
       </View>
     </View>
   );
 }

