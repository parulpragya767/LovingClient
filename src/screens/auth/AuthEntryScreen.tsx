 import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
 
 export default function AuthEntryScreen() {
   const router = useRouter();
 
   return (
     <View className="flex-1 bg-[#25292e] px-6 justify-center">
       <Text className="text-3xl font-bold text-center text-white mb-3">Loving</Text>
       <Text className="text-base text-center text-white/80 mb-10">
         Sign in to continue or create an account.
       </Text>
 
       <TouchableOpacity
         onPress={() => router.push('/auth/login')}
         className="bg-[#ffd33d] rounded-xl py-3 items-center"
       >
         <Text className="text-[#25292e] font-semibold">Sign In</Text>
       </TouchableOpacity>
 
       <TouchableOpacity
         onPress={() => router.push('/auth/email-signup')}
         className="mt-3 bg-white/10 rounded-xl py-3 items-center border border-white/15"
       >
         <Text className="text-white font-semibold">Create Account</Text>
       </TouchableOpacity>
     </View>
   );
 }

