import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Slot, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import SplashSequence from "@/components/SplashSequence";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { AuthProvider, useAuth } from "./AuthContext";

export const unstable_settings = {
  anchor: "(tabs)",
}; // Import it at top

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  const [showSplash, setShowSplash] = useState(true); // new state

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || loading) return;

    const inAuthGroup = segments[0] === "auth";

    if (!user && !inAuthGroup) {
      router.replace("/auth/login");
    } else if (user && inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [user, segments, mounted, loading, router]);

  if (!mounted || loading || showSplash) {
    // Show the 3 splash screens here
    return <SplashSequence onFinish={() => setShowSplash(false)} />;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Slot />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
