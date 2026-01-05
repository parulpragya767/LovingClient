 import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
 
 export default function CheckYourEmailScreen() {
   const router = useRouter();
 
   return (
     <View className="flex-1 bg-[#25292e] px-6 justify-center">
       <Text className="text-3xl font-bold text-center text-white mb-3">Check your email</Text>
       <Text className="text-base text-center text-white/80 mb-10">
         If the address exists, you’ll receive an email with next steps.
       </Text>
 
       <TouchableOpacity
         onPress={() => router.replace('/auth/login')}
         className="bg-[#ffd33d] rounded-xl py-3 items-center"
       >
         <Text className="text-[#25292e] font-semibold">Back to Sign In</Text>
       </TouchableOpacity>
 
       <TouchableOpacity onPress={() => router.back()} className="mt-4 items-center">
         <Text className="text-white/80">Go back</Text>
       </TouchableOpacity>
     </View>
   );
 }

