import SafeScreen from "../assets/components/SafeScreen.jsx"
import { ClerkProvider } from '@clerk/clerk-expo'
import { Slot } from 'expo-router'
import { tokenCache } from '@clerk/clerk-expo/token-cache'


export default function RootLayout() {
  return (
     <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
  <SafeScreen>
    <Slot />
  </SafeScreen>
   </ClerkProvider>
  );
}
